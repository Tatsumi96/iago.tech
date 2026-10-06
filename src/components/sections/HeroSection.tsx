import { useTranslations } from 'next-intl';
import { Button } from '@/components/ui/button';
import { ArrowRight } from 'lucide-react';
import Image from 'next/image';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import Link from 'next/link';

export default function HeroSection() {
  const t = useTranslations('Hero');

  return (
    <section className="relative pt-24 pb-16 md:pt-32 md:pb-24 overflow-hidden" id="home">
      {/* Brand Motif: One blue circle per page, never cut */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[600px] h-[600px] bg-primary rounded-full opacity-5 pointer-events-none -z-10" />
      
      <div className="container px-4 md:px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-8 items-center">
        <div className="max-w-2xl">
          <RevealOnScroll delay={0.1}>
            <h1 className="text-4xl sm:text-5xl lg:text-[64px] leading-tight font-heading font-extrabold mb-6 text-foreground">
              {t('title')}
            </h1>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <p className="text-lg md:text-[20px] text-muted-foreground mb-8 leading-[1.6]">
              {t('subtitle')}
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.3} className="flex flex-wrap gap-4">
            <Button size="lg" className="rounded-full font-medium" asChild>
              <Link href="#contact">
                {t('cta')}
                <ArrowRight className="ml-2 h-4 w-4" />
              </Link>
            </Button>
            <Button size="lg" variant="outline" className="rounded-full font-medium" asChild>
              <Link href="#services">{t('secondaryCta')}</Link>
            </Button>
          </RevealOnScroll>
        </div>

        <RevealOnScroll delay={0.4} direction="left" className="relative h-[400px] lg:h-[600px] w-full rounded-[10px] overflow-hidden">
          <Image 
            src="/images/hero-workspace.png" 
            alt="i'ago Tech Workspace" 
            fill
            className="object-cover"
            priority
          />
        </RevealOnScroll>
      </div>
    </section>
  );
}
