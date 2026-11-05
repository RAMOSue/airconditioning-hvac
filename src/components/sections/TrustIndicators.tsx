import { Link } from '@tanstack/react-router'
import { trustIndicators } from '@/config/content'
import { Container } from '@/components/shared/SectionHeading'

export function TrustIndicators() {
  return (
    <section
      aria-label="Ways ClimatePro can help"
      className="bg-surface py-10 sm:py-12"
    >
      <Container>
        <ul className="grid gap-5 md:grid-cols-3">
          {trustIndicators.map((t) => (
            <li
              key={t.title}
              className="flex min-h-60 flex-col items-center rounded-xl border border-slate-200 bg-white px-5 py-6 text-center shadow-sm sm:px-6"
            >
              <span className="grid size-14 shrink-0 place-items-center rounded-full bg-navy text-white">
                <t.icon className="size-6" aria-hidden="true" />
              </span>
              <h2 className="mt-3 text-base font-bold text-navy">{t.title}</h2>
              <p className="mt-1.5 max-w-xs flex-1 text-sm leading-relaxed text-muted-foreground">
                {t.text}
              </p>
              <Link
                to={t.to}
                className="mt-4 inline-flex min-h-9 items-center justify-center rounded-md bg-navy-2 px-4 text-sm font-bold text-white transition-colors hover:bg-primary"
              >
                {t.cta}
              </Link>
            </li>
          ))}
        </ul>
      </Container>
    </section>
  )
}
