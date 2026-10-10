/**
 * Schema.org builders. Only verified facts are emitted: optional fields
 * (address, phone, email, logo sameAs) are added once they are confirmed.
 */
import { dictionaries, type Locale } from '../i18n/utils';
import { withBase } from './base';
import { office477 } from '../content/office477';
import type { Faq } from '../content/health';

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

/* ------------------------------------------------------------------ */
/* داده‌های ساختاریافته بخش خدمات سلامت ۴۷۷                          */
/* فقط واقعیت‌های تأییدشده منتشر می‌شوند: ساعات کاری، هزینه و مجوزها    */
/* تا زمان تأیید مدیریت عمداً در JSON-LD نمی‌آیند.                      */
/* ------------------------------------------------------------------ */
export const OFFICE477_ID = '#office477';

/** شناسه گره دفتر خدمات سلامت ۴۷۷ (برای ارجاع از Service.provider). */
export function office477NodeId(siteUrl: string) {
  return `${siteUrl}${withBase('/health/')}${OFFICE477_ID}`;
}

/** LocalBusiness برای دفتر خدمات سلامت ۴۷۷ با نشانی، تلفن‌ها و مختصات تأییدشده. */
export function office477Schema(siteUrl: string, pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'LocalBusiness',
    '@id': office477NodeId(siteUrl),
    name: office477.name,
    alternateName: office477.nameEn,
    slogan: office477.slogan,
    url: pageUrl,
    image: `${siteUrl}${withBase('/images/brand/logo-512.png')}`,
    telephone: office477.phones.map((p) => p.dial),
    address: {
      '@type': 'PostalAddress',
      addressLocality: office477.city,
      addressCountry: 'IR',
      streetAddress: 'خیابان طالقانی، برج خلیج فارس، طبقه ششم، واحد ۶۱۹',
    },
    geo: {
      '@type': 'GeoCoordinates',
      latitude: office477.geo.latitude,
      longitude: office477.geo.longitude,
    },
    areaServed: { '@type': 'City', name: office477.city },
    inLanguage: 'fa-IR',
  };
}

/** Service با provider = دفتر خدمات سلامت ۴۷۷. */
export function healthServiceSchema(siteUrl: string, pageUrl: string, name: string, description: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'Service',
    '@id': `${pageUrl}#service`,
    name,
    description,
    url: pageUrl,
    inLanguage: 'fa-IR',
    provider: { '@id': office477NodeId(siteUrl) },
    areaServed: { '@type': 'City', name: office477.city },
    availableChannel: {
      '@type': 'ServiceChannel',
      servicePhone: { '@type': 'ContactPoint', telephone: office477.phones[0].dial, contactType: 'customer support', availableLanguage: 'fa' },
      serviceUrl: pageUrl,
    },
  };
}

/** FAQPage از پرسش‌های متداول همان صفحه (بدون ادعای تأییدنشده). */
export function faqPageSchema(faqs: Faq[], pageUrl: string) {
  return {
    '@context': 'https://schema.org',
    '@type': 'FAQPage',
    '@id': `${pageUrl}#faq`,
    mainEntity: faqs.map((f) => ({
      '@type': 'Question',
      name: f.q,
      acceptedAnswer: { '@type': 'Answer', text: f.a },
    })),
  };
}
