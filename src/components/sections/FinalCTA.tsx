import { Link } from '@tanstack/react-router'
import { ArrowRight, CalendarDays, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/SectionHeading'
import { useMarket } from '@/lib/market-context'
import { cdn } from '@/lib/img'

export function FinalCTA({
  title = 'Let’s Make Your Space More Comfortable.',
  description = 'Whether you’re planning a new installation or need help with your existing HVAC system, we’re ready to hear from you.',
  visual = false,
}: {
  title?: string
  description?: string
  visual?: boolean
}) {
  const { contact } = useMarket()
  return (
    <section className="py-12 sm:py-16">
      <Container>
        <div
          className={
            visual
              ? 'relative isolate overflow-hidden rounded-2xl bg-navy px-6 py-12 text-center text-white sm:px-12 sm:py-16'
              : 'rounded-3xl bg-primary px-6 py-14 text-center text-white sm:px-12'
          }
        >
          {visual && (
            <>
              <img
                src={cdn('/img/hero-technician.jpg', 1600, 700)}
                alt=""
                aria-hidden="true"
                loading="lazy"
                decoding="async"
                className="absolute inset-0 size-full object-cover"
              />
              <span
                className="absolute inset-0 bg-gradient-to-r from-navy/90 via-navy/75 to-navy/35"
                aria-hidden="true"
              />
            </>
          )}
          <div className="relative">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">
              {title}
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-blue-50">
              {description}
            </p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="xl" variant="light">
                <Link to="/get-a-quote">
                  Request a Free Estimate <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline-light">
                <Link to="/book-service">
                  <CalendarDays /> Book a Service
                </Link>
              </Button>
            </div>
            <p className="mt-6 text-sm text-blue-50">
              Prefer to talk?{' '}
              <a
                href={`tel:${contact.phoneHref}`}
                className="inline-flex items-center gap-1 font-bold text-white underline-offset-2 hover:underline"
              >
                <Phone className="size-3.5" aria-hidden="true" />{' '}
                {contact.phoneDisplay}
              </a>
            </p>
          </div>
        </div>
      </Container>
    </section>
  )
}
