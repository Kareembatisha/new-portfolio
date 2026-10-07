# 01 — Audit of the real projects

**Evidence used:** the six source zips (read and searched), and the four live URLs you gave me.
**Not available to me:** a browser (so no screenshots or visual review of the live apps), logins to the
three live apps that sit behind a login, source or a URL for MedGate, and a `package.json` for CleanTech.
**Rule applied:** a feature is described only if it is in the code, on the live page, or in information you
gave me. Everything else is marked **NEEDS CONFIRMATION**.

## At a glance

| Project | Stack (from `package.json`) | Size (non-test TS files / test files) | Live check |
|---|---|---|---|
| AlSalam International | Angular ^21, PrimeNG ^21, ngx-translate 17, Vitest 4 | 291 / 78 | Login page only |
| E-Commerce storefront | Angular ^21 + SSR, Angular Material, ngx-translate 16, Sentry, Swiper | 166 / 45 | Home page readable (server-rendered) |
| E-Commerce admin dashboard | Angular ^21, PrimeNG, ECharts, ngx-translate 16 | 243 / 20 | Login page only |
| CleanTech | **Unknown** (no `package.json` in the zip) | 392 / 192 | No URL given |
| AI Cloud site, Next.js version | Next 15.3, React 19, GSAP, Framer Motion, static export | 62 `.tsx` files | See below |
| AI Cloud site, Angular version | Angular ^18.2, GSAP + ScrollTrigger | 35 components, 28 templates | See below |
| MedGate | **No source and no URL provided** | — | Not checked |

---

## 1. AlSalam International

**What it is.** An internal web application for an import and logistics company. It tracks shipments,
suppliers, companies and their documents, employees, and, notably, the registration progress of each product
through a regulatory-style pipeline. **Type:** enterprise back-office web app.
**Client** (from your CV): a logistics and import company operating in Egypt and Saudi Arabia.
**Main users:** staff with roles and permissions (the roles are configured in the app, so specific job titles are **NEEDS CONFIRMATION**).

### Verified in the source
- **Modules:** auth (login, forgot/reset password, email verification), dashboard, shipments, companies,
  employees, suppliers, products, reports, users, roles and permissions, profile, and settings (categories,
  registration requirements, reminder templates).
- **Shipments** have five statuses: Ready to Ship, In Transit, Arrived, Delivered, Delayed. The list has summary cards, search, status and date filters and **Export**. Shipment details have Overview, Documents, Products and Activity Log tabs (the screenshots confirm all four).
- **Products** go through seven registration statuses: Draft, Submitted to Committee, Under Review, Sample
  Requested, Trial Stage, Approved, Registered. Each product tracks registration requirements.
- **Companies** have Overview, Documents, Users and Activity-log tabs, a documents drawer, and folders.
  **Suppliers** have Overview, Documents, Shipments and Assign-product tabs.
- **Reports:** 13 report cards (delivered, delayed, ready-to-ship and upcoming shipments; registered, not started and
  inactive products; missing requirements; product performance; supplier history; import by country; companies
  missing documents).
- **Access control:** 13 distinct permission strings on routes, a `permissionGuard`, and a "no access" page.
- **Public page:** `public/products/:qrcode` works outside the logged-in area. The product page can
  download its QR code as an image (`qrcode` library). Whether scanning that code opens the public page is
  **NEEDS CONFIRMATION** (the value comes from the API).
- **Excel export** from the company, supplier, employee, product and registration-requirement lists (ExcelJS).
- **Documents:** upload, folders, a details drawer, and file thumbnails (PDF pages rendered with `pdfjs-dist`).
- **Architecture:** service → repository interface → HTTP or mock implementation, chosen by `environment.useMock`;
  74 repository files; interceptors for token, errors and language.
- **Bilingual:** 1,608 translation keys in both English and Arabic.
- **Tests:** 78 spec files with Vitest.
- **Sticky table headers:** `position: sticky` is used in 17 stylesheets/templates. Confirm which tables on screen.

### Claims to confirm (from your CV, not found in this zip)
| CV claim | What I found | Status |
|---|---|---|
| Command palette (Ctrl+K) | No key handlers or palette code | **NEEDS CONFIRMATION** (newer branch?) |
| Keyboard shortcuts | None | **NEEDS CONFIRMATION** |
| Draft autosave | Only a "Draft" *status* for products | **NEEDS CONFIRMATION** |
| PDF/image viewers | PDF *thumbnails* only; a document drawer exists; no full viewer found | **NEEDS CONFIRMATION** |
| PDF reporting | No PDF-generation library in this project (CleanTech has one) | **NEEDS CONFIRMATION** |
| "Strict repository/service/mock layering" | Confirmed, with one nuance: only a few mock files exist (2); most repositories are HTTP | Confirmed |

### Other notes
- The README says Angular 22 / PrimeNG 19; `package.json` says Angular 21 / PrimeNG 21. The README is out of date.
- **Live vs source:** the live URL shows only a login page, so I could not compare. **NEEDS CONFIRMATION** that the live
  version matches this zip.

---

## 2. E-Commerce storefront (Angular 21, SSR)

**What it is.** A customer-facing online store. **For:** shoppers; the store owner controls settings from the admin.
**Type:** server-rendered e-commerce storefront.

### Verified in the source
- **Pages:** home, products, product details (`products/:slug`), categories, cart, favorites, checkout, order success, payment
  callback, my orders and order details, return request and return details, profile, contact, about, terms.
- **Render modes:** home, products, product details and categories are rendered per request on the server;
  about and contact are prerendered; account, returns and auth pages render in the browser.
- **Accounts:** register, email verification code, login, forgot and reset password, **Google sign-in**; cookie-based
  token handling; guards for auth-ready, logged-in, user-only and non-empty cart.
- **Checkout:** address, shipping, and payment either **cash on delivery** or **online via Paymob** (the order response
  carries a payment URL; null means cash). There is a payment-callback page.
- **Returns:** request and follow a return.
- **Theme:** three colors from the admin API become a computed palette and CSS variables at runtime.
- **Store settings** switch features: guest checkout, orders, reviews, notifications.
- **Monitoring:** Sentry captures exceptions and the signed-in user in the auth service; a source-map upload script exists.
- **Bilingual:** English and Arabic, with the page direction set on the document element.
- **Tests:** 45 spec files.

### Not found
- Product **sorting** controls (none in the code or in the screenshots). **Pagination exists**: the product-list screenshot shows it, so my earlier code search missed it.
- A coupon field at checkout (none).

### Confirmed by your Oct 5 screenshots
- Product list: category, price-range and brand filters, "Offer 30%" badges, favorites and pagination.
- Product page: image gallery with thumbnails, discounted price with a "30% OFF" badge, review count, quantity, **Buy Now**, **Add to cart**, **Add to favorites**.
- Checkout: a saved shipping address, payment choice (**COD** or **Online**), and an order summary with shipping.
- Arabic: the storefront mirrors to RTL correctly in the browser.

### Live review (https://ecommerce.ai-cloud.sa/)
- The server-rendered HTML shows **raw translation keys** (`NAV.HOME`, `FOOTER.NEWSLETTER_TITLE`, `AUTH.LOGIN`).
  This may be corrected in the browser after the page loads; **NEEDS CONFIRMATION** in a real browser. If the
  keys do appear, it also affects search engines.
- The footer holds **placeholder data**: `support@yourstore.com`, `+201000000000`, and three test links (`ghgh`, `gfgfgf`, `gfgfgfgf`).
  Do not feature the footer in screenshots until fixed.
- Demo categories: Cosmetics, Books, Foods, Clothes, Electronics. The brand is "AI Cloud EC".
- **The translated text shows correctly in your browser screenshots** (English and Arabic), so the raw keys are only in the server-rendered HTML. Whether they flash on first paint is **NEEDS CONFIRMATION**.
- **Demo product photos carry a visible "shutterstock.com" watermark** (product list and product page). Replace them with images you may use before this store appears in a portfolio.
- Test data is visible in the checkout (address "dsdsdsds", an item named "Dfefwefwf").

---

## 3. E-Commerce admin dashboard (Angular 21, PrimeNG, ECharts)

**What it is.** The back office for the store above. **For:** store managers and staff with roles.
**Type:** admin dashboard.

### Verified in the source
- **Sections:** users, roles (with permissions), categories, brands, banners, discounts, coupons, products (add, edit, details,
  bulk status change), orders and order details, returns, order statuses, settings (general, languages, SEO, shipping),
  reports, files, warehouses, packages, inventory.
- **Reports:** six pages (sales, orders, products, customers, inventory, coupons) with ECharts line and bar charts fed by the API.
- **Access control:** 34 distinct permission strings on routes.
- **Bilingual:** 1,046 keys in each language.
- **Tests:** 20 spec files.

### Claims to confirm / corrections
| CV claim or detail | What I found | Status |
|---|---|---|
| "Calendar-based scheduling (FullCalendar)" | FullCalendar is a dependency but is **never imported** | **Not in this source** (removed from the site) |
| "Analytics views" | Six API-driven report pages exist | Confirmed |
| Sentry in admin | No Sentry code in the dashboard (it is in the storefront only) | The site now attributes Sentry to the storefront only |
| Dashboard home figures | Weekly sales, recent activity and badge numbers are **hard-coded** (a comment says to replace them) | Do not present as live analytics |
| Arabic/RTL in the admin | Both translation files exist and your screenshots show an Arabic toggle in the header; no RTL screenshot of the admin yet | **NEEDS CONFIRMATION** (send one Arabic admin screen) |
| Excel/PDF export | No export libraries in `package.json` | Not claimed |

**Live review:** the login page loads; nothing behind it could be inspected from here. Your screenshots (Oct 5) confirm: product management with bulk status update and a recycle bin; order management (152 orders in the demo, online vs cash payment, status filters); banners with on/off toggles; roles; and the sales report with its six tabs (Sales Overview, Orders Status, Top Products, Inventory, Customers, Coupon Performance).
**Data caution:** the demo orders list showed a real-looking customer name and ID number (now blurred in the portfolio image), and the banner list has junk rows ("string", "Culpa aut est id al"). The revenue figures are demo-store numbers, so the portfolio labels them as sample data.

---

## 4. CleanTech

**What it is.** A facility and cleaning management platform with one workspace per role.
**For:** a cleaning or facility operator and its staff. **Main users (roles in the code):** Admin, Manager, Supervisor,
Cleaner, Auditor. **Type:** multi-role operations platform. The client name is **NEEDS CONFIRMATION**.

### Verified in the source
- **Five lazy-loaded role route trees:** Admin ~80 routes, Manager 36, Supervisor 36, Cleaner 9, Auditor 6.
- **Admin entities** (create, edit, delete and restore): provider, user, area, city, organization, building, floor, section, point, shift,
  leave, task, material category, material, stock transaction, sensor, device, feedback question; plus attendance and a recent-activity log.
  That is 20+ managed entities.
- **Location hierarchy:** area → city → organization → building → floor → section → point.
- **Tasks:** seven statuses (Pending, In Progress, Waiting for Approval, Completed, Rejected, Not Resolved, Overdue), three
  priorities, views for all, my, received and team tasks; **task calendar** and **shift calendar** (angular-calendar).
- **Stock:** categories, materials, transactions. **Sensors and devices** with charts. **Feedback** with questions and answers.
- **Reports:** PDF (jsPDF + autotable) and Excel (SheetJS) generators for attendance, feedback, leaves, sensors, stock, tasks and transactions.
- **Charts:** Chart.js (ng2-charts) and ApexCharts; the admin dashboard has stock, sensor and task charts.
- **Real-time:** a SignalR service with a live notification event (`ReceiveNotification`).
- **HTTP:** three interceptors (auth, error, loading).
- **Languages:** the language service handles English, Arabic and **Urdu**, with RTL for Arabic and Urdu.
- **Tests:** 192 spec files.

### Claims to confirm
| CV claim | What I found | Status |
|---|---|---|
| Angular 19 | No `package.json` | **NEEDS CONFIRMATION** |
| "Multi-tenant" | No "tenant" in the code; users carry a provider ID | **NEEDS CONFIRMATION** (the site now says "role-based workspaces") |
| "Reusable CRUD modules" | Shared filters and forms exist; no generic CRUD module | The site now describes the shared pieces more carefully |
| Live task comments | Hub methods exist but the connection start is commented out | Not claimed |

**Live review:** no URL was provided, so there was nothing to open. The screenshot you sent shows the login page only.

---

## 5. AI Cloud corporate website (Next.js and Angular)

**What it is.** The marketing website of AI Cloud (an Egyptian–Saudi software company). **For:** potential clients and
partners. **Type:** corporate website with a CleanTech page, an AlSalam page and a contact form.

### Verified in the source
- **Angular version:** ^18.2; **8 routed pages:** home, about, services, partners, portfolio, clean-tech, alsalam-international, contact (plus 404); all
  lazy-loaded (9 `loadComponent` calls); **35 components** and 28 templates.
- **Next.js version:** Next 15.3, React 19, a static export (`output: "export"`), security headers configured (CSP, HSTS, X-Frame-Options,
  Referrer-Policy, Permissions-Policy), deployment notes for PM2, Nginx and Certbot.
- **Animations:** GSAP in 19 files in the Next version, 20 in the Angular version (ScrollTrigger in 12). The Angular version creates animations
  in `ngAfterViewInit` and reverts them in `ngOnDestroy`.
- **Translation:** the Angular version has a service built on signals that saves the language in `localStorage` and sets `lang` and `dir`
  on the document. Both versions have 238 (Next) / 304 (Angular) keys, equal in English and Arabic.
- **Contact form:** posts to `/api/message` in both the main contact page and the CleanTech contact section.
- **Bundle budget:** initial 500 kB warning / 1 MB error in the Angular config.

### Claims to confirm
| CV claim | What I found | Status |
|---|---|---|
| "50+ components" | **35** component classes in the Angular source | The site now says 35. Tell me if 50+ counts something else |
| "1:1 UI and animation fidelity" | Cannot be proven from code | **NEEDS CONFIRMATION**; best proven visually (before/after) |
| "Mega-menu header" | A "Products" dropdown is visible in the screenshot; no explicit "mega" code | Wording changed to "dropdown" in my text |
| Which version is live | The fetched page does not reveal it | **NEEDS CONFIRMATION** |

**Live review (https://www.ai-cloud.sa/):** the home page and navigation load. It lists sections for Services, Partners,
Portfolio and About, matching the source pages.

---

## 6. MedGate

**Source code not provided.** On Oct 6 you gave me the live URL (https://medgate-solutions.com/#/). The page returns only an empty application shell (title "MedGate", no description and no content in the HTML), so it is rendered entirely in the browser; the framework cannot be identified from outside. Addresses use hash routes (the screenshot shows `/#/faqs`).
From your screenshots (Oct 5): it is a marketing site for "MedGate Solutions" about medical-device registration and
marketing in Saudi Arabia (the copy mentions SFDA compliance), with a language switcher for EN, 中文, DE and FR and
the sections Home, Services, About and FAQs.
Confirmed by the screenshots: language switcher (EN, 中文, DE, FR), pages Home, Services, About, FAQs and Contact, a "Why MedGate" section with four points, an FAQs page with expandable answers, and a contact form (name, number, email, company name). Hash navigation is evidenced by the `/#/faqs` address.
The CV's "Angular 18, Bootstrap 5, lazy-loaded routing" remain **user-provided, not code-verified**.
**Side finding for the client:** because the HTML shell has no description and no content, search engines and link previews get almost nothing from this site. That is worth mentioning to MedGate if you maintain it.

---

## Repository hygiene (checked because you may publish these)
- No private keys or secrets found. API base URLs are public and the Sentry DSN and Google client ID are public by design.
- `ai-cloud-next/.env.production` is committed; it holds only the public API base URL.
- The AlSalam README is stale (Angular/PrimeNG versions).
- The e-commerce footer placeholder data and the real email seen in the CleanTech screenshot (now blurred) are the only content risks.

## Standout items worth leading with
1. AlSalam's **product registration pipeline** (seven stages) and the **permission-based routing** with a public verification page.
2. CleanTech's **five role workspaces** with 20+ managed entities, sensors, calendars and PDF/Excel reports.
3. The e-commerce **admin-controlled theme** and the mixed server/prerender/client **render strategy**.
4. The AI Cloud **Next.js → Angular migration** with a signal-based translation service and GSAP lifecycle handling.
