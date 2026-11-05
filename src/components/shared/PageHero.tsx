import { Breadcrumbs, type Crumb } from './Breadcrumbs'
import { Container } from './SectionHeading'
import { cdn, cdnSrcSet } from '@/lib/img'

/** Dark page header used by all inner pages. Holds the page's single H1. */
export function PageHero({
  eyebrow,
  title,
  description,
  crumbs,
  image,
  imageAlt = '',
  children,
}: {
  eyebrow?: string
  title: string
  description?: string
  crumbs: Crumb[]
  image?: string
  imageAlt?: string
  children?: React.ReactNode
}) {
  return (
    <section className="relative overflow-hidden bg-navy text-white">
      {image && (
        <>
          <img
            src={cdn(image, 1600)}
            srcSet={cdnSrcSet(image, [640, 1024, 1600])}
            sizes="100vw"
            alt={imageAlt}
            className="absolute inset-0 h-full w-full object-cover opacity-35"
            fetchPriority="high"
          />
          <div className="absolute inset-0 bg-gradient-to-r from-navy via-navy/90 to-navy/40" aria-hidden="true" />
        </>
      )}
      <Container className="relative py-14 sm:py-20">
        <Breadcrumbs items={crumbs} />
        <div className="mt-6 max-w-3xl">
          {eyebrow && <p className="eyebrow mb-3 text-brand">{eyebrow}</p>}
          <h1 className="text-4xl font-extrabold text-white sm:text-5xl">{title}</h1>
          {description && <p className="mt-5 text-lg leading-relaxed text-slate-200">{description}</p>}
          {children}
        </div>
      </Container>
    </section>
  )
}
