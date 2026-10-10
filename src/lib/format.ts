/**
 * قالب‌بندی اعداد فارسی — استفاده مشترک در صفحات ایستا و اسکریپت‌های کلاینت.
 */
const FA_DIGITS = '۰۱۲۳۴۵۶۷۸۹';

/** تبدیل ارقام لاتین به فارسی (برای نمایش در رابط کاربری فارسی). */
export function toFaDigits(input: string | number): string {
  return String(input).replace(/[0-9]/g, (d) => FA_DIGITS[Number(d)]);
}

/** جداکننده هزارگان با ارقام فارسی: 1200 → «۱٬۲۰۰» */
export function faNumber(input: number): string {
  return toFaDigits(input.toLocaleString('en-US'));
}
