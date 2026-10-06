import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { Card, CardContent } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import Image from 'next/image';

export default function ProcessSection() {
  const t = useTranslations('Process');

  const steps = [
    { num: '01', title: t('step1'), desc: t('step1Desc') },
    { num: '02', title: t('step2'), desc: t('step2Desc') },
    { num: '03', title: t('step3'), desc: t('step3Desc') },
    { num: '04', title: t('step4'), desc: t('step4Desc') },
  ];

  return (
    <section id="process" className="py-24 relative overflow-hidden">
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[url('/images/services-pattern.png')] bg-cover opacity-[0.03] dark:opacity-10 pointer-events-none -z-10" />
      
      <div className="container px-4 md:px-8 mx-auto">
        <RevealOnScroll>
          <div className="max-w-3xl mb-16">
            <h2 className="text-3xl md:text-[44px] font-heading font-extrabold mb-6 leading-tight">
              {t('title')}
            </h2>
          </div>
        </RevealOnScroll>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {steps.map((step, index) => (
            <RevealOnScroll key={step.num} delay={0.1 * index}>
              <Card className="h-full bg-card rounded-[10px] border-border/50 relative overflow-hidden group">
                <div className="absolute top-0 right-0 w-24 h-24 bg-primary/5 rounded-bl-full -mr-4 -mt-4 transition-transform group-hover:scale-110 duration-500" />
                <CardContent className="pt-8 relative z-10">
                  <Badge variant="secondary" className="mb-6 text-lg font-heading font-bold text-primary bg-primary/10 hover:bg-primary/20">
                    {step.num}
                  </Badge>
                  <h3 className="text-xl font-heading font-bold mb-3">{step.title}</h3>
                  <p className="text-muted-foreground text-base leading-[1.6]">
                    {step.desc}
                  </p>
                </CardContent>
              </Card>
            </RevealOnScroll>
          ))}
        </div>
      </div>
    </section>
  );
}
