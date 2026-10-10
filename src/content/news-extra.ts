import type { Article } from './news';

/**
 * Technical articles (general engineering and HSE knowledge).
 * `sample: true` keeps the "نمونه / Sample" badge until an engineer has reviewed
 * the text. Set to false after review.
 */
export const extraArticles: Article[] = [
  {
    slug: 'pipeline-corrosion-inspection',
    date: '2026-01-12',
    image: '/images/article-pipeline-corrosion-inspection.jpg',
    imageAlt: { fa: 'بازرسی خوردگی خط لوله با گیج ضخامت اولتراسونیک', en: 'Ultrasonic thickness inspection of a corroded pipeline' },
    sample: true,
    copy: {
      fa: {
        title: 'بازرسی خوردگی خطوط لوله: از اندازه‌گیری ضخامت تا برنامه نگهداری',
        summary: 'خوردگی یکی از عوامل اصلی کاهش عمر خطوط لوله است. این مقاله روش‌های بازرسی و تبدیل نتایج به برنامه نگهداری را توضیح می‌دهد.',
        body: [
          'خوردگی یکی از اصلی‌ترین عوامل کاهش عمر خطوط لوله در صنایع نفت، گاز و پتروشیمی است. شناخت مکانیزم‌های آن، از جمله خوردگی یکنواخت، حفره‌ای و ترک ناشی از تنش، نخستین گام در کنترل آن است.',
          'اندازه‌گیری ضخامت با گیج اولتراسونیک، پرتونگاری و بازرسی بصری از روش‌های رایج‌اند. نقاط اندازه‌گیری باید بر اساس تحلیل ریسک انتخاب شوند، نه صرفاً بر اساس سهولت دسترسی.',
          'نتایج بازرسی باید به نرخ خوردگی تبدیل شود تا تاریخ بازرسی بعدی و زمان تعویض قطعه تعیین گردد. ثبت دقیق سوابق و مقایسه روند اندازه‌گیری‌ها، تصمیم‌گیری مستند را ممکن می‌کند. استاندارد API 570 چارچوب مرجعی برای برنامه بازرسی خطوط لوله فرآیندی است.',
        ],
      },
      en: {
        title: 'Pipeline Corrosion Inspection: From Thickness Measurement to Maintenance Planning',
        summary: 'Corrosion is a main cause of pipeline life reduction. This article explains inspection methods and how results feed the maintenance plan.',
        body: [
          'Corrosion is one of the main causes of reduced pipeline life in oil, gas and petrochemical plants. Understanding its mechanisms, including uniform, pitting and stress-related cracking, is the first step in controlling it.',
          'Ultrasonic thickness gauging, radiography and visual inspection are common methods. Measurement points should be chosen by risk analysis, not only by ease of access.',
          'Inspection results must be converted into corrosion rates so that the next inspection date and replacement timing can be set. Careful records and trend comparison make decisions traceable. API 570 provides a reference framework for in-service piping inspection.',
        ],
      },
    },
  },
  {
    slug: 'gas-leak-detection-systems',
    date: '2026-02-05',
    image: '/images/article-gas-leak-detection.jpg',
    imageAlt: { fa: 'سنسور تشخیص نشت گاز روی فلنج لوله صنعتی', en: 'Gas detection sensor mounted on an industrial pipe flange' },
    sample: true,
    copy: {
      fa: {
        title: 'سیستم‌های تشخیص نشت گاز در واحدهای فرآیندی',
        summary: 'انواع سنسورهای گاز، محل نصب و نکات طراحی برای تشخیص زودهنگام نشت.',
        body: [
          'تشخیص زودهنگام نشت گاز، مهم‌ترین لایه حفاظت در برابر آتش‌سوزی و انفجار در واحدهای فرآیندی است. سیستم‌های تشخیص باید به‌گونه‌ای طراحی شوند که نشت را پیش از رسیدن به غلظت خطرناک هشدار دهند.',
          'سنسورهای کاتالیتیک، نیمه‌هادی و مادون‌قرمز هر کدام کاربرد خاص خود را دارند. انتخاب نوع سنسور باید بر اساس نوع گاز، شرایط محیطی و میزان دقت مورد نیاز باشد. محل نصب نیز به چگالی گاز نسبت به هوا بستگی دارد؛ گازهای سنگین‌تر از هوا در سطح پایین جمع می‌شوند.',
          'نگهداری و کالیبراسیون دوره‌ای سنسورها بخش جدایی‌ناپذیر طراحی است. سنسوری که کالیبره نشده باشد، هشدار اشتباه یا، بدتر از آن، عدم هشدار واقعی می‌دهد. ثبت آزمون‌ها و تست عملکرد زنجیره هشدار باید منظم انجام شود.',
        ],
      },
      en: {
        title: 'Gas Leak Detection Systems in Process Units',
        summary: 'Sensor types, placement and design considerations for early leak detection.',
        body: [
          'Early gas leak detection is a critical layer of protection against fire and explosion in process units. Detection systems must warn before a leak reaches a hazardous concentration.',
          'Catalytic, semiconductor and infrared sensors each suit different applications. The choice depends on the gas, environmental conditions and required accuracy. Placement also depends on gas density relative to air: heavier-than-air gases collect at low level.',
          'Periodic calibration and testing are part of the design, not an afterthought. An uncalibrated sensor gives false alarms or, worse, misses a real leak. Test records and functional checks of the full alarm chain should be kept up to date.',
        ],
      },
    },
  },
  {
    slug: 'process-safety-management-overview',
    date: '2026-02-20',
    image: '/images/article-process-safety-management.jpg',
    imageAlt: { fa: 'اتاق کنترل واحد فرآیندی با اپراتورها', en: 'Process control room with operators' },
    sample: true,
    copy: {
      fa: {
        title: 'مدیریت ایمنی فرآیند (PSM): چارچوبی برای پیشگیری از حوادث بزرگ',
        summary: 'مدیریت ایمنی فرآیند چه عناصری دارد و چرا برای مواد خطرناک ضروری است.',
        body: [
          'مدیریت ایمنی فرآیند مجموعه‌ای از سیستم‌ها و رویه‌هاست که از رخداد حوادث بزرگ ناشی از مواد شیمیایی خطرناک جلوگیری می‌کند. هدف آن کنترل خطرات فرآیند، نه صرفاً رعایت ظاهری مقررات است.',
          'عناصر اصلی شامل اطلاعات ایمنی فرآیند، تحلیل خطر، رویه‌های عملیاتی، آموزش، مدیریت تغییرات، بازرسی یکپارچگی تجهیزات، آمادگی برای شرایط اضطراری و بررسی حوادث است. این عناصر به هم وابسته‌اند؛ ضعف در یکی، اثربخشی بقیه را کاهش می‌دهد.',
          'مدیریت تغییرات یکی از بخش‌هایی است که بیشتر نادیده گرفته می‌شود. هر تغییر در فرآیند، مواد یا تجهیزات باید پیش از اجرا ارزیابی شود. چارچوب OSHA 29 CFR 1910.119 و مفاهیم مشابه در استانداردهای بین‌المللی، مرجع رایج این حوزه هستند.',
        ],
      },
      en: {
        title: 'Process Safety Management (PSM): A Framework for Preventing Major Accidents',
        summary: 'What PSM contains and why it is essential where hazardous chemicals are handled.',
        body: [
          'Process safety management is a set of systems and procedures that prevent major accidents involving hazardous chemicals. Its aim is to control process hazards, not merely to meet the letter of regulation.',
          'Core elements include process safety information, hazard analysis, operating procedures, training, management of change, mechanical integrity, emergency preparedness and incident investigation. These elements depend on each other: a weakness in one reduces the effectiveness of the rest.',
          'Management of change is often the most neglected element. Every change to process, materials or equipment should be assessed before implementation. OSHA 29 CFR 1910.119 is a widely used reference, and similar principles appear in international standards.',
        ],
      },
    },
  },
  {
    slug: 'hazop-study-in-design-and-operation',
    date: '2026-03-10',
    image: '/images/article-hazop-study.jpg',
    imageAlt: { fa: 'تیم مهندسی در جلسه بررسی نقشه‌های P&ID', en: 'Engineering team reviewing P&ID drawings' },
    sample: true,
    copy: {
      fa: {
        title: 'مطالعه HAZOP در طراحی و بهره‌برداری',
        summary: 'HAZOP چیست، چگونه جلسه آن برگزار می‌شود و چه خروجی‌هایی دارد.',
        body: [
          'HAZOP یک روش ساختاریافته برای شناسایی خطرات و مشکلات عملیاتی در فرآیندهای صنعتی است. تیم چندرشته‌ای با استفاده از نقشه‌های P&ID و کلمات راهنما مانند «بیشتر»، «کمتر» و «بدون»، انحرافات احتمالی از شرایط طراحی را بررسی می‌کند.',
          'موفقیت جلسه HAZOP به آماده‌سازی و ترکیب تیم وابسته است. دبیر جلسه باید نقشه‌ها را به‌روز داشته باشد و اعضا باید تجربه بهره‌برداری داشته باشند. برای هر سناریو، علل، پیامدها، حفاظ‌های موجود و اقدامات پیشنهادی ثبت می‌شود.',
          'HAZOP فقط یک مرحله در طراحی نیست. با تغییر فرآیند یا بازبینی دوره‌ای، باید تکرار شود تا با واقعیت کارخانه همخوان بماند. استاندارد IEC 61882 راهنمای این روش است.',
        ],
      },
      en: {
        title: 'HAZOP Study in Design and Operation',
        summary: 'What a HAZOP is, how the workshop runs and what it produces.',
        body: [
          'HAZOP is a structured method for identifying hazards and operability problems in process plants. A multidisciplinary team uses P&ID drawings and guide words such as "more", "less" and "no" to examine possible deviations from design intent.',
          'A successful HAZOP depends on preparation and team composition. The facilitator needs up-to-date drawings, and members need operating experience. For each scenario the team records causes, consequences, existing safeguards and recommended actions.',
          'A HAZOP is not a one-time design step. It should be repeated after significant process changes and during periodic reviews so that it reflects the plant as built. IEC 61882 provides guidance on the method.',
        ],
      },
    },
  },
  {
    slug: 'electrical-safety-in-industrial-plants',
    date: '2026-03-28',
    image: '/images/article-electrical-safety.jpg',
    imageAlt: { fa: 'تابلوهای برق صنعتی و سینی کابل', en: 'Industrial switchgear cabinets and cable trays' },
    sample: true,
    copy: {
      fa: {
        title: 'ایمنی برق در کارخانه‌های صنعتی',
        summary: 'خطرات اصلی برق در محیط‌های صنعتی و اقدامات پیشگیرانه.',
        body: [
          'خطرات برق در کارخانه‌ها شامل برق‌گرفتگی، قوس الکتریکی و آتش‌سوزی ناشی از اتصالات معیوب است. قوس الکتریکی به‌دلیل انرژی بالا می‌تواند برای پرسنل حتی در فاصله‌ای دور خطرناک باشد.',
          'کنترل خطر شامل قفل و برچسب‌گذاری منبع انرژی (LOTO)، استفاده از تجهیزات با درجه حفاظت مناسب، و تعیین مرزهای ایمن کار است. در مناطق با گاز یا گرد قابل اشتعال، تجهیزات باید مطابق استاندارد مناطق خطرناک مانند سری IEC 60079 انتخاب شوند.',
          'بازرسی حرارتی تابلوها و بررسی دوره‌ای اتصالات، ساده‌ترین روش برای پیش‌گیری از خرابی‌های بزرگ است. آموزش پرسنل غیر برقی درباره خطرات برق نیز بخشی از برنامه ایمنی است.',
        ],
      },
      en: {
        title: 'Electrical Safety in Industrial Plants',
        summary: 'The main electrical hazards in industrial settings and preventive measures.',
        body: [
          'Electrical hazards in plants include electric shock, arc flash and fires caused by faulty connections. Arc flash releases high energy and can injure people even at some distance.',
          'Control measures include lockout-tagout (LOTO), equipment with suitable protection ratings and defined safe approach boundaries. In areas with flammable gas or dust, equipment must follow hazardous-area standards such as the IEC 60079 series.',
          'Thermal inspection of panels and periodic checks of connections are simple ways to prevent major failures. Training non-electrical staff on electrical hazards is also part of the safety programme.',
        ],
      },
    },
  },
  {
    slug: 'confined-space-entry-safely',
    date: '2026-04-15',
    image: '/images/article-confined-space-entry.jpg',
    imageAlt: { fa: 'دریچه ورود مخزن با سه‌پایه ایمنی و مانیتور گاز', en: 'Tank entry hatch with safety tripod and gas monitor' },
    sample: true,
    copy: {
      fa: {
        title: 'ورود ایمن به فضاهای محدود',
        summary: 'فضای محدود چیست، چه خطراتی دارد و چگونه باید مدیریت شود.',
        body: [
          'فضای محدود، محیطی است که ورود و خروج در آن محدود است و تهویه طبیعی ندارد؛ مانند مخزن، کانال یا سیلو. خطرات اصلی آن کمبود اکسیژن، گازهای سمی و قابل اشتعال و خطر سقوط یا گیرافتادن است.',
          'قبل از ورود، جو داخل باید با دستگاه چندگازسنج آزمایش شود. مجوز ورود، نگهبان بیرون، تجهیزات نجات و تهویه اجباری از الزامات پایه‌اند. نگهبان نباید به هر دلیلی وارد فضا شود.',
          'طرح ورود باید برای هر کار مشخص باشد و با تغییر شرایط بازنگری شود. تمرین اجرای طرح نجات، پیش از نیاز واقعی، جان افراد را حفظ می‌کند.',
        ],
      },
      en: {
        title: 'Entering Confined Spaces Safely',
        summary: 'What a confined space is, its hazards and how to manage entry.',
        body: [
          'A confined space is an area with limited entry and exit and no natural ventilation, such as a tank, duct or silo. Its main hazards are oxygen deficiency, toxic or flammable gases, and falls or entrapment.',
          'Before entry, the atmosphere must be tested with a multi-gas detector. An entry permit, an attendant outside, rescue equipment and forced ventilation are basic requirements. The attendant must never enter the space.',
          'Every entry needs a plan specific to the task, reviewed when conditions change. Rehearsing the rescue plan before it is needed can save lives.',
        ],
      },
    },
  },
  {
    slug: 'ppe-selection-guide',
    date: '2026-05-06',
    image: '/images/article-ppe-selection.jpg',
    imageAlt: { fa: 'تجهیزات حفاظت فردی شامل کلاه، عینک و دستکش', en: 'Personal protective equipment on a steel bench' },
    sample: true,
    copy: {
      fa: {
        title: 'راهنمای انتخاب تجهیزات حفاظت فردی (PPE)',
        summary: 'PPE آخرین لایه کنترل خطر است. انتخاب درست آن بر اساس ارزیابی ریسک انجام می‌شود.',
        body: [
          'تجهیزات حفاظت فردی آخرین لایه در سلسله‌مراتب کنترل خطر است. پیش از آن باید حذف، جایگزینی، کنترل مهندسی و کنترل اداری در نظر گرفته شود. با این حال، در بسیاری از کارها PPE ضروری است.',
          'انتخاب PPE باید بر اساس ارزیابی ریسک انجام شود؛ مانند کلاه ایمنی برای خطر سقوط اجسام، عینک برای پاشش مواد، دستکش متناسب با ماده شیمیایی و گوش‌گیر در صداهای بالا. تجهیزات باید اندازه درست، سالم و دارای گواهی معتبر باشند.',
          'آموزش استفاده صحیح، نگهداری و تعویض به‌موقع PPE به اندازه خود تجهیز اهمیت دارد. تجهیز نامناسب یا نگهداری‌نشده، ممکن است حفاظت کاذب ایجاد کند.',
        ],
      },
      en: {
        title: 'Personal Protective Equipment (PPE) Selection Guide',
        summary: 'PPE is the last layer of hazard control. Choosing it correctly starts with a risk assessment.',
        body: [
          'Personal protective equipment is the last layer in the hierarchy of controls. Elimination, substitution, engineering and administrative controls should be considered first. Even so, PPE is essential for many tasks.',
          'PPE should follow the risk assessment: a safety helmet for falling objects, goggles for splashes, gloves suited to the chemical, and hearing protection for high noise. Equipment must fit properly, be in good condition and carry valid certification.',
          'Correct use, maintenance and timely replacement matter as much as the equipment itself. Poorly fitted or neglected PPE can create a false sense of protection.',
        ],
      },
    },
  },
  {
    slug: 'industrial-wastewater-treatment-basics',
    date: '2026-06-01',
    image: '/images/article-wastewater-treatment.jpg',
    imageAlt: { fa: 'حوضچه هوادهی تصفیه پساب صنعتی از نمای هوایی', en: 'Aerial view of an industrial wastewater aeration basin' },
    sample: true,
    copy: {
      fa: {
        title: 'اصول تصفیه پساب صنعتی',
        summary: 'مراحل اصلی تصفیه پساب، از پیش‌تصفیه تا تصفیه بیولوژیک.',
        body: [
          'پساب صنعتی معمولاً ترکیبی از مواد آلی، روغن، فلزات سنگین و مواد جامد معلق است. طراحی تصفیه باید با آنالیز دقیق کیفیت پساب شروع شود، زیرا ترکیب آن در هر صنعت متفاوت است.',
          'تصفیه معمولاً شامل مراحل پیش‌تصفیه (غربال و جداسازی روغن)، فرآیندهای فیزیکی-شیمیایی (انعقاد و ته‌نشینی) و تصفیه بیولوژیک (هوادهی) است. هر مرحله برای حذف دسته‌ای از آلاینده‌ها طراحی می‌شود.',
          'پایش مداوم خروجی، مقایسه با حدود مجاز زیست‌محیطی و نگهداری منظم تجهیزات، تضمین می‌کند که تصفیه‌خانه پایدار کار کند. تغییرات ناگهانی در ورودی، بزرگ‌ترین چالش بهره‌برداری است.',
        ],
      },
      en: {
        title: 'Industrial Wastewater Treatment Basics',
        summary: 'The main stages of effluent treatment, from pre-treatment to biological processes.',
        body: [
          'Industrial effluent usually contains organic matter, oil, heavy metals and suspended solids. Treatment design must start with a detailed characterisation, because the mix differs from one industry to another.',
          'Treatment typically includes pre-treatment (screening and oil separation), physico-chemical processes (coagulation and sedimentation) and biological treatment (aeration). Each stage targets a group of pollutants.',
          'Continuous monitoring of the outlet, comparison with environmental limits and regular equipment maintenance keep the plant stable. Sudden changes in the inflow are often the hardest operating challenge.',
        ],
      },
    },
  },
  {
    slug: 'industrial-fire-water-system-design',
    date: '2026-07-08',
    image: '/images/article-fire-water-systems.jpg',
    imageAlt: { fa: 'خانه پمپ آب آتش‌نشانی صنعتی', en: 'Industrial fire water pump house' },
    sample: true,
    copy: {
      fa: {
        title: 'طراحی شبکه آب آتش‌نشانی صنعتی',
        summary: 'اجزای اصلی شبکه آب آتش‌نشانی و نکاتی که در طراحی و آزمون باید رعایت شود.',
        body: [
          'شبکه آب آتش‌نشانی باید در شرایط اضطراری، فشار و دبی کافی را برای سیستم‌های اسپرینکلر، شیرهای آتش‌نشانی و سیستم‌های اطفای ویژه تأمین کند. طراحی آن با محاسبه سناریوی حریق بزرگ‌ترین خطر آغاز می‌شود.',
          'اجزای اصلی شامل منبع آب، پمپ‌های آتش‌نشانی (معمولاً پمپ اصلی، پمپ پشتیبان و پمپ جوکی)، شبکه لوله‌کشی حلقوی و شیرهای کنترلی است. استاندارد NFPA 20 برای نصب پمپ‌ها و NFPA 13 برای سیستم‌های اسپرینکلر، مراجع رایج در این حوزه‌اند.',
          'آزمون‌های دوره‌ای پمپ‌ها و شیرها، ثبت فشار و دبی، و بررسی منبع آب باید جزو برنامه نگهداری باشد. شبکه‌ای که در لحظه نیاز کار نکند، بی‌فایده است.',
        ],
      },
      en: {
        title: 'Industrial Fire Water System Design',
        summary: 'Key components of a fire water network and what to check in design and testing.',
        body: [
          'A fire water network must deliver adequate pressure and flow for sprinklers, hydrants and special suppression systems during an emergency. Design starts with the largest credible fire scenario.',
          'Main components are the water source, fire pumps (usually a main, a standby and a jockey pump), the ring main piping and control valves. NFPA 20 covers pump installation and NFPA 13 covers sprinkler systems, and both are widely used references.',
          'Periodic pump and valve tests, recorded pressure and flow, and checks of the water source must be part of the maintenance plan. A network that fails when needed is of no use.',
        ],
      },
    },
  },
  {
    slug: 'predictive-maintenance-vibration-monitoring',
    date: '2026-08-12',
    image: '/images/article-predictive-maintenance.jpg',
    imageAlt: { fa: 'تکنسین با تبلت کنار پمپ دوار و حسگر ارتعاش', en: 'Technician with a tablet beside a rotating pump' },
    sample: true,
    copy: {
      fa: {
        title: 'نگهداری پیش‌بین با پایش ارتعاش',
        summary: 'چگونه داده‌های ارتعاش و دما به تصمیم‌های بهتر درباره تعمیرات کمک می‌کنند.',
        body: [
          'نگهداری پیش‌بین تعمیر تجهیزات را بر اساس وضعیت واقعی آن‌ها برنامه‌ریزی می‌کند، نه بر اساس زمان ثابت یا پس از خرابی. ارتعاش یکی از مهم‌ترین شاخص‌ها برای پایش پمپ‌ها، کمپرسورها و موتورهاست.',
          'تغییر الگوی ارتعاش می‌تواند نشانه عدم تراز، یاتاقان معیوب یا عدم تعادل روتور باشد. تحلیل طیف فرکانسی به شناسایی علت کمک می‌کند. ترکیب داده‌های ارتعاش، دما و جریان موتور، تصویر دقیق‌تری از سلامت تجهیز می‌دهد.',
          'موفقیت این روش به کیفیت داده، تعریف آستانه‌های هشدار و آموزش تیم نگهداری بستگی دارد. داده‌هایی که تحلیل نمی‌شوند، فقط هزینه ذخیره‌سازی هستند.',
        ],
      },
      en: {
        title: 'Predictive Maintenance with Vibration Monitoring',
        summary: 'How vibration and temperature data support better repair decisions.',
        body: [
          'Predictive maintenance schedules repairs based on the actual condition of equipment, not on a fixed time or after a failure. Vibration is one of the most useful indicators for pumps, compressors and motors.',
          'A change in vibration pattern can point to misalignment, a worn bearing or rotor imbalance. Frequency spectrum analysis helps identify the cause. Combining vibration, temperature and motor current data gives a clearer picture of machine health.',
          'The approach works only with good data quality, clear alarm thresholds and a trained maintenance team. Data that is never analysed is just storage cost.',
        ],
      },
    },
  },
];
