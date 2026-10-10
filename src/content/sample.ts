/**
 * SAMPLE DATA FLAG
 * --------------------------------------------------------------
 * While `SAMPLE_DATA` is true, the site shows clearly-labelled
 * demonstration content (projects, articles, stats, contact).
 * Every sample value is marked with a visible "نمونه / Sample" badge.
 *
 * Before launch: set SAMPLE_DATA to false and replace the values
 * in this file and in src/content/projects.ts and news.ts with verified facts.
 */
import type { Locale } from '../i18n/utils';

export const SAMPLE_DATA = true;

export function sampleBadge(locale: Locale) {
  return locale === 'fa' ? 'نمونه' : 'Sample';
}

export const sampleStats = {
  yearsOfExperience: 10,
  projectsDelivered: 48,
  manHours: '۲۵۰,۰۰۰',
} as const;

export const sampleContact = {
  address: { fa: 'تهران، [نشانی نمونه]', en: 'Tehran, [sample address]' },
  phone: '+98 21 0000 0000',
  email: 'info@example.com',
} as const;
