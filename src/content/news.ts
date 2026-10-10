import { withBase } from '../lib/base';
import type { Locale } from '../i18n/utils';

/** Technical articles. `sample: true` items show a "نمونه / Sample" badge. */
export interface ArticleCopy {
  title: string;
  summary: string;
  body: string[];
}

export const TOPICS = ['safety', 'maintenance', 'facilities', 'environment'] as const;
export type TopicId = (typeof TOPICS)[number];

/** Labels for the topic filter. */
export const topicLabels: Record<TopicId, Record<Locale, string>> = {
  safety: { fa: 'ایمنی', en: 'Safety' },
  maintenance: { fa: 'نگهداری', en: 'Maintenance' },
  facilities: { fa: 'تأسیسات', en: 'Facilities' },
  environment: { fa: 'محیط زیست', en: 'Environment' },
};

/** Articles per listing page. */
export const PAGE_SIZE = 6;

export interface Article {
  slug: string;
  topic: TopicId;
  date: string; // ISO date (YYYY-MM-DD)
  image: string;
  imageAlt: Record<Locale, string>;
  sample: boolean;
  copy: Record<Locale, ArticleCopy>;
}

const baseArticles: Article[] = [
  {
    slug: 'hse-risk-assessment-basics',

    topic: 'safety',
    date: '2026-06-15',
    image: withBase('/images/service-hse-environment.jpg'),
    imageAlt: { fa: 'کارشناس محیط زیست در حال نمونه‌برداری', en: 'Environmental engineer sampling water' },
    sample: true,
    copy: {
      fa: {
        title: 'مبانی ارزیابی ریسک HSE در پروژه‌های صنعتی (نمونه)',
        summary: 'چرا ارزیابی ریسک باید پیش از شروع اجرا انجام شود و چه مراحلی دارد.',
        body: [
          'این متن نمونه است و جایگزین مقاله واقعی خواهد شد.',
          'ارزیابی ریسک HSE ابزار اصلی تصمیم‌گیری درباره کنترل مخاطرات در پروژه‌های صنعتی است. انجام آن پیش از اجرا، هزینه اصلاحات را کاهش می‌دهد.',
          'مراحل: شناسایی مخاطرات، تحلیل احتمال و شدت، تعیین اقدامات کنترلی و پایش اثربخشی.',
        ],
      },
      en: {
        title: 'HSE Risk Assessment Basics for Industrial Projects (Sample)',
        summary: 'Why risk assessment should happen before execution, and what it involves.',
        body: [
          'This is sample text that will be replaced by a real article.',
          'HSE risk assessment is the main tool for deciding how hazards are controlled in industrial projects. Doing it before execution lowers the cost of corrective work.',
          'Steps: hazard identification, likelihood and severity analysis, selection of control measures and effectiveness monitoring.',
        ],
      },
    },
  },
  {
    slug: 'fire-suppression-maintenance-checklist',

    topic: 'safety',
    date: '2026-07-20',
    image: withBase('/images/service-fire-safety.jpg'),
    imageAlt: { fa: 'لوله‌ها و اسپرینکلرهای سیستم اطفای حریق', en: 'Fire suppression piping and sprinklers' },
    sample: true,
    copy: {
      fa: {
        title: 'چک‌لیست نگهداری سیستم اطفای حریق صنعتی (نمونه)',
        summary: 'موارد کلیدی که در بازرسی‌های دوره‌ای سیستم‌های اطفا باید بررسی شوند.',
        body: [
          'این متن نمونه است و جایگزین مقاله واقعی خواهد شد.',
          'بازرسی دوره‌ای سیستم‌های اطفا شامل بررسی فشار، سالم‌بودن اسپرینکلرها، وضعیت شیرهای کنترل و آزمون عملکرد پمپ است.',
          'ثبت سوابق بازرسی برای ممیزی‌ها و تصمیم‌گیری درباره تعویض تجهیزات ضروری است.',
        ],
      },
      en: {
        title: 'Industrial Fire Suppression Maintenance Checklist (Sample)',
        summary: 'Key items to check during periodic inspections of suppression systems.',
        body: [
          'This is sample text that will be replaced by a real article.',
          'Periodic inspection covers pressure checks, sprinkler condition, control valve status and pump performance testing.',
          'Keeping inspection records is essential for audits and for deciding when equipment must be replaced.',
        ],
      },
    },
  },
  {
    slug: 'commissioning-handover-practice',

    topic: 'maintenance',
    date: '2026-08-30',
    image: withBase('/images/service-hvac-piping.jpg'),
    imageAlt: { fa: 'سیستم تأسیسات و لوله‌کشی صنعتی', en: 'Industrial HVAC and piping system' },
    sample: true,
    copy: {
      fa: {
        title: 'اصول راه‌اندازی و تحویل تأسیسات (نمونه)',
        summary: 'چگونه راه‌اندازی منظم، از خطاهای پس از تحویل جلوگیری می‌کند.',
        body: [
          'این متن نمونه است و جایگزین مقاله واقعی خواهد شد.',
          'راه‌اندازی منظم شامل پیش‌راه‌اندازی، تست عملکرد و آموزش بهره‌برداری است. مدارک تحویل باید کامل و قابل پیگیری باشند.',
        ],
      },
      en: {
        title: 'Commissioning and Handover Practice (Sample)',
        summary: 'How structured commissioning prevents post-handover failures.',
        body: [
          'This is sample text that will be replaced by a real article.',
          'Structured commissioning covers pre-commissioning checks, performance testing and operator training. Handover documents must be complete and traceable.',
        ],
      },
    },
  },
];

import { extraArticles } from './news-extra';
import { moreArticles } from './news-more';

/** All articles, newest first. */
export const articles: Article[] = [...baseArticles, ...extraArticles, ...moreArticles];

export function getArticle(slug: string) {
  return articles.find((a) => a.slug === slug);
}
