"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { ArrowUpRight } from 'lucide-react';
import { RevealOnScroll } from '../animations/RevealOnScroll';

const VALUES = ['Intégrité', 'Innovation', 'Solidarité', 'Impact'];

export default function AboutSection() {
  const t = useTranslations('About');

  return (
    <section className="relative overflow-hidden border-y border-border bg-brume/60 py-24 md:py-32 dark:bg-muted/20" id="about">
      <span aria-hidden className="ghost-num font-heading pointer-events-none absolute -top-4 right-2 text-[7rem] leading-none font-extrabold select-none md:right-8 md:text-[11rem]">
        02
      </span>
      <div className="relative container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <RevealOnScroll direction="right">
            {/* Identité duotone : photo unifiée au bleu charte */}
            <figure className="w-full">
              <div className="group relative aspect-[4/3] w-full overflow-hidden rounded-[10px] border border-border">
                <Image
                  src="/images/team.jpg"
                  alt="L'équipe i'ago Tech en session de développement"
                  fill
                  className="object-cover grayscale contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                  sizes="(max-width: 1024px) 100vw, 50vw"
                />
                <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand/45 mix-blend-multiply dark:bg-brand/35" />
              </div>
              <figcaption className="mt-3 flex items-baseline justify-between gap-4">
                <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  <span aria-hidden className="inline-block h-1.5 w-1.5 bg-brand" />
                  Fig. 03
                </span>
                <span className="text-right font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
                  Solidarité
                </span>
              </figcaption>
            </figure>
          </RevealOnScroll>

          <div>
            <RevealOnScroll>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                {t('title')}
              </h2>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.1}>
              <div className="prose prose-lg dark:prose-invert">
                <p className="text-lg text-muted-foreground mb-6 leading-relaxed">
                  {t('desc1')}
                </p>
                <span aria-hidden className="font-heading block text-7xl leading-[0.6] text-brand select-none">
                  &ldquo;
                </span>
                <blockquote className="border-l-2 border-brand pl-6 py-1 mt-4 text-2xl font-bold tracking-tight text-foreground">
                  {t('desc2')}
                </blockquote>
              </div>
            </RevealOnScroll>

            <RevealOnScroll delay={0.18}>
              <ul className="mt-10 grid grid-cols-2 gap-px overflow-hidden rounded-[10px] border border-border bg-border sm:grid-cols-4">
                {VALUES.map((value, i) => (
                  <li
                    key={value}
                    className="group bg-background px-5 py-5 transition-colors duration-300 hover:bg-brume dark:hover:bg-white/[0.04]"
                  >
                    <p className="font-mono text-2xl font-bold text-brand tabular-nums">
                      0{i + 1}
                    </p>
                    <p className="mt-1.5 text-sm font-semibold text-foreground">{value}</p>
                  </li>
                ))}
              </ul>
            </RevealOnScroll>

            <RevealOnScroll delay={0.24}>
              <a
                href="#process"
                className="group mt-8 inline-flex items-center gap-2 text-sm font-semibold text-foreground"
              >
                <span className="border-b border-brand pb-0.5">{t('cta')}</span>
                <ArrowUpRight
                  size={16}
                  className="text-brand transition-transform duration-300 group-hover:-translate-y-0.5 group-hover:translate-x-0.5"
                />
              </a>
            </RevealOnScroll>
          </div>
          
        </div>
      </div>
    </section>
  );
}
