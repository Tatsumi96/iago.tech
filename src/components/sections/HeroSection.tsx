'use client';

import { useTranslations } from 'next-intl';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import FigureImage from '../ui/figure-image';

export default function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section className="relative min-h-[calc(100vh-4rem)] flex items-center py-8 lg:py-12 overflow-hidden" id="home">
      <div aria-hidden className="absolute inset-0">
        <Image
          src="/images/team.jpg"
          alt=""
          fill
          className="object-cover opacity-[0.12] dark:opacity-[0.08]"
          priority
          sizes="100vw"
        />
        <div className="absolute inset-0 bg-gradient-to-b from-background/60 via-background/80 to-background" />
      </div>
      <div className="relative z-10 container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
          
          <div className="max-w-2xl order-2 lg:order-1">
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

          <div className="relative order-1 lg:order-2 w-full">
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
