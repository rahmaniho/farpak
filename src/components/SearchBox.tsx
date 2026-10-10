import { useMemo, useState } from 'react';
import { search, normalizeText, type SearchEntry } from '../lib/search';

interface Props {
  entries: SearchEntry[];
  /** UI strings, passed from Astro so the island has no i18n dependency. */
  t: Record<string, string>;
}

export default function SearchBox({ entries, t }: Props) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => search(entries, query), [entries, query]);
  const hasQuery = normalizeText(query).length > 0;

  let status = t.searchHint;
  if (hasQuery) {
    status = results.length === 0 ? t.searchNoResults : `${results.length} ${t.searchResults}`;
  }

  return (
    <div>
      <label htmlFor="site-search" className="block text-sm font-medium text-ink">
        {t.searchLabel}
      </label>
      <input
        id="site-search"
        type="search"
        autoComplete="off"
        placeholder={t.searchPlaceholder}
        value={query}
        onChange={(ev) => setQuery(ev.target.value)}
        className="mt-2 w-full rounded-md border border-slate-300 bg-white px-4 py-3 text-lg text-ink focus:border-teal focus:ring-2 focus:ring-teal/30"
        aria-describedby="search-status"
      />
      <p id="search-status" aria-live="polite" className="mt-3 text-sm text-slate-600">
        {status}
      </p>
      <ul className="mt-6 divide-y divide-slate-200">
        {results.map((r) => (
          <li key={r.url} className="py-5">
            <span className="inline-block rounded bg-mist px-2 py-0.5 text-xs font-medium text-navy">{r.typeLabel}</span>
            <a href={r.url} className="mt-2 block text-lg font-semibold text-navy hover:underline">{r.title}</a>
            <p className="mt-1 text-sm text-slate-600">{r.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
