import React from 'react';
import Lightbox from './Lightbox';
import { useI18n } from '../i18n';
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';

// Collect images from src/assets/menu-gallery via Vite glob
const modules = import.meta.glob('../assets/menu-gallery/*.{jpg,jpeg,png,webp}', { eager: true });
const MENU_IMAGES: string[] = Object.values(modules)
  .map((m: any) => m?.default as string)
  .filter(Boolean);

export default function MenuGallery() {
  const { t } = useI18n();
  const [index, setIndex] = React.useState(0);
  const [open, setOpen] = React.useState(false);
  const count = MENU_IMAGES.length;

  const current = count ? MENU_IMAGES[index] : '/hero-poster.jpg';

  const openAt = (i: number) => { setIndex(i); setOpen(true); };
  const goPrev = () => setIndex((i) => (i - 1 + count) % count);
  const goNext = () => setIndex((i) => (i + 1) % count);

  return (
    <section id="menu-gallery" aria-label={`${t('nav.dining')} — ${t('nav.gallery')}`} className="space-y-6 py-12">
      <h2 className="font-serif text-2xl md:text-3xl text-center">{t('nav.dining')} — {t('nav.gallery')}</h2>
      <p className="text-white/80 max-w-3xl mx-auto text-center">
        {count ? t('gallery.tagline') : `Añade imágenes de comida en src/assets/menu-gallery (JPG/PNG/WebP).`}
      </p>

      {/* Featured image */}
      <div className="mx-auto max-w-5xl maroc-card p-2">
        <div className="relative overflow-hidden w-full h-80 md:h-[28rem] rounded-xl border border-white/10 bg-gradient-to-tr from-neutral-900 via-neutral-900/60 to-neutral-800/50">
          <img
            src={current}
            alt={`${t('nav.dining')} ${count ? index + 1 : 0}/${count}`}
            className="w-full h-80 md:h-[28rem] object-cover"
            loading="lazy"
            onClick={() => count && setOpen(true)}
          />

          {count > 1 && (
            <>
              <button
                type="button"
                aria-label="Anterior"
                onClick={goPrev}
                className="absolute left-3 top-1/2 -translate-y-1/2 bg-neutral-900/50 hover:bg-neutral-800/70 text-white rounded-full p-2 border border-white/20 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <FiChevronLeft className="h-6 w-6" />
              </button>
              <button
                type="button"
                aria-label="Siguiente"
                onClick={goNext}
                className="absolute right-3 top-1/2 -translate-y-1/2 bg-neutral-900/50 hover:bg-neutral-800/70 text-white rounded-full p-2 border border-white/20 backdrop-blur-sm focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
              >
                <FiChevronRight className="h-6 w-6" />
              </button>
            </>
          )}

          {/* Ornament top & bottom */}
          <div className="pointer-events-none absolute inset-x-0 top-0 h-6 flex justify-center z-10 opacity-40">
            <img src="/menu-ornament.svg" alt="" aria-hidden="true" className="h-full" />
          </div>
          <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 flex justify-center z-10 opacity-40">
            <img src="/menu-ornament.svg" alt="" aria-hidden="true" className="h-full" />
          </div>
        </div>
      </div>

      {/* Thumbnails */}
      {count > 1 && (
        <nav aria-label={t('gallery.thumbnails')} className="mx-auto max-w-5xl">
          <div className="overflow-x-auto">
            <div className="flex gap-2 py-2">
              {MENU_IMAGES.map((src, i) => (
                <button
                  key={`${src}-${i}`}
                  type="button"
                  aria-label={`${t('gallery.goToImage')} ${i + 1}`}
                  onClick={() => openAt(i)}
                  className={`relative flex-shrink-0 w-24 h-16 md:w-28 md:h-18 lg:w-32 lg:h-20 rounded-md overflow-hidden border ${i === index ? 'border-sunset-400 ring-2 ring-sunset-300' : 'border-white/10'}`}
                >
                  <img src={src} alt="" aria-hidden="true" className="w-full h-full object-cover" loading="lazy" />
                </button>
              ))}
            </div>
          </div>
        </nav>
      )}

      {open && (
        <Lightbox
          images={MENU_IMAGES.map((src) => ({ src }))}
          initialIndex={index}
          onClose={() => setOpen(false)}
        />
      )}
    </section>
  );
}