import { Link } from '@tanstack/react-router'
import { ArrowRight } from 'lucide-react'
import type { ServiceItem } from '@/config/services'
import { serviceName } from '@/config/services'
import { cdn, cdnSrcSet } from '@/lib/img'
import { useMarket } from '@/lib/market-context'

export function ServiceCard({ service, headingLevel = 'h3' }: { service: ServiceItem; headingLevel?: 'h2' | 'h3' }) {
  const { code } = useMarket()
  const H = headingLevel
  return (
    <article className="group relative flex h-full flex-col overflow-hidden rounded-2xl border bg-white transition-all hover:-translate-y-1 hover:border-brand/40 hover:shadow-xl hover:shadow-navy/10 motion-reduce:transition-none motion-reduce:hover:translate-y-0">
      <div className="relative aspect-[16/10] overflow-hidden bg-muted">
        <img
          src={cdn(service.image, 600, 375)}
          srcSet={cdnSrcSet(service.image, [400, 600, 800], 1.6)}
          sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
          width={600}
          height={375}
          alt={service.imageAlt}
          loading="lazy"
          decoding="async"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105 motion-reduce:transition-none"
        />
        <span className="absolute bottom-0 left-5 grid size-12 translate-y-1/2 place-items-center rounded-xl bg-primary text-white shadow-lg">
          <service.icon className="size-6" aria-hidden="true" />
        </span>
      </div>
      <div className="flex flex-1 flex-col p-6 pt-9">
        <H className="text-xl font-bold">{serviceName(service, code)}</H>
        <p className="mt-2 flex-1 leading-relaxed text-muted-foreground">{service.cardDescription}</p>
        <Link
          to="/services/$slug"
          params={{ slug: service.slug }}
          className="mt-5 inline-flex items-center gap-1.5 font-bold text-primary after:absolute after:inset-0 after:content-['']"
        >
          {service.cardCta}
          <ArrowRight className="size-4 transition-transform group-hover:translate-x-1" aria-hidden="true" />
        </Link>
      </div>
    </article>
  )
}
