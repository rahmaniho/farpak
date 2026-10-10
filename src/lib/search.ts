/**
 * Site search (pure functions, no framework dependency).
 * Text is normalised so Persian/Arabic variants and digits match:
 * ي/ى → ی, ك → ک, ZWNJ removed, diacritics removed, Persian digits → Latin.
 */
export interface SearchEntry {
  type: 'service' | 'project' | 'article';
  typeLabel: string;
  title: string;
  summary: string;
  body: string;
  url: string;
}

/** Persian and Arabic-Indic digits to Latin (kept local so tests can run without bundling). */
function toLatinDigits(input: string) {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

export function normalizeText(input: string): string {
  return toLatinDigits(input)
    .toLowerCase()
    .replace(/[يى]/g, 'ی')
    .replace(/ك/g, 'ک')
    .replace(/[\u064B-\u065F\u0670]/g, '') // Arabic diacritics
    .replace(/[\u200c\u200e\u200f]/g, '') // ZWNJ and directional marks
    .replace(/\s+/g, ' ')
    .trim();
}

/**
 * Every query token must appear somewhere in the entry.
 * Score: title match = 3, summary = 2, body = 1 (per token). Ties keep index order.
 */
export function search(entries: SearchEntry[], query: string, limit = 30): SearchEntry[] {
  const tokens = normalizeText(query).split(' ').filter(Boolean);
  if (tokens.length === 0) return [];

  const scored: { entry: SearchEntry; score: number }[] = [];
  for (const entry of entries) {
    const title = normalizeText(entry.title);
    const summary = normalizeText(entry.summary);
    const body = normalizeText(entry.body);
    let score = 0;
    let matchesAll = true;
    for (const token of tokens) {
      let hit = 0;
      if (title.includes(token)) hit += 3;
      if (summary.includes(token)) hit += 2;
      if (body.includes(token)) hit += 1;
      if (hit === 0) {
        matchesAll = false;
        break;
      }
      score += hit;
    }
    if (matchesAll) scored.push({ entry, score });
  }
  return scored
    .sort((a, b) => b.score - a.score)
    .slice(0, limit)
    .map((s) => s.entry);
}
