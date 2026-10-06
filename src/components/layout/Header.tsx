"use client";

import Link from 'next/link';
import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { ModeToggle } from './ModeToggle';
import { useTheme } from 'next-themes';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { Button } from '../ui/button';

export default function Header() {
  const t = useTranslations('Navigation');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'dark' 
    ? '/logos/iago-tech-logo-sombre.svg' 
    : '/logos/iago-tech-logo-clair.svg';

  return (
    <header className="sticky top-0 z-50 w-full border-b border-border/40 bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/60">
      <div className="container flex h-16 max-w-screen-2xl items-center px-4 md:px-8 mx-auto justify-between">
        <Link href="/" className="flex items-center gap-2">
          {mounted ? (
            <Image src={logoSrc} alt="i'ago Tech Logo" width={120} height={40} className="w-[120px] h-auto" />
          ) : (
            <div className="w-[120px] h-[40px] bg-muted/50 rounded animate-pulse" />
          )}
        </Link>

        <nav className="hidden md:flex items-center gap-6 text-sm font-medium">
          <Link href="#services" className="transition-colors hover:text-primary">
            {t('services')}
          </Link>
          <Link href="#about" className="transition-colors hover:text-primary">
            {t('about')}
          </Link>
          <Link href="#process" className="transition-colors hover:text-primary">
            {t('process')}
          </Link>
        </nav>

        <div className="flex items-center gap-2">
          <ModeToggle />
          <LanguageSwitcher />
          <Button asChild className="hidden sm:flex rounded-full">
            <Link href="#contact">{t('contact')}</Link>
          </Button>
        </div>
      </div>
    </header>
  );
}
