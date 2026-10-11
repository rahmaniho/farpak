/**
 * فرم ثبت درخواست اولیه — بخش خدمات سلامت ۴۷۷.
 *
 * طراحی صادقانه:
 *  - اگر `PUBLIC_HEALTH_FORM_ENDPOINT` تنظیم شده باشد، درخواست واقعاً به همان
 *    endpoint ارسال می‌شود و کد پیگیری تنها از پاسخ سرور نمایش داده می‌شود.
 *  - اگر تنظیم نشده باشد (وضعیت فعلی استقرار)، فرم هیچ داده‌ای ارسال نمی‌کند و
 *    «موفقیت» یا «کد پیگیری» ساختگی نشان نمی‌دهد؛ در عوض وضعیت «عدم اتصال به
 *    سامانه» را اعلام می‌کند و سه راه واقعی جایگزین می‌دهد: تماس با دفتر،
 *    ارسال پیامک پیش‌پر شده و کپی خلاصه درخواست.
 *
 * امنیت و حریم خصوصی:
 *  - اعتبارسنجی با `validateHealthRequest` (همین قواعد باید سمت سرور هم اجرا شود).
 *  - فیلد تله هرزنامه (honeypot) و محدودیت طول متن‌ها.
 *  - اطلاعات هویتی/سلامتی (کد ملی، سابقه بیماری و…) عمداً دریافت نمی‌شود.
 *  - رضایت آگاهانه پیش از ارسال الزامی است.
 */
import { useEffect, useMemo, useState, type FormEvent } from 'react';
import {
  buildRequestSummary,
  buildSmsLink,
  HEALTH_LIMITS,
  validateHealthRequest,
  type HealthErrorCode,
  type HealthErrors,
  type HealthFieldKey,
  type HealthRequestAccepted,
  type HealthRequestRejected,
} from '../../lib/healthRequests';
import { toFaDigits } from '../../lib/format';
import type { ExtraField, RequestOption } from '../../content/health';

interface OfficeInfo {
  name: string;
  phones: { label: string; display: string; dial: string }[];
}

interface Props {
  locale: 'fa' | 'en';
  serviceSlug: string;
  serviceTitle: string;
  requestTypes: RequestOption[];
  extraFields: ExtraField[];
  office: OfficeInfo;
  /** تمام متن‌های رابط کاربری (از Astro پاس داده می‌شود). */
  t: Record<string, string>;
  /** مقدارهای مجاز فیلدهای select (مثل شناسه دوره‌ها). */
  allowedOptionValues?: Record<string, string[]>;
  /** شناسه فیلد select که از `?course=` پیش‌پر می‌شود. */
  prefillParam?: string;
  /**override برای `PUBLIC_HEALTH_FORM_ENDPOINT` (برای تست). */
  endpoint?: string;
}

type Values = Record<string, string> & { consent: string };

const ENDPOINT: string = import.meta.env.PUBLIC_HEALTH_FORM_ENDPOINT || '';

const fieldClass =
  'mt-1.5 w-full rounded-md border border-slate-300 bg-white px-3 py-2.5 text-ink transition focus:border-teal focus:ring-2 focus:ring-teal/30 aria-[invalid=true]:border-danger';
const labelClass = 'block text-sm font-medium text-ink';
const errClass = 'mt-1 text-sm font-medium text-danger';
const hintClass = 'mt-1 text-xs text-slate-500';

export default function HealthRequestForm({
  locale,
  serviceSlug,
  serviceTitle,
  requestTypes,
  extraFields,
  office,
  t,
  allowedOptionValues,
  prefillParam = 'course',
  endpoint,
}: Props) {
  const target = endpoint ?? ENDPOINT;
  const connected = target.trim().length > 0;

  const initialValues = useMemo<Values>(() => {
    const v: Values = { requestType: '', subject: '', message: '', website: '', consent: '' };
    for (const f of extraFields) v[f.name] = '';
    return v;
  }, [extraFields]);

  const [values, setValues] = useState<Values>(initialValues);
  const [errors, setErrors] = useState<HealthErrors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'sent' | 'notSent' | 'error'>('idle');
  const [serverMessage, setServerMessage] = useState('');
  const [trackingCode, setTrackingCode] = useState('');
  const [copied, setCopied] = useState('');
  const [startedAt] = useState(() => Date.now());

  /**
   * پیش‌پر کردن از نشانی صفحه (مثلاً `?course=food-hygiene` از دکمه
   * «ثبت‌نام در این دوره»). بعد از mount انجام می‌شود تا خروجی SSR و
   * هیدریشن یکسان بمانند.
   */
  useEffect(() => {
    const param = new URLSearchParams(window.location.search).get(prefillParam);
    const allowed = allowedOptionValues?.[prefillParam];
    if (!param || (allowed && !allowed.includes(param))) return;
    setValues((prev) => ({ ...prev, [prefillParam]: param }));
    document.getElementById('health-request')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  }, [prefillParam, allowedOptionValues]);

  const set = (key: string, value: string) => setValues((prev) => ({ ...prev, [key]: value }));

  const requiredFields = useMemo(
    () => extraFields.filter((f) => f.required).map((f) => f.name as HealthFieldKey),
    [extraFields]
  );
  const maxLengths = useMemo(() => {
    const map: Partial<Record<HealthFieldKey, number>> = {};
    for (const f of extraFields) {
      if (f.maxLength) map[f.name as HealthFieldKey] = f.maxLength;
    }
    return map;
  }, [extraFields]);

  const messageFor = (code: HealthErrorCode): string => {
    switch (code) {
      case 'phone':
        return t.healthFormErrPhone;
      case 'tooLong':
        return t.healthFormErrTooLong;
      case 'invalid':
        return t.healthFormErrInvalid;
      case 'required':
      default:
        return t.healthFormErrRequired;
    }
  };

  function validate(): HealthErrors {
    return validateHealthRequest(
      {
        service: serviceSlug,
        requestType: values.requestType,
        name: values.name ?? '',
        phone: values.phone ?? '',
        subject: values.subject,
        message: values.message,
        consent: values.consent === 'on',
        organization: values.organization,
        contactPerson: values.contactPerson,
        activity: values.activity,
        course: values.course,
        website: values.website,
      },
      {
        allowedRequestTypes: requestTypes.map((r) => r.value),
        allowedOptionValues,
        requiredFields,
        maxLengths,
      }
    );
  }

  /** خلاصه خوانای درخواست — برای کپی یا ارسال با پیامک. */
  const summary = useMemo(() => {
    const requestTypeLabel = requestTypes.find((r) => r.value === values.requestType)?.label ?? values.requestType;
    const lines = [
      { label: t.healthFieldService.replace(' *', ''), value: serviceTitle },
      { label: t.healthFieldRequestType.replace(' *', ''), value: requestTypeLabel },
      { label: t.healthFieldName.replace(' *', ''), value: values.name ?? '' },
      { label: t.healthFieldPhone.replace(' *', ''), value: values.phone ?? '' },
      ...extraFields.map((f) => {
        const raw = values[f.name] ?? '';
        const label = f.type === 'select' ? (f.options?.find((o) => o.value === raw)?.label ?? raw) : raw;
        return { label: f.label.replace(' *', ''), value: label };
      }),
      { label: t.healthFieldSubject.replace(' *', ''), value: values.subject ?? '' },
      { label: t.healthFieldMessage.replace(' *', ''), value: values.message ?? '' },
    ];
    return buildRequestSummary(lines, office.name);
  }, [values, extraFields, requestTypes, serviceTitle, office.name, t]);

  const smsHref = useMemo(() => buildSmsLink(office.phones[0].dial, summary), [office.phones, summary]);

  async function copySummary() {
    let ok = false;
    try {
      if (navigator.clipboard && window.isSecureContext) {
        await navigator.clipboard.writeText(summary);
        ok = true;
      }
    } catch {
      ok = false;
    }
    if (!ok) {
      try {
        const area = document.createElement('textarea');
        area.value = summary;
        area.setAttribute('readonly', '');
        area.style.position = 'fixed';
        area.style.opacity = '0';
        document.body.appendChild(area);
        area.select();
        ok = document.execCommand('copy');
        area.remove();
      } catch {
        ok = false;
      }
    }
    setCopied(ok ? t.healthFormCopied : t.healthShareCopyFailed);
    window.setTimeout(() => setCopied(''), 5000);
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setServerMessage('');
    setCopied('');

    // تله هرزنامه: ربات‌ها این فیلد را پر می‌کنند؛ بدون پیام خاص متوقف می‌شویم.
    if (values.website) {
      setStatus('notSent');
      return;
    }

    const found = validate();
    setErrors(found);
    if (Object.keys(found).length > 0) {
      setStatus('idle');
      document.getElementById('health-form-error-summary')?.focus();
      return;
    }

    if (!connected) {
      // هیچ داده‌ای ارسال نمی‌شود و هیچ موفقیت ساختگی نمایش داده نمی‌شود.
      setStatus('notSent');
      return;
    }

    setStatus('sending');
    try {
      const res = await fetch(target, {
        method: 'POST',
        headers: { 'content-type': 'application/json', accept: 'application/json' },
        body: JSON.stringify({
          locale: 'fa',
          service: serviceSlug,
          requestType: values.requestType,
          name: values.name,
          phone: values.phone,
          subject: values.subject ?? '',
          message: values.message,
          consent: true,
          organization: values.organization ?? '',
          contactPerson: values.contactPerson ?? '',
          activity: values.activity ?? '',
          course: values.course ?? '',
          clientStartedAt: new Date(startedAt).toISOString(),
        }),
      });

      if (res.status === 429) {
        setServerMessage(t.healthFormRateLimit);
        setStatus('error');
        return;
      }
      if (res.status === 403) {
        setServerMessage(t.healthFormServerError);
        setStatus('error');
        return;
      }
      if (res.status === 422) {
        const body = (await res.json().catch(() => null)) as HealthRequestRejected | null;
        setErrors(body?.errors ?? {});
        setServerMessage(t.healthFormValidationFailed);
        setStatus('error');
        document.getElementById('health-form-error-summary')?.focus();
        return;
      }
      if (!res.ok) throw new Error(String(res.status));

      const body = (await res.json()) as HealthRequestAccepted;
      // کد پیگیری فقط از پاسخ سرور واقعی خوانده می‌شود.
      if (!body?.ok || !body.trackingCode) throw new Error('no-tracking-code');
      setTrackingCode(body.trackingCode);
      setStatus('sent');
    } catch {
      setServerMessage(t.healthFormServerError);
      setStatus('error');
    }
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [string, HealthErrorCode][];
  const messageLength = (values.message ?? '').length;

  /* ------------------------------ حالت‌ها ------------------------------ */

  if (status === 'sent') {
    return (
      <div role="status" className="rounded-2xl border border-health/40 bg-health-soft p-6 md:p-8">
        <p className="flex items-center gap-2 text-lg font-bold text-health">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" aria-hidden="true">
            <path d="m4.75 12.5 4.5 4.5 10-10.5" />
          </svg>
          {t.healthFormSuccessTitle}
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-700">
          {t.healthFormTrackingLabel}: <span dir="ltr" className="font-bold tabular-nums">{trackingCode}</span>
        </p>
        <p className="mt-2 text-sm text-slate-600">{t.healthFormSuccessBody}</p>
      </div>
    );
  }

  if (status === 'notSent') {
    return (
      <div role="status" className="rounded-2xl border border-warning/40 bg-warning/5 p-6 md:p-8">
        <p className="flex flex-wrap items-center gap-2 text-lg font-bold text-[#8a5200]">
          <svg viewBox="0 0 24 24" className="size-6" fill="none" stroke="currentColor" strokeWidth="1.75" strokeLinecap="round" aria-hidden="true">
            <circle cx="12" cy="12" r="9.25" /><path d="M12 7.75v5" /><path d="M12 16.2h.01" />
          </svg>
          {t.healthFormNotSentTitle}
        </p>
        <p className="mt-3 text-sm leading-7 text-slate-700">{t.healthFormNotSentBody}</p>

        <div className="mt-5 rounded-xl border border-slate-200 bg-white p-4">
          <p className="text-xs font-semibold text-navy">{t.healthFormCopySummary}</p>
          <pre dir="rtl" style={{ fontFamily: 'inherit' }} className="mt-2 max-h-48 overflow-auto whitespace-pre-wrap text-xs leading-6 text-slate-600">{summary}</pre>
        </div>

        <div className="mt-5 flex flex-wrap gap-3">
          {office.phones.map((p) => (
            <a key={p.dial} href={`tel:${p.dial}`} className="inline-flex items-center gap-2 rounded-md bg-health px-4 py-2.5 text-sm font-semibold text-white transition hover:brightness-95">
              {t.healthFormCallInstead} <span dir="ltr" className="tabular-nums">{p.display}</span>
            </a>
          ))}
          <button type="button" onClick={copySummary} className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-teal hover:text-teal">
            {t.healthFormCopySummary}
          </button>
          <a href={smsHref} className="rounded-md border border-slate-300 bg-white px-4 py-2.5 text-sm font-semibold text-ink transition hover:border-teal hover:text-teal">
            {t.healthFormSms}
          </a>
          <button
            type="button"
            onClick={() => { setStatus('idle'); setErrors({}); }}
            className="rounded-md px-3 py-2.5 text-sm font-medium text-teal underline-offset-4 hover:underline"
          >
            {t.healthFormEdit}
          </button>
        </div>
        {copied && <p className="mt-3 text-xs font-medium text-health" role="status">{copied}</p>}
      </div>
    );
  }

  /* ------------------------------ فرم ------------------------------ */

  return (
    <div>
      {/* وضعیت اتصال سامانه — همیشه صادقانه اعلام می‌شود */}
      <div
        className={`mb-6 rounded-xl border p-4 text-sm leading-7 ${connected ? 'border-health/40 bg-health-soft text-slate-700' : 'border-warning/40 bg-warning/5 text-slate-700'}`}
        role="note"
      >
        <p className="font-semibold text-navy">{t.healthFormNotConnectedTitle}</p>
        <p className="mt-1">{connected ? t.healthRequestIntro : t.healthFormNotConnectedBody}</p>
        {!connected && (
          <p className="mt-2 flex flex-wrap gap-3 text-xs font-medium">
            {office.phones.map((p) => (
              <a key={p.dial} href={`tel:${p.dial}`} className="inline-flex items-center gap-1.5 rounded-md border border-slate-300 bg-white px-3 py-1.5 text-ink hover:border-health hover:text-health">
                <span dir="ltr" className="tabular-nums">{p.display}</span>
              </a>
            ))}
          </p>
        )}
      </div>

      <form noValidate onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2" aria-describedby="health-form-privacy">
        {errorList.length > 0 && (
          <div
            id="health-form-error-summary"
            tabIndex={-1}
            role="alert"
            className="rounded-xl border border-danger bg-danger/5 p-4 text-danger md:col-span-2"
          >
            <p className="font-semibold">{t.healthFormErrorsSummary}</p>
            <ul className="mt-2 list-disc space-y-1 ps-5 text-sm">
              {errorList.map(([key, code]) => (
                <li key={key}>
                  <a href={`#hf-${key}`} className="underline underline-offset-4">
                    {labelForKey(key, extraFields, t)}
                  </a>
                  : {messageFor(code)}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* تله هرزنامه: از دید کاربر و فناوری کمکی پنهان است */}
        <div aria-hidden="true" className="absolute -start-[9999px] h-0 overflow-hidden">
          <label htmlFor="hf-website">Website</label>
          <input
            id="hf-website"
            name="website"
            tabIndex={-1}
            autoComplete="off"
            value={values.website ?? ''}
            onChange={(ev) => set('website', ev.target.value)}
          />
        </div>

        <div>
          <label htmlFor="hf-name" className={labelClass}>{t.healthFieldName}</label>
          <input
            id="hf-name" name="hf-name" autoComplete="name" className={fieldClass} value={values.name ?? ''}
            aria-invalid={!!errors.name} aria-describedby={errors.name ? 'he-name' : undefined}
            maxLength={HEALTH_LIMITS.name}
            onChange={(ev) => set('name', ev.target.value)}
          />
          {errors.name && <p id="he-name" className={errClass}>{messageFor(errors.name)}</p>}
        </div>

        <div>
          <label htmlFor="hf-phone" className={labelClass}>{t.healthFieldPhone}</label>
          <input
            id="hf-phone" name="hf-phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" className={`${fieldClass} text-start`}
            value={values.phone ?? ''} aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'he-phone' : 'hf-phone-hint'}
            maxLength={HEALTH_LIMITS.phone} placeholder="09xxxxxxxxx"
            onChange={(ev) => set('phone', ev.target.value)}
          />
          {errors.phone
            ? <p id="he-phone" className={errClass}>{messageFor(errors.phone)}</p>
            : <p id="hf-phone-hint" className={hintClass}>{t.healthFieldPhoneHint}</p>}
        </div>

        <div>
          <label htmlFor="hf-service" className={labelClass}>{t.healthFieldService}</label>
          <input id="hf-service" className={`${fieldClass} bg-mist text-slate-600`} value={serviceTitle} readOnly />
          <p className={hintClass}>{t.healthFieldServiceHint}</p>
        </div>

        <div>
          <label htmlFor="hf-requestType" className={labelClass}>{t.healthFieldRequestType}</label>
          <select
            id="hf-requestType" name="hf-requestType" className={fieldClass} value={values.requestType ?? ''}
            aria-invalid={!!errors.requestType} aria-describedby={errors.requestType ? 'he-requestType' : undefined}
            onChange={(ev) => set('requestType', ev.target.value)}
          >
            <option value="">{t.healthFieldRequestTypePlaceholder}</option>
            {requestTypes.map((r) => (
              <option key={r.value} value={r.value}>{r.label}</option>
            ))}
          </select>
          {errors.requestType && <p id="he-requestType" className={errClass}>{messageFor(errors.requestType)}</p>}
        </div>

        {extraFields.map((f) => (
          <div key={f.name} className={f.type === 'textarea' ? 'md:col-span-2' : undefined}>
            <label htmlFor={`hf-${f.name}`} className={labelClass}>
              {f.label}{f.required ? ' *' : ''}
            </label>
            {f.type === 'select' ? (
              <select
                id={`hf-${f.name}`} name={`hf-${f.name}`} className={fieldClass} value={values[f.name] ?? ''}
                aria-invalid={!!errors[f.name as HealthFieldKey]}
                aria-describedby={errors[f.name as HealthFieldKey] ? `he-${f.name}` : f.hint ? `hh-${f.name}` : undefined}
                onChange={(ev) => set(f.name, ev.target.value)}
              >
                {(f.options ?? []).map((o) => <option key={o.value} value={o.value}>{o.label}</option>)}
              </select>
            ) : f.type === 'textarea' ? (
              <textarea
                id={`hf-${f.name}`} name={`hf-${f.name}`} rows={3} className={fieldClass} value={values[f.name] ?? ''}
                placeholder={f.placeholder} maxLength={f.maxLength ?? HEALTH_LIMITS.activity}
                aria-invalid={!!errors[f.name as HealthFieldKey]}
                aria-describedby={errors[f.name as HealthFieldKey] ? `he-${f.name}` : f.hint ? `hh-${f.name}` : undefined}
                onChange={(ev) => set(f.name, ev.target.value)}
              />
            ) : (
              <input
                id={`hf-${f.name}`} name={`hf-${f.name}`} type={f.type} className={fieldClass} value={values[f.name] ?? ''}
                placeholder={f.placeholder} autoComplete={f.autoComplete} maxLength={f.maxLength ?? HEALTH_LIMITS.organization}
                aria-invalid={!!errors[f.name as HealthFieldKey]}
                aria-describedby={errors[f.name as HealthFieldKey] ? `he-${f.name}` : f.hint ? `hh-${f.name}` : undefined}
                onChange={(ev) => set(f.name, ev.target.value)}
              />
            )}
            {errors[f.name as HealthFieldKey]
              ? <p id={`he-${f.name}`} className={errClass}>{messageFor(errors[f.name as HealthFieldKey] as HealthErrorCode)}</p>
              : f.hint && <p id={`hh-${f.name}`} className={hintClass}>{f.hint}</p>}
          </div>
        ))}

        <div className="md:col-span-2">
          <label htmlFor="hf-subject" className={labelClass}>{t.healthFieldSubject}</label>
          <input
            id="hf-subject" name="hf-subject" className={fieldClass} value={values.subject ?? ''}
            maxLength={HEALTH_LIMITS.subject}
            aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'he-subject' : undefined}
            onChange={(ev) => set('subject', ev.target.value)}
          />
          {errors.subject && <p id="he-subject" className={errClass}>{messageFor(errors.subject)}</p>}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="hf-message" className={labelClass}>{t.healthFieldMessage}</label>
          <textarea
            id="hf-message" name="hf-message" rows={5} className={fieldClass} value={values.message ?? ''}
            maxLength={HEALTH_LIMITS.message}
            aria-invalid={!!errors.message} aria-describedby={errors.message ? 'he-message' : 'hf-message-hint'}
            onChange={(ev) => set('message', ev.target.value)}
          />
          {errors.message
            ? <p id="he-message" className={errClass}>{messageFor(errors.message)}</p>
            : (
              <p id="hf-message-hint" className={hintClass}>
                {t.healthFieldMessageHint} <span dir="ltr" className="tabular-nums">({toFaDigits(messageLength)}/{toFaDigits(HEALTH_LIMITS.message)})</span>
              </p>
            )}
        </div>

        <div className="md:col-span-2">
          <label htmlFor="hf-consent" className="flex items-start gap-3 rounded-xl bg-mist p-4 text-sm leading-6">
            <input
              id="hf-consent" name="hf-consent" type="checkbox" className="mt-1 size-4 shrink-0 accent-health"
              checked={values.consent === 'on'} aria-invalid={!!errors.consent}
              aria-describedby={errors.consent ? 'he-consent' : 'health-form-privacy'}
              onChange={(ev) => set('consent', ev.target.checked ? 'on' : '')}
            />
            <span>
              {t.healthFieldConsent}
              <span id="health-form-privacy" className="mt-1 block text-xs text-slate-500">{t.healthFormPrivacy}</span>
            </span>
          </label>
          {errors.consent && <p id="he-consent" className={errClass}>{messageFor(errors.consent)}</p>}
        </div>

        <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
          <p className="text-xs text-slate-500">{connected ? t.healthRequestIntro : t.healthFormCallHint}</p>
          <button
            type="submit"
            disabled={status === 'sending'}
            className="inline-flex items-center justify-center gap-2 rounded-md bg-navy px-6 py-3 font-semibold text-white transition hover:bg-teal disabled:opacity-60"
          >
            {status === 'sending' ? t.healthSubmitting : t.healthSubmit}
          </button>
        </div>

        {status === 'error' && (
          <p role="alert" className="text-sm font-medium text-danger md:col-span-2">
            {serverMessage || t.healthFormServerError}
          </p>
        )}
        {copied && <p role="status" className="text-xs font-medium text-health md:col-span-2">{copied}</p>}
      </form>
    </div>
  );
}

/** برچسب خوانا برای یک کلید خطا (در خلاصه خطاهای فرم). */
function labelForKey(key: string, extraFields: ExtraField[], t: Record<string, string>): string {
  const extra = extraFields.find((f) => f.name === key);
  if (extra) return extra.label.replace(' *', '');
  const map: Record<string, string> = {
    name: t.healthFieldName,
    phone: t.healthFieldPhone,
    requestType: t.healthFieldRequestType,
    subject: t.healthFieldSubject,
    message: t.healthFieldMessage,
    consent: t.healthFieldConsent,
  };
  return (map[key] ?? key).replace(' *', '');
}
