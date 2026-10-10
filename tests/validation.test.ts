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

import { validateSubmission } from '../src/lib/validation.ts';

test('validateSubmission accepts a complete RFQ', () => {
  const errors = validateSubmission({
    mode: 'rfq', name: 'Ali', phone: '09121234567', email: 'ali@example.com',
    message: 'Scope', service: 'fire-safety', attachment: null,
  });
  assert.deepEqual(errors, {});
});

test('validateSubmission requires service for RFQ and subject for contact', () => {
  assert.equal(validateSubmission({ mode: 'rfq', name: 'A', phone: '09121234567', email: 'a@b.com', message: 'm' }).service, 'required');
  assert.equal(validateSubmission({ mode: 'contact', name: 'A', phone: '09121234567', email: 'a@b.com', message: 'm' }).subject, 'required');
});

test('validateSubmission rejects non-PDF and oversized attachments', () => {
  const base = { mode: 'contact' as const, name: 'A', phone: '09121234567', email: 'a@b.com', subject: 's', message: 'm' };
  assert.equal(validateSubmission({ ...base, attachment: { type: 'image/png', size: 10 } }).attachment, 'file');
  assert.equal(validateSubmission({ ...base, attachment: { type: 'application/pdf', size: 11 * 1024 * 1024 } }).attachment, 'file');
  assert.deepEqual(validateSubmission({ ...base, attachment: { type: 'application/pdf', size: 1024 } }), {});
});

test('validateSubmission enforces length limits', () => {
  const errors = validateSubmission({
    mode: 'contact', name: 'x'.repeat(121), phone: '09121234567', email: 'a@b.com', subject: 's', message: 'm',
  });
  assert.equal(errors.name, 'tooLong');
});
