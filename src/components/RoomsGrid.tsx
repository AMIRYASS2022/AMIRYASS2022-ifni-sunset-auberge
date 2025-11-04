import React from 'react';
import { FaWifi, FaBath, FaWater, FaUsers } from 'react-icons/fa';
import ImageCarousel from './ImageCarousel';
import { useI18n } from '../i18n';

function getFeatures(id: string, t: (k: string) => string) {
  const common = [
    { label: t('rooms.feature.wifi'), Icon: FaWifi },
    { label: t('rooms.feature.privateBath'), Icon: FaBath },
  ];
  if (id.includes('sea-view')) common.push({ label: t('rooms.feature.seaView'), Icon: FaWater });
  if (id.includes('triple')) common.push({ label: t('rooms.feature.sleeps3'), Icon: FaUsers });
  else if (id.includes('double')) common.push({ label: t('rooms.feature.sleeps2'), Icon: FaUsers });
  return common;
}

export default function RoomsGrid({ rooms }: { rooms: any[] }) {
  const { t } = useI18n();

  const renderCard = (r: any) => {
    const hasCarousel = Array.isArray(r.images) && r.images.length > 1;
    const nameLabel = t(`rooms.cards.${r.id}.name`);
    const descLabel = t(`rooms.cards.${r.id}.desc`);

    let priceLabel: string = r.price ?? '';
    if (typeof priceLabel === 'string') {
      const lower = priceLabel.toLowerCase();
      if (lower.includes('per person')) {
        const amount = priceLabel.split('per')[0].trim();
        priceLabel = `${amount}${t('rooms.price.unit.personPerNight')}`;
      } else if (lower.includes('per room')) {
        const amount = priceLabel.split('per')[0].trim();
        priceLabel = `${amount}${t('rooms.price.unit.roomPerNight')}`;
      }
    }
    if (!priceLabel) priceLabel = '€—';

    return (
      <article key={r.id} className="group rounded-2xl overflow-hidden border border-neutral-200 bg-white shadow-sm hover:shadow-lg transition shadow-black/5 flex flex-col h-full">
        <div className="relative">
          {hasCarousel ? (
            <ImageCarousel images={r.images} alt={nameLabel} />
          ) : (
            <img
              src={r.image}
              alt={nameLabel}
              className="w-full h-64 md:h-72 lg:h-80 object-cover"
              loading="lazy"
              onError={(e) => { (e.currentTarget as HTMLImageElement).src = '/hero-poster.jpg'; }}
            />
          )}
          <div className="absolute inset-0 bg-gradient-to-t from-black/25 to-transparent opacity-0 group-hover:opacity-100 transition pointer-events-none" aria-hidden="true" />
        </div>
        <div className="p-5 text-left flex-1 flex flex-col">
          <h3 className="font-serif text-xl">{nameLabel}</h3>
          <p className="text-sm mt-2 text-neutral-700">{descLabel}</p>
          <div className="mt-4 flex flex-wrap gap-3">
            {getFeatures(r.id, t).map(({ label, Icon }) => (
              <span key={label} className="inline-flex items-center gap-2 rounded-full border border-neutral-200 px-3 py-1 text-xs text-neutral-700">
                <Icon className="text-sunset-500" aria-hidden="true" />
                {label}
              </span>
            ))}
          </div>
          <div className="mt-auto pt-4 flex items-center justify-between">
            <span className="font-semibold text-neutral-900">{priceLabel}</span>
            <a href={r.bookingUrl} target="_blank" rel="noopener noreferrer" className="rounded-md bg-sunset-500 hover:bg-sunset-400 text-white font-medium px-4 py-2">
              {t('nav.bookNow')}
            </a>
          </div>
        </div>
      </article>
    );
  };

  const row1 = rooms.slice(0, 2);
  const center = rooms[2];
  const row3 = rooms.slice(3, 5);
  const rest = rooms.slice(5);

  return (
    <section id="rooms" className="py-16 px-6 text-center scroll-mt-20 space-y-4">
      <h2 className="text-3xl md:text-4xl font-serif">{t('rooms.title')}</h2>
      <p className="max-w-3xl mx-auto text-neutral-600">{t('rooms.subtitle')}</p>

      <div className="space-y-8">
        <div className="grid gap-8 sm:grid-cols-2">
          {row1.map(renderCard)}
        </div>

        {center && (
          <div className="flex justify-center">
            <div className="w-full sm:w-1/2">
              {renderCard(center)}
            </div>
          </div>
        )}

        <div className="grid gap-8 sm:grid-cols-2">
          {row3.map(renderCard)}
        </div>

        {rest.length > 0 && (
          <div className="grid gap-8 sm:grid-cols-2">
            {rest.map(renderCard)}
          </div>
        )}
      </div>
    </section>
  );
}
