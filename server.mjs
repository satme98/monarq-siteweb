import express from 'express';
import compression from 'compression';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const INDEX_FILE = path.join(DIST, 'index.html');
const NOT_FOUND_FILE = path.join(DIST, '404.html');
const CANONICAL_HOST = 'monarq.ma';
const LOCKED = fs.existsSync(path.join(DIST, '.locked'));
const STATIC_ASSET_RE = /^\/(?:assets|website-images|videos|fonts)(?:\/|$)|\.(?:js|mjs|css|map|json|xml|txt|svg|png|jpe?g|webp|avif|gif|ico|woff2?|ttf|otf|mp4|mov|webm|pdf)$/i;

function normalizeRoutePath(pathname) {
  const collapsed = (pathname || '/').replace(/\/{2,}/g, '/');
  const withoutIndex = collapsed.replace(/\/index\.html$/i, '') || '/';
  const clean = withoutIndex.length > 1 ? withoutIndex.replace(/\/+$/, '') : withoutIndex;
  return clean.toLowerCase();
}

let knownRoutes = new Set(['/']);
try {
  const routesJson = JSON.parse(fs.readFileSync(path.join(__dirname, 'src', 'routes.json'), 'utf8'));
  knownRoutes = new Set(routesJson.map((r) => normalizeRoutePath(r.path)));
} catch {
  // Fallback when only dist/ and server.mjs are deployed
}

const app = express();

app.disable('x-powered-by');
app.set('trust proxy', true);
app.use(compression());

app.use((req, res, next) => {
  const host = (req.headers.host || '').replace(/:\d+$/, '');
  const isLocal = host === 'localhost' || host === '127.0.0.1';
  // Canonical host + https (301)
  if (!isLocal && (host === `www.${CANONICAL_HOST}` || req.protocol === 'http')) {
    return res.redirect(301, `https://${CANONICAL_HOST}${req.originalUrl}`);
  }
  // Strip trailing slash (301)
  if (req.path.length > 1 && req.path.endsWith('/')) {
    const q = req.originalUrl.slice(req.path.length);
    const target = req.path.replace(/\/+$/, '') || '/';
    return res.redirect(301, target + q);
  }
  res.set({
    'Strict-Transport-Security': 'max-age=31536000; includeSubDomains',
    'X-Content-Type-Options': 'nosniff',
    'Referrer-Policy': 'strict-origin-when-cross-origin',
  });
  if (LOCKED) res.set('X-Robots-Tag', 'noindex, nofollow, noarchive');
  next();
});

app.use('/assets', express.static(path.join(DIST, 'assets'), { immutable: true, maxAge: '1y' }));
app.use(express.static(DIST, { maxAge: '7d', index: false, redirect: false }));

app.use((req, res) => {
  if (STATIC_ASSET_RE.test(req.path)) {
    return res.status(404).end();
  }
  const cleanPath = normalizeRoutePath(req.path);
  const safePath = cleanPath.startsWith('/') ? cleanPath : '/' + cleanPath;
  const routeFile = safePath === '/'
    ? INDEX_FILE
    : path.resolve(DIST, '.' + safePath, 'index.html');
  const isSafeRouteFile = routeFile === INDEX_FILE || routeFile.startsWith(DIST + path.sep);
  const hasRouteFile = isSafeRouteFile && fs.existsSync(routeFile);

  if (LOCKED) {
    return res.set('Cache-Control', 'no-cache').sendFile(hasRouteFile ? routeFile : INDEX_FILE);
  }
  if (hasRouteFile) {
    return res.set('Cache-Control', 'no-cache').sendFile(routeFile);
  }
  if (knownRoutes.has(safePath)) {
    return res.set('Cache-Control', 'no-cache').sendFile(INDEX_FILE);
  }
  const notFoundTarget = fs.existsSync(NOT_FOUND_FILE) ? NOT_FOUND_FILE : INDEX_FILE;
  res.status(404).set('Cache-Control', 'no-cache').sendFile(notFoundTarget);
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`MONARQ server listening on :${port}`));
