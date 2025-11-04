import React from 'react';
import { useI18n } from '../i18n';
import { TESTIMONIALS } from '../content/testimonials';

export default function Testimonials() {
  const { t } = useI18n();
  return (
    <section id="testimonials" aria-label={t('testimonials.title')} className="mx-auto max-w-6xl px-6 py-12 scroll-mt-20">
      <h2 className="font-serif text-2xl md:text-3xl text-center">{t('testimonials.title')}</h2>
      <p className="text-white/80 max-w-3xl mt-2 mx-auto text-center">{t('testimonials.subtitle')}</p>

      <div className="mt-8 overflow-hidden">
        <div className="flex gap-6 marquee-track marquee-paused">
          {[...TESTIMONIALS, ...TESTIMONIALS].map((item, idx) => (
            <article key={`${item.id}-${idx}`} className="maroc-card p-4 min-w-[280px]">
              <div className="text-4xl text-sunset-300" aria-hidden>“</div>
              <p className="mt-2 text-white/90">{t(item.quoteKey)}</p>
              <div className="maroc-ornament my-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
              <div className="text-sm text-white/70">
                <span className="font-semibold">{t(item.nameKey)}</span>
                <span> — {t(item.originKey)}</span>
              </div>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}