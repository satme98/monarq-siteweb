import express from 'express';
import compression from 'compression';
import path from 'node:path';
import fs from 'node:fs';
import { fileURLToPath } from 'node:url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));
const DIST = path.join(__dirname, 'dist');
const CANONICAL_HOST = 'monarq.ma';
const LOCKED = fs.existsSync(path.join(DIST, '.locked'));
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
    return res.redirect(301, req.path.replace(/\/+$/, '') + q);
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
  if (LOCKED) return res.set('Cache-Control', 'no-cache').sendFile(path.join(DIST, 'index.html'));
  const file = path.join(DIST, req.path, 'index.html');
  if (file.startsWith(DIST) && fs.existsSync(file)) {
    return res.set('Cache-Control', 'no-cache').sendFile(file);
  }
  res.status(404).set('Cache-Control', 'no-cache').sendFile(path.join(DIST, '404.html'));
});

const port = process.env.PORT || 3000;
app.listen(port, () => console.log(`MONARQ server listening on :${port}`));
