/**
 * Schema.org builders. Only verified facts are emitted: optional fields
 * (address, phone, email, logo sameAs) are added once they are confirmed.
 */
import { dictionaries, type Locale } from '../i18n/utils';
import { withBase } from './base';

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
    logo: { '@type': 'ImageObject', url: `${siteUrl}${withBase('/images/brand/logo-512.png')}`, width: 512, height: 512 },
    image: `${siteUrl}${withBase('/images/brand/logo-512.png')}`,
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

/* ── دفتر خدمات سلامت ۴۷۷ قزوین — Local SEO ────────────────────────────────
   Every value below is client-provided. Fields we do not have (opening hours,
   price range, postal code) are omitted rather than invented. */
const OFFICE_ID = '#office477';

export function localBusiness477Schema(siteUrl: string, imagePath: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': `${siteUrl}${OFFICE_ID}`,
    name: 'دفتر خدمات سلامت ۴۷۷ قزوین',
    description:
      'ثبت و صدور کارت بهداشت، آموزش بهداشت اصناف، صلاحیت بهداشتی، طرح خودکنترلی و خوداظهاری بهداشت و قراردادهای ممیزی بهداشتی در قزوین.',
    image: `${siteUrl}${imagePath}`,
    url: `${siteUrl}/477/`,
    telephone: '+989398520150',
    hasMap: 'https://www.google.com/maps?q=36.2678594,50.0135519',
    address: {
      '@type': 'PostalAddress',
      streetAddress: 'خیابان طالقانی، برج خلیج فارس، طبقه ششم، واحد ۶۱۹',
      addressLocality: 'قزوین',
      addressRegion: 'قزوین',
      addressCountry: 'IR',
    },
    geo: { '@type': 'GeoCoordinates', latitude: 36.2678594, longitude: 50.0135519 },
    areaServed: { '@type': 'City', name: 'قزوین' },
    sameAs: ['https://www.instagram.com/daftar_khadamatsalamat_qazvin'],
    inLanguage: 'fa-IR',
    knowsAbout: [
      'کارت بهداشت',
      'آموزش بهداشت اصناف',
      'صلاحیت بهداشتی',
      'خودکنترلی و خوداظهاری بهداشت',
      'ممیزی بهداشتی',
    ],
  };
}

export function s477ServiceSchema(siteUrl: string, pageUrl: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name,
    description,
    url: pageUrl,
    inLanguage: 'fa-IR',
    provider: { '@id': `${siteUrl}${OFFICE_ID}` },
    areaServed: { '@type': 'City', name: 'قزوین' },
  };
}
