import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { ArrowRight, Check, ChevronDown, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { InstallEstimator } from '@/components/forms/InstallEstimator'
import { Container } from '@/components/shared/SectionHeading'
import { Faq } from '@/components/shared/Faq'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { getService, serviceName, type ServiceSlug } from '@/config/services'
import { business } from '@/config/business'
import { useMarket } from '@/lib/market-context'
import { cdn, cdnSrcSet } from '@/lib/img'
import { seo } from '@/lib/seo'

const serviceStories: Record<ServiceSlug, { headline: string; promise: string }> = {
  'air-conditioning-installation': {
    headline: 'A cooler, calmer home starts with the right installation.',
    promise:
      'A system that suits your rooms, routines and home — thoughtfully planned, carefully installed and ready for everyday comfort.',
  },
  'hvac-repair': {
    headline: 'Get your heating or cooling back on track.',
    promise:
      'A clear diagnosis, plain-language options and repairs approved by you before work begins.',
  },
  'hvac-maintenance': {
    headline: 'A little care now. More confidence when you need it.',
    promise:
      'Seasonal attention for the system you rely on, with clear notes on its condition and any next steps.',
  },
  heating: {
    headline: 'Bring dependable warmth back to your space.',
    promise:
      'From an unexpected heating problem to planning an upgrade, get clear advice for the comfort you rely on.',
  },
  'commercial-hvac': {
    headline: 'Comfort that keeps your business moving.',
    promise:
      'Practical HVAC support shaped around your building, operating hours and the people who use the space.',
  },
}

export const Route = createFileRoute('/services/$slug')({
  loader: ({ params }) => {
    const service = getService(params.slug)
    if (!service) throw notFound()
    return { slug: service.slug }
  },
  head: ({ params }) => {
    const service = getService(params.slug)
    if (!service) return {}
    return seo({ ...service.seo, path: `/services/${service.slug}`, image: service.image })
  },
  component: ServiceDetailPage,
})

function quoteSearch(slug: ServiceSlug) {
  return { service: slug }
}

function AirflowDetail() {
  return (
    <div
      className="absolute right-4 top-4 grid size-20 place-items-center rounded-full border border-white/60 bg-white/90 shadow-xl backdrop-blur sm:right-6 sm:top-6 sm:size-24"
      aria-hidden="true"
    >
      <div className="absolute inset-2 rounded-full border border-brand/20" />
      <svg viewBox="0 0 64 64" className="size-14 text-primary sm:size-16">
        <circle cx="32" cy="32" r="27" fill="#e8f1ff" />
        <g className="origin-center motion-safe:animate-spin motion-reduce:animate-none [animation-duration:8s]">
          <path d="M32 29C27 20 29 10 34 8c5 7 6 14 2 22l-4 2Z" fill="currentColor" />
          <path d="M35 32c9-5 19-3 21 2-7 5-14 6-22 2l-2-4Z" fill="currentColor" />
          <path d="M32 35c5 9 3 19-2 21-5-7-6-14-2-22l4-2Z" fill="currentColor" />
          <path d="M29 32c-9 5-19 3-21-2 7-5 14-6 22-2l2 4Z" fill="currentColor" />
        </g>
        <circle cx="32" cy="32" r="4" fill="#101d35" />
      </svg>
    </div>
  )
}

function ServiceDetailPage() {
  const { slug } = Route.useLoaderData()
  const service = getService(slug)!
  const { code, contact } = useMarket()
  const name = serviceName(service, code)
  const story = serviceStories[service.slug]
  const related = service.related.map((relatedSlug) => getService(relatedSlug)!).filter(Boolean)
  const isInstall = service.slug === 'air-conditioning-installation'
  const serviceJsonLd = {
    '@context': 'https://schema.org',
    '@type': 'Service',
    name,
    description: service.seo.description,
    serviceType: name,
    provider: { '@type': 'HVACBusiness', name: business.name, url: business.siteUrl },
    url: `${business.siteUrl}/services/${service.slug}`,
  }

  return (
    <>
      <section className="overflow-hidden bg-surface">
        <Container className="grid items-center gap-10 py-8 sm:py-12 lg:grid-cols-[0.92fr_1.08fr] lg:gap-14 lg:py-16">
          <div className="order-2 lg:order-1">
            <nav aria-label="Breadcrumb" className="mb-7 text-sm font-medium text-muted-foreground">
              <Link to="/" className="transition-colors hover:text-primary">Home</Link>
              <span className="px-2 text-slate-400" aria-hidden="true">/</span>
              <Link to="/services" className="transition-colors hover:text-primary">Services</Link>
              <span className="px-2 text-slate-400" aria-hidden="true">/</span>
              <span aria-current="page" className="text-navy">{name}</span>
            </nav>
            <p className="eyebrow mb-3">{name}</p>
            <h1 className="max-w-2xl text-4xl leading-[1.08] font-extrabold text-navy sm:text-5xl">{story.headline}</h1>
            <p className="mt-5 max-w-xl text-base leading-relaxed text-muted-foreground sm:text-lg">{service.intro}</p>
            <div className="mt-7 flex flex-col gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link to="/get-a-quote" search={quoteSearch(service.slug)}>
                  {service.ctaLabel} <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline">
                <a href={`tel:${contact.phoneHref}`}>
                  <Phone /> {contact.phoneDisplay}
                </a>
              </Button>
            </div>
            <div className="mt-6 flex items-start gap-2 text-sm text-muted-foreground">
              <Check className="mt-0.5 size-4 shrink-0 text-success" aria-hidden="true" />
              <p>{story.promise}</p>
            </div>
          </div>

          <div className="relative order-1 min-w-0 lg:order-2">
            <div className="absolute -inset-3 rounded-[2rem] bg-brand/10 sm:-inset-4" aria-hidden="true" />
            <div className="relative overflow-hidden rounded-3xl bg-navy shadow-2xl shadow-navy/15">
              <img
                src={cdn(service.image, 1100, 850)}
                srcSet={cdnSrcSet(service.image, [640, 900, 1200], 1.3)}
                sizes="(min-width: 1024px) 52vw, 100vw"
                width={1100}
                height={850}
                alt={service.imageAlt}
                fetchPriority="high"
                className="aspect-[1.22/1] w-full object-cover sm:aspect-[1.45/1] lg:aspect-[1.12/1]"
              />
              {isInstall && <AirflowDetail />}
              <div className="absolute inset-x-0 bottom-0 bg-gradient-to-t from-navy/90 via-navy/35 to-transparent px-5 pb-5 pt-14 sm:px-7 sm:pb-7">
                <p className="text-sm font-bold text-white sm:text-base">{story.promise}</p>
              </div>
            </div>
          </div>
        </Container>
      </section>

      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      <section className="py-12 sm:py-16">
        <Container>
          <div className="mb-7 flex flex-col justify-between gap-3 sm:flex-row sm:items-end">
            <div>
              <p className="eyebrow mb-2">A better experience, from the start</p>
              <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">The details that make it easier.</h2>
            </div>
            <p className="max-w-md text-sm leading-relaxed text-muted-foreground">
              The right help should feel straightforward. Here’s what you can expect with {name.toLowerCase()}.
            </p>
          </div>
          <ul className="grid gap-4 md:grid-cols-3">
            {service.features.slice(0, 3).map((feature, index) => (
              <li key={feature.title} className="rounded-2xl border border-border/80 bg-white p-5 shadow-sm sm:p-6">
                <span className="grid size-10 place-items-center rounded-xl bg-brand-soft text-primary">
                  <service.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 font-bold text-navy">{feature.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-muted-foreground">
                  {index === 0 ? story.promise : feature.text}
                </p>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {isInstall && (
        <section id="estimate-assistant" className="bg-surface py-10 sm:py-14">
          <Container>
            <details className="group rounded-2xl border border-border/80 bg-white shadow-sm">
              <summary className="flex cursor-pointer list-none items-center justify-between gap-4 p-5 marker:content-none sm:p-6">
                <span>
                  <span className="block text-lg font-bold text-navy">Still deciding what might suit your home?</span>
                  <span className="mt-1 block text-sm text-muted-foreground">Open the optional system planner for a starting point.</span>
                </span>
                <ChevronDown className="size-5 shrink-0 text-primary transition-transform group-open:rotate-180 motion-reduce:transition-none" aria-hidden="true" />
              </summary>
              <div className="border-t border-border/80 p-4 sm:p-6">
                <InstallEstimator />
              </div>
            </details>
          </Container>
        </section>
      )}

      <section className="bg-navy py-12 sm:py-16">
        <Container>
          <div className="max-w-2xl">
            <p className="eyebrow mb-2 text-brand">A clear next step</p>
            <h2 className="text-2xl font-extrabold text-white sm:text-3xl">From first conversation to feeling comfortable.</h2>
          </div>
          <ol className="mt-8 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
            {service.process.map((step, index) => (
              <li key={step.title} className="rounded-2xl border border-white/10 bg-white/5 p-5">
                <span className="text-sm font-extrabold text-brand">0{index + 1}</span>
                <h3 className="mt-3 font-bold text-white">{step.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-300">{step.text}</p>
              </li>
            ))}
          </ol>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container className="grid gap-10 lg:grid-cols-[0.7fr_1.3fr] lg:gap-16">
          <div>
            <p className="eyebrow mb-2">Good to know</p>
            <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">A few common questions.</h2>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">
              Have a question about your space or system? We’re happy to help you work out what to do next.
            </p>
          </div>
          <Faq items={service.faqs.slice(0, 4)} />
        </Container>
      </section>

      <section className="bg-surface py-12 sm:py-16">
        <Container>
          <div className="mb-7 flex items-end justify-between gap-4">
            <div>
              <p className="eyebrow mb-2">More ways we can help</p>
              <h2 className="text-2xl font-extrabold text-navy sm:text-3xl">Explore related services.</h2>
            </div>
            <Link to="/services" className="hidden items-center gap-1 text-sm font-bold text-primary hover:underline sm:inline-flex">
              All services <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
          <div className="grid gap-5 md:grid-cols-3">
            {related.map((relatedService) => <ServiceCard key={relatedService.slug} service={relatedService} />)}
          </div>
        </Container>
      </section>

      <section className="py-12 sm:py-16">
        <Container>
          <div className="relative overflow-hidden rounded-3xl bg-navy px-6 py-10 text-center sm:px-12 sm:py-14">
            <div className="absolute -right-10 -top-20 size-64 rounded-full border border-white/10" aria-hidden="true" />
            <div className="absolute -right-2 -top-12 size-48 rounded-full border border-white/10" aria-hidden="true" />
            <div className="relative mx-auto max-w-2xl">
              <p className="eyebrow mb-2 text-brand">Let’s make a plan</p>
              <h2 className="text-3xl font-extrabold text-white sm:text-4xl">{service.ctaLabel}</h2>
              <p className="mx-auto mt-3 max-w-xl text-base leading-relaxed text-slate-300">{service.ctaText}</p>
              <div className="mt-7 flex flex-col justify-center gap-3 sm:flex-row">
                <Button asChild size="xl">
                  <Link to="/get-a-quote" search={quoteSearch(service.slug)}>
                    Request an estimate <ArrowRight />
                  </Link>
                </Button>
                <Button asChild size="xl" variant="outline-light">
                  <Link to="/book-service" search={{ service: service.slug }}>Book a service</Link>
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
