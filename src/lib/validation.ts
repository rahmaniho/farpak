/**
 * Shared form validation. The same rules run in the browser (RequestForm)
 * and on the server (form-server), so a request is never trusted on the
 * client's word alone.
 */

export type ErrorCode = 'required' | 'email' | 'phone' | 'file' | 'tooLong' | 'invalid';
export type FormMode = 'rfq' | 'contact';

export const MAX_FILE_BYTES = 10 * 1024 * 1024;
const LIMITS = { name: 120, company: 160, subject: 200, message: 5000, location: 200, volume: 200 } as const;

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts optional +98 / 0 prefix followed by a mobile (9xxxxxxxxx) or a landline (area code + number).
const PHONE = /^(\+98|0)?9\d{9}$|^(\+98|0)?\d{2,3}\d{6,8}$/;
const SERVICE_SLUG = /^[a-z][a-z-]{1,60}$/;

export function normalizeDigits(input: string) {
  return input
    .replace(/[۰-۹]/g, (d) => String(d.charCodeAt(0) - 0x06f0))
    .replace(/[٠-٩]/g, (d) => String(d.charCodeAt(0) - 0x0660));
}

export function isEmail(v: string) {
  return EMAIL.test(v.trim());
}

export function isPhone(v: string) {
  // Strip spaces, dashes and brackets before matching.
  return PHONE.test(normalizeDigits(v).replace(/[\s()-]/g, ''));
}

export interface FileLike {
  type: string;
  size: number;
}

export interface SubmissionInput {
  mode: FormMode;
  name?: string;
  company?: string;
  phone?: string;
  email?: string;
  subject?: string;
  message?: string;
  service?: string;
  location?: string;
  volume?: string;
  /** Honeypot: real users leave this empty. */
  website?: string;
  attachment?: FileLike | null;
}

export type SubmissionErrors = Partial<Record<keyof SubmissionInput | 'attachment', ErrorCode>>;

const str = (v: unknown) => (typeof v === 'string' ? v.trim() : '');

/** Validates one submission. Returns an empty object when the input is valid. */
export function validateSubmission(input: SubmissionInput): SubmissionErrors {
  const e: SubmissionErrors = {};
  const name = str(input.name);
  const phone = str(input.phone);
  const email = str(input.email);
  const message = str(input.message);

  if (!name) e.name = 'required';
  else if (name.length > LIMITS.name) e.name = 'tooLong';

  if (!phone) e.phone = 'required';
  else if (!isPhone(phone)) e.phone = 'phone';

  if (!email) e.email = 'required';
  else if (!isEmail(email)) e.email = 'email';

  if (!message) e.message = 'required';
  else if (message.length > LIMITS.message) e.message = 'tooLong';

  if (str(input.company).length > LIMITS.company) e.company = 'tooLong';

  if (input.mode === 'rfq') {
    const service = str(input.service);
    if (!service) e.service = 'required';
    else if (!SERVICE_SLUG.test(service)) e.service = 'invalid';
    if (str(input.location).length > LIMITS.location) e.location = 'tooLong';
    if (str(input.volume).length > LIMITS.volume) e.volume = 'tooLong';
  } else {
    const subject = str(input.subject);
    if (!subject) e.subject = 'required';
    else if (subject.length > LIMITS.subject) e.subject = 'tooLong';
  }

  const file = input.attachment;
  if (file && file.size > 0) {
    if (file.type !== 'application/pdf' || file.size > MAX_FILE_BYTES) e.attachment = 'file';
  }

  return e;
}
