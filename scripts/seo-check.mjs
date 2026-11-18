import fs0 from 'node:fs';
if (JSON.parse(fs0.readFileSync('src/lock.json', 'utf8')).locked) { console.log('SITE LOCKED: skipping ' + process.argv[1].split(/[\\/]/).pop()); process.exit(0); }
import fs from 'node:fs';
import path from 'node:path';
import { parse } from 'node-html-parser';

const SITE = 'https://monarq.ma';
const DIST = path.resolve('dist');
const routes = JSON.parse(fs.readFileSync('src/routes.json', 'utf8'));
let errors = 0, warnings = 0;
const err = (p, m) => { errors++; console.log(`  ✖ ${p}: ${m}`); };
const warn = (p, m) => { warnings++; console.log(`  ⚠ ${p}: ${m}`); };
const fileFor = (p) => path.join(DIST, p === '/' ? 'index.html' : path.join(p, 'index.html'));
const known = new Set(routes.map((r) => r.path));
const titles = new Map();

for (const r of routes) {
  const f = fileFor(r.path);
  if (!fs.existsSync(f)) { err(r.path, 'prerendered file missing'); continue; }
  const root = parse(fs.readFileSync(f, 'utf8'));
  const title = root.querySelector('title')?.text.trim() ?? '';
  const desc = root.querySelector('meta[name="description"]')?.getAttribute('content') ?? '';
  const canon = root.querySelector('link[rel="canonical"]')?.getAttribute('href') ?? '';
  const robots = root.querySelector('meta[name="robots"]')?.getAttribute('content') ?? '';
  const h1s = root.querySelectorAll('h1');
  console.log(`${r.path}  [${r.index ? 'index' : 'noindex'}]`);
  if (!title) err(r.path, 'missing <title>');
  if (title.length > 65) warn(r.path, `title ${title.length} chars (>65)`);
  if (r.index) {
    if (titles.has(title)) err(r.path, `duplicate title with ${titles.get(title)}`); else titles.set(title, r.path);
    if (desc.length < 70 || desc.length > 170) err(r.path, `description length ${desc.length} (want 70-170)`);
    if (!canon.startsWith(SITE)) err(r.path, `bad canonical "${canon}"`);
    if (robots.includes('noindex')) err(r.path, 'indexable route has noindex');
  } else if (!robots.includes('noindex')) err(r.path, 'noindex route missing robots noindex');
  if (h1s.length !== 1) err(r.path, `${h1s.length} <h1> (want 1)`);
  const imgs = root.querySelectorAll('img');
  const noAlt = imgs.filter((i) => i.getAttribute('alt') === undefined);
  if (noAlt.length) err(r.path, `${noAlt.length} <img> without alt`);
  for (const s of root.querySelectorAll('script[type="application/ld+json"]')) {
    try { JSON.parse(s.text); } catch { err(r.path, 'invalid JSON-LD'); }
  }
  if (r.path === '/' && !root.querySelector('script[type="application/ld+json"]')) err(r.path, 'homepage missing Restaurant JSON-LD');
  for (const a of root.querySelectorAll('a[href^="/"]')) {
    const href = a.getAttribute('href').split(/[?#]/)[0].replace(/(.)\/$/, '$1');
    if (!known.has(href) && !/\.[a-z0-9]+$/i.test(href)) err(r.path, `internal link to unknown route ${href}`);
  }
  const navLinks = root.querySelectorAll('a[href^="/"]').length;
  if (r.path === '/' && navLinks < 4) err(r.path, `only ${navLinks} crawlable internal links`);
}

const sm = path.join(DIST, 'sitemap.xml');
if (!fs.existsSync(sm)) err('/sitemap.xml', 'missing');
else {
  const xml = fs.readFileSync(sm, 'utf8');
  for (const r of routes) {
    const inMap = xml.includes(`<loc>${SITE}${r.path}</loc>`);
    if (r.index && !inMap) err('/sitemap.xml', `missing ${r.path}`);
    if (!r.index && inMap) err('/sitemap.xml', `contains noindex route ${r.path}`);
  }
}
if (!fs.existsSync(path.join(DIST, 'robots.txt'))) err('/robots.txt', 'missing');
if (!fs.existsSync(path.join(DIST, '404.html'))) err('/404.html', 'missing');

console.log(`\nSEO check: ${errors} error(s), ${warnings} warning(s)`);
process.exit(errors ? 1 : 0);
