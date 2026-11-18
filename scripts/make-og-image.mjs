import sharp from 'sharp';
import fs from 'node:fs';
fs.mkdirSync('public/website-images/og', { recursive: true });
await sharp('public/website-images/dishes/_DSC6976.webp')
  .resize(1200, 630, { fit: 'cover', position: 'attention' })
  .jpeg({ quality: 82, mozjpeg: true })
  .toFile('public/website-images/og/monarq-og-default.jpg');
console.log('og image written');
