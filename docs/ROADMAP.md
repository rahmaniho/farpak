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
- [ ] تبدیل به AVIF/WebP با `srcset` (و تصویر تیم `team-engineers.jpg` در صفحه درباره)

## فاز ۳ — صفحات محتوایی
- [ ] `/services/` و ۶ صفحه خدمات (مهندسی، پیمانکاری، آتش‌نشانی، HSE، نگهداری، شهری)
- [x] `/about/`، `/projects/`، `/certifications/`، `/news/` (فارسی و انگلیسی؛ محتوای واقعی هنوز placeholder)
- [ ] `/projects/[slug]` و `/news/[slug]`
- [x] `/contact/` و `/rfq/` (فرم‌ها، اعتبارسنجی کلاینت)
- [ ] نسخه انگلیسی همه صفحات

## فاز ۴ — محتوا (Sanity)
- [ ] تعریف schemaهای Sanity: Service, Project, Certificate, Article, SiteSettings (هر فیلد fa/en)
- [ ] دریافت محتوا در زمان build و جایگزینی placeholderها
- [ ] راهنمای مدیریت محتوا برای تیم غیرفنی

## فاز ۵ — فرم‌ها و CRM
- [ ] فرم RFQ، فرم تماس، فرم دانلود کاتالوگ با اعتبارسنجی کلاینت و سرور
- [ ] CSRF، Rate Limiting، reCAPTCHA v3
- [ ] اتصال به CRM (Webhook) و اعلان ایمیل/اسلک

## فاز ۶ — SEO، کیفیت و استقرار
- [ ] Schema.org: Organization، LocalBusiness، Service، BreadcrumbList، FAQPage
- [ ] RSS برای اخبار، robots.txt نهایی با دامنه واقعی
- [ ] هدرهای امنیتی (CSP، HSTS، X-Frame-Options، X-Content-Type-Options)
- [ ] Lighthouse ≥ 95 (عملکرد) و ۱۰۰ (دسترس‌پذیری، SEO، Best Practices)
- [ ] گزارش انطباق WCAG 2.2 AA و تست مرورگرها
- [ ] راهنمای استقرار (Vercel/Netlify/هاست ایرانی)

## تصمیمات باز
- دامنه نهایی سایت (`PUBLIC_SITE_URL`)
- اطلاعات واقعی تماس، آمار، پروژه‌ها، گواهینامه‌ها و لوگو (فعلاً placeholder)
- فونت Vazirmatn و Inter هنوز self-host نشده‌اند (فعلاً از fallback سیستم استفاده می‌شود)
