import { useMemo, useState, type CSSProperties } from 'react';
import { search, normalizeText, type SearchEntry } from '../lib/search';

interface Props {
  entries: SearchEntry[];
  /** UI strings, passed from Astro so this island has no i18n dependency. */
  t: Record<string, string>;
  /** Clickable query suggestions rendered under the input. */
  suggestions?: string[];
}

export default function SearchBox({ entries, t, suggestions = [] }: Props) {
  const [query, setQuery] = useState('');
  const results = useMemo(() => search(entries, query), [entries, query]);
  const hasQuery = normalizeText(query).length > 0;

  let status = t.searchHint;
  if (hasQuery) {
    status = results.length === 0 ? t.searchNoResults : `${results.length} ${t.searchResults}`;
  }

  return (
    <div>
      <label htmlFor="site-search" className="field-label">
        {t.searchLabel}
      </label>
      <div className="relative">
        <input
          id="site-search"
          type="search"
          autoComplete="off"
          placeholder={t.searchPlaceholder}
          value={query}
          onChange={(ev) => setQuery(ev.target.value)}
          className="field pe-12 text-lg"
          aria-describedby="search-status"
        />
        <svg
          className="pointer-events-none absolute end-4 top-1/2 -translate-y-1/2 text-flux"
          width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"
        >
          <circle cx="11" cy="11" r="7" /><path d="m20 20-3.8-3.8" />
        </svg>
      </div>

      {suggestions.length > 0 && !hasQuery && (
        <div className="mt-4 flex flex-wrap items-center gap-2">
          <span className="mono text-[0.625rem] uppercase tracking-[0.18em] text-ash">{t.searchSuggest}</span>
          {suggestions.map((s) => (
            <button key={s} type="button" onClick={() => setQuery(s)} className="chip transition-all duration-200 hover:-translate-y-0.5 hover:border-[rgba(0,229,255,0.5)] hover:text-flux">
              {s}
            </button>
          ))}
        </div>
      )}

      <p id="search-status" aria-live="polite" className="field-hint mono text-[0.6875rem] uppercase tracking-[0.16em]">
        {status}
      </p>

      <ul className="mt-8 divide-y divide-[rgba(255,255,255,0.08)] border-y border-line">
        {results.map((r) => (
          <li key={r.url} className="group py-5 transition-all duration-300 hover:ps-3">
            <span className="chip chip-accent" style={{ '--acc': 'var(--color-flux)' } as CSSProperties}>{r.typeLabel}</span>
            <a href={r.url} className="mt-2.5 block text-lg font-bold leading-snug transition-colors duration-300 group-hover:text-flux">
              {r.title}
            </a>
            <p className="mt-1.5 text-sm leading-relaxed text-fog">{r.summary}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}
