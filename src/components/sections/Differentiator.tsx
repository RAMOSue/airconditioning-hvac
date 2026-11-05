import { Faq } from '@/components/shared/Faq'
import { Container } from '@/components/shared/SectionHeading'
import { cdn } from '@/lib/img'

const customerQuestions = [
  {
    q: 'Why does one room stay warm when the system is running?',
    a: 'Airflow, room layout, insulation and system capacity can all affect comfort. Sharing which rooms are affected helps the team understand what to check.',
  },
  {
    q: 'Should I repair an older system or plan a replacement?',
    a: 'It depends on the condition of the equipment, the problem, and how well it meets your needs. A service assessment can help you compare the available options.',
  },
  {
    q: 'What should I include in a service request?',
    a: 'Describe the symptoms, when they started, the type of property and any details you know about the system. Photos can also help explain what you are seeing.',
  },
]

export function Differentiator() {
  return (
    <section className="overflow-hidden bg-gradient-to-r from-[#1769d2] via-[#3b4bbc] to-[#692a88] py-12 text-white sm:py-16">
      <Container className="grid items-center gap-8 lg:grid-cols-2 lg:gap-12">
        <div>
          <p className="text-xs font-bold tracking-[0.16em] text-blue-100 uppercase">
            Questions before you book?
          </p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight font-extrabold text-white sm:text-4xl">
            Get a clearer picture before you decide.
          </h2>
          <p className="mt-3 max-w-xl leading-relaxed text-white/85">
            HVAC problems can be hard to diagnose from the symptoms alone. These
            answers can help you prepare for a useful conversation with the
            service team.
          </p>
          <div className="mt-6">
            <Faq items={customerQuestions} withSchema={false} />
          </div>
        </div>
        <div className="relative">
          <img
            src={cdn('/img/project-residential.jpg', 900, 700)}
            width={900}
            height={700}
            loading="lazy"
            decoding="async"
            alt="Air conditioning equipment beside a residential property"
            className="aspect-[4/3] w-full rounded-xl object-cover shadow-2xl"
          />
          <div className="absolute right-3 bottom-3 left-3 rounded-lg bg-white/95 p-4 text-sm leading-relaxed text-navy shadow-lg sm:right-6 sm:bottom-6 sm:left-auto sm:max-w-xs">
            <strong className="block">Every property is different.</strong>
            The best next step depends on the space, the system and what you are
            experiencing.
          </div>
        </div>
      </Container>
    </section>
  )
}
