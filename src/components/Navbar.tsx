import React, { useState } from 'react';
import { FaHome, FaInfoCircle, FaBed, FaUtensils, FaRoute, FaImages, FaChevronDown, FaHandshake } from 'react-icons/fa';
import { useI18n } from '../i18n';
import { useNavigate, useLocation } from 'react-router-dom';

export default function Navbar({ bookingUrl }: { bookingUrl: string }) {
  const { t, lang, setLang } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  const [aboutOpen, setAboutOpen] = useState(false);
  const [roomsOpen, setRoomsOpen] = useState(false);
  const [langOpen, setLangOpen] = useState(false);

  const links = [
    { href: '#dining', label: t('nav.dining'), Icon: FaUtensils },
    { href: '#activities', label: t('nav.activities'), Icon: FaRoute },
    { href: '#gallery', label: t('nav.gallery'), Icon: FaImages },
  ];

  function go(href: string) {
    if (href.startsWith('#')) {
      const section = href.replace('#', '');
      navigate(`/${lang}/?section=${section}`);
    } else {
      navigate(`/${lang}${href}`);
    }
  }

  return (
    <header className="hidden md:block fixed top-0 left-0 right-0 z-50 bg-black/40 backdrop-blur border-b border-white/10" aria-label={t('aria.nav.main')}>
      <div className="mx-auto max-w-6xl px-6 py-3 flex items-center justify-between">
        <div className="flex items-center gap-2" aria-label={t('aria.brand')}>
          <img src="/logo.svg" alt={t('alt.brandLogo')} className="h-8 w-8" />
          <span className="font-serif text-xl tracking-wide">{t('brand.name')}</span>
        </div>
        <nav className="flex items-center gap-4">
          {/* Inicio primero */}
          <button onClick={() => go('#home')} className="flex items-center gap-2 text-white/80 hover:text-white">
            <FaHome className="text-sunset-300" aria-hidden="true" />
            <span>{t('nav.home')}</span>
          </button>

          {/* Habitaciones (dropdown estable) */}
          <div
            className="relative"
            onMouseEnter={() => setRoomsOpen(true)}
            onFocus={() => setRoomsOpen(true)}
          >
            <button onClick={() => go('#rooms')} className="flex items-center gap-2 text-white/80 hover:text-white" aria-haspopup="menu" aria-expanded={roomsOpen}>
              <FaBed className="text-sunset-300" aria-hidden="true" />
              <span>{t('nav.rooms')}</span>
              <FaChevronDown className="text-white/70" aria-hidden="true" />
            </button>
            {roomsOpen && (
              <div
                role="menu"
                className="absolute top-full left-0 mt-2 w-56 rounded-md border border-white/10 bg-black/90 backdrop-blur shadow-lg"
                onMouseLeave={() => setRoomsOpen(false)}
                onBlur={() => setRoomsOpen(false)}
              >
                <button role="menuitem" onClick={() => go('#rooms')} className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10">{t('nav.rooms')}</button>
                <button role="menuitem" onClick={() => go('/offers')} className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10">{t('nav.offers')}</button>
              </div>
            )}
          </div>

          {/* Ítems simples en orden: Restaurante, Actividades, Galería */}
          {links.map(({ href, label, Icon }) => (
            <button key={href} onClick={() => go(href)} className="flex items-center gap-2 text-white/80 hover:text-white">
              <Icon className="text-sunset-300" aria-hidden="true" />
              <span>{label}</span>
            </button>
          ))}

          {/* Partners moved into About/Contact dropdown */}

          {/* Acerca de / Contacto (dropdown estable) */}
          <div
            className="relative"
            onMouseEnter={() => setAboutOpen(true)}
            onFocus={() => setAboutOpen(true)}
          >
            <button
              onClick={() => go('#about')}
              aria-haspopup="menu"
              aria-expanded={aboutOpen}
              className="flex items-center gap-2 text-white/80 hover:text-white"
            >
              <FaInfoCircle className="text-sunset-300" aria-hidden="true" />
              <span>{t('nav.about')}</span>
              <FaChevronDown className="text-white/70" aria-hidden="true" />
            </button>
            {aboutOpen && (
              <div
                role="menu"
                className="absolute top-full left-0 mt-2 w-56 rounded-md border border-white/10 bg-black/90 backdrop-blur shadow-lg"
                onMouseLeave={() => setAboutOpen(false)}
                onBlur={() => setAboutOpen(false)}
              >
                <button role="menuitem" onClick={() => go('#about')} className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10">{t('nav.about')}</button>
                <button role="menuitem" onClick={() => go('#contact')} className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10">{t('nav.contact')}</button>
                <button role="menuitem" onClick={() => go('/partners')} className="w-full text-left px-3 py-2 text-white/80 hover:text-white hover:bg-white/10">{t('nav.partners')}</button>
              </div>
            )}
          </div>

          {/* Botón Reservar destacado */}
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="ml-2 rounded-md bg-sunset-500 hover:bg-sunset-400 text-white font-medium px-3 py-2"
            aria-label={t('aria.bookOnBooking')}
          >
            {t('nav.bookNow')}
          </a>

          {/* Selector de idioma (dropdown estable) */}
          <div
            className="ml-3 relative"
            aria-label={t('aria.langSelector')}
            onMouseEnter={() => setLangOpen(true)}
            onFocus={() => setLangOpen(true)}
          >
            <button
              className="px-2 py-1 rounded-md text-white/80 hover:text-white hover:bg:white/10 flex items-center gap-2"
              aria-haspopup="menu"
              aria-expanded={langOpen}
            >
              <span>{lang.toUpperCase()}</span>
              <FaChevronDown className="text-white/70" aria-hidden="true" />
            </button>
            {langOpen && (
              <div
                role="menu"
                className="absolute right-0 top-full mt-2 w-28 rounded-md border border-white/10 bg-black/90 backdrop-blur shadow-lg"
                onMouseLeave={() => setLangOpen(false)}
                onBlur={() => setLangOpen(false)}
              >
                {(['es','en','fr'] as const).map(code => (
                  <button
                    key={code}
                    role="menuitem"
                    onClick={() => { const params = new URLSearchParams(location.search); const section = params.get('section'); setLang(code as any); navigate(section ? `/${code}/?section=${section}` : `/${code}/`); }}
                    className={`w-full text-left px-3 py-2 ${code===lang ? 'text-white' : 'text-white/80 hover:text-white hover:bg-white/10'}`}
                  >
                    {code.toUpperCase()}
                  </button>
                ))}
              </div>
            )}
          </div>
        </nav>
      </div>
    </header>
  );
}