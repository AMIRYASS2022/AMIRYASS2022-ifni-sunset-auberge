import React from 'react';
import Navbar from '../components/Navbar';
import MobileNav from '../components/MobileNav';
import Footer from '../components/Footer';
import { useI18n } from '../i18n';
import { useNavigate } from 'react-router-dom';

export default function OffersPage({ bookingUrl }: { bookingUrl: string }) {
  const { t, lang } = useI18n();
  const navigate = useNavigate();

  return (
    <div className="text-white">
      <Navbar bookingUrl={bookingUrl} />
      <MobileNav bookingUrl={bookingUrl} />
      <main className="pt-14 md:pt-16">
        {/* Hero */}
        <section className="w-full bg-neutral-950">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="max-w-3xl mx-auto text-center">
              <h1 className="font-serif text-4xl md:text-5xl tracking-tight">{t('offers.title')}</h1>
              <p className="mt-4 text-neutral-300 text-lg">{t('offers.subtitle')}</p>
            </div>
          </div>
        </section>

        {/* Packages */}
        <section className="w-full bg-neutral-900">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <div className="grid items-stretch grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-4 md:gap-6">
              {/* Eat & Sleep */}
              <article className="maroc-card h-full p-4 md:p-5">
                <header className="flex items-center gap-2 mb-3">
                  <h3 className="font-serif text-xl">{t('offers.packages.eatSleep.title')}</h3>
                </header>
                <div className="maroc-ornament mb-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                <p className="text-neutral-300">{t('offers.packages.eatSleep.desc')}</p>
                <p className="mt-2 text-2xl font-semibold text-sunset-300">209€<span className="text-sm font-normal text-white/80">{t('offers.packages.priceUnit')}</span></p>
                <h4 className="mt-4 text-sm font-semibold text-white/80">{t('offers.packages.servicesIncluded')}</h4>
                <ul className="mt-3 space-y-1.5 text-white/80 text-sm">
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.accommodation')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.breakfastMoroccan')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.dinnerTraditional')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.wifiUnlimited')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.towelsLinens')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.accessCommons')}</li>
                </ul>
              </article>

              {/* Riders - Popular */}
              <article className="maroc-card h-full p-4 md:p-5">
                <header className="flex items-center gap-2 mb-3">
                  <h3 className="font-serif text-xl">{t('offers.packages.riders.title')}</h3>
                  <span className="ml-auto inline-flex items-center rounded-full border border-amber-400/50 bg-amber-400/10 px-2 py-0.5 text-[10px] uppercase tracking-wide text-amber-300">{t('offers.packages.popular')}</span>
                </header>
                <div className="maroc-ornament mb-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                <p className="text-neutral-300">{t('offers.packages.riders.desc')}</p>
                <p className="mt-2 text-2xl font-semibold text-sunset-300">509€<span className="text-sm font-normal text-white/80">{t('offers.packages.priceUnit')}</span></p>
                <h4 className="mt-4 text-sm font-semibold text-white/80">{t('offers.packages.servicesIncluded')}</h4>
                <ul className="mt-3 space-y-1.5 text-white/80 text-sm">
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.accommodation')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.breakfastMoroccan')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.dinnerTraditional')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.lunchPacked')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.surfEquipment')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.shuttleSurfSpots')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.localSurfAssist')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.wifiUnlimited')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.towelsLinens')}</li>
                </ul>
              </article>

              {/* Starters */}
              <article className="maroc-card h-full p-4 md:p-5">
                <header className="flex items-center gap-2 mb-3">
                  <h3 className="font-serif text-xl">{t('offers.packages.starters.title')}</h3>
                </header>
                <div className="maroc-ornament mb-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                <p className="text-neutral-300">{t('offers.packages.starters.desc')}</p>
                <p className="mt-2 text-2xl font-semibold text-sunset-300">509€<span className="text-sm font-normal text-white/80">{t('offers.packages.priceUnit')}</span></p>
                <h4 className="mt-4 text-sm font-semibold text-white/80">{t('offers.packages.servicesIncluded')}</h4>
                <ul className="mt-3 space-y-1.5 text-white/80 text-sm">
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.accommodation')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.breakfastMoroccan')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.dinnerTraditional')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.lunchPacked')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.surfEquipment')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.shuttleSpots')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.surfLessons')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.wifiUnlimited')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.towelsLinens')}</li>
                </ul>
              </article>

              {/* Explorers */}
              <article className="maroc-card h-full p-4 md:p-5">
                <header className="flex items-center gap-2 mb-3">
                  <h3 className="font-serif text-xl">{t('offers.packages.explorers.title')}</h3>
                </header>
                <div className="maroc-ornament mb-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                <p className="text-neutral-300">{t('offers.packages.explorers.desc')}</p>
                <p className="mt-2 text-2xl font-semibold text-sunset-300">509€<span className="text-sm font-normal text-white/80">{t('offers.packages.priceUnit')}</span></p>
                <h4 className="mt-4 text-sm font-semibold text-white/80">{t('offers.packages.servicesIncluded')}</h4>
                <ul className="mt-3 space-y-1.5 text-white/80 text-sm">
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.accommodation')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.breakfastMoroccan')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.dinnerTraditional')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.surfGearAvailable')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.guidedHiddenSpots')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.personalizedGuidance')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.wifiUnlimited')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.towelsLinens')}</li>
                </ul>
              </article>

              {/* Surfari */}
              <article className="maroc-card h-full p-4 md:p-5">
                <header className="flex items-center gap-2 mb-3">
                  <h3 className="font-serif text-xl">{t('offers.packages.surfari.title')}</h3>
                </header>
                <div className="maroc-ornament mb-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                <p className="text-neutral-300">{t('offers.packages.surfari.desc')}</p>
                <p className="mt-2 text-2xl font-semibold text-sunset-300">470€<span className="text-sm font-normal text-white/80">{t('offers.packages.surfari.priceUnit')}</span></p>
                <h4 className="mt-4 text-sm font-semibold text-white/80">{t('offers.packages.servicesIncluded')}</h4>
                <ul className="mt-3 space-y-1.5 text-white/80 text-sm">
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.accommodation')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.breakfastMoroccan')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.dinnerTraditional')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.lunchPackage')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.guidedBestSpots')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.transportIncluded')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.immersiveExperience')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.wifiUnlimited')}</li>
                  <li className="rounded-md px-2 py-1 hover:bg-white/5 transition-colors">{t('offers.packages.item.towelsLinens')}</li>
                </ul>
              </article>
            </div>

            {/* CTA */}
            <div className="mt-10 text-center">
              <button onClick={() => navigate(`/${lang}/?section=contact`)} className="inline-flex items-center gap-2 rounded-md bg-emerald-600 px-4 py-2 text-sm font-semibold hover:bg-emerald-500">
                {t('offers.cta')}
                <span aria-hidden>→</span>
              </button>
            </div>
          </div>
        </section>

        {/* Activities & Experiences */}
        <section className="w-full bg-neutral-950">
          <div className="mx-auto max-w-7xl px-6 py-12">
            <h2 className="font-serif text-2xl md:text-3xl">{t('offers.activities.title')}</h2>
            <div className="mt-6 grid gap-6 md:grid-cols-2 xl:grid-cols-4">
              {/* Surf */}
              <article className="maroc-card p-4">
                <div className="text-2xl">🏄</div>
                <h3 className="mt-2 text-lg font-semibold">{t('offers.activities.surf')}</h3>
                <div className="maroc-ornament my-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                <p className="text-neutral-300">{t('offers.activities.surf.desc')}</p>
              </article>
              {/* Paragliding */}
              <article className="maroc-card p-4">
                <div className="text-2xl">🪂</div>
                <h3 className="mt-2 text-lg font-semibold">{t('offers.activities.paragliding')}</h3>
                <div className="maroc-ornament my-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                <p className="text-neutral-300">{t('offers.activities.paragliding.desc')}</p>
              </article>
              {/* Desert */}
              <article className="maroc-card p-4">
                <div className="text-2xl">🏜️</div>
                <h3 className="mt-2 text-lg font-semibold">{t('offers.activities.desert')}</h3>
                <div className="maroc-ornament my-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                <p className="text-neutral-300">{t('offers.activities.desert.desc')}</p>
              </article>
              {/* Local Discovery */}
              <article className="maroc-card p-4">
                <div className="text-2xl">🧭</div>
                <h3 className="mt-2 text-lg font-semibold">{t('offers.activities.local')}</h3>
                <div className="maroc-ornament my-3"><span className="line" /><span className="diamond" /><span className="line" /></div>
                <p className="text-neutral-300">{t('offers.activities.local.desc')}</p>
              </article>
            </div>
          </div>
        </section>

        <Footer />
      </main>
    </div>
  );
}