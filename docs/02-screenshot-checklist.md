# 02 — Screenshot checklist (what to capture, one by one)

Built from the real routes in each project's source code. Where a screen depends on something I could not
verify (a login-only live app, a feature not found in the zip), the item says **NEEDS CONFIRMATION**.

**Priority:** P0 = the case study is weak without it · P1 = strong support · P2 = nice to have.
**Type:** N = normal screenshot · F = full-page (tall) screenshot · R = screen recording.

## Status after your Oct 5 upload (24 images received)

| Project | Received | Still missing |
|---|---|---|
| AlSalam | A02 shipments, A03 shipment details, A04 product details, A05 Arabic dashboard (plus the dashboard cover) | A06–A10 are P1; the public verification page (A10) |
| E-Commerce | E02 products, E03 product details, E04 checkout, E05 Arabic home; admin D01 sales report, D02 products, D03 orders, D04 banners, D05 roles | E07 theme before/after, E08 mobile, admin Arabic screen |
| CleanTech | **Nothing more needed (your decision).** The login-screen cover stays; it shows the product's look but not what it does | — |
| MedGate | Home in English and Chinese, "Why MedGate", FAQs, Contact | German and French home (for the four-language grid M03), Services (M02), mobile (M05) |
| AI Cloud site | Home (English and Arabic), Services | W02 Next.js vs Angular pair (needed for the before/after slider), mobile, recordings |

**Problems found in the images you sent** (they are in the portfolio as they are, except where noted):
1. **E-commerce admin orders** showed a customer's name and ID number: **blurred** in the portfolio image.
2. **"shutterstock.com" watermark** is visible on the demo burger photos (product list, product page, cover). Replace the demo images with ones you may use.
3. **Test data** is visible: AlSalam ("test", "Ai-Cloud.com", "Test Product"), the checkout address "dsdsdsds" and item "Dfefwefwf", and junk rows in the banner list.
4. The sales-report figures come from a demo store; captions say "sample data".
5. Scrollbars and a browser link tooltip (MedGate FAQs) were **cropped out**.

## Capture rules (apply to every shot)

1. Browser window **1600×1000** (or 1920×1080) at **100% zoom**. Desktop shots only unless marked Mobile.
2. **Mobile** = 390×844 (DevTools device mode, "iPhone 14"). Capture without the device frame.
3. Hide the bookmarks bar, extensions and the OS taskbar. Use an overlay scrollbar or crop it out.
4. **Use realistic sample data.** No rows named "test", no `Ai-Cloud.com` placeholder suppliers, no
   `ghgh` links, no `support@yourstore.com`. Fictional but believable names, dates and amounts.
5. **Never show:** real client data, real people's names, emails or phone numbers (the CleanTech login
   screenshot showed a real email address; it was blurred, do not repeat it), tokens, or browser URL bars
   with private IDs.
6. Save lossless **PNG**. Name files `<project>-<NN>-<slug>.png` (for example `alsalam-02-shipments.png`).
7. Recordings: 10–20 seconds, 1600×1000, no audio, MP4 or WebM, start and end on a still frame.
8. Send each project's files in one folder. I will run them through the image pipeline (AVIF + WebP,
   responsive sizes) and add captions in English and Arabic.

---

## 1. AlSalam International

Live URL gives only the login screen (the app loads after sign-in), so capture from a logged-in session
with demo data. Routes below are as written in the router config (under `/main`).

### P0 — must have

| # | Page / route | State | Visible | Must NOT be visible | Why | Device / Lang / Type |
|---|---|---|---|---|---|---|
| A01 | Dashboard (first page after login, `Dashboard.View`) | Demo data with a mix of statuses | The three summary cards (shipments, products and suppliers, companies and documents) and the recent-shipments table | "test" rows, `Ai-Cloud.com`, real invoice numbers | First impression and an operations overview. **Replaces the current cover**, which shows test rows | Desktop · EN · N |
| A02 | Shipments list `/main/shipments` | A status filter applied | Filter bar, at least 6 rows covering several of the five statuses (Ready to Ship, In Transit, Arrived, Delivered, Delayed), pagination | Real supplier names or amounts | The core daily screen | Desktop · EN · N |
| A03 | Shipment details `/main/shipments/:id` | A shipment "In Transit" | Header with status, the Overview tab, tab bar showing Products and Documents | Real order numbers | Shows depth beyond a list | Desktop · EN · N |
| A04 | Product details `/main/products/:id` | Product mid-way through registration (for example Under Review or Trial Stage) | The registration status, the requirements list, the QR code download button | Real product or manufacturer names | The most distinctive business logic: the Draft → … → Registered pipeline | Desktop · EN · N |
| A05 | Dashboard or Shipments in **Arabic** | Same data as A01 or A02 | Fully mirrored layout: sidebar on the right, Arabic labels, numerals | Mixed-language leftovers | Proof of real RTL (1,608 labels per language) | Desktop · AR · N |

### P1 — highly recommended

| # | Page / route | State | Visible | Why | Device / Lang / Type |
|---|---|---|---|---|---|
| A06 | Reports hub `/main/reports` | Default | The grid of report cards (13) | Reporting breadth | Desktop · EN · N |
| A07 | One report, for example `/main/reports/import-by-country` | Results loaded | Chart or table and the **Export to Excel** action | Reporting plus export | Desktop · EN · N |
| A08 | Company details → Documents tab `/main/companies/:id` | A document selected so the details drawer is open | File list with thumbnails, the drawer | Document management | Desktop · EN · N |
| A09 | Roles and permissions `/main/roles-permissions` | One role expanded | The permission matrix | Access control | Desktop · EN · N |
| A10 | Public product verification `/public/products/:qrcode` | A sample product, **not logged in** | The public page | Unique public-facing feature. Best mobile candidate, **NEEDS CONFIRMATION** that it is designed for phones | **Mobile** · EN · N |

### P2 — optional

| # | Page | Why |
|---|---|---|
| A11 | Dashboard on mobile | Responsive proof |
| A12 | Settings → Registration requirements `/main/settings/registration-requirements` | Configurable workflow |
| A13 | Company → Activity log tab | Audit trail |
| A14 | Settings → Reminder templates | Reminders |

### Recording

| # | Flow | Length |
|---|---|---|
| A-R1 | Shipments list → open a shipment → switch the language EN → AR | 15 s |

### NEEDS CONFIRMATION (do not capture until answered)
The CV mentions a **command palette (Ctrl+K)**, **keyboard shortcuts**, **draft autosave** and **PDF/image
viewers**. None of them exist in the zip you sent (no key-handler, palette or autosave code). If they exist in a newer
version, tell me and add: A15 command palette open (P1), A16 document viewer (P1).

### Visual story
1. **First image:** A01 dashboard. 2. **Most impressive:** A04, the registration pipeline.
3. **Business value:** A06 reports hub. 4. **Technical complexity:** A09 permissions, plus the existing
architecture diagram. 5. **Best mobile:** A10 (if responsive), else A11.
6. **Architecture diagram:** already on the page. 7. **Before/after:** no (nothing to compare). 8. **Recording:** yes, A-R1.

---

## 2. E-Commerce platform (storefront + admin dashboard)

Live storefront: https://ecommerce.ai-cloud.sa/ · Admin login: https://dashboard-ecommerce.ai-cloud.sa/auth/login
(the admin shows only a login to me; capture it while signed in).

**Fix before capturing the storefront:** in the server-rendered HTML the translation keys appear raw
(`NAV.HOME`, `FOOTER.NEWSLETTER_TITLE`), and the footer contains placeholder contact details
(`support@yourstore.com`, `+201000000000`) and test links (`ghgh`, `gfgfgf`). **NEEDS CONFIRMATION** in a real
browser whether the keys show after the page loads; either way, crop above the footer or fix the data first.

### Storefront

| # | Priority | Page / route | State | Visible | Must NOT be visible | Why | Device / Lang / Type |
|---|---|---|---|---|---|---|---|
| E01 | P0 | Home `/` | Fully loaded, translated | Header, hero slider, category row, product sections | Footer with placeholder data | Overall experience | Desktop · EN · N |
| E02 | P0 | Products `/products` | A category/filter applied | Filters, product cards. (Sorting and pagination were **not found** in the code; do not promise them) | Empty states | Browsing | Desktop · EN · N |
| E03 | P0 | Product details `/products/:slug` | A product with images | Gallery, price, add to cart, reviews if enabled. Variants: **NEEDS CONFIRMATION** | Broken images | Detail experience | Desktop · EN · N |
| E04 | P0 | Checkout `/checkout` | Items in cart, **stop before paying** | Address, shipping, payment choice (cash on delivery or online) | Real address, phone, card data | The money page | Desktop · EN · N |
| E05 | P0 | Home in **Arabic** `/` | Language = AR | Mirrored layout | Raw translation keys | RTL proof | Desktop · AR · N |
| E06 | P1 | Cart `/my-cart` | 2–3 items | Quantities, totals | Real names | Purchase flow | Desktop · EN · N |
| E07 | P1 | **Theme proof**: Home with two different brand-color sets | Change the three colors in the admin (settings), capture before and after | Same page, different palette | Admin credentials | The standout feature: admin-driven theme. Used for the before/after slider | Desktop · EN · N (two images) |
| E08 | P1 | Home and Product details on **mobile** | Default | Hero, product cards | — | Responsive proof | **Mobile** · EN · N |
| E09 | P1 | Order details `/my-orders/:id` | A completed order | Status, items | Real address | After-sale experience | Desktop · EN · N |
| E10 | P1 | Return request `/returns/request/:orderId` | Form filled with sample reason | Return form | — | Returns flow | Desktop · EN · N |
| E11 | P2 | Login/Register with the Google option | Default | Google sign-in button | — | Account options | Desktop · EN · N |
| E12 | P2 | Favorites `/my-favorite` | 3 products | — | — | Engagement feature | Desktop · EN · N |

### Admin dashboard

| # | Priority | Page / route | State | Visible | Must NOT be visible | Why | Device / Lang / Type |
|---|---|---|---|---|---|---|---|
| D01 | P0 | Reports → Sales `/reports` | Date range with data | Revenue chart and totals | Real revenue | Analytics (the six report pages use API-driven ECharts) | Desktop · EN · N |
| D02 | P0 | Products `/products` | A few demo products, filter open | Product table, filter | Real SKUs | Catalogue management | Desktop · EN · N |
| D03 | P0 | Orders `/orders` and detail `/orders/:orderId` | Mixed statuses | Order list, then one detail | Real customers | Order handling | Desktop · EN · N (two) |
| D04 | P0 | Banners `/banners/add` or an edit page | Form with image | Banner form | — | Content control | Desktop · EN · N |
| D05 | P0 | Roles `/roles/:roleId` | Permissions ticked | Permission list (34 permissions are used in routes) | — | Access control | Desktop · EN · N |
| D06 | P1 | **Theme settings** (settings page where the three colors are set) | Color pickers visible | The control that restyles the storefront. Its exact location: **NEEDS CONFIRMATION** | — | Pairs with E07 | Desktop · EN · N |
| D07 | P1 | Returns `/returns/:returnId`, Discounts, Coupons, Inventory | One each | — | Real data | Breadth | Desktop · EN · N |
| D08 | P2 | Dashboard home `/dashboard` | — | **Do not use as proof of live analytics**: its weekly sales, activity and badge numbers are hard-coded in the source | — | — | — |

**Do not capture / claim:** a FullCalendar scheduling screen. FullCalendar is installed but never used in
the code you sent. Admin RTL: **NEEDS CONFIRMATION** (translations exist in both languages; I did not find where
the direction is set for the admin).

### Recording

| # | Flow | Length |
|---|---|---|
| E-R1 | Add to cart → checkout (cash on delivery) → order success | 15 s |

### Visual story
1. **First image:** E01 (storefront home). 2. **Most impressive:** E07 theme before/after.
3. **Business value:** E04 checkout (cash on delivery or online payment). 4. **Technical complexity:** a diagram of the three render modes
(server-rendered catalogue, prerendered info pages, client-rendered account pages) and the theme flow.
5. **Best mobile:** E08 product list. 6. **Architecture diagram:** yes (render modes + theme). 7. **Before/after:** yes, the
theme (E07). 8. **Recording:** yes, E-R1.

---

## 3. CleanTech

No live URL and the zip has no `package.json`, so capture from a local or staging run with sample data
(**NEEDS CONFIRMATION** that the app can run against a demo backend). Replace the login-screen cover.

| # | Priority | Page / route | State | Visible | Must NOT be visible | Why | Device / Lang / Type |
|---|---|---|---|---|---|---|---|
| C01 | P0 | Admin dashboard (admin home) | Sample data | Stock chart, sensor chart, task pie chart | Real names | Replaces the login cover | Desktop · EN · N |
| C02 | P0 | Tasks `/admin/tasks` | Mixed statuses (Pending, In Progress, Waiting for Approval, Completed, Overdue…) | Task list with status and priority | Real people | The core workflow | Desktop · EN · N |
| C03 | P0 | Task calendar `/admin/task-calendar` | A busy month | Calendar with tasks | — | Planning view | Desktop · EN · N |
| C04 | P0 | Shift calendar `/admin/shift-calendar` | A busy month | Shifts | — | Scheduling | Desktop · EN · N |
| C05 | P0 | **Cleaner workspace on a phone** (cleaner routes) | The cleaner's own tasks | Task list | Real names | Best mobile shot, shows role-specific UI | **Mobile** · EN · N |
| C06 | P0 | **Two-up: Admin vs Cleaner** | Same moment | Two different workspaces | — | Proves the five role-based workspaces | Desktop · EN · N (two) |
| C07 | P1 | Stock `/admin/material` and transactions `/admin/transaction` | Sample items | Materials, quantities | — | Inventory | Desktop · EN · N |
| C08 | P1 | Sensors `/admin/sensor` (+ chart) | A sensor with readings | Sensor chart | — | IoT visibility | Desktop · EN · N |
| C09 | P1 | Attendance `/admin/attendance` | Sample records | Table | Real people | Workforce tracking | Desktop · EN · N |
| C10 | P1 | Location tree: area → city → organization → building → floor → section → point | One path opened | The hierarchy screens | Real addresses | Structure depth | Desktop · EN · N |
| C11 | P1 | A generated **PDF report** opened in the viewer, and the Excel export | Tasks or attendance report | The PDF page | Real data | Reporting | Desktop · EN · N (two) |
| C12 | P1 | The same dashboard in **Arabic** | Language = AR | Mirrored layout | — | RTL | Desktop · AR · N |
| C13 | P1 | Notification panel after a new one arrives | Notification visible | — | — | Real-time (SignalR) | Desktop · EN · N |
| C14 | P2 | Leaves `/admin/leave`, Feedback `/admin/feedback-home`, Manager/Supervisor/Auditor home | One each | — | — | Breadth | Desktop · EN · N |

### Recording

| # | Flow | Length |
|---|---|---|
| C-R1 | Admin assigns a task → the cleaner's phone receives the notification live (two windows side by side). Only record if the live flow works | 15 s |

**NEEDS CONFIRMATION:** Angular version (CV says 19, no package file in the zip) · "multi-tenant" (no tenant
code found; users belong to providers) · Urdu (the language service handles `ur` with RTL) · the task-comment hub is wired but its start is commented out, so do not show live comments.

### Visual story
1. **First image:** C01 admin dashboard. 2. **Most impressive:** C06 role two-up. 3. **Business value:** C02 tasks.
4. **Technical complexity:** C10 location hierarchy and a "five role workspaces" diagram. 5. **Best mobile:** C05.
6. **Architecture diagram:** yes (the role route trees, which I can draw from the code). 7. **Before/after:** no. 8. **Recording:** yes, C-R1.

---

## 4. MedGate

**No source code and no live URL were provided**, so I could not verify anything about this project beyond the
screenshot you sent. Please send the URL or code if you want technical claims on the page.

| # | Priority | Page | State | Visible | Why | Device / Lang / Type |
|---|---|---|---|---|---|---|
| M01 | P0 | Home hero | Default | Logo, nav, language switcher (EN, 中文, DE, FR), headline, Start Now | First impression (your existing shot is fine) | Desktop · EN · N |
| M02 | P0 | Services section | Scrolled to it | Service cards | What the business offers | Desktop · EN · N |
| M03 | P0 | **Language grid** | Hero in EN, 中文, DE, FR | Four hero shots in one 2×2 image | Multilingual proof | Desktop · 4 langs · N (four, I compose) |
| M04 | P1 | FAQs | Expanded item | FAQ block | Content structure | Desktop · EN · N |
| M05 | P1 | Home on **mobile** | Default | Hero, menu | Responsive proof | **Mobile** · EN · N |
| M06 | P2 | About | Default | — | Completeness | Desktop · EN · N |

**Visual story:** first M01 · most impressive M03 · business value M02 · technical complexity: none to show
(the CV lists lazy routing and hash navigation; unverified) · mobile M05 · diagram no · before/after no · recording optional.

---

## 5. AI Cloud corporate website (Next.js → Angular)

Live: https://www.ai-cloud.sa/ — **NEEDS CONFIRMATION** whether it runs the Next.js or the Angular build.
Both source zips run locally, so the before/after can be captured from them.

| # | Priority | Page | State | Visible | Why | Device / Lang / Type |
|---|---|---|---|---|---|---|
| W01 | P0 | Home hero `/` | Page top | Nav, headline, hero visual | First impression (existing shot, but it had a browser URL tooltip; retake) | Desktop · EN · N |
| W02 | P0 | **Next.js vs Angular, same screen** | Same viewport, same scroll position, run each locally | Two images of the home hero | Evidence for the 1:1 migration and the before/after slider | Desktop · EN · N (two) |
| W03 | P0 | Services section | Scrolled to it | Service cards | Business content | Desktop · EN · N |
| W04 | P0 | Home in **Arabic** | Language = AR | Mirrored layout | Bilingual proof | Desktop · AR · N |
| W05 | P1 | Products menu open | Dropdown open | Header dropdown | Interactive UI | Desktop · EN · N |
| W06 | P1 | Portfolio `/portfolio` | Default | Project list | Content | Desktop · EN · N |
| W07 | P1 | Contact `/contact` | Validation message visible | Form | Conversion element | Desktop · EN · N |
| W08 | P1 | Mobile menu open | Menu open | — | Responsive proof | **Mobile** · EN · N |
| W09 | P1 | Second pair for the slider: Services section in both builds | Same scroll | — | Stronger comparison | Desktop · EN · N (two) |
| W10 | P2 | Partners `/partners`, CleanTech page `/clean-tech`, AlSalam page `/alsalam-international` | Default | — | Completeness | Desktop · EN · N |

### Recordings

| # | Flow | Length |
|---|---|---|
| W-R1 | Scroll through the home page (the scroll animations) | 12 s |
| W-R2 | Switch EN → AR → EN instantly, showing no page reload | 8 s |

**Component count:** the CV says "50+ components"; the Angular source has **35 components** (28 templates).
The portfolio now says 35. Tell me if 50+ counts something else.

### Visual story
1. **First image:** W01. 2. **Most impressive:** W-R2, the instant language switch. 3. **Business value:** W03.
4. **Technical complexity:** W02 before/after. 5. **Best mobile:** W08. 6. **Architecture diagram:** optional, small.
7. **Before/after:** yes (W02, W09). 8. **Recording:** yes (W-R1, W-R2).

---

## Final consolidated checklist (tick as you go)

### AlSalam
- [ ] A01 Dashboard (demo data, EN)  ·  P0
- [ ] A02 Shipments list (filter applied)  ·  P0
- [ ] A03 Shipment details (Overview tab)  ·  P0
- [ ] A04 Product details with registration status and QR button  ·  P0
- [ ] A05 Dashboard or Shipments in Arabic  ·  P0
- [ ] A06 Reports hub  ·  P1
- [ ] A07 One report with Excel export  ·  P1
- [ ] A08 Company Documents tab with the drawer open  ·  P1
- [ ] A09 Roles and permissions  ·  P1
- [ ] A10 Public product verification page, mobile  ·  P1
- [ ] A-R1 Recording: shipments → shipment → EN/AR switch  ·  P1
- [ ] A11–A14 Mobile dashboard, Registration requirements, Activity log, Reminder templates  ·  P2
- [ ] Answer: do command palette, shortcuts, autosave, PDF/image viewer exist in a newer version?

### E-Commerce
- [ ] Fix or avoid the placeholder footer and raw translation keys
- [ ] E01 Storefront home  ·  P0
- [ ] E02 Products with filters  ·  P0
- [ ] E03 Product details  ·  P0
- [ ] E04 Checkout (stop before paying)  ·  P0
- [ ] E05 Home in Arabic  ·  P0
- [ ] D01 Sales report  ·  P0
- [ ] D02 Admin products  ·  P0
- [ ] D03 Admin orders + order detail  ·  P0
- [ ] D04 Banner form  ·  P0
- [ ] D05 Roles and permissions  ·  P0
- [ ] E06 Cart  ·  P1
- [ ] E07 Theme before/after (two colour sets)  ·  P1
- [ ] D06 Theme settings screen  ·  P1
- [ ] E08 Mobile home and product  ·  P1
- [ ] E09 Order details  ·  P1
- [ ] E10 Return request  ·  P1
- [ ] D07 Returns / Discounts / Coupons / Inventory  ·  P1
- [ ] E-R1 Recording: add to cart → checkout → success  ·  P1
- [ ] E11–E12 Google sign-in, Favorites  ·  P2
- [ ] Answer: where are the theme colours set? Does the admin work in Arabic/RTL? Is there a FullCalendar screen elsewhere?

### CleanTech
- [ ] C01 Admin dashboard  ·  P0
- [ ] C02 Tasks list  ·  P0
- [ ] C03 Task calendar  ·  P0
- [ ] C04 Shift calendar  ·  P0
- [ ] C05 Cleaner workspace on mobile  ·  P0
- [ ] C06 Admin vs Cleaner two-up  ·  P0
- [ ] C07 Stock and transactions  ·  P1
- [ ] C08 Sensors with chart  ·  P1
- [ ] C09 Attendance  ·  P1
- [ ] C10 Location hierarchy  ·  P1
- [ ] C11 PDF report and Excel export  ·  P1
- [ ] C12 Dashboard in Arabic  ·  P1
- [ ] C13 Notification panel  ·  P1
- [ ] C-R1 Recording: assign task → live notification  ·  P1
- [ ] C14 Leaves, Feedback, other roles  ·  P2
- [ ] Answer: Angular version? Meaning of "multi-tenant"? Can the app run on demo data?

### MedGate
- [ ] M01 Home hero  ·  P0
- [ ] M02 Services  ·  P0
- [ ] M03 Four-language hero set (EN, 中文, DE, FR)  ·  P0
- [ ] M04 FAQs  ·  P1
- [ ] M05 Mobile home  ·  P1
- [ ] M06 About  ·  P2
- [ ] Send: live URL or source code, to verify the technical claims

### AI Cloud website
- [ ] W01 Home hero (no browser tooltip)  ·  P0
- [ ] W02 Next.js vs Angular home hero, same viewport  ·  P0
- [ ] W03 Services section  ·  P0
- [ ] W04 Home in Arabic  ·  P0
- [ ] W05 Products dropdown open  ·  P1
- [ ] W06 Portfolio page  ·  P1
- [ ] W07 Contact with validation message  ·  P1
- [ ] W08 Mobile menu open  ·  P1
- [ ] W09 Services section in both builds  ·  P1
- [ ] W-R1 Recording: scroll animations  ·  P1
- [ ] W-R2 Recording: instant EN/AR switch  ·  P1
- [ ] W10 Partners, CleanTech page, AlSalam page  ·  P2
- [ ] Answer: which build is live? What do "50+ components" count?

**Totals (checklist lines, counting each ID range as one shot per ID):** P0 = 28 · P1 = 31 · P2 = 9 (recordings and comparison pairs included). Start with the P0 rows of AlSalam and
CleanTech: they replace the two weakest covers.
