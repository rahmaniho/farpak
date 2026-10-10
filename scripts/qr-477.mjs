// Generates the REAL QR code for the office location (Google Maps link).
// Run: node scripts/qr-477.mjs  →  public/images/s477-qr.svg
import QRCode from 'qrcode';
import fs from 'node:fs';

const TARGET = 'https://www.google.com/maps?q=36.2678594,50.0135519';
const svg = await QRCode.toString(TARGET, {
  type: 'svg',
  margin: 2,
  errorCorrectionLevel: 'M',
  color: { dark: '#0c2440', light: '#ffffff' },
});
fs.writeFileSync('public/images/s477-qr.svg', svg);
console.log('wrote public/images/s477-qr.svg', svg.length, 'bytes');
