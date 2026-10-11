/**
 * اطلاعات پایه «دفتر خدمات سلامت ۴۷۷» — واقعیت‌های تأییدشده.
 *
 * این فایل عمداً هیچ import ای ندارد تا بتوان آن را هم در Astro، هم در
 * اسکریپت‌های Node (مثل scripts/qr-assets.mjs) و هم در تست‌ها استفاده کرد.
 * نشانی، شماره‌ها و مختصات زیر اطلاعات تأییدشده مجموعه هستند؛ پیش از تغییر،
 * با مدیریت هماهنگ شود.
 */
export const office477 = {
  name: 'دفتر خدمات سلامت ۴۷۷',
  nameEn: 'Health Services Office 477',
  slogan: 'ارائه خدمات سلامت، بهداشت و ایمنی برای جامعه سالم‌تر',
  city: 'قزوین',
  address: 'قزوین، خیابان طالقانی، برج خلیج فارس، طبقه ششم، واحد ۶۱۹',
  phones: [
    { label: 'تلفن همراه', display: '۰۹۳۹۸۵۲۰۱۵۰', dial: '+989398520150' },
    { label: 'تلفن ثابت', display: '۰۲۸۳۳۹۹۲۵۵۰', dial: '+982833992550' },
  ],
  geo: { latitude: 36.2678594, longitude: 50.0135519 },
  mapsUrl: 'https://www.google.com/maps?q=36.2678594,50.0135519',
  /**
   * ساعات کاری: مقدار واقعی هنوز تأیید نشده است، بنابراین عمداً `null` است.
   * به‌جای اعلام ساعت اشتباه، از کاربر خواسته می‌شود پیش از مراجعه تماس بگیرد.
   */
  hours: null as string | null,
  hoursApproved: false,
  /** مسیر (بدون base) تصویر QR موقعیت دفتر؛ با `npm run qr` ساخته می‌شود. */
  qrPath: '/images/brand/office-location-qr.svg',
} as const;

export type Office477 = typeof office477;

/** شماره اصلی (همراه) برای لینک‌های `tel:` و `sms:`. */
export const primaryPhone = office477.phones[0];
