import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Clock, Phone } from 'lucide-react'
import { PageHero } from '@/components/shared/PageHero'
import { Container } from '@/components/shared/SectionHeading'
import { BookingForm } from '@/components/forms/BookingForm'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { business } from '@/config/business'
import { useMarket } from '@/lib/market-context'
import { oneOf } from '@/lib/search'
import { seo } from '@/lib/seo'

const services = ['air-conditioning-installation', 'hvac-repair', 'hvac-maintenance', 'heating', 'commercial-hvac', 'other'] as const

export const Route = createFileRoute('/book-service')({
  validateSearch: (s: Record<string, unknown>): { service?: (typeof services)[number]; urgent?: 'yes' } => ({
    service: oneOf(s.service, services),
    urgent: oneOf(s.urgent, ['yes'] as const),
  }),
  head: () =>
    seo({
      title: 'Book an HVAC Service Appointment | ClimatePro',
      description:
        'Request an HVAC repair, maintenance, or heating appointment online. Choose a preferred date and time window — our team contacts you to confirm availability.',
      path: '/book-service',
      image: '/img/hvac-maintenance.jpg',
    }),
  component: BookServicePage,
})

function BookServicePage() {
  const { service, urgent } = Route.useSearch()
  const { contact } = useMarket()
  return (
    <>
      <PageHero
        eyebrow="Book a Service"
        title="Request a Service Appointment"
        description="Choose your service and preferred time. We review every request and contact you to confirm an appointment."
        crumbs={[{ label: 'Book a Service' }]}
      />
      <section className="bg-surface py-12 sm:py-16">
        <Container className="grid gap-8 lg:grid-cols-12">
          <div className="lg:col-span-8">
            <BookingForm initialService={service} urgent={urgent === 'yes'} />
          </div>
          <aside className="space-y-5 lg:col-span-4">
            <div className="rounded-2xl bg-navy p-6 text-white">
              <h2 className="text-lg font-bold text-white">Urgent issue?</h2>
              <p className="mt-2 text-sm text-slate-300">Call to discuss your situation and current availability.</p>
              <a href={`tel:${contact.phoneHref}`} className="mt-4 inline-flex items-center gap-2 text-2xl font-extrabold text-white hover:underline">
                <Phone className="size-5 text-brand" aria-hidden="true" /> {contact.phoneDisplay}
              </a>
              <ul className="mt-4 space-y-1 text-sm text-slate-300">
                {business.hours.map((h) => (
                  <li key={h.label} className="flex items-center gap-2">
                    <Clock className="size-3.5 text-brand" aria-hidden="true" /> {h.label}: {h.hours}
                  </li>
                ))}
              </ul>
            </div>
            <div className="rounded-2xl border bg-white p-6">
              <h2 className="text-lg font-bold">Planning a new system?</h2>
              <p className="mt-2 text-sm text-muted-foreground">Installation and replacement projects start with a free estimate.</p>
              <Link to="/get-a-quote" className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline">
                Request a Free Estimate <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </div>
          </aside>
        </Container>
      </section>
      <ProcessSteps tone="surface" title="What Happens After You Book" description="An appointment request is the first step — here is how it becomes a confirmed visit." />
    </>
  )
}
