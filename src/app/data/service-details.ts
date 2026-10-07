import type { ServiceDetail } from '../models/content';

export const SERVICE_DETAILS: readonly ServiceDetail[] = [
  {
    id: 'frontend',
    forWho: {
      en: 'Teams and businesses that already have a backend or APIs and need a strong, maintainable frontend.',
      ar: 'الفرق والشركات التي لديها Backend أو APIs وتحتاج إلى واجهة أمامية قوية وسهلة الصيانة.',
    },
    included: [
      { en: 'Application architecture and project structure', ar: 'معمارية التطبيق وهيكلة المشروع' },
      { en: 'A reusable component library', ar: 'مكتبة مكوّنات قابلة لإعادة الاستخدام' },
      { en: 'API integration with typed models', ar: 'الربط مع الـ APIs بنماذج مُنمّطة بالأنواع' },
      { en: 'Lazy loading and code splitting', ar: 'التحميل عند الطلب وتقسيم الكود' },
      { en: 'Responsive, accessible interfaces', ar: 'واجهات متجاوبة وسهلة الوصول' },
    ],
    challenges: [
      {
        en: 'Keeping a growing codebase consistent and easy to change.',
        ar: 'الحفاظ على اتساق كود متنامٍ وسهولة تعديله.',
      },
      {
        en: 'Keeping performance under control as features are added.',
        ar: 'إبقاء الأداء تحت السيطرة مع إضافة الميزات.',
      },
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'Signals', 'SCSS'],
    projects: ['alsalam-international', 'cleantech'],
  },
  {
    id: 'web-apps',
    forWho: {
      en: 'Founders and businesses with clear requirements who need the application built from the ground up.',
      ar: 'المؤسسون والشركات ذوو المتطلبات الواضحة الذين يحتاجون إلى بناء التطبيق من الصفر.',
    },
    included: [
      { en: 'Turning requirements into screens and flows', ar: 'تحويل المتطلبات إلى شاشات وتدفقات' },
      { en: 'Authentication and role-based access', ar: 'المصادقة والصلاحيات حسب الدور' },
      { en: 'API integration, with mock data while the backend is in progress', ar: 'الربط مع الـ API، مع بيانات تجريبية أثناء تطوير الـ Backend' },
      { en: 'Unit tests for core logic', ar: 'اختبارات وحدة للمنطق الأساسي' },
      { en: 'Production deployment', ar: 'النشر للإنتاج' },
    ],
    challenges: [
      {
        en: 'Requirements that change during development.',
        ar: 'متطلبات تتغير أثناء التطوير.',
      },
      {
        en: 'Building the frontend while the APIs are still being built.',
        ar: 'بناء الواجهة بينما لا تزال الـ APIs قيد التطوير.',
      },
    ],
    stack: ['Angular', 'TypeScript', 'RxJS', 'Vitest', 'Docker', 'CI/CD'],
    projects: ['alsalam-international', 'cleantech'],
  },
  {
    id: 'e-commerce',
    forWho: {
      en: 'Businesses launching or rebuilding an online store, in English, Arabic or both.',
      ar: 'الشركات التي تطلق متجرًا إلكترونيًا أو تعيد بناءه، بالإنجليزية أو العربية أو كلتيهما.',
    },
    included: [
      { en: 'Product management', ar: 'إدارة المنتجات' },
      { en: 'Authentication', ar: 'المصادقة' },
      { en: 'Cart and checkout', ar: 'السلة وإتمام الشراء' },
      { en: 'Payment integration', ar: 'التكامل مع بوابات الدفع' },
      { en: 'Localization, including RTL', ar: 'التعريب، بما في ذلك RTL' },
      { en: 'An admin dashboard', ar: 'لوحة تحكم للإدارة' },
    ],
    challenges: [
      {
        en: 'Server-side rendering without hydration problems.',
        ar: 'الـ Server-Side Rendering دون مشكلات في الـ Hydration.',
      },
      { en: 'Secure payment flows.', ar: 'تدفقات دفع آمنة.' },
      { en: 'A storefront that works properly in Arabic and English.', ar: 'متجر يعمل بشكل سليم بالعربية والإنجليزية.' },
    ],
    stack: ['Angular SSR', 'Angular Material', 'RxJS', 'Paymob', 'Sentry', 'ngx-translate'],
    projects: ['e-commerce-platform'],
  },
  {
    id: 'dashboards',
    forWho: {
      en: 'Companies that need an internal or customer-facing dashboard on top of existing APIs.',
      ar: 'الشركات التي تحتاج إلى لوحة تحكم داخلية أو للعملاء فوق APIs موجودة.',
    },
    included: [
      { en: 'Tables with filters, search and pagination', ar: 'جداول بمرشّحات وبحث وترقيم صفحات' },
      { en: 'Charts and reports', ar: 'رسوم بيانية وتقارير' },
      { en: 'Forms and permissions', ar: 'نماذج وصلاحيات' },
      { en: 'Export to Excel and PDF', ar: 'التصدير إلى Excel وPDF' },
      { en: 'Real-time updates', ar: 'تحديثات فورية' },
    ],
    challenges: [
      {
        en: 'Large data tables that stay fast and usable.',
        ar: 'جداول بيانات كبيرة تبقى سريعة وسهلة الاستخدام.',
      },
      { en: 'Role-based views and permissions.', ar: 'عروض وصلاحيات حسب الدور.' },
      { en: 'Showing live data reliably.', ar: 'عرض البيانات الحية بشكل موثوق.' },
    ],
    stack: ['Angular', 'PrimeNG', 'Angular Material', 'SignalR', 'ExcelJS', 'jsPDF'],
    projects: ['alsalam-international', 'cleantech', 'e-commerce-platform'],
  },
  {
    id: 'figma-to-angular',
    forWho: {
      en: 'Designers, agencies and teams who have the design ready and need it built faithfully.',
      ar: 'المصممون والوكالات والفرق التي لديها التصميم جاهزًا وتحتاج إلى تنفيذه بدقة.',
    },
    included: [
      { en: 'Responsive interfaces across breakpoints', ar: 'واجهات متجاوبة عبر كل الأحجام' },
      { en: 'Reusable Angular components', ar: 'مكوّنات Angular قابلة لإعادة الاستخدام' },
      { en: 'Pixel-accurate layouts where required', ar: 'تخطيطات مطابقة للتصميم بدقة عند الحاجة' },
      { en: 'Accessible interfaces', ar: 'واجهات سهلة الوصول' },
    ],
    challenges: [
      {
        en: 'Staying faithful to the design on every screen size.',
        ar: 'البقاء مطابقًا للتصميم على كل حجم شاشة.',
      },
      {
        en: 'Turning one-off designs into reusable components.',
        ar: 'تحويل تصميمات منفردة إلى مكوّنات قابلة لإعادة الاستخدام.',
      },
    ],
    stack: ['Angular', 'SCSS', 'Tailwind CSS', 'Bootstrap 5', 'GSAP'],
    projects: ['ai-cloud-website', 'medgate'],
  },
];
