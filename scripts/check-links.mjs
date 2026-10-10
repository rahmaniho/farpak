// Internal link checker over a fresh `dist/` build.
// Run: npm run build && node scripts/check-links.mjs
// Verifies that every absolute internal href/src in the built HTML resolves to
// a generated file (or directory index), so no page ships a dead internal link.
import fs from 'node:fs';
import path from 'node:path';

const DIST = 'dist';
const htmlFiles = [];
(function walk(dir) {
  for (const entry of fs.readdirSync(dir, { withFileTypes: true })) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.name.endsWith('.html')) htmlFiles.push(full);
  }
})(DIST);

const exists = (urlPath) => {
  const clean = urlPath.split('#')[0].split('?')[0];
  if (clean === '' || clean === '/') return fs.existsSync(path.join(DIST, 'index.html'));
  const direct = path.join(DIST, clean);
  if (fs.existsSync(direct) && fs.statSync(direct).isFile()) return true;
  return fs.existsSync(path.join(DIST, clean.replace(/\/$/, ''), 'index.html')) || fs.existsSync(`${direct}.html`);
};

let broken = 0;
let checked = 0;
for (const file of htmlFiles) {
  const html = fs.readFileSync(file, 'utf8');
  const attrs = html.matchAll(/(?:href|src)="([^"]+)"/g);
  for (const [, raw] of attrs) {
    if (!raw.startsWith('/') || raw.startsWith('//')) continue; // external / protocol-relative
    checked += 1;
    if (!exists(raw)) {
      broken += 1;
      console.log(`BROKEN ${raw}  ← ${file}`);
    }
  }
}
console.log(`checked ${checked} internal references across ${htmlFiles.length} pages → ${broken} broken`);
process.exit(broken > 0 ? 1 : 0);
