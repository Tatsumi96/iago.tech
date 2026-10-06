import {
  COMPANY_NAME,
  SITE_URL,
  SITE_LOGO,
  CONTACT_EMAIL,
  CONTACT_PHONE,
  CONTACT_FACEBOOK,
  CONTACT_MESSENGER,
  CONTACT_WHATSAPP,
} from '@/lib/constants';

/**
 * Données structurées Schema.org : Organization + ProfessionalService
 * (adresse, contact, réseaux) pour le rich snippet / knowledge panel.
 */
export function JsonLd() {
  const schema = {
    '@context': 'https://schema.org',
    '@graph': [
      {
        '@type': 'Organization',
        '@id': `${SITE_URL}/#organization`,
        name: COMPANY_NAME,
        url: SITE_URL,
        logo: SITE_LOGO,
        email: CONTACT_EMAIL,
        sameAs: [CONTACT_FACEBOOK, CONTACT_MESSENGER, CONTACT_WHATSAPP],
      },
      {
        '@type': 'ProfessionalService',
        '@id': `${SITE_URL}/#local-business`,
        name: COMPANY_NAME,
        url: SITE_URL,
        image: `${SITE_URL}/images/team.jpg`,
        telephone: CONTACT_PHONE,
        email: CONTACT_EMAIL,
        priceRange: '$$',
        address: {
          '@type': 'PostalAddress',
          addressLocality: 'Antsirabe',
          addressCountry: 'MG',
        },
        sameAs: [CONTACT_FACEBOOK, CONTACT_MESSENGER, CONTACT_WHATSAPP],
      },
    ],
  };

  return (
    <script
      type="application/ld+json"
      dangerouslySetInnerHTML={{ __html: JSON.stringify(schema) }}
    />
  );
}
