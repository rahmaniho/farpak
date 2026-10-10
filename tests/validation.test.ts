import { test } from 'node:test';
import assert from 'node:assert/strict';
import { isEmail, isPhone, normalizeDigits } from '../src/lib/validation.ts';

test('normalizeDigits converts Persian and Arabic-Indic digits', () => {
  assert.equal(normalizeDigits('۰۹۱۲'), '0912');
  assert.equal(normalizeDigits('٠٩١٢'), '0912');
});

test('isPhone accepts common Iranian formats', () => {
  for (const v of ['09121234567', '۰۹۱۲۱۲۳۴۵۶۷', '+98 912 123 4567', '021-12345678']) {
    assert.equal(isPhone(v), true, v);
  }
});

test('isPhone rejects invalid input', () => {
  for (const v of ['abc', '12', '', '0912']) {
    assert.equal(isPhone(v), false, v);
  }
});

test('isEmail accepts valid and rejects invalid addresses', () => {
  assert.equal(isEmail('user@example.com'), true);
  assert.equal(isEmail('user@example'), false);
  assert.equal(isEmail('no-at-sign.com'), false);
});
