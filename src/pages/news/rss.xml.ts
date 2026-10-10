import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { articles } from '../../content/news';
import { dictionaries } from '../../i18n/utils';

export function GET(context: APIContext) {
  return rss({
    title: dictionaries.fa.newsRssTitle,
    description: dictionaries.fa.siteDescription,
    site: context.site!,
    items: articles.map((a) => ({
      title: a.copy.fa.title,
      description: a.copy.fa.summary,
      pubDate: new Date(a.date),
      link: `/news/${a.slug}/`,
    })),
    customData: '<language>fa-IR</language>',
  });
}
