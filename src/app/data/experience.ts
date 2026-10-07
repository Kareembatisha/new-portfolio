import type { Experience } from '../models/content';

export const EXPERIENCE: readonly Experience[] = [
  {
    period: { en: 'Jul 2024 — Present', ar: 'يوليو 2024 — الآن' },
    role: { en: 'Frontend Developer', ar: 'مطوّر Frontend' },
    company: 'AI Cloud',
    highlights: [
      {
        en: 'Built real-time Angular dashboards with live sensor data, role-based views and permissions.',
        ar: 'بناء لوحات تحكم Angular فورية ببيانات حساسات حية وعروض وصلاحيات حسب الدور.',
      },
      {
        en: 'Shipped bilingual (Arabic/English) websites for Saudi clients, including a Next.js company site.',
        ar: 'تسليم مواقع ثنائية اللغة (عربي/إنجليزي) لعملاء في السعودية، منها موقع شركة بـ Next.js.',
      },
      {
        en: 'Led the migration of the company website from Next.js to Angular 18, preserving 1:1 UI/UX and animations.',
        ar: 'قيادة نقل موقع الشركة من Next.js إلى Angular 18 مع الحفاظ على تطابق 1:1 في الواجهة والحركة.',
      },
      {
        en: 'Worked with backend, UI/UX, Flutter and graphic design to deliver client projects end-to-end.',
        ar: 'العمل مع فرق الـ Backend وUI/UX وFlutter والتصميم الجرافيكي لتسليم مشاريع العملاء بالكامل.',
      },
    ],
  },
];
