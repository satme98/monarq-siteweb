import fs0 from 'node:fs';
if (JSON.parse(fs0.readFileSync('src/lock.json', 'utf8')).locked) { console.log('SITE LOCKED: skipping ' + process.argv[1].split(/[\\/]/).pop()); process.exit(0); }
import fs from 'node:fs';
import path from 'node:path';
import { execSync } from 'node:child_process';

const SITE = 'https://monarq.ma';
const routes = JSON.parse(fs.readFileSync('src/routes.json', 'utf8')).filter((r) => r.index);
let lastmod = new Date().toISOString().slice(0, 10);
try { lastmod = execSync('git log -1 --format=%cs', { encoding: 'utf8' }).trim() || lastmod; } catch {}

const urls = routes.map((r) => `  <url>
    <loc>${SITE}${r.path === '/' ? '/' : r.path}</loc>
    <lastmod>${lastmod}</lastmod>
    <changefreq>${r.changefreq}</changefreq>
    <priority>${r.priority.toFixed(1)}</priority>
  </url>`).join('\n');

const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
fs.mkdirSync('dist', { recursive: true });
fs.writeFileSync(path.join('dist', 'sitemap.xml'), xml);
console.log(`sitemap.xml written with ${routes.length} URLs (lastmod ${lastmod})`);
