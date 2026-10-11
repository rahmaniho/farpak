/**
 * تست‌های بخش خدمات سلامت ۴۷۷:
 *  - اعتبارسنجی فرم درخواست (قواعدی که باید سمت سرور هم اجرا شوند)
 *  - ساخت خلاصه درخواست و لینک پیامک
 *  - قالب کد پیگیری (فقط برای استفاده سمت سرور)
 *  - یکپارچگی داده‌های محتوا (شناسه‌ها، دسته‌بندی‌ها، دوره‌ها)
 * اجرا: npm test
 */
import { test } from 'node:test';
import assert from 'node:assert/strict';

import {
  buildRequestSummary,
  buildSmsLink,
  createTrackingCode,
  HEALTH_LIMITS,
  isHealthPhone,
  validateHealthRequest,
  type HealthRequestInput,
} from '../src/lib/healthRequests.ts';
import {
  healthServices,
  serviceCategories,
  sortedHealthServices,
  activeHealthServices,
  relatedHealthServices,
  getHealthService,
  healthOffice,
} from '../src/content/health.ts';
import { office477 } from '../src/content/office477.ts';
import { ICON_PATHS } from '../src/components/health/icons.ts';

const baseRules = { allowedRequestTypes: ['new', 'renewal', 'consult'] };

const validInput: HealthRequestInput = {
  service: 'health-card',
  requestType: 'new',
  name: 'زهرا محمدی',
  phone: '۰۹۱۲۱۲۳۴۵۶۷',
  message: 'برای تمدید کارت بهداشت اقدام کرده‌ام و نیاز به راهنمایی دارم.',
  consent: true,
};

/* ------------------------- اعتبارسنجی فرم ------------------------- */

test('isHealthPhone accepts Iranian mobile and landline formats', () => {
  for (const v of ['09121234567', '۰۹۱۲۱۲۳۴۵۶۷', '+98 912 123 4567', '028-33992550', '02833992550']) {
    assert.equal(isHealthPhone(v), true, v);
  }
});

test('isHealthPhone rejects invalid numbers', () => {
  for (const v of ['', 'abc', '0912', '12345', '091212345678901']) {
    assert.equal(isHealthPhone(v), false, v);
  }
});

test('validateHealthRequest accepts a complete request', () => {
  assert.deepEqual(validateHealthRequest(validInput, baseRules), {});
});

test('validateHealthRequest requires name, phone, requestType, message and consent', () => {
  const errors = validateHealthRequest(
    { ...validInput, name: '', phone: '', requestType: '', message: '', consent: false },
    baseRules
  );
  assert.equal(errors.name, 'required');
  assert.equal(errors.phone, 'required');
  assert.equal(errors.requestType, 'required');
  assert.equal(errors.message, 'required');
  assert.equal(errors.consent, 'required');
});

test('validateHealthRequest rejects an invalid phone and an unknown request type', () => {
  assert.equal(validateHealthRequest({ ...validInput, phone: '123' }, baseRules).phone, 'phone');
  assert.equal(validateHealthRequest({ ...validInput, requestType: 'hack' }, baseRules).requestType, 'invalid');
});

test('validateHealthRequest enforces text length limits', () => {
  assert.equal(validateHealthRequest({ ...validInput, name: 'a'.repeat(HEALTH_LIMITS.name + 1) }, baseRules).name, 'tooLong');
  assert.equal(validateHealthRequest({ ...validInput, message: 'a'.repeat(HEALTH_LIMITS.message + 1) }, baseRules).message, 'tooLong');
});

test('validateHealthRequest honours per-service required and optional fields', () => {
  const rules = {
    ...baseRules,
    requiredFields: ['organization', 'contactPerson'] as const,
    maxLengths: { activity: 20 },
  };
  const errors = validateHealthRequest({ ...validInput }, { ...rules, requiredFields: [...rules.requiredFields] });
  assert.equal(errors.organization, 'required');
  assert.equal(errors.contactPerson, 'required');

  const ok = validateHealthRequest(
    { ...validInput, organization: 'شرکت نمونه', contactPerson: 'رضا کریمی' },
    { ...rules, requiredFields: [...rules.requiredFields] }
  );
  assert.deepEqual(ok, {});

  const tooLong = validateHealthRequest(
    { ...validInput, organization: 'x', contactPerson: 'y', activity: 'a'.repeat(21) },
    { ...rules, requiredFields: [...rules.requiredFields] }
  );
  assert.equal(tooLong.activity, 'tooLong');
});

test('validateHealthRequest rejects values outside the allowed option list', () => {
  const errors = validateHealthRequest(
    { ...validInput, course: 'not-a-course' },
    { ...baseRules, allowedOptionValues: { course: ['food-hygiene'] } }
  );
  assert.equal(errors.course, 'invalid');
});

/* --------------------- خلاصه درخواست و پیامک --------------------- */

test('buildRequestSummary keeps filled lines only and names the office', () => {
  const text = buildRequestSummary(
    [
      { label: 'نام', value: 'زهرا محمدی' },
      { label: 'موضوع', value: '   ' },
      { label: 'توضیحات', value: 'تمدید کارت' },
    ],
    'دفتر خدمات سلامت ۴۷۷'
  );
  assert.match(text, /دفتر خدمات سلامت ۴۷۷/);
  assert.match(text, /نام: زهرا محمدی/);
  assert.match(text, /توضیحات: تمدید کارت/);
  assert.ok(!text.includes('موضوع'), 'empty lines must be dropped');
});

test('buildSmsLink targets the office number and encodes the body', () => {
  const link = buildSmsLink('+989398520150', 'درخواست کارت بهداشت');
  assert.ok(link.startsWith('sms:+989398520150?&body='));
  assert.ok(link.includes(encodeURIComponent('درخواست کارت بهداشت')));
});

test('createTrackingCode produces the documented 477-XXXXXX shape', () => {
  const code = createTrackingCode(() => 0.123456);
  assert.match(code, /^477-\d{6}$/);
  assert.equal(createTrackingCode().length, 10);
  assert.notEqual(createTrackingCode(), createTrackingCode());
});

/* --------------------- یکپارچگی داده‌های محتوا --------------------- */

const SLUG = /^[a-z][a-z0-9-]{1,60}$/;

test('every health service has a unique, URL-safe slug and a known category', () => {
  const slugs = new Set<string>();
  const categories = new Set(serviceCategories.map((c) => c.id));
  for (const s of healthServices) {
    assert.match(s.slug, SLUG, s.slug);
    assert.ok(!slugs.has(s.slug), `duplicate slug: ${s.slug}`);
    slugs.add(s.slug);
    assert.ok(categories.has(s.category), `${s.slug} has unknown category ${s.category}`);
    assert.ok(typeof s.order === 'number');
    assert.ok(s.seo.title.length > 10, `${s.slug} needs an SEO title`);
    assert.ok(s.seo.title.length <= 60, `${s.slug} SEO title is too long (${s.seo.title.length})`);
    assert.ok(s.seo.description.length <= 180, `${s.slug} meta description is too long`);
    assert.ok(s.seo.description.length >= 70, `${s.slug} needs a meta description (≥70 chars)`);
    assert.ok(ICON_PATHS[s.icon], `${s.slug} uses an unknown icon`);
  }
});

test('service content is complete enough to publish', () => {
  for (const s of healthServices) {
    const c = s.copy;
    assert.ok(c.title && c.shortTitle && c.summary, `${s.slug} missing titles`);
    assert.ok(c.description.length >= 2, `${s.slug} needs an introduction`);
    assert.ok(c.steps.length >= 3, `${s.slug} needs the service steps`);
    assert.ok(c.faqs.length >= 3, `${s.slug} needs FAQs`);
    assert.ok(c.requestTypes.length >= 2, `${s.slug} needs request types`);
    assert.ok(c.disclaimer.length > 20, `${s.slug} needs a disclaimer (no unverified promises)`);

    const types = new Set(c.requestTypes.map((r) => r.value));
    assert.equal(types.size, c.requestTypes.length, `${s.slug} has duplicate request types`);

    for (const f of c.faqs) {
      assert.ok(f.q.endsWith('؟') || f.q.includes('؟'), `${s.slug} FAQ should be a question`);
      assert.ok(f.a.length > 20);
    }
    for (const field of c.extraFields ?? []) {
      assert.ok(field.name && field.label, `${s.slug} extra field needs name and label`);
      if (field.type === 'select') assert.ok((field.options?.length ?? 0) > 0, `${s.slug} select needs options`);
    }
  }
});

test('unapproved content is flagged so it can never look verified', () => {
  for (const s of healthServices) {
    const c = s.copy;
    for (const field of [c.documents, c.conditions, c.duration, c.fee]) {
      assert.equal(typeof field.approved, 'boolean');
      if (!field.approved) {
        // داده تأییدنشده یا خالی است یا صراحتاً با «پیش‌نویس» علامت خورده است.
        const items = Array.isArray(field.value) ? field.value : [field.value].filter(Boolean) as string[];
        for (const item of items) {
          assert.ok(item.startsWith('پیش‌نویس'), `${s.slug}: unapproved item must be marked as draft → ${item}`);
        }
      }
    }
  }
});

test('courses have unique ids and their selects only accept those ids', () => {
  const training = getHealthService('hygiene-training');
  assert.ok(training?.courses?.length, 'training service should list courses');
  const ids = training!.courses!.map((c) => c.id);
  assert.equal(new Set(ids).size, ids.length, 'duplicate course id');

  const select = training!.copy.extraFields?.find((f) => f.name === 'course');
  assert.ok(select, 'training form should expose a course select');
  const optionValues = select!.options!.map((o) => o.value).filter(Boolean);
  assert.deepEqual([...optionValues].sort(), [...ids].sort());
});

test('listing helpers sort, filter and relate services correctly', () => {
  const sorted = sortedHealthServices();
  assert.deepEqual(sorted.map((s) => s.order), [...sorted.map((s) => s.order)].sort((a, b) => a - b));
  assert.ok(activeHealthServices().every((s) => s.status === 'active'));
  assert.ok(sorted.length >= 4, 'the four required services must exist');

  const related = relatedHealthServices('audit-contracts');
  assert.ok(related.length > 0 && related.length <= 3);
  assert.ok(!related.some((s) => s.slug === 'audit-contracts'));
  // هم‌دسته‌ها اول می‌آیند (صلاحیت بهداشت هم‌دسته ممیزی است)
  assert.equal(related[0].slug, 'hygiene-qualification');
});

test('office facts match the published contact details', () => {
  assert.equal(office477.phones.length, 2);
  for (const p of office477.phones) {
    assert.match(p.dial, /^\+98\d{9,11}$/, p.dial);
  }
  assert.equal(healthOffice.geo.latitude, 36.2678594);
  assert.equal(healthOffice.geo.longitude, 50.0135519);
  assert.ok(healthOffice.mapsUrl.includes('36.2678594,50.0135519'));
  assert.match(healthOffice.address, /قزوین/);
  assert.match(healthOffice.address, /طالقانی/);
  // ساعات کاری تأییدنشده عمداً خالی است تا ساعت اشتباه منتشر نشود.
  assert.equal(office477.hours, null);
});
