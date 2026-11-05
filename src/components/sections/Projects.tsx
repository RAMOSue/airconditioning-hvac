import { useState } from 'react'
import { ChevronLeft, ChevronRight, Expand } from 'lucide-react'
import { Link } from '@tanstack/react-router'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogTitle,
} from '@/components/ui/dialog'
import { Button } from '@/components/ui/button'
import { projects } from '@/config/content'
import { cdn, cdnSrcSet } from '@/lib/img'
import { Container } from '@/components/shared/SectionHeading'
import { SampleNotice } from '@/components/shared/SampleNotice'
import { cn } from '@/lib/utils'

export function Projects() {
  const [index, setIndex] = useState<number | null>(null)
  const current = index === null ? null : projects[index]
  const step = (d: number) =>
    setIndex((i) =>
      i === null ? i : (i + d + projects.length) % projects.length,
    )

  return (
    <section className="relative isolate overflow-hidden bg-navy py-10 sm:py-14">
      <img
        src={cdn('/img/interior-comfort.jpg', 1800, 900)}
        alt=""
        aria-hidden="true"
        className="absolute inset-0 size-full object-cover"
        loading="lazy"
        decoding="async"
      />
      <div className="absolute inset-0 bg-navy/65" aria-hidden="true" />
      <Container className="relative grid items-center gap-6 lg:min-h-[25rem] lg:grid-cols-[0.78fr_1.22fr] lg:gap-10">
        <div className="rounded-xl bg-white p-6 shadow-2xl sm:p-8">
          <p className="eyebrow">
            From the first question to the finished work
          </p>
          <h2 className="mt-3 text-2xl leading-tight font-extrabold sm:text-3xl">
            See what thoughtful HVAC planning can look like.
          </h2>
          <p className="mt-3 leading-relaxed text-muted-foreground">
            Explore examples of installation, commercial upgrades and system
            care. Every property is different, so a good solution starts with
            understanding yours.
          </p>
          <SampleNotice className="mt-4">
            These are illustrative images, not completed ClimatePro projects. A
            project video has not been supplied.
          </SampleNotice>
          <Link
            to="/services"
            className="mt-5 inline-flex items-center gap-2 text-sm font-bold text-primary hover:underline"
          >
            Explore HVAC services{' '}
            <Expand className="size-4" aria-hidden="true" />
          </Link>
        </div>

        <ul className="grid gap-3 sm:grid-cols-2">
          {projects.map((project, i) => (
            <li key={project.id} className={cn(i === 0 && 'sm:row-span-2')}>
              <button
                type="button"
                onClick={() => setIndex(i)}
                className={cn(
                  'group relative block min-h-52 w-full overflow-hidden rounded-xl bg-navy text-left focus-visible:outline-white',
                  i === 0 ? 'sm:h-full' : 'aspect-[16/10]',
                )}
                aria-label={`View illustrative project example: ${project.title}`}
              >
                <img
                  src={cdn(project.image, 800, 600)}
                  srcSet={cdnSrcSet(project.image, [400, 600, 800], 4 / 3)}
                  sizes={
                    i === 0
                      ? '(min-width: 640px) 48vw, 100vw'
                      : '(min-width: 640px) 24vw, 100vw'
                  }
                  width={800}
                  height={600}
                  loading="lazy"
                  decoding="async"
                  alt=""
                  className="absolute inset-0 size-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
                />
                <span
                  className="absolute inset-0 bg-gradient-to-t from-navy/90 via-navy/15 to-transparent"
                  aria-hidden="true"
                />
                <span className="absolute inset-x-0 bottom-0 p-4 text-white">
                  <span className="block text-xs font-bold tracking-wider text-blue-100 uppercase">
                    {project.category}
                  </span>
                  <span className="mt-1 block font-bold sm:text-lg">
                    {project.title}
                  </span>
                  <span className="mt-2 inline-flex items-center gap-1 text-xs font-semibold text-white/90">
                    View example{' '}
                    <Expand className="size-3.5" aria-hidden="true" />
                  </span>
                </span>
              </button>
            </li>
          ))}
        </ul>
      </Container>

      <Dialog
        open={current !== null}
        onOpenChange={(o) => !o && setIndex(null)}
      >
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
                  <DialogTitle className="text-lg font-bold">
                    {current.title}
                  </DialogTitle>
                  <DialogDescription className="mt-1">
                    {current.category} — {current.text}
                  </DialogDescription>
                </div>
                <div className="flex shrink-0 gap-2">
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => step(-1)}
                    aria-label="Previous project"
                  >
                    <ChevronLeft />
                  </Button>
                  <Button
                    variant="outline"
                    size="icon"
                    onClick={() => step(1)}
                    aria-label="Next project"
                  >
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
