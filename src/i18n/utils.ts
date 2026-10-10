import { withBase } from '../lib/base';
import fa from './fa.json';
import en from './en.json';

export type Locale = 'fa' | 'en';
export const locales: Locale[] = ['fa', 'en'];
export const dictionaries = { fa, en } as const;

export function t(locale: Locale) {
  const dict = dictionaries[locale];
  return (key: keyof typeof fa) => dict[key] ?? fa[key] ?? key;
}

/** Build a localized path: fa -> /x/, en -> /en/x/ */
export function localePath(locale: Locale, path = '/') {
  const clean = path.startsWith('/') ? path : `/${path}`;
  return withBase(locale === 'en' ? `/en${clean === '/' ? '/' : clean}` : clean);
}

/** Map the current path to the other locale (keeps the same page). */
export function switchLocalePath(currentPath: string, target: Locale) {
  const stripped = currentPath.replace(/^\/en(?=\/|$)/, '') || '/';
  return localePath(target, stripped);
}
