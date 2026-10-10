/**
 * Schema.org builders. Only verified facts are emitted: optional fields
 * (address, phone, email, logo sameAs) are added once they are confirmed.
 */
import { dictionaries, type Locale } from '../i18n/utils';

const ORG_ID = '#organization';

export function organizationSchema(siteUrl: string, locale: Locale) {
  const d = dictionaries[locale];
  return {
    '@context': 'https://schema.org',
    '@type': 'Organization',
    '@id': `${siteUrl}${ORG_ID}`,
    name: d.siteName,
    legalName: locale === 'fa' ? 'فرپاک صنعت سلامت' : 'Farapak Sanat Salamat',
    alternateName: locale === 'fa' ? 'Farapak Sanat Salamat' : 'فرپاک صنعت سلامت',
    url: siteUrl,
    description: d.siteDescription,
    inLanguage: locale === 'fa' ? 'fa-IR' : 'en-US',
    identifier: [
      { '@type': 'PropertyValue', name: locale === 'fa' ? 'شماره ثبت' : 'Registration number', value: '18992' },
      { '@type': 'PropertyValue', name: locale === 'fa' ? 'شناسه ملی' : 'National ID', value: '14013787777' },
    ],
    knowsAbout: ['Oil and gas engineering', 'Petrochemical engineering', 'Fire safety systems', 'HSE consulting', 'Industrial contracting'],
  };
}

export function serviceSchema(siteUrl: string, pageUrl: string, locale: Locale, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name,
    description,
    url: pageUrl,
    inLanguage: locale === 'fa' ? 'fa-IR' : 'en-US',
    provider: { '@id': `${siteUrl}${ORG_ID}` },
    areaServed: { '@type': 'Country', name: locale === 'fa' ? 'ایران' : 'Iran' },
  };
}

export function breadcrumbSchema(items: { name: string; url: string }[]) {
  return {
    '@context': 'https://schema.org',
    '@type': 'BreadcrumbList',
    itemListElement: items.map((item, i) => ({
      '@type': 'ListItem',
      position: i + 1,
      name: item.name,
      item: item.url,
    })),
  };
}
