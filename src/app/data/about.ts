import type { Education, SkillGroup } from '../models/content';
import type { Localized } from '../models/localized';

export const APPROACH: readonly { title: Localized; text: Localized }[] = [
  {
    title: { en: 'Clean architecture', ar: 'معمارية نظيفة' },
    text: {
      en: 'Repository and service layers keep UI, logic and data access separate.',
      ar: 'طبقات Repository وService تفصل بين الواجهة والمنطق والوصول إلى البيانات.',
    },
  },
  {
    title: { en: 'Reusable components', ar: 'مكوّنات قابلة لإعادة الاستخدام' },
    text: {
      en: 'Shared component libraries instead of one-off screens.',
      ar: 'مكتبات مكوّنات مشتركة بدل شاشات منفردة.',
    },
  },
  {
    title: { en: 'Performance', ar: 'الأداء' },
    text: {
      en: 'Lazy loading, code splitting and bundle budgets.',
      ar: 'التحميل عند الطلب وتقسيم الكود وحدود لحجم الحزم.',
    },
  },
  {
    title: { en: 'Polished UX', ar: 'تجربة مستخدم متقنة' },
    text: {
      en: 'Bilingual RTL/LTR support treated as a core requirement, not an afterthought.',
      ar: 'دعم RTL/LTR ثنائي اللغة كمتطلب أساسي وليس إضافة لاحقة.',
    },
  },
];

export const SKILLS: readonly SkillGroup[] = [
  {
    title: { en: 'Core', ar: 'الأساسيات' },
    items: ['Angular 18–21', 'TypeScript', 'RxJS', 'Signals', 'JavaScript (ES6+)'],
  },
  {
    title: { en: 'Architecture', ar: 'المعمارية' },
    items: ['Repository/Service/Mock layering', 'Lazy loading', 'HTTP interceptors', 'Role-based access'],
  },
  {
    title: { en: 'UI & styling', ar: 'الواجهة والتنسيق' },
    items: ['SCSS', 'Tailwind CSS', 'Bootstrap 5', 'Angular Material', 'PrimeNG'],
  },
  {
    title: { en: 'Internationalization', ar: 'تعدد اللغات' },
    items: ['ngx-translate', 'Signal-based i18n', 'RTL/LTR (Arabic/English)'],
  },
  {
    title: { en: 'Rendering & performance', ar: 'العرض والأداء' },
    items: ['Angular SSR', 'Hydration', 'Bundle optimization'],
  },
  {
    title: { en: 'Integrations', ar: 'التكاملات' },
    items: ['REST APIs', 'SignalR', 'Paymob', 'Sentry', 'ExcelJS', 'jsPDF'],
  },
  {
    title: { en: 'Testing & tooling', ar: 'الاختبار والأدوات' },
    items: ['Vitest', 'Jasmine/Karma', 'Git/GitHub', 'Angular CLI', 'Docker', 'CI/CD'],
  },
];

export const EDUCATION: readonly Education[] = [
  {
    title: { en: 'Intensive Code Camp — Full Stack (MEARN)', ar: 'معسكر برمجة مكثف — Full Stack (MEARN)' },
    institution: { en: 'Information Technology Institute (ITI)', ar: 'معهد تكنولوجيا المعلومات (ITI)' },
    period: { en: 'Oct 2023 – Mar 2024', ar: 'أكتوبر 2023 – مارس 2024' },
  },
  {
    title: { en: 'B.Sc. Computer Science', ar: 'بكالوريوس علوم الحاسب' },
    institution: {
      en: 'Faculty of Computers & Information, Kafrelsheikh University',
      ar: 'كلية الحاسبات والمعلومات، جامعة كفر الشيخ',
    },
    period: { en: '2016 – 2020', ar: '2016 – 2020' },
  },
];
