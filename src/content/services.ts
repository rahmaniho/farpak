import type { Locale } from '../i18n/utils';

/**
 * Bilingual service content. Source of truth until Sanity is connected.
 * Placeholders are marked with [placeholder] and must be replaced with verified content.
 */
export interface ServiceCopy {
  title: string;
  summary: string;
  description: string;
  process: string[];
  outputs: string[];
  standards: string;
}

export interface Service {
  slug: string;
  image: string;
  imageAlt: Record<Locale, string>;
  copy: Record<Locale, ServiceCopy>;
}

export const services: Service[] = [
  {
    slug: 'engineering',
    image: '/images/service-engineering.jpg',
    imageAlt: { fa: 'مهندسان در حال بررسی نقشه‌ها روی تبلت', en: 'Engineers reviewing blueprints on a tablet' },
    copy: {
      fa: {
        title: 'مهندسی و مشاوره',
        summary: 'طراحی، نظارت و مشاوره فنی برای تأسیسات صنعتی.',
        description: 'از مطالعات امکان‌سنجی تا طراحی تفصیلی و نظارت بر اجرا، با تمرکز بر ایمنی، قابلیت بهره‌برداری و هزینه چرخه عمر.',
        process: ['مطالعات امکان‌سنجی و بررسی الزامات', 'طراحی مفهومی و تفصیلی', 'مدارک مهندسی و بازبینی', 'نظارت فنی بر اجرا'],
        outputs: ['نقشه‌ها و مشخصات فنی', 'گزارش‌های مطالعاتی', 'برنامه کنترل کیفیت'],
        standards: '[placeholder] فهرست استانداردهای مهندسی مورد استفاده',
      },
      en: {
        title: 'Engineering & Consulting',
        summary: 'Design, supervision and technical consulting for industrial facilities.',
        description: 'From feasibility studies to detailed design and construction supervision, focused on safety, operability and lifecycle cost.',
        process: ['Feasibility studies and requirements review', 'Conceptual and detailed design', 'Engineering documentation and review', 'Technical supervision of execution'],
        outputs: ['Drawings and technical specifications', 'Study and assessment reports', 'Quality control plan'],
        standards: '[placeholder] list of engineering standards applied',
      },
    },
  },
  {
    slug: 'construction',
    image: '/images/service-construction.jpg',
    imageAlt: { fa: 'کارگاه ساخت تأسیسات صنعتی با جرثقیل', en: 'Industrial facility construction site with crane' },
    copy: {
      fa: {
        title: 'پیمانکاری و اجرا',
        summary: 'اجرای پروژه‌های صنعتی و ساختمانی با کنترل کیفیت و ایمنی.',
        description: 'مدیریت اجرای پروژه از تأمین نیرو و تجهیزات تا تحویل موقت، با برنامه زمان‌بندی و گزارش‌دهی منظم به کارفرما.',
        process: ['برنامه‌ریزی و زمان‌بندی پروژه', 'تأمین مصالح و تجهیزات', 'اجرای کارگاهی تحت کنترل کیفیت', 'بازرسی و تحویل موقت'],
        outputs: ['برنامه زمان‌بندی و گزارش پیشرفت', 'مستندات کیفیت و بازرسی', 'پرونده تحویل پروژه'],
        standards: '[placeholder] استانداردها و الزامات اجرایی',
      },
      en: {
        title: 'Contracting & Construction',
        summary: 'Delivery of industrial and building projects with quality and safety control.',
        description: 'Full project execution from manpower and equipment procurement to provisional handover, with schedules and regular client reporting.',
        process: ['Project planning and scheduling', 'Material and equipment procurement', 'Site execution under quality control', 'Inspection and provisional handover'],
        outputs: ['Schedule and progress reports', 'Quality and inspection records', 'Project handover file'],
        standards: '[placeholder] execution standards and requirements',
      },
    },
  },
  {
    slug: 'fire-safety',
    image: '/images/service-fire-safety.jpg',
    imageAlt: { fa: 'لوله‌ها و اسپرینکلرهای سیستم اطفای حریق صنعتی', en: 'Industrial fire suppression piping and sprinklers' },
    copy: {
      fa: {
        title: 'ایمنی و آتش‌نشانی',
        summary: 'طراحی، نصب و نگهداری سیستم‌های اطفای حریق صنعتی.',
        description: 'طراحی و نصب سیستم‌های اعلام و اطفای حریق، همراه با آزمون‌های دوره‌ای و نگهداری پیشگیرانه.',
        process: ['ارزیابی ریسک حریق', 'طراحی سیستم اطفا و اعلام', 'نصب و راه‌اندازی', 'آزمون دوره‌ای و نگهداری'],
        outputs: ['نقشه‌ها و محاسبات سیستم', 'گزارش آزمون و راه‌اندازی', 'برنامه نگهداری'],
        standards: '[placeholder] استانداردهای حریق و الزامات مرجع',
      },
      en: {
        title: 'Fire Safety Systems',
        summary: 'Design, installation and maintenance of industrial fire suppression systems.',
        description: 'Design and installation of fire detection and suppression systems, with periodic testing and preventive maintenance.',
        process: ['Fire risk assessment', 'Suppression and detection system design', 'Installation and commissioning', 'Periodic testing and maintenance'],
        outputs: ['System drawings and calculations', 'Testing and commissioning reports', 'Maintenance plan'],
        standards: '[placeholder] applicable fire codes and reference standards',
      },
    },
  },
  {
    slug: 'hse',
    image: '/images/service-hse-environment.jpg',
    imageAlt: { fa: 'کارشناس محیط زیست در حال نمونه‌برداری آب', en: 'Environmental engineer sampling water near a plant' },
    copy: {
      fa: {
        title: 'HSE و محیط زیست',
        summary: 'پایش، ارزیابی ریسک و انطباق با الزامات ایمنی و محیط زیست.',
        description: 'شناسایی مخاطرات، ارزیابی ریسک، پایش آلاینده‌ها و آموزش نیروی کار برای انطباق با الزامات HSE.',
        process: ['شناسایی مخاطرات و ارزیابی ریسک', 'پایش محیط زیست', 'تدوین رویه‌ها و آموزش', 'ممیزی و پیگیری اقدامات اصلاحی'],
        outputs: ['گزارش ارزیابی ریسک', 'گزارش پایش محیط زیست', 'برنامه آموزش و ممیزی'],
        standards: '[placeholder] الزامات HSE و محیط زیست مرجع',
      },
      en: {
        title: 'HSE & Environment',
        summary: 'Monitoring, risk assessment and compliance with safety and environmental requirements.',
        description: 'Hazard identification, risk assessment, emissions monitoring and workforce training to meet HSE requirements.',
        process: ['Hazard identification and risk assessment', 'Environmental monitoring', 'Procedures and training', 'Audits and corrective-action follow-up'],
        outputs: ['Risk assessment report', 'Environmental monitoring report', 'Training and audit plan'],
        standards: '[placeholder] applicable HSE and environmental requirements',
      },
    },
  },
  {
    slug: 'maintenance',
    image: '/images/service-hvac-piping.jpg',
    imageAlt: { fa: 'سیستم تأسیسات و لوله‌کشی صنعتی', en: 'Industrial HVAC and piping system' },
    copy: {
      fa: {
        title: 'راه‌اندازی و نگهداری',
        summary: 'راه‌اندازی، بهره‌برداری و نگهداری پیشگیرانه تأسیسات.',
        description: 'راه‌اندازی تجهیزات و تأسیسات، آموزش بهره‌برداری و قراردادهای نگهداری پیشگیرانه برای افزایش عمر و قابلیت اطمینان.',
        process: ['پیش‌راه‌اندازی و کنترل نصب', 'راه‌اندازی و تست عملکرد', 'آموزش بهره‌برداری', 'نگهداری پیشگیرانه و اصلاحی'],
        outputs: ['گزارش راه‌اندازی', 'برنامه نگهداری پیشگیرانه', 'سوابق نگهداری'],
        standards: '[placeholder] استانداردهای نگهداری و تست',
      },
      en: {
        title: 'Commissioning & Maintenance',
        summary: 'Commissioning, operation and preventive maintenance of facilities.',
        description: 'Equipment and system commissioning, operator training and preventive maintenance contracts to extend asset life and reliability.',
        process: ['Pre-commissioning and installation checks', 'Start-up and performance testing', 'Operator training', 'Preventive and corrective maintenance'],
        outputs: ['Commissioning report', 'Preventive maintenance plan', 'Maintenance records'],
        standards: '[placeholder] maintenance and testing standards',
      },
    },
  },
  {
    slug: 'urban',
    image: '/images/project-water-treatment.jpg',
    imageAlt: { fa: 'تأسیسات تصفیه آب با مخازن دایره‌ای', en: 'Water treatment facility with circular tanks' },
    copy: {
      fa: {
        title: 'خدمات شهری',
        summary: 'خدمات فنی و اجرایی برای نهادهای شهری و شهرداری‌ها.',
        description: 'مشاوره فنی، اجرا و نگهداری تأسیسات شهری، با رویکرد پاسخگویی به الزامات نهادهای عمومی.',
        process: ['بررسی نیاز و تدوین مشخصات', 'مناقصه و انتخاب پیمانکار', 'اجرا و نظارت', 'بهره‌برداری و نگهداری'],
        outputs: ['مشخصات فنی و مدارک مناقصه', 'گزارش پیشرفت و تحویل', 'گزارش عملکرد'],
        standards: '[placeholder] الزامات نهادهای شهری مرجع',
      },
      en: {
        title: 'Urban Services',
        summary: 'Technical and execution services for municipalities and urban bodies.',
        description: 'Technical consulting, execution and maintenance of urban infrastructure, aligned with public-sector requirements.',
        process: ['Needs review and specification', 'Tender and contractor selection', 'Execution and supervision', 'Operation and maintenance'],
        outputs: ['Technical specifications and tender documents', 'Progress and handover reports', 'Performance report'],
        standards: '[placeholder] applicable public-sector requirements',
      },
    },
  },
];

export function getService(slug: string) {
  return services.find((s) => s.slug === slug);
}
