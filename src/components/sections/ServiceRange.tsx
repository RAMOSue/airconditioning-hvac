import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { services, serviceName } from '@/config/services'
import { Container } from '@/components/shared/SectionHeading'
import { useMarket } from '@/lib/market-context'

export function ServiceRange() {
  const { code } = useMarket()
  return (
    <section
      className="border-y bg-white py-8 sm:py-10"
      aria-label="ClimatePro service options"
    >
      <Container>
        <div className="mb-5 flex flex-col gap-2 sm:flex-row sm:items-end sm:justify-between">
          <div>
            <p className="eyebrow">Explore your options</p>
            <h2 className="mt-1 text-xl font-extrabold sm:text-2xl">
              Solutions for different spaces.
            </h2>
          </div>
          <Link
            to="/services"
            className="inline-flex items-center gap-1 text-sm font-bold text-primary hover:underline"
          >
            View all services{' '}
            <ArrowRight className="size-4" aria-hidden="true" />
          </Link>
        </div>
        <ul className="grid grid-cols-2 gap-3 sm:grid-cols-3 lg:grid-cols-5">
          {services.map((service) => (
            <li key={service.slug}>
              <Link
                to="/services/$slug"
                params={{ slug: service.slug }}
                className="flex min-h-16 items-center gap-3 rounded-lg border bg-surface px-3 py-3 text-sm font-bold text-navy transition-colors hover:border-primary/40 hover:bg-brand-soft focus-visible:outline-primary"
              >
                <service.icon
                  className="size-5 shrink-0 text-primary"
                  aria-hidden="true"
                />
                <span>{serviceName(service, code)}</span>
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
