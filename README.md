# فرپاک صنعت سلامت — وب‌سایت شرکتی (fa / en)

وب‌سایت دوزبانه (فارسی RTL در `/` و انگلیسی LTR در `/en/`) با **Astro 5** و **React Islands**، **Tailwind CSS v4** و خروجی کاملاً استاتیک.

## راه‌اندازی

```bash
npm install
npm run dev       # http://localhost:4321
npm run build     # خروجی در dist/ (شامل sitemap-index.xml)
npm run preview
npm run check     # بررسی تایپ و Astro
npm test          # تست‌های اعتبارسنجی فرم‌ها
npm run images    # تولید AVIF/WebP (800w و 1600w) از JPG های public/images
```

## فرم‌ها و سرویس ارسال (form-server)

فرم‌ها به `/api/submit/` ارسال می‌شوند. این سرویس یک Node بدون وابستگی است:

```bash
npm run form-server   # پیش‌فرض: 127.0.0.1:8787
```

- **در توسعه:** سرور dev مسیر `/api` را به form-server پروکسی می‌کند. مرورگر هرگز مستقیماً به localhost نمی‌رود.
- **اعتبارسنجی:** همان قوانین `src/lib/validation.ts` در مرورگر و سرور اجرا می‌شوند.
- **ضدربات:** فیلد مخفی `website` (honeypot) و محدودیت نرخ (`RATE_LIMIT` در دقیقه برای هر IP).
- **مقصد داده:** اگر `FORM_WEBHOOK_URL` تنظیم شود، داده‌ها به آن POST می‌شوند؛ وگرنه در `form-server/inbox/` ذخیره می‌شوند (در Git نمی‌آیند).
- **فایل پیوست:** فقط PDF تا ۱۰ مگابایت. فایل در این نسخه ذخیره یا ارسال نمی‌شود، فقط نام آن ثبت می‌شود.

**برای استقرار (Production):**
1. `ALLOWED_ORIGINS=https://دامنه-شما` را تنظیم کنید. بدون آن بررسی مبدأ غیرفعال است.
2. مسیر `/api/submit/` را روی دامنه سایت به سرویس form-server هدایت کنید (در Netlify/Vercel/Cloudflare با rewrite یا function).
3. `FORM_WEBHOOK_URL` را به CRM یا رله ایمیل خود وصل کنید.

## داده‌های نمونه
سایت فعلاً با داده‌های **نمونه** کامل شده است. این داده‌ها با پرچم `SAMPLE_DATA` در `src/content/sample.ts` کنترل می‌شوند و روی صفحات با برچسب «نمونه» نمایش داده می‌شوند:
- پروژه‌ها: `src/content/projects.ts`
- مقالات: `src/content/news.ts`، `news-extra.ts` و `news-more.ts` (۲۳ مقاله فنی؛ محتوای عمومی مهندسی که پیش از انتشار باید بازبینی شود)
- آمار و اطلاعات تماس: `src/content/sample.ts`

قبل از انتشار، داده‌ها را با اطلاعات واقعی و تأییدشده جایگزین و `SAMPLE_DATA` را `false` کنید.

## متغیرهای محیطی

| نام | الزامی | توضیح |
|---|---|---|
| `PUBLIC_SITE_URL` | بله (در production) | دامنه نهایی سایت، مثلاً `https://farapak.ir`. تا تعیین دامنه، `https://example.com` استفاده می‌شود. |

نمونه در `.env.example` آمده است. فایل `.env` در Git نباید commit شود.

## ساختار پروژه

```
src/
  components/   Header, Footer, HomeView (بخش‌های صفحه)
  i18n/         fa.json, en.json (همه متن‌های UI)، utils.ts (مسیرها و سوییچ زبان)
  layouts/      BaseLayout.astro (lang/dir، متا، hreflang، skip link)
  pages/        صفحات fa در ریشه، صفحات en در en/ (خدمات، پروژه‌ها، اخبار، تماس، RFQ، درباره ما، گواهینامه‌ها)
  content/      داده‌های خدمات، پروژه‌ها، مقالات و نمونه (sample.ts)
  styles/       global.css (توکن‌های برند، فوکوس، reduced motion)
public/
  images/       تصاویر تولیدشده با متدولوژی SCHEMA (JPG، نیازمند تبدیل به AVIF/WebP)
  favicon.svg, robots.txt
docs/
  ROADMAP.md    نقشه راه و وضعیت فازها
tests/          تست‌های واحد اعتبارسنجی
```

## اصول فنی
- **RTL/LTR:** `<html lang dir>` از روی زبان تعیین می‌شود؛ فقط Logical Properties (`ms-*`, `me-*`, `ps-*`, `start-*`, `end-*`) استفاده شده است.
- **i18n:** هیچ متن سخت‌کدشده‌ای در کامپوننت‌ها نیست؛ همه از فایل‌های JSON می‌آیند. متن‌های موقت با پیشوند `[placeholder]` مشخص شده‌اند.
- **JavaScript:** صفحه اصلی بدون هیچ JS ارسال می‌شود. منوی موبایل با `<details>` پیاده شده است.
- **دسترس‌پذیری:** لینک پرش به محتوا، فوکوس قابل مشاهده، `prefers-reduced-motion`.
- **SEO:** canonical، hreflang (fa / en / x-default)، Open Graph، sitemap دوزبانه، JSON-LD (Organization، Service، BreadcrumbList).
- **فونت:** Vazirmatn و Inter با `@fontsource` self-host شده‌اند (بدون درخواست شخص ثالث).
- **تصاویر:** کامپوننت `Picture` با `<picture>` و AVIF → WebP → JPG. پس از افزودن تصویر جدید `npm run images` را اجرا کنید.
- **هدرهای امنیتی:** در `public/_headers` (Netlify/Cloudflare) و `vercel.json` (Vercel). اگر endpoint فرم روی دامنه دیگری است، `connect-src` در CSP باید به‌روز شود.

## وضعیت
فاز ۱ (زیرساخت، طراحی پایه، صفحه اصلی دوزبانه، تصاویر) انجام شده است. جزئیات در `docs/ROADMAP.md`.
