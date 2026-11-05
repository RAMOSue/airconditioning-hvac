import { PageHero } from './PageHero'
import { Container } from './SectionHeading'
import { SampleNotice } from './SampleNotice'

export interface LegalSection {
  heading: string
  body: string[]
}

export function LegalPage({ title, intro, updated, sections }: { title: string; intro: string; updated: string; sections: LegalSection[] }) {
  return (
    <>
      <PageHero title={title} description={intro} crumbs={[{ label: title }]} />
      <section className="py-16">
        <Container className="max-w-reading">
          <SampleNotice>
            Template text for a sample portfolio website. It is not legal advice — a real business should have its policies
            reviewed for its jurisdiction (for example US state privacy laws or the Australian Privacy Act 1988).
          </SampleNotice>
          <p className="mt-6 text-sm text-muted-foreground">Last updated: {updated}</p>
          <div className="mt-8 space-y-10">
            {sections.map((s, i) => (
              <section key={s.heading} aria-labelledby={`legal-${i}`}>
                <h2 id={`legal-${i}`} className="text-xl font-bold">{i + 1}. {s.heading}</h2>
                <div className="mt-3 space-y-3 leading-relaxed text-muted-foreground">
                  {s.body.map((p) => <p key={p.slice(0, 30)}>{p}</p>)}
                </div>
              </section>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
