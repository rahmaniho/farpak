import { useState, type FormEvent } from 'react';
import { isEmail, isPhone, type Errors } from '../lib/validation';

type Mode = 'rfq' | 'contact';

interface Props {
  mode: Mode;
  locale: 'fa' | 'en';
  services: { slug: string; title: string }[];
  defaultService?: string;
  /** All UI strings, passed from Astro so this island has no i18n dependency. */
  t: Record<string, string>;
}

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
}

type FieldKey = keyof Values | 'file';

const MAX_FILE_BYTES = 10 * 1024 * 1024;
// Set PUBLIC_FORM_ENDPOINT to a server route/webhook that re-validates the payload.
const ENDPOINT: string | undefined = import.meta.env.PUBLIC_FORM_ENDPOINT || undefined;

const fieldClass =
  'mt-1 w-full rounded-md border border-slate-300 bg-white px-3 py-2 text-ink focus:border-teal focus:ring-2 focus:ring-teal/30 aria-[invalid=true]:border-danger';
const labelClass = 'block text-sm font-medium text-ink';
const errClass = 'mt-1 text-sm text-danger';

export default function RequestForm({ mode, locale, services, defaultService = '', t }: Props) {
  const [values, setValues] = useState<Values>({
    name: '', company: '', phone: '', email: '', subject: '', message: '',
    service: defaultService, location: '', volume: '', deadline: '', hse: false,
  });
  const [file, setFile] = useState<File | null>(null);
  const [errors, setErrors] = useState<Errors<Record<FieldKey, string>>>({});
  const [status, setStatus] = useState<'idle' | 'sending' | 'ok' | 'error'>('idle');
  const isRfq = mode === 'rfq';

  const set = <K extends keyof Values>(k: K, v: Values[K]) =>
    setValues((prev) => ({ ...prev, [k]: v }));

  function validate() {
    const e: Errors<Record<FieldKey, string>> = {};
    if (!values.name.trim()) e.name = t.errRequired;
    if (!values.phone.trim()) e.phone = t.errRequired;
    else if (!isPhone(values.phone)) e.phone = t.errPhone;
    if (!values.email.trim()) e.email = t.errRequired;
    else if (!isEmail(values.email)) e.email = t.errEmail;
    if (!values.message.trim()) e.message = t.errRequired;
    if (isRfq && !values.service) e.service = t.errRequired;
    if (!isRfq && !values.subject.trim()) e.subject = t.errRequired;
    if (file && (file.type !== 'application/pdf' || file.size > MAX_FILE_BYTES)) e.file = t.errFile;
    return e;
  }

  async function onSubmit(ev: FormEvent<HTMLFormElement>) {
    ev.preventDefault();
    const e = validate();
    setErrors(e);
    if (Object.keys(e).length > 0) {
      document.getElementById('form-error-summary')?.focus();
      return;
    }
    if (!ENDPOINT) {
      setStatus('error');
      return;
    }
    setStatus('sending');
    try {
      const body = new FormData();
      Object.entries({ ...values, mode, locale }).forEach(([k, v]) => body.append(k, String(v)));
      if (file) body.append('attachment', file);
      const res = await fetch(ENDPOINT, { method: 'POST', body });
      if (!res.ok) throw new Error(String(res.status));
      setStatus('ok');
    } catch {
      setStatus('error');
    }
  }

  const errorList = Object.entries(errors).filter(([, v]) => v) as [string, string][];

  if (status === 'ok') {
    return (
      <p role="status" className="rounded-md bg-success/10 p-6 font-medium text-success">
        {t.successMsg}
      </p>
    );
  }

  return (
    <form noValidate onSubmit={onSubmit} className="grid gap-5 md:grid-cols-2" aria-describedby="form-privacy">
      {errorList.length > 0 && (
        <div id="form-error-summary" tabIndex={-1} role="alert" className="rounded-md border border-danger p-4 text-danger md:col-span-2">
          <ul className="list-disc ps-5">
            {errorList.map(([k, v]) => <li key={k}>{v}</li>)}
          </ul>
        </div>
      )}

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
            <input id="f-file" name="attachment" type="file" accept="application/pdf" className="mt-1 block w-full text-sm"
              aria-invalid={!!errors.file} aria-describedby={errors.file ? 'e-file' : undefined}
              onChange={(ev) => setFile(ev.target.files?.[0] ?? null)} />
            {errors.file && <p id="e-file" className={errClass}>{errors.file}</p>}
          </div>
          <label className="flex items-start gap-3 text-sm md:col-span-2">
            <input type="checkbox" name="hse" className="mt-1 size-4 accent-teal" checked={values.hse}
              onChange={(ev) => set('hse', ev.target.checked)} />
            <span>{t.fieldHse}</span>
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
        <p id="form-privacy" className="text-xs text-slate-500">{t.privacy}</p>
        <button type="submit" disabled={status === 'sending'}
          className="rounded-md bg-alert px-6 py-3 font-semibold text-white hover:brightness-95 disabled:opacity-60">
          {status === 'sending' ? t.submitting : t.submit}
        </button>
      </div>

      {status === 'error' && (
        <p role="alert" className="text-danger md:col-span-2">
          {ENDPOINT ? t.errorMsg : t.notConfiguredMsg}
        </p>
      )}
    </form>
  );
}
