import React from 'react';
import { FaWater, FaRoute, FaLandmark, FaMountain, FaUtensils, FaHorse, FaSun, FaPlay, FaCamera } from 'react-icons/fa';
import { useI18n } from '../i18n';

const ACTIVITIES = [
  { titleKey: 'activities.list.surf.title', categoryKey: 'activities.list.surf.category', descKey: 'activities.list.surf.desc', icon: FaWater, kind: 'photo', src: '/activities/surf-card.jpg', bgSrc: '/activities/surf-card.jpg' },
  { titleKey: 'activities.list.beach.title', categoryKey: 'activities.list.beach.category', descKey: 'activities.list.beach.desc', icon: FaSun, kind: 'photo', src: 'https://ifnisunset.com/images/sidi%20ifni/Legzira_2_ifnisunseT.webp', bgSrc: 'https://ifnisunset.com/images/sidi%20ifni/Legzira_2_ifnisunseT.webp' },
  { titleKey: 'activities.list.local.title', categoryKey: 'activities.list.local.category', descKey: 'activities.list.local.desc', icon: FaLandmark, kind: 'photo', src: 'https://ifnisunset.com/images/sidi%20ifni/Morroco%20sidi%20ifni.webp', bgSrc: 'https://ifnisunset.com/images/sidi%20ifni/Morroco%20sidi%20ifni.webp' },
  { titleKey: 'activities.list.yoga.title', categoryKey: 'activities.list.yoga.category', descKey: 'activities.list.yoga.desc', icon: FaMountain, kind: 'photo', src: 'https://images.unsplash.com/photo-1651077837628-52b3247550ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW9nYSUyMGNsYXNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=600', bgSrc: 'https://images.unsplash.com/photo-1651077837628-52b3247550ae?ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxzZWFyY2h8NHx8eW9nYSUyMGNsYXNzfGVufDB8fDB8fHww&auto=format&fit=crop&q=60&w=1600' },
  { titleKey: 'activities.list.cycling.title', categoryKey: 'activities.list.cycling.category', descKey: 'activities.list.cycling.desc', icon: FaRoute, kind: 'photo', src: '/activities/cycling-card.jpg', bgSrc: '/activities/cycling-card.jpg' },
  { titleKey: 'activities.list.cooking.title', categoryKey: 'activities.list.cooking.category', descKey: 'activities.list.cooking.desc', icon: FaUtensils, kind: 'photo', src: '/activities/cooking-card.jpg', bgSrc: '/activities/cooking-card.jpg' },
  { titleKey: 'activities.list.horse.title', categoryKey: 'activities.list.horse.category', descKey: 'activities.list.horse.desc', icon: FaHorse, kind: 'photo', src: '/activities/horse-card.jpg', bgSrc: '/activities/horse-card.jpg' },
  { titleKey: 'activities.list.fishing.title', categoryKey: 'activities.list.fishing.category', descKey: 'activities.list.fishing.desc', icon: FaWater, kind: 'photo', src: '/activities/fishing-card.jpg', bgSrc: '/activities/fishing-card.jpg' },
  { titleKey: 'activities.list.video.title', categoryKey: 'activities.list.video.category', descKey: 'activities.list.video.desc', icon: FaPlay, kind: 'video', src: '/activities/sunset-video.mp4', bgSrc: '/hero-poster.jpg' }
];

export default function Activities() {
  const { t } = useI18n();
  const [bgA, setBgA] = React.useState<string>('/hero-poster.jpg');
  const [bgB, setBgB] = React.useState<string>('/hero-poster.jpg');
  const [showA, setShowA] = React.useState<boolean>(true);
  const [bgAIsVideo, setBgAIsVideo] = React.useState<boolean>(false);
  const [bgBIsVideo, setBgBIsVideo] = React.useState<boolean>(false);
  React.useEffect(() => {
    const urls = Array.from(new Set(ACTIVITIES.map((a) => (a as any).bgSrc ?? '/hero-poster.jpg')));
    urls.forEach((u) => { const img = new Image(); img.src = u; });
  }, []);
  return (
    <section id="activities" aria-label={t('activities.aria.section')} className="relative space-y-6 text-center py-12 px-6 scroll-mt-20">
      {/* Photo background with subtle dark overlay */}
      <div className="absolute inset-0 -z-10" aria-hidden="true">
        {bgAIsVideo ? (
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${showA ? 'opacity-100' : 'opacity-0'}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
          >
            <source src={bgA} type="video/mp4" />
            <source src="/hero-loop.webm" type="video/webm" />
          </video>
        ) : (
          <img
            src={bgA}
            alt={t('activities.alt.bg')}
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${showA ? 'opacity-100' : 'opacity-0'}`}
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/hero-poster.jpg'; }}
          />
        )}
        {bgBIsVideo ? (
          <video
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${showA ? 'opacity-0' : 'opacity-100'}`}
            autoPlay
            loop
            muted
            playsInline
            preload="metadata"
            poster="/hero-poster.jpg"
          >
            <source src={bgB} type="video/mp4" />
            <source src="/hero-loop.webm" type="video/webm" />
          </video>
        ) : (
          <img
            src={bgB}
            alt=""
            className={`absolute inset-0 w-full h-full object-cover transition-opacity duration-700 ${showA ? 'opacity-0' : 'opacity-100'}`}
            loading="lazy"
            onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/hero-poster.jpg'; }}
          />
        )}
        <div className="absolute inset-0 bg-black/25 transition-colors" />
      </div>

      <h2 className="font-serif text-3xl md:text-4xl">{t('activities.title')}</h2>
      <p className="text-white/80 max-w-3xl mx-auto">{t('activities.tagline')}</p>
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 items-stretch">
        {ACTIVITIES.map((a) => {
          const Icon = a.icon as React.ComponentType<any>;

          // Card con video de fondo (mismo tamaño y estilo que las originales)
          if ('kind' in a && a.kind === 'video') {
            return (
              <article
                key={(a as any).titleKey}
                onPointerEnter={() => { const v = (a as any).src ?? '/hero.mp4'; if (showA) { setBgB(v); setBgBIsVideo(true); setShowA(false); } else { setBgA(v); setBgAIsVideo(true); setShowA(true); } }}
                onPointerLeave={() => { const u = '/hero-poster.jpg'; if (showA) { setBgB(u); setBgBIsVideo(false); setShowA(false); } else { setBgA(u); setBgAIsVideo(false); setShowA(true); } }}
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center transition-colors hover:bg-white/15 relative overflow-hidden h-full flex flex-col"
              >
                <video
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                  autoPlay
                  loop
                  muted
                  playsInline
                  preload="metadata"
                  poster="/hero-poster.jpg"
                >
                  <source src={(a as any).src ?? '/hero.mp4'} type="video/mp4" />
                  <source src="/hero-loop.webm" type="video/webm" />
                </video>
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-colors group-hover:from-sunset-700/40" aria-hidden="true" />
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Icon className="text-sunset-300" size={28} aria-hidden="true" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/70">{t((a as any).categoryKey)}</p>
                    <h3 className="font-serif text-xl mt-0">{t((a as any).titleKey)}</h3>
                  </div>
                </div>
                <p className="relative z-10 text-white/85 text-sm mt-2">{t((a as any).descKey)}</p>
              </article>
            );
          }

          // Card con foto de fondo (mismo tamaño y estilo que las originales)
          if ('kind' in a && a.kind === 'photo') {
            return (
              <article
                key={(a as any).titleKey}
                onPointerEnter={() => { const u = (a as any).bgSrc ?? '/hero-poster.jpg'; if (showA) { setBgB(u); setBgBIsVideo(false); setShowA(false); } else { setBgA(u); setBgAIsVideo(false); setShowA(true); } }}
                onPointerLeave={() => { const u = '/hero-poster.jpg'; if (showA) { setBgB(u); setBgBIsVideo(false); setShowA(false); } else { setBgA(u); setBgAIsVideo(false); setShowA(true); } }}
                className="group bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center transition-colors hover:bg-white/15 relative overflow-hidden h-full flex flex-col"
              >
                <img
                  src={(a as any).src ?? '/hero-poster.jpg'}
                  alt={t('activities.alt.featured')}
                  className="absolute inset-0 w-full h-full object-cover opacity-25"
                  loading="lazy"
                  onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/hero-poster.jpg'; }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent transition-colors group-hover:from-sunset-700/40" aria-hidden="true" />
                <div className="relative z-10 flex items-center justify-center gap-3">
                  <Icon className="text-sunset-300" size={28} aria-hidden="true" />
                  <div>
                    <p className="text-xs uppercase tracking-wide text-white/70">{t((a as any).categoryKey)}</p>
                    <h3 className="font-serif text-xl mt-0">{t((a as any).titleKey)}</h3>
                  </div>
                </div>
                <p className="relative z-10 text-white/85 text-sm mt-2">{t((a as any).descKey)}</p>
              </article>
            );
          }

          // Tarjetas originales (ajustadas para igual altura)
          return (
            <article
              key={(a as any).titleKey}
              onPointerEnter={() => { const u = (a as any).bgSrc ?? '/hero-poster.jpg'; if (showA) { setBgB(u); setBgBIsVideo(false); setShowA(false); } else { setBgA(u); setBgAIsVideo(false); setShowA(true); } }}
              onPointerLeave={() => { const u = '/hero-poster.jpg'; if (showA) { setBgB(u); setBgBIsVideo(false); setShowA(false); } else { setBgA(u); setBgAIsVideo(false); setShowA(true); } }}
              className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center transition-colors hover:bg-white/15 h-full flex flex-col"
            >
              <div className="flex items-center justify-center gap-3">
                <Icon className="text-sunset-300" size={28} aria-hidden="true" />
                <div>
                  <p className="text-xs uppercase tracking-wide text-white/70">{t((a as any).categoryKey)}</p>
                  <h3 className="font-serif text-xl mt-0">{t((a as any).titleKey)}</h3>
                </div>
              </div>
              <p className="text-white/85 text-sm mt-2">{t((a as any).descKey)}</p>
            </article>
          );
        })}
      </div>
    </section>
  );
}