import { processSteps } from '@/config/content'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { cn } from '@/lib/utils'

export function ProcessSteps({
  steps = processSteps,
  title = 'How Our Process Works',
  description = 'Requesting HVAC service should be simple. Here is what happens after you get in touch.',
  tone = 'dark',
}: {
  steps?: { title: string; text: string }[]
  title?: string
  description?: string
  tone?: 'dark' | 'surface'
}) {
  return (
    <section className={cn('py-20 sm:py-24', tone === 'dark' ? 'bg-navy' : 'bg-surface')}>
      <Container>
        <SectionHeading eyebrow="Simple Process" title={title} description={description} tone={tone === 'dark' ? 'light' : 'dark'} />
        <ol className="relative mt-14 grid gap-6 md:grid-cols-2 lg:grid-cols-4">
          <div
            aria-hidden="true"
            className={cn('absolute top-8 right-[12%] left-[12%] hidden h-0.5 border-t-2 border-dashed lg:block', tone === 'dark' ? 'border-white/20' : 'border-brand/30')}
          />
          {steps.map((s, i) => (
            <li
              key={s.title}
              className={cn('relative rounded-2xl p-6 text-center', tone === 'dark' ? 'bg-white/5 ring-1 ring-white/10' : 'border bg-white')}
            >
              <span className="relative mx-auto grid size-16 place-items-center rounded-full bg-primary text-2xl font-extrabold text-white ring-8 ring-primary/20">
                {i + 1}
              </span>
              <h3 className={cn('mt-6 text-lg font-bold', tone === 'dark' && 'text-white')}>{s.title}</h3>
              <p className={cn('mt-2 leading-relaxed', tone === 'dark' ? 'text-slate-300' : 'text-muted-foreground')}>{s.text}</p>
            </li>
          ))}
        </ol>
      </Container>
    </section>
  )
}
