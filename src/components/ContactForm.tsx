import React, { useState } from 'react';
import { useI18n } from '../i18n';

export default function ContactForm({ bookingUrl }: { bookingUrl: string }) {
  const [status, setStatus] = useState<'idle' | 'opening'>('idle');
  const { t } = useI18n();

  function handleSubmit(e: React.FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const form = e.currentTarget;
    const data = new FormData(form);
    const name = String(data.get('name') || '').trim();
    const email = String(data.get('email') || '').trim();
    const message = String(data.get('message') || '').trim();

    const subject = encodeURIComponent(`Inquiry from ${name || 'Guest'}`);
    const body = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\n${message}`);
    // Updated: send directly to Ifnisunset@gmail.com
    const to = encodeURIComponent('Ifnisunset@gmail.com');
    const mailto = `mailto:${to}?subject=${subject}&body=${body}`;

    setStatus('opening');
    // Opens default email client; there is no backend submission.
    window.location.href = mailto;
    setTimeout(() => setStatus('idle'), 1000);
  }

  return (
    <section id="contact" aria-label={t('contact.ariaLabel')} className="mx-auto max-w-4xl text-center scroll-mt-20">
      <div className="space-y-4">
        <h2 className="font-serif text-3xl md:text-4xl">{t('nav.contact')}</h2>
        <p className="text-white/80">{t('contact.tagline')}</p>
        {/* Added direct contact information */}
        <div className="flex flex-col sm:flex-row sm:items-center gap-2 sm:gap-4 text-sm">
          <a href="mailto:Ifnisunset@gmail.com" className="text-white/90 hover:text-white" aria-label={t('aria.contact.email', { email: 'Ifnisunset@gmail.com' })}>
            <span className="font-medium">{t('footer.email')}</span>
            <span className="ml-2">Ifnisunset@gmail.com</span>
          </a>
          <span className="hidden sm:inline text-white/30">•</span>
          <a href="https://wa.me/212669441741" target="_blank" rel="noopener noreferrer" className="text-white/90 hover:text-white" aria-label={t('aria.contact.whatsapp', { phone: '+212 669 441 741' })}>
            <span className="font-medium">{t('footer.whatsapp')}</span>
            <span className="ml-2">+212 669 441 741</span>
          </a>
        </div>
      </div>

      <form onSubmit={handleSubmit} className="mt-6 grid grid-cols-1 gap-4 text-left">
        <div>
          <label htmlFor="name" className="block text-sm text-white/70">{t('form.name')}</label>
          <input
            id="name"
            name="name"
            type="text"
            required
            className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sunset-400"
            placeholder={t('form.name')}
          />
        </div>
        <div>
          <label htmlFor="email" className="block text-sm text-white/70">{t('form.email')}</label>
          <input
            id="email"
            name="email"
            type="email"
            required
            className="mt-1 w-full rounded-md bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sunset-400"
            placeholder={t('form.email.placeholder')}
          />
        </div>
        <div>
          <label htmlFor="message" className="block text-sm text-white/70">{t('form.message')}</label>
          <textarea
            id="message"
            name="message"
            rows={5}
            className="mt-1 w-full rounded-md bg.white/5 bg-white/5 border border-white/10 px-3 py-2 text-white placeholder-white/40 focus:outline-none focus:ring-2 focus:ring-sunset-400"
            placeholder={t('form.message.placeholder')}
          />
        </div>

        <div className="flex flex-col sm:flex-row gap-3 mt-2">
          <button
            type="submit"
            className="rounded-md bg-sunset-500 hover:bg-sunset-400 text-white font-medium px-5 py-3 disabled:opacity-60"
            disabled={status === 'opening'}
            aria-label={t('form.openEmailAria')}
          >
            {status === 'opening' ? t('form.openingEmail') : t('form.send')}
          </button>
          <a
            href={bookingUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="rounded-md bg-white/10 hover:bg-white/15 text-white font-medium px-5 py-3 border border-white/20"
            aria-label={t('aria.bookOnBooking')}
          >
            {t('cta.bookOnBooking')}
          </a>
        </div>
      </form>
      {/* Mapa embebido eliminado para no reflejar la dirección exacta en Google Maps */}
    </section>
  );
}