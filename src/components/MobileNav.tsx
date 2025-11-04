import React from 'react';
import { FaBars, FaTimes, FaHome, FaInfoCircle, FaBed, FaUtensils, FaRoute, FaImages, FaPhone, FaGift, FaQuoteLeft, FaHandshake } from 'react-icons/fa';
import { useI18n } from '../i18n';
import { useNavigate, useLocation } from 'react-router-dom';

export default function MobileNav({ bookingUrl }: { bookingUrl: string }) {
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = React.useState(false);

  const links = [
    { href: '#home', label: t('nav.home'), Icon: FaHome },
    { href: '#about', label: t('nav.about'), Icon: FaInfoCircle },
    { href: '/partners', label: t('nav.partners'), Icon: FaHandshake },
    { href: '#contact', label: t('nav.contact'), Icon: FaPhone },
    { href: '#rooms', label: t('nav.rooms'), Icon: FaBed },
    { href: '#dining', label: t('nav.dining'), Icon: FaUtensils },
    { href: '#activities', label: t('nav.activities'), Icon: FaRoute },
    { href: '#gallery', label: t('nav.gallery'), Icon: FaImages },
    { href: '#testimonials', label: t('nav.testimonials'), Icon: FaQuoteLeft },
    { href: '/offers', label: t('nav.offers'), Icon: FaGift },
  ];

  function closeAndGo(href: string) {
    setOpen(false);
    if (href.startsWith('#')) {
      const section = href.replace('#', '');
      navigate(`/${lang}/?section=${section}`);
    } else {
      navigate(`/${lang}${href}`);
    }
  }

  return (
    <div className="md:hidden">
      {/* Top bar */}
      <div className="fixed top-0 left-0 right-0 z-50 h-14 bg-black/50 backdrop-blur border-b border-white/10 flex items-center justify-between px-4">
        <div className="flex items-center gap-2" aria-label={t('aria.brand')}>
          <img src="/logo.svg" alt={t('alt.brandLogo')} className="h-7 w-7" />
          <span className="font-serif text-lg tracking-wide">{t('brand.name')}</span>
        </div>
        <button
          className="p-2 rounded-md bg-white/10 text-white border border-white/20"
          aria-label={open ? t('aria.menu.close') : t('aria.menu.open')}
          onClick={() => setOpen(o => !o)}
        >
          {open ? <FaTimes /> : <FaBars />}
        </button>
      </div>

      {/* Drawer + overlay */}
      {open && (
        <>
          <div
            className="fixed inset-0 z-40 bg-black/60"
            aria-hidden="true"
            onClick={() => setOpen(false)}
          />
          <aside className="fixed top-0 left-0 bottom-0 z-50 w-64 bg-black/90 backdrop-blur border-r border-white/10 p-4 pt-16">
            <nav className="space-y-2">
              {links.map(({ href, label, Icon }) => (
                <button
                  key={href}
                  onClick={() => closeAndGo(href)}
                  className="w-full flex items-center gap-3 px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 text-left"
                >
                  <Icon className="text-sunset-300" aria-hidden="true" />
                  <span>{label}</span>
                </button>
              ))}
            </nav>
            <a
              href={bookingUrl}
              target="_blank"
              rel="noopener noreferrer"
              className="mt-4 block w-full rounded-md bg-sunset-500 hover:bg-sunset-400 text-white text-center font-medium py-2"
              aria-label={t('aria.bookOnBooking')}
            >
              {t('nav.bookNow')}
            </a>
            <div className="mt-3">
              <select
                aria-label={t('aria.langSelector')}
                value={lang}
                onChange={(e) => { const newLang = e.target.value as any; const params = new URLSearchParams(location.search); const section = params.get('section'); setLang(newLang); navigate(section ? `/${newLang}/?section=${section}` : `/${newLang}/`); }}
                className="w-full bg-white/10 text-white border border-white/20 rounded-md px-2 py-1 focus:outline-none"
              >
                <option value="es">Español</option>
                <option value="en">English</option>
                <option value="fr">Français</option>
              </select>
            </div>
          </aside>
        </>
      )}
    </div>
  );
}