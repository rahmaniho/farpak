import { test } from 'node:test';
import assert from 'node:assert/strict';
import { normalizeText, search, type SearchEntry } from '../src/lib/search.ts';

const entries: SearchEntry[] = [
  { type: 'article', typeLabel: 'Article', title: 'سیستم اطفای حریق', summary: 'اسپرینکلر', body: 'پمپ آتش', url: '/a/' },
  { type: 'service', typeLabel: 'Service', title: 'پیمانکاری و اجرا', summary: 'داربست و کارگاه', body: 'جرثقیل', url: '/s/' },
  { type: 'project', typeLabel: 'Project', title: 'Gas refinery HSE', summary: 'risk review', body: 'pipes', url: '/p/' },
];

test('normalizeText unifies Arabic and Persian letters, digits and ZWNJ', () => {
  assert.equal(normalizeText('كتاب'), normalizeText('کتاب'));
  assert.equal(normalizeText('ي'), 'ی');
  assert.equal(normalizeText('۱۲'), '12');
  assert.equal(normalizeText('آتش\u200cنشانی'), normalizeText('آتش‌نشانی'));
});

test('search returns nothing for an empty query', () => {
  assert.deepEqual(search(entries, '   '), []);
});

test('every token must match', () => {
  assert.equal(search(entries, 'حریق اسپرینکلر').length, 1);
  assert.equal(search(entries, 'حریق جرثقیل').length, 0);
});

test('matches in title rank above body matches', () => {
  const r = search(entries, 'آتش');
  assert.equal(r[0].url, '/a/');
});

test('search is case-insensitive for Latin text', () => {
  assert.equal(search(entries, 'HSE').length, 1);
  assert.equal(search(entries, 'hse').length, 1);
});
