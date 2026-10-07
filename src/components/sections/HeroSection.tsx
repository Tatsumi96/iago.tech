'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { useTheme } from '../layout/ThemeProvider';
import FigureImage from '../ui/figure-image';

export default function HeroSection() {
  const t = useTranslations('Hero');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  // Une seule image affichée (pas de doublon masqué en CSS) : pas d'avertissement
  // `sizes` et un seul fichier téléchargé par thème.
  const bgSrc =
    mounted && resolvedTheme === 'dark'
      ? '/images/hero-background.jpg'
      : '/images/services-analytics.jpg';

  return (
    <section className="relative min-h-screen flex items-center pt-24 md:pt-28 pb-8 lg:pb-12 overflow-hidden" id="home">
      <div aria-hidden className="absolute inset-0">
        <Image
          src={bgSrc}
          alt=""
          fill
          className="object-cover opacity-40"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-brand/[0.10] dark:bg-brand/[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/50 via-background/65 to-background dark:from-background/60 dark:via-background/80" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="max-w-2xl order-1">
            <RevealOnScroll delay={0.1}>
              <h1 className="text-4xl sm:text-5xl lg:text-6xl xl:text-7xl font-bold tracking-tight text-foreground leading-[1.1] mb-6">
                {t('title')}
              </h1>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.2}>
              <p className="text-lg md:text-xl text-muted-foreground mb-10 leading-relaxed max-w-xl">
                {t('subtitle')}
              </p>
            </RevealOnScroll>
            
            <RevealOnScroll delay={0.3}>
              <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4">
                <a 
                  href="#contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 text-sm font-medium transition-colors bg-primary text-primary-foreground hover:bg-primary/90 rounded-md w-full sm:w-auto"
                >
                  {t('cta')}
                  <ArrowRight className="w-4 h-4" />
                </a>
                <a 
                  href="#services"
                  className="inline-flex items-center justify-center px-8 py-4 text-sm font-medium transition-colors border border-input bg-background hover:bg-accent hover:text-accent-foreground rounded-md w-full sm:w-auto"
                >
                  {t('secondaryCta')}
                </a>
              </div>
            </RevealOnScroll>
          </div>

          <div className="relative order-2 w-full">
            <RevealOnScroll delay={0.4} direction="left" className="w-full">
              <FigureImage
                src="/images/hero-dev.jpg"
                alt="Développeur i'ago Tech — code d'une solution digitale"
                index="01"
                caption="Intégrité"
                className="h-[300px] sm:h-[400px] lg:h-[520px]"
                priority
              />
            </RevealOnScroll>
          </div>
          
        </div>
      </div>
    </section>
  );
}
