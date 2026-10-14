import type { MetadataRoute } from 'next';
import { SITE_URL } from '@/lib/constants';

export default function robots(): MetadataRoute.Robots {
  return {
    rules: [
      {
        // Moteurs de recherche généralistes — crawl ralenti pour
        // limiter la charge sur le Worker Cloudflare (plan gratuit).
        userAgent: '*',
        allow: '/',
        disallow: [
          '/api/',
          '/_next/',
          '/cdn-cgi/',
          '/*.json$',
          '/*?*utm_*',
        ],
        crawlDelay: 10,
      },
      // Bots IA d'entraînement — blocage total (contenu propriétaire).
      // Liste à jour (2026) : OpenAI, Google, Anthropic, Meta,
      // Perplexity, ByteDance, Cohere, Apple, DuckDuckGo.
      {
        userAgent: [
          'GPTBot',
          'ChatGPT-User',
          'OAI-SearchBot',
          'Google-Extended',
          'GoogleOther',
          'anthropic-ai',
          'ClaudeBot',
          'Claude-Web',
          'CCBot',
          'Bytespider',
          'FacebookBot',
          'Meta-ExternalAgent',
          'PerplexityBot',
          'cohere-ai',
          'Applebot-Extended',
          'DuckAssistBot',
          'YouBot',
        ],
        disallow: '/',
      },
      // Scrapers SEO agressifs — blocage total (bande passante).
      {
        userAgent: [
          'AhrefsBot',
          'SemrushBot',
          'MJ12bot',
          'DotBot',
          'BLEXBot',
          'DataForSeoBot',
        ],
        disallow: '/',
      },
    ],
    sitemap: `${SITE_URL}/sitemap.xml`,
  };
}
