# Ifni Sunset Auberge  Marketing Site

A responsive, SEO-friendly single-page site built with Vite + React + TypeScript, styled with Tailwind and Framer Motion. Uses real copy and imagery from the preview site and Booking.com.

## Tech
- Vite + React + TypeScript
- Tailwind CSS
- Framer Motion
- Lottie (optional)
- Image optimization: Sharp + vite-imagetools

## Getting Started
`ash
npm install
npm run dev
`
Open http://localhost:5173.

## Build
`ash
npm run build
npm run preview
`

## Image Optimization
Place originals under ssets/originals/ (e.g., hero/, gallery/, 
ooms/). Then:
`ash
npm run optimize:images
# Optional: generate hero WebM loop (12s)
npm run generate:hero
`
Optimized assets are emitted to src/assets/ (webp + responsive sizes).

## Deploy to Vercel
`ash
# if not installed
npm i -g vercel
vercel login
vercel --prod
`
Ensure uild runs successfully; Vercel will detect Vite and serve dist.

## SEO & Schema
- Meta tags set in index.html
- JSON-LD schema (Hotel) included

## Accessibility
- Semantic sections and headings
- Focus styles on the sticky booking CTA
- loading="lazy" for gallery images

## Lighthouse
1. Start dev server: 
pm run dev
2. Run: 
pm run lighthouse:mobile
3. See report at docs/lighthouse-mobile.json

## ZIP Export
`bash
npm run zip
`
Outputs ../ifni-sunset-auberge-github.zip from the project directory.

GitHub Repo:
https://github.com/AMIRYASS2022/ifni-sunset-auberge.zip/tree/main?tab=readme-ov-file#readme

## Sources
See ASSETS_SOURCES.md for image and copy attributions.
