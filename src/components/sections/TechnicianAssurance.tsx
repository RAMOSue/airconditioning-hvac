import { CheckCircle2 } from 'lucide-react'
import { cdn, cdnSrcSet } from '@/lib/img'
import { Container } from '@/components/shared/SectionHeading'
import { SampleNotice } from '@/components/shared/SampleNotice'

const expectations = [
  'Understand the issue and the property before discussing options.',
  'Get a clear explanation of the proposed work and next steps.',
  'Review the estimate before deciding whether to proceed.',
]

export function TechnicianAssurance() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container className="grid items-center gap-8 lg:grid-cols-[0.9fr_1.1fr] lg:gap-12">
        <img
          src={cdn('/img/hvac-maintenance.jpg', 760, 560)}
          srcSet={cdnSrcSet(
            '/img/hvac-maintenance.jpg',
            [400, 600, 760, 1000],
            760 / 560,
          )}
          sizes="(min-width: 1024px) 42vw, 100vw"
          width={760}
          height={560}
          loading="lazy"
          decoding="async"
          alt="Technician inspecting air conditioning equipment during maintenance"
          className="aspect-[4/3] w-full rounded-xl object-cover"
        />
        <div>
          <p className="eyebrow">A considered approach</p>
          <h2 className="mt-3 max-w-xl text-3xl leading-tight font-extrabold sm:text-4xl">
            Know what you are saying yes to.
          </h2>
          <p className="mt-3 max-w-2xl leading-relaxed text-muted-foreground">
            No one wants to approve work they do not understand. The project
            starts with your needs, a clear explanation of the options and an
            estimate to review before you decide.
          </p>
          <ul className="mt-5 space-y-3">
            {expectations.map((expectation) => (
              <li
                key={expectation}
                className="flex items-start gap-3 text-sm font-medium leading-relaxed text-navy"
              >
                <CheckCircle2
                  className="mt-0.5 size-5 shrink-0 text-success"
                  aria-hidden="true"
                />
                {expectation}
              </li>
            ))}
          </ul>
          <SampleNotice className="mt-5 max-w-xl">
            Business photography and service details on this sample site are
            illustrative; confirm credentials and guarantees directly with the
            business before booking.
          </SampleNotice>
        </div>
      </Container>
    </section>
  )
}
