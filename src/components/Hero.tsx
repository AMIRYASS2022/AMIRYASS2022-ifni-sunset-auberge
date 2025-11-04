import React, { useEffect, useState, useRef } from 'react'; 
import { motion, useScroll, useTransform } from 'framer-motion'; 
import Lottie from 'lottie-react';

import { useI18n } from '../i18n';
 
export default function Hero({ bookingUrl, lottieData, imageUrl, disableAnimation, fixedBackground, videoUrl }: { bookingUrl: string; lottieData?: any; imageUrl?: string; disableAnimation?: boolean; fixedBackground?: boolean; videoUrl?: string }) { 
  const { scrollY } = useScroll();
  const contentY = useTransform(scrollY, [0, 300], [0, 40]);
  const overlayOpacity = useTransform(scrollY, [0, 300], [0.2, 0.6]);
  const { t } = useI18n();

  const [reduceMotion, setReduceMotion] = useState(false);
  useEffect(() => {
    const mq = window.matchMedia('(prefers-reduced-motion: reduce)');
    const update = () => setReduceMotion(mq.matches);
    update();
    mq.addEventListener('change', update);
    return () => mq.removeEventListener('change', update);
  }, []);

  // Prefer MP4 if provided or present in public, keep webm fallback
  const mp4Src = videoUrl ?? '/hero.mp4';
  const videoRef = useRef<HTMLVideoElement>(null);
  useEffect(() => {
    const v = videoRef.current;
    if (v) v.playbackRate = 0.25;
  }, []);

  // Removed sea sound effect and controls per request

  const effectiveDisable = disableAnimation || reduceMotion;
  const bgPos = fixedBackground ? 'fixed' : 'absolute';
  const bgZ = fixedBackground ? '-z-10' : '';

  return ( 
    <header id="home" className="relative min-h-screen w-full overflow-hidden"> 
      {/* Prefer a realistic photo if provided, else Lottie, else Video */}
      {imageUrl ? (
        <img
          src={imageUrl}
          alt={t('alt.heroImage')}
          className={`inset-0 w-full h-full object-cover ${bgPos} ${bgZ}`}
          fetchPriority="high"
        />
      ) : lottieData ? (
        <Lottie
          animationData={lottieData}
          loop={!effectiveDisable}
          autoplay={!effectiveDisable}
          className={`inset-0 w-full h-full object-cover ${bgPos} ${bgZ}`}
        />
      ) : (
        <video
          className={`inset-0 w-full h-full object-cover ${bgPos} ${bgZ}`}
          autoPlay={!effectiveDisable}
          loop={!effectiveDisable}
          muted
          playsInline
          controls={effectiveDisable}
          preload="metadata"
          poster="/hero-poster.jpg"
          ref={videoRef}
          onCanPlay={(e) => { e.currentTarget.playbackRate = 0.25; }}
        >
          <source src={mp4Src} type="video/mp4" />
          <source src="/hero-loop.webm" type="video/webm" />
        </video>
      )}

      {/* overlay gradient (fixed when background fixed) */}
      <motion.div
        className={`inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent ${bgPos} ${bgZ}`}
        style={{ opacity: effectiveDisable ? 0.35 : overlayOpacity }}
      />

      {/* content */}
      <motion.div
        className="relative z-10 h-[100svh] flex items-center justify-center text-center px-6"
        style={{ y: effectiveDisable ? 0 : contentY }}
      >
        <div className="space-y-6 max-w-2xl">
          <h1 className="font-serif text-4xl md:text-6xl">{t('hero.title')}</h1>
          <p className="text-white/80">{t('hero.blurb')}</p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="rounded-full px-6 py-3 bg-sunset-500 hover:bg-sunset-400 text-white font-medium"
              aria-label={t('aria.bookOnBooking')}
            >
              {t('nav.bookNow')}
            </a>
            <a href="#about" aria-label={t('aria.hero.discover')} className="rounded-full px-6 py-3 bg-white/10 text-white border border-white/20">
              {t('cta.discover')}
            </a>
          </div>
        </div>
      </motion.div>

      {/* Sound controls removed */}

      {/* subtle moving stars or sun overlay (CSS) */}
      <div className="pointer-events-none fixed bottom-6 right-6 text-white/30">🌅</div>
    </header>
  );
}