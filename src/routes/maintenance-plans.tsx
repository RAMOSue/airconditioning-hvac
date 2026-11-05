import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, CalendarClock, CheckCircle2, ClipboardList, Filter, Gauge } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { Faq } from '@/components/shared/Faq'
import { SampleBadge, SampleNotice } from '@/components/shared/SampleNotice'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { maintenancePlans, planDisclaimer } from '@/config/content'
import { formatCurrency } from '@/config/market'
import { useMarket } from '@/lib/market-context'
import { seo } from '@/lib/seo'
import { cn } from '@/lib/utils'

export const Route = createFileRoute('/maintenance-plans')({
  head: () =>
    seo({
      title: 'HVAC Maintenance Plans | ClimatePro',
      description:
        'Compare illustrative Basic, Premium, and Complete Care HVAC maintenance plans for homes and businesses, and enquire about scheduled servicing.',
      path: '/maintenance-plans',
      image: '/img/hvac-maintenance.jpg',
    }),
  component: MaintenancePlansPage,
})

const faqs = [
  { q: 'Are these plans actual offers?', a: 'No. On this sample website the plans are illustrative concepts. A business using this template sets its own inclusions, pricing, and terms.' },
  { q: 'Will a maintenance plan prevent breakdowns?', a: 'Regular maintenance can help identify potential issues early, but no plan can guarantee that equipment will not fail.' },
  { q: 'Can plans cover more than one system?', a: 'The Complete Care concept is designed for multiple systems or commercial sites. Enquire with details of your equipment.' },
  { q: 'How do I join a plan?', a: 'Send an enquiry using the button on any plan. Our team will discuss your systems and explain the available options.' },
]

const benefits = [
  { icon: Gauge, title: 'Performance checks', text: 'Regular reviews of how the system is operating.' },
  { icon: Filter, title: 'Filter guidance', text: 'Advice on filter type and replacement intervals.' },
  { icon: CalendarClock, title: 'Seasonal timing', text: 'Servicing before peak cooling and heating seasons.' },
  { icon: ClipboardList, title: 'Service records', text: 'A history of findings to support future decisions.' },
]

function MaintenancePlansPage() {
  const { code, market } = useMarket()
  return (
    <>
      <PageHero
        eyebrow="Maintenance Plans"
        title="HVAC Maintenance Plans"
        description="Scheduled servicing helps keep heating and cooling systems running reliably. Compare our illustrative plan options and enquire about the one that suits your property."
        crumbs={[{ label: 'Maintenance Plans' }]}
        image="/img/hvac-maintenance.jpg"
        imageAlt="Technician replacing an air filter in a residential air handler"
      />

      <section id="plans" className="bg-surface py-20">
        <Container>
          <SectionHeading title="Choose a Plan to Enquire About" description="All packages and figures can be customized by the business." />
          <SampleNotice className="mx-auto mt-6 max-w-3xl">{planDisclaimer}</SampleNotice>
          <ul className="mt-12 grid gap-6 lg:grid-cols-3">
            {maintenancePlans.map((p) => {
              const price = p.illustrativePrice[code]
              return (
                <li
                  key={p.id}
                  className={cn(
                    'relative flex flex-col rounded-3xl border bg-white p-8',
                    p.highlighted && 'border-2 border-primary shadow-xl shadow-primary/10 lg:-translate-y-3',
                  )}
                >
                  {p.highlighted && (
                    <span className="absolute -top-3.5 left-8 rounded-full bg-primary px-3 py-1 text-xs font-bold text-white">Most popular concept</span>
                  )}
                  <div className="flex items-center justify-between gap-2">
                    <h2 className="text-2xl font-extrabold">{p.name}</h2>
                    <SampleBadge>Illustrative</SampleBadge>
                  </div>
                  <p className="mt-1 text-sm font-semibold text-primary">{p.bestFor}</p>
                  <p className="mt-3 text-muted-foreground">{p.summary}</p>
                  <p className="mt-6">
                    {price !== null ? (
                      <>
                        <span className="text-4xl font-extrabold text-navy">{formatCurrency(price, market)}</span>
                        <span className="text-muted-foreground"> /month {market.currency}</span>
                        <span className="block text-xs text-muted-foreground">Example figure only — not an offer</span>
                      </>
                    ) : (
                      <span className="text-2xl font-extrabold text-navy">Pricing on enquiry</span>
                    )}
                  </p>
                  <ul className="mt-6 flex-1 space-y-3">
                    {p.features.map((f) => (
                      <li key={f} className="flex items-start gap-2.5 text-navy">
                        <CheckCircle2 className="mt-0.5 size-5 shrink-0 text-success" aria-hidden="true" /> {f}
                      </li>
                    ))}
                  </ul>
                  <Button asChild size="xl" variant={p.highlighted ? 'default' : 'outline'} className="mt-8 w-full whitespace-normal">
                    <Link to="/contact" search={{ topic: 'maintenance-plan', plan: p.name }}>
                      Enquire About a Maintenance Plan
                    </Link>
                  </Button>
                </li>
              )
            })}
          </ul>
        </Container>
      </section>

      <section className="py-20">
        <Container>
          <SectionHeading eyebrow="Why Maintain" title="What Regular Maintenance Involves" description="Regular HVAC maintenance can help identify potential issues and keep your heating and cooling system operating efficiently." />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-4">
            {benefits.map((b) => (
              <li key={b.title} className="rounded-2xl border bg-white p-6">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-primary"><b.icon className="size-5" aria-hidden="true" /></span>
                <h3 className="mt-4 text-lg font-bold">{b.title}</h3>
                <p className="mt-1.5 text-muted-foreground">{b.text}</p>
              </li>
            ))}
          </ul>
          <p className="mt-8 text-center">
            <Link to="/services/$slug" params={{ slug: 'hvac-maintenance' }} className="inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
              Learn about one-off maintenance visits <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </p>
        </Container>
      </section>

      <section className="bg-surface py-20">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Maintenance Plan Questions" />
          <div className="mt-10"><Faq items={faqs} /></div>
        </Container>
      </section>
      <FinalCTA />
    </>
  )
}
