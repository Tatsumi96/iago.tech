import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import Image from 'next/image';

export default function AboutSection() {
  const t = useTranslations('About');

  return (
    <section id="about" className="py-24">
      <div className="container px-4 md:px-8 mx-auto grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
        <RevealOnScroll direction="right" className="relative h-[500px] w-full rounded-[10px] overflow-hidden order-2 lg:order-1">
          <Image 
            src="/images/team-collaboration.png" 
            alt="Team Collaboration" 
            fill
            className="object-cover"
          />
        </RevealOnScroll>

        <div className="order-1 lg:order-2">
          <RevealOnScroll>
            <h2 className="text-3xl md:text-[44px] font-heading font-extrabold mb-8 leading-tight">
              {t('title')}
            </h2>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.1}>
            <p className="text-lg text-muted-foreground mb-6 leading-[1.6]">
              {t('desc1')}
            </p>
          </RevealOnScroll>
          
          <RevealOnScroll delay={0.2}>
            <div className="p-6 rounded-[10px] bg-primary/5 border-l-4 border-primary">
              <p className="text-lg font-medium text-foreground italic leading-[1.6]">
                "{t('desc2')}"
              </p>
            </div>
          </RevealOnScroll>
        </div>
      </div>
    </section>
  );
}
