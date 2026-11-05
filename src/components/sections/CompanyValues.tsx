import { companyValues } from '@/config/content'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'

export function CompanyValues() {
  return (
    <section className="bg-white py-12 sm:py-16">
      <Container>
        <SectionHeading
          eyebrow="How we approach the work"
          title="Good service is more than equipment."
          description="Clear explanations and thoughtful recommendations help make a complicated decision feel manageable."
        />
        <ul className="mt-8 grid gap-6 md:grid-cols-3">
          {companyValues.map((value) => (
            <li
              key={value.title}
              className="flex gap-4 border-t-2 border-brand/30 pt-5"
            >
              <span className="grid size-11 shrink-0 place-items-center rounded-full bg-brand-soft text-primary">
                <value.icon className="size-5" aria-hidden="true" />
              </span>
              <div>
                <h3 className="font-bold text-navy">{value.title}</h3>
                <p className="mt-1.5 text-sm leading-relaxed text-muted-foreground">
                  {value.text}
                </p>
              </div>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
