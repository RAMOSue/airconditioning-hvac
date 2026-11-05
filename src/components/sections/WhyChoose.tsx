import { whyChoose } from '@/config/content'
import { cdn, cdnSrcSet } from '@/lib/img'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'

export function WhyChoose() {
  return (
    <section className="py-20 sm:py-24">
      <Container className="grid items-center gap-12 lg:grid-cols-12">
        <div className="lg:col-span-5">
          <img
            src={cdn('/img/about-team.jpg', 640, 760)}
            srcSet={cdnSrcSet('/img/about-team.jpg', [400, 640, 900], 640 / 760)}
            sizes="(min-width: 1024px) 40vw, 100vw"
            width={640}
            height={760}
            loading="lazy"
            decoding="async"
            alt="ClimatePro technician reviewing service details on a tablet with a homeowner at their front door"
            className="aspect-[4/3] w-full rounded-3xl object-cover lg:aspect-[16/19]"
          />
        </div>
        <div className="lg:col-span-7">
          <SectionHeading
            align="left"
            eyebrow="Why Choose ClimatePro"
            title="Comfort, Quality, and Service You Can Depend On."
            description="Good HVAC service is about more than equipment. It is about being clear, reliable, and easy to work with."
          />
          <ul className="mt-10 grid gap-5 sm:grid-cols-2">
            {whyChoose.map((f) => (
              <li key={f.title} className="rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy/5">
                <span className="grid size-11 place-items-center rounded-xl bg-brand-soft text-primary">
                  <f.icon className="size-5" aria-hidden="true" />
                </span>
                <h3 className="mt-4 text-lg font-bold">{f.title}</h3>
                <p className="mt-1.5 leading-relaxed text-muted-foreground">{f.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </Container>
    </section>
  )
}
