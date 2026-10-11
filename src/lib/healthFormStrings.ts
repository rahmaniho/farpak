/**
 * تنها رشته‌های رابط کاربری که فرم درخواست بخش سلامت لازم دارد.
 *
 * جزیره‌های React متن‌ها را به‌صورت prop دریافت می‌کنند و آن props به شکل JSON
 * درون HTML نوشته می‌شوند. اگر کل دیکشنری (`dictionaries.fa` با ~۳۰۰ کلید)
 * پاس داده شود، حجم هر صفحه چند برابر می‌شود؛ بنابراین فقط کلیدهای موردنیاز
 * فرم انتخاب می‌شوند.
 */
import { dictionaries, type Locale } from '../i18n/utils';

/** کلیدهای i18n موردنیاز `HealthRequestForm` (با فهرست استفاده‌های آن همگام است). */
export const HEALTH_FORM_KEYS = [
  'healthFieldName',
  'healthFieldPhone',
  'healthFieldPhoneHint',
  'healthFieldService',
  'healthFieldServiceHint',
  'healthFieldRequestType',
  'healthFieldRequestTypePlaceholder',
  'healthFieldSubject',
  'healthFieldMessage',
  'healthFieldMessageHint',
  'healthFieldConsent',
  'healthFormPrivacy',
  'healthRequestIntro',
  'healthSubmit',
  'healthSubmitting',
  'healthFormErrRequired',
  'healthFormErrPhone',
  'healthFormErrTooLong',
  'healthFormErrInvalid',
  'healthFormErrorsSummary',
  'healthFormSuccessTitle',
  'healthFormTrackingLabel',
  'healthFormSuccessBody',
  'healthFormNotSentTitle',
  'healthFormNotSentBody',
  'healthFormNotConnectedTitle',
  'healthFormNotConnectedBody',
  'healthFormCopySummary',
  'healthFormCopied',
  'healthFormSms',
  'healthFormCallInstead',
  'healthFormCallHint',
  'healthFormEdit',
  'healthFormServerError',
  'healthFormRateLimit',
  'healthFormValidationFailed',
  'healthShareCopyFailed',
] as const;

export type HealthFormKey = (typeof HEALTH_FORM_KEYS)[number];

/** دیکشنری فشرده مخصوص فرم؛ کلید جاافتاده = خطای برنامه‌نویسی. */
export function healthFormStrings(locale: Locale): Record<HealthFormKey, string> {
  const dict = dictionaries[locale] as unknown as Record<string, string>;
  const fallback = dictionaries.fa as unknown as Record<string, string>;
  const out = {} as Record<HealthFormKey, string>;
  for (const key of HEALTH_FORM_KEYS) {
    const value = dict[key] ?? fallback[key];
    if (typeof value !== 'string') throw new Error(`missing i18n key for the health form: ${key}`);
    out[key] = value;
  }
  return out;
}
