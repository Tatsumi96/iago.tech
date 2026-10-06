"use client";

import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { Search, MonitorSmartphone, Code2 } from 'lucide-react';
import FigureImage from '../ui/figure-image';

export default function ServicesSection() {
  const t = useTranslations('Services');

  const services = [
    {
      id: 'seo',
      icon: Search,
      title: t('seo'),
      desc: t('seoDesc'),
    },
    {
      id: 'refonte',
      icon: MonitorSmartphone,
      title: t('refonte'),
      desc: t('refonteDesc'),
    },
    {
      id: 'dev',
      icon: Code2,
      title: t('dev'),
      desc: t('devDesc'),
    }
  ];

  return (
    <section className="py-24 bg-muted/30" id="services">
      <div className="container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
          
          <div>
            <RevealOnScroll>
              <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-12">
                {t('title')}
              </h2>
            </RevealOnScroll>

            <div className="flex flex-col gap-10">
              {services.map((service, index) => {
                const Icon = service.icon;
                return (
                  <RevealOnScroll 
                    key={service.id} 
                    delay={index * 0.1}
                    className="flex gap-6"
                  >
                    <div className="flex-shrink-0 w-14 h-14 rounded-xl bg-background border border-border flex items-center justify-center text-primary shadow-sm">
                      <Icon size={24} />
                    </div>
                    <div>
                      <h3 className="text-xl font-bold mb-2">
                        {service.title}
                      </h3>
                      <p className="text-muted-foreground leading-relaxed">
                        {service.desc}
                      </p>
                    </div>
                  </RevealOnScroll>
                );
              })}
            </div>
          </div>

          <RevealOnScroll direction="left" delay={0.2} className="relative w-full">
            <FigureImage
              src="/images/services-analytics.jpg"
              alt="Tableau de bord analytics — suivi SEO"
              index="02"
              caption="Innovation"
              className="h-[320px] lg:h-[520px]"
            />
          </RevealOnScroll>

        </div>
      </div>
    </section>
  );
}
