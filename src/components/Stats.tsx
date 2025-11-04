import React from 'react';
import { FaUsers, FaSun, FaRoute } from 'react-icons/fa';
import { useI18n } from '../i18n';

function useInViewOnce<T extends HTMLElement>() {
  const ref = React.useRef<T | null>(null);
  const [visible, setVisible] = React.useState(false);
  React.useEffect(() => {
    if (!ref.current || visible) return;
    // Si ya está en viewport al montar, dispara inmediatamente
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
      setVal(Math.round(target.current * eased));
      if (p < 1) raf = requestAnimationFrame(step);
    };
    raf = requestAnimationFrame(step);
    return () => cancelAnimationFrame(raf);
  }, [duration, end, reducedMotion]);
  const formatted = React.useMemo(() => new Intl.NumberFormat(locale).format(val), [val, locale]);
  return <span aria-live="polite">{formatted}{suffix}</span>;
}

export default function Stats() {
  const { t, lang } = useI18n();
  const { ref, visible } = useInViewOnce<HTMLDivElement>();

  const items = [
    {
      icon: FaUsers,
      end: Number(t('counts.clients.value') || '100'),
      suffix: t('counts.clients.suffix') || '%+',
      title: t('counts.clients.title'),
      desc: t('counts.clients.desc'),
    },
    {
      icon: FaSun,
      end: Number(t('counts.sunsets.value') || '365'),
      title: t('counts.sunsets.title'),
      desc: t('counts.sunsets.desc'),
    },
    {
      icon: FaRoute,
      end: Number(t('counts.experiences.value') || '50'),
      suffix: t('counts.experiences.suffix') || '+',
      title: t('counts.experiences.title'),
      desc: t('counts.experiences.desc'),
    },
  ];

  return (
    <section aria-label={t('counts.title')} className="mx-auto max-w-6xl px-6 py-12">
      <h2 className="font-serif text-2xl md:text-3xl text-center">{t('counts.heading')}</h2>
      <div
        ref={ref}
        className="mt-6 rounded-xl border border-white/10 shadow-xl bg-gradient-to-r from-[#f97316]/10 via-[#f59e0b]/10 to-[#f97316]/10 p-6 md:p-8"
      >
        <div className="grid gap-6 md:grid-cols-3 divide-y divide-white/10 md:divide-y-0 md:divide-x">
          {items.map(({ icon: Icon, end, suffix, title, desc }, idx) => (
            <article key={idx} className="text-center px-4">
              <Icon className="mx-auto text-sunset-300 text-3xl" aria-hidden="true" />
              <div className="mt-3 font-serif text-4xl md:text-5xl leading-none text-[#f97316] tracking-tight drop-shadow-sm">
                {visible ? <CountUp end={end} suffix={suffix} locale={lang} /> : <span>0{suffix}</span>}
              </div>
              <div className="mt-2 text-white/90 font-medium">{title}</div>
              <p className="mt-1 text-white/75 max-w-xs mx-auto">{desc}</p>
            </article>
          ))}
        </div>
      </div>
    </section>
  );
}