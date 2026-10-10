import { withBase } from '../lib/base';
import type { Locale } from '../i18n/utils';

/** Project case studies. `sample: true` items show a "نمونه / Sample" badge. */
export interface ProjectCopy {
  title: string;
  summary: string;
  client: string;
  scope: string;
  challenge: string;
  solution: string;
  results: string[];
}

export interface Project {
  slug: string;
  year: number;
  sector: 'oil-gas' | 'petrochemical' | 'utilities' | 'urban';
  image: string;
  imageAlt: Record<Locale, string>;
  sample: boolean;
  copy: Record<Locale, ProjectCopy>;
}

export const projects: Project[] = [
  {
    slug: 'gas-refinery-hse-upgrade',
    year: 1404,
    sector: 'oil-gas',
    image: withBase('/images/project-gas-refinery.jpg'),
    imageAlt: { fa: 'پالایشگاه گاز در غروب', en: 'Gas refinery at dusk' },
    sample: true,
    copy: {
      fa: {
        title: 'ارتقای HSE پالایشگاه گاز (نمونه)',
        summary: 'بازنگری ارزیابی ریسک و ارتقای سیستم‌های ایمنی یک واحد فرآیندی.',
        client: '[کارفرمای نمونه]',
        scope: 'ارزیابی ریسک، طراحی اصلاحات ایمنی، آموزش پرسنل',
        challenge: 'واحد فرآیندی با مخاطرات حریق و نشت گاز و رویه‌های ایمنی ناهماهنگ.',
        solution: 'بازنگری کامل ارزیابی ریسک، طراحی اصلاحات و تدوین رویه‌های عملیاتی یکپارچه.',
        results: ['کاهش موارد ثبت‌شده در ممیزی داخلی (نمونه)', 'تکمیل آموزش ایمنی برای تمام پرسنل واحد (نمونه)'],
      },
      en: {
        title: 'Gas Refinery HSE Upgrade (Sample)',
        summary: 'Risk assessment review and safety system upgrades for a process unit.',
        client: '[Sample client]',
        scope: 'Risk assessment, safety upgrade design, personnel training',
        challenge: 'A process unit with fire and gas-leak hazards and inconsistent operating procedures.',
        solution: 'Full risk assessment review, upgrade design and a single integrated set of operating procedures.',
        results: ['Reduced findings in internal audit (sample)', 'Safety training completed for all unit staff (sample)'],
      },
    },
  },
  {
    slug: 'petrochemical-piping-maintenance',
    year: 1404,
    sector: 'petrochemical',
    image: withBase('/images/project-petrochemical-aerial.jpg'),
    imageAlt: { fa: 'نمای هوایی مجتمع پتروشیمی', en: 'Aerial view of a petrochemical complex' },
    sample: true,
    copy: {
      fa: {
        title: 'نگهداری پیشگیرانه خطوط لوله پتروشیمی (نمونه)',
        summary: 'برنامه‌ریزی و اجرای بازرسی و نگهداری پیشگیرانه خطوط فرآیندی.',
        client: '[کارفرمای نمونه]',
        scope: 'بازرسی، برنامه نگهداری، اجرای تعمیرات برنامه‌ریزی‌شده',
        challenge: 'خرابی‌های مکرر خطوط و توقف‌های برنامه‌نشده تولید.',
        solution: 'استقرار برنامه بازرسی بر اساس ریسک و نگهداری پیشگیرانه با زمان‌بندی مشخص.',
        results: ['کاهش توقف‌های برنامه‌نشده (نمونه)', 'ثبت کامل سوابق بازرسی (نمونه)'],
      },
      en: {
        title: 'Petrochemical Piping Preventive Maintenance (Sample)',
        summary: 'Planning and execution of inspection and preventive maintenance for process piping.',
        client: '[Sample client]',
        scope: 'Inspection, maintenance plan, scheduled repair execution',
        challenge: 'Recurring line failures and unplanned production shutdowns.',
        solution: 'A risk-based inspection programme and preventive maintenance schedule.',
        results: ['Reduced unplanned shutdowns (sample)', 'Complete inspection records maintained (sample)'],
      },
    },
  },
  {
    slug: 'water-treatment-plant-engineering',
    year: 1403,
    sector: 'utilities',
    image: withBase('/images/project-water-treatment.jpg'),
    imageAlt: { fa: 'تأسیسات تصفیه آب صنعتی', en: 'Industrial water treatment facility' },
    sample: true,
    copy: {
      fa: {
        title: 'مهندسی تصفیه‌خانه صنعتی (نمونه)',
        summary: 'مطالعات فنی، طراحی تفصیلی و نظارت بر اجرای یک تصفیه‌خانه صنعتی.',
        client: '[کارفرمای نمونه]',
        scope: 'مطالعات امکان‌سنجی، طراحی تفصیلی، نظارت بر اجرا',
        challenge: 'نیاز به تصفیه پساب با الزامات زیست‌محیطی سخت‌گیرانه.',
        solution: 'طراحی فرآیند تصفیه چندمرحله‌ای با پایش مداوم کیفیت پساب.',
        results: ['تحویل پروژه طبق برنامه زمان‌بندی (نمونه)', 'انطباق خروجی با الزامات محیط زیست (نمونه)'],
      },
      en: {
        title: 'Industrial Water Treatment Plant Engineering (Sample)',
        summary: 'Technical studies, detailed design and execution supervision of an industrial treatment plant.',
        client: '[Sample client]',
        scope: 'Feasibility studies, detailed design, execution supervision',
        challenge: 'Effluent treatment required to meet strict environmental limits.',
        solution: 'A multi-stage treatment process design with continuous effluent quality monitoring.',
        results: ['Delivered on the planned schedule (sample)', 'Effluent compliant with environmental requirements (sample)'],
      },
    },
  },
];

export function getProject(slug: string) {
  return projects.find((p) => p.slug === slug);
}
