/**
 * Shared form validation. Runs on the client (React island) and must be
 * mirrored on the server endpoint before any CRM/email delivery.
 */
export type Errors<T> = Partial<Record<keyof T, string>>;

export interface Messages {
  required: string;
  email: string;
  phone: string;
}

const EMAIL = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;
// Accepts Persian/Arabic-Indic and Latin digits, optional +98 / 0 prefix, spaces and dashes.
const PHONE = /^(\+98|0)?9\d{9}$|^(\+98|0)?\d{2,3}\d{6,8}$/;

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
  return PHONE.test(normalizeDigits(v).replace(/[\s()-]/g, ""));
}
