import React from 'react';
import { FaWhatsapp } from 'react-icons/fa';
import { useI18n } from '../i18n';

const WHATSAPP_NUMBER = '+212669441741';
const WHATSAPP_URL = `https://wa.me/212669441741?text=${encodeURIComponent('Bonjour ! Je souhaite me renseigner sur les disponibilités. / ¡Hola! Me gustaría consultar disponibilidad. / Hello! I would like to check availability.')}`;

export default function WhatsAppButton() {
  const { t } = useI18n();
  const ariaLabel = t('aria.contact.whatsapp') || 'WhatsApp';

  return (
    <a
      href={WHATSAPP_URL}
      target="_blank"
      rel="noopener noreferrer"
      aria-label={ariaLabel}
      className="fixed left-4 bottom-4 z-50 flex items-center gap-2 rounded-full bg-green-500 text-white px-4 py-2 shadow-lg hover:bg-green-600 focus:outline-none focus:ring-2 focus:ring-green-300"
    >
      <FaWhatsapp className="text-white" size={20} />
      <span className="font-medium">WhatsApp</span>
    </a>
  );
}