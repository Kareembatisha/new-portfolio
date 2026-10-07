# 04 — Portfolio audit, sales and marketing review, and master backlog

**Evidence:** the portfolio code and build output, the six project sources, and the live pages I could open.
**Not available:** a browser, real traffic data, Lighthouse, and a deployed copy of the portfolio. Anything about visitor
behavior below is a hypothesis to test, not a finding.

Legend. **Priority:** P0 before launch · P1 first 2 weeks · P2 month 1–2. **Effort:** S under half a day · M about a day · L several days.
**Status:** ✅ done in this batch · ⏳ waiting for your input or assets · 🔲 not started.

---

## A. What was implemented in this batch

### Animation (Output 4)

| Item | Status | Notes |
|---|---|---|
| Page transitions between pages, with a shared-element morph from a project card to the case-study cover | ✅ | Uses the browser's View Transitions API through Angular's router (`withViewTransitions`). Browsers without it navigate normally. Reduced motion turns it off. **Check in a real browser** (I could not run one). |
| Staggered reveals: project cards, service cards, "How I work" steps, strengths, Work page grids, architecture layers | ✅ | Hidden states exist only after the page loads in a browser, never in the prerendered HTML. |
| Count-up numbers | ✅ | Only verified figures: **5** projects (guarded by a test against the project list), **20+** CleanTech entities, **5** CleanTech roles, **2** languages with RTL. The "50+ components" figure is **not** used (the source has 35). |
| Navbar hide on scroll down, show on scroll up | ✅ | Stays visible near the top, while the mobile menu is open, and when a link inside it takes keyboard focus. |
| Image reveal | ✅ | Images fade in once loaded; prerendered HTML shows them with no fade. (Blur-up placeholders were not added: the images are small AVIF/WebP, and a fade does the job without extra files.) |
| Contact form feedback | ✅ | Gentle shake on an invalid field, error text fades in, success panel slides in. |
| Screenshot scroll preview (browser frame that pans a tall page) | ✅ built, ⏳ hidden | Appears on a case study only when it has a `scrollPreview` image. Needs one tall page screenshot per project (the checklist marks these as full-page captures). Works by hover, tap or keyboard; with reduced motion the frame scrolls natively. |
| Before/after slider | ✅ built, ⏳ hidden | Appears when a case study has a `compare` pair. The AI Cloud Next.js → Angular pair (W02) and the e-commerce theme pair (E07) are the planned uses. Native range input, so keyboard and screen readers work. |
| Architecture reveal | ✅ | Layers appear one after another. |

Not added, on purpose: particles, marquees, cursor effects, 3D.

### Conversion (Output 5)

| Item | Status | Notes |
|---|---|---|
| Floating WhatsApp button on mobile | ✅ | Opens WhatsApp with a prefilled greeting. Hidden on the Contact page and on desktop. |
| Context-specific CTAs | ✅ | Navbar **Start a Project** · hero and home call-to-action **Discuss Your Project** · case studies **Discuss a Similar Project** · every CTA block also has **Message on WhatsApp**. |
| Direct contact from key places | ✅ | CTA blocks (home, work, services, about, case studies) now include direct WhatsApp. |
| WhatsApp fallback | ✅ | After a send, the message appears on screen with a **Copy message** button. |
| Backup form | ✅ code, ⏳ needs a deploy test | The contact form is also posted to **Netlify Forms** so a lead reaches your Netlify inbox even if WhatsApp or the email app does not open. The prerendered form has the right attributes in both languages. Netlify only recognises it on a real deploy, so **submit one test message after deploying and check the Forms tab**. The form's privacy note was updated to say a copy is sent. |

**Spam note:** the form has a honeypot field. Netlify's free tier has a monthly submission limit; check your plan.

---

## B. Page-by-page audit (Output 13)

### Home
| Issue | Why it matters | Exact improvement | Content / images needed | Animation | CTA | Pri | Effort |
|---|---|---|---|---|---|---|---|
| Portrait is a casual night street photo | First impression for business visitors | Replace with a plain-background, well-lit portrait (4:5) | One photo | Existing hero entrance | — | P0 | S |
| Compact "More projects" cards have no image though covers exist | Visual inconsistency, fewer images on show | Add thumbnails to the compact cards | None (covers exist) | Stagger (done) | — | P1 | S |
| Service cards don't link to the Services page sections | Dead end for interested visitors | Link each card to `/services#<id>` | — | — | "Learn more" | P1 | S |
| No FAQ, so objections are unanswered | Price, timeline and process are the top reasons people hesitate | A short FAQ (5–6 questions) | **NEEDS USER CONFIRMATION:** your real answers (pricing approach, typical timeline, communication, support after launch) | Accordion open/close | Discuss Your Project | P1 | M |
| "How I work" steps are my reading of your CV | Unverified process claims | Replace with your real process | **NEEDS USER CONFIRMATION** | Stagger (done) | — | P0 | S |
| No availability signal | Visitors want to know you can take work | A small line "Available for new projects from <month>" | **NEEDS USER CONFIRMATION** | — | — | P1 | S |
| Proof strip, count-up, CTAs | — | ✅ done | — | ✅ | ✅ | — | — |

### Work
| Issue | Why it matters | Exact improvement | Content / images | Animation | CTA | Pri | Effort |
|---|---|---|---|---|---|---|---|
| Visitors cannot find "one like mine" | Clients search by type | Filter chips: Dashboards · E-commerce · Websites | Project type tags (I can derive from categories) | Cards re-order with a fade | — | P1 | M |
| Cards show no role or year | Context for credibility | Add role and year line | **NEEDS USER CONFIRMATION:** years | — | — | P2 | S |
| Staggered cards, direct CTA | — | ✅ done | — | ✅ | ✅ | — | — |

### Case-study pages
| Issue | Why it matters | Exact improvement | Content / images | Animation | CTA | Pri | Effort |
|---|---|---|---|---|---|---|---|
| One screenshot per project | The product itself is the proof | Gallery of 4–6 captioned shots with a keyboard-friendly lightbox | The P0/P1 shots in `02-screenshot-checklist.md` | Lightbox fade | — | P0 | M |
| Problem, challenge and outcome sections hidden | A case study without a story reads like a feature list | Fill from your answers in `03-case-study-content.md` | **NEEDS USER CONFIRMATION** (per project) | — | — | P0 | S |
| AlSalam only has an architecture diagram | E-commerce and CleanTech have clear structures worth showing | Add: e-commerce render modes + theme flow; CleanTech five role workspaces | Your approval of how I describe them | Layer reveal (done) | — | P1 | M |
| No link to live sites | Visitors want to see the real thing | "Visit site" for public projects | **NEEDS USER CONFIRMATION:** which URLs may be shown (the live AI Cloud site; the storefront has placeholder footer content) | — | Visit site | P1 | S |
| Hard to move around long pages | Reading fatigue | Sticky section menu + progress bar | — | Progress indicator | — | P2 | M |
| Next project link is text only | Missed browsing | Show the next project's cover | — | Morph (done) | — | P2 | S |
| Scroll preview and before/after | Strongest proof of UI quality | ✅ built, hidden until assets exist | Tall screenshots; before/after pairs | ✅ | — | P1 | S (after assets) |
| Breadcrumb data for search | Better results display | Add breadcrumb structured data | — | — | — | P2 | S |

### Services
| Issue | Why it matters | Exact improvement | Content / images | Animation | CTA | Pri | Effort |
|---|---|---|---|---|---|---|---|
| "Who it's for" and "Typical challenges" are my wording | Unverified positioning | Review and edit | **NEEDS USER CONFIRMATION** | — | — | P0 | S |
| Text only | Hard to scan | Add a project thumbnail per service | None (covers exist) | Stagger | — | P1 | S |
| No pricing guidance | "How much?" is the first question | A short "What affects the quote" block (scope, integrations, languages, deadlines), no prices | **NEEDS USER CONFIRMATION** | — | Contact me for a quote (exists) | P1 | S |
| No process or timeline | Reduces uncertainty | Typical steps and durations | **NEEDS USER CONFIRMATION** | Step reveal | — | P1 | M |

### About
| Issue | Why it matters | Exact improvement | Content / images | Animation | CTA | Pri | Effort |
|---|---|---|---|---|---|---|---|
| No personal story | Trust and differentiation | 2–3 sentences on why Angular and system design | **NEEDS USER CONFIRMATION** (your words) | — | — | P1 | S |
| English CV only | Arabic-speaking clients | Add an Arabic CV and show both download buttons | Arabic CV file | — | Download CV | P1 | M |
| One photo only | Feels thin | A second working photo | A photo | Fade | — | P2 | S |
| "Currently" block missing | Freshness and availability | Small dated block | **NEEDS USER CONFIRMATION** | — | — | P2 | S |

### Contact
| Issue | Why it matters | Exact improvement | Content / images | Animation | CTA | Pri | Effort |
|---|---|---|---|---|---|---|---|
| WhatsApp may not open; lead lost | Lost conversions | ✅ copy fallback + Netlify backup | — | ✅ | ✅ | — | — |
| No response-time expectation | Reduces anxiety | "I usually reply within X" (only if true) | **NEEDS USER CONFIRMATION** | — | — | P1 | S |
| No booking option | Some clients prefer a call | A booking link if you use one | **NEEDS USER CONFIRMATION** | — | Book a call | P2 | S |
| Desktop users can't scan to chat | Friction | WhatsApp QR code | — | — | — | P2 | S |

### Articles
| Issue | Why it matters | Exact improvement | Content / images | Animation | CTA | Pri | Effort |
|---|---|---|---|---|---|---|---|
| Empty, so the nav link is hidden | Wasted SEO opportunity | Publish two articles (see section D) | Your notes | — | Discuss a similar project | P1 | M each |
| After the first article | Reading experience | Table of contents, reading time, author box | — | — | — | P2 | M |

### 404, navigation, footer, mobile menu
| Issue | Why it matters | Exact improvement | Content / images | Animation | CTA | Pri | Effort |
|---|---|---|---|---|---|---|---|
| 404 only has one link | Lost visitor | Add Work, Services and Contact links | — | — | Start a Project | P2 | S |
| Navbar | — | ✅ hide-on-scroll, clear CTA | — | ✅ | ✅ | — | — |
| Mobile menu has no focus trap (Escape closes it, focus can still tab out behind it) | Keyboard and screen-reader users | Trap focus while open | — | — | — | P1 | S |
| Footer has no availability or response line | Missed reassurance | Add the same availability line | **NEEDS USER CONFIRMATION** | — | WhatsApp | P2 | S |
| Mobile WhatsApp button | — | ✅ done | — | ✅ | ✅ | — | — |

---

## C. Sales review (Output 11), answered as a potential client

| Question | Answer today | What to change |
|---|---|---|
| Is it immediately clear what you can build? | Mostly yes: the headline names web applications, and the services list is concrete. | The hero could name the three things most clients ask for (dashboards, e-commerce, Figma→Angular). Your call. |
| Who you build for? | Partly. "Who it's for" is on the Services page, but it is my wording. | Confirm or replace it. |
| What problems you solve? | Weak. Case studies describe features, not problems. | The Problem/Outcome answers in `03-case-study-content.md`. |
| Is there enough proof? | Not yet. One screenshot per project, no results, no testimonials. | The P0 screenshots, outcomes (if real), and testimonials requested from real people (never invented). |
| Technical credibility? | Good. The audit found real evidence: role-based routing, public verification page, runtime theming, SSR strategy, signal-based i18n. | Lead with those facts. |
| Is availability clear? | No. | The availability line (P1). |
| Easy to contact? | Yes, now: floating WhatsApp on mobile, direct buttons in every CTA block, a copy fallback and a backup form. | Test after deploy. |
| Unanswered objections? | Price, timeline, communication, what happens after launch, working across time zones. | A short FAQ with your real answers. |
| Process information? | Four generic steps (mine). | Your real process. |
| Pricing? | Correctly no fixed prices. | Add "what affects the quote" instead of numbers. |
| Services to emphasize | (1) Dashboards and admin systems: the strongest evidence (AlSalam, CleanTech, the e-commerce admin). (2) E-commerce with server rendering and Paymob. (3) Arabic/English RTL as a differentiator, supported by three projects. | — |
| Services to de-emphasize | Generic "Frontend development" and "Web app development" as separate headline items; they overlap with the others. Figma→Angular has **no verified project in these six**, so keep it present but modest until you have an example. | Decide whether to merge the first two. |

**Outreach ideas grounded in the real work:** agencies that need extra Angular capacity (send the Work page and the AlSalam case study);
companies with bilingual or RTL requirements (send the Arabic screenshots); operators with multi-role systems (CleanTech).

---

## D. Marketing review (Output 12)

### SEO and discoverability
- **Titles and descriptions** are unique per page and per language; each case study uses its project summary. Done.
- **Share images:** one generic image today. A per-project share image (cover + title) would improve LinkedIn and WhatsApp previews. P1 / M.
- **Keywords to test** (validate with Search Console, I have no volume data): "Angular developer Egypt", "freelance Angular developer Saudi Arabia", "Angular dashboard developer", and the Arabic equivalents of "Angular developer" and "frontend developer". The home and service pages are the natural targets.
- **Internal links:** case studies now link to the next project and to contact; service cards should link to their section (P1).
- **Structured data:** person and website data on the home page; add breadcrumbs on case studies (P2).

### LinkedIn and GitHub
- **LinkedIn:** the headline and "Featured" section should use the same positioning as the site and link to the Work page; pin AlSalam and CleanTech.
- **GitHub:** the profile README should link to the portfolio and name the same three strengths. Pinned repositories: only public repos you choose. (None of the six projects was confirmed public.)

### Content from real projects (nothing invented)
| Idea | Format | Based on |
|---|---|---|
| "How a product moves through seven registration stages" | LinkedIn post + case-study diagram | AlSalam product statuses |
| "One flag to switch an app between mock and real data" | Technical article | AlSalam repository layering |
| "Five roles, one Angular app: lazy route trees per role" | Technical article + diagram | CleanTech |
| "Re-brand a store from the admin: runtime colour palettes" | Short video + before/after | E-commerce theme |
| "Next.js to Angular, side by side" | Before/after post | AI Cloud site (needs W02) |
| "Instant Arabic/English switching with Angular signals" | Short video + article | AI Cloud Angular translation service |
| "Server-render some pages, prerender others, keep accounts in the browser" | Article | E-commerce storefront |

The first two articles I would write: **the Next.js → Angular migration** (strongest, the CV already names two real issues) and **the mock/live repository layering**.

### Positioning, Arabic and English
- Arabic copy is mine and should be edited by you; it is the most important marketing copy for Saudi and Egyptian visitors.
- RTL support is a differentiator **only if shown**: put one Arabic screenshot in every P0 list (already in the checklist).

---

## E. Master backlog (Output 6)

"I provide" = what only you can supply. "Claude can do" = what I can build or write without you.

### P0 — Before launch

| # | Task | Page | Reason | Effort | Dependencies | I provide | Claude can do |
|---|---|---|---|---|---|---|---|
| 1 | Replace the portrait | Home, About | First impression | S | Photo | A plain-background photo | Wire it in and optimise |
| 2 | Capture the P0 screenshots (28 in the checklist) | Case studies, cards | The product is the proof | L (yours) | Demo data, logins | **Partly done:** 24 received Oct 5 (CleanTech waived). Still missing: E-commerce theme before/after and mobile, MedGate German/French/Services/mobile, the AI Cloud before/after pair, AlSalam public verification page | Optimise, caption, add the gallery (done for what was received) |
| 3 | Build the screenshot gallery with lightbox | Case studies | Needs more than one image | M | Task 2 | — | ✅ **Done** (Oct 6): 20 screenshots in 4 case studies; native dialog, keyboard and RTL arrows |
| 4 | Answer the "NEEDS CONFIRMATION" questions | Case studies | Fills Problem/Challenge/Outcome honestly | S | — | Answers (list in `03`) | Write and add |
| 5 | Review my wording: service "who it's for", "How I work", role lines, Arabic copy | Services, Home, all | Unverified wording must be yours | S | — | Edits | Apply |
| 6 | Deploy to Netlify, then **test the contact form once** and open the share links | Contact | Confirms the lead path | S | Netlify account | Deploy + one test message | Fix issues |
| 7 | Fix the e-commerce demo store: footer placeholders, the shutterstock-watermarked product photos, test data in checkout and banners | E-commerce shots | Credibility and image licensing | S | Access to the store | The fix, then retake those screenshots | Re-optimise the new images |
| 8 | Run Lighthouse and test mobile, RTL and the new animations in a real browser | All | I could not test visually | S | Deployed site | Results | Fix what you find |
| 9 | Confirm the CV claims not found in the code (command palette, shortcuts, autosave, document viewer, PDF reporting in AlSalam; FullCalendar; CleanTech version and "multi-tenant"; "50+ components"; MedGate details) | Case studies | Accuracy | S | — | Yes/no per item | Update wording |

### P1 — First 2 weeks

| # | Task | Page | Reason | Effort | Dependencies | I provide | Claude can do |
|---|---|---|---|---|---|---|---|
| 10 | Availability line | Home, Contact, Footer | Tells visitors you can take work | S | — | Text | Yes |
| 11 | FAQ section | Home / Services | Answers objections | M | — | Your answers | Yes |
| 12 | Response-time note and booking link | Contact | Reduces hesitation | S | — | Both, if true | Yes |
| 13 | Scroll previews and before/after sliders | Case studies | Strongest proof of quality | S | P1 screenshots (tall pages, pairs) | The images | Yes (components exist) |
| 14 | Thumbnails on compact cards; service cards link to sections | Home | Consistency and navigation | S | — | — | Yes, now |
| 15 | Work filters by type | Work | Find a similar project | M | — | — | Yes |
| 16 | Architecture diagrams: e-commerce, CleanTech | Case studies | Technical credibility | M | Your review | Approval | Yes |
| 17 | "Visit site" links | Case studies | Real-world proof | S | Which URLs may be shown | URLs | Yes |
| 18 | Focus trap in the mobile menu | Navbar | Accessibility | S | — | — | Yes, now |
| 19 | Per-project share images | All | Link previews | M | Covers (exist) | — | Yes |
| 20 | Analytics with a privacy-friendly tool and click events | All | Measure before optimizing | M | Tool choice | Account | Yes |
| 21 | Arabic CV | About | Arabic-speaking clients | M | — | The file | Wire it in |
| 22 | Publish the first article (migration story) | Articles | Authority and search | M | Your notes | Facts and lessons | Draft it |
| 23 | Request real testimonials (colleagues, clients) | Home | Social proof | S | — | The requests | Add the section when they exist |
| 24 | Service thumbnails, "what affects the quote", process | Services | Clarity | M | — | Your input | Yes |
| 25 | Align LinkedIn headline and GitHub README | Off-site | Consistent positioning | S | — | Edit your profiles | Write the text |

### P2 — Month 1–2

| # | Task | Page | Reason | Effort | Dependencies | I provide | Claude can do |
|---|---|---|---|---|---|---|---|
| 26 | Second article; table of contents and reading time | Articles | Authority | M | Notes | Facts | Draft + build |
| 27 | Sticky section menu and progress bar on case studies | Case studies | Long-page navigation | M | — | — | Yes |
| 28 | Breadcrumb structured data | Case studies | Search display | S | — | — | Yes |
| 29 | Role and year on cards | Work | Context | S | Years | Years | Yes |
| 30 | About story, second photo, "Currently" block | About | Personality and freshness | S | — | Text, photo | Yes |
| 31 | WhatsApp QR code and 404 links | Contact, 404 | Friction | S | — | — | Yes |
| 32 | Load only the active language's text (saves roughly 10 KB of the 316 KB first load) | All | Performance | M | — | — | Yes |
| 33 | Content-Security-Policy header | All | Security hardening | M | Test on the host | — | Yes |
| 34 | Separate pages per service, only if search data supports it | Services | SEO | L | Analytics data | — | Later |

---

## F. Risks and notes

- **Performance budget:** the first-load script is 316 KB (88 KB compressed); the warning limit is 320 KB. New features should stay within it (task 32 buys room).
  Measured by `ng build`, not Lighthouse.
- **View transitions** are a browser feature; behavior differs by browser. Test in Chrome, Safari and Firefox.
- **Netlify Forms** is only confirmed after a real deploy.
- **Client permission:** AlSalam, CleanTech and the e-commerce store belong to clients or to AI Cloud. Confirm you may show their screens and names.
- **Test data:** the AlSalam screenshot you sent contains placeholder rows ("test", "Ai-Cloud.com"); retake with believable demo data.
