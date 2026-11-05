import { Link } from '@tanstack/react-router'
import { AlertTriangle, Info, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/SectionHeading'
import { business } from '@/config/business'
import { useMarket } from '@/lib/market-context'

export function EmergencyCTA() {
  const { contact } = useMarket()
  return (
    <section className="py-16 sm:py-20">
      <Container>
        <div className="relative overflow-hidden rounded-3xl bg-navy-2 px-6 py-12 text-white sm:px-12 lg:flex lg:items-center lg:justify-between lg:gap-12">
          <div className="absolute inset-y-0 left-0 w-1.5 bg-emergency" aria-hidden="true" />
          <div className="max-w-2xl">
            <p className="inline-flex items-center gap-2 rounded-full bg-emergency/15 px-3 py-1 text-xs font-bold tracking-wider text-red-200 uppercase">
              <AlertTriangle className="size-3.5" aria-hidden="true" /> Urgent HVAC issue?
            </p>
            <h2 className="mt-4 text-3xl font-extrabold text-white sm:text-4xl">
              Having HVAC Problems? Let&rsquo;s Get Your Comfort Back.
            </h2>
            <p className="mt-4 text-lg text-slate-300">
              Need help with a heating or cooling issue? Contact our team to discuss your service requirements and
              available assistance.
            </p>
            <p className="mt-5 flex items-start gap-2 text-sm text-slate-300">
              <Info className="mt-0.5 size-4 shrink-0 text-brand" aria-hidden="true" />
              <span>
                {business.emergency.offered ? 'Emergency service is available — ' : ''}
                {business.emergency.note} Hours: {business.hoursShort}.
              </span>
            </p>
          </div>
          <div className="mt-8 flex shrink-0 flex-col gap-3 sm:flex-row lg:mt-0 lg:flex-col">
            <Button asChild size="xl" variant="emergency">
              <a href={`tel:${contact.phoneHref}`}>
                <Phone /> Call for Assistance
              </a>
            </Button>
            <Button asChild size="xl" variant="outline-light">
              <Link to="/book-service" search={{ urgent: 'yes' }}>Request a Service</Link>
            </Button>
          </div>
        </div>
      </Container>
    </section>
  )
}
