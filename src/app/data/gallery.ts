import type { GalleryItem } from '../models/project';
import type { Localized } from '../models/localized';
import { IMAGE_MANIFEST } from './image-manifest';

/** Builds a gallery item from a generated image (`npm run images`); sizes come from the manifest. */
function shot(name: string, alt: Localized, caption: Localized): GalleryItem {
  const image = IMAGE_MANIFEST[`/images/projects/${name}`];
  if (!image) throw new Error(`Image "${name}" is missing from the manifest. Run: npm run images`);
  return { src: `/images/projects/${name}`, ...image, alt, caption };
}

/**
 * Captions describe only what is visible in each screenshot. Figures shown in the e-commerce admin
 * (orders, revenue) are sample data from a demo store, and the captions say so.
 */
export const GALLERIES: Readonly<Record<string, readonly GalleryItem[]>> = {
  'alsalam-international': [
    shot(
      'alsalam-international-shipments',
      {
        en: 'Shipments list with status summary cards, search, status and date filters, and Export.',
        ar: 'قائمة الشحنات مع بطاقات ملخص الحالات والبحث ومرشحات الحالة والتاريخ وزر التصدير.',
      },
      {
        en: 'Shipments: summary by status, search, filters, bulk delete and export.',
        ar: 'الشحنات: ملخص حسب الحالة، بحث، مرشحات، حذف جماعي وتصدير.',
      },
    ),
    shot(
      'alsalam-international-shipment-details',
      {
        en: 'Shipment details page with status, edit and delete actions, key facts, tabs and general and shipping information.',
        ar: 'صفحة تفاصيل الشحنة مع الحالة وأزرار التعديل والحذف والمعلومات الأساسية والتبويبات والمعلومات العامة وبيانات الشحن.',
      },
      {
        en: 'Shipment details: Overview, Documents, Products and Activity Log tabs.',
        ar: 'تفاصيل الشحنة: تبويبات النظرة العامة والمستندات والمنتجات وسجل النشاط.',
      },
    ),
    shot(
      'alsalam-international-product-details',
      {
        en: 'Product details page showing a Registered status, progress, document counts, a QR code download button and tabs.',
        ar: 'صفحة تفاصيل المنتج تعرض حالة التسجيل والتقدم وعدد المستندات وزر تنزيل رمز QR والتبويبات.',
      },
      {
        en: 'Product registration: status, progress, QR code download, and Registration Requirements and Activity Log tabs.',
        ar: 'تسجيل المنتج: الحالة والتقدم وتنزيل رمز QR وتبويبا متطلبات التسجيل وسجل النشاط.',
      },
    ),
    shot(
      'alsalam-international-dashboard-arabic',
      {
        en: 'The dashboard in Arabic with the whole layout mirrored right to left.',
        ar: 'لوحة التحكم بالعربية مع انعكاس التخطيط كاملًا من اليمين إلى اليسار.',
      },
      {
        en: 'The same dashboard in Arabic: sidebar, cards and table mirror to right-to-left.',
        ar: 'اللوحة نفسها بالعربية: الشريط الجانبي والبطاقات والجدول تنعكس إلى اليمين لليسار.',
      },
    ),
  ],

  'e-commerce-platform': [
    shot(
      'e-commerce-platform-products',
      {
        en: 'Storefront product list with category, price range and brand filters, discount badges and pagination.',
        ar: 'قائمة منتجات المتجر مع مرشحات التصنيف والسعر والعلامة وشارات الخصم وترقيم الصفحات.',
      },
      {
        en: 'Storefront: product list with filters, discount badges and favorites.',
        ar: 'المتجر: قائمة المنتجات مع المرشحات وشارات الخصم والمفضلة.',
      },
    ),
    shot(
      'e-commerce-platform-product-details',
      {
        en: 'Storefront product page with an image gallery, a discounted price, quantity, Buy Now and Add to cart.',
        ar: 'صفحة منتج في المتجر مع معرض صور وسعر مخفّض والكمية وزر اشترِ الآن وزر الإضافة للسلة.',
      },
      {
        en: 'Storefront: product details with gallery, price, quantity, Buy Now and Add to cart.',
        ar: 'المتجر: تفاصيل المنتج مع المعرض والسعر والكمية واشترِ الآن والإضافة للسلة.',
      },
    ),
    shot(
      'e-commerce-platform-checkout',
      {
        en: 'Checkout page with a shipping address, a choice between cash on delivery and online payment, and an order summary.',
        ar: 'صفحة إتمام الشراء مع عنوان الشحن والاختيار بين الدفع عند الاستلام والدفع الإلكتروني وملخص الطلب.',
      },
      {
        en: 'Storefront: checkout with address, cash on delivery or online payment, and order summary.',
        ar: 'المتجر: إتمام الشراء مع العنوان والدفع عند الاستلام أو إلكترونيًا وملخص الطلب.',
      },
    ),
    shot(
      'e-commerce-platform-home-arabic',
      {
        en: 'Storefront home page in Arabic with a mirrored right-to-left layout.',
        ar: 'الصفحة الرئيسية للمتجر بالعربية بتخطيط منعكس من اليمين إلى اليسار.',
      },
      {
        en: 'Storefront in Arabic: header, search and hero slider mirror to right-to-left.',
        ar: 'المتجر بالعربية: الترويسة والبحث والسلايدر الرئيسي تنعكس إلى اليمين لليسار.',
      },
    ),
    shot(
      'e-commerce-platform-admin-sales-report',
      {
        en: 'Admin sales report with a date range, report tabs, summary figures and revenue and orders charts.',
        ar: 'تقرير المبيعات في لوحة الإدارة مع نطاق التاريخ وتبويبات التقارير وأرقام الملخص ومخططات الإيرادات والطلبات.',
      },
      {
        en: 'Admin: sales report with six report tabs. Figures are sample data from a demo store.',
        ar: 'الإدارة: تقرير المبيعات بستة تبويبات للتقارير. الأرقام بيانات تجريبية من متجر تجريبي.',
      },
    ),
    shot(
      'e-commerce-platform-admin-orders',
      {
        en: 'Admin order management with a total, search, date and status filters, and payment type. Customer details are blurred.',
        ar: 'إدارة الطلبات في لوحة الإدارة مع الإجمالي والبحث ومرشحات التاريخ والحالة ونوع الدفع. بيانات العميل مطموسة.',
      },
      {
        en: 'Admin: orders with filters, payment type (online or cash) and status. Customer details are blurred.',
        ar: 'الإدارة: الطلبات مع المرشحات ونوع الدفع (إلكتروني أو نقدي) والحالة. بيانات العميل مطموسة.',
      },
    ),
    shot(
      'e-commerce-platform-admin-products',
      {
        en: 'Admin product management with search, filters, bulk status update, a recycle bin and per-product actions.',
        ar: 'إدارة المنتجات في لوحة الإدارة مع البحث والمرشحات وتحديث الحالة الجماعي وسلة المحذوفات وإجراءات كل منتج.',
      },
      {
        en: 'Admin: products with filters, bulk status update and a recycle bin.',
        ar: 'الإدارة: المنتجات مع المرشحات وتحديث الحالة الجماعي وسلة المحذوفات.',
      },
    ),
    shot(
      'e-commerce-platform-admin-banners',
      {
        en: 'Admin banner management with search, filter, status toggles and edit and delete actions.',
        ar: 'إدارة البنرات في لوحة الإدارة مع البحث والمرشح ومفاتيح التفعيل وأزرار التعديل والحذف.',
      },
      {
        en: 'Admin: storefront banners can be switched on and off and edited.',
        ar: 'الإدارة: يمكن تفعيل بنرات المتجر وإيقافها وتعديلها.',
      },
    ),
    shot(
      'e-commerce-platform-admin-roles',
      {
        en: 'Admin role management listing roles with edit and delete actions.',
        ar: 'إدارة الأدوار في لوحة الإدارة تعرض الأدوار مع أزرار التعديل والحذف.',
      },
      {
        en: 'Admin: roles that control what each staff member can do.',
        ar: 'الإدارة: أدوار تحدد ما يستطيع كل موظف فعله.',
      },
    ),
    shot(
      'e-commerce-platform-admin-sales-charts',
      {
        en: 'Admin sales report charts for revenue (gross and net) and orders, with a metrics table below.',
        ar: 'مخططات تقرير المبيعات للإيرادات (الإجمالية والصافية) والطلبات مع جدول مقاييس أسفلها.',
      },
      {
        en: 'Admin: revenue and orders charts with a metrics table (sample data).',
        ar: 'الإدارة: مخططات الإيرادات والطلبات مع جدول مقاييس (بيانات تجريبية).',
      },
    ),
  ],

  medgate: [
    shot(
      'medgate-why-medgate',
      {
        en: 'The Why MedGate section with four illustrated reasons: regulatory expertise, tailored solutions, bilingual support and ongoing support.',
        ar: 'قسم لماذا MedGate بأربعة أسباب مصوّرة: الخبرة التنظيمية والحلول المخصصة والدعم ثنائي اللغة والدعم المستمر.',
      },
      {
        en: 'Why MedGate: four reasons presented as illustrated cards.',
        ar: 'لماذا MedGate: أربعة أسباب في بطاقات مصوّرة.',
      },
    ),
    shot(
      'medgate-home-chinese',
      {
        en: 'The MedGate home page in Chinese, with the language switcher showing English, Chinese, German and French.',
        ar: 'الصفحة الرئيسية لـ MedGate بالصينية مع مبدّل اللغة الذي يعرض الإنجليزية والصينية والألمانية والفرنسية.',
      },
      {
        en: 'The home page in Chinese. The site is available in four languages.',
        ar: 'الصفحة الرئيسية بالصينية. الموقع متاح بأربع لغات.',
      },
    ),
    shot(
      'medgate-faqs',
      {
        en: 'FAQs page with expandable questions about registering medical devices with the Saudi FDA.',
        ar: 'صفحة الأسئلة الشائعة بأسئلة قابلة للتوسيع حول تسجيل الأجهزة الطبية لدى هيئة الغذاء والدواء السعودية.',
      },
      {
        en: 'FAQs: expandable answers about medical-device registration.',
        ar: 'الأسئلة الشائعة: إجابات قابلة للتوسيع عن تسجيل الأجهزة الطبية.',
      },
    ),
    shot(
      'medgate-contact',
      {
        en: 'Contact page with a form for name, number, email and company name, beside the company contact details.',
        ar: 'صفحة التواصل بنموذج للاسم والرقم والبريد واسم الشركة بجوار بيانات التواصل مع الشركة.',
      },
      {
        en: 'Contact: a form and the company details side by side.',
        ar: 'التواصل: نموذج وبيانات الشركة جنبًا إلى جنب.',
      },
    ),
  ],

  'ai-cloud-website': [
    shot(
      'ai-cloud-website-services',
      {
        en: 'Services page with an interactive carousel of services such as AI integration, IoT solutions and app development, and reasons to choose AI Cloud.',
        ar: 'صفحة الخدمات بكاروسيل تفاعلي للخدمات مثل دمج الذكاء الاصطناعي وحلول إنترنت الأشياء وتطوير التطبيقات وأسباب اختيار AI Cloud.',
      },
      {
        en: 'Services: an interactive carousel and reasons to choose the company.',
        ar: 'الخدمات: كاروسيل تفاعلي وأسباب اختيار الشركة.',
      },
    ),
    shot(
      'ai-cloud-website-home-arabic',
      {
        en: 'The home page in Arabic with the layout and navigation mirrored right to left.',
        ar: 'الصفحة الرئيسية بالعربية مع انعكاس التخطيط والتنقل من اليمين إلى اليسار.',
      },
      {
        en: 'The same home page in Arabic.',
        ar: 'الصفحة الرئيسية نفسها بالعربية.',
      },
    ),
  ],
};
