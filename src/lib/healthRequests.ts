/**
 * قرارداد مشترک فرم‌های درخواست بخش خدمات سلامت ۴۷۷.
 *
 * این ماژول عمداً بدون وابستگی به فریم‌ورک نوشته شده است تا:
 *  ۱. در مرورگر (جزیره React) برای اعتبارسنجی پیش از ارسال استفاده شود،
 *  ۲. در هر بک‌اند آینده (form-server یا سرویس دیگر) برای اعتبارسنجی سمت سرور
 *     استفاده شود — همان الگویی که در `src/lib/validation.ts` برای فرم‌های
 *     RFQ/تماس سایت به کار رفته است.
 *
 * ⚠ وضعیت فعلی استقرار: بک‌اند اختصاصی این فرم‌ها هنوز راه‌اندازی نشده است.
 * تا زمانی که `PUBLIC_HEALTH_FORM_ENDPOINT` تنظیم نشود، فرم هیچ داده‌ای ارسال
 * نمی‌کند و «موفقیت» یا «کد پیگیری» ساختگی نمایش نمی‌دهد؛ در عوض وضعیت
 * «عدم اتصال به سامانه» را صادقانه اعلام می‌کند و راه‌های جایگزین
 * (تماس، پیامک، کپی خلاصه درخواست) را در اختیار کاربر می‌گذارد.
 */
// پسوند .ts صریح است تا این ماژول هم در Vite و هم در Node (تست‌ها و form-server آینده) قابل import باشد.
import { normalizeDigits } from './validation.ts';

/* ------------------------------------------------------------------ */
/* محدودیت‌ها و الگوها                                                 */
/* ------------------------------------------------------------------ */

export const HEALTH_LIMITS = {
  name: 120,
  phone: 20,
  organization: 160,
  contactPerson: 120,
  subject: 200,
  message: 2000,
  activity: 400,
} as const;

export type HealthFieldKey =
  | 'name'
  | 'phone'
  | 'requestType'
  | 'subject'
  | 'message'
  | 'consent'
  | 'organization'
  | 'contactPerson'
  | 'activity'
  | 'course';

export type HealthErrorCode = 'required' | 'phone' | 'tooLong' | 'invalid';

export type HealthErrors = Partial<Record<HealthFieldKey, HealthErrorCode>>;

export interface HealthRequestInput {
  service: string;
  requestType: string;
  name: string;
  phone: string;
  subject?: string;
  message: string;
  consent: boolean;
  /** فیلدهای اختصاصی هر خدمت (از `extraFields` در content/health.ts می‌آیند). */
  organization?: string;
  contactPerson?: string;
  activity?: string;
  course?: string;
  /** تله هرزنامه: کاربر واقعی این فیلد را خالی می‌گذارد. */
  website?: string;
}

/** شکل پیکربندی اعتبارسنجی که از داده‌های هر خدمت ساخته می‌شود. */
export interface HealthRequestRules {
  /** مقدارهای مجاز «نوع درخواست». */
  allowedRequestTypes: string[];
  /** مقدارهای مجاز فیلدهای select اختصاصی (مثل انتخاب دوره). */
  allowedOptionValues?: Record<string, string[]>;
  /** فیلدهای اختصاصی اجباری، کلید به کلید. */
  requiredFields?: HealthFieldKey[];
  /** طول مجاز فیلدهای اختصاصی. */
  maxLengths?: Partial<Record<HealthFieldKey, number>>;
}

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

/** شماره تماس ایرانی: همراه یا ثابت، با ارقام فارسی/عربی یا لاتین. */
const PHONE = /^(\+98|0)?9\d{9}$|^(\+98|0)?\d{2,3}\d{6,8}$/;

export function isHealthPhone(v: string) {
  return PHONE.test(normalizeDigits(v).replace(/[\s()-]/g, ''));
}

/* ------------------------------------------------------------------ */
/* اعتبارسنجی                                                          */
/* ------------------------------------------------------------------ */

/**
 * اعتبارسنجی یک درخواست خدمات سلامت. آبجکت خالی یعنی ورودی معتبر است.
 * این تابع باید هم در مرورگر و هم در سرور اجرا شود.
 */
export function validateHealthRequest(input: HealthRequestInput, rules: HealthRequestRules): HealthErrors {
  const e: HealthErrors = {};
  const limits = { ...defaultMaxLengths(), ...(rules.maxLengths ?? {}) };
  const required = new Set(rules.requiredFields ?? []);

  const name = str(input.name);
  if (!name) e.name = 'required';
  else if (name.length > limits.name) e.name = 'tooLong';

  const phone = str(input.phone);
  if (!phone) e.phone = 'required';
  else if (phone.length > limits.phone) e.phone = 'tooLong';
  else if (!isHealthPhone(phone)) e.phone = 'phone';

  const requestType = str(input.requestType);
  if (!requestType) e.requestType = 'required';
  else if (!rules.allowedRequestTypes.includes(requestType)) e.requestType = 'invalid';

  const message = str(input.message);
  if (!message) e.message = 'required';
  else if (message.length > limits.message) e.message = 'tooLong';

  const subject = str(input.subject);
  if (subject.length > limits.subject) e.subject = 'tooLong';

  if (input.consent !== true) e.consent = 'required';

  for (const field of ['organization', 'contactPerson', 'activity', 'course'] as const) {
    const value = str(input[field]);
    if (required.has(field) && !value) {
      e[field] = 'required';
      continue;
    }
    if (value && value.length > limits[field]) {
      e[field] = 'tooLong';
      continue;
    }
    const allowed = rules.allowedOptionValues?.[field];
    if (allowed && value && !allowed.includes(value)) e[field] = 'invalid';
  }

  return e;
}

function defaultMaxLengths(): Record<'name' | 'phone' | 'organization' | 'contactPerson' | 'subject' | 'message' | 'activity' | 'course', number> {
  return {
    name: HEALTH_LIMITS.name,
    phone: HEALTH_LIMITS.phone,
    organization: HEALTH_LIMITS.organization,
    contactPerson: HEALTH_LIMITS.contactPerson,
    subject: HEALTH_LIMITS.subject,
    message: HEALTH_LIMITS.message,
    activity: HEALTH_LIMITS.activity,
    course: 60,
  };
}

/* ------------------------------------------------------------------ */
/* کمکی: خلاصه درخواست (کپی / پیامک)                                   */
/* ------------------------------------------------------------------ */

export interface SummaryLine {
  label: string;
  value: string;
}

/**
 * ساخت خلاصه خوانای درخواست. وقتی بک‌اند متصل نیست، کاربر می‌تواند این
 * خلاصه را کپی کند یا با پیامک به شماره دفتر بفرستد — یک کانال واقعی و
 * قابل استفاده، به‌جای نمایش موفقیت ساختگی.
 */
export function buildRequestSummary(lines: SummaryLine[], officeName: string): string {
  const body = lines
    .filter((l) => str(l.value).length > 0)
    .map((l) => `${l.label}: ${str(l.value)}`)
    .join('\n');
  return `درخواست خدمات — ${officeName}\n${body}`;
}

/** ساخت لینک `sms:` با متن پیش‌پر شده برای ارسال خلاصه درخواست به دفتر. */
export function buildSmsLink(dialNumber: string, text: string): string {
  return `sms:${dialNumber}?&body=${encodeURIComponent(text)}`;
}

/* ------------------------------------------------------------------ */
/* کد پیگیری — فقط سمت سرور                                            */
/* ------------------------------------------------------------------ */

/**
 * تولید کد پیگیری یکتا برای یک درخواست ذخیره‌شده.
 *
 * ⚠ این تابع تنها باید توسط بک‌اند واقعی و پس از ذخیره موفق درخواست فراخوانی
 * شود. کلاینت هرگز کد پیگیری نمی‌سازد؛ نمایش کدی که به هیچ رکوردی اشاره
 * نکند، «موفقیت ساختگی» است و در این پروژه ممنوع.
 *
 * قالب: 477-XXXXXX (شش رقم، بدون صفرهای مبهم برای خوانایی تلفنی).
 */
export function createTrackingCode(random: () => number = Math.random): string {
  let digits = '';
  while (digits.length < 6) {
    const n = Math.floor(random() * 10);
    digits += String(n);
  }
  return `477-${digits}`;
}

/* ------------------------------------------------------------------ */
/* قرارداد بک‌اند (برای پیاده‌سازی آینده)                               */
/* ------------------------------------------------------------------ */

/**
 * قرارداد endpoint ثبت درخواست. هر بک‌اندی که این قرارداد را پیاده کند
 * بدون تغییر در فرم‌ها قابل استفاده است.
 *
 * POST {PUBLIC_HEALTH_FORM_ENDPOINT}
 *   Content-Type: application/json  (یا multipart/form-data)
 *   Body: HealthRequestPayload
 *
 * پاسخ‌ها:
 *   201 { ok: true, trackingCode: string, status: 'received' }  — ذخیره شد
 *   422 { ok: false, errors: HealthErrors }                     — اعتبارسنجی سرور
 *   429 { ok: false, error: 'rate-limited' }                    — محدودیت نرخ
 *   403 { ok: false, error: 'forbidden-origin' }                — مبدأ نامجاز
 */
export interface HealthRequestPayload extends HealthRequestInput {
  locale: 'fa';
  /** زمان پر شدن فرم در مرورگر؛ برای تشخیص ارسال‌های رباتیک. */
  clientStartedAt?: string;
}

export interface HealthRequestAccepted {
  ok: true;
  trackingCode: string;
  status: string;
}

export interface HealthRequestRejected {
  ok: false;
  errors?: HealthErrors;
  error?: string;
}
