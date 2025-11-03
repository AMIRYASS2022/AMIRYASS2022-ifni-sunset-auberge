import React from 'react';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import Hero from '../components/Hero';
import RoomsGrid from '../components/RoomsGrid';
import Activities from '../components/Activities';
import Gallery from '../components/Gallery';
import Menu from '../components/Menu';
import MenuGallery from '../components/MenuGallery';
import Footer from '../components/Footer';
import WhatsAppButton from '../components/WhatsAppButton';

import { ROOMS_CARDS } from '../content/rooms';
import ContactForm from '../components/ContactForm';
import { useI18n } from '../i18n';
import { useLocation } from 'react-router-dom';

export default function IndexPage({ bookingUrl }: { bookingUrl: string }) {
  const { t } = useI18n();
  const location = useLocation();
  const amenityKeys = [
    'amenities.wifi',
    'amenities.parking',
    'amenities.reception',
    'amenities.transfers',
    'amenities.dining',
    'amenities.experiences',
  ];

  React.useEffect(() => {
    const params = new URLSearchParams(location.search);
    const section = params.get('section');
    if (!section || section === 'home') {
      window.scrollTo({ top: 0, behavior: 'smooth' });
      return;
    }
    const target = document.getElementById(section);
    if (target) target.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [location.search]);

  return (
    <div className="text-white">
      <Navbar bookingUrl={bookingUrl} />
      <MobileNav bookingUrl={bookingUrl} />
      <div className="pt-14 md:pt-16" id="home">
        <Hero bookingUrl={bookingUrl} fixedBackground />
        <main id="main-content">
          {/* About — full-width dark background */}
          <div className="w-full bg-neutral-950">
            <section id="about" aria-label={t('about.aria.section')} className="space-y-4 text-center scroll-mt-20 mx-auto max-w-6xl px-6 py-12">
              <h2 className="font-serif text-3xl md:text-4xl">{t('hero.welcome')}</h2>
              <p className="text-white/80 max-w-3xl mx-auto whitespace-pre-line">{t('about.long')}</p>
              <ul className="mt-4 grid grid-cols-1 sm:grid-cols-2 gap-2 text-white/80">
                {amenityKeys.map((key) => (
                  <li key={key} className="flex items-start gap-2">
                    <span className="inline-block w-2 h-2 rounded-full bg-sunset-400 mt-2" aria-hidden="true" />
                    <span>{t(key)}</span>
                  </li>
                ))}
              </ul>
            </section>
          </div>

          {/* Rooms — full-width white background */}
          <div className="w-full bg-white text-neutral-900">
            <div className="mx-auto max-w-6xl">
              <RoomsGrid rooms={ROOMS_CARDS.map((r) => ({ ...r, bookingUrl }))} />
            </div>
          </div>

          {/* Dining — full-width dark background */}
          <div className="w-full bg-neutral-950">
            <div className="mx-auto max-w-6xl px-6 py-12">
              <Menu />
              <MenuGallery />
            </div>
          </div>

          {/* Activities — full-width with photo background */}
          <div className="w-full">
            <Activities />
          </div>

          {/* Gallery — full-width sunset tinted background */}
          <div className="w-full bg-sunset-900">
            <div className="mx-auto max-w-6xl px-6">
              <Gallery />
            </div>
          </div>

          {/* Contact — full-width dark background */}
          <div className="w-full bg-neutral-950">
            <div className="mx-auto max-w-6xl px-6 py-12">
              <ContactForm bookingUrl={bookingUrl} />
            </div>
          </div>
        </main>

        {/* Footer debajo de Contact */}
        <Footer />

        <a
          href={bookingUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="fixed bottom-6 right-6 z-50 rounded-full bg-sunset-500 hover:bg-sunset-400 text-white font-medium px-5 py-3 shadow-xl focus:outline-none focus-visible:ring-2 focus-visible:ring-white/60"
          aria-label={t('aria.bookOnBooking')}
        >
          {t('cta.bookOnBooking')}
        </a>
      </div>
      <WhatsAppButton />
    </div>
  );
}