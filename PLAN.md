# ClimatePro — Build Plan

1. **Done** — Project setup, design tokens (brand palette, Plus Jakarta Sans), central config (`src/config/business.ts`, `market.ts`, `services.ts`, `serviceAreas.ts`, `content.ts`, `estimator.ts`), header with services dropdown, mobile slide-out menu, footer, announcement bar, US/AU market switcher, sticky mobile call bar, back-to-top.
2. **Done** — Homepage with all 14 sections (hero, trust, services, emergency CTA, why choose, process, projects gallery, maintenance promo, testimonial carousel, service-area search, final CTA, footer).
3. **Partly done** — `/services` listing page is built. Still needed: `src/routes/services.$slug.tsx`, the service detail template that renders content already in `services.ts` (breadcrumbs, hero, problems, features, process, related, FAQ via `components/shared/Faq.tsx`, CTA, contact). Mount `InstallEstimator` on the air-conditioning-installation page.
4. **To do** — `/get-a-quote` 5-step QuoteWizard (react-hook-form + zod, reads search params `service, propertyType, size, units, country, postal, locality, details`) and `/book-service` BookingForm (search param `urgent`). Submit via `submitLead()` in `src/lib/submit.ts`.
5. **Partly done** — Install estimator component is built (`components/forms/InstallEstimator.tsx`). Still needed: `/maintenance-plans` page (data in `content.ts`) and `/service-areas` page (reuse `ServiceAreaSearch`).
6. **To do** — `/contact` (ContactForm, search param `topic`), `/about`, `/privacy-policy`, `/terms`.
7. **To do** — `public/__forms.html` skeleton for forms `quote-request`, `service-booking`, `contact` (every field + `reference`, `bot-field`), then run the netlify-forms `enable.cjs` script. Also `public/robots.txt` and `public/sitemap.xml`.
8. **To do** — Typecheck, lint, test routes, forms, and responsive layouts.
