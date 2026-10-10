import rss from '@astrojs/rss';
import type { APIContext } from 'astro';
import { articles } from '../../../content/news';
import { dictionaries } from '../../../i18n/utils';

export function GET(context: APIContext) {
  return rss({
    title: dictionaries.en.newsRssTitle,
    description: dictionaries.en.siteDescription,
    site: context.site!,
    items: articles.map((a) => ({
      title: a.copy.en.title,
      description: a.copy.en.summary,
      pubDate: new Date(a.date),
      link: `/en/news/${a.slug}/`,
    })),
    customData: '<language>en-US</language>',
  });
}
