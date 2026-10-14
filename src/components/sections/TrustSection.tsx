"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';

/**
 * Bandeau "Ils nous font confiance".
 * - Logos image : fichiers dans `public/logos/` (ASJA ✔, Ariel ⏳ en attente
 *   du fichier client — ajouter `logo: '/logos/ariel-hebergement.webp'`
 *   + `href: 'https://ariel-hebergement.com'` à l'entrée ci-dessous).
 * - Agence Feu Follet : volontairement en texte stylé (choix design).
 */
const CLIENTS = [
  {
    name: 'Université ASJA',
    logo: '/logos/asja-university.webp',
    href: 'https://asjaweb.com',
  },
  { name: 'Ariel Hébergement', style: 'font-extrabold tracking-tight' },
  { name: 'Agence Feu Follet', style: 'font-heading font-extrabold italic' },
];

export default function TrustSection() {
  const t = useTranslations('Trust');

  return (
    <section aria-label={t('title')} className="relative py-10 md:py-14">
      <div className="container mx-auto px-4 md:px-8">
        <RevealOnScroll>
          <p className="text-center font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase">
            {t('title')}
          </p>
        </RevealOnScroll>
        <RevealOnScroll delay={0.1}>
          <ul className="mt-8 flex flex-wrap items-center justify-center gap-x-12 gap-y-6">
            {CLIENTS.map((logo) => (
              <li
                key={logo.name}
                aria-label={`Client : ${logo.name}`}
                title={logo.name}
                className="flex items-center"
              >
                {'logo' in logo && logo.logo ? (
                  <a
                    href={logo.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={`${logo.name} — visiter le site`}
                    className="opacity-70 transition-opacity duration-300 hover:opacity-100"
                  >
                    <Image
                      src={logo.logo}
                      alt={`Logo ${logo.name}`}
                      width={56}
                      height={56}
                      className="h-12 w-auto object-contain md:h-14"
                    />
                  </a>
                ) : (
                  <span
                    className={`text-lg text-foreground/35 transition-opacity duration-300 hover:opacity-100 hover:text-foreground/70 md:text-xl dark:text-white/30 dark:hover:text-white/70 ${'style' in logo ? logo.style : ''}`}
                  >
                    {logo.name}
                  </span>
                )}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
