// Builds brand assets from the master logo and watermarks every photo.
//  - Originals live in images-source/ (never overwritten). Watermarked JPGs are written to public/images/.
//  - Favicons and the Open Graph image are generated from brand/farpak-logo.png.
// Run: npm run brand   (then npm run images to regenerate AVIF/WebP variants)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const LOGO = 'brand/farpak-logo.png';
const SRC = 'images-source';
const OUT = 'public/images';

// Watermark: bottom-right corner on every locale (same position for fa and en), 16% of image width, 55% opacity.
const WM_RATIO = 0.16;
const WM_OPACITY = 0.55;
const WM_MARGIN = 0.03;

async function logoWithOpacity(size, opacity) {
  const { data, info } = await sharp(LOGO).resize(size, size, { fit: 'inside' }).ensureAlpha().raw().toBuffer({ resolveWithObject: true });
  for (let i = 3; i < data.length; i += 4) data[i] = Math.round(data[i] * opacity);
  return sharp(data, { raw: { width: info.width, height: info.height, channels: 4 } }).png().toBuffer({ resolveWithObject: true });
}

async function watermark(file) {
  const input = path.join(SRC, file);
  const { width, height } = await sharp(input).metadata();
  const wmWidth = Math.round(width * WM_RATIO);
  const { data: logo, info } = await logoWithOpacity(wmWidth, WM_OPACITY);
  const margin = Math.round(width * WM_MARGIN);
  await sharp(input)
    .composite([{ input: logo, left: width - info.width - margin, top: height - info.height - margin }])
    .jpeg({ quality: 88, mozjpeg: true })
    .toFile(path.join(OUT, file));
}

// Favicons and touch icons from the master logo (transparent background).
async function icons() {
  await sharp(LOGO).resize(256, 256).png({ compressionLevel: 9 }).toFile('public/favicon-256.png');
  await sharp(LOGO).resize(180, 180).png({ compressionLevel: 9 }).toFile('public/apple-touch-icon.png');
  await sharp(LOGO).resize(512, 512).png({ compressionLevel: 9 }).toFile('public/images/brand/logo-512.png');
  await sharp(LOGO).resize(256, 256).webp({ quality: 90 }).toFile('public/images/brand/logo-256.webp');
}

const photos = fs.readdirSync(SRC).filter((f) => /\.jpe?g$/i.test(f));
for (const file of photos) {
  await watermark(file);
  console.log('watermarked', file);
}
await icons();
console.log(`done: ${photos.length} photos, icons`);
