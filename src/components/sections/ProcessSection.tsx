"use client";

import Image from 'next/image';
import { useTranslations } from 'next-intl';
import { RevealOnScroll } from '../animations/RevealOnScroll';
import { Lightbulb, Palette, Code2, Rocket } from 'lucide-react';

export default function ProcessSection() {
  const t = useTranslations('Process');

  const steps = [
    { key: 'step1', num: '01', icon: Lightbulb },
    { key: 'step2', num: '02', icon: Palette },
    { key: 'step3', num: '03', icon: Code2 },
    { key: 'step4', num: '04', icon: Rocket },
  ];

  return (
    <section className="relative overflow-hidden py-24 md:py-32" id="process">
      {/* Fond atelier : trame diagonale estompée + numéro fantôme */}
      <div aria-hidden className="bg-hatch absolute inset-0 opacity-70 [mask-image:linear-gradient(to_bottom,transparent,black_20%,black_80%,transparent)]" />
      <span aria-hidden className="ghost-num font-heading pointer-events-none absolute -top-4 right-2 text-[7rem] leading-none font-extrabold select-none md:right-8 md:text-[11rem]">
        03
      </span>
      <div className="relative container mx-auto px-4 md:px-8">
        <div className="grid grid-cols-1 gap-12 lg:grid-cols-12 lg:gap-16">

          {/* Identité atelier : visuel sombre fixe pendant le déroulé */}
          <div className="lg:col-span-5">
            <div className="lg:sticky lg:top-28">
              <RevealOnScroll direction="right">
                <h2 className="text-3xl md:text-5xl font-bold tracking-tight mb-6">
                  {t('title')}
                </h2>
              </RevealOnScroll>
              <RevealOnScroll delay={0.1}>
                <figure className="mt-8 w-full">
                  <div className="group relative h-[280px] w-full overflow-hidden rounded-[10px] border border-border lg:h-[380px]">
                    <Image
                      src="/images/process-team.jpg"
                      alt="Atelier de cadrage — méthode i'ago Tech"
                      fill
                      className="object-cover grayscale brightness-[.82] contrast-[1.05] transition-transform duration-700 ease-out group-hover:scale-[1.03]"
                      sizes="(max-width: 1024px) 100vw, 40vw"
                    />
                    <div aria-hidden className="pointer-events-none absolute inset-0 bg-encre/45" />
                    <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-encre/70 via-transparent to-transparent" />
                    <figcaption className="absolute inset-x-0 bottom-0 flex items-center justify-between px-5 py-4 font-mono text-[11px] uppercase tracking-[0.2em] text-white/85">
                      <span className="flex items-center gap-2">
                        <span aria-hidden className="inline-block h-1.5 w-1.5 bg-brand" />
                        Fig. 04
                      </span>
                      <span>Impact</span>
                    </figcaption>
                  </div>
                </figure>
              </RevealOnScroll>
            </div>
          </div>

          <ol className="lg:col-span-7 lg:pt-24">
            {steps.map((step, index) => {
              const Icon = step.icon;
              return (
                <li key={step.key} className="border-t border-border last:border-b">
                  <RevealOnScroll delay={index * 0.06}>
                    <div className="flex items-start gap-5 py-8 md:gap-7">
                      <span className="font-mono text-xs tracking-[0.2em] text-brand tabular-nums">
                        {step.num}
                      </span>
                      <span className="flex h-12 w-12 shrink-0 items-center justify-center rounded-[10px] border border-border text-muted-foreground">
                        <Icon size={22} strokeWidth={1.75} />
                      </span>
                      <div>
                        <h3 className="text-xl font-bold tracking-tight md:text-2xl">
                          {t(step.key)}
                        </h3>
                        <p className="mt-2 leading-relaxed text-muted-foreground">
                          {t(step.key + 'Desc')}
                        </p>
                      </div>
                    </div>
                  </RevealOnScroll>
                </li>
              );
            })}
          </ol>

        </div>
      </div>
    </section>
  );
}
