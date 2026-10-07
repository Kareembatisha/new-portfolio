import type { CaseStudy } from '../models/project';
import { GALLERIES } from './gallery';

/**
 * Content rules: every statement below is verified from the project's source code, the live site,
 * a screenshot, or the user's CV. `problem` and `outcomes` are deliberately absent until the user
 * confirms real facts (see docs/03-case-study-content.md for the proposed wording).
 * Items from the CV that the source code did NOT confirm were removed; the list is in
 * docs/01-project-audit.md under "Claims to confirm".
 */
export const CASE_STUDIES: Readonly<Record<string, CaseStudy>> = {
  'alsalam-international': {
    gallery: GALLERIES['alsalam-international'],
    client: {
      en: 'AlSalam International, a logistics and import company operating in Egypt and Saudi Arabia.',
      ar: 'شركة السلام الدولية، شركة لوجستيات واستيراد تعمل في مصر والسعودية.',
    },
    overview: {
      en: 'A platform that brings import operations into one system: shipments, suppliers, companies and their documents, products and their registration progress, with reports and role-based access, in Arabic and English.',
      ar: 'منصة تجمع عمليات الاستيراد في نظام واحد: الشحنات والموردون والشركات ومستنداتها والمنتجات وتقدم تسجيلها، مع تقارير وصلاحيات حسب الدور، بالعربية والإنجليزية.',
    },
    role: {
      en: 'Frontend developer at AI Cloud. I architected the application and its data layer, built the business modules, and implemented the bilingual interface.',
      ar: 'مطوّر Frontend في AI Cloud. صمّمت معمارية التطبيق وطبقة البيانات، وبنيت وحدات العمل، ونفّذت الواجهة ثنائية اللغة.',
    },
    features: [
      {
        en: 'Shipment tracking with five statuses: Ready to Ship, In Transit, Arrived, Delivered and Delayed.',
        ar: 'تتبع الشحنات بخمس حالات: جاهزة للشحن، في الطريق، وصلت، تم التسليم، ومتأخرة.',
      },
      {
        en: 'A product registration pipeline from Draft through Submitted to Committee, Under Review, Sample Requested and Trial Stage to Approved and Registered, with requirements tracked per product.',
        ar: 'مسار لتسجيل المنتجات من المسودة مرورًا بالتقديم للجنة والمراجعة وطلب العينة ومرحلة التجربة وصولًا إلى الاعتماد والتسجيل، مع متطلبات تُتابَع لكل منتج.',
      },
      {
        en: 'Company records with documents, locations and an activity history, alongside supplier and employee management.',
        ar: 'سجلات للشركات مع المستندات والمواقع وسجل النشاط، إلى جانب إدارة الموردين والموظفين.',
      },
      {
        en: 'A public product verification page that needs no login, and a downloadable QR code image for each product.',
        ar: 'صفحة تحقق عامة للمنتج لا تحتاج تسجيل دخول، ورمز QR قابل للتنزيل كصورة لكل منتج.',
      },
      {
        en: 'Roles and permissions: every protected page declares the permission it needs, and users without it see a no-access page.',
        ar: 'أدوار وصلاحيات: كل صفحة محمية تحدد الصلاحية المطلوبة، ويرى المستخدم صفحة عدم السماح إن لم يمتلكها.',
      },
      {
        en: 'Thirteen report cards, including delivered, delayed and upcoming shipments, product performance, supplier history, imports by country and missing documents.',
        ar: 'ثلاثة عشر تقريرًا، منها الشحنات المسلّمة والمتأخرة والقادمة وأداء المنتجات وسجل الموردين والاستيراد حسب الدولة والمستندات الناقصة.',
      },
      {
        en: 'Excel export from the main lists: companies, suppliers, employees, products and registration requirements.',
        ar: 'تصدير إلى Excel من القوائم الرئيسية: الشركات والموردين والموظفين والمنتجات ومتطلبات التسجيل.',
      },
      {
        en: 'Configurable settings: product categories, registration requirements and reminder templates.',
        ar: 'إعدادات قابلة للتخصيص: تصنيفات المنتجات ومتطلبات التسجيل وقوالب التذكيرات.',
      },
      {
        en: 'A full Arabic and English interface with RTL layouts (over 1,600 labels in each language).',
        ar: 'واجهة كاملة بالعربية والإنجليزية بتخطيطات RTL (أكثر من 1600 نص في كل لغة).',
      },
    ],
    architecture: {
      intro: {
        en: 'Data access is layered so the UI never talks to an API directly.',
        ar: 'الوصول إلى البيانات مقسّم إلى طبقات، فلا تتعامل الواجهة مع الـ API مباشرة.',
      },
      layers: [
        {
          name: { en: 'UI components', ar: 'مكوّنات الواجهة' },
          note: { en: 'Pages and shared components.', ar: 'الصفحات والمكوّنات المشتركة.' },
        },
        {
          name: { en: 'Services', ar: 'الخدمات (Services)' },
          note: {
            en: 'What the UI calls for business operations.',
            ar: 'ما تستدعيه الواجهة لتنفيذ العمليات.',
          },
        },
        {
          name: { en: 'Repositories', ar: 'المستودعات (Repositories)' },
          note: {
            en: 'Own data access behind a single interface.',
            ar: 'تتولى الوصول إلى البيانات خلف واجهة موحّدة.',
          },
        },
        {
          name: { en: 'Mock or live API', ar: 'API تجريبية أو حقيقية' },
          note: {
            en: 'A single environment flag chooses which one a service uses.',
            ar: 'مفتاح واحد في الإعدادات يحدد أيهما تستخدم الخدمة.',
          },
        },
      ],
      reasons: [
        {
          en: 'Screens can be built and tested against mock data, then switched to the live API without changing UI code.',
          ar: 'يمكن بناء الشاشات واختبارها على بيانات تجريبية ثم التحويل إلى الـ API الحقيقية دون تغيير كود الواجهة.',
        },
        {
          en: 'A clear separation between UI, business logic and data access.',
          ar: 'فصل واضح بين الواجهة ومنطق العمل والوصول إلى البيانات.',
        },
      ],
    },
    deepDive: [
      {
        title: { en: 'Repository, service and mock layering', ar: 'طبقات Repository وService وMock' },
        text: {
          en: 'Each service picks a mock or HTTP repository from an environment flag, so features can be developed and demonstrated with realistic data and later pointed at the real backend.',
          ar: 'كل خدمة تختار Repository تجريبيًا أو حقيقيًا من مفتاح في الإعدادات، فيمكن تطوير الميزات وعرضها ببيانات واقعية ثم ربطها بالـ Backend الحقيقي.',
        },
      },
      {
        title: { en: 'Permission-based routing', ar: 'توجيه قائم على الصلاحيات' },
        text: {
          en: 'Routes carry the permission they require (13 distinct permissions across the app) and a guard checks it before the page opens.',
          ar: 'تحمل المسارات الصلاحية المطلوبة (13 صلاحية مختلفة في التطبيق) ويفحصها Guard قبل فتح الصفحة.',
        },
      },
      {
        title: { en: 'Public product verification', ar: 'تحقق عام من المنتج' },
        text: {
          en: 'The verification page sits on its own public route, outside the authenticated area, so it can be opened without an account.',
          ar: 'صفحة التحقق على مسار عام مستقل خارج المنطقة المحمية، فيمكن فتحها دون حساب.',
        },
      },
      {
        title: { en: 'Bilingual RTL/LTR', ar: 'ثنائية اللغة RTL/LTR' },
        text: {
          en: 'Arabic and English share the same screens, with matching translation keys in both languages, using ngx-translate.',
          ar: 'العربية والإنجليزية تتشاركان الشاشات نفسها بمفاتيح ترجمة متطابقة في اللغتين، باستخدام ngx-translate.',
        },
      },
    ],
    testing: {
      en: 'The code base includes 78 unit-test files, run with Vitest.',
      ar: 'يضم المشروع 78 ملف اختبار وحدة، تعمل بـ Vitest.',
    },
  },

  'e-commerce-platform': {
    gallery: GALLERIES['e-commerce-platform'],
    overview: {
      en: 'An online store made of two applications: a customer storefront rendered on the server for fast first loads and search visibility, and an admin dashboard for running the store. The storefront works in Arabic and English with RTL.',
      ar: 'متجر إلكتروني من تطبيقين: واجهة للعملاء تُعرض على الخادم لسرعة التحميل الأول وظهور أفضل في محركات البحث، ولوحة تحكم لإدارة المتجر. تعمل واجهة العملاء بالعربية والإنجليزية مع RTL.',
    },
    role: {
      en: 'Frontend developer at AI Cloud. I built both the storefront and the admin dashboard.',
      ar: 'مطوّر Frontend في AI Cloud. بنيت واجهة المتجر ولوحة التحكم معًا.',
    },
    features: [
      {
        en: 'Server-side rendered home, product list, product details and category pages.',
        ar: 'صفحات الرئيسية وقائمة المنتجات وتفاصيل المنتج والتصنيفات بتقنية Server-Side Rendering.',
      },
      {
        en: 'Customer accounts: email sign-up with verification code, password reset and Google sign-in, with cookie-based sessions.',
        ar: 'حسابات العملاء: تسجيل بالبريد مع رمز تحقق، واستعادة كلمة المرور، وتسجيل الدخول بـ Google، بجلسات قائمة على الـ Cookies.',
      },
      {
        en: 'Cart, favorites, checkout with address and shipping, order history and order details.',
        ar: 'السلة والمفضلة وإتمام الشراء مع العنوان والشحن وسجل الطلبات وتفاصيلها.',
      },
      {
        en: 'Cash on delivery or online payment through Paymob, with a payment-result page.',
        ar: 'الدفع عند الاستلام أو الدفع الإلكتروني عبر Paymob مع صفحة لنتيجة الدفع.',
      },
      {
        en: 'A returns flow: customers request a return and follow its status.',
        ar: 'مسار للمرتجعات: يطلب العميل الإرجاع ويتابع حالته.',
      },
      {
        en: 'A theme driven by the admin: three brand colors set in the dashboard become the storefront palette at runtime.',
        ar: 'ثيم تتحكم فيه لوحة الإدارة: ثلاثة ألوان للعلامة تُضبط في اللوحة وتتحول إلى لوحة ألوان المتجر وقت التشغيل.',
      },
      {
        en: 'Store settings that switch features on or off: guest checkout, orders, reviews and notifications.',
        ar: 'إعدادات للمتجر تفعّل أو تعطّل ميزات: الشراء كضيف والطلبات والتقييمات والإشعارات.',
      },
      {
        en: 'An admin dashboard for products, categories, brands, banners, discounts, coupons, orders, returns, inventory, users and roles, with six report pages built with charts.',
        ar: 'لوحة تحكم للمنتجات والتصنيفات والعلامات والبنرات والخصومات والكوبونات والطلبات والمرتجعات والمخزون والمستخدمين والأدوار، مع ست صفحات تقارير برسوم بيانية.',
      },
    ],
    deepDive: [
      {
        title: { en: 'Server-side rendering with mixed render modes', ar: 'SSR بأنماط عرض مختلطة' },
        text: {
          en: 'Catalogue pages are rendered per request, informational pages are prerendered, and account pages render in the browser, so each page type uses the cheapest suitable strategy.',
          ar: 'صفحات الكتالوج تُعرض عند كل طلب، والصفحات التعريفية تُجهَّز مسبقًا، وصفحات الحساب تُعرض في المتصفح، فيستخدم كل نوع صفحة الأسلوب الأنسب.',
        },
      },
      {
        title: { en: 'Admin-driven theming', ar: 'ثيمات تتحكم فيها الإدارة' },
        text: {
          en: 'The storefront computes a full color palette from the colors saved in the admin and applies it as CSS variables, so a store can be re-branded without a code change.',
          ar: 'تحسب واجهة المتجر لوحة ألوان كاملة من الألوان المحفوظة في الإدارة وتطبقها كمتغيرات CSS، فيمكن تغيير هوية المتجر دون تعديل الكود.',
        },
      },
      {
        title: { en: 'Payments and monitoring', ar: 'الدفع والمراقبة' },
        text: {
          en: 'Online payments are handled on Paymob’s hosted page and the customer returns to a result page. Sentry captures authentication errors in production.',
          ar: 'تتم المدفوعات الإلكترونية على صفحة Paymob المستضافة ثم يعود العميل لصفحة النتيجة. ويلتقط Sentry أخطاء المصادقة في الإنتاج.',
        },
      },
      {
        title: { en: 'Permission-based admin', ar: 'لوحة إدارة بالصلاحيات' },
        text: {
          en: 'Admin routes declare the permission they need (34 distinct permissions), managed through a roles screen.',
          ar: 'تحدد مسارات لوحة الإدارة الصلاحية المطلوبة (34 صلاحية مختلفة) وتُدار من شاشة الأدوار.',
        },
      },
    ],
  },

  cleantech: {
    overview: {
      en: 'A facility and cleaning management platform with a separate workspace for each of five roles: Admin, Manager, Supervisor, Cleaner and Auditor. It covers tasks, shifts, attendance and leaves, stock, sensors and feedback, with PDF and Excel reports.',
      ar: 'منصة لإدارة المرافق والنظافة بمساحة عمل مستقلة لكل دور من خمسة أدوار: المدير العام والمدير والمشرف وعامل النظافة والمراجع. تغطي المهام والورديات والحضور والإجازات والمخزون والحساسات والملاحظات، مع تقارير PDF وExcel.',
    },
    role: {
      en: "Frontend developer at AI Cloud. I built the platform's frontend.",
      ar: 'مطوّر Frontend في AI Cloud. بنيت الواجهة الأمامية للمنصة.',
    },
    features: [
      {
        en: 'Five role-based workspaces, each with its own pages: Admin (the largest), Manager, Supervisor, Cleaner and Auditor.',
        ar: 'خمس مساحات عمل حسب الدور، لكل منها صفحاتها: المدير العام (الأكبر) والمدير والمشرف وعامل النظافة والمراجع.',
      },
      {
        en: 'Tasks with seven statuses and three priorities, viewable as all, my, received or team tasks, plus a task calendar.',
        ar: 'مهام بسبع حالات وثلاث أولويات، تُعرض كل المهام أو مهامي أو المستلمة أو مهام الفريق، مع تقويم للمهام.',
      },
      {
        en: 'Shifts with a shift calendar, attendance, and leave requests.',
        ar: 'ورديات مع تقويم للورديات، وحضور، وطلبات إجازة.',
      },
      {
        en: 'A location hierarchy of area, city, organization, building, floor, section and point.',
        ar: 'تسلسل للمواقع: منطقة، مدينة، منشأة، مبنى، طابق، قسم، ونقطة.',
      },
      {
        en: 'Stock management with categories, materials and transactions.',
        ar: 'إدارة المخزون بالتصنيفات والمواد والحركات.',
      },
      {
        en: 'Sensors and devices with charts, and a feedback system with questions and answers.',
        ar: 'حساسات وأجهزة مع رسوم بيانية، ونظام ملاحظات بأسئلة وإجابات.',
      },
      {
        en: 'Reports exported to PDF and Excel for attendance, leaves, tasks, stock, transactions, sensors and feedback.',
        ar: 'تقارير تُصدَّر إلى PDF وExcel للحضور والإجازات والمهام والمخزون والحركات والحساسات والملاحظات.',
      },
      {
        en: 'Real-time notifications over SignalR.',
        ar: 'إشعارات فورية عبر SignalR.',
      },
      {
        en: 'The interface works in English and Arabic, with RTL layouts.',
        ar: 'الواجهة تعمل بالإنجليزية والعربية بتخطيطات RTL.',
      },
    ],
    deepDive: [
      {
        title: { en: 'One app, five role-based route trees', ar: 'تطبيق واحد وخمس مجموعات مسارات حسب الدور' },
        text: {
          en: 'Each role has its own lazy-loaded set of routes (about 80 for Admin, 36 each for Manager and Supervisor, 9 for Cleaner, 6 for Auditor), so a user only downloads the part of the app they can use.',
          ar: 'لكل دور مجموعة مساراته المحمّلة عند الطلب (نحو 80 للمدير العام، و36 لكل من المدير والمشرف، و9 لعامل النظافة، و6 للمراجع)، فيحمّل المستخدم الجزء الذي يستخدمه فقط.',
        },
      },
      {
        title: { en: 'Interceptors', ar: 'الـ Interceptors' },
        text: {
          en: 'Authentication, error handling and loading indicators are handled by HTTP interceptors instead of being repeated in each screen.',
          ar: 'تتولى الـ HTTP Interceptors المصادقة ومعالجة الأخطاء ومؤشرات التحميل بدل تكرارها في كل شاشة.',
        },
      },
      {
        title: { en: 'Reporting', ar: 'التقارير' },
        text: {
          en: 'PDF reports are generated in the browser with jsPDF and tables, and Excel files with SheetJS, from the same data the screens show.',
          ar: 'تُولَّد تقارير PDF في المتصفح بـ jsPDF والجداول، وملفات Excel بـ SheetJS، من نفس البيانات التي تعرضها الشاشات.',
        },
      },
      {
        title: { en: 'Real-time notifications with SignalR', ar: 'إشعارات فورية عبر SignalR' },
        text: {
          en: 'A SignalR service keeps a hub connection open and pushes new notifications to the interface as they arrive.',
          ar: 'تحافظ خدمة SignalR على اتصال مفتوح بالـ Hub وتدفع الإشعارات الجديدة إلى الواجهة فور وصولها.',
        },
      },
    ],
    testing: {
      en: 'The code base includes 192 unit-test files.',
      ar: 'يضم المشروع 192 ملف اختبار وحدة.',
    },
  },

  medgate: {
    gallery: GALLERIES['medgate'],
    overview: {
      en: 'The marketing website of MedGate Solutions, a service that helps manufacturers and distributors register and market medical devices in Saudi Arabia. The site is available in English, Chinese, German and French.',
      ar: 'الموقع التسويقي لشركة MedGate Solutions، وهي خدمة تساعد المصنّعين والموزّعين على تسجيل الأجهزة الطبية وتسويقها في السعودية. يتوفر الموقع بالإنجليزية والصينية والألمانية والفرنسية.',
    },
    role: {
      en: 'Frontend developer at AI Cloud. I built the website.',
      ar: 'مطوّر Frontend في AI Cloud. بنيت الموقع.',
    },
    features: [
      {
        en: 'A language switcher for English, Chinese, German and French.',
        ar: 'مبدّل لغة للإنجليزية والصينية والألمانية والفرنسية.',
      },
      {
        en: 'Home, Services, About, FAQs and Contact pages, with a clear Start Now call to action on the home page.',
        ar: 'صفحات الرئيسية والخدمات ونبذة عنا والأسئلة الشائعة والتواصل، مع دعوة واضحة للبدء في الصفحة الرئيسية.',
      },
      {
        en: 'A "Why MedGate" section that explains the service in four illustrated points.',
        ar: 'قسم "لماذا MedGate" يشرح الخدمة في أربع نقاط مصوّرة.',
      },
      {
        en: 'An FAQs page with expandable answers about registering medical devices with the Saudi FDA.',
        ar: 'صفحة أسئلة شائعة بإجابات قابلة للتوسيع حول تسجيل الأجهزة الطبية لدى هيئة الغذاء والدواء السعودية.',
      },
      {
        en: 'A contact page with a form (name, number, email, company name) next to the company details.',
        ar: 'صفحة تواصل بنموذج (الاسم والرقم والبريد واسم الشركة) بجوار بيانات الشركة.',
      },
      {
        en: 'In-page navigation through hash-based addresses such as /#/faqs.',
        ar: 'تنقل داخل الصفحة عبر عناوين تعتمد الـ Hash مثل /#/faqs.',
      },
      { en: 'Responsive layout and lazy-loaded, modular routing (from the project brief).', ar: 'تخطيط متجاوب وتوجيه معياري محمّل عند الطلب (من وصف المشروع).' },
    ],
  },

  'ai-cloud-website': {
    gallery: GALLERIES['ai-cloud-website'],
    overview: {
      en: "AI Cloud's own corporate website. It was first built in Next.js, then rebuilt in Angular 18 as a set of standalone components: 8 pages and 35 components, keeping the scroll animations and the instant Arabic/English switching.",
      ar: 'الموقع التعريفي لشركة AI Cloud. بُني أولًا بـ Next.js ثم أُعيد بناؤه بـ Angular 18 بمكوّنات Standalone: 8 صفحات و35 مكوّنًا، مع الحفاظ على حركات التمرير والتبديل الفوري بين العربية والإنجليزية.',
    },
    role: {
      en: 'Frontend developer at AI Cloud. I built the original site and led the migration to Angular.',
      ar: 'مطوّر Frontend في AI Cloud. بنيت الموقع الأصلي وقدت عملية النقل إلى Angular.',
    },
    features: [
      {
        en: 'Eight pages: Home, About, Services, Partners, Portfolio, CleanTech, AlSalam International and Contact.',
        ar: 'ثماني صفحات: الرئيسية، من نحن، الخدمات، الشركاء، الأعمال، CleanTech، السلام الدولية، والتواصل.',
      },
      {
        en: 'A custom translation service built on Angular signals: instant Arabic/English switching with RTL/LTR, the chosen language remembered, and no page reload.',
        ar: 'خدمة ترجمة مخصصة مبنية على Signals: تبديل فوري بين العربية والإنجليزية مع RTL/LTR، وحفظ اللغة المختارة، دون إعادة تحميل الصفحة.',
      },
      {
        en: 'GSAP and ScrollTrigger animations set up and cleaned up with the Angular component lifecycle.',
        ar: 'حركات GSAP وScrollTrigger تُهيَّأ وتُنظَّف مع دورة حياة مكوّنات Angular.',
      },
      {
        en: 'A contact form connected to the company’s message API.',
        ar: 'نموذج تواصل مرتبط بواجهة الرسائل الخاصة بالشركة.',
      },
      {
        en: 'Lazy-loaded routes for every page and a responsive layout.',
        ar: 'مسارات محمّلة عند الطلب لكل صفحة وتخطيط متجاوب.',
      },
    ],
    deepDive: [
      {
        title: { en: 'GSAP in the Angular lifecycle', ar: 'GSAP داخل دورة حياة Angular' },
        text: {
          en: 'Animations are created in ngAfterViewInit and reverted in ngOnDestroy, so navigating between pages leaves no stray timelines or triggers.',
          ar: 'تُنشأ الحركات في ngAfterViewInit وتُلغى في ngOnDestroy، فلا تبقى Timelines أو Triggers عالقة عند التنقل بين الصفحات.',
        },
      },
      {
        title: { en: 'Signal-based translation', ar: 'ترجمة قائمة على Signals' },
        text: {
          en: 'One service holds the current language as a signal, saves it in the browser and updates the page language and direction, so every component reacts instantly.',
          ar: 'خدمة واحدة تحتفظ باللغة الحالية كـ Signal وتحفظها في المتصفح وتحدّث لغة الصفحة واتجاهها، فتستجيب كل المكوّنات فورًا.',
        },
      },
    ],
    challenges: [
      {
        title: {
          en: 'CSS custom properties under view encapsulation',
          ar: 'متغيرات CSS تحت View Encapsulation',
        },
        text: {
          en: "Diagnosed and fixed a production issue with CSS custom-property scoping under Angular's view encapsulation.",
          ar: 'تشخيص وإصلاح مشكلة إنتاج متعلقة بنطاق متغيرات CSS تحت View Encapsulation في Angular.',
        },
      },
      {
        title: { en: 'Build pipeline configuration', ar: 'إعدادات خط البناء' },
        text: {
          en: 'Diagnosed and fixed build-pipeline configuration issues around lazy-loaded routes and bundle budgets.',
          ar: 'تشخيص وإصلاح مشكلات إعدادات البناء المتعلقة بالمسارات المحمّلة عند الطلب وحدود حجم الحزم.',
        },
      },
    ],
  },
};
