import type { MetadataRoute } from 'next';
import { routing } from '@/i18n/routing';
import { SITE_URL, SITE_OG_IMAGE } from '@/lib/constants';

// Sections de la landing page (navigation par anchors).
// Chaque section a sa propre priorité SEO selon son importance.
const sections: Array<{
  anchor: string;
  changeFrequency: 'weekly' | 'monthly';
  priority: number;
}> = [
  { anchor: '#services', changeFrequency: 'monthly', priority: 0.8 },
  { anchor: '#about', changeFrequency: 'monthly', priority: 0.7 },
  { anchor: '#process', changeFrequency: 'monthly', priority: 0.6 },
  { anchor: '#contact', changeFrequency: 'weekly', priority: 0.7 },
];

export default function sitemap(): MetadataRoute.Sitemap {
  const entries: MetadataRoute.Sitemap = [];
  const lastModified = new Date();

  // Generate entries for each locale
  for (const locale of routing.locales) {
    const isDefault = locale === routing.defaultLocale;
    const languages = Object.fromEntries(
      routing.locales.map((l) => [l, `${SITE_URL}/${l}`])
    );

    // Main page for each locale
    entries.push({
      url: `${SITE_URL}/${locale}`,
      lastModified,
      changeFrequency: 'weekly',
      priority: isDefault ? 1 : 0.8,
      alternates: { languages },
      images: [SITE_OG_IMAGE],
    });

    // Section anchors for each locale.
    // Note : pas de `/` avant le `#` (`/fr#services`, pas `/fr/#services`)
    // pour des URLs canoniques propres.
    for (const section of sections) {
      entries.push({
        url: `${SITE_URL}/${locale}${section.anchor}`,
        lastModified,
        changeFrequency: section.changeFrequency,
        // Les locales secondaires ont une priorité légèrement réduite
        // (arrondie pour éviter les artefacts de calcul flottant).
        priority: isDefault
          ? section.priority
          : Math.round((section.priority - 0.1) * 10) / 10,
        alternates: {
          languages: Object.fromEntries(
            routing.locales.map((l) => [l, `${SITE_URL}/${l}${section.anchor}`])
          ),
        },
      });
    }
  }

  return entries;
}
