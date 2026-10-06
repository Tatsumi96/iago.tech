"use client";

import { useTranslations } from 'next-intl';
import LanguageSwitcher from './LanguageSwitcher';
import { ModeToggle } from './ModeToggle';
import { useTheme } from './ThemeProvider';
import Image from 'next/image';
import { useEffect, useState } from 'react';
import { buttonVariants } from '../ui/button';
import { cn } from '@/lib/utils';
import { Menu, X } from 'lucide-react';
import { Link } from '@/i18n/routing';

export default function Header() {
  const t = useTranslations('Navigation');
  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 16);
    };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const logoSrc = mounted && resolvedTheme === 'dark' 
    ? '/logos/iago-tech-logo-sombre.svg' 
    : '/logos/iago-tech-logo-clair.svg';

  const navLinks = [
    { name: t('services'), href: '#services' },
    { name: t('about'), href: '#about' },
    { name: t('process'), href: '#process' },
  ];

  return (
    <header
      className={cn(
        'sticky top-0 z-50 w-full transition-all duration-300',
        scrolled
          ? 'border-b border-border bg-background/95 backdrop-blur supports-[backdrop-filter]:bg-background/80'
          : 'border-b border-transparent bg-background/60 backdrop-blur-sm supports-[backdrop-filter]:bg-background/40'
      )}
    >
      <div className={cn(
        'container flex items-center px-4 md:px-8 mx-auto justify-between transition-all duration-300',
        scrolled ? 'h-14' : 'h-16 md:h-20'
      )}>
        <Link href="/" className="flex items-center gap-2">
          {mounted ? (
            <Image src={logoSrc} alt="i'ago Tech Logo" width={140} height={40} className={cn('m-2 w-auto object-contain transition-all duration-300', scrolled ? 'h-8' : 'h-12')} priority />
          ) : (
            <div className="w-[100px] h-[32px] bg-muted/50 rounded animate-pulse" />
          )}
        </Link>

        {/* Desktop Nav */}
        <nav className="hidden md:flex items-center gap-8 text-sm font-medium">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              className="transition-colors hover:text-primary text-muted-foreground hover:text-foreground"
            >
              {link.name}
            </a>
          ))}
        </nav>

        <div className="hidden md:flex items-center gap-4">
          <div className="flex items-center gap-1 border-r border-border pr-4">
            <ModeToggle />
            <LanguageSwitcher />
          </div>
          <a 
            href="#contact" 
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }), 
              "rounded-md px-7 h-11 text-base font-semibold"
            )}
          >
            {t('contact')}
          </a>
        </div>

        {/* Mobile Toggle */}
        <div className="flex md:hidden items-center gap-2">
          <ModeToggle />
          <LanguageSwitcher />
          <button 
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="p-2 text-foreground focus:outline-none"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>
      </div>

      {/* Mobile Menu */}
      {mobileMenuOpen && (
        <div className="absolute top-full left-0 right-0 p-4 bg-background border-b border-border shadow-lg flex flex-col gap-4 md:hidden">
          {navLinks.map((link) => (
            <a 
              key={link.name} 
              href={link.href} 
              onClick={() => setMobileMenuOpen(false)}
              className="text-base font-medium p-2 rounded-md hover:bg-muted transition-colors"
            >
              {link.name}
            </a>
          ))}
          <a 
            href="#contact" 
            onClick={() => setMobileMenuOpen(false)}
            className={cn(
              buttonVariants({ variant: "default", size: "lg" }), 
              "w-full rounded-md mt-2 h-12 text-base font-semibold"
            )}
          >
            {t('contact')}
          </a>
        </div>
      )}
    </header>
  );
}
