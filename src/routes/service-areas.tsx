import { createFileRoute, Link } from '@tanstack/react-router'
import { MessageSquare, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { PageHero } from '@/components/shared/PageHero'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { ServiceAreaSearch } from '@/components/sections/ServiceAreaSearch'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { useMarket } from '@/lib/market-context'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/service-areas')({
  head: () =>
    seo({
      title: 'HVAC Service Areas | ClimatePro',
      description: 'Search ClimatePro’s listed service areas by city, suburb, ZIP code, or postcode, and contact our team to confirm coverage for your property.',
      path: '/service-areas',
      image: '/img/project-residential.jpg',
    }),
  component: ServiceAreasPage,
})

function ServiceAreasPage() {
  const { market, contact } = useMarket()
  return (
    <>
      <PageHero
        eyebrow="Service Areas"
        title="Find HVAC Service in Your Area"
        description={`Search by ${market.localityLabel.toLowerCase()} or ${market.postalLabel} to see our listed service areas in ${market.countryName}.`}
        crumbs={[{ label: 'Service Areas' }]}
        image="/img/project-residential.jpg"
        imageAlt="Outdoor air conditioning condensers beside a modern home"
      />
      <section className="bg-surface py-16 sm:py-20">
        <Container>
          <SectionHeading title="Check Your Location" description="Coverage is confirmed by our team for each request — a listed area is a starting point, not a guarantee." />
          <div className="mt-10">
            <ServiceAreaSearch headingLevel="h3" />
          </div>
        </Container>
      </section>
      <section className="py-16">
        <Container className="grid items-center gap-8 rounded-3xl border bg-white p-8 sm:p-12 lg:grid-cols-[1fr_auto]">
          <div>
            <h2 className="text-2xl font-extrabold sm:text-3xl">Not sure if we cover your property?</h2>
            <p className="mt-2 max-w-2xl text-muted-foreground">
              Service areas can change, and some locations are reviewed case by case. Get in touch and our team will confirm whether we can help.
            </p>
          </div>
          <div className="flex flex-col gap-3 sm:flex-row">
            <Button asChild size="xl">
              <Link to="/contact" search={{ topic: 'service-area' }}><MessageSquare /> Contact Our Team</Link>
            </Button>
            <Button asChild size="xl" variant="outline">
              <a href={`tel:${contact.phoneHref}`}><Phone /> {contact.phoneDisplay}</a>
            </Button>
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  )
}
