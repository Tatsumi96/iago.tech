"use client";

import { useTranslations } from 'next-intl';
import { CONTACT_EMAIL, CONTACT_PHONE, COMPANY_ADDRESS, COMPANY_NAME } from '@/lib/constants';

export default function Footer() {
  const t = useTranslations('Navigation');
  
  return (
    <footer className="border-t py-12 bg-muted/30">
      <div className="container px-4 md:px-8 mx-auto grid grid-cols-1 md:grid-cols-4 gap-8">
        <div className="col-span-1 md:col-span-2">
          <h3 className="text-xl font-heading font-bold mb-4">{COMPANY_NAME}</h3>
          <p className="text-muted-foreground max-w-sm">
            {COMPANY_ADDRESS}
          </p>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Liens</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href="#services" className="hover:text-primary transition-colors">{t('services')}</a></li>
            <li><a href="#about" className="hover:text-primary transition-colors">{t('about')}</a></li>
            <li><a href="#process" className="hover:text-primary transition-colors">{t('process')}</a></li>
          </ul>
        </div>
        <div>
          <h4 className="font-semibold mb-4">Contact</h4>
          <ul className="space-y-2 text-sm text-muted-foreground">
            <li><a href={`mailto:${CONTACT_EMAIL}`} className="hover:text-primary transition-colors">{CONTACT_EMAIL}</a></li>
            <li><a href={`tel:${CONTACT_PHONE}`} className="hover:text-primary transition-colors">{CONTACT_PHONE}</a></li>
          </ul>
        </div>
      </div>
      <div className="container px-4 md:px-8 mx-auto mt-12 pt-8 border-t text-center text-sm text-muted-foreground">
        <p>© {new Date().getFullYear()} {COMPANY_NAME}. Tous droits réservés.</p>
      </div>
    </footer>
  );
}
