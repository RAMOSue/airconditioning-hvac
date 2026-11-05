import { createFileRoute } from '@tanstack/react-router'
import { Clock, FileCheck2, MessageSquareText, ShieldCheck } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/SectionHeading'
import { QuoteWizard } from '@/components/forms/QuoteWizard'
import { business } from '@/config/business'
import { useMarket } from '@/lib/market-context'
import { oneOf, str } from '@/lib/search'
import { seo } from '@/lib/seo'

const services = ['air-conditioning-installation', 'hvac-repair', 'hvac-maintenance', 'heating', 'commercial-hvac', 'other'] as const

interface QuoteSearch {
  service?: (typeof services)[number]
  propertyType?: 'Residential' | 'Commercial'
  size?: 'small' | 'medium' | 'large' | 'unsure'
  units?: string
  country?: 'US' | 'AU'
  postal?: string
  locality?: string
  details?: string
}

export const Route = createFileRoute('/get-a-quote')({
  validateSearch: (s: Record<string, unknown>): QuoteSearch => ({
    service: oneOf(s.service, services),
    propertyType: oneOf(s.propertyType, ['Residential', 'Commercial'] as const),
    size: oneOf(s.size, ['small', 'medium', 'large', 'unsure'] as const),
    units: str(s.units, 3),
    country: oneOf(s.country, ['US', 'AU'] as const),
    postal: str(s.postal, 10),
    locality: str(s.locality, 80),
    details: str(s.details, 1500),
  }),
  head: () =>
    seo({
      title: 'Request a Free HVAC Estimate | ClimatePro',
      description:
        'Request a free estimate for air conditioning installation, HVAC repair, maintenance, heating, or commercial HVAC. A simple five-step form — our team follows up.',
      path: '/get-a-quote',
    }),
  component: GetQuotePage,
})

function GetQuotePage() {
  const search = Route.useSearch()
  const { contact } = useMarket()
  return (
    <>
      <PageHero
        eyebrow="Free Estimate"
        title="Request a Free Estimate"
        description="Tell us about your property and what you need. It takes about two minutes, and there is no obligation."
        crumbs={[{ label: 'Request a Free Estimate' }]}
      />
      <section className="bg-surface py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <QuoteWizard
              prefill={{
                service: search.service,
                propertyType: search.propertyType,
                propertySize: search.size,
                units: search.units,
                country: search.country,
                postal: search.postal,
                locality: search.locality,
                details: search.details,
              }}
            />
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-bold">Why request an estimate?</h2>
              <ul className="mt-4 space-y-4 text-sm">
                {[
                  { icon: FileCheck2, t: 'Free, no-obligation estimate', d: 'Review your options before deciding anything.' },
                  { icon: MessageSquareText, t: 'Clear explanations', d: 'We explain recommendations in plain language.' },
                  { icon: ShieldCheck, t: 'Your details stay private', d: 'Used only to respond to this request.' },
                ].map((i) => (
                  <li key={i.t} className="flex gap-3">
                    <i.icon className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
                    <span>
                      <span className="block font-semibold text-navy">{i.t}</span>
                      <span className="text-muted-foreground">{i.d}</span>
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl bg-navy p-6 text-white">
              <h2 className="text-lg font-bold text-white">Prefer to talk?</h2>
              <p className="mt-2 text-sm text-slate-300">Call our team to discuss your requirements.</p>
              <a href={`tel:${contact.phoneHref}`} className="mt-4 block text-2xl font-extrabold text-white hover:underline">
                {contact.phoneDisplay}
              </a>
              <p className="mt-3 flex items-center gap-2 text-sm text-slate-300">
                <Clock className="size-4 text-brand" aria-hidden="true" /> {business.hoursShort}
              </p>
            </div>
          </aside>
        </Container>
      </section>
    </>
  )
}
