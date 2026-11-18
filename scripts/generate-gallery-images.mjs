import { readFileSync, writeFileSync, mkdirSync } from 'node:fs';
import { execFileSync } from 'node:child_process';

const data = readFileSync('src/data/galleryData.ts', 'utf8');
const paths = [...new Set([...data.matchAll(/['"](\/website-images\/[^'"]+)['"]/g)].map(match => match[1]))];
const variants = {};
mkdirSync('public/website-images/responsive/gallery', { recursive: true });
for (const source of paths) {
  const input = 'public' + source;
  const [width, height] = execFileSync('ffprobe', [
    '-v', 'error', '-select_streams', 'v:0', '-show_entries', 'stream=width,height',
    '-of', 'csv=p=0:s=x', input,
  ], { encoding: 'utf8' }).trim().split('x').map(Number);
  const widths = [...new Set([480, 768, 1200, 1920].map(size => Math.min(size, width)))];
  const stem = source.split('/').pop().replace(/\.[^.]+$/, '');
  variants[source] = { stem, width, height, widths };
  for (const size of widths) {
    for (const extension of ['webp', 'avif']) {
      const encode = extension === 'webp'
        ? ['-c:v', 'libwebp', '-quality', '80']
        : ['-c:v', 'libaom-av1', '-crf', '34', '-cpu-used', '8', '-pix_fmt', 'yuv420p'];
      execFileSync('ffmpeg', ['-v', 'error', '-y', '-i', input, '-vf', 'scale=' + size + ':-2',
        '-frames:v', '1', ...encode, 'public/website-images/responsive/gallery/' + stem + '-' + size + '.' + extension]);
    }
  }
}
writeFileSync('src/data/galleryVariants.json', JSON.stringify(variants, null, 2) + '\n');
