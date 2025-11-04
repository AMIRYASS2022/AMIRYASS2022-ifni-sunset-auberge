import React, { useEffect, useRef, useState } from 'react';
import { FaUtensils, FaQrcode } from 'react-icons/fa';
import type { MenuCategory } from '../content/menu';
import { MENU_SECTIONS, SPECIALS } from '../content/menu';
import { useI18n } from '../i18n';

function MenuCard({ section, className = '', style }: { section: MenuCategory; className?: string; style?: React.CSSProperties }) {
  const { t } = useI18n();
  return (
    <article className={`maroc-card h-full p-4 md:p-5 ${className}`} style={style}>
      <header className="flex items-center gap-2 mb-3">
        {section.image ? (
          <img src={section.image} alt="" aria-hidden="true" className="h-7 w-7 rounded-md border border-white/10" />
        ) : (
          <FaUtensils className="text-sunset-400" aria-hidden="true" />
        )}
        <h3 className="font-serif text-xl">{t(section.titleKey || section.title)}</h3>
      </header>
      <div className="maroc-ornament mb-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
      <ul className="space-y-1.5 text-white/80 text-sm">
        {section.items.map((it) => (
          <li key={it.nameKey ?? it.name} className="flex items-baseline justify-between gap-4 rounded-md px-2 py-1 hover:bg-white/5 transition-colors">
            <span className="text-white/90">{t(it.nameKey || it.name)}</span>
            {it.price && <span className="text-sunset-300 font-medium text-right min-w-[64px]">{it.price}</span>}
          </li>
        ))}
      </ul>
    </article>
  );
}

function DigitalMenuCard({ className = '', style }: { className?: string; style?: React.CSSProperties }) {
  const { t } = useI18n();
  const [qrUrl, setQrUrl] = useState('');
  const [isLocal, setIsLocal] = useState(false);
  useEffect(() => {
    const origin = window.location.origin;
    const envQr = (import.meta as any).env?.VITE_QR_URL as string | undefined;
    // Default QR target to English menu section when not overridden via env
    const target = envQr ? envQr : `${origin}/#/en/?section=dining`;
    setQrUrl(`https://api.qrserver.com/v1/create-qr-code/?size=240x240&margin=0&data=${encodeURIComponent(target)}`);
    setIsLocal(origin.includes('localhost') && !envQr);
  }, []);
  return (
    <article className={`maroc-card h-full p-4 md:p-5 ${className}`} style={style}>
      <header className="flex items-center gap-2 mb-3">
        <FaQrcode className="text-sunset-400" aria-hidden="true" />
        <h3 className="font-serif text-xl">{t('menu.digital.title')}</h3>
      </header>
      <div className="maroc-ornament mb-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
      <div className="flex items-center justify-center py-2">
        {qrUrl && (
          <img
            src={qrUrl}
            alt={t('menu.qr.alt')}
            className="w-40 h-40 md:w-48 md:h-48 rounded-md border border-white/10 bg-white p-1"
            loading="lazy"
          />
        )}
      </div>
      <p className="text-center text-white/70 text-sm">{t('menu.qr.scan')}</p>
      {isLocal && (
        <p className="text-center text-white/50 text-xs mt-2">{t('menu.qr.localHint')}</p>
      )}
    </article>
  );
}

// Helper to type-safe CSS variables in inline styles
const cssVars = (vars: Record<string, string | number>) => vars as React.CSSProperties;

export default function Menu() {
  const { t, lang } = useI18n();
  const ref = useRef<HTMLElement | null>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    // Show immediately if anchored to #dining
    if (typeof window !== 'undefined' && window.location.hash.includes('dining')) {
      setVisible(true);
      return;
    }
    const el = ref.current;
    if (!el) return;
    const isMobile = typeof window !== 'undefined' && window.matchMedia('(max-width: 640px)').matches;
    const observerOptions = { threshold: 0, rootMargin: `${isMobile ? '600px' : '400px'} 0px` } as IntersectionObserverInit;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach((e) => {
        if (e.isIntersecting) {
          setVisible(true);
          obs.disconnect();
        }
      });
    }, observerOptions);
    obs.observe(el);
    // Faster fallback: ensure ornaments become visible even if IntersectionObserver fails
    const fallback = setTimeout(() => setVisible(true), 400);
    return () => {
      obs.disconnect();
      clearTimeout(fallback);
    };
  }, []);

  return (
    <section id="dining" aria-label={t('menu.title')} ref={ref} className="maroc-section mx-auto max-w-6xl px-6 py-12 scroll-mt-20">
      {/* Floating ingredients overlay (only visible in Menu section) */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden z-50" aria-hidden>
        {/* Left vertical ornament */}
        <div className="pointer-events-none absolute inset-y-0 left-0 w-8 flex items-center justify-center z-40 opacity-70">
          <img src="/menu-ornament.svg" alt="" aria-hidden="true" className="w-full rotate-90" />
        </div>
        {/* Right vertical ornament */}
        <div className="pointer-events-none absolute inset-y-0 right-0 w-8 flex items-center justify-center z-40 opacity-70">
          <img src="/menu-ornament.svg" alt="" aria-hidden="true" className="w-full -rotate-90" />
        </div>
        {/* Top-left basil leaf enters from left */}
        <div className={`ornament-wrap ${visible ? 'edge-left' : ''}`} style={cssVars({ top: '10%', left: '6%', '--enterDelay': '160ms', '--edgeDur': '1600ms' })}>
          <img src="/menu-leaf.svg" alt="" className="leaf animate-leaf leaf--light" style={cssVars({ '--dur': '18s', '--x': '0px', '--y': '0px', '--r': '-8deg', '--ex': '24px' })} />
        </div>
        {/* Mid-left onion enters from outside and floats + safe spin */}
        <div
          className={`ornament-wrap ${visible ? 'edge-left' : ''}`}
          style={cssVars({ top: '18%', left: '4%', '--enterDelay': '240ms', '--edgeDur': '1600ms' })}
        >
          <span
            className="animate-onion-spin"
            style={{
              // spin duration
              ['--dur' as any]: '24s',
              // ensure spin container has box to rotate around center
              position: 'absolute',
              top: 0,
              left: 0,
              width: '80px',
              height: '80px',
            }}
          >
            <img
              src="/menu-onion.svg"
              alt=""
              className="onion animate-onion ornament--light"
              style={cssVars({ '--dur': '18s', '--x': '0px', '--y': '0px' })}
            />
          </span>
        </div>
        {/* Bottom-left basil leaf enters from left */}
        <div className={`ornament-wrap ${visible ? 'edge-left' : ''}`} style={cssVars({ bottom: '12%', left: '12%', '--enterDelay': '320ms', '--edgeDur': '1600ms' })}>
          <img src="/menu-leaf-2.svg" alt="" className="leaf animate-leaf leaf--bright" style={cssVars({ '--dur': '20s', '--x': '0px', '--y': '0px', '--r': '6deg', '--ex': '24px' })} />
        </div>
        {/* Top-right pepper enters from outside right */}
        <div className={`ornament-wrap ${visible ? 'edge-right' : ''}`} style={cssVars({ top: '8%', right: '6%', '--enterDelay': '440ms', '--edgeDur': '1500ms' })}>
          <img src="/menu-pepper.svg" alt="" className="ornament pepper animate-pepper ornament--bright" style={cssVars({ '--dur': '18s', '--x': '0px', '--y': '0px', '--r': '-6deg', '--px': '8px', '--bob': '10px', '--rw': '4deg' })} />
        </div>
        {/* Tomatoes enter from outside right (PNG) */}
        <div className={`ornament-wrap ${visible ? 'edge-right' : ''}`} style={cssVars({ bottom: '8%', right: '10%', '--enterDelay': '520ms', '--edgeDur': '1600ms' })}>
          <img src="/menu-leaf-2.svg" alt="" className="ornament animate-float ornament--bright" style={cssVars({ width: '120px', height: '120px', '--dur': '18s', '--ampX': '10px', '--ampY': '8px', '--spin': '3deg' })} />
        </div>
        {/* Fork pasta enters from outside left (PNG) */}
        <div className={`ornament-wrap ${visible ? 'edge-left' : ''}`} style={cssVars({ top: '24%', left: '6%', '--enterDelay': '680ms', '--edgeDur': '1500ms' })}>
          <img
            src="/foods/pasta-fork.png"
            alt=""
            className="ornament animate-float ornament--light"
            style={cssVars({ width: '170px', height: '170px', '--dur': '18s', '--ampX': '8px', '--ampY': '8px', '--spin': '2deg' })}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/menu-onion.svg'; }}
          />
        </div>
        {/* Lobster enters from outside right (PNG) */}
        <div className={`ornament-wrap ${visible ? 'edge-right' : ''}`} style={cssVars({ top: '48%', right: '4%', '--enterDelay': '840ms', '--edgeDur': '1700ms' })}>
          <img
            src="/foods/lobster.png"
            alt=""
            className="ornament animate-float ornament--bright"
            style={cssVars({ width: '220px', height: '160px', '--dur': '18s', '--ampX': '8px', '--ampY': '6px', '--spin': '2deg' })}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/menu-crab.svg'; }}
          />
        </div>
        {/* Salad fork enters from outside left (PNG) */}
        <div className={`ornament-wrap ${visible ? 'edge-left' : ''}`} style={cssVars({ bottom: '8%', left: '8%', '--enterDelay': '980ms', '--edgeDur': '1600ms' })}>
          <img
            src="/foods/salad-fork.png"
            alt=""
            className="ornament animate-float ornament--bright"
            style={cssVars({ width: '160px', height: '160px', '--dur': '18s', '--ampX': '9px', '--ampY': '9px', '--spin': '3deg' })}
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/menu-leaf-2.svg'; }}
          />
        </div>
        {/* Mid-right tagine enters and bounces */}
         <div className={`ornament-wrap ${visible ? 'edge-right' : ''}`} style={cssVars({ top: '22%', right: '6%', '--enterDelay': '720ms', '--edgeDur': '1600ms' })}>
           <img src="/menu-tagine.svg" alt="" className="ornament animate-tagine ornament--bright" style={cssVars({ '--dur': '18s' })} onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/menu-leaf.svg'; }} />
         </div>
         {/* Bottom-right crab enters and floats */}
         <div className={`ornament-wrap ${visible ? 'edge-right' : ''}`} style={cssVars({ bottom: '14%', right: '8%', '--enterDelay': '760ms', '--edgeDur': '1800ms' })}>
           <img src="/menu-crab.svg" alt="" className="ornament animate-crab ornament--bright" style={cssVars({ '--dur': '18s' })} onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/menu-pepper.svg'; }} />
         </div>
         {/* Extra right basil leaf enters from right */}
         <div className={`ornament-wrap ${visible ? 'edge-right' : ''}`} style={cssVars({ top: '36%', right: '10%', '--enterDelay': '340ms', '--edgeDur': '1500ms' })}>
           <img src="/menu-leaf.svg" alt="" className="leaf animate-leaf leaf--light" style={cssVars({ '--dur': '18s', '--x': '0px', '--y': '0px', '--r': '8deg', '--ex': '22px' })} />
         </div>
         {/* Extra onion slice enters from left and rests near center */}
         <div className={`ornament-wrap ${visible ? 'edge-left' : ''}`} style={cssVars({ top: '42%', left: '50%', '--enterDelay': '180ms', '--edgeDur': '1600ms' })}>
           <img src="/menu-onion.svg" alt="" className="ornament animate-onion ornament--bright" style={cssVars({ '--dur': '22s' })} />
         </div>
         {/* Carrot slice enters from right and rests near center */}
         <div className={`ornament-wrap ${visible ? 'edge-right' : ''}`} style={cssVars({ top: '36%', left: '54%', '--enterDelay': '360ms', '--edgeDur': '1600ms' })}>
           <img src="/menu-carrot.svg" alt="" className="ornament animate-float ornament--bright" style={cssVars({ width: '92px', height: '92px', '--dur': '19s', '--ampX': '10px', '--ampY': '8px', '--spin': '3deg' })} />
         </div>
         {/* Carrot slice enters from left-bottom and rests near center-bottom */}
         <div className={`ornament-wrap ${visible ? 'edge-left' : ''}`} style={cssVars({ top: '56%', left: '46%', '--enterDelay': '500ms', '--edgeDur': '1600ms' })}>
           <img src="/menu-carrot.svg" alt="" className="ornament animate-float ornament--bright" style={cssVars({ width: '82px', height: '82px', '--dur': '20s', '--ampX': '8px', '--ampY': '8px', '--spin': '2deg' })} />
         </div>
      </div>

      <figure className="mx-auto max-w-4xl mb-6">
        {(() => { const cover = lang === 'es' ? '/menu-cover-es.svg' : (lang === 'fr' ? '/menu-cover-fr.svg' : '/menu-cover.svg'); return (
          <img src={cover} alt={t('menu.coverAlt')} className="w-full h-auto rounded-xl border border-white/10 shadow-xl" loading="lazy" />
        ); })()}
      </figure>
      <div className="text-center mb-8 space-y-3">
        <div className="maroc-ornament"><span className="line" /><span className="diamond" /><span className="line" /></div>
      </div>

      <div className="grid items-stretch grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
        {/* Kitchen picture card — inline, same layer as text */}
        {MENU_SECTIONS.map((section, idx) => {
          const sideClass = visible ? (idx % 2 === 0 ? 'enter-left-soft' : 'enter-right-soft') : '';
          const enterDelay = `${200 + idx * 140}ms`;
          const floatDur = `${9 + (idx % 3)}s`;
          return (
            <div
              key={section.titleKey ?? section.title}
              className={`${sideClass} h-full`}
              style={cssVars({ ['--enterDelay']: enterDelay, opacity: visible ? 1 : 0 })}
            >
              <div className="card-float h-full" style={cssVars({ ['--cardDur']: floatDur, ['--cardDelay']: '600ms', ['--cardAmp']: '10px' })}>
                <MenuCard section={section} />
              </div>
            </div>
          );
        })}
        <div
          className={`${visible ? 'enter-right-soft' : ''} h-full`}
          style={cssVars({ ['--enterDelay']: `${200 + MENU_SECTIONS.length * 140}ms`, opacity: visible ? 1 : 0 })}
        >
          <div className="card-float h-full" style={cssVars({ ['--cardDur']: '10s', ['--cardDelay']: '600ms', ['--cardAmp']: '10px' })}>
            <DigitalMenuCard />
          </div>
        </div>
      </div>
 
       <div className="mx-auto max-w-3xl mt-10">
        <div className={`maroc-card p-5 text-center reveal ${visible ? 'reveal-visible' : ''}`} style={{ animationDelay: visible ? `${80 + MENU_SECTIONS.length * 80}ms` : undefined }}>
          <div className="text-sunset-400 text-2xl mb-2" aria-hidden="true">🍽️</div>
          <h3 className="font-serif text-2xl mb-1">{t('menu.specials.title')}</h3>
          <p className="text-white/80">{t('menu.specials.note')}</p>
        </div>
      </div>
    </section>
  );
}