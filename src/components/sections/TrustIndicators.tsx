import { trustIndicators } from '@/config/content'
import { Container } from '@/components/shared/SectionHeading'

export function TrustIndicators() {
  return (
    <section aria-label="Why customers contact ClimatePro" className="border-y bg-white">
      <Container className="py-10">
        <ul className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          {trustIndicators.map((t) => (
            <li key={t.title} className="flex items-center gap-4">
              <span className="grid size-12 shrink-0 place-items-center rounded-xl bg-brand-soft text-primary">
                <t.icon className="size-6" aria-hidden="true" />
              </span>
              <span>
                <span className="block font-bold text-navy">{t.title}</span>
                <span className="block text-sm text-muted-foreground">{t.text}</span>
              </span>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
