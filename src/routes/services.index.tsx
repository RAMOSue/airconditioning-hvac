import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2 } from 'lucide-react'
import { services, serviceName } from '@/config/services'
import { PageHero } from '@/components/shared/PageHero'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { TrustIndicators } from '@/components/sections/TrustIndicators'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { useMarket } from '@/lib/market-context'
import { seo } from '@/lib/seo'
import { cdn } from '@/lib/img'

export const Route = createFileRoute('/services/')({
  head: () =>
    seo({
      title: 'HVAC & Air Conditioning Services | ClimatePro',
      description:
        'Air conditioning installation, HVAC repair, maintenance, heating, and commercial HVAC services for homes and businesses. Find the right service and request an estimate.',
      path: '/services',
      image: '/img/ac-installation.jpg',
    }),
  component: ServicesPage,
})

function ServicesPage() {
  const { code, market } = useMarket()
  return (
    <>
      <PageHero
        eyebrow="Our Services"
        title="Heating, Cooling & Air Conditioning Services"
        description={`From new ${market.terms.installation} to repairs, seasonal servicing, and commercial maintenance — explore how ClimatePro can help with your ${market.terms.heatingAndCooling}.`}
        crumbs={[{ label: 'Services' }]}
        image="/img/commercial-hvac.jpg"
      />
      <TrustIndicators />
      <section className="bg-surface py-20">
        <Container>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((s) => (
              <ServiceCard key={s.slug} service={s} headingLevel="h2" />
            ))}
          </div>
        </Container>
      </section>
      <section className="py-20">
        <Container className="space-y-16">
          <SectionHeading title="Find the Right Service" description="A quick overview of what each service covers." />
          {services.map((s, i) => (
            <div key={s.slug} className="grid items-center gap-10 lg:grid-cols-2">
              <img
                src={cdn(s.image, 720, 480)}
                width={720}
                height={480}
                alt={s.imageAlt}
                loading="lazy"
                decoding="async"
                className={`aspect-[3/2] w-full rounded-3xl object-cover ${i % 2 ? 'lg:order-2' : ''}`}
              />
              <div>
                <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-primary">
                  <s.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-2xl font-bold">{serviceName(s, code)}</h3>
                <p className="mt-3 leading-relaxed text-muted-foreground">{s.intro}</p>
                <ul className="mt-5 grid gap-2 sm:grid-cols-2">
                  {s.features.slice(0, 4).map((f) => (
                    <li key={f.title} className="flex items-center gap-2 text-sm font-medium text-navy">
                      <CheckCircle2 className="size-4 shrink-0 text-success" aria-hidden="true" /> {f.title}
                    </li>
                  ))}
                </ul>
                <Link to="/services/$slug" params={{ slug: s.slug }} className="mt-6 inline-flex items-center gap-1.5 font-bold text-primary hover:underline">
                  {s.cardCta} <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </div>
            </div>
          ))}
        </Container>
      </section>
      <FinalCTA />
    </>
  )
}
