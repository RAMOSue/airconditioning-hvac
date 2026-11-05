import { createFileRoute } from '@tanstack/react-router'
import { Hero } from '@/components/sections/Hero'
import { TrustIndicators } from '@/components/sections/TrustIndicators'
import { ServicesGrid } from '@/components/sections/ServicesGrid'
import { EmergencyCTA } from '@/components/sections/EmergencyCTA'
import { WhyChoose } from '@/components/sections/WhyChoose'
import { Projects } from '@/components/sections/Projects'
import { CompanyValues } from '@/components/sections/CompanyValues'
import { MaintenancePromo } from '@/components/sections/MaintenancePromo'
import { Testimonials } from '@/components/sections/Testimonials'
import { Differentiator } from '@/components/sections/Differentiator'
import { TechnicianAssurance } from '@/components/sections/TechnicianAssurance'
import { ComfortStrip } from '@/components/sections/ComfortStrip'
import { ServiceRange } from '@/components/sections/ServiceRange'
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
      <EmergencyCTA />
      <TrustIndicators />
      <WhyChoose />
      <ServicesGrid />
      <Projects />
      <CompanyValues />
      <MaintenancePromo />
      <Differentiator />
      <TechnicianAssurance />
      <ComfortStrip />
      <Testimonials />
      <ServiceRange />
      <section id="service-areas" className="py-14 sm:py-16">
        <Container>
          <SectionHeading
            eyebrow="Service Areas"
            title="Serving Homes and Businesses in Your Area."
            description="Search our listed service areas, then request a service for your location."
          />
          <div className="mt-10">
            <ServiceAreaSearch compact />
          </div>
        </Container>
      </section>
      <FinalCTA
        visual
        title="Let's find the right next step for your space."
        description="Tell us what is happening with your heating or cooling and what you need from your system."
      />
    </>
  )
}
