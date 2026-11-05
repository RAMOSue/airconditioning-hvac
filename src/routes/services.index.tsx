import { createFileRoute, Link } from '@tanstack/react-router'
import { ArrowRight, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Container } from '@/components/shared/SectionHeading'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { services } from '@/config/services'
import { useMarket } from '@/lib/market-context'
import { cdn, cdnSrcSet } from '@/lib/img'
import { seo } from '@/lib/seo'

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
  const { contact } = useMarket()
  return (
    <>
      <section className="overflow-hidden bg-surface">
        <Container className="grid items-center gap-10 py-8 sm:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-16">
          <div className="order-2 lg:order-1">
            <nav aria-label="Breadcrumb" className="mb-7 text-sm font-medium text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-primary">Home</Link>
              <span className="px-2 text-slate-400" aria-hidden="true">/</span>
              <span aria-current="page" className="text-navy">Services</span>
            </nav>
            <p className="eyebrow mb-3">Comfort, made more straightforward</p>
            <h1 className="max-w-2xl text-4xl leading-[1.08] font-extrabold text-navy sm:text-5xl">
              The right help for the way you live and work.
            </h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">
              From a new system at home to a repair at work, find a clear next step for your heating and cooling.
            </p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link to="/services/$slug" params={{ slug: 'air-conditioning-installation' }}>
                  Explore installation <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <a href={`tel:${contact.phoneHref}`}>
                  <Phone /> {contact.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
          <div className="relative order-1 min-w-0 lg:order-2">
            <div className="absolute -inset-3 rounded-[2rem] bg-brand/10 sm:-inset-4" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl bg-navy shadow-2xl shadow-navy/15">
              <img
                src={cdn('/img/project-residential.jpg', 1100, 850)}
                srcSet={cdnSrcSet('/img/project-residential.jpg', [640, 900, 1200], 1.3)}
                sizes="(min-width: 1024px) 52vw, 100vw"
                width={1100}
                height={850}
                alt="Air conditioning installation in a comfortable residential interior"
                fetchPriority="high"
                className="aspect-[1.22/1] w-full object-cover sm:aspect-[1.45/1] lg:aspect-[1.12/1]"
              />
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent px-5 pb-5 pt-14 sm:px-7 sm:pb-7">
                <p className="text-sm font-bold text-white sm:text-base">A comfortable space starts with a solution that fits.</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-2">Explore our services</p>
              <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Choose what you need help with.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              Not sure where to start? Pick the closest match and we’ll help you work out the next step.
            </p>
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {services.map((service) => <ServiceCard key={service.slug} service={service} headingLevel="h2" />)}
          </div>
        </Container>
      </section>

      <section className="pb-12 sm:pb-16">
        <Container>
          <div className="flex flex-col items-start justify-between gap-5 rounded-3xl bg-navy px-6 py-8 sm:flex-row sm:items-center sm:px-10 sm:py-10">
            <div className="max-w-2xl">
              <p className="eyebrow mb-2 text-brand">A real person can help</p>
              <h2 className="text-2xl font-extrabold text-white sm:text-3xl">Tell us what’s happening in your space.</h2>
              <p className="mt-2 text-sm leading-relaxed text-slate-300">
                Share a few details and our team can help you find the right service.
              </p>
            </div>
            <Button asChild size="xl" variant="light" className="shrink-0">
              <Link to="/get-a-quote">
                Request an estimate <ArrowRight />
              </Link>
            </Button>
          </div>
        </Container>
      </section>
    </>
  )
}
