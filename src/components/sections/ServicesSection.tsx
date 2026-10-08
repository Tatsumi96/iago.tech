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
    <section className="relative overflow-hidden py-24 md:py-32" id="services">
      {/* Identité blueprint : trame de points charte, estompée */}
      <div aria-hidden className="bg-dots absolute inset-0 [mask-image:linear-gradient(to_bottom,black_20%,transparent_90%)] dark:opacity-70" />
      <span aria-hidden className="ghost-num font-heading pointer-events-none absolute -top-4 right-2 text-[7rem] leading-none font-extrabold select-none md:right-8 md:text-[11rem]">
        01
      </span>
      <div className="relative container mx-auto px-4 md:px-8">
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
