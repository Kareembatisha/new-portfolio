import type { Service } from '../models/content';

export const SERVICES: readonly Service[] = [
  {
    id: 'frontend',
    title: { en: 'Frontend Development', ar: 'تطوير الواجهات الأمامية' },
    summary: {
      en: 'Modern, production-ready Angular frontends with clean architecture, reusable components and attention to performance.',
      ar: 'واجهات Angular حديثة وجاهزة للإنتاج، بمعمارية نظيفة ومكوّنات قابلة لإعادة الاستخدام واهتمام بالأداء.',
    },
  },
  {
    id: 'web-apps',
    title: { en: 'Web App Development', ar: 'تطوير تطبيقات الويب' },
    summary: {
      en: 'Complete web applications built from your business requirements and integrated with your APIs.',
      ar: 'تطبيقات ويب متكاملة تُبنى من متطلبات عملك وتُربط بواجهات الـ API الخاصة بك.',
    },
  },
  {
    id: 'e-commerce',
    title: { en: 'E-commerce Development', ar: 'تطوير المتاجر الإلكترونية' },
    summary: {
      en: 'Storefronts and admin systems: products, authentication, cart, checkout, payment integration and localization.',
      ar: 'واجهات متاجر وأنظمة إدارة تشمل المنتجات والمصادقة والسلة والدفع والتكامل مع بوابات الدفع والتعريب.',
    },
  },
  {
    id: 'dashboards',
    title: { en: 'Dashboard Development', ar: 'تطوير لوحات التحكم' },
    summary: {
      en: 'Business dashboards with tables, filters, search, charts, forms, permissions, reports, export and real-time updates.',
      ar: 'لوحات تحكم للأعمال بجداول ومرشّحات وبحث ورسوم بيانية ونماذج وصلاحيات وتقارير وتصدير وتحديثات فورية.',
    },
  },
  {
    id: 'figma-to-angular',
    title: { en: 'Figma → Angular', ar: 'من Figma إلى Angular' },
    summary: {
      en: 'Professional designs turned into responsive, accessible, reusable Angular interfaces.',
      ar: 'تحويل التصميمات الاحترافية إلى واجهات Angular متجاوبة، سهلة الوصول، وقابلة لإعادة الاستخدام.',
    },
  },
];
