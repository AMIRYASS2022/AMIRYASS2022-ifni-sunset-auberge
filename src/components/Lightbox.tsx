import React from 'react';
import { FaChevronLeft, FaChevronRight, FaTimes } from 'react-icons/fa';
import { useI18n } from '../i18n';

export type LightboxImage = { src: string; alt?: string };

export default function Lightbox({
  images,
  initialIndex = 0,
  onClose,
}: {
  images: LightboxImage[];
  initialIndex?: number;
  onClose: () => void;
}) {
  const { t } = useI18n();
  const [index, setIndex] = React.useState(initialIndex);
  const [isZoomed, setIsZoomed] = React.useState(false);
  const [drag, setDrag] = React.useState<{ active: boolean; startX: number; dx: number }>({ active: false, startX: 0, dx: 0 });
  const count = images?.length ?? 0;
  const overlayRef = React.useRef<HTMLDivElement | null>(null);

  React.useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose();
      else if (e.key === 'ArrowLeft') prev();
      else if (e.key === 'ArrowRight') next();
    };
    window.addEventListener('keydown', onKey);
    return () => window.removeEventListener('keydown', onKey);
  }, [onClose]);

  React.useEffect(() => {
    // Prevent body scroll while lightbox is open
    const prev = document.body.style.overflow;
    document.body.style.overflow = 'hidden';
    return () => { document.body.style.overflow = prev; };
  }, []);

  const prev = () => setIndex((i) => (i - 1 + count) % count);
  const next = () => setIndex((i) => (i + 1) % count);

  const onPointerDown = (e: React.PointerEvent<HTMLDivElement>) => {
    (e.currentTarget as HTMLDivElement).setPointerCapture(e.pointerId);
    setDrag({ active: true, startX: e.clientX, dx: 0 });
  };
  const onPointerMove = (e: React.PointerEvent<HTMLDivElement>) => {
    if (!drag.active) return;
    setDrag((d) => ({ ...d, dx: e.clientX - d.startX }));
  };
  const onPointerUp = () => {
    if (!drag.active) return;
    const threshold = 80; // px
    const delta = drag.dx;
    setDrag({ active: false, startX: 0, dx: 0 });
    if (delta > threshold) prev();
    else if (delta < -threshold) next();
  };
  const onOverlayClick = (e: React.MouseEvent<HTMLDivElement>) => {
    if (e.target === overlayRef.current) onClose();
  };

  if (!count) return null;

  const trackStyle: React.CSSProperties = {
    transform: `translateX(calc(-${index * 100}% + ${drag.dx}px))`,
    transition: drag.active ? 'none' : 'transform 500ms cubic-bezier(0.22, 1, 0.36, 1)'
  };

  const imgStyle: React.CSSProperties = {
    transform: isZoomed ? 'scale(1.1)' : 'scale(1.02)',
    transition: 'transform 500ms ease-out'
  };

  return (
    <div
      ref={overlayRef}
      className="fixed inset-0 z-[100] bg-black/90 backdrop-blur-sm flex items-center justify-center"
      role="dialog"
      aria-modal="true"
      aria-label={images[index]?.alt ? `${images[index].alt} — ${t('aria.lightbox.viewer')}` : t('aria.lightbox.viewer')}
      onClick={onOverlayClick}
    >
      {/* Close button */}
      <button
        type="button"
        aria-label={t('aria.lightbox.close')}
        onClick={onClose}
        className="absolute top-4 right-4 rounded-full bg-white/10 hover:bg-white/20 text-white p-2"
      >
        <FaTimes aria-hidden="true" />
      </button>

      {/* Navigation */}
      {count > 1 && (
        <button
          type="button"
          aria-label={t('aria.lightbox.prev')}
          onClick={prev}
          className="absolute left-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white p-3"
        >
          <FaChevronLeft aria-hidden="true" />
        </button>
      )}
      {count > 1 && (
        <button
          type="button"
          aria-label={t('aria.lightbox.next')}
          onClick={next}
          className="absolute right-6 top-1/2 -translate-y-1/2 rounded-full bg-white/10 hover:bg-white/20 text-white p-3"
        >
          <FaChevronRight aria-hidden="true" />
        </button>
      )}

      {/* Track */}
      <div
        className="w-full h-full max-w-6xl max-h-[80vh] overflow-hidden"
        onPointerDown={onPointerDown}
        onPointerMove={onPointerMove}
        onPointerUp={onPointerUp}
      >
        <div className="flex w-full h-full items-center" style={trackStyle}>
          {images.map((img, i) => (
            <div key={img.src} className="basis-full flex items-center justify-center px-4">
              <img
                src={img.src}
                alt={img.alt ?? `${t('alt.galleryImage')} ${i + 1}`}
                loading="eager"
                decoding="async"
                className={`max-h-[80vh] w-auto object-contain rounded-lg ${isZoomed ? 'cursor-zoom-out' : 'cursor-zoom-in'}`}
                style={imgStyle}
                onClick={() => setIsZoomed((z) => !z)}
                onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/hero-poster.jpg'; }}
              />
            </div>
          ))}
        </div>
      </div>

      {/* Caption */}
      <div className="absolute bottom-6 left-1/2 -translate-x-1/2 text-center px-4">
        <div className="inline-block rounded-md bg-white/10 text-white px-3 py-2 text-sm">
          {images[index]?.alt ?? `${t('alt.galleryImage')} ${index + 1}/${count}`}
        </div>
      </div>
    </div>
  );
}