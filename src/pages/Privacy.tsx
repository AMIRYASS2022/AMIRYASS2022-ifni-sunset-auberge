import React from 'react';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';
import { useI18n } from '../i18n';

export default function PrivacyPage({ bookingUrl }: { bookingUrl: string }) {
  const { t, lang } = useI18n();

  return (
    <div className="text-white">
      <Navbar bookingUrl={bookingUrl} />
      <MobileNav bookingUrl={bookingUrl} />
      <main className="pt-14 md:pt-16">
        <div className="w-full bg-neutral-950">
          <section className="mx-auto max-w-6xl px-6 py-12" aria-label={t('legal.privacy.title')}>
            <h1 className="font-serif text-3xl md:text-4xl mb-6">{t('legal.privacy.title')}</h1>
            {/* Render contenido español detallado si lang === 'es'. En otro caso, versión en inglés si lang === 'en'; si no, i18n por defecto. */}
            {
              lang === 'es' ? (
                <>
                  <p className="mb-2"><strong>Política de Privacidad — Ifni Sunset</strong></p>
                  <p className="mb-2">Fecha de última actualización: 29 de octubre de 2025</p>
                  <p className="mb-2">Responsable: Ifni Sunset — Dirección: Hay Adoufgir, Sidi Ifni, Marruecos</p>
                  <p className="mb-2">Teléfono: +212 669 441 741 — Email: <a href="mailto:IfniSunset@gmail.com" className="underline">IfniSunset@gmail.com</a></p>
                  <p className="mb-6">Sitio web: <a href="https://ifnisunset.com" target="_blank" rel="noopener noreferrer" className="underline">ifnisunset.com</a></p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">1. Datos que recolectamos</h2>
                  <p className="mb-2">Podemos recolectar los siguientes datos personales cuando utilizas nuestro sitio o realizas una reserva:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Nombre completo</li>
                    <li>Correo electrónico</li>
                    <li>Número de teléfono</li>
                    <li>Fechas de estancia y preferencias</li>
                    <li>Información de pago (a través de plataformas externas seguras)</li>
                    <li>Dirección IP, navegador, sistema operativo y datos de uso (cookies, analítica web)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-2">2. Finalidad del tratamiento</h2>
                  <p className="mb-4">Tus datos personales se emplean para:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Gestionar tus reservas y servicios contratados</li>
                    <li>Comunicarnos contigo en relación con tu estancia</li>
                    <li>Enviar información sobre nuestras ofertas, si lo has autorizado</li>
                    <li>Analizar el uso del sitio para mejorarlo</li>
                    <li>Cumplir con obligaciones legales y fiscales</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-2">3. Base legal</h2>
                  <p className="mb-4">El tratamiento se realiza sobre las siguientes bases:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Ejecución de un contrato (tu reserva)</li>
                    <li>Consentimiento (por ejemplo, para recibir comunicaciones)</li>
                    <li>Interés legítimo (mejora del servicio, seguridad)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
                  <p className="mb-4">Ifni Sunset utiliza cookies propias y de terceros para mejorar tu experiencia y analizar el tráfico del sitio. Puedes configurar tu navegador para rechazar las cookies, aunque algunas funcionalidades podrían verse afectadas. Más detalles están disponibles en la sección “Cookies” del sitio.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">5. Conservación</h2>
                  <p className="mb-4">Los datos se conservarán durante el tiempo necesario para gestionar la reserva o mientras exista una relación contractual, y posteriormente conforme a las obligaciones legales aplicables.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">6. Cesión de datos</h2>
                  <p className="mb-4">Podemos compartir datos con proveedores que nos ayudan (por ejemplo, sistema de reservas o correo), siempre bajo acuerdos de confidencialidad. En algunos casos puede haber transferencias internacionales seguras (servidores fuera de Marruecos).</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">7. Derechos de los usuarios</h2>
                  <p className="mb-4">Puedes ejercer tus derechos de acceso, rectificación, supresión, oposición, limitación y portabilidad contactando a: <a href="mailto:IfniSunset@gmail.com" className="underline">IfniSunset@gmail.com</a>. También puedes presentar una reclamación ante la autoridad de protección de datos competente.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">8. Seguridad</h2>
                  <p className="mb-4">Adoptamos medidas técnicas y organizativas apropiadas para proteger tu información. No obstante, ninguna transmisión por internet es completamente segura.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">9. Enlaces externos</h2>
                  <p className="mb-4">Nuestro sitio puede contener enlaces a otros sitios. No somos responsables de sus políticas de privacidad.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">10. Cambios a esta política</h2>
                  <p className="mb-4">Ifni Sunset puede actualizar esta política en cualquier momento. La versión vigente estará siempre disponible en esta página.</p>
                </>
              ) : lang === 'en' ? (
                <>
                  <p className="mb-2"><strong>Privacy Policy — Ifni Sunset</strong></p>
                  <p className="mb-2">Last updated: October 29, 2025</p>
                  <p className="mb-2">Controller: Ifni Sunset — Address: Hay Adoufgir, Sidi Ifni, Morocco</p>
                  <p className="mb-2">Phone: +212 669 441 741 — Email: <a href="mailto:IfniSunset@gmail.com" className="underline">IfniSunset@gmail.com</a></p>
                  <p className="mb-6">Website: <a href="https://ifnisunset.com" target="_blank" rel="noopener noreferrer" className="underline">ifnisunset.com</a></p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">1. Data We Collect</h2>
                  <p className="mb-2">We may collect the following personal data when you use our site or make a booking:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Full name</li>
                    <li>Email address</li>
                    <li>Phone number</li>
                    <li>Stay dates and preferences</li>
                    <li>Payment information (via secure external platforms)</li>
                    <li>IP address, browser, operating system, and usage data (cookies, web analytics)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-2">2. Purposes of Processing</h2>
                  <p className="mb-4">Your personal data is used to:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Manage your bookings and contracted services</li>
                    <li>Communicate with you regarding your stay</li>
                    <li>Send information about our offers, if you have authorized it</li>
                    <li>Analyze site usage to improve it</li>
                    <li>Comply with legal and tax obligations</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-2">3. Legal Basis</h2>
                  <p className="mb-4">Processing is carried out on the following bases:</p>
                  <ul className="list-disc pl-6 mb-4">
                    <li>Performance of a contract (your booking)</li>
                    <li>Consent (e.g., to receive communications)</li>
                    <li>Legitimate interest (service improvement, security)</li>
                  </ul>

                  <h2 className="text-xl font-semibold mt-6 mb-2">4. Cookies</h2>
                  <p className="mb-4">Ifni Sunset uses first-party and third-party cookies to improve your experience and analyze site traffic. You can configure your browser to reject cookies, though some features may be affected. More details are available in the “Cookies” section of the site.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">5. Retention</h2>
                  <p className="mb-4">Data will be retained for as long as necessary to manage the booking or while a contractual relationship exists, and thereafter in accordance with applicable legal obligations.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">6. Data Sharing</h2>
                  <p className="mb-4">We may share data with providers that assist us (e.g., booking system or email), always under confidentiality agreements. In some cases there may be secure international transfers (servers outside Morocco).</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">7. User Rights</h2>
                  <p className="mb-4">You can exercise your rights of access, rectification, erasure, objection, restriction, and portability by contacting: <a href="mailto:IfniSunset@gmail.com" className="underline">IfniSunset@gmail.com</a>. You can also lodge a complaint with the relevant data protection authority.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">8. Security</h2>
                  <p className="mb-4">We adopt appropriate technical and organizational measures to protect your information. However, no internet transmission is completely secure.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">9. External Links</h2>
                  <p className="mb-4">Our site may contain links to other sites. We are not responsible for their privacy policies.</p>

                  <h2 className="text-xl font-semibold mt-6 mb-2">10. Changes to This Policy</h2>
                  <p className="mb-4">Ifni Sunset may update this policy at any time. The current version will always be available on this page.</p>
                </>
              ) : (
                <>
                  <p className="mb-4">{t('legal.privacy.intro')}</p>
                  <h2 className="text-xl font-semibold mt-6 mb-2">{t('legal.privacy.data.title')}</h2>
                  <ul className="list-disc pl-6 mb-4">
                    <li>{t('legal.privacy.data.name')}</li>
                    <li>{t('legal.privacy.data.email')}</li>
                    <li>{t('legal.privacy.data.phone')}</li>
                    <li>{t('legal.privacy.data.stay')}</li>
                    <li>{t('legal.privacy.data.payment')}</li>
                    <li>{t('legal.privacy.data.analytics')}</li>
                  </ul>
                  <h2 className="text-xl font-semibold mt-6 mb-2">{t('legal.privacy.purposes.title')}</h2>
                  <ul className="list-disc pl-6 mb-4">
                    <li>{t('legal.privacy.purposes.manageBookings')}</li>
                    <li>{t('legal.privacy.purposes.communication')}</li>
                    <li>{t('legal.privacy.purposes.offers')}</li>
                    <li>{t('legal.privacy.purposes.analyze')}</li>
                    <li>{t('legal.privacy.purposes.legal')}</li>
                  </ul>
                  <h2 className="text-xl font-semibold mt-6 mb-2">{t('legal.privacy.rights.title')}</h2>
                  <p className="mb-4">{t('legal.privacy.rights.description')}</p>
                </>
              )
            }
          </section>
        </div>
        <Footer />
      </main>
    </div>
  );
}