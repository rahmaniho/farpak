// Builds a REAL QR code for the office location (no third-party QR service).
// The encoded value is the Google Maps link from src/content/health.ts, so the
// QR always matches the address shown on the site.
//
// Run: npm run qr
// Output: public/images/brand/office-location-qr.svg (+ .png for print)
import fs from 'node:fs/promises';
import path from 'node:path';
import QRCode from 'qrcode';
import { office477 } from '../src/content/office477.ts';

const OUT_DIR = 'public/images/brand';
const DARK = '#0a1f44'; // brand navy
const LIGHT = '#ffffff';
const TARGET = office477.mapsUrl;

async function main() {
  await fs.mkdir(OUT_DIR, { recursive: true });

  const svg = await QRCode.toString(TARGET, {
    type: 'svg',
    errorCorrectionLevel: 'M',
    margin: 2,
    color: { dark: DARK, light: LIGHT },
  });
  // Add an accessible title so the SVG is not just a decorative bitmap.
  const titled = svg.replace(
    '<svg ',
    `<svg role="img" aria-label="کد QR موقعیت دفتر خدمات سلامت ۴۷۷ در گوگل مپ" `
  );
  const svgPath = path.join(OUT_DIR, 'office-location-qr.svg');
  await fs.writeFile(svgPath, titled);

  const pngPath = path.join(OUT_DIR, 'office-location-qr-512.png');
  await QRCode.toFile(pngPath, TARGET, {
    type: 'png',
    width: 512,
    errorCorrectionLevel: 'M',
    margin: 2,
    color: { dark: DARK, light: LIGHT },
  });

  console.log('QR encoded:', TARGET);
  console.log('written:', svgPath, pngPath);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
