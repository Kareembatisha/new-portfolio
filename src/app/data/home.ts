import type { Stat, Step, Strength } from '../models/content';

/** Capabilities shown right under the hero; kept short on purpose. */
export const EXPERTISE: readonly string[] = [
  'Angular',
  'TypeScript',
  'RxJS',
  'Signals',
  'SSR',
  'REST APIs',
  'Real-time (SignalR)',
  'RTL/LTR',
  'Testing',
  'CI/CD',
];

export const STEPS: readonly Step[] = [
  {
    title: { en: 'Understand', ar: 'فهم المتطلبات' },
    text: {
      en: 'Clarify the business goal, the users and the API contracts before writing code.',
      ar: 'أحدد هدف العمل والمستخدمين وعقود الـ API قبل كتابة أي كود.',
    },
  },
  {
    title: { en: 'Architect', ar: 'تصميم المعمارية' },
    text: {
      en: 'Structure the app in clear layers (UI, services, repositories) so it stays testable and easy to extend.',
      ar: 'أُنظّم التطبيق في طبقات واضحة (واجهة، خدمات، Repositories) ليبقى قابلًا للاختبار وسهل التوسع.',
    },
  },
  {
    title: { en: 'Build', ar: 'البناء' },
    text: {
      en: 'Deliver in small working increments, using reusable components and typed APIs.',
      ar: 'أسلّم على مراحل صغيرة تعمل، باستخدام مكوّنات قابلة لإعادة الاستخدام وواجهات مُنمّطة بالأنواع.',
    },
  },
  {
    title: { en: 'Ship', ar: 'الإطلاق' },
    text: {
      en: 'Integrate with the real APIs, test the core logic and deploy to production.',
      ar: 'أربط التطبيق بالـ API الحقيقية، وأختبر المنطق الأساسي، وأنشره للإنتاج.',
    },
  },
];

export const STRENGTHS: readonly Strength[] = [
  {
    title: { en: 'Clean, testable architecture', ar: 'معمارية نظيفة وقابلة للاختبار' },
    text: {
      en: 'A strict repository → service → mock data layer lets the UI be built and tested against mock data, then switched to live APIs without touching components.',
      ar: 'طبقة بيانات صارمة (Repository ← Service ← Mock) تسمح ببناء الواجهة واختبارها على بيانات تجريبية ثم التحويل إلى الـ API الحقيقية دون المساس بالمكوّنات.',
    },
    seenIn: ['AlSalam International'],
  },
  {
    title: { en: 'Arabic and English, done properly', ar: 'العربية والإنجليزية بشكل صحيح' },
    text: {
      en: 'Full RTL/LTR support, including a signal-based translation service with instant runtime switching and no page reloads.',
      ar: 'دعم كامل لـ RTL/LTR، بما في ذلك خدمة ترجمة مبنية على Signals بتبديل فوري للغة وبدون إعادة تحميل الصفحة.',
    },
    seenIn: ['AlSalam International', 'E-Commerce Platform', 'AI Cloud Website'],
  },
  {
    title: { en: 'Rendering and performance', ar: 'العرض والأداء' },
    text: {
      en: 'Server-side rendering with cookie-based sessions, plus build configuration with lazy-loaded routes and bundle budgets.',
      ar: 'Server-Side Rendering مع جلسات قائمة على الـ Cookies، وإعدادات بناء تشمل التحميل عند الطلب للمسارات وحدودًا لحجم الحزم.',
    },
    seenIn: ['E-Commerce Platform', 'AI Cloud Website'],
  },
  {
    title: { en: 'Real-time and integrations', ar: 'التحديثات الفورية والتكاملات' },
    text: {
      en: 'Live updates over SignalR, secure checkout with Paymob, and production error tracking with Sentry.',
      ar: 'تحديثات فورية عبر SignalR، ودفع آمن عبر Paymob، وتتبع أخطاء الإنتاج عبر Sentry.',
    },
    seenIn: ['CleanTech', 'E-Commerce Platform'],
  },
];

/**
 * Only figures verified in the project source code. `source` names where each one comes from.
 *  - 5 projects: the portfolio's own list (user-confirmed).
 *  - 20+ entities: CleanTech admin routes cover 21 manageable entities.
 *  - 5 roles: CleanTech has Admin, Manager, Supervisor, Cleaner and Auditor, each with its own route tree.
 *  - 2 languages: Arabic/English with RTL in AlSalam, the e-commerce apps and the AI Cloud site.
 */
export const STATS: readonly Stat[] = [
  {
    value: 5,
    label: { en: 'Projects delivered', ar: 'مشاريع منفذة' },
    source: { en: 'Dashboards, e-commerce and websites', ar: 'لوحات تحكم ومتاجر ومواقع' },
  },
  {
    value: 20,
    plus: true,
    label: { en: 'Business entities in one platform', ar: 'كيان تشغيلي في منصة واحدة' },
    source: { en: 'CleanTech', ar: 'CleanTech' },
  },
  {
    value: 5,
    label: { en: 'User roles with separate access', ar: 'أدوار مستخدمين بصلاحيات منفصلة' },
    source: { en: 'CleanTech', ar: 'CleanTech' },
  },
  {
    value: 2,
    label: { en: 'Languages, with full RTL support', ar: 'لغتان بدعم كامل لـ RTL' },
    source: { en: 'AlSalam, E-Commerce, AI Cloud site', ar: 'السلام، المتجر، موقع AI Cloud' },
  },
];
