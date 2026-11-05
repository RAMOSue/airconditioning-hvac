import { Link } from '@tanstack/react-router'
import { ArrowRight, CheckCircle2, Snowflake } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/SectionHeading'
import { cdn, cdnSrcSet } from '@/lib/img'
import { useMarket } from '@/lib/market-context'

export function Hero() {
  const { contact } = useMarket()
  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#18c5df] via-[#08b5dc] to-[#168cce] text-white">
      <Container className="grid items-center gap-8 py-8 sm:py-10 lg:min-h-[24rem] lg:grid-cols-[1.05fr_0.95fr] lg:gap-10 lg:py-10">
        <div className="relative order-2 lg:order-1">
          <div className="relative overflow-hidden rounded-2xl bg-navy/10">
            <img
              src={cdn('/img/hero-technician.jpg', 1000, 620)}
              srcSet={cdnSrcSet(
                '/img/hero-technician.jpg',
                [480, 720, 1000, 1200],
                1000 / 620,
              )}
              sizes="(min-width: 1024px) 54vw, 100vw"
              width={1000}
              height={620}
              alt="HVAC technician checking an outdoor air conditioning unit beside a home"
              className="aspect-[16/10] w-full object-cover"
              fetchPriority="high"
            />
          </div>
          <div className="absolute right-3 bottom-3 flex items-center gap-2 rounded-lg bg-white px-3 py-2 text-sm font-bold text-navy shadow-lg sm:right-5 sm:bottom-5">
            <Snowflake className="size-5 text-primary" aria-hidden="true" />
            Installation · Repair · Maintenance
          </div>
        </div>

        <div className="order-1 text-center lg:order-2">
          <p className="text-xs font-bold tracking-[0.16em] text-white/85 uppercase">
            ClimatePro · Heating &amp; cooling
          </p>
          <h1 className="mx-auto mt-3 max-w-xl text-3xl leading-tight font-extrabold text-white sm:text-4xl xl:text-[2.8rem]">
            Comfort starts with a clear next step.
          </h1>
          <p className="mx-auto mt-3 max-w-lg text-base leading-relaxed text-white/90 sm:text-lg">
            When your air con struggles, a room feels wrong, or you are planning
            an upgrade, get help understanding what your space needs.
          </p>
          <a
            href={`tel:${contact.phoneHref}`}
            className="mt-4 inline-block text-3xl font-extrabold tracking-tight text-white hover:underline sm:text-4xl"
          >
            {contact.phoneDisplay}
          </a>
          <div className="mt-5 flex flex-col justify-center gap-3 sm:flex-row">
            <Button
              asChild
              size="lg"
              className="bg-navy text-white hover:bg-navy/90"
            >
              <Link to="/get-a-quote">
                Request a Free Estimate <ArrowRight />
              </Link>
            </Button>
            <Button asChild size="lg" variant="outline-light">
              <Link to="/book-service">Book a Service</Link>
            </Button>
          </div>
          <div className="mt-4 flex items-center justify-center gap-2 text-sm font-medium text-white/90">
            <CheckCircle2 className="size-4" aria-hidden="true" />
            Residential and commercial service enquiries
          </div>
        </div>
      </Container>
    </section>
  )
}
