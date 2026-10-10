import { useState, type CSSProperties, type FormEvent } from 'react';
import { validateSubmission, type ErrorCode, type FormMode } from '../lib/validation';

interface Props {
  mode: FormMode;
  locale: 'fa' | 'en';
  services: { slug: string; title: string }[];
  defaultService?: string;
  /** All UI strings, passed from Astro so this island has no i18n dependency. */
  t: Record<string, string>;
}

type FieldKey = 'name' | 'company' | 'phone' | 'email' | 'subject' | 'message' | 'service' | 'location' | 'volume' | 'attachment';
type Errors = Partial<Record<FieldKey, string>>;

interface Values {
  name: string;
  company: string;
  phone: string;
  email: string;
  subject: string;
  message: string;
  service: string;
  location: string;
  volume: string;
  deadline: string;
  hse: boolean;
  website: string; // honeypot, must stay empty
}

// Same-origin by default. The dev server proxies /api to the form server.
// Trailing slash matches the site's trailingSlash: 'always' setting.
const ENDPOINT: string = import.meta.env.PUBLIC_FORM_ENDPOINT || '/api/submit/';

const fieldClass = 'field';
const labelClass = 'field-label';
const errClass = 'field-error';

export default function RequestForm({ mode, locale, services, defaultService = '', t }: Props) {
  const [values, setValues] = useState<Values>({
    name: '', company: '', phone: '', email: '', subject: '', message: '',
    service: defaultService, location: '', volume: '', deadline: '', hse: false, website: '',
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const [serverError, setServerError] = useState('');
  const isRfq = mode === 'rfq';

  const set = <K extends keyof Values>(k: K, v: Values[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  // Map validation codes to translated messages.
  const messageFor = (code: ErrorCode): string => {
    switch (code) {
      case 'email': return t.errEmail;
      case 'phone': return t.errPhone;
      case 'file': return t.errFile;
      case 'tooLong':
      case 'invalid':
      case 'required':
      default: return t.errRequired;
    }
  };

  function validate(): Errors {
    const codes = validateSubmission({
      mode,
      name: values.name,
      company: values.company,
      phone: values.phone,
      email: values.email,
      subject: values.subject,
      message: values.message,
      service: values.service,
      location: values.location,
      volume: values.volume,
      attachment: file ? { type: file.type, size: file.size } : null,
    });
    const out: Errors = {};
    (Object.keys(codes) as (keyof typeof codes)[]).forEach((k) => {
      const code = codes[k];
      if (code && k !== 'website') out[k as FieldKey] = messageFor(code);
    });
    return out;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    setServerError('');
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      document.getElementById('form-error-summary')?.focus();
      return;
    }
    setStatus('sending');
    try {
      const body = new FormData();
      const fields: Record<string, string> = {
        mode,
        locale,
        name: values.name,
        company: values.company,
        phone: values.phone,
        email: values.email,
        subject: values.subject,
        message: values.message,
        service: values.service,
        location: values.location,
        volume: values.volume,
        deadline: values.deadline,
        hse: String(values.hse),
        website: values.website,
      };
      Object.entries(fields).forEach(([k, v]) => body.append(k, v));
      if (file) body.append('attachment', file);
      const res = await fetch(ENDPOINT, { method: 'POST', body });
      if (res.status === 429) {
        setServerError(t.rateLimitMsg);
        setStatus('error');
        return;
      }
      if (res.status === 422) {
        // Server found something the client did not; show a general error.
        setServerError(t.errorMsg);
        setStatus('error');
        return;
      }
      if (!res.ok) throw new Error(String(res.status));
      setStatus('ok');
    } catch {
      setServerError(t.errorMsg);
      setStatus('error');
    }
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [string, string][];

  if (status === 'ok') {
    return (
      <p role="status" className="callout callout-ok font-medium">
        {t.successMsg}
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2" aria-describedby="form-privacy">
      {errorList.length > 0 && (
        <div id="form-error-summary" tabIndex={-1} role="alert" className="callout callout-danger md:col-span-2">
          <ul className="list-disc ps-5">
            {errorList.map(([k, v]) => <li key={k}>{v}</li>)}
          </ul>
        </div>
      )}

      {/* Honeypot: hidden from people and assistive tech, filled only by bots. */}
      <div aria-hidden="true" className="absolute -start-[9999px] h-0 overflow-hidden">
        <label htmlFor="f-website">Website</label>
        <input id="f-website" name="website" tabIndex={-1} autoComplete="off" value={values.website}
          onChange={(ev) => set('website', ev.target.value)} />
      </div>

      <div>
        <label htmlFor="f-name" className={labelClass}>{t.fieldName}</label>
        <input id="f-name" name="name" autoComplete="name" className={fieldClass} value={values.name}
          aria-invalid={!!errors.name} aria-describedby={errors.name ? 'e-name' : undefined}
          onChange={(ev) => set('name', ev.target.value)} />
        {errors.name && <p id="e-name" className={errClass}>{errors.name}</p>}
      </div>

      <div>
        <label htmlFor="f-company" className={labelClass}>{t.fieldCompany}</label>
        <input id="f-company" name="company" autoComplete="organization" className={fieldClass} value={values.company}
          onChange={(ev) => set('company', ev.target.value)} />
      </div>

      <div>
        <label htmlFor="f-phone" className={labelClass}>{t.fieldPhone}</label>
        <input id="f-phone" name="phone" type="tel" inputMode="tel" autoComplete="tel" dir="ltr" className={fieldClass} value={values.phone}
          aria-invalid={!!errors.phone} aria-describedby={errors.phone ? 'e-phone' : undefined}
          onChange={(ev) => set('phone', ev.target.value)} />
        {errors.phone && <p id="e-phone" className={errClass}>{errors.phone}</p>}
      </div>

      <div>
        <label htmlFor="f-email" className={labelClass}>{t.fieldEmail}</label>
        <input id="f-email" name="email" type="email" autoComplete="email" dir="ltr" className={fieldClass} value={values.email}
          aria-invalid={!!errors.email} aria-describedby={errors.email ? 'e-email' : undefined}
          onChange={(ev) => set('email', ev.target.value)} />
        {errors.email && <p id="e-email" className={errClass}>{errors.email}</p>}
      </div>

      {isRfq ? (
        <div>
          <label htmlFor="f-service" className={labelClass}>{t.fieldService}</label>
          <select id="f-service" name="service" className={fieldClass} value={values.service}
            aria-invalid={!!errors.service} aria-describedby={errors.service ? 'e-service' : undefined}
            onChange={(ev) => set('service', ev.target.value)}>
            <option value="">{t.fieldServicePlaceholder}</option>
            {services.map((s) => <option key={s.slug} value={s.slug}>{s.title}</option>)}
          </select>
          {errors.service && <p id="e-service" className={errClass}>{errors.service}</p>}
        </div>
      ) : (
        <div>
          <label htmlFor="f-subject" className={labelClass}>{t.fieldSubject}</label>
          <input id="f-subject" name="subject" className={fieldClass} value={values.subject}
            aria-invalid={!!errors.subject} aria-describedby={errors.subject ? 'e-subject' : undefined}
            onChange={(ev) => set('subject', ev.target.value)} />
          {errors.subject && <p id="e-subject" className={errClass}>{errors.subject}</p>}
        </div>
      )}

      {isRfq && (
        <>
          <div>
            <label htmlFor="f-location" className={labelClass}>{t.fieldLocation}</label>
            <input id="f-location" name="location" className={fieldClass} value={values.location}
              onChange={(ev) => set('location', ev.target.value)} />
          </div>
          <div>
            <label htmlFor="f-volume" className={labelClass}>{t.fieldVolume}</label>
            <input id="f-volume" name="volume" className={fieldClass} value={values.volume}
              onChange={(ev) => set('volume', ev.target.value)} />
          </div>
          <div>
            <label htmlFor="f-deadline" className={labelClass}>{t.fieldDeadline}</label>
            <input id="f-deadline" name="deadline" type="date" className={fieldClass} value={values.deadline}
              onChange={(ev) => set('deadline', ev.target.value)} />
          </div>
          <div>
            <label htmlFor="f-file" className={labelClass}>{t.fieldAttachment}</label>
            <input id="f-file" name="attachment" type="file" accept="application/pdf" className="field text-sm"
              aria-invalid={!!errors.attachment} aria-describedby={errors.attachment ? 'e-file' : undefined}
              onChange={(ev) => setFile(ev.target.files?.[0] ?? null)} />
            {errors.attachment && <p id="e-file" className={errClass}>{errors.attachment}</p>}
          </div>
          <label className="flex items-start gap-3 text-sm md:col-span-2">
            <input type="checkbox" name="hse" className="mt-1" checked={values.hse}
              onChange={(ev) => set('hse', ev.target.checked)} />
            <span className="text-fog">{t.fieldHse}</span>
          </label>
        </>
      )}

      <div className="md:col-span-2">
        <label htmlFor="f-message" className={labelClass}>{t.fieldMessage}</label>
        <textarea id="f-message" name="message" rows={5} className={fieldClass} value={values.message}
          aria-invalid={!!errors.message} aria-describedby={errors.message ? 'e-message' : undefined}
          onChange={(ev) => set('message', ev.target.value)} />
        {errors.message && <p id="e-message" className={errClass}>{errors.message}</p>}
      </div>

      <div className="flex flex-col gap-3 sm:flex-row sm:items-center sm:justify-between md:col-span-2">
        <p id="form-privacy" className="field-hint mt-0">{t.privacy}</p>
        <button type="submit" disabled={status === 'sending'} className="btn btn-primary" style={{ '--acc': 'var(--color-volt)' } as CSSProperties}>
          {status === 'sending' ? t.submitting : t.submit}
        </button>
      </div>

      {status === 'error' && (
        <p role="alert" className="callout callout-danger md:col-span-2">{serverError || t.errorMsg}</p>
      )}
    </form>
  );
}
