import { Link } from '@tanstack/react-router'
import { ArrowRight, MessageCircleQuestion } from 'lucide-react'
import { services } from '@/config/services'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { ServiceCard } from './ServiceCard'

export function ServicesGrid() {
  return (
    <section id="services" className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Our Services"
          title="Complete Heating & Cooling Solutions"
          description="Whether you need a new air conditioning system, urgent repairs, or regular maintenance, explore our range of HVAC services."
        />
        <div className="mt-14 grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
          {services.map((s) => (
            <ServiceCard key={s.slug} service={s} />
          ))}
          <div className="flex flex-col justify-between rounded-2xl bg-navy p-8 text-white">
            <div>
              <MessageCircleQuestion className="size-10 text-brand" aria-hidden="true" />
              <h3 className="mt-5 text-xl font-bold text-white">Not sure which service you need?</h3>
              <p className="mt-2 leading-relaxed text-slate-300">
                Describe what is happening with your system and our team will point you in the right direction.
              </p>
            </div>
            <Link to="/get-a-quote" className="mt-6 inline-flex items-center gap-1.5 font-bold text-white hover:underline">
              Start a free estimate request <ArrowRight className="size-4" aria-hidden="true" />
            </Link>
          </div>
        </div>
      </Container>
    </section>
  )
}
