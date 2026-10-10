# سیستم طراحی «FARPAK OPS» — UIX Pro Max

> فلسفه: **Industrial Neo-Brutalism meets Fluid Glass**
> شعار: **«دقت مهندسی، احساس آینده.»**
> پیاده‌سازی: `src/styles/tokens.css` (توکن‌ها) · `base.css` (قرارداد پایه) · `components.css` (زبان اشیا) · `motion.css` (فیزیک)

این سند مرجع تصمیم‌های طراحی بازطراحی کامل سایت فرپاک صنعت سلامت است.
هر رنگ، فاصله و حرکتی که در markup می‌بینید باید از این سند قابل ردیابی باشد.

---

## ۱. چهار قانون خانه (Rules of the House)

1. **بوم، فقط شب.** تم روشن وجود ندارد. هر سطح یک «لایه عمق» است، نه یک پرکننده تخت.
2. **رنگ اسیدی = سیگنال، نه تزئین.** روی هر رنگ اسیدی، تایپ INK-تیره می‌نشیند (کنتراست ≥ ۶:۱). سفید روی اکسنت ممنوع.
3. **نه کاملاً گرد، نه کاملاً تیز.** Slab ها شعاع ۲–۴px؛ شیشه‌های شناور ۱۶px.
4. **هیچ عنصری ساکن نیست، هیچ عنصری فریاد نمی‌زند.** حرکت همیشه هدفمند، آهسته و قابل حذف با `prefers-reduced-motion`.

## ۲. دو خانواده متریال

| متریال | کلاس | karakter | کاربرد |
|---|---|---|---|
| **SLAB** | `.slab` / `.slab-brut` | جامد، مرز مویی، سایه سخت `5px 5px 0` | کارت‌های محتوا، پنل‌های مشخصات |
| **GLASS** | `.glass` / `.glass-strong` / `.glass-thin` | `backdrop-filter: blur(20px) saturate(150%)` + نور لبه | هدر چسبان، HUD، فرم‌ها |

نور لبه (Edge Light): `inset 0 1px 0 rgba(255,255,255,.10), inset 0 -1px 0 rgba(0,0,0,.45)` — همان «لبه شیشه» که عمق را می‌فروشد.

## ۳. توکن‌های رنگ

| توکن | مقدار | نقش |
|---|---|---|
| `--color-void` | `#070B18` | بوم اصلی |
| `--color-hull` | `#0D1426` | بستر شیشه |
| `--color-deck` | `#121B33` | کارت برآمده / hover |
| `--color-rivet` | `#1B2745` | مرزهای جامد، چیپ‌ها |
| `--color-chalk` | `#F2F5FA` | متن اصلی |
| `--color-fog` | `#8A93A6` | متن ثانویه — **۶.۴:۱ روی void (AA)** |
| `--color-ash` | `#6B7590` | فقط تزئینی/`aria-hidden` — هرگز متن بدنه |
| `--color-flux` | `#00E5FF` | فیروزه‌ای نئون: اطلاعات، فوکوس، لینک |
| `--color-ember` | `#FFB020` | کهربایی: احتیاط، برچسب «نمونه» |
| `--color-volt` | `#B8FF3C` | لایم: موفقیت، CTA اصلی |
| `--color-siren` | `#FF3CAC` | سرخابی: خطا، هشدار، «زنده» |
| `--color-line` | `rgba(255,255,255,.08)` | موی مرز |
| `--color-line-glow` | `rgba(0,229,255,.4)` | مرز درخشان |

قانون کنتراست: متن بدنه فقط `chalk` یا `fog`. اکسنت‌ها برای متن کوتاه/تیتر؛ روی پرکننده اکسنت، متن `void`.

## ۴. تایپوگرافی

| نقش | فونت | نکته |
|---|---|---|
| نمایشی/تیتر (لاتین) | `Inter Variable` | وزن ۸۰۰–۹۰۰، `letter-spacing: -0.03em` تا `-0.045em` |
| نمایشی/تیتر (فارسی) | `Vazirmatn Variable` | وزن ۸۰۰، **بدون tracking منفی**، `line-height: 1.28–1.3` |
| بدنه | هر دو، بر اساس `dir` | فارسی `line-height: 1.78–2.05` |
| برچسب فنی / HUD / شماره برگه | `JetBrains Mono Variable` | uppercase، `letter-spacing: .16–.34em`، اعداد tabular |

مقیاس: `--t-display` تا `clamp(2.6rem, 9.5vw, 7.5rem)`؛ تیتر صفحه‌ها `--t-h1`؛ lead `--t-lead`.
هر عدد نمایشی (`time`, `code`, شمارنده‌ها) با `font-variant-numeric: tabular-nums`.

## ۵. امضاهای بصری (Signature details)

- **Corner ticks** (`.ticks`): دو گوشه L-شکل با رنگ اکسنت که روی hover/focus باز می‌شوند — علامت رجیستراسیون CAD.
- **برگه‌های مشخصات**: هر صفحه یک شماره برگه مونو دارد (`SVC-02`, `PRJ-26`, `DWG. FP-2026-00 / REV.04 / SHEET 01`).
- **HUD عملیات**: پنل شیشه‌ای هیرو با ساعت زنده تهران (`data-clock`)، شمارنده‌ها و meter ها.
- **Duotone**: تصاویر خاکستری+تیره با واش اکسنت؛ روی hover رنگ واقعی برمی‌گردد + اسکن‌لاین روی تصویر.
- **Ticker واژگان عملیاتی**: مارکی مونو که روی hover/focus می‌ایستد (WCAG 2.2.2).
- **Wordmark outline** در فوتر: `-webkit-text-stroke` بدون پرکننده.
- **گرید CAD + گرین + وینیت**: چهار لایه ثابت `.bg-canvas` پشت همه‌چیز.

## ۶. حرکت (Living Motion)

| مکانیزم | پیاده‌سازی | fallback |
|---|---|---|
| Reveal هنگام اسکرول | `animation-timeline: view()` داخل `@supports` | بدون انیمیشن، محتوا کامل دیده می‌شود |
| نوار پیشرفت سند | `animation-timeline: scroll(root)` | `ui.ts` با rAF |
| ورود صفحه اول | `@keyframes hero-in` + تأخیر پلکانی `--d` | بی‌حرکت ولی کامل |
| پر شدن meterها | `animation-timeline: view()` | پر از ابتدا |
| شمارنده‌ها | IO + `Intl.NumberFormat` در `ui.ts` | مقدار نهایی SSR شده در markup |
| Spotlight نشانگر | `--mx/--my` (کارت) و `--px/--py` (هیرو) | بدون افکت |

**قرارداد:** حرکت = افزونه. بدون JS صفحه کامل است؛ بدون پشتیبانی scroll-timeline صفحه کامل است؛ با `prefers-reduced-motion` صفحه کامل ولی بی‌حرکت است. مارکی و حلقه‌های محیطی زیر reduced-motion خاموش می‌شوند.

## ۷. قرارداد دسترس‌پذیری

- skip link، landmark ها، `aria-current`، برچسب همه ناوبری‌ها و فیلترها از i18n.
- فوکوس: `outline: 2px solid flux; offset 3px`؛ روی کنترل‌های فرم offset کمتر.
- فرم‌ها: `aria-invalid` + `aria-describedby` + خلاصه خطا با `role="alert"` و فوکوس‌پذیر.
- متن روی اکسنت‌ها همیشه تیره؛ خطا `siren` با کنتراست ۶:۱.
- منوی موبایل `<details>` بومی است: بدون JS کار می‌کند؛ با Escape و کلیک روی لینک بسته می‌شود.
- `prefers-contrast: more` مرزها و گرید را ضخیم‌تر می‌کند.
- چاپ: `@media print` بوم را سفید و کروم را حذف می‌کند.

## ۸. کامپوننت‌های کلیدی

`Header` (شیشه چسبان + burger CSS-only) · `Footer` (wordmark outline + واژگان) · `PageHero` (هیرو صفحه‌های داخلی با تصویر duotone) · `SectionHead` (چیپ ایندکس + تیتر mask) · `card` + `ticks` + `data-spot` · `chip / badge-sample / dot-live` · `btn-primary / btn-ghost / btn-brut` · `field` (فرم) · `spec` (جدول مشخصات) · `meter` · `marquee` · `hud` · `Pagination` · `callout`.

رنگ اکسنت هر نمونه با یک متغیر محلی ست می‌شود: `style="--acc: var(--color-volt)"` — هیچ کلاس رنگ سخت‌کد شده‌ای در کامپوننت‌ها نیست.

## ۹. بودجه عملکرد

- فونت‌ها self-host و Variable (سه فایل woff2 برای سه خانواده؛ زیرمجموعه‌ها توسط unicode-range).
- JS: یک ماژول enhancement (~۳KB) + دو island فرم/جستجو. صفحه اصلی بدون island رندر می‌شود.
- `backdrop-filter` فقط روی هدر چسبان، HUD و پنل‌های فرم — هرگز تمام‌صفحه.
- تصاویر AVIF/WebP با `srcset` (کامپوننت `Picture`)؛ هیرو `fetchpriority="high"`، بقیه lazy.
- CSP: `script-src 'self' 'unsafe-inline'` — ضروری چون Astro بوت‌استرپ hydration islandها را inline تزریق می‌کند (بدون آن فرم‌ها در Netlify/Vercel هرگز hydrate نمی‌شدند).
