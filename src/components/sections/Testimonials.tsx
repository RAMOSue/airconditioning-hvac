import { useState } from 'react'
import { ChevronLeft, ChevronRight, Quote } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { testimonials } from '@/config/content'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { SampleNotice } from '@/components/shared/SampleNotice'
import { cn } from '@/lib/utils'

/** Testimonial carousel — shows two at a time on desktop, one on mobile. */
export function Testimonials() {
  const [start, setStart] = useState(0)
  const n = testimonials.length
  const visible = [testimonials[start], testimonials[(start + 1) % n]]

  return (
    <section className="bg-surface py-20 sm:py-24" aria-roledescription="carousel" aria-label="Customer testimonials">
      <Container>
        <SectionHeading
          eyebrow="Customer Feedback"
          title="What Customers Value"
          description="Feedback from customers helps us improve every step of the service experience."
        />
        <SampleNotice className="mx-auto mt-6 max-w-2xl">
          Sample placeholder testimonials for this portfolio site. Replace with genuine customer reviews before launch.
        </SampleNotice>
        <div className="mt-10 grid gap-6 md:grid-cols-2" aria-live="polite">
          {visible.map((t, i) => (
            <figure key={t.id} className={cn('rounded-2xl border bg-white p-8', i === 1 && 'hidden md:block')}>
              <Quote className="size-8 text-brand" aria-hidden="true" />
              <blockquote className="mt-4 text-lg leading-relaxed text-navy">&ldquo;{t.quote}&rdquo;</blockquote>
              <figcaption className="mt-6 flex items-center gap-3 border-t pt-5">
                <span className="grid size-11 place-items-center rounded-full bg-brand-soft font-bold text-primary" aria-hidden="true">
                  {t.name.slice(-1)}
                </span>
                <span>
                  <span className="block font-bold text-navy">{t.name}</span>
                  <span className="block text-sm text-muted-foreground">{t.context}</span>
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
        <div className="mt-8 flex items-center justify-center gap-4">
          <Button variant="outline" size="icon-lg" className="rounded-full" onClick={() => setStart((s) => (s - 1 + n) % n)} aria-label="Previous testimonial">
            <ChevronLeft />
          </Button>
          <div className="flex gap-2">
            {testimonials.map((t, i) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setStart(i)}
                aria-label={`Show testimonial ${i + 1}`}
                aria-current={i === start}
                className={cn('h-2.5 rounded-full transition-all', i === start ? 'w-8 bg-primary' : 'w-2.5 bg-slate-300 hover:bg-slate-400')}
              />
            ))}
          </div>
          <Button variant="outline" size="icon-lg" className="rounded-full" onClick={() => setStart((s) => (s + 1) % n)} aria-label="Next testimonial">
            <ChevronRight />
          </Button>
        </div>
      </Container>
    </section>
  )
}
