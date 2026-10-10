# نقشه راه — فرپاک صنعت سلامت

## فاز ۱ — زیرساخت و صفحه اصلی (✅ انجام شد)
- [x] Astro 5 + React + Tailwind v4 + sitemap + check
- [x] مسیرهای دوزبانه `/` و `/en/` با `<html lang dir>`
- [x] لایه پایه: هدر با سوییچ زبان حافظ مسیر، فوتر، skip link، hreflang
- [x] توکن‌های برند (Industrial Eco-Tech) و دسترس‌پذیری پایه
- [x] صفحه اصلی دوزبانه (هیرو، نوار اعتماد، خدمات، چرا فرپاک، پروژه‌ها، گواهینامه‌ها، CTA)
- [x] ۱۰ تصویر تولیدشده (SCHEMA)
- [x] بیلد بدون JS در صفحات، `astro check` بدون خطا

## فاز ۲ — تصاویر باقی‌مانده و بهینه‌سازی
- [ ] تولید تصویر OG (`og-image.jpg`) و پس‌زمینه گواهینامه‌ها (`certifications-bg.jpg`) — در این نوبت به سقف تولید تصویر رسیدیم
- [ ] تصاویر خدمات (`service-*.jpg`) در صفحات خدمات
- [x] تبدیل به AVIF/WebP با `srcset` (کامپوننت `Picture`؛ تصویر تیم هنوز در صفحه‌ای استفاده نشده)

## فاز ۳ — صفحات محتوایی
- [ ] `/services/` و ۶ صفحه خدمات (مهندسی، پیمانکاری، آتش‌نشانی، HSE، نگهداری، شهری)
- [x] `/about/`، `/projects/`، `/certifications/`، `/news/` (فارسی و انگلیسی؛ محتوای واقعی هنوز placeholder)
- [x] `/projects/[slug]` و `/news/[slug]` (داده‌های نمونه، برچسب «نمونه»)
- [x] ۲۳ مقاله فنی (هر مقاله با تصویر اختصاصی) در هر دو زبان؛ نیاز به بازبینی مهندسی پیش از انتشار
- [x] `/contact/` و `/rfq/` (فرم‌ها، اعتبارسنجی کلاینت)
- [ ] نسخه انگلیسی همه صفحات

- [x] RSS خبری فارسی و انگلیسی (`/news/rss.xml`، `/en/news/rss.xml`)
- [x] آمار، پروژه‌ها، مقالات و اطلاعات تماس نمونه (با پرچم `SAMPLE_DATA`)

## فاز ۴ — محتوا (Sanity)
- [ ] تعریف schemaهای Sanity: Service, Project, Certificate, Article, SiteSettings (هر فیلد fa/en)
- [ ] دریافت محتوا در زمان build و جایگزینی placeholderها
- [ ] راهنمای مدیریت محتوا برای تیم غیرفنی

## فاز ۵ — فرم‌ها و CRM
- [x] فرم RFQ و فرم تماس با اعتبارسنجی مشترک کلاینت و سرور (`src/lib/validation.ts`)
- [x] سرویس form-server: honeypot، محدودیت نرخ، بررسی مبدأ، ذخیره در inbox یا webhook
- [ ] فرم دانلود کاتالوگ
- [ ] ذخیره پیوست PDF (فعلاً فقط بررسی و ثبت نام)
- [x] Rate Limiting و honeypot
- [ ] توکن CSRF و reCAPTCHA v3 (نیاز به کلید سرویس)
- [ ] اتصال به CRM (Webhook) و اعلان ایمیل/اسلک (آماده: `FORM_WEBHOOK_URL`)

## فاز ۶ — SEO، کیفیت و استقرار
- [x] Schema.org: Organization، Service، BreadcrumbList (LocalBusiness و FAQPage پس از تأیید اطلاعات)
- [x] فونت‌های self-host (Vazirmatn، Inter)
- [x] هدرهای امنیتی و CSP (`public/_headers`، `vercel.json`)
- [ ] RSS برای اخبار، robots.txt نهایی با دامنه واقعی
- [ ] Lighthouse ≥ 95 (عملکرد) و ۱۰۰ (دسترس‌پذیری، SEO، Best Practices)
- [ ] گزارش انطباق WCAG 2.2 AA و تست مرورگرها
- [ ] راهنمای استقرار (Vercel/Netlify/هاست ایرانی)

## تصمیمات باز
- دامنه نهایی سایت (`PUBLIC_SITE_URL`)
- اطلاعات واقعی تماس، آمار، پروژه‌ها، گواهینامه‌ها و لوگو (فعلاً placeholder)
