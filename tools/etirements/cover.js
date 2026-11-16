// usage : node cover.js fond.jpg top|bottom sortie.png "JOUR 4 / 22" "PRÉPA 1ER TRAIL" "petite ligne"
const { chromium } = require('/opt/npm-tools/node_modules/playwright');
const [, , bg, pos, out, day, hl, sub] = process.argv;
(async () => {
  const b = await chromium.launch({ args: ['--allow-file-access-from-files'] });
  const p = await b.newPage({ viewport: { width: 1080, height: 1920 } });
  const qs = new URLSearchParams({ bg: 'file://' + bg, pos, day, hl, sub });
  await p.goto('file://' + __dirname + '/cover.html?' + qs);
  await p.evaluate(() => Promise.all([document.fonts.load('900 50px M'), document.fonts.load('800 50px M')]));
  await p.waitForTimeout(200);
  await p.screenshot({ path: out });
  await b.close();
})();
