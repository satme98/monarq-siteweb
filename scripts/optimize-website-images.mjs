import { copyFileSync, existsSync, mkdirSync, readFileSync, statSync, writeFileSync } from 'node:fs';
import { execFileSync } from 'node:child_process';
import path from 'node:path';

const SOURCE_ROOT = 'public';
const TARGET_ROOT = 'public';

const PHOTOGRAPHER_STEMS = [
  '_DSC102', '_DSC106', '_DSC110', '_DSC6943-raw', '_DSC6971-Modifier',
  '_DSC6976', '_DSC6977-raw', '_DSC6983', '_DSC6992', '_DSC6994',
  '_DSC6998', '_DSC7004-raw', '_DSC7007', '_DSC7015', '_DSC7021',
  '_DSC7025', '_DSC7028-raw', '_DSC7035', '_DSC7043', '_DSC7048',
  '_DSC7049', '_DSC7050', '_DSC7051', '_DSC7052', '_DSC7056',
  '_DSC7063', '_DSC7064', '_DSC7073', '_DSC7079', '_DSC7083',
  '_DSC7084', '_DSC7085', '_DSC7091', '_DSC7094', '_DSC7096',
  '_DSC7099', '_DSC7106', '_DSC7108', '_DSC7113', '_DSC7115',
  '_DSC7117', '_DSC7121', '_DSC7124', '_DSC7163-raw', '_DSC7178-raw',
  '_DSC7196-raw',
];

const GENERATED_MENU_STEMS = [
  'baghrir-amlou', 'omelette-champignons', 'omelette-charcuterie',
  'omelette-fromage', 'omelette-nature', 'omelette-saumon',
  'pain-grille', 'trio-marocain', 'viennoiserie',
];

/** @type {Array<{ src: string; dest: string; maxWidth: number; quality?: number; format: 'webp' | 'png' }>} */
const IMAGE_JOBS = [
  // ── brand/ ────────────────────────────────────────────────────────────────
  { src: '/images/monarq-seal-hd.png', dest: '/website-images/brand/monarq-seal-hd.png', maxWidth: 256, format: 'png' },
  { src: '/images/monarq-logo-white-hd.png', dest: '/website-images/brand/monarq-logo-white-hd.webp', maxWidth: 600, quality: 90, format: 'webp' },
  { src: '/images/monarq-logo-dark-hd.png', dest: '/website-images/brand/monarq-logo-dark-hd.webp', maxWidth: 600, quality: 90, format: 'webp' },
  { src: '/images/monarq-badge-seal.png', dest: '/website-images/brand/monarq-badge-seal.webp', maxWidth: 400, quality: 88, format: 'webp' },
  { src: '/images/reservation-logo-white.png', dest: '/website-images/brand/reservation-logo-white.webp', maxWidth: 600, quality: 90, format: 'webp' },
  { src: '/images/ornament-waffle.png', dest: '/website-images/brand/ornament-waffle.webp', maxWidth: 480, quality: 80, format: 'webp' },
  { src: '/images/ornament-crepes.png', dest: '/website-images/brand/ornament-crepes.webp', maxWidth: 480, quality: 80, format: 'webp' },

  // ── textures/ ─────────────────────────────────────────────────────────────
  { src: '/images/kintsugi-marble-bg.jpg', dest: '/website-images/textures/kintsugi-marble-bg.webp', maxWidth: 1376, quality: 78, format: 'webp' },
  { src: '/images/kintsugi-marble-card.jpg', dest: '/website-images/textures/kintsugi-marble-card.webp', maxWidth: 960, quality: 78, format: 'webp' },
  { src: '/images/marble-bg-1.png', dest: '/website-images/textures/marble-bg-1.webp', maxWidth: 1400, quality: 78, format: 'webp' },
  { src: '/images/marble-gold-vein.png', dest: '/website-images/textures/marble-gold-vein.webp', maxWidth: 1400, quality: 78, format: 'webp' },
  { src: '/images/localisation-monarq-poster.jpg', dest: '/website-images/textures/localisation-monarq-poster.webp', maxWidth: 768, quality: 80, format: 'webp' },

  // ── interior/ ─────────────────────────────────────────────────────────────
  { src: '/images/monarq-lobby-reception.png', dest: '/website-images/interior/monarq-lobby-reception.webp', maxWidth: 1600, quality: 82, format: 'webp' },
  { src: '/images/Monaro_Dining-Room.png', dest: '/website-images/interior/Monaro_Dining-Room.webp', maxWidth: 1448, quality: 82, format: 'webp' },
  { src: '/images/monaro-restaurant-interior-new.png', dest: '/website-images/interior/monaro-restaurant-interior-new.webp', maxWidth: 1600, quality: 82, format: 'webp' },
  { src: '/images/monarq-restaurant-entrance-new.png', dest: '/website-images/interior/monarq-restaurant-entrance-new.webp', maxWidth: 1600, quality: 82, format: 'webp' },
  { src: '/images/monarq-reception-hall.png', dest: '/website-images/interior/monarq-reception-hall.webp', maxWidth: 720, quality: 82, format: 'webp' },
  { src: '/images/monarq-hostess-marble.jpg', dest: '/website-images/interior/monarq-hostess-marble.webp', maxWidth: 640, quality: 82, format: 'webp' },
  { src: '/images/monarq-table-six.jpg', dest: '/website-images/interior/monarq-table-six.webp', maxWidth: 1200, quality: 82, format: 'webp' },
  { src: '/images/reservation-interior.png', dest: '/website-images/interior/reservation-interior.webp', maxWidth: 960, quality: 82, format: 'webp' },
  { src: '/images/concept-terrace.jpg', dest: '/website-images/interior/concept-terrace.webp', maxWidth: 640, quality: 82, format: 'webp' },
  { src: '/images/IMG_8949.jpg', dest: '/website-images/interior/IMG_8949.webp', maxWidth: 1200, quality: 82, format: 'webp' },
  { src: '/images/staggered-story-1.jpg', dest: '/website-images/interior/staggered-story-1.webp', maxWidth: 1200, quality: 82, format: 'webp' },
  { src: '/images/interlude-atmosphere.jpg', dest: '/website-images/interior/interlude-atmosphere.webp', maxWidth: 1600, quality: 82, format: 'webp' },
  { src: '/images/hero-interior.jpg', dest: '/website-images/interior/hero-interior.webp', maxWidth: 1600, quality: 82, format: 'webp' },
  { src: '/images/gallery-coffee-4.jpg', dest: '/website-images/interior/gallery-coffee-4.webp', maxWidth: 1080, quality: 82, format: 'webp' },

  // ── moments/ ──────────────────────────────────────────────────────────────
  { src: '/images/moments/img-1020.jpg', dest: '/website-images/moments/img-1020.webp', maxWidth: 1080, quality: 80, format: 'webp' },
  { src: '/images/moments/img-1040.jpg', dest: '/website-images/moments/img-1040.webp', maxWidth: 1080, quality: 80, format: 'webp' },
  { src: '/images/moments/img-1050.jpg', dest: '/website-images/moments/img-1050.webp', maxWidth: 1080, quality: 80, format: 'webp' },

  // ── instagram/ ────────────────────────────────────────────────────────────
  { src: '/images/instagram/ig-01.jpg', dest: '/website-images/instagram/ig-01.webp', maxWidth: 720, quality: 80, format: 'webp' },
  { src: '/images/instagram/ig-02.jpg', dest: '/website-images/instagram/ig-02.webp', maxWidth: 720, quality: 80, format: 'webp' },
  { src: '/images/instagram/ig-03.jpg', dest: '/website-images/instagram/ig-03.webp', maxWidth: 720, quality: 80, format: 'webp' },
  { src: '/images/instagram/ig-04.jpg', dest: '/website-images/instagram/ig-04.webp', maxWidth: 720, quality: 80, format: 'webp' },

  // ── dishes/ ───────────────────────────────────────────────────────────────
  ...PHOTOGRAPHER_STEMS.map(stem => ({
    src: `/images/photographer/${stem}.jpg`,
    dest: `/website-images/dishes/${stem}.webp`,
    maxWidth: 1050,
    quality: 80,
    format: /** @type {const} */ ('webp'),
  })),
  ...GENERATED_MENU_STEMS.map(stem => ({
    src: `/images/generated-menu/${stem}.webp`,
    dest: `/website-images/dishes/${stem}.webp`,
    maxWidth: 900,
    quality: 80,
    format: /** @type {const} */ ('webp'),
  })),
  { src: '/images/highlight-angus.jpg', dest: '/website-images/dishes/highlight-angus.webp', maxWidth: 1050, quality: 80, format: 'webp' },
];

/** Probe width & height of an image with ffprobe. */
function probeDimensions(filePath) {
  const out = execFileSync('ffprobe', [
    '-v', 'error',
    '-select_streams', 'v:0',
    '-show_entries', 'stream=width,height',
    '-of', 'csv=p=0:s=x',
    filePath,
  ], { encoding: 'utf8' }).trim();
  const [width, height] = out.split('x').map(Number);
  return { width, height };
}

/** Compress and optionally downscale an image using ffmpeg. */
function encodeImage({ src, dest, maxWidth, quality, format }) {
  const inputPath = path.join(SOURCE_ROOT, src.replace(/^\//, ''));
  const outputPath = path.join(TARGET_ROOT, dest.replace(/^\//, ''));
  if (!existsSync(inputPath)) {
    throw new Error(`Missing source image: ${inputPath}`);
  }
  mkdirSync(path.dirname(outputPath), { recursive: true });

  const scaleFilter = `scale='min(${maxWidth},iw)':-2`;
  const encodeArgs = format === 'png'
    ? ['-c:v', 'png', '-compression_level', '9']
    : ['-c:v', 'libwebp', '-quality', String(quality ?? 80), '-compression_level', '6'];

  execFileSync('ffmpeg', [
    '-v', 'error', '-y',
    '-i', inputPath,
    '-vf', scaleFilter,
    '-frames:v', '1',
    ...encodeArgs,
    outputPath,
  ]);

  return {
    beforeBytes: statSync(inputPath).size,
    afterBytes: statSync(outputPath).size,
  };
}

/** Copy or generate responsive variants and write the target manifest. */
function syncResponsiveVariants({ sourceDir, targetDir, manifestInput, manifestOutput, srcToDestMap, allowedOldKeys }) {
  mkdirSync(targetDir, { recursive: true });
  const existingManifest = JSON.parse(readFileSync(manifestInput, 'utf8'));
  const nextManifest = {};
  let copiedCount = 0;

  for (const oldKey of allowedOldKeys) {
    const entry = existingManifest[oldKey];
    const newKey = srcToDestMap.get(oldKey);
    if (!entry || !newKey) {
      throw new Error(`Cannot map responsive entry for ${oldKey}`);
    }

    nextManifest[newKey] = entry;
    for (const width of entry.widths) {
      for (const ext of ['webp', 'avif']) {
        const filename = `${entry.stem}-${width}.${ext}`;
        const srcVariant = path.join(sourceDir, filename);
        const destVariant = path.join(targetDir, filename);
        if (existsSync(srcVariant)) {
          copyFileSync(srcVariant, destVariant);
        } else {
          const sourceAsset = path.join(TARGET_ROOT, newKey.replace(/^\//, ''));
          const encodeArgs = ext === 'webp'
            ? ['-c:v', 'libwebp', '-quality', '80']
            : ['-c:v', 'libaom-av1', '-crf', '34', '-cpu-used', '8', '-pix_fmt', 'yuv420p'];
          execFileSync('ffmpeg', [
            '-v', 'error', '-y',
            '-i', sourceAsset,
            '-vf', `scale=${width}:-2`,
            '-frames:v', '1',
            ...encodeArgs,
            destVariant,
          ]);
        }
        copiedCount++;
      }
    }
  }

  writeFileSync(manifestOutput, JSON.stringify(nextManifest, null, 2) + '\n');
  return copiedCount;
}

const srcToDest = new Map(IMAGE_JOBS.map(job => [job.src, job.dest]));

let totalBefore = 0;
let totalAfter = 0;
for (const job of IMAGE_JOBS) {
  const { beforeBytes, afterBytes } = encodeImage(job);
  totalBefore += beforeBytes;
  totalAfter += afterBytes;
}

// 36 active gallery items (excluding unused _DSC7011.jpg)
const galleryDataContent = readFileSync('src/data/galleryData.ts', 'utf8');
const activeGalleryOldPaths = [...new Set([...galleryDataContent.matchAll(/['"](\/images\/[^'"]+)['"]/g)].map(m => m[1]))];
const galleryCount = syncResponsiveVariants({
  sourceDir: 'public/images/gallery-responsive',
  targetDir: 'public/website-images/responsive/gallery',
  manifestInput: 'src/data/galleryVariants.json',
  manifestOutput: 'src/data/galleryVariants.json',
  srcToDestMap: srcToDest,
  allowedOldKeys: activeGalleryOldPaths,
});

// 7 active SitePicture items (excluding kintsugi-marble-bg & localisation-monarq-poster which are referenced directly)
const activeSitePictureOldPaths = [
  '/images/monarq-lobby-reception.png',
  '/images/concept-terrace.jpg',
  '/images/moments/img-1020.jpg',
  '/images/moments/img-1040.jpg',
  '/images/moments/img-1050.jpg',
  '/images/ornament-crepes.png',
  '/images/ornament-waffle.png',
];
const siteCount = syncResponsiveVariants({
  sourceDir: 'public/images/site-responsive',
  targetDir: 'public/website-images/responsive/site',
  manifestInput: 'src/data/siteImageVariants.json',
  manifestOutput: 'src/data/siteImageVariants.json',
  srcToDestMap: srcToDest,
  allowedOldKeys: activeSitePictureOldPaths,
});

// Preserve compressed JPEG OpenGraph image for social card compatibility
const ogSrc = 'public/images/og/monarq-og-default.jpg';
const ogDest = 'public/website-images/og/monarq-og-default.jpg';
if (existsSync(ogSrc)) {
  mkdirSync(path.dirname(ogDest), { recursive: true });
  copyFileSync(ogSrc, ogDest);
}

const mb = bytes => (bytes / (1024 * 1024)).toFixed(2);
const savingsPct = (((totalBefore - totalAfter) / totalBefore) * 100).toFixed(1);
console.log(`Processed ${IMAGE_JOBS.length} source images: ${mb(totalBefore)} MB -> ${mb(totalAfter)} MB (-${savingsPct}%)`);
console.log(`Synced ${galleryCount} gallery responsive files and ${siteCount} site responsive files.`);
