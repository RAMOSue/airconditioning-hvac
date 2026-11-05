import { useState } from 'react'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { Dialog, DialogContent, DialogDescription, DialogTitle } from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { projects } from '@/config/content'
import { cdn, cdnSrcSet } from '@/lib/img'
import { Container, SectionHeading } from '@/components/shared/SectionHeading'
import { SampleNotice } from '@/components/shared/SampleNotice'

export function Projects() {
  const [index, setIndex] = useState<number | null>(null)
  const current = index === null ? null : projects[index]
  const step = (d: number) => setIndex((i) => (i === null ? i : (i + d + projects.length) % projects.length))

  return (
    <section className="bg-surface py-20 sm:py-24">
      <Container>
        <SectionHeading
          eyebrow="Recent Work"
          title="Example HVAC Projects"
          description="A look at the kinds of installation, upgrade, and maintenance projects HVAC businesses like ClimatePro take on."
        />
        <SampleNotice className="mx-auto mt-6 max-w-2xl">
          Illustrative portfolio examples only. These are not actual completed ClimatePro projects.
        </SampleNotice>
        <ul className="mt-10 grid gap-6 md:grid-cols-3">
          {projects.map((p, i) => (
            <li key={p.id}>
              <article className="group h-full overflow-hidden rounded-2xl border bg-white">
                <button
                  type="button"
                  onClick={() => setIndex(i)}
                  className="relative block aspect-[4/3] w-full overflow-hidden"
                  aria-label={`View larger image: ${p.title}`}
                >
                  <img
                    src={cdn(p.image, 600, 450)}
                    srcSet={cdnSrcSet(p.image, [400, 600, 800], 4 / 3)}
                    sizes="(min-width: 768px) 33vw, 100vw"
                    width={600}
                    height={450}
                    loading="lazy"
                    decoding="async"
                    alt={p.imageAlt}
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                  />
                  <span className="absolute top-3 right-3 grid size-9 place-items-center rounded-full bg-white/90 text-navy opacity-0 transition-opacity group-hover:opacity-100 group-focus-within:opacity-100">
                    <Expand className="size-4" aria-hidden="true" />
                  </span>
                </button>
                <div className="p-6">
                  <p className="text-xs font-bold tracking-wider text-primary uppercase">{p.category}</p>
                  <h3 className="mt-2 text-lg font-bold">{p.title}</h3>
                  <p className="mt-2 leading-relaxed text-muted-foreground">{p.text}</p>
                </div>
              </article>
            </li>
          ))}
        </ul>
      </Container>

      <Dialog open={current !== null} onOpenChange={(o) => !o && setIndex(null)}>
        <DialogContent className="max-w-4xl gap-0 overflow-hidden p-0 sm:max-w-4xl">
          {current && (
            <>
              <img
                src={cdn(current.image, 1200)}
                alt={current.imageAlt}
                className="aspect-[4/3] max-h-[70vh] w-full bg-navy object-contain sm:object-cover"
              />
              <div className="flex items-start justify-between gap-4 p-5">
                <div>
                  <DialogTitle className="text-lg font-bold">{current.title}</DialogTitle>
                  <DialogDescription className="mt-1">{current.category} — illustrative example</DialogDescription>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button variant="outline" size="icon" onClick={() => step(-1)} aria-label="Previous project">
                    <ChevronLeft />
                  </Button>
                  <Button variant="outline" size="icon" onClick={() => step(1)} aria-label="Next project">
                    <ChevronRight />
                  </Button>
                </div>
              </div>
            </>
          )}
        </DialogContent>
      </Dialog>
    </section>
  )
}
