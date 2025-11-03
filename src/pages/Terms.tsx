import React from 'react';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';
import { useI18n } from '../i18n';

export default function TermsPage({ bookingUrl }: { bookingUrl: string }) {
  const { t, lang } = useI18n();
  return (
    <div className="text-white">
      <Navbar bookingUrl={bookingUrl} />
      <MobileNav bookingUrl={bookingUrl} />
      <main className="pt-14 md:pt-16">
        <div className="w-full bg-neutral-950">
          <section aria-label={t('legal.terms.title')} className="mx-auto max-w-6xl px-6 py-12 space-y-4">
            {lang === 'es' ? (
              <>
                <h1 className="font-serif text-3xl md:text-4xl">{t('legal.terms.title')} — Ifni Sunset</h1>
                <p className="text-white/60">Última actualización: 29 octubre 2025</p>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">1. Información general</h2>
                  <p className="text-white/80">Este sitio web (<a href="https://ifnisunset.com" target="_blank" rel="noopener noreferrer" className="text-sunset-300 hover:text-sunset-200">ifnisunset.com</a>) es propiedad y está gestionado por Ifni Sunset, ubicado en Hay Adoufgir, Sidi Ifni, Marruecos.</p>
                  <p className="text-white/80">Teléfono: +212 669 441 741 — Email: <a href="mailto:IfniSunset@gmail.com" className="text-sunset-300 hover:text-sunset-200">IfniSunset@gmail.com</a></p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">2. Uso del sitio</h2>
                  <p className="text-white/80">Al acceder y utilizar este sitio, aceptas estos Términos de Servicio y la Política de Privacidad. Si no estás de acuerdo, por favor no utilices el sitio.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">3. Reservas y pagos</h2>
                  <p className="text-white/80">Las reservas pueden realizarse en línea o por correo/teléfono. La confirmación estará sujeta a la disponibilidad y a las condiciones de pago que se indiquen. Los precios pueden variar según temporada y tipo de habitación.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">4. Cancelaciones</h2>
                  <p className="text-white/80">Las condiciones de cancelación se detallan durante el proceso de reserva o en la confirmación. Ifni Sunset se reserva el derecho de cancelar una reserva en casos de fuerza mayor, ofreciendo alternativa o reembolso.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">5. Responsabilidad</h2>
                  <ul className="list-disc pl-5 space-y-1 text-white/80">
                    <li>Ifni Sunset no será responsable de fallos del sitio web por causas técnicas o ajenas.</li>
                    <li>No seremos responsables por pérdida de datos o daños indirectos derivados del uso del sitio.</li>
                    <li>Durante la estancia, el huésped debe respetar las normas internas del alojamiento.</li>
                  </ul>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">6. Propiedad intelectual</h2>
                  <p className="text-white/80">Todos los textos, imágenes, vídeos y diseños del sitio son propiedad de Ifni Sunset o sus autores. No está permitida su reproducción sin consentimiento.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">7. Modificaciones del servicio</h2>
                  <p className="text-white/80">Podemos actualizar o modificar el contenido del sitio sin previo aviso. Estas modificaciones no afectarán las reservas ya confirmadas.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">8. Jurisdicción aplicable</h2>
                  <p className="text-white/80">Estos Términos se rigen por la legislación de Marruecos. Cualquier disputa será sometida a los tribunales competentes de Sidi Ifni.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">9. Contacto</h2>
                  <p className="text-white/80">Para consultas legales o sobre reservas: Ifni Sunset – Hay Adoufgir, Sidi Ifni, Marruecos — Tel: +212 669 441 741 — Email: <a href="mailto:IfniSunset@gmail.com" className="text-sunset-300 hover:text-sunset-200">IfniSunset@gmail.com</a></p>
                </div>
              </>
            ) : lang === 'en' ? (
              <>
                <h1 className="font-serif text-3xl md:text-4xl">{t('legal.terms.title')} — Ifni Sunset</h1>
                <p className="text-white/60">Last updated: October 29, 2025</p>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">1. General Information</h2>
                  <p className="text-white/80">This website (<a href="https://ifnisunset.com" target="_blank" rel="noopener noreferrer" className="text-sunset-300 hover:text-sunset-200">ifnisunset.com</a>) is owned and operated by Ifni Sunset, located at Hay Adoufgir, Sidi Ifni, Morocco.</p>
                  <p className="text-white/80">Phone: +212 669 441 741 — Email: <a href="mailto:IfniSunset@gmail.com" className="text-sunset-300 hover:text-sunset-200">IfniSunset@gmail.com</a></p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">2. Use of the Site</h2>
                  <p className="text-white/80">By accessing and using this site, you agree to these Terms of Service and the Privacy Policy. If you do not agree, please do not use the site.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">3. Bookings and Payments</h2>
                  <p className="text-white/80">Bookings can be made online or via email/phone. Confirmation is subject to availability and the payment conditions indicated. Prices may vary depending on season and room type.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">4. Cancellations</h2>
                  <p className="text-white/80">Cancellation conditions are detailed during the booking process or in the confirmation. Ifni Sunset reserves the right to cancel a booking in cases of force majeure, offering an alternative or a refund.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">5. Liability</h2>
                  <ul className="list-disc pl-5 space-y-1 text-white/80">
                    <li>Ifni Sunset will not be liable for website failures due to technical or external causes.</li>
                    <li>We are not responsible for data loss or indirect damages arising from use of the site.</li>
                    <li>During the stay, guests must respect the property’s internal rules.</li>
                  </ul>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">6. Intellectual Property</h2>
                  <p className="text-white/80">All texts, images, videos and designs on the site are the property of Ifni Sunset or their authors. Reproduction is not permitted without consent.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">7. Service Modifications</h2>
                  <p className="text-white/80">We may update or modify site content without prior notice. These modifications will not affect bookings already confirmed.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">8. Applicable Jurisdiction</h2>
                  <p className="text-white/80">These Terms are governed by the law of Morocco. Any dispute will be submitted to the competent courts of Sidi Ifni.</p>
                </div>

                <div className="maroc-card p-5 space-y-3">
                  <h2 className="font-semibold">9. Contact</h2>
                  <p className="text-white/80">For legal or booking inquiries: Ifni Sunset – Hay Adoufgir, Sidi Ifni, Morocco — Phone: +212 669 441 741 — Email: <a href="mailto:IfniSunset@gmail.com" className="text-sunset-300 hover:text-sunset-200">IfniSunset@gmail.com</a></p>
                </div>
              </>
            ) : (
              <>
                <h1 className="font-serif text-3xl md:text-4xl">{t('legal.terms.title')}</h1>
                <p className="text-white/80">{t('legal.terms.intro')}</p>
                <div className="maroc-card p-5 space-y-3">
                  <p className="text-white/80">{t('legal.terms.booking')}</p>
                  <p className="text-white/80">{t('legal.terms.liability')}</p>
                  <p className="text-white/80">{t('legal.terms.contact')}</p>
                </div>
              </>
            )}
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}