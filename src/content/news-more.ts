import type { Article } from './news';

/**
 * Technical articles, batch 2 (general engineering and HSE knowledge).
 * `sample: true` keeps the "نمونه / Sample" badge until an engineer has reviewed the text.
 */
export const moreArticles: Article[] = [
  {
    slug: 'fire-alarm-detection-systems',

    topic: 'safety',
    date: '2026-09-01',
    image: '/images/article-fire-alarm-detection-systems.jpg',
    imageAlt: { fa: 'تابلوی اعلام حریق و آشکارساز دود روی سقف', en: 'Fire alarm panel and smoke detector on a ceiling' },
    sample: true,
    copy: {
      fa: {
        title: 'سیستم‌های اعلام و آشکارسازی حریق در تأسیسات صنعتی',
        summary: 'انواع آشکارساز، طراحی حلقه‌های اعلام و نکات نگهداری برای هشدار زودهنگام.',
        body: [
          'سیستم اعلام حریق اولین حلقه زنجیره واکنش به آتش‌سوزی است. هرچه آشکارسازی زودتر انجام شود، زمان تخلیه و مهار حریق بیشتر خواهد بود. طراحی باید متناسب با نوع فعالیت، بار حریق و چیدمان فضا باشد.',
          'آشکارسازهای دود، حرارت، شعله و گاز هر کدام برای شرایط خاصی مناسب‌اند. در فضاهای پرگرد یا محیط‌های با بخار، انتخاب اشتباه آشکارساز باعث هشدارهای کاذب می‌شود. استاندارد NFPA 72 یکی از مراجع رایج برای طراحی و نگهداری سیستم‌های اعلام حریق است.',
          'آزمون دوره‌ای آشکارسازها، بررسی باتری پشتیبان، تست عملکرد تابلو و ثبت نتایج باید در برنامه نگهداری گنجانده شود. سیستمی که به‌درستی آزمون نشود، در لحظه حادثه ممکن است هشدار ندهد.',
        ],
      },
      en: {
        title: 'Fire Alarm and Detection Systems for Industrial Facilities',
        summary: 'Detector types, alarm loop design and maintenance practices for early warning.',
        body: [
          'The fire alarm system is the first link in the response chain. The earlier a fire is detected, the more time is available for evacuation and control. The design must match the occupancy, fire load and room layout.',
          'Smoke, heat, flame and gas detectors each suit particular conditions. In dusty areas or where steam is present, the wrong detector type causes nuisance alarms. NFPA 72 is a widely used reference for the design and maintenance of fire alarm systems.',
          'Periodic detector testing, backup battery checks, panel function tests and recorded results must be part of the maintenance plan. A system that is not properly tested may fail to alarm when it is needed.',
        ],
      },
    },
  },
  {
    slug: 'heat-exchanger-fouling-and-cleaning',

    topic: 'maintenance',
    date: '2026-09-05',
    image: '/images/article-heat-exchanger-fouling.jpg',
    imageAlt: { fa: 'تکنسین در حال تمیزکاری دسته لوله مبدل حرارتی', en: 'Technician cleaning a heat exchanger tube bundle' },
    sample: true,
    copy: {
      fa: {
        title: 'رسوب‌گذاری مبدل‌های حرارتی و روش‌های تمیزکاری',
        summary: 'چرا رسوب راندمان را کم می‌کند و چگونه زمان تمیزکاری تعیین می‌شود.',
        body: [
          'رسوب‌گذاری روی سطح لوله‌های مبدل حرارتی، مقاومت حرارتی را افزایش می‌دهد و راندمان انتقال حرارت را کاهش می‌دهد. نتیجه آن افزایش مصرف انرژی، کاهش دبی و در موارد شدید، توقف واحد است.',
          'رسوب می‌تواند ناشی از ذرات معلق، واکنش‌های شیمیایی، رشد بیولوژیک یا خوردگی باشد. تشخیص نوع رسوب پیش از انتخاب روش تمیزکاری ضروری است؛ روشی که برای رسوب نمک مناسب است، ممکن است به لوله‌های فلزی آسیب بزند.',
          'با پایش افت فشار و اختلاف دمای ورودی و خروجی می‌توان زمان تمیزکاری را تعیین کرد، نه بر اساس زمان ثابت. تمیزکاری مکانیکی، شیمیایی و هیدروژت هر کدام مزایا و محدودیت‌های خود را دارند و باید با ملاحظات ایمنی و زیست‌محیطی انتخاب شوند.',
        ],
      },
      en: {
        title: 'Heat Exchanger Fouling and Cleaning Methods',
        summary: 'Why fouling reduces efficiency and how to decide when cleaning is due.',
        body: [
          'Fouling on heat exchanger tubes adds thermal resistance and reduces heat transfer efficiency. The result is higher energy use, lower throughput and, in severe cases, a unit shutdown.',
          'Fouling may come from suspended solids, chemical reactions, biological growth or corrosion. Identifying the deposit type before choosing a cleaning method is essential: a method suited to scale can damage metal tubes.',
          'Trends in pressure drop and the approach temperature are better triggers for cleaning than a fixed calendar. Mechanical, chemical and hydro-blasting methods each have advantages and limits and must be selected with safety and environmental considerations.',
        ],
      },
    },
  },
  {
    slug: 'permit-to-work-system',

    topic: 'safety',
    date: '2026-09-09',
    image: '/images/article-permit-to-work-system.jpg',
    imageAlt: { fa: 'سرپرست و کارگر در حال بررسی فرم مجوز کار', en: 'Supervisor and worker reviewing a permit-to-work form' },
    sample: true,
    copy: {
      fa: {
        title: 'سیستم مجوز کار: کنترل کارهای پرخطر در کارگاه',
        summary: 'مجوز کار چیست، چه زمانی لازم است و چه اجزایی باید داشته باشد.',
        body: [
          'مجوز کار یک فرآیند رسمی است که پیش از انجام کارهای پرخطر، مانند جوشکاری، کار در ارتفاع یا باز کردن خطوط فرآیندی، صادر می‌شود. هدف آن هماهنگی میان بهره‌برداری و تعمیرات و اطمینان از اجرای اقدامات کنترلی است.',
          'یک مجوز کار خوب شامل شرح دقیق کار، محدوده، مخاطرات شناسایی‌شده، اقدامات کنترلی، تأییدهای لازم (مانند قفل‌گذاری و تست گاز) و زمان اعتبار است. امضای صادرکننده و سرپرست اجرا باید پیش از شروع کار ثبت شود.',
          'مجوز باید با تغییر شرایط بازنگری یا باطل شود. پایان کار و بستن مجوز، همان‌قدر اهمیت دارد که صدور آن. سیستم‌های دیجیتال مجوز کار می‌توانند ردیابی را بهتر کنند، اما اصل ماجرا همان هماهنگی انسانی و بررسی میدانی است.',
        ],
      },
      en: {
        title: 'Permit-to-Work Systems: Controlling High-Risk Work',
        summary: 'What a permit is, when it is required and what it must contain.',
        body: [
          'A permit to work is a formal process issued before high-risk tasks such as hot work, work at height or opening process lines. Its purpose is to coordinate operations and maintenance and to confirm that control measures are in place.',
          'A good permit records the scope, the location, the identified hazards, the control measures, the required confirmations (such as isolation and gas testing) and its validity period. The issuer and the performing supervisor must sign before work starts.',
          'A permit must be revalidated or cancelled when conditions change. Closing the permit at the end of the job is as important as issuing it. Digital systems improve traceability, but coordination and field verification remain essential.',
        ],
      },
    },
  },
  {
    slug: 'earthing-and-lightning-protection',

    topic: 'facilities',
    date: '2026-09-12',
    image: '/images/article-earthing-lightning-protection.jpg',
    imageAlt: { fa: 'میله صاعقه‌گیر و هادی زمین روی دودکش صنعتی', en: 'Lightning air terminal and down conductor on an industrial stack' },
    sample: true,
    copy: {
      fa: {
        title: 'سیستم ارت و حفاظت در برابر صاعقه در تأسیسات صنعتی',
        summary: 'نقش ارت در ایمنی برق و نحوه طراحی حفاظت صاعقه بر اساس استانداردها.',
        body: [
          'سیستم ارت مسیری کم‌مقاومت به زمین فراهم می‌کند تا جریان خطا به‌سرعت تخلیه شود و ولتاژ بدنه تجهیزات در حد ایمن بماند. ارت ضعیف یا ناپیوسته یکی از علل رایج حوادث برق‌گرفتگی و خرابی تجهیزات الکترونیکی است.',
          'حفاظت در برابر صاعقه شامل پایانه‌های گیرنده، هادی‌های پایین‌برنده و الکترودهای زمین است. استاندارد سری IEC 62305 چارچوب طراحی آن را ارائه می‌کند. تعیین سطح حفاظت باید بر اساس ارزیابی ریسک و اهمیت تجهیزات انجام شود.',
          'اندازه‌گیری دوره‌ای مقاومت زمین، بررسی اتصالات و خوردگی الکترودها، و آزمون پیوستگی هادی‌ها باید جزو برنامه نگهداری باشد. ارتی که هیچ‌گاه اندازه‌گیری نشود، معمولاً تا زمان حادثه معیوب بودنش مشخص نمی‌شود.',
        ],
      },
      en: {
        title: 'Earthing and Lightning Protection in Industrial Plants',
        summary: 'The role of earthing in electrical safety and how lightning protection is designed.',
        body: [
          'An earthing system provides a low-resistance path to ground so that fault current clears quickly and equipment enclosures stay at safe potentials. Weak or discontinuous earthing is a common cause of shock and of damage to electronic equipment.',
          'Lightning protection includes air terminals, down conductors and earth electrodes. The IEC 62305 series provides the design framework. The protection level should be set by risk assessment and by the importance of the equipment.',
          'Periodic measurement of earth resistance, inspection of connections and electrode corrosion, and continuity testing of conductors belong in the maintenance plan. An earth system that is never measured is usually found faulty only after an incident.',
        ],
      },
    },
  },
  {
    slug: 'noise-control-in-plants',

    topic: 'safety',
    date: '2026-09-16',
    image: '/images/article-noise-control-plants.jpg',
    imageAlt: { fa: 'پانل‌های عایق صوتی در سالن کارخانه با کارگر دارای گوشی ایمنی', en: 'Acoustic panels on a plant floor with a worker wearing ear protection' },
    sample: true,
    copy: {
      fa: {
        title: 'کنترل صدا در کارخانه‌ها: از منبع تا گیرنده',
        summary: 'اثرات مواجهه با صدای زیاد و روش‌های کاهش آن با اولویت کنترل مهندسی.',
        body: [
          'مواجهه طولانی‌مدت با صدای بالا باعث کاهش شنوایی دائمی می‌شود و در کنار آن خستگی، کاهش تمرکز و افزایش خطای کاری ایجاد می‌کند. در بسیاری از کارخانه‌ها، پمپ‌ها، کمپرسورها و فن‌ها منابع اصلی صدا هستند.',
          'بهترین راه کاهش صدا، کنترل در منبع است؛ مانند جداسازی ارتعاشی، بهبود طراحی فن و استفاده از محفظه‌های عایق صوتی. اگر این روش‌ها کافی نباشد، مسیر انتشار صدا (دیوار و پانل جاذب) و در نهایت گیرنده (گوشی و تعویض شیفت) بررسی می‌شود.',
          'اندازه‌گیری دوزیمتری و تعیین میانگین وزنی زمانی (TWA) مواجهه، پایه برنامه حفاظت شنوایی است. بسیاری از استانداردها سطح عمل را حدود ۸۵ دسی‌بل برای مواجهه ۸ ساعته در نظر می‌گیرند، اما مقدار مجاز باید بر اساس مقررات محلی تعیین شود.',
        ],
      },
      en: {
        title: 'Noise Control in Plants: From Source to Receiver',
        summary: 'Effects of high noise exposure and how to reduce it, starting with engineering controls.',
        body: [
          'Long-term exposure to high noise causes permanent hearing loss and also fatigue, reduced concentration and more work errors. Pumps, compressors and fans are often the main sources in plants.',
          'The most effective control is at the source: vibration isolation, improved fan design and acoustic enclosures. If these are not enough, the transmission path (barriers and absorptive panels) is considered, and finally the receiver (hearing protection and shift rotation).',
          'Dosimetry and the time-weighted average (TWA) exposure form the basis of a hearing conservation programme. Many standards set an action level around 85 dBA for an 8-hour exposure, but limits must be set according to local regulations.',
        ],
      },
    },
  },
  {
    slug: 'emergency-response-planning',

    topic: 'safety',
    date: '2026-09-19',
    image: '/images/article-emergency-response-planning.jpg',
    imageAlt: { fa: 'تیم واکنش اضطراری در نقطه تجمع کارخانه', en: 'Emergency response team at a plant assembly point' },
    sample: true,
    copy: {
      fa: {
        title: 'برنامه‌ریزی واکنش در شرایط اضطراری',
        summary: 'اجزای یک برنامه واکنش اضطراری خوب و چگونگی آزمون آن.',
        body: [
          'برنامه واکنش اضطراری مشخص می‌کند در صورت حادثه چه کسی چه کاری انجام دهد، چگونه هشدار داده شود و تخلیه چگونه انجام شود. نبود این برنامه یا نامشخص بودن نقش‌ها، کوچک‌ترین حادثه را به بحران تبدیل می‌کند.',
          'برنامه باید بر اساس سناریوهای واقعی سایت تدوین شود، مانند نشت گاز، آتش‌سوزی، مصدومیت و خرابی جدی تجهیزات. نقشه‌های تخلیه، نقاط تجمع، ارتباطات داخلی و تماس با خدمات اورژانس بیرونی باید به‌روز و در دسترس باشند.',
          'تمرین منظم (رومیزی و میدانی) تنها راه سنجش واقعی برنامه است. پس از هر تمرین یا حادثه باید گزارش بررسی و اقدامات اصلاحی ثبت شود. برنامه‌ای که هرگز تمرین نشده، هنگام نیاز کارایی ندارد.',
        ],
      },
      en: {
        title: 'Emergency Response Planning',
        summary: 'The components of a sound emergency response plan and how to test it.',
        body: [
          'An emergency response plan defines who does what during an incident, how alarms are raised and how evacuation proceeds. Without it, or when roles are unclear, a minor event can escalate into a crisis.',
          'The plan should reflect the site’s real scenarios, such as gas release, fire, injury and serious equipment failure. Evacuation maps, assembly points, internal communications and links to external emergency services must be current and accessible.',
          'Regular drills, both tabletop and field, are the only real test of the plan. Each drill or incident should lead to a recorded review and corrective actions. A plan that has never been exercised is unlikely to work when needed.',
        ],
      },
    },
  },
  {
    slug: 'hydrostatic-testing-of-pressure-vessels',

    topic: 'maintenance',
    date: '2026-09-23',
    image: '/images/article-hydrostatic-testing.jpg',
    imageAlt: { fa: 'مخزن تحت فشار در آزمون هیدرواستاتیک با گیج فشار', en: 'Pressure vessel during hydrostatic testing with pressure gauges' },
    sample: true,
    copy: {
      fa: {
        title: 'آزمون هیدرواستاتیک مخازن تحت فشار',
        summary: 'هدف آزمون، روش انجام آن و نکات ایمنی که نباید نادیده گرفته شوند.',
        body: [
          'آزمون هیدرواستاتیک با پر کردن مخزن از آب و اعمال فشاری بالاتر از فشار طراحی انجام می‌شود تا استحکام و نشتی آن تأیید شود. این آزمون معمولاً پس از ساخت، تعمیرات مهم یا تغییرات اساسی انجام می‌شود.',
          'فشار آزمون، مدت آزمون و شرایط دمایی باید طبق کد طراحی، مانند ASME Section VIII یا استاندارد معادل، تعیین شود. آب باید از نظر کیفیت و دما مناسب باشد و هوای داخل مخزن کاملاً تخلیه شود تا خطر انرژی ذخیره‌شده در گاز کاهش یابد.',
          'در آزمون باید محدوده ایمن اطراف مخزن مشخص و از افراد غیرضروری پاکسازی شود. ثبت دقیق فشار و دما و بررسی نشتی در هر مرحله، بخش اصلی گزارش آزمون است. پس از آزمون، خشک‌کردن مخزن و بازبینی نتایج از اهمیت یکسانی برخوردارند.',
        ],
      },
      en: {
        title: 'Hydrostatic Testing of Pressure Vessels',
        summary: 'The purpose of the test, how it is performed and the safety points that must not be skipped.',
        body: [
          'A hydrostatic test fills the vessel with water and applies a pressure above design pressure to confirm strength and leak-tightness. It is typically done after fabrication, after major repairs or after significant alterations.',
          'Test pressure, duration and temperature conditions must follow the design code, such as ASME Section VIII or an equivalent standard. The water should be suitable in quality and temperature, and trapped air must be removed to reduce stored energy.',
          'The test area must be cordoned off and kept clear of non-essential personnel. Accurate recording of pressure and temperature and leak checks at each stage form the core of the test report. Drying the vessel afterwards and reviewing the results are equally important.',
        ],
      },
    },
  },
  {
    slug: 'scaffolding-safety-on-site',

    topic: 'safety',
    date: '2026-09-26',
    image: '/images/article-scaffolding-safety.jpg',
    imageAlt: { fa: 'داربست ساختمانی با نرده ایمنی و کارگران دارای هارنس', en: 'Scaffolding with guardrails and workers wearing harnesses' },
    sample: true,
    copy: {
      fa: {
        title: 'ایمنی داربست در کارگاه‌های ساختمانی و صنعتی',
        summary: 'الزامات طراحی، بازرسی و استفاده از داربست برای جلوگیری از سقوط.',
        body: [
          'سقوط از ارتفاع یکی از رایج‌ترین علل حوادث جدی در کارگاه‌هاست و داربست نقش مهمی در کنترل آن دارد. داربست باید توسط افراد آموزش‌دیده و با نقشه‌ای مشخص نصب شود و بار مجاز آن معلوم باشد.',
          'نرده‌های میانی و بالایی، تخته‌های کف، اتصالات محکم به سازه و پایه‌های مناسب روی سطح سفت، از الزامات پایه‌اند. داربست نباید بدون بازرسی و تأیید آماده استفاده شود و پس از طوفان یا تغییر چیدمان باید دوباره بازرسی گردد.',
          'کارگران باید از هارنس و نقطه اتصال مناسب استفاده کنند و آموزش استفاده از آن را دیده باشند. برچسب وضعیت داربست (آماده، در حال تعمیر، ممنوع) باید روی آن نصب باشد تا همه از وضعیت آن آگاه باشند.',
        ],
      },
      en: {
        title: 'Scaffolding Safety on Construction and Industrial Sites',
        summary: 'Design, inspection and use requirements that prevent falls.',
        body: [
          'Falls from height are among the most common causes of serious incidents on site, and scaffolding plays a central role in controlling them. It must be erected by trained personnel to a clear design, with a known load capacity.',
          'Guardrails at intermediate and top levels, fully boarded platforms, secure ties to the structure and suitable base plates on firm ground are basic requirements. Scaffolding must not be used until inspected and tagged as safe, and it must be re-inspected after storms or layout changes.',
          'Workers must use harnesses with a proper anchor point and be trained in their use. A status tag (safe, under repair, do not use) should be visible on every scaffold so that everyone knows its condition.',
        ],
      },
    },
  },
  {
    slug: 'hvac-energy-efficiency-in-industrial-buildings',

    topic: 'facilities',
    date: '2026-09-30',
    image: '/images/article-hvac-energy-efficiency.jpg',
    imageAlt: { fa: 'واحدهای تهویه و چیلر روی پشت‌بام ساختمان صنعتی', en: 'Air handling units and chillers on an industrial rooftop' },
    sample: true,
    copy: {
      fa: {
        title: 'بهینه‌سازی مصرف انرژی در تأسیسات تهویه و سرمایش',
        summary: 'اقدامات عملی برای کاهش مصرف انرژی در سیستم‌های HVAC ساختمان‌های صنعتی.',
        body: [
          'سیستم‌های تهویه مطبوع و سرمایش معمولاً بخش قابل توجهی از مصرف برق یک ساختمان صنعتی را تشکیل می‌دهند. بهینه‌سازی آن‌ها اغلب با کم‌هزینه‌ترین اقدامات شروع می‌شود، مانند تنظیم زمان‌بندی و کنترل دما بر اساس اشغال واقعی فضا.',
          'درایوهای فرکانس متغیر برای فن‌ها و پمپ‌ها، عایق‌کاری مناسب کانال‌ها و لوله‌ها، و پاکسازی منظم کوئل‌ها و فیلترها، از اقدامات مؤثر هستند. تفکیک ناحیه‌های سرمایشی و حذف تهویه بیش از نیاز، مصرف را بیشتر کاهش می‌دهد.',
          'اندازه‌گیری مصرف با کنتور مجزا برای هر بخش و مقایسه با خط پایه، امکان سنجش اثر هر اقدام را فراهم می‌کند. بدون اندازه‌گیری، ادعای صرفه‌جویی قابل راستی‌آزمایی نیست.',
        ],
      },
      en: {
        title: 'Energy Efficiency in HVAC Systems for Industrial Buildings',
        summary: 'Practical steps to reduce energy use in building HVAC systems.',
        body: [
          'HVAC systems often account for a large share of electricity use in industrial buildings. Optimisation usually starts with low-cost measures, such as scheduling and controlling temperature based on actual occupancy.',
          'Variable frequency drives on fans and pumps, proper insulation of ducts and pipes, and regular cleaning of coils and filters are effective. Zoning and removing over-ventilation reduce consumption further.',
          'Sub-metering each area and comparing against a baseline makes it possible to measure the effect of each measure. Without measurement, savings claims cannot be verified.',
        ],
      },
    },
  },
  {
    slug: 'hazardous-waste-management',

    topic: 'environment',
    date: '2026-10-03',
    image: '/images/article-hazardous-waste-management.jpg',
    imageAlt: { fa: 'بشکه‌های پسماند خطرناک برچسب‌گذاری‌شده روی سکوی بتنی', en: 'Labeled hazardous waste drums on a bunded concrete pad' },
    sample: true,
    copy: {
      fa: {
        title: 'مدیریت پسماند خطرناک در واحدهای صنعتی',
        summary: 'شناسایی، جداسازی، نگهداری و دفع پسماندهای خطرناک با رعایت مقررات.',
        body: [
          'پسماند خطرناک شامل مواد با خواص اشتعال‌پذیری، خورندگی، سمیت یا واکنش‌پذیری است. مدیریت صحیح آن از ابتدا با شناسایی و طبقه‌بندی دقیق آغاز می‌شود، زیرا اشتباه در طبقه‌بندی، خطر و هزینه را افزایش می‌دهد.',
          'پسماندها باید در ظروف سازگار و سالم، با برچسب مشخص و در محل مجهز به سکوی آب‌بند (بانددار) نگهداری شوند. جداسازی مواد ناسازگار، ثبت مقدار و زمان تولید، و محدودیت مدت نگهداری در محل از الزامات پایه‌اند.',
          'دفع باید توسط پیمانکار دارای مجوز انجام شود و مستندات انتقال، از تولید تا دفع نهایی، باید نگهداری شود. این زنجیره سندی، اساس پاسخگویی زیست‌محیطی سازمان است.',
        ],
      },
      en: {
        title: 'Hazardous Waste Management in Industrial Facilities',
        summary: 'Identifying, segregating, storing and disposing of hazardous waste in line with regulations.',
        body: [
          'Hazardous waste includes materials that are flammable, corrosive, toxic or reactive. Good management starts with accurate identification and classification, because an error at this stage increases both risk and cost.',
          'Waste must be kept in compatible, sound containers with clear labels, in a bunded area. Segregating incompatible materials, recording quantities and dates of generation, and limiting on-site storage time are basic requirements.',
          'Disposal should be carried out by a licensed contractor, and transfer documents must be kept from generation to final disposal. This documented chain forms the basis of environmental accountability.',
        ],
      },
    },
  },
];
