import fs0 from 'node:fs';
if (JSON.parse(fs0.readFileSync('src/lock.json', 'utf8')).locked) { console.log('SITE LOCKED: skipping ' + process.argv[1].split(/[\\/]/).pop()); process.exit(0); }
// Build-time prerender: renders each route in headless Chrome and writes static HTML into dist/.
import http from 'node:http';
import fs from 'node:fs';
import path from 'node:path';
import puppeteer from 'puppeteer';

const DIST = path.resolve('dist');
const routes = JSON.parse(fs.readFileSync('src/routes.json', 'utf8'));
const MIME = { '.html': 'text/html', '.js': 'text/javascript', '.css': 'text/css', '.json': 'application/json', '.svg': 'image/svg+xml',
  '.png': 'image/png', '.jpg': 'image/jpeg', '.jpeg': 'image/jpeg', '.webp': 'image/webp', '.avif': 'image/avif', '.woff2': 'font/woff2',
  '.woff': 'font/woff', '.mp4': 'video/mp4', '.txt': 'text/plain', '.xml': 'application/xml' };

// Pristine SPA shell (kept in memory so prerendered pages never overwrite the fallback)
const shell = fs.readFileSync(path.join(DIST, 'index.html'));

const server = http.createServer((req, res) => {
  const url = decodeURIComponent(req.url.split('?')[0]);
  const file = path.join(DIST, url);
  if (url !== '/' && file.startsWith(DIST) && fs.existsSync(file) && fs.statSync(file).isFile()) {
    res.writeHead(200, { 'Content-Type': MIME[path.extname(file)] || 'application/octet-stream' });
    return fs.createReadStream(file).pipe(res);
  }
  res.writeHead(200, { 'Content-Type': 'text/html' });
  res.end(shell);
});

await new Promise((r) => server.listen(0, r));
const base = `http://localhost:${server.address().port}`;

const candidates = [process.env.CHROME_PATH,
  'C:\\Program Files\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Google\\Chrome\\Application\\chrome.exe',
  'C:\\Program Files (x86)\\Microsoft\\Edge\\Application\\msedge.exe',
  '/usr/bin/google-chrome', '/usr/bin/chromium', '/usr/bin/chromium-browser'].filter(Boolean);
const executablePath = candidates.find((p) => fs.existsSync(p));
const browser = await puppeteer.launch({ headless: true, executablePath, args: ['--no-sandbox', '--disable-setuid-sandbox'] });
const targets = [...routes.map((r) => ({ path: r.path, out: r.path === '/' ? 'index.html' : path.join(r.path, 'index.html') })),
  { path: '/__not-found__', out: '404.html' }];

for (const t of targets) {
  const page = await browser.newPage();
  await page.setViewport({ width: 1440, height: 900 });
  await page.emulateMediaFeatures([{ name: 'prefers-reduced-motion', value: 'reduce' }]);
  await page.evaluateOnNewDocument(() => {
    try { localStorage.setItem('monarq_maintenance_unlocked', 'true'); localStorage.setItem('monarq_lang', 'fr'); } catch {}
  });
  await page.goto(base + t.path, { waitUntil: 'networkidle0', timeout: 60000 });
  await page.waitForSelector('h1', { timeout: 20000 });
  await page.waitForSelector('link[rel="canonical"]', { timeout: 20000 });
  await new Promise((r) => setTimeout(r, 600));
  const html = '<!doctype html>\n' + await page.evaluate(() => document.documentElement.outerHTML);
  const outFile = path.join(DIST, t.out);
  fs.mkdirSync(path.dirname(outFile), { recursive: true });
  fs.writeFileSync(outFile, html);
  console.log('prerendered', t.path, '->', t.out, `(${(html.length / 1024).toFixed(0)} KB)`);
  await page.close();
}

await browser.close();
server.close();
// Keep SPA shell available for client-side fallbacks
fs.writeFileSync(path.join(DIST, '_shell.html'), shell);
