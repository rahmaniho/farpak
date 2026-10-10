/**
 * Pure helpers for the news listing: topic filter, pagination and URLs.
 * Used by the listing pages and by their getStaticPaths, so every filtered
 * and paginated page is pre-rendered (no client JavaScript needed).
 */
import { articles, PAGE_SIZE, TOPICS, type Article, type TopicId } from '../content/news';
import { localePath, type Locale } from '../i18n/utils';

export interface ListingState {
  topic?: TopicId;
  page: number;
}

/** Newest first. */
export function sortedArticles(all: Article[] = articles): Article[] {
  return [...all].sort((a, b) => (a.date < b.date ? 1 : -1));
}

export function filterByTopic(topic?: TopicId, all: Article[] = articles): Article[] {
  const list = sortedArticles(all);
  return topic ? list.filter((a) => a.topic === topic) : list;
}

export function pageCount(total: number, size = PAGE_SIZE) {
  return Math.max(1, Math.ceil(total / size));
}

export function pageSlice(list: Article[], page: number, size = PAGE_SIZE) {
  const start = (page - 1) * size;
  return list.slice(start, start + size);
}

export function topicCount(topic: TopicId, all: Article[] = articles) {
  return all.filter((a) => a.topic === topic).length;
}

/** Base path of a listing (without page number), e.g. /news/ or /news/topic/safety/. */
export function listingBase(locale: Locale, topic?: TopicId) {
  return topic ? localePath(locale, `/news/topic/${topic}/`) : localePath(locale, '/news/');
}

/** URL of one page of a listing. Page 1 has no /page/1 suffix. */
export function listingUrl(locale: Locale, state: ListingState) {
  const base = listingBase(locale, state.topic);
  return state.page <= 1 ? base : `${base}page/${state.page}/`;
}

/** Every listing state that needs a static page, for one locale. */
export function allListingStates(all: Article[] = articles): ListingState[] {
  const states: ListingState[] = [];
  const total = pageCount(all.length);
  for (let p = 1; p <= total; p++) states.push({ page: p });
  for (const topic of TOPICS) {
    const count = topicCount(topic, all);
    if (count === 0) continue;
    const pages = pageCount(count);
    for (let p = 1; p <= pages; p++) states.push({ topic, page: p });
  }
  return states;
}
