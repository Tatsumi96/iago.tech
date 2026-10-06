"use client";

import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import FigureImage from '../ui/figure-image';

export default function AboutSection() {
  const t = useTranslations('About');

  return (
    <section className="py-24" id="about">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <RevealOnScroll direction="right">
            <FigureImage
              src="/images/team.jpg"
              alt="L'équipe i'ago Tech en session de développement"
              index="03"
                caption="Solidarité"
            />
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
                <blockquote className="border-l-4 border-primary pl-6 py-2 mt-8 text-xl font-medium italic text-foreground">
                  {t('desc2')}
                </blockquote>
              </div>
            </RevealOnScroll>
          </div>
          
        </div>
      </div>
    </section>
  );
}
