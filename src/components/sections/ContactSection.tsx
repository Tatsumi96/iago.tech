"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { Mail, Phone, MapPin, ArrowRight, ArrowUpRight } from 'lucide-react';
import { FacebookIcon, MessengerIcon, WhatsAppIcon } from '@/components/icons/brand-icons';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_FACEBOOK, CONTACT_MESSENGER, CONTACT_WHATSAPP, COMPANY_ADDRESS } from '@/lib/constants';

const inputClass =
  'w-full border-0 border-b border-border bg-transparent px-0 py-3 text-[15px] placeholder:text-muted-foreground/60 focus-visible:outline-none focus-visible:border-brand transition-colors rounded-none';

export default function ContactSection() {
  const t = useTranslations('Contact');
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [subject, setSubject] = useState('');
  const [message, setMessage] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const body = `Nom: ${name}\nEmail: ${email}\n\n${message}`;
    const mailto = `mailto:${CONTACT_EMAIL}?subject=${encodeURIComponent(subject || `Message de ${name}`)}&body=${encodeURIComponent(body)}`;
    window.location.href = mailto;
  };

  const whatsappPrefill = `https://wa.me/261328645674?text=${encodeURIComponent("Bonjour i'ago Tech, je souhaite discuter de mon projet.")}`;

  return (
    <section className="relative overflow-hidden py-24 md:py-32" id="contact">
      <span aria-hidden className="ghost-num font-heading pointer-events-none absolute -top-4 right-2 text-[7rem] leading-none font-extrabold select-none md:right-8 md:text-[11rem]">
        04
      </span>

      <div className="relative container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-14 lg:grid-cols-12 lg:gap-16">

          {/* Colonne infos — liste simple, sans cards */}
          <div className="lg:col-span-5">
            <RevealOnScroll>
              <p className="font-mono text-[11px] tracking-[0.24em] text-brand uppercase">
                Contact
              </p>
              <h2 className="mt-3 text-3xl md:text-5xl font-bold tracking-tight">
                {t('title')}
              </h2>
              <p className="mt-4 text-lg text-muted-foreground leading-relaxed">
                {t('subtitle')}
              </p>
            </RevealOnScroll>

            <RevealOnScroll delay={0.1}>
              <ul className="mt-10 border-t border-border">
                <li className="flex items-center gap-4 border-b border-border py-5">
                  <Phone size={18} strokeWidth={1.75} className="shrink-0 text-brand" />
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                      Téléphone
                    </p>
                    <a
                      href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`}
                      className="mt-0.5 block text-[15px] font-medium hover:text-brand transition-colors"
                    >
                      {CONTACT_PHONE}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4 border-b border-border py-5">
                  <Mail size={18} strokeWidth={1.75} className="shrink-0 text-brand" />
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                      Email
                    </p>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="mt-0.5 block truncate text-[15px] font-medium hover:text-brand transition-colors"
                    >
                      {CONTACT_EMAIL}
                    </a>
                  </div>
                </li>
                <li className="flex items-center gap-4 border-b border-border py-5">
                  <MapPin size={18} strokeWidth={1.75} className="shrink-0 text-brand" />
                  <div className="min-w-0">
                    <p className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                      Adresse
                    </p>
                    <p className="mt-0.5 text-[15px] font-medium">{COMPANY_ADDRESS}</p>
                  </div>
                </li>
              </ul>
            </RevealOnScroll>

            <RevealOnScroll delay={0.15}>
              <div className="mt-6 flex flex-wrap items-center gap-x-5 gap-y-2 text-sm">
                <a
                  href={whatsappPrefill}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-foreground hover:text-brand transition-colors"
                >
                  <WhatsAppIcon size={15} />
                  WhatsApp
                  <ArrowUpRight size={14} />
                </a>
                <a
                  href={CONTACT_FACEBOOK}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <FacebookIcon size={15} />
                  Facebook
                </a>
                <a
                  href={CONTACT_MESSENGER}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center gap-1.5 font-medium text-muted-foreground hover:text-foreground transition-colors"
                >
                  <MessengerIcon size={15} />
                  Messenger
                </a>
              </div>
            </RevealOnScroll>
          </div>

          {/* Colonne formulaire — champs soulignés, sans card */}
          <div className="lg:col-span-7">
            <RevealOnScroll delay={0.15}>
              <form onSubmit={handleSubmit} className="lg:border-l lg:border-border lg:pl-14">
                <div className="grid grid-cols-1 gap-8 sm:grid-cols-2">
                  <div>
                    <label htmlFor="name" className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                      Nom
                    </label>
                    <input
                      type="text"
                      id="name"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom"
                      className={inputClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="email" className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                      Email
                    </label>
                    <input
                      type="email"
                      id="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com"
                      className={inputClass}
                    />
                  </div>
                </div>

                <div className="mt-8">
                  <label htmlFor="subject" className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                    Sujet <span className="normal-case tracking-normal opacity-60">(optionnel)</span>
                  </label>
                  <input
                    type="text"
                    id="subject"
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Le sujet de votre message"
                    className={inputClass}
                  />
                </div>

                <div className="mt-8">
                  <label htmlFor="message" className="font-mono text-[11px] tracking-[0.18em] uppercase text-muted-foreground">
                    Message
                  </label>
                  <textarea
                    id="message"
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Parlez-nous de votre projet…"
                    rows={5}
                    className={`${inputClass} min-h-[120px] resize-y leading-relaxed`}
                  />
                </div>

                <div className="mt-10 flex flex-col gap-4 sm:flex-row sm:items-center">
                  <button
                    type="submit"
                    className="group inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
                  >
                    Envoyer le message
                    <ArrowRight size={16} className="transition-transform duration-300 group-hover:translate-x-1" />
                  </button>
                  <a
                    href={CONTACT_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center justify-center gap-2 text-sm font-semibold text-foreground"
                  >
                    <span className="border-b border-brand pb-0.5">ou passer par WhatsApp</span>
                    <ArrowUpRight size={16} className="text-brand" />
                  </a>
                </div>
              </form>
            </RevealOnScroll>
          </div>

        </div>
      </div>
    </section>
  );
}
