"use client";

import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';

/**
 * Bandeau "Ils nous font confiance" — version temporaire.
 * Logos fictifs en texte simple, faciles à remplacer par les vrais
 * <Image> quand le client les enverra.
 * TODO: remplacer PLACEHOLDERS par les vrais logos (next/image).
 */
const PLACEHOLDERS = [
  { name: 'NOVATECH', style: 'font-extrabold tracking-tight' },
  { name: 'Mada Digital', style: 'font-heading font-bold italic' },
  { name: 'TSARA&Co', style: 'font-mono font-medium tracking-[0.18em]' },
  { name: 'Zara Agency', style: 'font-semibold tracking-tight' },
  { name: 'KOBA+', style: 'font-heading font-extrabold tracking-[0.12em]' },
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
            {PLACEHOLDERS.map((logo) => (
              <li
                key={logo.name}
                aria-label={`Logo ${logo.name} (temporaire)`}
                title="Logo temporaire — en attente des vrais visuels"
                className={`text-lg text-foreground/35 transition-opacity duration-300 hover:opacity-100 hover:text-foreground/70 md:text-xl dark:text-white/30 dark:hover:text-white/70 ${logo.style}`}
              >
                {logo.name}
              </li>
            ))}
          </ul>
        </RevealOnScroll>
      </div>
    </section>
  );
}
