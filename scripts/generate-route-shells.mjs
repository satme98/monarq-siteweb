import fs from 'node:fs';
import path from 'node:path';

const DIST = path.resolve('dist');
const indexPath = path.join(DIST, 'index.html');
const routesPath = path.resolve('src', 'routes.json');

if (!fs.existsSync(indexPath)) {
  console.error('generate-route-shells: dist/index.html not found');
  process.exit(1);
}

const shellHtml = fs.readFileSync(indexPath, 'utf8');
const routes = JSON.parse(fs.readFileSync(routesPath, 'utf8'));
const generated = [];

for (const route of routes) {
  if (!route?.path || route.path === '/') continue;
  const rel = String(route.path).replace(/^\/+|\/+$/g, '');
  if (!rel) continue;
  const target = path.join(DIST, rel, 'index.html');
  fs.mkdirSync(path.dirname(target), { recursive: true });
  fs.writeFileSync(target, shellHtml);
  generated.push(`${rel}/index.html`);
}

fs.writeFileSync(path.join(DIST, '404.html'), shellHtml);
fs.writeFileSync(path.join(DIST, '_shell.html'), shellHtml);
generated.push('404.html', '_shell.html');

console.log(`Generated ${generated.length} route shell(s): ${generated.join(', ')}`);
