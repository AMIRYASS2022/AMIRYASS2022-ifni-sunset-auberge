import React from 'react';
import { ROOMS_CARDS } from '../content/rooms';
import { useI18n } from '../i18n';

// User-local gallery images from public/gallery
const USER_GALLERY_IMAGES: string[] = [
  '/gallery/horel restaurant ifni-sunset.webp',
  '/gallery/hotel ifni-sunset (2).1.webp',
  '/gallery/hotel ifni-sunset (3).1.webp',
  '/gallery/hotel ifni-sunset (3).webp',
  '/gallery/hotel ifni-sunset (4).1.webp',
  '/gallery/hotel ifni-sunset (4).webp',
  '/gallery/hotel ifni-sunset (5).webp',
  '/gallery/hotel ifni-sunset (6).webp',
  '/gallery/hotel ifni-sunset (7).webp',
  '/gallery/hotel ifni-sunset (8).webp',
  '/gallery/hotel ifni-sunset.webp',
  '/gallery/hotel.webp',
];

// Build full image list (rooms + user gallery)
const ALL_IMAGES: string[] = [
  ...USER_GALLERY_IMAGES,
  ...ROOMS_CARDS.flatMap((r) => (Array.isArray(r.images) && r.images.length ? r.images : [r.image])),
];

// Canonicalize a src string to dedupe variants (strip query/hash; normalize case)
function canonicalizeSrc(src: string): string {
  const noHash = src.split('#')[0];
  const noQuery = noHash.split('?')[0];
  if (/^https?:\/\//i.test(noQuery)) {
    try {
      const u = new URL(noQuery);
      return `${u.protocol}//${u.hostname}${u.pathname}`.toLowerCase();
    } catch {
      return noQuery.toLowerCase();
    }
  }
  return noQuery.toLowerCase();
}

// Remove duplicates while preserving first occurrence order
const INITIAL_IMAGES: string[] = (() => {
  const seen = new Set<string>();
  const out: string[] = [];
  for (const src of ALL_IMAGES) {
    const key = canonicalizeSrc(src);
    if (!seen.has(key)) {
      seen.add(key);
      out.push(src);
    }
  }
  return out;
})();

export default function Gallery() {
  const { t } = useI18n();
  const [images, setImages] = React.useState<string[]>(INITIAL_IMAGES);
  const [index, setIndex] = React.useState(0);
  const count = images.length;
  const thumbRefs = React.useRef<(HTMLButtonElement | null)[]>([]);

  const prev = () => setIndex((i) => (count > 1 ? (i - 1 + count) % count : 0));
  const next = () => setIndex((i) => (count > 1 ? (i + 1) % count : 0));

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'Home') setIndex(0);
    else if (e.key === 'End') setIndex(Math.max(0, count - 1));
  };

  React.useEffect(() => {
    const el = thumbRefs.current[index];
    if (el) {
      el.scrollIntoView({ behavior: 'smooth', block: 'nearest', inline: 'center' });
    }
  }, [index]);

  // If an image fails to load, remove it from the gallery to avoid repeated fallback
  const handleImageError = React.useCallback((badSrc: string) => {
    setImages((prev) => {
      const idx = prev.findIndex((s) => s === badSrc);
      if (idx === -1) return prev;
      const nextArr = prev.filter((_, i) => i !== idx);
      // Keep selection valid
      setIndex((cur) => {
        if (nextArr.length === 0) return 0;
        if (cur > idx) return cur - 1;
        return Math.min(cur, nextArr.length - 1);
      });
      return nextArr;
    });
  }, []);

  const currentSrc = count > 0 ? images[index] : '/hero-poster.jpg';

  return (
    <section id="gallery" aria-label={t('gallery.title')} className="space-y-6 text-center py-12 scroll-mt-20">
      <h2 className="font-serif text-3xl md:text-4xl">{t('gallery.title')}</h2>
      <p className="text-white/80 max-w-3xl mx-auto">{t('gallery.tagline')}</p>

      {/* Featured image */}
      <div
        role="region"
        aria-label={t('gallery.featured')}
        tabIndex={0}
        onKeyDown={onKeyDown}
        className="mx-auto max-w-5xl maroc-card p-2"
      >
        <div className="relative overflow-hidden w-full h-80 md:h-[28rem] rounded-xl border border-white/10 bg-gradient-to-tr from-neutral-900 via-neutral-900/60 to-neutral-800/50">
          <img
            src={currentSrc}
            alt={`${t('gallery.title')} ${count > 0 ? index + 1 : 0}/${count}`}
            className="w-full h-80 md:h-[28rem] object-cover"
            loading="lazy"
            onError={() => handleImageError(currentSrc)}
          />
          {/* Top & bottom ornaments */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-6 flex justify-center z-10 opacity-40">
            <img src="/menu-ornament.svg" alt="" aria-hidden="true" className="h-full" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 flex justify-center z-10 opacity-40">
            <img src="/menu-ornament.svg" alt="" aria-hidden="true" className="h-full" />
          </div>

          {/* Visible arrows on md+ only when multiple images */}
          {count > 1 && (
            <div className="absolute inset-0 flex items-center justify-between p-2 pointer-events-none">
              <button
                type="button"
                onClick={prev}
                className="pointer-events-auto hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
                aria-label={t('gallery.previous')}
              >
                <span className="sr-only">{t('gallery.previous')}</span>
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M15 6l-6 6 6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
              <button
                type="button"
                onClick={next}
                className="pointer-events-auto hidden md:flex items-center justify-center w-8 h-8 rounded-full bg-white/10 hover:bg-white/20 border border-white/20"
                aria-label={t('gallery.next')}
              >
                <span className="sr-only">{t('gallery.next')}</span>
                <svg viewBox="0 0 24 24" fill="none" className="w-4 h-4"><path d="M9 6l6 6-6 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" /></svg>
              </button>
            </div>
          )}
        </div>
      </div>

      {/* Thumbnails navigation */}
      {count > 1 && (
        <nav aria-label={t('gallery.thumbnails')} className="mx-auto max-w-5xl">
          <div className="overflow-x-auto">
            <div className="flex gap-2 py-2">
              {images.map((src, i) => (
                <button
                  key={`${canonicalizeSrc(src)}-${i}`}
                  ref={(el) => { thumbRefs.current[i] = el; }}
                  type="button"
                  aria-label={`${t('gallery.goToImage')} ${i + 1}`}
                  onClick={() => setIndex(i)}
                  className={`relative flex-shrink-0 w-24 h-16 md:w-28 md:h-18 lg:w-32 lg:h-20 rounded-md overflow-hidden border focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60 ${i === index ? 'border-sunset-400 ring-2 ring-sunset-300' : 'border-white/10'}`}
                >
                  <img
                    src={src}
                    alt=""
                    aria-hidden="true"
                    className="w-full h-full object-cover"
                    loading="lazy"
                    onError={() => handleImageError(src)}
                  />
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}
    </section>
  );
}
