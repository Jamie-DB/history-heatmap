// One-off DOM/state probe. usage: node .context/probe.mjs '<url query>' '<js expression>'
import { spawn } from 'node:child_process';
import { resolve } from 'node:path';
const CHROME = '/Applications/Google Chrome.app/Contents/MacOS/Google Chrome';
const PORT = 9334, sleep = ms => new Promise(r => setTimeout(r, ms));
setTimeout(() => { console.log('HARD TIMEOUT after 90s'); process.exit(2); }, 90000).unref?.();
const chrome = spawn(CHROME, ['--headless=new', `--remote-debugging-port=${PORT}`, '--allow-file-access-from-files',
  '--window-size=1280,900', '--no-first-run', '--user-data-dir=/tmp/hh-probe', '--disable-gpu', 'about:blank'], { stdio: 'ignore' });
let wsUrl = null;
for (let i = 0; i < 60 && !wsUrl; i++) { await sleep(250); try { wsUrl = (await (await fetch(`http://127.0.0.1:${PORT}/json/version`)).json()).webSocketDebuggerUrl; } catch {} }
let n = 0;
const call = (ws, method, params = {}) => { const id = ++n; ws.send(JSON.stringify({ id, method, params }));
  return new Promise((res, rej) => { const on = e => { const m = JSON.parse(e.data); if (m.id !== id) return;
    ws.removeEventListener('message', on); m.error ? rej(new Error(m.error.message)) : res(m.result); }; ws.addEventListener('message', on); }); };
const b = new WebSocket(wsUrl); await new Promise(r => b.addEventListener('open', r, { once: true }));
const { targetId } = await call(b, 'Target.createTarget', { url: 'about:blank' });
const t = new WebSocket(`ws://127.0.0.1:${PORT}/devtools/page/${targetId}`);
await new Promise(r => t.addEventListener('open', r, { once: true }));
const logs = [];
t.addEventListener('message', e => { const m = JSON.parse(e.data);
  if (m.method === 'Runtime.exceptionThrown') logs.push('EXCEPTION ' + (m.params.exceptionDetails.exception?.description || m.params.exceptionDetails.text));
  if (m.method === 'Runtime.consoleAPICalled' && ['error','warning'].includes(m.params.type)) logs.push(m.params.type.toUpperCase() + ' ' + m.params.args.map(a => a.value ?? a.description).join(' ')); });
await call(t, 'Runtime.enable');
await call(t, 'Page.navigate', { url: 'file://' + resolve(process.env.HH_FILE || 'index.html') + (process.argv[2] || '') });
await sleep(1500);
const r = await call(t, 'Runtime.evaluate', { returnByValue: true, awaitPromise: true, expression: `(() => { ${process.argv[3]} })()` });
console.log(r.exceptionDetails ? 'EVAL ERROR: ' + r.exceptionDetails.text : JSON.stringify(r.result.value, null, 2));
if (logs.length) console.log('LOGS:', logs.join('\n'));
chrome.kill(); process.exit(0);
