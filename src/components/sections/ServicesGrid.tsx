import { Link } from '@tanstack/react-router'
import { ArrowRight, MessageCircleQuestion } from 'lucide-react'
import { services, serviceName } from '@/config/services'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { useMarket } from '@/lib/market-context'

export function ServicesGrid() {
  const { code } = useMarket()
  return (
    <section id="services" className="bg-surface py-14 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title="Find the help that fits your situation."
          description="From a system that needs attention to a space you are planning to upgrade, explore the service that best matches what is happening."
        />
        <ul className="mt-9 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="group flex h-full min-h-56 flex-col items-center rounded-xl border bg-white px-5 py-6 text-center transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-lg hover:shadow-navy/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0"
              >
                <span className="grid size-12 place-items-center rounded-xl bg-brand-soft text-primary transition-colors group-hover:bg-primary group-hover:text-white">
                  <service.icon className="size-6" aria-hidden="true" />
                </span>
                <h3 className="mt-3 text-base font-bold text-navy">
                  {serviceName(service, code)}
                </h3>
                <p className="mt-2 flex-1 text-sm leading-relaxed text-muted-foreground">
                  {service.cardDescription}
                </p>
                <span className="mt-4 inline-flex items-center gap-1 text-sm font-bold text-primary">
                  {service.cardCta}
                  <ArrowRight
                    className="size-4 transition-transform group-hover:translate-x-1"
                    aria-hidden="true"
                  />
                </span>
              </Link>
            </li>
          ))}
          <li>
            <Link
              to="/get-a-quote"
              className="group flex h-full min-h-56 flex-col items-center justify-center rounded-xl bg-navy p-6 text-center text-white transition-colors hover:bg-navy-2"
            >
              <MessageCircleQuestion
                className="size-10 text-brand"
                aria-hidden="true"
              />
              <h3 className="mt-4 text-lg font-bold text-white">
                Not sure where to start?
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Tell us what is happening and ask about your options.
              </p>
              <span className="mt-4 inline-flex items-center gap-1.5 text-sm font-bold text-white">
                Ask a question
                <ArrowRight
                  className="size-4 transition-transform group-hover:translate-x-1"
                  aria-hidden="true"
                />
              </span>
            </Link>
          </li>
        </ul>
      </Container>
    </section>
  )
}
