import { writeFileSync, mkdirSync } from 'node:fs';
import { join } from 'node:path';

const base = (process.env.URL || process.env.DEPLOY_PRIME_URL || 'https://example.com').replace(/\/$/, '');
const outDir = join(process.cwd(), 'dist');

// Locales and routes based on BrowserRouter config in src/main.tsx
const locales = ['es', 'en', 'fr'];
const routes = ['', 'privacy', 'terms', 'offers', 'partners'];

const now = new Date().toISOString().slice(0, 10);

const urls = [];
for (const lang of locales) {
  for (const route of routes) {
    const path = route ? `/${route}` : '/';
    // BrowserRouter: clean URLs without hash
    const loc = `${base}/${lang}${path}`;
    urls.push({ loc, lastmod: now, changefreq: 'weekly', priority: route ? '0.7' : '0.8' });
  }
}

const xmlHeader = '<?xml version="1.0" encoding="UTF-8"?>';
const urlsetOpen = '<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">';
const urlsetClose = '</urlset>';

const body = urls
  .map(
    (u) =>
      `<url>\n  <loc>${u.loc}</loc>\n  <lastmod>${u.lastmod}</lastmod>\n  <changefreq>${u.changefreq}</changefreq>\n  <priority>${u.priority}</priority>\n</url>`
  )
  .join('\n');

const sitemap = [xmlHeader, urlsetOpen, body, urlsetClose].join('\n');

try {
  mkdirSync(outDir, { recursive: true });
  writeFileSync(join(outDir, 'sitemap.xml'), sitemap, 'utf8');
  const robots = `User-agent: *\nAllow: /\nSitemap: ${base}/sitemap.xml\n`;
  writeFileSync(join(outDir, 'robots.txt'), robots, 'utf8');
  console.log('Generated sitemap.xml and robots.txt in dist');
} catch (err) {
  console.error('Failed to generate sitemap/robots', err);
  process.exit(0); // Do not fail the build if generation fails
}