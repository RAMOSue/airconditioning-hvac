import { createFileRoute } from '@tanstack/react-router'
import { PageHero } from '@/components/shared/PageHero'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { SampleNotice } from '@/components/shared/SampleNotice'
import { WhyChoose } from '@/components/sections/WhyChoose'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { companyValues } from '@/config/content'
import { business } from '@/config/business'
import { useMarket } from '@/lib/market-context'
import { cdn, cdnSrcSet } from '@/lib/img'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/about')({
  head: () =>
    seo({
      title: 'About ClimatePro | Heating & Cooling Specialists',
      description: 'Learn how ClimatePro approaches HVAC service: clear communication, right-sized recommendations, and a focus on preventive maintenance for homes and businesses.',
      path: '/about',
      image: '/img/about-team.jpg',
    }),
  component: AboutPage,
})

function AboutPage() {
  const { contact, market } = useMarket()
  return (
    <>
      <PageHero
        eyebrow="About Us"
        title="Heating and Cooling Service Built on Clear Communication"
        description={`${business.name} helps homeowners and businesses around ${contact.baseLocation} keep their properties comfortable — with honest advice and straightforward service.`}
        crumbs={[{ label: 'About' }]}
        image="/img/about-team.jpg"
        imageAlt="Technician speaking with a homeowner at their front door"
      />
      <section className="py-20">
        <Container className="grid items-center gap-12 lg:grid-cols-2">
          <div>
            <p className="eyebrow">Our Story</p>
            <h2 className="mt-3 text-3xl font-extrabold sm:text-4xl">{business.tagline}</h2>
            <div className="mt-6 space-y-4 text-lg leading-relaxed text-muted-foreground">
              <p>
                {business.name} provides residential and commercial {market.terms.heatingAndCooling} services — from new
                {' '}{market.terms.installation} to repairs, seasonal maintenance, and commercial system support.
              </p>
              <p>
                We believe customers should understand their options before they commit. That means explaining what we find,
                what it means for the system, and what each option involves — then letting you decide.
              </p>
              <p>
                Most heating and cooling problems are easier to manage when they are caught early, which is why we put a strong
                emphasis on preventive maintenance and clear service records.
              </p>
            </div>
            <SampleNotice className="mt-6">
              {business.name} is a fictional portfolio brand. This page shows how an HVAC business could present its story; it
              makes no claims about real history, licences, certifications, or awards.
            </SampleNotice>
          </div>
          <img
            src={cdn('/img/interior-comfort.jpg', 760, 600)}
            srcSet={cdnSrcSet('/img/interior-comfort.jpg', [480, 760, 1000], 760 / 600)}
            sizes="(min-width: 1024px) 50vw, 100vw"
            width={760}
            height={600}
            loading="lazy"
            decoding="async"
            alt="Bright modern living room with a wall-mounted smart thermostat"
            className="aspect-[38/30] w-full rounded-3xl object-cover"
          />
        </Container>
      </section>
      <section className="bg-surface py-20">
        <Container>
          <SectionHeading eyebrow="Our Values" title="How We Work" />
          <ul className="mt-12 grid gap-6 md:grid-cols-3">
            {companyValues.map((v) => (
              <li key={v.title} className="rounded-2xl border bg-white p-8">
                <span className="grid size-12 place-items-center rounded-xl bg-primary text-white"><v.icon className="size-6" aria-hidden="true" /></span>
                <h3 className="mt-5 text-xl font-bold">{v.title}</h3>
                <p className="mt-2 leading-relaxed text-muted-foreground">{v.text}</p>
              </li>
            ))}
          </ul>
        </Container>
      </section>
      <WhyChoose />
      <ProcessSteps />
      <FinalCTA />
    </>
  )
}
