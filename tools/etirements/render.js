// Rend les calques (hook, noms, fin) en PNG transparents, image par image.
// usage : node render.js edit.json outDir [frame1,frame2 pour test]
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const fs = require('fs');
const [, , editPath, outDir, only] = process.argv;
const E = JSON.parse(fs.readFileSync(editPath, 'utf8'));
const fps = E.fps;
const F = (s) => Math.round(s * fps);

let t = 0; const labels = [];
let hookFrames = 0;
for (const c of E.clips) {
  const st = F(t), d = F(c.dur);
  if (!c.name) hookFrames = st + d;
  else labels.push({ name: c.name, time: '30 SEC', start: st, end: st + F(c.labelDur ?? c.dur) });
  t += c.dur;
}
const total = F(t);
const T = { hook: { ...E.hook, frames: hookFrames }, labels, cta: { text: E.cta.text, start: total - F(E.cta.beforeEnd) } };
fs.mkdirSync(outDir, { recursive: true });
fs.writeFileSync(outDir + '/timeline.json', JSON.stringify({ total, ...T }, null, 1));

(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  await p.goto('file:///home/claude/build/overlay.html');
  await p.evaluate((T) => { window.T = T; T && (globalThis.T = T); }, T);
  await p.evaluate((T) => { T_ = T; }, T).catch(() => {});
  await p.addScriptTag({ content: `T = ${JSON.stringify(T)};` });
  await p.evaluate(() => document.fonts.load('900 50px M').then(() => document.fonts.load('800 50px M')));
  const frames = only ? only.split(',').map(Number) : [...Array(total).keys()];
  for (const fr of frames) {
    await p.evaluate((fr) => render(fr), fr);
    await p.screenshot({ path: `${outDir}/o_${String(fr).padStart(4, '0')}.png`, omitBackground: true });
  }
  await b.close();
  console.log('total frames', total);
})();
