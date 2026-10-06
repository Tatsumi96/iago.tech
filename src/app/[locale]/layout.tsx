import { NextIntlClientProvider } from 'next-intl';
import { getMessages } from 'next-intl/server';
import { notFound } from 'next/navigation';
import { routing } from '@/i18n/routing';
import { Archivo, Inter } from 'next/font/google';
import { ThemeProvider } from '@/components/layout/ThemeProvider';
import '../globals.css';
import Header from '@/components/layout/Header';
import Footer from '@/components/layout/Footer';

const archivo = Archivo({
  subsets: ['latin'],
  variable: '--font-heading',
  weight: ['700', '800'],
});

const inter = Inter({
  subsets: ['latin'],
  variable: '--font-sans',
  weight: ['400', '500', '600'],
});

export function generateStaticParams() {
  return routing.locales.map((locale) => ({ locale }));
}

export default async function LocaleLayout({
  children,
  params: { locale }
}: {
  children: React.ReactNode;
  params: { locale: string };
}) {
  if (!routing.locales.includes(locale as any)) {
    notFound();
  }

  const messages = await getMessages();

  return (
    <html lang={locale} className={`${inter.variable} ${archivo.variable} antialiased scroll-smooth`}>
      <body className="min-h-screen bg-background text-foreground flex flex-col font-sans">
        <NextIntlClientProvider messages={messages}>
          <ThemeProvider attribute="class" defaultTheme="system" enableSystem disableTransitionOnChange>
            <Header />
            <main className="flex-1">
              {children}
            </main>
            <Footer />
          </ThemeProvider>
        </NextIntlClientProvider>
      </body>
    </html>
  );
}
