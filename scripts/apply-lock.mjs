// When src/lock.json has locked:true, make dist/ safe to deploy: noindex everywhere, no sitemap, robots Disallow all.
import fs from 'node:fs';
const { locked } = JSON.parse(fs.readFileSync('src/lock.json', 'utf8'));
if (!locked) {
  console.log('SITE UNLOCKED: normal SEO output');
  process.exit(0);
}
let html = fs.readFileSync('dist/index.html', 'utf8');
html = html.replace('<head>', '<head>\n    <meta name="robots" content="noindex, nofollow, noarchive" />');
fs.writeFileSync('dist/index.html', html);
fs.writeFileSync('dist/robots.txt', 'User-agent: *\nDisallow: /\n');
fs.rmSync('dist/llms.txt', { force: true });
fs.rmSync('dist/sitemap.xml', { force: true });
fs.writeFileSync('dist/.locked', 'locked\n');
console.log('SITE LOCKED: noindex + robots Disallow + .locked marker written');
