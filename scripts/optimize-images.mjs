import fs from 'fs';
import path from 'path';
import sharp from 'sharp';

const ROOT = path.resolve(process.cwd());
const SRC_DIR = path.join(ROOT, 'assets', 'originals');
const OUT_DIR = path.join(ROOT, 'src', 'assets');

const sizes = [480, 768, 1080, 1440];

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

async function processImage(inputPath, outputBase) {
  const fileBase = path.basename(outputBase, path.extname(outputBase));
  for (const w of sizes) {
    const outPath = `${outputBase.replace(/\\\\/g, '/')}-${w}.webp`;
    await sharp(inputPath)
      .resize({ width: w })
      .webp({ quality: 80 })
      .toFile(outPath);
    console.log('✓', outPath);
  }
}

function walk(dir) {
  const entries = fs.readdirSync(dir, { withFileTypes: true });
  for (const entry of entries) {
    const full = path.join(dir, entry.name);
    if (entry.isDirectory()) walk(full);
    else if (entry.isFile()) {
      const ext = path.extname(full).toLowerCase();
      const supported = ['.jpg', '.jpeg', '.png', '.webp', '.tif', '.tiff'];
      if (!supported.includes(ext)) {
        console.warn('Skip unsupported', full);
        continue;
      }
      const rel = path.relative(SRC_DIR, full);
      const outBaseDir = path.join(OUT_DIR, path.dirname(rel));
      ensureDir(outBaseDir);
      const outBase = path.join(outBaseDir, path.basename(rel, path.extname(rel)));
      processImage(full, outBase);
    }
  }
}

ensureDir(OUT_DIR);
if (!fs.existsSync(SRC_DIR)) {
  console.error('No originals found at', SRC_DIR);
  process.exit(1);
}
walk(SRC_DIR);