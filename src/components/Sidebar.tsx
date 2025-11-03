import React from 'react';
import { FaInfoCircle, FaBed, FaUtensils, FaRoute, FaImages, FaPhone } from 'react-icons/fa';
import { useI18n } from '../i18n';

export default function Sidebar({ bookingUrl }: { bookingUrl: string }) {
  const { t } = useI18n();
  const links = [
    { href: '#about', key: 'nav.about', Icon: FaInfoCircle },
    { href: '#rooms', key: 'nav.rooms', Icon: FaBed },
    { href: '#dining', key: 'nav.dining', Icon: FaUtensils },
    { href: '#activities', key: 'nav.activities', Icon: FaRoute },
    { href: '#gallery', key: 'nav.gallery', Icon: FaImages },
    { href: '#contact', key: 'nav.contact', Icon: FaPhone },
  ];

  return (
    <aside
      className="fixed inset-y-0 left-0 z-50 hidden md:flex w-64 flex-col bg-black/40 backdrop-blur border-r border-white/10"
      aria-label={t('aria.nav.side')}
    >
      <div className="px-4 py-5 border-b border-white/10">
        <div className="flex items-center gap-2" aria-label={t('aria.brand')}>
          <img src="/logo.svg" alt={t('alt.brandLogo')} className="h-8 w-8" />
          <span className="font-serif text-xl tracking-wide">{t('brand.name')}</span>
        </div>
      </div>

      <nav className="flex-1 px-2 py-4 space-y-1">
        {links.map(({ href, key, Icon }) => (
          <a
            key={href}
            href={href}
            className="flex items-center gap-3 px-3 py-2 rounded-md text-white/80 hover:text-white hover:bg-white/10 transition"
            aria-label={t('aria.nav.goTo', { label: t(key) })}
          >
            <Icon className="text-sunset-300" aria-hidden="true" />
            <span>{t(key)}</span>
          </a>
        ))}
      </nav>

      <div className="p-4 border-t border-white/10">
        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="block w-full rounded-md bg-sunset-500 hover:bg-sunset-400 text-white text-center font-medium py-2"
          aria-label={t('aria.bookOnBooking')}
        >
          {t('nav.bookNow')}
        </a>
      </div>
    </aside>
  );
}