import React from 'react';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';
import { useI18n } from '../i18n';
import { FaHandshake, FaGlobe, FaRocket, FaStar, FaBuilding, FaWater, FaRoute, FaUmbrellaBeach } from 'react-icons/fa';

// Helpers: observar visibilidad y animar conteo suave (soporta decimales)
function useInViewOnce<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || visible) return;
    const rect = ref.current.getBoundingClientRect();
    const vh = window.innerHeight || document.documentElement.clientHeight;
    if (rect.top < vh * 0.95 && rect.bottom > 0) {
      setVisible(true);
      return;
    }
    const obs = new IntersectionObserver((entries) => {
      const e = entries[0];
      if (e && e.isIntersecting) setVisible(true);
    }, { threshold: 0, rootMargin: '0px 0px -15% 0px' });
    obs.observe(ref.current);
    return () => obs.disconnect();
  }, [visible]);
  return { ref, visible } as const;
}

function CountUp({ end, duration = 1800, suffix = '', locale = 'en' }: { end: number; duration?: number; suffix?: string; locale?: string }) {
  const [val, setVal] = React.useState(0);
  const startTs = React.useRef<number | null>(null);
  const target = React.useRef(end);
  const reducedMotion = React.useMemo(() => typeof window !== 'undefined' && window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches, []);
  const isInteger = Number.isInteger(end);
  const decimals = isInteger ? 0 : 1;
  React.useEffect(() => {
    target.current = end;
    startTs.current = null;
    setVal(0);
    if (reducedMotion) {
      setVal(end);
      return;
    }
    let raf = 0;
    const step = (ts: number) => {
      if (startTs.current == null) startTs.current = ts;
      const elapsed = ts - (startTs.current || 0);
      const p = Math.min(1, elapsed / duration);
      const eased = 1 - Math.pow(1 - p, 3); // easeOutCubic
      setVal(target.current * eased);
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, end, reducedMotion]);
  const formatted = React.useMemo(() => new Intl.NumberFormat(locale, { minimumFractionDigits: decimals, maximumFractionDigits: decimals }).format(Math.min(end, val)), [val, end, locale, decimals]);
  return <span aria-live="polite">{formatted}{suffix}</span>;
}

export default function PartnersPage({ bookingUrl }: { bookingUrl: string }) {
  const { t, lang } = useI18n();

  const advantages = [
    { icon: FaHandshake, title: t('partners.adv.collab'), desc: t('partners.adv.collab.desc') },
    { icon: FaGlobe, title: t('partners.adv.network'), desc: t('partners.adv.network.desc') },
    { icon: FaRocket, title: t('partners.adv.growth'), desc: t('partners.adv.growth.desc') },
    { icon: FaStar, title: t('partners.adv.excellence'), desc: t('partners.adv.excellence.desc') },
  ];

  const collaborators = [
    { icon: FaBuilding, label: t('partners.who.agencies') },
    { icon: FaWater, label: t('partners.who.surfSchools') },
    { icon: FaRoute, label: t('partners.who.guides') },
    { icon: FaUmbrellaBeach, label: t('partners.who.localActivities') },
  ];

  const kpis = [
    { icon: FaStar, value: '4.7', label: t('partners.kpis.rating') },
    { icon: FaHandshake, value: '30+', label: t('partners.kpis.partners') },
    { icon: FaUmbrellaBeach, value: '1500+', label: t('partners.kpis.guests') },
    { icon: FaGlobe, value: '20+', label: t('partners.kpis.countries') },
  ];

  const models = [
    { icon: FaBuilding, title: t('partners.models.agencies.title'), desc: t('partners.models.agencies.desc') },
    { icon: FaWater, title: t('partners.models.surfSchools.title'), desc: t('partners.models.surfSchools.desc') },
    { icon: FaRoute, title: t('partners.models.tourOperators.title'), desc: t('partners.models.tourOperators.desc') },
    { icon: FaRocket, title: t('partners.models.corporate.title'), desc: t('partners.models.corporate.desc') },
  ];

  const [form, setForm] = React.useState({
    company: '',
    contact: '',
    email: '',
    phone: '',
    activity: '',
    proposal: '',
  });

  function update<K extends keyof typeof form>(key: K, value: string) {
    setForm(prev => ({ ...prev, [key]: value }));
  }

  function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const to = 'ifnisunset@gmail.com';
    const subject = encodeURIComponent(t('partners.mail.subject'));
    const bodyLines = [
      `${t('partners.form.company')}: ${form.company}`,
      `${t('partners.form.contact')}: ${form.contact}`,
      `${t('partners.form.email')}: ${form.email}`,
      `${t('partners.form.phone')}: ${form.phone}`,
      `${t('partners.form.activityType')}: ${form.activity}`,
      `${t('partners.form.proposal')}:\n${form.proposal}`,
    ];
    const body = encodeURIComponent(bodyLines.join('\n'));
    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
  }

  const { ref: kpiRef, visible: kpiVisible } = useInViewOnce<HTMLDivElement>();

  return (
    <div className="text-white">
      <Navbar bookingUrl={bookingUrl} />
      <MobileNav bookingUrl={bookingUrl} />
      <main className="pt-14 md:pt-16">
        {/* Hero / encabezado */}
        <section className="w-full bg-gradient-to-b from-sunset-900 via-orange-900/60 to-neutral-950">
          <div className="mx-auto max-w-7xl px-6 py-12 text-center">
            <h1 className="font-serif text-3xl md:text-4xl">{t('partners.title')}</h1>
            <p className="mt-3 text-white/80 max-w-3xl mx-auto">{t('partners.subtitle')}</p>
          </div>
        </section>

        {/* Indicadores clave (KPIs) — estilo y animación como Stats */}
        <section className="w-full bg-neutral-950">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <h2 className="font-serif text-2xl md:text-3xl text-center">{t('partners.kpis.title')}</h2>
            <div
              ref={kpiRef}
              className="mt-6 rounded-xl border border-white/10 shadow-xl bg-gradient-to-r from-[#f97316]/10 via-[#f59e0b]/10 to-[#f97316]/10 p-6 md:p-8"
            >
              <div className="grid gap-6 md:grid-cols-4 divide-y divide-white/10 md:divide-y-0 md:divide-x">
                {kpis.map(({ icon: Icon, value, label }, idx) => {
                  const hasPlus = value.includes('+');
                  const numeric = parseFloat(value.replace(/[^0-9.]/g, ''));
                  const suffix = hasPlus ? '+' : '';
                  return (
                    <article key={`${label}-${idx}`} className="text-center px-4">
                      <Icon className="mx-auto text-sunset-300 text-3xl" aria-hidden="true" />
                      <div className="mt-3 font-serif text-4xl md:text-5xl leading-none text-[#f97316] tracking-tight drop-shadow-sm">
                        {kpiVisible ? (
                          <CountUp end={numeric} suffix={suffix} locale={lang} />
                        ) : (
                          <span>0{suffix}</span>
                        )}
                      </div>
                      <div className="mt-2 text-white/90 font-medium">{label}</div>
                    </article>
                  );
                })}
              </div>
            </div>
          </div>
        </section>

        {/* Ventajas */}
        <section className="w-full bg-neutral-950">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {advantages.map(({ icon: Icon, title, desc }) => (
                <article key={title} className="maroc-card p-5">
                  <header className="flex items-center gap-3">
                    <Icon className="text-sunset-300 text-2xl" aria-hidden="true" />
                    <h3 className="font-serif text-xl">{title}</h3>
                  </header>
                  <div className="maroc-ornament my-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                  <p className="text-neutral-300">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* ¿Con quién colaboramos? */}
        <section className="w-full bg-gradient-to-b from-neutral-950 to-sunset-900/40">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <h2 className="font-serif text-2xl md:text-3xl text-center">{t('partners.who.title')}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {collaborators.map(({ icon: Icon, label }) => (
                <article key={label} className="maroc-card p-5 flex flex-col items-center gap-3 text-center">
                  <Icon className="text-sunset-300 text-2xl" aria-hidden="true" />
                  <div>
                    <h3 className="text-lg font-semibold">{label}</h3>
                    <p className="text-neutral-300">{t('partners.who.item.desc')}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Modelos de colaboración */}
        <section className="w-full bg-neutral-950">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <h2 className="font-serif text-2xl md:text-3xl text-center">{t('partners.models.title')}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {models.map(({ icon: Icon, title, desc }) => (
                <article key={title} className="maroc-card p-5 text-center">
                  <header className="flex flex-col items-center gap-3">
                    <Icon className="text-sunset-300 text-2xl" aria-hidden="true" />
                    <h3 className="text-lg font-semibold">{title}</h3>
                  </header>
                  <div className="maroc-ornament my-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                  <p className="text-neutral-300">{desc}</p>
                </article>
              ))}
            </div>
          </div>
        </section>

        {/* Formulario B2B */}
        <section className="w-full bg-neutral-950">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <h2 className="font-serif text-2xl md:text-3xl">{t('partners.form.title')}</h2>
            <p className="mt-2 text-white/70 max-w-3xl">{t('partners.form.subtitle')}</p>
            <form onSubmit={handleSubmit} className="mt-6 grid gap-4 md:grid-cols-2">
              <div>
                <label className="block text-sm text-white/70">{t('partners.form.company')}</label>
                <input value={form.company} onChange={e=>update('company', e.target.value)} className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm text-white/70">{t('partners.form.contact')}</label>
                <input value={form.contact} onChange={e=>update('contact', e.target.value)} className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm text-white/70">{t('partners.form.email')}</label>
                <input type="email" value={form.email} onChange={e=>update('email', e.target.value)} className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 focus:outline-none" required />
              </div>
              <div>
                <label className="block text-sm text-white/70">{t('partners.form.phone')}</label>
                <input value={form.phone} onChange={e=>update('phone', e.target.value)} className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/70">{t('partners.form.activityType')}</label>
                <input value={form.activity} onChange={e=>update('activity', e.target.value)} className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <label className="block text-sm text-white/70">{t('partners.form.proposal')}</label>
                <textarea value={form.proposal} onChange={e=>update('proposal', e.target.value)} className="mt-1 w-full min-h-[140px] rounded-md bg-white/5 border border-white/10 px-3 py-2 focus:outline-none" />
              </div>
              <div className="md:col-span-2">
                <button type="submit" className="inline-flex items-center gap-2 rounded-md bg-sunset-500 hover:bg-sunset-400 px-4 py-2 font-semibold">
                  {t('partners.form.submit')}
                  <span aria-hidden>→</span>
                </button>
              </div>
            </form>
            <div className="mt-8">
              <div className="maroc-ornament mb-4"><span className="line" /><span className="diamond" /><span className="line" /></div>
              <h3 className="font-serif text-xl">{t('partners.cta.title')}</h3>
              <p className="mt-2 text-white/70">{t('partners.cta.subtitle')}</p>
              <div className="mt-4 flex flex-wrap gap-3">
                <button
                  onClick={() => {
                    const to = 'ifnisunset@gmail.com';
                    const subject = encodeURIComponent(t('partners.mail.subject'));
                    const body = encodeURIComponent(t('partners.cta.body'));
                    window.location.href = `mailto:${to}?subject=${subject}&body=${body}`;
                  }}
                  className="inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/15 px-4 py-2"
                >
                  {t('partners.cta.dossier')}
                </button>
                <a href="mailto:ifnisunset@gmail.com" className="inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/15 px-4 py-2">
                  {t('partners.cta.email')}: ifnisunset@gmail.com
                </a>
                <a href="tel:+212675367603" className="inline-flex items-center gap-2 rounded-md bg-white/10 hover:bg-white/15 px-4 py-2">
                  {t('partners.cta.phone')}: +212 675-367603
                </a>
              </div>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}