import Image from 'next/image';
import { cn } from '@/lib/utils';

type FigureImageProps = {
  src: string;
  alt: string;
  /** Numéro de planche, ex. "01" */
  index: string;
  /** Légende courte, ex. "Atelier de cadrage" */
  caption: string;
  /** Hauteur / ratio du cadre */
  className?: string;
  priority?: boolean;
};

/**
 * Cadre photo uniforme façon portfolio :
 * même grain (désaturation légère + voile bleu charte),
 * même bordure, légende numérotée sobre.
 */
export default function FigureImage({ src, alt, index, caption, className, priority = false }: FigureImageProps) {
  return (
    <figure className="w-full">
      <div className={cn('group relative w-full overflow-hidden rounded-2xl border border-border', className ?? 'aspect-[4/3]')}>
        <Image
          src={src}
          alt={alt}
          fill
          className="object-cover saturate-[.85] contrast-[1.02] transition-transform duration-700 ease-out group-hover:scale-[1.02]"
          priority={priority}
          sizes="(max-width: 1024px) 100vw, 50vw"
        />
        {/* Voile charte : unifie les tons des différentes photos */}
        <div aria-hidden className="pointer-events-none absolute inset-0 bg-[#5170FF]/[0.07] mix-blend-multiply dark:mix-blend-normal dark:bg-[#5170FF]/[0.05]" />
      </div>
      <figcaption className="mt-3 flex items-baseline justify-between gap-4">
        <span className="flex items-center gap-2 font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          <span aria-hidden className="inline-block h-1.5 w-1.5 bg-[#5170FF]" />
          Fig. {index}
        </span>
        <span className="text-right font-mono text-[11px] uppercase tracking-[0.2em] text-muted-foreground">
          {caption}
        </span>
      </figcaption>
    </figure>
  );
}
