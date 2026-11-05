import { createFileRoute, Link, notFound } from '@tanstack/react-router'
import { AlertCircle, ArrowRight, CheckCircle2, Clock, Mail, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { getService, serviceName, type ServiceSlug } from '@/config/services'
import { business } from '@/config/business'
import { PageHero } from '@/components/shared/PageHero'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { Faq } from '@/components/shared/Faq'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { ServiceCard } from '@/components/sections/ServiceCard'
import { InstallEstimator } from '@/components/forms/InstallEstimator'
import { useMarket } from '@/lib/market-context'
import { cdn } from '@/lib/img'
import { seo } from '@/lib/seo'

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

/** Quote-form service value; booking uses the same slugs. */
function quoteSearch(slug: ServiceSlug) {
  return { service: slug }
}

function ServiceDetailPage() {
  const { slug } = Route.useLoaderData()
  const service = getService(slug)!
  const { code, contact } = useMarket()
  const name = serviceName(service, code)
  const isInstall = service.slug === 'air-conditioning-installation'
  const related = service.related.map((r) => getService(r)!).filter(Boolean)
  const marketNote = service.marketNote?.[code]
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
      <PageHero
        eyebrow={name}
        title={service.headline}
        description={service.intro}
        crumbs={[{ label: 'Services', to: '/services' }, { label: name }]}
        image={service.image}
        imageAlt={service.imageAlt}
      >
        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Button asChild size="xl">
            <Link to="/get-a-quote" search={quoteSearch(service.slug)}>
              {service.ctaLabel} <ArrowRight />
            </Link>
          </Button>
          <Button asChild size="xl" variant="outline-light">
            <a href={`tel:${contact.phoneHref}`}>
              <Phone /> {contact.phoneDisplay}
            </a>
          </Button>
        </div>
      </PageHero>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(serviceJsonLd) }} />

      {/* Overview */}
      <section className="py-20">
        <Container className="grid gap-12 lg:grid-cols-12">
          <div className="lg:col-span-7">
            <p className="eyebrow">About this service</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">How {name.toLowerCase()} works with ClimatePro</h2>
            <div className="mt-6 max-w-reading space-y-5 text-lg leading-relaxed text-muted-foreground">
              {service.overview.map((p) => (
                <p key={p.slice(0, 24)}>{p}</p>
              ))}
              {marketNote && (
                <p className="rounded-xl border-l-4 border-brand bg-brand-soft/60 p-4 text-base text-navy">{marketNote}</p>
              )}
            </div>
          </div>
          <aside className="lg:col-span-5">
            <div className="sticky top-28 rounded-3xl border bg-surface p-6 sm:p-8">
              <h2 className="text-xl font-bold">Talk to our team</h2>
              <p className="mt-2 text-muted-foreground">{service.ctaText}</p>
              <ul className="mt-6 space-y-3 text-sm">
                <li>
                  <a href={`tel:${contact.phoneHref}`} className="inline-flex items-center gap-2 font-semibold text-navy hover:text-primary">
                    <Phone className="size-4 text-primary" aria-hidden="true" /> {contact.phoneDisplay}
                  </a>
                </li>
                <li>
                  <a href={`mailto:${contact.email}`} className="inline-flex items-center gap-2 font-semibold text-navy hover:text-primary">
                    <Mail className="size-4 text-primary" aria-hidden="true" /> {contact.email}
                  </a>
                </li>
                <li className="flex items-start gap-2 text-muted-foreground">
                  <Clock className="mt-0.5 size-4 text-primary" aria-hidden="true" /> {business.hoursShort}
                </li>
              </ul>
              <div className="mt-6 grid gap-3">
                <Button asChild size="lg">
                  <Link to="/get-a-quote" search={quoteSearch(service.slug)}>Request a Free Estimate</Link>
                </Button>
                <Button asChild size="lg" variant="outline">
                  <Link to="/book-service" search={{ service: service.slug }}>Book a Service</Link>
                </Button>
              </div>
            </div>
          </aside>
        </Container>
      </section>

      {/* Estimator on the installation page */}
      {isInstall && (
        <section id="estimate-assistant" className="bg-surface py-20">
          <Container>
            <SectionHeading
              eyebrow="Installation Estimate Assistant"
              title="Get an Indicative Installation Recommendation"
              description="Answer a few questions about your property for a general starting point. Our team then reviews your requirements and prepares a personalized estimate."
            />
            <div className="mt-12">
              <InstallEstimator />
            </div>
          </Container>
        </section>
      )}

      {/* Problems */}
      <section className={isInstall ? 'py-20' : 'bg-surface py-20'}>
        <Container>
          <SectionHeading eyebrow="Common Issues" title={service.problemsHeading} />
          <ul className="mt-12 grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {service.problems.map((p) => (
              <li key={p.title} className="flex gap-4 rounded-2xl border bg-white p-6">
                <AlertCircle className="mt-0.5 size-6 shrink-0 text-primary" aria-hidden="true" />
                <div>
                  <h3 className="font-bold">{p.title}</h3>
                  <p className="mt-1 text-muted-foreground">{p.text}</p>
                </div>
              </li>
            ))}
          </ul>
        </Container>
      </section>

      {/* Features */}
      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <SectionHeading align="left" eyebrow="What's Included" title="Benefits and service features" />
            <ul className="mt-8 grid gap-5 sm:grid-cols-2">
              {service.features.map((f) => (
                <li key={f.title}>
                  <h3 className="flex items-center gap-2 font-bold">
                    <CheckCircle2 className="size-5 text-success" aria-hidden="true" /> {f.title}
                  </h3>
                  <p className="mt-1 pl-7 text-sm leading-relaxed text-muted-foreground">{f.text}</p>
                </li>
              ))}
            </ul>
          </div>
          <img
            src={cdn(service.image, 760, 620)}
            width={760}
            height={620}
            loading="lazy"
            decoding="async"
            alt={service.imageAlt}
            className="aspect-[38/31] w-full rounded-3xl object-cover"
          />
        </Container>
      </section>

      <ProcessSteps
        steps={service.process}
        title={`Our ${name} Process`}
        description="A clear sequence from first enquiry to completed work."
      />

      {/* FAQ */}
      <section className="py-20">
        <Container className="max-w-4xl">
          <SectionHeading eyebrow="FAQ" title="Frequently Asked Questions" />
          <div className="mt-10">
            <Faq items={service.faqs} />
          </div>
        </Container>
      </section>

      {/* Related */}
      <section className="bg-surface py-20">
        <Container>
          <SectionHeading eyebrow="Related Services" title="You May Also Need" />
          <div className="mt-12 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {related.map((r) => (
              <ServiceCard key={r.slug} service={r} />
            ))}
          </div>
        </Container>
      </section>

      {/* CTA */}
      <section className="py-16 sm:py-20">
        <Container>
          <div className="rounded-3xl bg-navy px-6 py-14 text-center sm:px-12">
            <h2 className="mx-auto max-w-2xl text-3xl font-extrabold text-white sm:text-4xl">{service.ctaLabel}</h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-slate-300">{service.ctaText}</p>
            <div className="mt-8 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild size="xl">
                <Link to="/get-a-quote" search={quoteSearch(service.slug)}>
                  {service.ctaLabel} <ArrowRight />
                </Link>
              </Button>
              <Button asChild size="xl" variant="outline-light">
                <a href={`tel:${contact.phoneHref}`}>
                  <Phone /> Call {contact.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        </Container>
      </section>
    </>
  )
}
