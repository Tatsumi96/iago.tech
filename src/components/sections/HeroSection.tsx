'use client';

import { useEffect, useState } from 'react';
import { useTranslations } from 'next-intl';
import { AnimatePresence, motion, useReducedMotion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { cn } from '@/lib/utils';

const VALUES = ['Intégrité', 'Innovation', 'Solidarité', 'Impact'];

const VIDEO_SRC = 'https://assets.mixkit.co/videos/41640/41640-720.mp4';
const VIDEO_POSTER = '/images/hero-dev.jpg';

const EASE = [0.22, 1, 0.36, 1] as const;

/**
 * Cadrage irrégulier : la vidéo en grand, cernée par un cadre bleu
 * décalé en haut à gauche et un cadre pointillé en bas à droite.
 * Panoramique + crossfade à l’intérieur, transform/opacity uniquement.
 */
function SideStripes({ reduce }: { reduce: boolean }) {
  const [videoOk, setVideoOk] = useState(true);

  return (
    <div>
      <div className="relative">
        {/* Cadre bleu — dépasse en haut-gauche, biais irrégulier */}
        <motion.div
          initial={{ opacity: 0, x: -24, y: -24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.55, ease: EASE }}
          aria-hidden
          className="absolute -top-2 right-10 bottom-10 -left-4 bg-brand [clip-path:polygon(0_0,100%_0,96%_100%,0_100%)]"
        />
        {/* Cadre pointillé — dépasse en bas-droite, biais inversé */}
        <motion.div
          initial={{ opacity: 0, x: 24, y: 24 }}
          animate={{ opacity: 1, x: 0, y: 0 }}
          transition={{ duration: 0.9, delay: 0.7, ease: EASE }}
          aria-hidden
          className="bg-dots absolute top-10 -right-4 -bottom-4 left-10 border border-border bg-brume/70 [clip-path:polygon(4%_0,100%_0,100%_100%,0_100%)] dark:bg-white/[0.04]"
        />
        {/* Vidéo principale — grand format au premier plan */}
        <motion.div
          initial={{ opacity: 0, y: 32 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.9, delay: 0.4, ease: EASE }}
          className="relative h-72 overflow-hidden [clip-path:polygon(4%_0,100%_0,96%_100%,0_100%)] sm:h-[400px] lg:h-[440px]"
        >
          {/* Vraie vidéo sans son — image locale en repli */}
          {reduce || !videoOk ? (
            <img
              src={VIDEO_POSTER}
              alt="Développeur i’ago Tech — code d’une solution digitale"
              className="absolute inset-0 h-full w-full object-cover"
            />
          ) : (
            <video
              className="absolute inset-0 h-full w-full object-cover"
              src={VIDEO_SRC}
              poster={VIDEO_POSTER}
              autoPlay
              muted
              loop
              playsInline
              preload="metadata"
              onError={() => setVideoOk(false)}
            />
          )}
          <div aria-hidden className="pointer-events-none absolute inset-0 bg-brand/[0.08] mix-blend-multiply dark:bg-brand/[0.06] dark:mix-blend-normal" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-encre/45 via-transparent to-transparent" />
        </motion.div>
      </div>
    </div>
  );
}

export default function HeroSection() {
  const t = useTranslations('Hero');
  const reduceMotion = useReducedMotion();
  const [active, setActive] = useState(0);

  // Surlignage tournant des valeurs — opacity uniquement, 60fps.
  useEffect(() => {
    if (reduceMotion) return;
    const id = window.setInterval(() => {
      setActive((i) => (i + 1) % VALUES.length);
    }, 3500);
    return () => window.clearInterval(id);
  }, [reduceMotion]);

  return (
    <section className="relative flex min-h-svh flex-col overflow-hidden" id="home">
      {/* Fond tech : gros plan code en light comme en dark, voile clair pour lisibilité */}
      <div aria-hidden className="absolute inset-0">
        <motion.img
          src="/images/hero-background.jpg"
          alt=""
          className="h-full w-full object-cover opacity-30 dark:hidden"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 8, ease: 'linear' }}
        />
        <motion.img
          src="/images/hero-background-dark.jpg"
          alt=""
          className="hidden h-full w-full object-cover opacity-40 dark:block"
          initial={{ scale: 1.05 }}
          animate={{ scale: 1 }}
          transition={{ duration: reduceMotion ? 0 : 8, ease: 'linear' }}
        />
        {/* Trame tech par-dessus la photo */}
        <div className="absolute inset-0 bg-brand/[0.08] dark:bg-brand/[0.18]" />
        <div className="absolute inset-0 bg-gradient-to-b from-background/80 via-background/70 to-background dark:from-background/92 dark:via-background/70 dark:to-background" />
      </div>

      {/* Contenu */}
      <div className="relative z-10 container mx-auto flex w-full flex-1 flex-col justify-center px-4 pt-28 md:px-8">
        <div className="grid items-center gap-10 lg:grid-cols-12 lg:gap-8">
          <div className="lg:col-span-7">
            <span className="block overflow-hidden">
              <motion.h1
                initial={{ y: '104%' }}
                animate={{ y: '0%' }}
                transition={{ duration: 0.9, delay: 0.15, ease: EASE }}
                className="text-balance text-5xl leading-[1.02] font-extrabold tracking-tight text-encre sm:text-6xl xl:text-7xl dark:text-white"
              >
                {t('title')}
              </motion.h1>
            </span>

            <motion.p
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.5, ease: EASE }}
              className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground md:text-xl dark:text-white/90"
            >
              {t('subtitle')}
            </motion.p>

            <motion.div
              initial={{ opacity: 0, y: 18 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.7, delay: 0.62, ease: EASE }}
              className="mt-10 flex flex-col items-stretch gap-3 sm:flex-row sm:items-center"
            >
              <a
                href="#contact"
                className="group inline-flex items-center justify-center gap-2 rounded-[10px] bg-brand px-8 py-4 text-sm font-semibold text-white transition-colors hover:bg-brand/90"
              >
                {t('cta')}
                <ArrowRight className="h-4 w-4 transition-transform duration-300 ease-out group-hover:translate-x-1" />
              </a>
              <a
                href="#services"
                className="inline-flex items-center justify-center rounded-[10px] border border-encre/20 bg-white/60 px-8 py-4 text-sm font-semibold text-encre transition-colors hover:border-encre/50 dark:border-white/30 dark:bg-transparent dark:text-white dark:hover:border-white/60 dark:hover:bg-white/10"
              >
                {t('secondaryCta')}
              </a>
            </motion.div>
          </div>

          <div className="lg:col-span-5">
            <SideStripes reduce={!!reduceMotion} />
          </div>
        </div>

        {/* Bandeau bas : les valeurs de l’entreprise */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.8, delay: 0.9 }}
          className="mt-10 flex shrink-0 items-end justify-between gap-8 border-t border-encre/15 pt-5 pb-10 dark:border-white/20"
        >
          <ol className="flex flex-wrap items-center gap-x-8 gap-y-3">
            {VALUES.map((value, i) => (
              <motion.li
                key={value}
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: 0.95 + i * 0.08, ease: EASE }}
                className={cn(
                  'flex items-baseline gap-2.5 transition-opacity duration-500',
                  i === active ? 'opacity-100' : 'opacity-40',
                )}
              >
                <span className="font-mono text-[11px] tracking-[0.2em] text-brand tabular-nums">
                  0{i + 1}
                </span>
                <span className="font-mono text-[11px] tracking-[0.24em] text-encre uppercase dark:text-white">
                  {value}
                </span>
              </motion.li>
            ))}
          </ol>

          <a
            href="#services"
            className="group hidden items-center gap-3 sm:inline-flex"
            aria-label="Faire défiler vers les services"
          >
            <span className="font-mono text-[11px] tracking-[0.24em] text-muted-foreground uppercase dark:text-white/60">
              Défiler
            </span>
            <span className="relative block h-10 w-px overflow-hidden bg-encre/15 dark:bg-white/20">
              <motion.span
                aria-hidden
                className="absolute inset-x-0 top-0 h-1/2 bg-encre dark:bg-white"
                animate={reduceMotion ? undefined : { y: ['-100%', '200%'] }}
                transition={{ duration: 2.2, repeat: Infinity, ease: 'easeInOut' }}
              />
            </span>
          </a>
        </motion.div>
      </div>
    </section>
  );
}
