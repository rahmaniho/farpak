// Generates AVIF and WebP variants (800w and 1600w) next to every JPG in public/images.
// Run: npm run images   (safe to re-run; overwrites variants)
import fs from 'node:fs';
import path from 'node:path';
import sharp from 'sharp';

const DIR = 'public/images';
const WIDTHS = [800, 1600];
const FORMATS = {
  avif: { encode: (img) => img.avif({ quality: 50, effort: 4 }) },
  webp: { encode: (img) => img.webp({ quality: 80 }) },
};

const sources = fs.readdirSync(DIR).filter((f) => /\.jpe?g$/i.test(f) && !/-\d+\.(avif|webp)$/.test(f));
for (const file of sources) {
  const base = path.parse(file).name;
  const input = path.join(DIR, file);
  const meta = await sharp(input).metadata();
  for (const w of WIDTHS) {
    const width = Math.min(w, meta.width ?? w);
    for (const [ext, { encode }] of Object.entries(FORMATS)) {
      const out = path.join(DIR, `${base}-${w}.${ext}`);
      await encode(sharp(input).resize({ width, withoutEnlargement: true })).toFile(out);
    }
  }
  console.log('optimized', file);
}
