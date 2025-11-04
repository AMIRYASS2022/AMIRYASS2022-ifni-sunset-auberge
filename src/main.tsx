import React from 'react';
import ReactDOM from 'react-dom/client';
import './styles/tailwind.css';
import IndexPage from './pages/index';
import { I18nProvider, useI18n } from './i18n';
import { BrowserRouter, Routes, Route, Navigate, Outlet, useParams, useNavigate, useLocation } from 'react-router-dom';
import PrivacyPage from './pages/Privacy';
import TermsPage from './pages/Terms';
import OffersPage from './pages/Offers';

import PartnersPage from './pages/Partners';

const BOOKING_URL = 'https://www.booking.com/hotel/ma/ifni-sunset.en-gb.html';

// Añade URL de Booking según idioma actual
function bookingUrlFor(currentLang: string) {
  const code = currentLang === 'en' ? 'en-gb' : currentLang;
  return `${BOOKING_URL}?lang=${code}`;
}

function LangLayout() {
  const { lang: routeLang } = useParams();
  const { lang, setLang, t } = useI18n();
  const navigate = useNavigate();
  const location = useLocation();
  React.useEffect(() => {
    const allowed = ['en', 'es', 'fr'];
    const target = routeLang && allowed.includes(routeLang) ? routeLang : 'es';
    if (target !== lang) setLang(target as any);
    // Asegurar barra final para que coincida con la ruta index anidada
    if (location.pathname === `/${target}`) {
      navigate(`/${target}/`, { replace: true });
    }
  }, [routeLang, lang, setLang, location.pathname, navigate]);

  // Actualizar título y meta-etiquetas según idioma
  React.useEffect(() => {
    const setMeta = (selector: string, content: string) => {
      const el = document.querySelector(selector) as HTMLMetaElement | HTMLLinkElement | null;
      if (el && content) {
        if (el.tagName.toLowerCase() === 'link') {
          el.setAttribute('href', content);
        } else {
          el.setAttribute('content', content);
        }
      }
    };
    const title = t('meta.title');
    if (title) document.title = title;
    setMeta('meta[name="description"]', t('meta.description'));
    setMeta('meta[property="og:title"]', t('og.title'));
    setMeta('meta[property="og:description"]', t('og.description'));
    setMeta('meta[name="twitter:title"]', t('twitter.title'));
    setMeta('meta[name="twitter:description"]', t('twitter.description'));
    setMeta('meta[property="og:url"]', window.location.href);
    setMeta('link[rel="canonical"]', window.location.href);
  }, [lang, t, location.pathname]);

  return <Outlet />;
}

function ToDefaultLangHome() {
  const { lang } = useI18n();
  const allowed = ['en', 'es', 'fr'];
  const target = allowed.includes(lang) ? lang : 'es';
  return <Navigate to={`/${target}/`} replace />;
}

// Wrappers que inyectan bookingUrl según idioma
function IndexRoute() {
  const { lang } = useI18n();
  return <IndexPage bookingUrl={bookingUrlFor(lang)} />;
}
function PrivacyRoute() {
  const { lang } = useI18n();
  return <PrivacyPage bookingUrl={bookingUrlFor(lang)} />;
}
function TermsRoute() {
  const { lang } = useI18n();
  return <TermsPage bookingUrl={bookingUrlFor(lang)} />;
}
function OffersRoute() {
  const { lang } = useI18n();
  return <OffersPage bookingUrl={bookingUrlFor(lang)} />;
}
function PartnersRoute() {
  const { lang } = useI18n();
  return <PartnersPage bookingUrl={bookingUrlFor(lang)} />;
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <I18nProvider>
      <BrowserRouter>
        <Routes>
          {/* Redirect base to current i18n language */}
          <Route path="/" element={<ToDefaultLangHome />} />

          {/* Language-scoped routes */}
          <Route path=":lang/*" element={<LangLayout />}>
            <Route index element={<IndexRoute />} />
            <Route path="privacy" element={<PrivacyRoute />} />
            <Route path="terms" element={<TermsRoute />} />
            <Route path="offers" element={<OffersRoute />} />
            <Route path="partners" element={<PartnersRoute />} />
          </Route>

          {/* Fallback */}
          <Route path="*" element={<ToDefaultLangHome />} />
        </Routes>
      </BrowserRouter>
    </I18nProvider>
  </React.StrictMode>
);
