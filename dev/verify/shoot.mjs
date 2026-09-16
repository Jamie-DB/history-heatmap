// Disposable verification harness. Drives Chrome headless over CDP with no npm deps
// (Node 22 has a built-in WebSocket client). For each case it pins the app to a fixed
// year + camera via deep link, forces one synchronous draw, and hashes the render field
// plus the full canvas. Collects console errors and uncaught exceptions.
//
// usage:  node .context/shoot.mjs <label>        writes dev/verify/shots/<label>.json
//         node .context/shoot.mjs --diff a b     compares two runs
import { spawn } from 'node:child_process';
import { createHash } from 'node:crypto';
import { mkdirSync, writeFileSync, readFileSync } from 'node:fs';
import { resolve } from 'node:path';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const FILE = 'file://' + resolve(process.env.HH_FILE || 'index.html');
const PORT = 9333;

// (year, lon, lat, zoom) probes: world view across the span, then three zoomed frontiers
const CASES = [
  ['world-0100',  100,   20, 20, 1],
  ['world-0400',  400,   20, 20, 1],
  ['world-0700',  700,   20, 20, 1],
  ['world-1100', 1100,   20, 20, 1],
  ['world-1500', 1500,   20, 20, 1],
  ['world-1900', 1900,   20, 20, 1],
  ['world-2026', 2026,   20, 20, 1],
  ['iberia-1100',1100,  -4,  40, 6],
  ['balkans-1500',1500,  22, 42, 6],
  ['bengal-1700',1700,   88, 23, 6],
  // control-state probes: single layer, majority frontier, per-capita brightness
  ['solo-c-1100', 1100,  20, 20, 1, 'layers=c'],
  ['solo-m-1100', 1100,  20, 20, 1, 'layers=m'],
  ['major-1100',  1100,  20, 20, 1, 'frontier=majority'],
  ['percap-1100', 1100,  20, 20, 1, 'mode=percap'],
  ['major-iberia',1100,  -4, 40, 6, 'frontier=majority'],
  // every deep-link parameter at once. Three separate temporal-dead-zone bugs shipped past
  // the other probes because each only exercised the default state.
  ['all-params',  1100,  20, 20, 1,
   'layers=chr,isl,bud&measure=urb&region=India&conf=0&other=1&theme=dark&frontier=majority'],
  ['all-params-2', 800,  20, 20, 1, 'from=600&to=800&layers=chr&conf=0&region=Iberia'],
];

const sha = s => createHash('sha256').update(s).digest('hex').slice(0, 16);

async function cdp(ws, method, params = {}) {
  const id = ++cdp.n || (cdp.n = 1);
  ws.send(JSON.stringify({ id, method, params }));
  return new Promise((res, rej) => {
    const t = setTimeout(() => rej(new Error('timeout ' + method)), 30000);
    const on = e => {
      const m = JSON.parse(e.data);
      if (m.id !== id) return;
      clearTimeout(t); ws.removeEventListener('message', on);
      m.error ? rej(new Error(method + ': ' + m.error.message)) : res(m.result);
    };
    ws.addEventListener('message', on);
  });
}

const sleep = ms => new Promise(r => setTimeout(r, ms));

async function run(label) {
  const chrome = spawn(CHROME, [
    '--headless=new', `--remote-debugging-port=${PORT}`, '--allow-file-access-from-files',
    '--hide-scrollbars', '--window-size=1280,900', '--no-first-run', '--no-default-browser-check',
    '--user-data-dir=/tmp/hh-verify-chrome', '--disable-gpu', 'about:blank',
  ], { stdio: 'ignore' });

  let wsUrl = null;
  for (let i = 0; i < 60 && !wsUrl; i++) {
    await sleep(250);
    try {
      const r = await fetch(`http://127.0.0.1:${PORT}/json/version`);
      wsUrl = (await r.json()).webSocketDebuggerUrl;
    } catch {}
  }
  if (!wsUrl) { chrome.kill(); throw new Error('chrome did not start'); }

  const out = { label, cases: {}, errors: [] };
  const browser = new WebSocket(wsUrl);
  await new Promise(r => browser.addEventListener('open', r, { once: true }));
  const { targetId } = await cdp(browser, 'Target.createTarget', { url: 'about:blank' });
  const tws = new WebSocket(`ws://127.0.0.1:${PORT}/devtools/page/${targetId}`);
  await new Promise(r => tws.addEventListener('open', r, { once: true }));

  const logs = [];
  tws.addEventListener('message', e => {
    const m = JSON.parse(e.data);
    if (m.method === 'Runtime.exceptionThrown')
      logs.push('EXCEPTION ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
    if (m.method === 'Runtime.consoleAPICalled' && ['error', 'warning'].includes(m.params.type))
      logs.push(m.params.type.toUpperCase() + ' ' + m.params.args.map(a => a.value ?? a.description).join(' '));
  });
  await cdp(tws, 'Runtime.enable');
  await cdp(tws, 'Page.enable');

  for (const [name, year, lon, lat, z, extra] of CASES) {
    logs.length = 0;
    const url = `${FILE}?play=0&year=${year}&view=${lon},${lat},${z}&fs=1` + (extra ? '&' + extra : '');
    await cdp(tws, 'Page.navigate', { url });
    await sleep(1200);                       // load + first frames
    // wait for the simulation to finish so the blend term is stable, then force one draw
    const probe = await cdp(tws, 'Runtime.evaluate', {
      awaitPromise: true, returnByValue: true,
      expression: `(async () => {
        for (let i = 0; i < 200; i++) {
          const ready = (typeof DATASETS !== 'undefined')
            ? DATASETS.filter(d => d.kind === 'faith' && d.on).every(d => d.ready)
            : (typeof simReady !== 'undefined' && simReady);
          if (ready) break;
          await new Promise(r => setTimeout(r, 100));
        }
        playing = false;
        year = ${year};
        cam.lon = ${lon}; cam.lat = ${lat}; cam.z = ${z}; clampCam();
        draw(year); updateChrome();
        return {
          field: fieldCanvas.toDataURL(),
          canvas: canvas.toDataURL(),
          fw: FW, fh: FH, w: W, h: H,
          yearShown: document.getElementById('yearBig').textContent,
        };
      })()`,
    });
    if (probe.exceptionDetails) { out.errors.push(name + ' EVAL ' + probe.exceptionDetails.text); continue; }
    const v = probe.result.value;
    out.cases[name] = { field: sha(v.field), canvas: sha(v.canvas), fw: v.fw, fh: v.fh, w: v.w, h: v.h, yearShown: v.yearShown };
    // the [data] share-sum warning is an author-facing integrity report, not a fault
    for (const l of logs) (l.includes('[data]') ? (out.notes ??= []) : out.errors).push(name + ' ' + l.split('\n')[0]);
  }

  chrome.kill();
  mkdirSync('dev/verify/shots', { recursive: true });
  writeFileSync(`dev/verify/shots/${label}.json`, JSON.stringify(out, null, 2));
  console.log(`wrote dev/verify/shots/${label}.json`);
  for (const [n, c] of Object.entries(out.cases)) console.log(`  ${n.padEnd(15)} field=${c.field} canvas=${c.canvas} ${c.yearShown}`);
  if (out.notes?.length) console.log('\ndata note: ' + out.notes[0].replace(/^\S+ /, ''));
  if (out.errors.length) { console.log('ERRORS:'); out.errors.forEach(e => console.log('  ' + e)); }
  else console.log('no console errors');
  process.exit(0);
}

function diff(a, b) {
  const A = JSON.parse(readFileSync(`dev/verify/shots/${a}.json`));
  const B = JSON.parse(readFileSync(`dev/verify/shots/${b}.json`));
  let bad = 0;
  for (const name of Object.keys(A.cases)) {
    const x = A.cases[name], y = B.cases[name];
    if (!y) { console.log(`${name}: MISSING in ${b}`); bad++; continue; }
    const f = x.field === y.field, c = x.canvas === y.canvas;
    if (f && c) console.log(`  same  ${name}`);
    else { console.log(`  DIFF  ${name}  field:${f ? 'same' : x.field + ' -> ' + y.field}  canvas:${c ? 'same' : x.canvas + ' -> ' + y.canvas}`); bad++; }
  }
  console.log(bad ? `\n${bad} case(s) differ` : '\nidentical');
  process.exit(bad ? 1 : 0);
}

const [, , arg, arg2] = process.argv;
if (arg === '--diff') diff(arg2, process.argv[5] || process.argv[4]);
else run(arg || 'run');
