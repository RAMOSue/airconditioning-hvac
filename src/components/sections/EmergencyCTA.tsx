import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import { Container } from '@/components/shared/SectionHeading'
import { business } from '@/config/business'

export function EmergencyCTA() {
  return (
    <section className="bg-[#111318] py-6 text-center text-white sm:py-7">
      <Container className="flex flex-col items-center justify-between gap-4 sm:flex-row sm:text-left">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-blue-200 uppercase">
            When comfort is out of balance
          </p>
          <h2 className="mt-1 text-lg leading-snug font-extrabold text-white sm:text-xl">
            Find a clear next step for your heating or cooling.
          </h2>
        </div>
        <Link
          to={business.emergency.offered ? '/book-service' : '/get-a-quote'}
          className="inline-flex shrink-0 items-center gap-2 rounded-md bg-amber-400 px-5 py-3 text-sm font-extrabold text-navy transition-colors hover:bg-amber-300 focus-visible:outline-white"
        >
          Tell us what you need{' '}
          <ArrowRight className="size-4" aria-hidden="true" />
        </Link>
      </Container>
    </section>
  )
}
