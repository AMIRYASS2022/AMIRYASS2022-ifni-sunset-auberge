import React from 'react';
import { useI18n } from '../i18n';

const ADDRESS_QUERY = 'Route idoufkir, Sidi Ifni 85200 Morocco';
const EMBED_URL = `https://www.google.com/maps?q=${encodeURIComponent(ADDRESS_QUERY)}&output=embed`;

export default function MapEmbed() {
  const { t } = useI18n();
  const title = t('aria.contact.map') || 'Mapa de ubicación';

  return (
    <div className="mt-8">
      <iframe
        title={title}
        src={EMBED_URL}
        loading="lazy"
        referrerPolicy="no-referrer-when-downgrade"
        className="w-full aspect-video rounded-lg border border-white/10"
      />
    </div>
  );
}