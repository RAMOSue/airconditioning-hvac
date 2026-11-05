import { Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, Phone, Snowflake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/SectionHeading'
import { cdn, cdnSrcSet } from '@/lib/img'
import { useMarket } from '@/lib/market-context'

export function Hero() {
  const { contact } = useMarket()
  return (
    <section className="relative overflow-hidden bg-gradient-to-b from-brand-soft/70 to-white">
      <Container className="grid items-center gap-12 py-14 sm:py-20 lg:grid-cols-2 lg:gap-16 lg:py-24">
        <div>
          <p className="eyebrow">Professional HVAC Services</p>
          <h1 className="mt-4 text-4xl leading-[1.08] font-extrabold sm:text-5xl xl:text-6xl">
            Reliable Heating &amp; Cooling. <span className="text-primary">Comfort in Every Season.</span>
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-relaxed text-muted-foreground">
            From air conditioning installation to emergency HVAC repairs, ClimatePro helps homeowners and businesses
            maintain comfortable indoor environments with dependable heating and cooling solutions.
          </p>
          <div className="mt-8 flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link to="/get-a-quote">
                Get a Free Estimate <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <Link to="/services">Explore Our Services</Link>
            </Button>
          </div>
          <div className="mt-8 flex flex-col gap-4 border-t pt-6 sm:flex-row sm:items-center sm:gap-8">
            <a href={`tel:${contact.phoneHref}`} className="group inline-flex items-center gap-3 rounded-md">
              <span className="grid size-11 place-items-center rounded-full bg-navy text-white group-hover:bg-primary">
                <Phone className="size-5" aria-hidden="true" />
              </span>
              <span className="leading-tight">
                <span className="block text-xs font-medium text-muted-foreground">Speak with our team</span>
                <span className="text-lg font-bold text-navy">{contact.phoneDisplay}</span>
              </span>
            </a>
            <ul className="space-y-1.5 text-sm font-medium text-navy">
              <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" aria-hidden="true" /> Residential &amp; commercial properties</li>
              <li className="flex items-center gap-2"><CheckCircle2 className="size-4 text-success" aria-hidden="true" /> Clear estimates before any work begins</li>
            </ul>
          </div>
        </div>

        <div className="relative">
          <div className="overflow-hidden rounded-3xl shadow-2xl shadow-navy/15">
            <img
              src={cdn('/img/hero-technician.jpg', 900, 700)}
              srcSet={cdnSrcSet('/img/hero-technician.jpg', [480, 720, 900, 1200], 900 / 700)}
              sizes="(min-width: 1024px) 50vw, 100vw"
              width={900}
              height={700}
              alt="HVAC technician checking refrigerant gauges on an outdoor air conditioning condenser beside a modern home"
              className="aspect-[9/7] w-full object-cover"
              fetchPriority="high"
            />
          </div>
          <div className="absolute -bottom-6 left-4 flex items-center gap-3 rounded-2xl border bg-white p-4 shadow-xl shadow-navy/10 sm:left-[-1.5rem]">
            <span className="grid size-12 place-items-center rounded-xl bg-primary text-white">
              <Snowflake className="size-6" aria-hidden="true" />
            </span>
            <span>
              <span className="block font-bold text-navy">Professional HVAC Solutions</span>
              <span className="block text-sm text-muted-foreground">Installation • Repair • Maintenance</span>
            </span>
          </div>
        </div>
      </Container>
    </section>
  )
}
