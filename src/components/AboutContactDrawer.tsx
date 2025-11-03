import React, { useEffect, useState } from 'react';
import ContactForm from './ContactForm';
import { useI18n } from '../i18n';

// Desktop-only slide-in drawer combining About + Contact
export default function AboutContactDrawer({ bookingUrl }: { bookingUrl: string }) {
  const { t } = useI18n();
  const [open, setOpen] = useState(false);
  const [tab, setTab] = useState<'about' | 'contact'>('about');

  useEffect(() => {
    function onEvent(e: Event) {
      const detail = (e as CustomEvent).detail || {};
      if (detail && typeof detail.open === 'boolean') {
        setOpen(detail.open);
      }
      if (detail && (detail.tab === 'about' || detail.tab === 'contact')) {
        setTab(detail.tab);
      }
    }
    window.addEventListener('aboutContactDrawer', onEvent as EventListener);
    return () => window.removeEventListener('aboutContactDrawer', onEvent as EventListener);
  }, []);

  // Hide on mobile; only for desktop UX
  const isDesktop = typeof window !== 'undefined' ? window.matchMedia('(min-width: 768px)').matches : true;
  if (!isDesktop) return null;

  return (
    <>
      {open && (
        <div aria-live="polite">
          {/* Overlay */}
          <div
            className="fixed inset-0 z-[90] bg-black/60"
            onClick={() => setOpen(false)}
            aria-hidden="true"
          />
          {/* Drawer */}
          <aside
            className="fixed top-0 right-0 bottom-0 z-[100] w-[480px] max-w-[90vw] bg-neutral-900 border-l border-white/10 shadow-2xl"
            aria-label={`${t('nav.about')} + ${t('nav.contact')}`}
          >
            {/* Header */}
            <div className="flex items-center justify-between px-4 py-3 border-b border-white/10">
              <div className="flex items-center gap-2">
                <button
                  onClick={() => setTab('about')}
                  className={tab === 'about' ? 'px-3 py-1 rounded-md bg-white/10 text-white' : 'px-3 py-1 rounded-md text-white/80 hover:text-white hover:bg-white/10'}
                >
                  {t('nav.about')}
                </button>
                <button
                  onClick={() => setTab('contact')}
                  className={tab === 'contact' ? 'px-3 py-1 rounded-md bg-white/10 text-white' : 'px-3 py-1 rounded-md text-white/80 hover:text-white hover:bg-white/10'}
                >
                  {t('nav.contact')}
                </button>
              </div>
              <button
                onClick={() => setOpen(false)}
                className="px-3 py-1 rounded-md bg-white/10 text-white border border-white/20"
                aria-label={t('aria.menu.close')}
              >
                ×
              </button>
            </div>

            {/* Content */}
            <div className="overflow-y-auto h-full">
              {tab === 'about' ? (
                <section className="px-4 py-4">
                  <h2 className="font-serif text-2xl">{t('about.aria.section')}</h2>
                  <p className="mt-3 text-white/85 leading-relaxed">
                    {t('hero.blurb')}
                  </p>
                  <p className="mt-3 text-white/75 leading-relaxed">
                    {t('about.long')}
                  </p>
                </section>
              ) : (
                <section className="px-4 py-4">
                  <h2 className="font-serif text-2xl">{t('contact.tagline')}</h2>
                  <div className="mt-4">
                    <ContactForm bookingUrl={bookingUrl} />
                  </div>
                </section>
              )}
            </div>
          </aside>
        </div>
      )}
    </>
  );
}