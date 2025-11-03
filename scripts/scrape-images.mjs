import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const BASE = 'https://preview--ifni-sunset-magic.lovable.app';
const PAGES = [
  `${BASE}/`,
  `${BASE}/#activities`,
];

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const originalsRoot = path.join(ROOT, 'assets', 'originals');
const galleryDir = path.join(originalsRoot, 'gallery');
const heroDir = path.join(originalsRoot, 'hero');

function ensureDir(dir) {
  fs.mkdirSync(dir, { recursive: true });
}

ensureDir(galleryDir);
ensureDir(heroDir);

async function fetchHTML(url) {
  const res = await fetch(url, { headers: { 'User-Agent': 'Trae-Scraper/1.0' } });
  if (!res.ok) throw new Error(`Failed to fetch ${url}: ${res.status}`);
  return await res.text();
}

function extractImgUrls(html, baseUrl) {
  const urls = new Set();
  const imgRegex = /<img[^>]+src=["']([^"']+)["']/gi;
  let match;
  while ((match = imgRegex.exec(html)) !== null) {
    const raw = match[1];
    try {
      const abs = new URL(raw, baseUrl).href;
      // Skip data URIs and icons
      if (abs.startsWith('data:')) continue;
      if (/(favicon|apple-touch-icon|logo)/i.test(abs)) continue;
      urls.add(abs);
    } catch {}
  }
  return Array.from(urls);
}

async function download(url, outPath) {
  const res = await fetch(url);
  if (!res.ok) throw new Error(`Failed to download ${url}: ${res.status}`);
  const buf = Buffer.from(await res.arrayBuffer());
  fs.writeFileSync(outPath, buf);
}

function safeBasename(u) {
  const { pathname } = new URL(u);
  const base = path.basename(pathname);
  // Ensure extension is image-like; default to .jpg
  const ext = path.extname(base) || '.jpg';
  const name = path.basename(base, ext).replace(/[^a-z0-9-_]/gi, '-');
  return `${name}${ext}`;
}

(async () => {
  const allUrls = new Set();
  for (const page of PAGES) {
    try {
      const html = await fetchHTML(page);
      const urls = extractImgUrls(html, page);
      urls.forEach(u => allUrls.add(u));
    } catch (e) {
      console.error('Error scraping page', page, e.message);
    }
  }

  const urls = Array.from(allUrls);
  if (urls.length === 0) {
    console.log('No images found.');
    process.exit(0);
  }

  console.log(`Found ${urls.length} image URLs. Downloading to originals...`);

  let heroAssigned = false;
  const downloaded = [];

  for (const u of urls) {
    const base = safeBasename(u);
    const outFile = path.join(galleryDir, base);
    try {
      await download(u, outFile);
      downloaded.push(outFile);
      console.log('Downloaded', u, '->', outFile);
      if (!heroAssigned && /(hero|header|cover|sunset|sea|beach)/i.test(base)) {
        // Copy first matching image as hero original
        const heroTarget = path.join(heroDir, 'hero' + path.extname(base));
        fs.copyFileSync(outFile, heroTarget);
        heroAssigned = true;
        console.log('Assigned hero image ->', heroTarget);
      }
    } catch (e) {
      console.warn('Skip', u, e.message);
    }
  }

  // If we didn't find a heuristic hero, take the first downloaded.
  if (!heroAssigned && downloaded.length > 0) {
    const first = downloaded[0];
    const heroTarget = path.join(heroDir, 'hero' + path.extname(first));
    fs.copyFileSync(first, heroTarget);
    console.log('Assigned first image as hero ->', heroTarget);
  }

  console.log('Done. Originals are in assets/originals/gallery and assets/originals/hero');
})();