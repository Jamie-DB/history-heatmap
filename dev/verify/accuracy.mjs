// City accuracy panel. For each city in panel.mjs, renders the map at a zoom where that city's
// own region is the finest thing on screen, and scores the rendered share against the share
// that region's own table claims. One number to tune data and weighting against.
//
//   node dev/verify/accuracy.mjs            score the current index.html
//   HH_FILE=/tmp/other.html node ...        score another copy, to compare a change
//
// Cities must be clear of the city-scale diaspora overlays. Three originally were not, and
// were silently measuring the overlay rather than the region.
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
import { PANEL } from './panel.mjs';

const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9336, sleep = ms => new Promise(r => setTimeout(r, ms));
setTimeout(() => { console.log('HARD TIMEOUT'); process.exit(2); }, 120000).unref?.();

const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`,
  '--allow-file-access-from-files', '--window-size=1280,900', '--no-first-run',
  '--user-data-dir=/tmp/hh-accuracy-chrome', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });

let wsUrl = null;
for (let i = 0; i < 60 && !wsUrl; i++) {
  await sleep(250);
  try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; } catch {}
}
if (!wsUrl) { chrome.kill(); throw new Error('chrome did not start'); }

let n = 0;
const call = (ws, method, params = {}) => {
  const id = ++n; ws.send(JSON.stringify({ id, method, params }));
  return new Promise((res, rej) => {
    const on = e => { const m = JSON.parse(e.data); if (m.id !== id) return;
      ws.removeEventListener('message', on); m.error ? rej(new Error(m.error.message)) : res(m.result); };
    ws.addEventListener('message', on);
  });
};
const b = new WebSocket(wsUrl); await new Promise(r => b.addEventListener('open', r, { once: true }));
const { targetId } = await call(b, 'Target.createTarget', { url: 'about:blank' });
const t = new WebSocket(`ws://127.0.0.1:${PORT}/devtools/page/${targetId}`);
await new Promise(r => t.addEventListener('open', r, { once: true }));
await call(t, 'Runtime.enable');
await call(t, 'Page.navigate', {
  url: 'file://' + resolve(process.env.HH_FILE || 'index.html') + '?play=0&year=2026&layers=chr,isl,bud&fs=1' });
await sleep(1500);

const r = await call(t, 'Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: `
(async () => {
  const t0 = Date.now();
  while (Date.now() - t0 < 25000 && !activeFaiths().every(d => d.ready)) await new Promise(r => setTimeout(r, 120));
  const PANEL = ${JSON.stringify(PANEL)};
  const at = (lon, lat, z, id) => {
    cam.lon = lon; cam.lat = lat; cam.z = z; clampCam(); ensureViewBuffers();
    const ls = 360 / z * 1.02, lt = (H / z) / BH * (LAT_TOP - LAT_BOT) * 1.02;
    const l0 = lon - ls / 2, tv = lat + lt / 2, cw = ls / FW, ch = lt / FH;
    buildViewField(2026, l0, tv, cw, ch);
    const i = Math.round((lon - l0) / cw - 0.5), j = Math.round((tv - lat) / ch - 0.5);
    const idx = j * FW + i, w = viewWsum[idx];
    return w <= 1e-9 ? 0 : DS(id).viewNum[idx] / w * 100;
  };
  const rows = []; let err = 0, missing = 0;
  for (const [city, lon, lat, z, id, rn] of PANEL) {
    const reg = REGIONS.find(r => r.n === rn);
    if (!reg) { rows.push(city.padEnd(14) + 'REGION MISSING: ' + rn); missing++; continue; }
    const want = interp(reg[DS(id).key], 2026) * 100, got = at(lon, lat, z, id);
    const d = Math.abs(got - want); err += d;
    rows.push(city.padEnd(14) + got.toFixed(0).padStart(3) + '% vs ' + want.toFixed(0).padStart(3) +
              '%  ' + (d > 15 ? 'OFF by ' + d.toFixed(0) : ''));
  }
  return { total: Math.round(err), mean: +(err / PANEL.length).toFixed(1), missing, rows };
})()` });

chrome.kill();
if (r.exceptionDetails) { console.log('EVAL ERROR: ' + r.exceptionDetails.text); process.exit(1); }
const v = r.result.value;
v.rows.forEach(x => console.log('  ' + x));
console.log(`\n  total error ${v.total} points across ${PANEL.length} cities, mean ${v.mean}`);
if (v.missing) console.log(`  ${v.missing} panel region(s) missing from REGIONS`);
process.exit(0);
