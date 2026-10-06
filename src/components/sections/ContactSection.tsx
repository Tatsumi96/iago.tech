"use client";

import { useState } from 'react';
import { useTranslations } from 'next-intl';
import Image from 'next/image';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { Mail, Phone, MapPin, ArrowRight } from 'lucide-react';
import { FacebookIcon, MessengerIcon, WhatsAppIcon } from '@/components/icons/brand-icons';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_FACEBOOK, CONTACT_MESSENGER, CONTACT_WHATSAPP, COMPANY_ADDRESS } from '@/lib/constants';

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

  const whatsappPrefill = `https://wa.me/261328645674?text=${encodeURIComponent('Bonjour i\'ago Tech, je souhaite discuter de mon projet.')}`;

  return (
    <section className="relative py-24 overflow-hidden" id="contact">
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/process-team.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.10] dark:opacity-[0.07]"
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background via-background/85 to-background" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16">
          
          <div>
            <RevealOnScroll>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                {t('title')}
              </h2>
              <p className="text-lg text-muted-foreground mb-12 max-w-md">
                {t('subtitle')}
              </p>
            </RevealOnScroll>

            <div className="flex flex-col gap-8">
              <RevealOnScroll delay={0.1}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-lg text-foreground">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Téléphone / WhatsApp</h3>
                    <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`} className="text-muted-foreground hover:text-foreground transition-colors block">
                      {CONTACT_PHONE}
                    </a>
                    <a
                      href={whatsappPrefill}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-[#25D366] hover:underline"
                    >
                      <WhatsAppIcon size={16} />
                      Discuter sur WhatsApp
                    </a>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.2}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-lg text-foreground">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Email</h3>
                    <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-foreground transition-colors break-all">
                      {CONTACT_EMAIL}
                    </a>
                    <a
                      href={`mailto:${CONTACT_EMAIL}`}
                      className="inline-flex items-center gap-2 mt-2 text-sm font-medium text-foreground hover:underline"
                    >
                      <Mail size={16} />
                      Envoyer un email
                    </a>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.25}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-lg text-[#1877F2]">
                    <FacebookIcon size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Facebook</h3>
                    <div className="flex flex-wrap items-center gap-4 mt-1">
                      <a
                        href={CONTACT_FACEBOOK}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#1877F2] transition-colors"
                      >
                        <FacebookIcon size={16} />
                        Voir la page Facebook
                      </a>
                      <a
                        href={CONTACT_MESSENGER}
                        target="_blank"
                        rel="noopener noreferrer"
                        className="inline-flex items-center gap-2 text-sm font-medium text-muted-foreground hover:text-[#0099FF] transition-colors"
                      >
                        <MessengerIcon size={16} />
                        Messenger
                      </a>
                    </div>
                  </div>
                </div>
              </RevealOnScroll>

              <RevealOnScroll delay={0.3}>
                <div className="flex items-start gap-4">
                  <div className="p-3 bg-muted rounded-lg text-foreground">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-semibold mb-1">Adresse</h3>
                    <p className="text-muted-foreground">{COMPANY_ADDRESS}</p>
                  </div>
                </div>
              </RevealOnScroll>
            </div>
          </div>

          <RevealOnScroll delay={0.2} direction="left">
            <div className="bg-card border border-border rounded-2xl p-8 shadow-sm">
              <form onSubmit={handleSubmit} className="flex flex-col gap-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="flex flex-col gap-2">
                    <label htmlFor="name" className="text-sm font-medium">Nom</label>
                    <input 
                      type="text" 
                      id="name" 
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      placeholder="Votre nom" 
                      className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                  <div className="flex flex-col gap-2">
                    <label htmlFor="email" className="text-sm font-medium">Email</label>
                    <input 
                      type="email" 
                      id="email" 
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="votre@email.com" 
                      className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                    />
                  </div>
                </div>
                
                <div className="flex flex-col gap-2">
                  <label htmlFor="subject" className="text-sm font-medium">Sujet</label>
                  <input 
                    type="text" 
                    id="subject" 
                    value={subject}
                    onChange={(e) => setSubject(e.target.value)}
                    placeholder="Le sujet de votre message" 
                    className="flex h-12 w-full rounded-md border border-input bg-transparent px-3 py-1 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
                  />
                </div>

                <div className="flex flex-col gap-2">
                  <label htmlFor="message" className="text-sm font-medium">Message</label>
                  <textarea 
                    id="message" 
                    required
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Comment pouvons-nous vous aider ?" 
                    rows={5}
                    className="flex min-h-[120px] w-full rounded-md border border-input bg-transparent px-3 py-3 text-sm shadow-sm transition-colors focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring resize-y"
                  ></textarea>
                </div>

                <div className="flex flex-col sm:flex-row gap-3 mt-2">
                  <button 
                    type="submit"
                    className="inline-flex flex-1 items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 rounded-md"
                  >
                    Envoyer par email
                    <ArrowRight size={16} />
                  </button>
                  <a
                    href={CONTACT_WHATSAPP}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex flex-1 items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-colors bg-[#25D366] text-white hover:bg-[#25D366]/90 rounded-md"
                  >
                    <WhatsAppIcon size={16} />
                    WhatsApp
                  </a>
                </div>
              </form>
            </div>
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}
