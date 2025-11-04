import React from 'react';
import { useI18n } from '../i18n';
import { FaHotel, FaAirbnb, FaTripadvisor, FaWhatsapp, FaFacebook, FaInstagram } from 'react-icons/fa';

export default function Footer() {
  const { t, lang } = useI18n();

  return (
    <footer className="bg-black/40 backdrop-blur-sm text-white">
      <div className="mx-auto max-w-7xl px-6 py-12">
        <div className="grid grid-cols-1 gap-8 md:grid-cols-3">
          {/* Contact & Location */}
          <div>
            <h3 className="text-lg font-semibold">{t('footer.heading.contact')}</h3>
            <p className="mt-2 text-white/80">{t('footer.contactLocation')}</p>
            <p className="mt-1 text-white/80">{t('footer.openYearRound')}</p>
            <a
              href="https://www.google.com/maps/search/?api=1&query=Sidi%20Ifni"
              target="_blank"
              rel="noopener noreferrer"
              className="mt-2 inline-block text-sunset-300 hover:text-sunset-200"
            >
              {t('footer.viewOnMaps')}
            </a>
            {/* Dirección */}
            <p className="mt-3 text-white">
              <span className="font-medium">{t('footer.address')}</span>{' '}
              Route idoufkir, Sidi Ifni 85200, Morocco
            </p>
            {/* WhatsApp */}
            <p className="mt-1 text-white flex items-center gap-2">
              <FaWhatsapp className="text-green-400" aria-hidden="true" />
              <span className="font-medium">{t('footer.whatsapp')} </span>
              <a href="https://wa.me/212669441741" className="text-sunset-300 hover:text-sunset-200" target="_blank" rel="noopener noreferrer">+212 669 441 741</a>
            </p>
            {/* Email */}
            <p className="mt-1 text-white/80">
              <span className="font-medium">{t('footer.email')} </span>
              Ifnisunset@gmail.com
            </p>
            {/* Redes sociales debajo de Contacto con etiqueta */}
            <div className="mt-3 flex items-center gap-3" aria-label="Redes sociales">
              <span className="text-white/80">{t('footer.follow')}:</span>
              <a
                href="https://www.facebook.com/profile.php?id=61575307660236"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white"
                aria-label="Facebook"
                title="Facebook"
              >
                <FaFacebook className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Facebook</span>
              </a>
              <a
                href="https://www.instagram.com/ifni_sunset/"
                target="_blank"
                rel="noopener noreferrer"
                className="text-white/70 hover:text-white"
                aria-label="Instagram"
                title="Instagram"
              >
                <FaInstagram className="h-5 w-5" aria-hidden="true" />
                <span className="sr-only">Instagram</span>
              </a>
            </div>
          </div>

          {/* Availability */}
          <div>
            <h3 className="text-lg font-semibold">{t('footer.heading.availability')}</h3>
            <p className="mt-2 text-white/80">{t('footer.bestRates')}</p>

            <ul className="mt-4 space-y-2">
              <li>
                <a
                  href="https://www.booking.com/hotel/ma/ifni-sunset.fr.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('footer.aria.openBooking')}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                >
                  <FaHotel className="h-5 w-5 text-sunset-300" aria-hidden="true" />
                  <span>Booking.com</span>
                </a>
              </li>
              <li>
                <a
                  href="http://airbnb.fr/p/ifni-sunset"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('footer.aria.openAirbnb')}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                >
                  <FaAirbnb className="h-5 w-5 text-sunset-300" aria-hidden="true" />
                  <span>Airbnb</span>
                </a>
              </li>
              <li>
                <a
                  href="https://www.tripadvisor.ca/Hotel_Review-g793713-d33956545-Reviews-Ifni_Sunset-Sidi_Ifni_Souss_Massa.html"
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={t('footer.aria.openTripadvisor')}
                  className="inline-flex items-center gap-2 text-white/80 hover:text-white"
                >
                  <FaTripadvisor className="h-5 w-5 text-sunset-300" aria-hidden="true" />
                  <span>Tripadvisor</span>
                </a>
              </li>
            </ul>

            <p className="mt-3 text-white/80">{t('footer.reserveViaBooking')}</p>
          </div>

          {/* Map */}
          <div>
            <h3 className="text-lg font-semibold">{t('footer.heading.map')}</h3>
            <div className="mt-3 rounded-lg overflow-hidden border border-white/10">
              <iframe
                title={t('footer.map.title')}
                src="https://www.google.com/maps?q=Ifni%20Sunset%20Auberge%2C%20Sidi%20Ifni&output=embed"
                width="100%"
                height="220"
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="border-0"
              ></iframe>
            </div>
          </div>
        </div>

        {/* Legal */}
        <div className="mt-10 flex flex-col items-start justify-between gap-4 border-t border-white/10 pt-6 text-sm md:flex-row">
          <p className="text-white/60">© {new Date().getFullYear()} {t('brand.name')}</p>
          <div className="flex gap-6 items-center justify-center md:flex-1">
            <a href={`#/${lang}/privacy`} className="text-white/80 hover:text-white">{t('legal.privacy.title')}</a>
            <a href={`#/${lang}/terms`} className="text-white/80 hover:text-white">{t('legal.terms.title')}</a>
          </div>
        </div>
      </div>
    </footer>
  );
}