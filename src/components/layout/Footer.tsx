"use client";

import { useTranslations } from 'next-intl';
import { CONTACT_EMAIL, CONTACT_PHONE, CONTACT_FACEBOOK, CONTACT_MESSENGER, CONTACT_WHATSAPP, COMPANY_ADDRESS, COMPANY_NAME } from '@/lib/constants';
import { Mail } from 'lucide-react';
import { FacebookIcon, MessengerIcon, WhatsAppIcon } from '@/components/icons/brand-icons';

export default function Footer() {
  const t = useTranslations('Navigation');
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-muted border-t border-border pt-16 pb-8">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">
          
          <div className="flex flex-col gap-4">
            <h3 className="text-2xl font-bold font-heading">{COMPANY_NAME}</h3>
            <p className="text-muted-foreground text-sm max-w-xs leading-relaxed">
              Création de solutions digitales sur mesure — modernes, performantes et évolutives pour propulser votre entreprise.
            </p>
            <div className="flex gap-4 mt-2">
              <a
                href={CONTACT_FACEBOOK}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Facebook"
                title="Facebook"
                className="text-muted-foreground hover:text-[#1877F2] transition-colors"
              >
                <FacebookIcon size={20} />
              </a>
              <a
                href={CONTACT_MESSENGER}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="Messenger"
                title="Messenger"
                className="text-muted-foreground hover:text-[#0099FF] transition-colors"
              >
                <MessengerIcon size={20} />
              </a>
              <a
                href={CONTACT_WHATSAPP}
                target="_blank"
                rel="noopener noreferrer"
                aria-label="WhatsApp"
                title="WhatsApp"
                className="text-muted-foreground hover:text-[#25D366] transition-colors"
              >
                <WhatsAppIcon size={20} />
              </a>
              <a
                href={`mailto:${CONTACT_EMAIL}`}
                aria-label="Email"
                title={CONTACT_EMAIL}
                className="text-muted-foreground hover:text-foreground transition-colors"
              >
                <Mail size={20} />
              </a>
            </div>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground mb-2">Navigation</h4>
            <a href="#services" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t('services')}</a>
            <a href="#about" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t('about')}</a>
            <a href="#process" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t('process')}</a>
            <a href="#contact" className="text-muted-foreground hover:text-foreground text-sm transition-colors">{t('contact')}</a>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground mb-2">Services</h4>
            <span className="text-muted-foreground text-sm">Développement Web</span>
            <span className="text-muted-foreground text-sm">Refonte de Site</span>
            <span className="text-muted-foreground text-sm">Optimisation SEO</span>
            <span className="text-muted-foreground text-sm">Maintenance</span>
          </div>

          <div className="flex flex-col gap-4">
            <h4 className="font-semibold text-foreground mb-2">Contact</h4>
            <span className="text-muted-foreground text-sm">{COMPANY_ADDRESS}</span>
            <a href={`mailto:${CONTACT_EMAIL}`} className="text-muted-foreground hover:text-foreground text-sm transition-colors break-all">{CONTACT_EMAIL}</a>
            <div className="flex flex-col gap-1">
              <a href={`tel:${CONTACT_PHONE.replace(/\s+/g, '')}`} className="text-muted-foreground hover:text-foreground text-sm transition-colors">{CONTACT_PHONE}</a>
              <a href={CONTACT_WHATSAPP} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-[#25D366] text-sm transition-colors">
                <WhatsAppIcon size={14} />
                Discuter sur WhatsApp
              </a>
            </div>
            <div className="flex flex-col gap-1">
              <a href={CONTACT_FACEBOOK} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-[#1877F2] text-sm transition-colors">
                <FacebookIcon size={14} />
                Suivez-nous sur Facebook
              </a>
              <a href={CONTACT_MESSENGER} target="_blank" rel="noopener noreferrer" className="inline-flex items-center gap-1.5 text-muted-foreground hover:text-[#0099FF] text-sm transition-colors">
                <MessengerIcon size={14} />
                Écrivez-nous sur Messenger
              </a>
            </div>
          </div>

        </div>

        <div className="pt-8 border-t border-border/60 flex flex-col md:flex-row items-center justify-between gap-4">
          <p className="text-sm text-muted-foreground">
            &copy; {currentYear} {COMPANY_NAME}. Tous droits réservés.
          </p>
          <div className="flex items-center gap-6 text-sm text-muted-foreground">
            <a href="#" className="hover:text-foreground transition-colors">Mentions légales</a>
            <a href="#" className="hover:text-foreground transition-colors">Politique de confidentialité</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
