# ClimatePro — HVAC & Air Conditioning Website

A portfolio website for a fictional HVAC business, **ClimatePro**, built to bring in leads. It can be set up for the US or Australian market. All business details are sample content.

## Tech
TanStack Start (React 19, TypeScript), Tailwind CSS 4, shadcn/ui (Radix), lucide-react, React Hook Form + Zod, Netlify Forms, and Netlify Image CDN for optimized images.

## Run locally
```bash
pnpm install
pnpm dev              # Vite on :3000
netlify dev           # use this to test Netlify features such as forms and the image CDN
pnpm build            # production build (publishes dist/client)
```
To deploy, connect the repo to Netlify. `netlify.toml` already contains the build settings.

## Configuration
- **Business details** (name, phone, email, address, hours, emergency availability, social links, `isSampleData`): `src/config/business.ts`. While `isSampleData` is true, the site shows sample labels and leaves contact details out of structured data.
- **Market** (currency, postal code and phone formats, units, terminology): `src/config/market.ts`. Set `defaultMarket` in `business.ts` to choose the market.
- **Service areas**: `src/config/serviceAreas.ts`
- **Services, plans, testimonials, projects**: `src/config/services.ts`, `src/config/content.ts`
- **Estimator assumptions and pricing** (off by default): `src/config/estimator.ts`
- **Form submissions**: `src/lib/submit.ts` posts URL-encoded data to Netlify Forms through `/__forms.html`. To send leads to a CRM or booking provider instead, replace the transport with `setSubmissionTransport`.

## Roadmap
The homepage, layout, services listing, and installation estimator are built. Service detail pages, the quote wizard, the booking form, the contact page, and the about, maintenance plans, service areas, and legal pages are still to come. Netlify Forms registration and the sitemap and robots files are also still to come. See `PLAN.md`.
