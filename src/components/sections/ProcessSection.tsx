"use client";

import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { Lightbulb, Palette, Code2, Rocket } from 'lucide-react';
import FigureImage from '../ui/figure-image';

export default function ProcessSection() {
  const t = useTranslations('Process');

  const steps = [
    { key: 'step1', num: '01', icon: Lightbulb },
    { key: 'step2', num: '02', icon: Palette },
    { key: 'step3', num: '03', icon: Code2 },
    { key: 'step4', num: '04', icon: Rocket },
  ];

  return (
    <section className="py-24 bg-muted/30" id="process">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <RevealOnScroll direction="right" className="relative w-full order-2 lg:order-1">
            <FigureImage
              src="/images/process-team.jpg"
              alt="Atelier de cadrage — méthode i'ago Tech"
              index="04"
              caption="Impact"
            />
          </RevealOnScroll>

          <div className="order-1 lg:order-2">
            <RevealOnScroll className="mb-12">
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                {t('title')}
              </h2>
            </RevealOnScroll>

            <div className="flex flex-col gap-8">
              {steps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <RevealOnScroll key={step.key} delay={index * 0.1}>
                    <div className="flex items-start gap-6 p-6 rounded-2xl bg-background border border-border transition-colors hover:border-primary/50">
                      <div className="flex-shrink-0 w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center text-primary font-bold">
                        {step.num}
                      </div>
                      <div>
                        <h3 className="text-xl font-bold mb-2 flex items-center gap-2">
                          <Icon size={18} className="text-muted-foreground" />
                          {t(step.key)}
                        </h3>
                        <p className="text-muted-foreground leading-relaxed">
                          {t(step.key + 'Desc')}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>

        </div>
      </div>
    </section>
  );
}
