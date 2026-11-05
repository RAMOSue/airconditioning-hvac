import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/sections/Hero'
import { TrustIndicators } from '@/components/sections/TrustIndicators'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { EmergencyCTA } from '@/components/sections/EmergencyCTA'
import { WhyChoose } from '@/components/sections/WhyChoose'
import { ProcessSteps } from '@/components/sections/ProcessSteps'
import { Projects } from '@/components/sections/Projects'
import { MaintenancePromo } from '@/components/sections/MaintenancePromo'
import { Testimonials } from '@/components/sections/Testimonials'
import { ServiceAreaSearch } from '@/components/sections/ServiceAreaSearch'
import { FinalCTA } from '@/components/sections/FinalCTA'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { seo } from '@/lib/seo'

export const Route = createFileRoute('/')({
  head: () =>
    seo({
      title: 'ClimatePro | Professional HVAC & Air Conditioning Services',
      description:
        'Explore professional air conditioning installation, HVAC repairs, heating, cooling, and maintenance services. Request a service or free estimate.',
      path: '/',
    }),
  component: Home,
})

function Home() {
  return (
    <>
      <Hero />
      <TrustIndicators />
      <ServicesGrid />
      <EmergencyCTA />
      <WhyChoose />
      <ProcessSteps />
      <Projects />
      <MaintenancePromo />
      <Testimonials />
      <section id="service-areas" className="py-20 sm:py-24">
        <Container>
          <SectionHeading
            eyebrow="Service Areas"
            title="Serving Homes and Businesses in Your Area."
            description="Search our listed service areas, then request a service for your location."
          />
          <div className="mt-10">
            <ServiceAreaSearch />
          </div>
        </Container>
      </section>
      <FinalCTA />
    </>
  )
}
