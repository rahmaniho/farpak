/**
 * Builds the search index for one locale at build time.
 * Covers services, projects and articles.
 */
import { services } from '../content/services';
import { projects } from '../content/projects';
import { articles, topicLabels } from '../content/news';
import { localePath, type Locale } from '../i18n/utils';
import type { SearchEntry } from './search';

export function buildSearchIndex(locale: Locale): SearchEntry[] {
  const serviceLabel = locale === 'fa' ? 'خدمات' : 'Service';
  const projectLabel = locale === 'fa' ? 'پروژه' : 'Project';
  const articleLabel = locale === 'fa' ? 'مقاله' : 'Article';

  const entries: SearchEntry[] = [];

  for (const s of services) {
    const c = s.copy[locale];
    entries.push({
      type: 'service',
      typeLabel: serviceLabel,
      title: c.title,
      summary: c.summary,
      body: [c.description, ...c.process, ...c.outputs].join(' '),
      url: localePath(locale, `/services/${s.slug}/`),
    });
  }

  for (const p of projects) {
    const c = p.copy[locale];
    entries.push({
      type: 'project',
      typeLabel: projectLabel,
      title: c.title,
      summary: c.summary,
      body: [c.client, c.scope, c.challenge, c.solution, ...c.results].join(' '),
      url: localePath(locale, `/projects/${p.slug}/`),
    });
  }

  for (const a of articles) {
    const c = a.copy[locale];
    entries.push({
      type: 'article',
      typeLabel: `${articleLabel} · ${topicLabels[a.topic][locale]}`,
      title: c.title,
      summary: c.summary,
      body: c.body.join(' '),
      url: localePath(locale, `/news/${a.slug}/`),
    });
  }

  return entries;
}
