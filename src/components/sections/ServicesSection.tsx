import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Search, MonitorSmartphone, Code2 } from 'lucide-react';

export default function ServicesSection() {
  const t = useTranslations('Services');

  const services = [
    {
      id: "seo",
      icon: Search,
      title: t('seo'),
      desc: t('seoDesc'),
    },
    {
      id: "refonte",
      icon: MonitorSmartphone,
      title: t('refonte'),
      desc: t('refonteDesc'),
    },
    {
      id: "dev",
      icon: Code2,
      title: t('dev'),
      desc: t('devDesc'),
    }
  ];

  return (
    <section id="services" className="py-24 bg-muted/20">
      <div className="container px-4 md:px-8 mx-auto">
        <RevealOnScroll>
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-[44px] font-heading font-extrabold mb-6 leading-tight">
              {t('title')}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {services.map((service, index) => (
            <RevealOnScroll key={service.id} delay={0.1 * (index + 1)}>
              <Card className="h-full bg-card rounded-[10px] border-border/60 hover:border-primary/50 transition-colors shadow-none hover:shadow-sm">
                <CardHeader>
                  <div className="w-12 h-12 rounded-full bg-primary/10 flex items-center justify-center mb-4 text-primary">
                    <service.icon strokeWidth={2} className="w-6 h-6" />
                  </div>
                  <CardTitle className="font-heading font-bold text-[20px]">{service.title}</CardTitle>
                </CardHeader>
                <CardContent>
                  <CardDescription className="text-base text-muted-foreground leading-[1.6]">
                    {service.desc}
                  </CardDescription>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
