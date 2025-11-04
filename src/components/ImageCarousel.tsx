import React from 'react';
import { FaChevronLeft, FaChevronRight } from 'react-icons/fa';
import { useI18n } from '../i18n';

export default function ImageCarousel({
  images,
  alt,
  className,
  autoPlayMs = 0
}: {
  images: string[];
  alt?: string;
  className?: string;
  autoPlayMs?: number;
}) {
  const { t } = useI18n();
  const [index, setIndex] = React.useState(0);
  const [isInteracting, setIsInteracting] = React.useState(false);
  const [drag, setDrag] = React.useState<{ active: boolean; startX: number; dx: number }>({ active: false, startX: 0, dx: 0 });
  const count = images?.length ?? 0;
  const containerRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    if (index >= count) setIndex(0);
  }, [count, index]);

  React.useEffect(() => {
    if (isInteracting || count <= 1 || autoPlayMs <= 0) return;
    const id = window.setInterval(() => {
      setIndex((i) => (i + 1) % count);
    }, autoPlayMs);
    return () => window.clearInterval(id);
  }, [isInteracting, count, autoPlayMs]);

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    if (count <= 1) return;
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setIsInteracting(true);
    setDrag({ active: true, startX: e.clientX, dx: 0 });
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.active || count <= 1) return;
    setDrag((d) => ({ ...d, dx: e.clientX - d.startX }));
  };
  const onPointerUp = (_e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.active || count <= 1) return;
    const threshold = 50; // px
    const delta = drag.dx;
    setDrag({ active: false, startX: 0, dx: 0 });
    setIsInteracting(false);
    if (delta > threshold) prev();
    else if (delta < -threshold) next();
  };
  const onPointerLeave = () => {
    if (!drag.active || count <= 1) return;
    setDrag({ active: false, startX: 0, dx: 0 });
    setIsInteracting(false);
  };

  const onKeyDown = (e: React.KeyboardEvent<HTMLDivElement>) => {
    if (e.key === 'ArrowLeft') prev();
    else if (e.key === 'ArrowRight') next();
    else if (e.key === 'Home') setIndex(0);
    else if (e.key === 'End') setIndex(count - 1);
  };

  if (!count) return null;

  const trackStyle: React.CSSProperties = {
    transform: `translateX(calc(-${index * 100}% + ${drag.dx}px))`,
    transition: drag.active ? 'none' : 'transform 600ms cubic-bezier(0.22, 1, 0.36, 1)'
  };

  return (
    <div
      ref={containerRef}
      role="region"
      aria-label={alt ? `${alt} — ${t('aria.carousel')}` : t('aria.carousel')}
      tabIndex={0}
      onKeyDown={onKeyDown}
      className={`relative select-none maroc-card p-2 ${className ?? ''}`}
    >
      <div
        className="relative overflow-hidden w-full h-64 md:h-72 lg:h-80 rounded-xl border border-white/10 bg-gradient-to-tr from-neutral-900 via-neutral-900/60 to-neutral-800/50"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
        onPointerLeave={onPointerLeave}
      >
        <div className="flex w-full h-full" style={trackStyle}>
          {images.map((src, i) => (
            <img
              key={src}
              src={src}
              alt={alt ? `${alt} — ${i + 1}/${count}` : `${t('alt.roomImage')} ${i + 1}`}
              loading="lazy"
              className="w-full h-64 md:h-72 lg:h-80 object-cover flex-shrink-0 basis-full"
              style={{ transform: 'scale(1)', transition: 'transform 700ms ease-out' }}
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/hero-poster.jpg'; }}
            />
          ))}
        </div>
        {/* Top & bottom ornaments */}
        <div className="pointer-events-none absolute inset-x-0 top-0 h-6 flex justify-center z-10 opacity-40">
          <img src="/menu-ornament.svg" alt="" aria-hidden="true" className="h-full" />
        </div>
        <div className="pointer-events-none absolute inset-x-0 bottom-0 h-6 flex justify-center z-10 opacity-40">
          <img src="/menu-ornament.svg" alt="" aria-hidden="true" className="h-full" />
        </div>
      </div>
      <button
        type="button"
        aria-label={t('aria.carousel.prev')}
        onClick={prev}
        disabled={count <= 1}
        className="absolute left-2 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full bg-sunset-600/80 text-white p-2 hover:bg-sunset-500 disabled:opacity-50 ring-1 ring-white/30 shadow-lg"
      >
        <FaChevronLeft aria-hidden="true" />
      </button>
      <button
        type="button"
        aria-label={t('aria.carousel.next')}
        onClick={next}
        disabled={count <= 1}
        className="absolute right-2 top-1/2 -translate-y-1/2 z-20 inline-flex items-center justify-center rounded-full bg-sunset-600/80 text-white p-2 hover:bg-sunset-500 disabled:opacity-50 ring-1 ring-white/30 shadow-lg"
      >
        <FaChevronRight aria-hidden="true" />
      </button>
      {count > 1 && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 flex gap-1 z-20">
          {images.map((_, i) => (
            <button
              key={i}
              type="button"
              aria-label={`${t('aria.carousel.goTo')} ${i + 1}`}
              onClick={() => setIndex(i)}
              className={`h-1.5 w-3 rounded-full ring-1 ring-white/30 ${i === index ? 'bg-sunset-400' : 'bg-white/50'} hover:ring-sunset-400`}
            />
          ))}
        </div>
      )}
    </div>
  );
}
