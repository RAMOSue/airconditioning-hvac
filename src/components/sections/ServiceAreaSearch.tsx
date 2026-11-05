import { useState, type FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import {
  ArrowRight,
  Building2,
  Home,
  MapPin,
  Phone,
  Search,
  SearchX,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { searchServiceAreas, serviceAreas } from '@/config/serviceAreas'
import { useMarket } from '@/lib/market-context'
import { SampleNotice } from '@/components/shared/SampleNotice'

export function ServiceAreaSearch({
  headingLevel = 'h3',
  compact = false,
}: {
  headingLevel?: 'h2' | 'h3'
  compact?: boolean
}) {
  const { code, market, contact } = useMarket()
  const [query, setQuery] = useState('')
  const [submitted, setSubmitted] = useState<string | null>(null)
  const H = headingLevel

  const results =
    submitted === null
      ? serviceAreas[code]
      : searchServiceAreas(code, submitted)
  const postalQuery =
    submitted && /^\d/.test(submitted.trim()) ? submitted.trim() : undefined

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    setSubmitted(query.trim() || null)
  }

  return (
    <div>
      <form
        onSubmit={onSubmit}
        role="search"
        className="mx-auto flex max-w-xl flex-col gap-3 sm:flex-row"
      >
        <label htmlFor="area-search" className="sr-only">
          Search by {market.localityLabel.toLowerCase()} or {market.postalLabel}
        </label>
        <div className="relative flex-1">
          <MapPin
            className="pointer-events-none absolute top-1/2 left-4 size-5 -translate-y-1/2 text-muted-foreground"
            aria-hidden="true"
          />
          <Input
            id="area-search"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder={`Enter ${market.localityLabel.toLowerCase()} or ${market.postalLabel}`}
            className="h-12 rounded-lg bg-white pl-12 text-base"
            autoComplete="postal-code"
          />
        </div>
        <Button type="submit" size="xl">
          <Search /> Check Area
        </Button>
      </form>

      <div aria-live="polite" className={compact ? 'mt-4' : 'mt-8'}>
        {submitted !== null && results.length > 0 && (
          <p className="mb-5 text-center text-sm text-muted-foreground">
            {results.length} listed area{results.length > 1 ? 's' : ''} match
            &ldquo;{submitted}&rdquo;. Please contact our team to confirm
            coverage for your exact address.
          </p>
        )}
        {submitted !== null && results.length === 0 ? (
          <div className="mx-auto max-w-xl rounded-2xl border bg-white p-8 text-center">
            <SearchX
              className="mx-auto size-10 text-muted-foreground"
              aria-hidden="true"
            />
            <p className="mt-4 text-lg font-semibold text-navy">
              Please contact our team to confirm whether your location is within
              our service area.
            </p>
            <p className="mt-2 text-muted-foreground">
              &ldquo;{submitted}&rdquo; is not in our listed service areas, but
              coverage can change.
            </p>
            <div className="mt-6 flex flex-col justify-center gap-3 sm:flex-row">
              <Button asChild>
                <Link to="/contact" search={{ topic: 'service-area' }}>
                  Contact Our Team
                </Link>
              </Button>
              <Button asChild variant="outline">
                <a href={`tel:${contact.phoneHref}`}>
                  <Phone /> {contact.phoneDisplay}
                </a>
              </Button>
            </div>
          </div>
        ) : (
          <ul
            className={
              compact
                ? 'grid gap-3 sm:grid-cols-2 lg:grid-cols-3'
                : 'grid gap-4 sm:grid-cols-2 lg:grid-cols-3'
            }
          >
            {results.map((a) => (
              <li
                key={a.id}
                className={
                  compact
                    ? 'flex items-center justify-between gap-3 rounded-lg border bg-white p-4 transition-shadow hover:shadow-md hover:shadow-navy/5'
                    : 'flex flex-col rounded-2xl border bg-white p-6 transition-shadow hover:shadow-lg hover:shadow-navy/5'
                }
              >
                <div className="flex items-start justify-between gap-3">
                  <div>
                    <H className="text-lg font-bold">{a.name}</H>
                    <p className="text-sm text-muted-foreground">{a.region}</p>
                  </div>
                  {!compact && (
                    <span className="grid size-10 shrink-0 place-items-center rounded-full bg-brand-soft text-primary">
                      <MapPin className="size-5" aria-hidden="true" />
                    </span>
                  )}
                </div>
                {!compact && (
                  <p className="mt-3 flex-1 text-sm leading-relaxed text-muted-foreground">
                    {a.summary}
                  </p>
                )}
                {!compact && (
                  <div className="mt-4 flex flex-wrap gap-2">
                    {a.propertyTypes.map((t) => (
                      <span
                        key={t}
                        className="inline-flex items-center gap-1 rounded-full bg-surface px-2.5 py-1 text-xs font-semibold text-navy"
                      >
                        {t === 'Residential' ? (
                          <Home className="size-3" aria-hidden="true" />
                        ) : (
                          <Building2 className="size-3" aria-hidden="true" />
                        )}
                        {t}
                      </span>
                    ))}
                  </div>
                )}
                <Link
                  to="/get-a-quote"
                  search={{ locality: a.name, postal: postalQuery }}
                  className={
                    compact
                      ? 'shrink-0 text-xs font-bold text-primary hover:underline sm:text-sm'
                      : 'mt-5 inline-flex items-center gap-1.5 text-sm font-bold text-primary hover:underline'
                  }
                >
                  {compact ? 'Request' : `Request service in ${a.name}`}{' '}
                  <ArrowRight className="size-4" aria-hidden="true" />
                </Link>
              </li>
            ))}
          </ul>
        )}
      </div>
      <SampleNotice
        className={
          compact ? 'mx-auto mt-4 max-w-2xl' : 'mx-auto mt-8 max-w-2xl'
        }
      >
        Sample service areas for the {market.countryName} configuration. A
        listed {market.postalLabel.toLowerCase()} does not guarantee service
        availability — our team confirms coverage for each request.
      </SampleNotice>
    </div>
  )
}
