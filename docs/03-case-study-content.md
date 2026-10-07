# 03 — Case-study content (based only on verified information)

The five case studies on the site were rewritten from this audit (`src/app/data/case-studies.ts`).
For each project below:

- **On the site now** = text I wrote from verified facts; it is already live in the code.
- **Proposed, waiting for you** = text that needs a fact only you can give. It is **not** on the site. Answer the
  questions, and I will add it. Where the answer is "I don't know", the section stays hidden.

Writing rules used: client-first language, technical detail only where it supports trust, no metrics, no invented
client names, team sizes, durations or results.

---

## 1. AlSalam International

**Card summary (on the site):** An import-operations platform that tracks shipments, suppliers, companies and product
registrations in one system, with role-based access, reports, a public product verification page and full Arabic/English RTL support.

| Section | On the site now |
|---|---|
| Overview | Brings import operations into one system: shipments, suppliers, companies and their documents, products and their registration progress, with reports and role-based access, in Arabic and English. |
| Client | AlSalam International, a logistics and import company operating in Egypt and Saudi Arabia (from your CV). |
| Type / main users | Enterprise back-office web app. Specific user roles: **NEEDS USER CONFIRMATION**. |
| My role | Frontend developer at AI Cloud: architected the application and its data layer, built the business modules, implemented the bilingual interface. **Confirm that wording.** |
| Key features | Five shipment statuses · seven-stage product registration pipeline with tracked requirements · company records with documents, locations and activity history · public product verification page and downloadable QR code · permission-based access · 13 report cards · Excel export · configurable categories, requirements and reminder templates · full Arabic/English RTL (1,600+ labels each). |
| Technical highlights | Service → repository → mock/live layering switched by one flag · permission-based routing (13 permissions) · public route outside the logged-in area · bilingual RTL/LTR · 78 test files (Vitest). |
| Architecture visual | Present (four-layer diagram). |
| Challenges / Solutions | Hidden (see questions). |
| Outcome | Hidden. No verified business metrics. The delivered capabilities are the feature list above. |

**Proposed, waiting for you**

| Section | Draft wording (edit freely) | What I need from you |
|---|---|---|
| Business problem | "Import operations involved several moving parts (shipments, supplier and company paperwork, and product registration steps) that had to be tracked together." *This is inferred from the features, not from you.* | **NEEDS USER CONFIRMATION:** what did the client do before? (spreadsheets, another tool, email?) |
| Challenge 1 | "Building and demonstrating the screens before the backend was ready" | **NEEDS USER CONFIRMATION:** was the backend late or in progress? (The mock/live switch suggests it, but I will not assume.) |
| Challenge 2 | "A seven-stage registration process with per-product requirements" | What was hard about it? |
| Outcome | Any real, checkable result ("replaced X", "used by N staff", "went live in <month>") | Facts only. If none, leave blank. |
| Time / team | — | Duration and team size, only if you want them shown. |

---

## 2. E-Commerce platform

**Card summary (on the site):** A server-side rendered storefront with Paymob checkout and Arabic/English RTL, plus a companion
admin dashboard for products, orders, returns, banners and sales reports.

| Section | On the site now |
|---|---|
| Overview | An online store made of two applications: a customer storefront rendered on the server for fast first loads and search visibility, and an admin dashboard for running the store. The storefront works in Arabic and English with RTL. |
| Type / main users | Storefront: shoppers. Admin: store managers and staff with roles. Store owner/client: **NEEDS USER CONFIRMATION** (the demo is branded "AI Cloud EC"). |
| My role | Frontend developer at AI Cloud: built both the storefront and the admin dashboard. **Confirm.** |
| Key features | Server-side rendered home, product list, product details and categories · accounts with email verification, password reset and Google sign-in · cart, favorites, checkout, order history · cash on delivery or Paymob online payment · returns flow · admin-controlled theme · store settings that turn features on or off · admin for products, categories, brands, banners, discounts, coupons, orders, returns, inventory, users and roles, plus six chart-based report pages. |
| Technical highlights | Mixed render strategy (per-request, prerendered, browser) · runtime palette from three admin colors · hosted-page payments · Sentry on the storefront · 34 admin permissions · 45 + 20 test files. |
| Architecture visual | Recommended (render modes + theme flow). I can draw it once you confirm the description. |
| Before/after | Recommended: the same page with two admin-chosen palettes (slider). |
| Challenges / Solutions / Outcome | Hidden. |

**Removed from the site because the code does not support them:** "calendar-based scheduling (FullCalendar)", and Sentry on the admin.

**Proposed, waiting for you**

| Section | Draft wording | What I need from you |
|---|---|---|
| Business problem | "A store that can be re-branded and managed by its owner without developer help." *Inferred from the theme and settings features.* | **NEEDS USER CONFIRMATION** |
| Challenge | "Keeping server-rendered pages and the browser in step when users sign in" (the CV says "hydration-safe cookie auth") | What actually went wrong or was hard? |
| Admin Arabic/RTL | — | Does the admin work in Arabic? **NEEDS USER CONFIRMATION** |
| Calendar | — | Is there a FullCalendar screen in another version? |

---

## 3. CleanTech

**Card summary (on the site):** A facility and cleaning management platform with five role-based workspaces covering tasks, shifts,
attendance, stock, sensors and reports, plus real-time notifications over SignalR.

| Section | On the site now |
|---|---|
| Overview | A facility and cleaning management platform with a separate workspace for each of five roles (Admin, Manager, Supervisor, Cleaner, Auditor), covering tasks, shifts, attendance and leaves, stock, sensors and feedback, with PDF and Excel reports. |
| Type / main users | Multi-role operations platform. Client: **NEEDS USER CONFIRMATION** (you may not be allowed to name it). |
| My role | Frontend developer at AI Cloud: built the platform's frontend. **Confirm.** |
| Key features | Five role workspaces · tasks with seven statuses and three priorities, with task and shift calendars · attendance and leaves · seven-level location hierarchy · stock with categories, materials and transactions · sensors and devices with charts · feedback questions and answers · PDF and Excel reports · real-time notifications · English/Arabic with RTL. |
| Technical highlights | Lazy-loaded route tree per role (~80 / 36 / 36 / 9 / 6 routes) · three HTTP interceptors · jsPDF and SheetJS reporting · SignalR notifications · 192 test files. |
| Architecture visual | Recommended: the five role workspaces diagram. |
| Challenges / Solutions / Outcome | Hidden. |

**Changed on the site:** "multi-tenant" is gone (no tenant code found). Angular version is no longer shown as "19" until you confirm it.

**Proposed, waiting for you**

| Section | Draft wording | What I need from you |
|---|---|---|
| Business problem | "Cleaning teams, supervisors, managers and auditors needed one place to assign work, track shifts and attendance, and review stock and sensors." *Inferred.* | **NEEDS USER CONFIRMATION** |
| Challenge | "Different people need different screens from the same app" (five role workspaces) | Is this how you'd describe it? |
| Angular version, Urdu | — | The version, and whether Urdu is a shipped language |
| Client | — | May I name the client? |

---

## 4. MedGate

**Card summary (on the site):** The multilingual marketing website of MedGate Solutions, a medical-device registration and marketing
service for Saudi Arabia, available in English, Chinese, German and French.

| Section | On the site now |
|---|---|
| Overview | The marketing website of MedGate Solutions, a service that helps manufacturers and distributors register and market medical devices in Saudi Arabia, available in four languages. (From your screenshot.) |
| My role | Built the website (your CV). |
| Key features | Four-language switcher · Home, Services, About, FAQs and Contact pages · a "Why MedGate" section with four points · FAQs with expandable answers · a contact form (name, number, email, company name) · hash-based navigation (seen in the live address) · responsive layout and lazy-loaded routing (**from the brief, not code-verified**). |
| Gallery | Four screenshots (Why MedGate, Chinese home, FAQs, Contact). |

**Still not verifiable:** the framework and build setup. The live site is rendered entirely in the browser (its HTML shell is empty), so the source code is the only way to confirm Angular 18, Bootstrap 5 and lazy loading.

---

## 5. AI Cloud corporate website (Next.js → Angular)

**Card summary (on the site):** The company's own website, built in Next.js and then rebuilt in Angular 18: 8 pages and 35 components, with
scroll animations and instant Arabic/English switching preserved.

| Section | On the site now |
|---|---|
| Overview | AI Cloud's own corporate website, first built in Next.js, then rebuilt in Angular 18 as standalone components: 8 pages and 35 components. |
| My role | Built the original site and led the migration to Angular (your CV). |
| Key features | Eight pages · a custom translation service on Angular signals (instant switching, RTL/LTR, remembered language, no reload) · GSAP and ScrollTrigger animations tied to the component lifecycle · contact form connected to the company's message API · lazy-loaded routes. |
| Technical highlights | Animations created in `ngAfterViewInit` and reverted in `ngOnDestroy` · signal-based i18n. |
| Challenges | Two production issues from your CV: CSS custom-property scoping under view encapsulation; build-pipeline configuration for lazy routes and bundle budgets. |
| Before/after | Ready in the code; **hidden until you capture the two screenshots** (W02). |

**Changed on the site:** "50+ components" is now "35" (what the source contains).

**Proposed, waiting for you**

| Section | Draft wording | What I need from you |
|---|---|---|
| Business problem | "The company wanted its site on the same Angular stack as its other products." *Inferred. A guess, not a fact.* | **NEEDS USER CONFIRMATION:** why did the team migrate? |
| Outcome | "Same design and animations, now maintained in Angular" | Confirmation, plus the two comparison screenshots |
| Live version | — | Which build is deployed? |

---

## Calls to action used on the case-study pages

Primary: **Discuss a Similar Project** · Secondary: **Message on WhatsApp**. On the home page: **Discuss Your Project**; in the
navbar: **Start a Project**.
