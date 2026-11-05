import { useEffect, useRef, useState } from 'react'
import { Link, useRouterState } from '@tanstack/react-router'
import { ArrowRight, ChevronDown, Menu, Phone } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Sheet, SheetContent, SheetDescription, SheetTitle } from '@/components/ui/sheet'
import { Logo } from '@/components/shared/Logo'
import { services, serviceName } from '@/config/services'
import { useMarket } from '@/lib/market-context'
import { cn } from '@/lib/utils'
import { mainNav } from './nav'
import { MarketSwitcher } from './MarketSwitcher'

const navLinkClass =
  'rounded-md px-2.5 py-2 text-[15px] font-semibold whitespace-nowrap text-navy transition-colors hover:text-primary data-[status=active]:text-primary'

function ServicesDropdown() {
  const { code } = useMarket()
  const ref = useRef<HTMLDivElement>(null)
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  // Menu is open only for the path it was opened on, so navigating closes it.
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (next: boolean | ((o: boolean) => boolean)) =>
    setOpenOn((prev) => {
      const value = typeof next === 'function' ? next(prev === pathname) : next
      return value ? pathname : null
    })

  useEffect(() => {
    if (!open) return
    const onDown = (e: MouseEvent) => {
      if (ref.current && !ref.current.contains(e.target as Node)) setOpen(false)
    }
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setOpen(false)
    }
    document.addEventListener('mousedown', onDown)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('mousedown', onDown)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const active = pathname.startsWith('/services')

  return (
    <div
      ref={ref}
      className="relative"
      onMouseEnter={() => setOpen(true)}
      onMouseLeave={() => setOpen(false)}
      onBlur={(e) => {
        if (!e.currentTarget.contains(e.relatedTarget as Node)) setOpen(false)
      }}
    >
      <button
        type="button"
        aria-expanded={open}
        aria-controls="services-menu"
        // Pointer clicks follow hover (always open); keyboard activation (detail 0) toggles.
        onClick={(e) => setOpen(e.detail === 0 ? (o) => !o : true)}
        className={cn(navLinkClass, 'inline-flex items-center gap-1', active && 'text-primary')}
      >
        Services
        <ChevronDown className={cn('size-4 transition-transform', open && 'rotate-180')} aria-hidden="true" />
      </button>
      <div
        id="services-menu"
        hidden={!open}
        className="absolute top-full left-1/2 z-50 w-[560px] -translate-x-1/2 pt-3"
      >
        <div className="rounded-2xl border bg-white p-3 shadow-xl shadow-navy/10">
          <ul className="grid grid-cols-2 gap-1">
            {services.map((s) => (
              <li key={s.slug}>
                <Link
                  to="/services/$slug"
                  params={{ slug: s.slug }}
                  className="flex gap-3 rounded-xl p-3 transition-colors hover:bg-brand-soft"
                >
                  <span className="grid size-10 shrink-0 place-items-center rounded-lg bg-brand-soft text-primary">
                    <s.icon className="size-5" aria-hidden="true" />
                  </span>
                  <span>
                    <span className="block text-sm font-bold text-navy">{serviceName(s, code)}</span>
                    <span className="mt-0.5 block text-xs leading-snug text-muted-foreground">{s.cardDescription}</span>
                  </span>
                </Link>
              </li>
            ))}
            <li>
              <Link to="/services" className="flex h-full items-center justify-between gap-2 rounded-xl bg-surface p-3 text-sm font-bold text-primary hover:bg-brand-soft">
                View all services <ArrowRight className="size-4" aria-hidden="true" />
              </Link>
            </li>
          </ul>
        </div>
      </div>
    </div>
  )
}

function MobileNavigation() {
  const { contact, code } = useMarket()
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  const [openOn, setOpenOn] = useState<string | null>(null)
  const open = openOn === pathname
  const setOpen = (value: boolean) => setOpenOn(value ? pathname : null)

  return (
    <>
      <Button variant="ghost" size="icon-lg" className="xl:hidden" aria-label="Open menu" onClick={() => setOpen(true)}>
        <Menu className="size-6" />
      </Button>
      <Sheet open={open} onOpenChange={setOpen}>
        <SheetContent side="right" className="w-full overflow-y-auto p-0 sm:max-w-md">
          <div className="border-b px-5 py-4">
            <SheetTitle className="text-lg font-extrabold text-navy">Menu</SheetTitle>
            <SheetDescription className="sr-only">Site navigation and contact options</SheetDescription>
          </div>
          <nav aria-label="Mobile" className="px-3 py-2">
            <ul>
              {mainNav.map((item) => (
                <li key={item.label}>
                  <Link
                    to={item.to}
                    activeOptions={{ exact: item.to === '/' }}
                    className="flex min-h-12 items-center rounded-lg px-3 text-lg font-semibold text-navy hover:bg-muted data-[status=active]:text-primary"
                  >
                    {item.label}
                  </Link>
                  {item.label === 'Services' && (
                    <ul className="mb-2 ml-3 border-l pl-3">
                      {services.map((s) => (
                        <li key={s.slug}>
                          <Link
                            to="/services/$slug"
                            params={{ slug: s.slug }}
                            className="flex min-h-11 items-center gap-2 rounded-lg px-3 text-base text-muted-foreground hover:bg-muted hover:text-navy data-[status=active]:text-primary"
                          >
                            <s.icon className="size-4" aria-hidden="true" />
                            {serviceName(s, code)}
                          </Link>
                        </li>
                      ))}
                    </ul>
                  )}
                </li>
              ))}
            </ul>
          </nav>
          <div className="mt-auto space-y-3 border-t bg-surface p-5">
            <Button asChild size="xl" className="w-full">
              <Link to="/get-a-quote">Request a Free Estimate</Link>
            </Button>
            <Button asChild size="xl" variant="outline" className="w-full">
              <a href={`tel:${contact.phoneHref}`}>
                <Phone /> Call {contact.phoneDisplay}
              </a>
            </Button>
            <div className="flex items-center justify-between pt-2 text-sm text-muted-foreground">
              <span>Preview market</span>
              <MarketSwitcher tone="light" />
            </div>
          </div>
        </SheetContent>
      </Sheet>
    </>
  )
}

export function Header() {
  const { contact } = useMarket()
  const [scrolled, setScrolled] = useState(false)
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 8)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <header className={cn('sticky top-0 z-40 border-b bg-white/95 backdrop-blur transition-shadow', scrolled && 'shadow-md shadow-navy/5')}>
      <div className="mx-auto flex h-18 max-w-content items-center justify-between gap-4 px-4 sm:px-6 lg:px-8">
        <Logo />
        <nav aria-label="Main" className="hidden xl:block">
          <ul className="flex items-center gap-0.5">
            {mainNav.map((item) =>
              item.label === 'Services' ? (
                <li key={item.label}>
                  <ServicesDropdown />
                </li>
              ) : (
                <li key={item.label}>
                  <Link to={item.to} activeOptions={{ exact: item.to === '/' }} className={navLinkClass}>
                    {item.label}
                  </Link>
                </li>
              ),
            )}
          </ul>
        </nav>
        <div className="flex items-center gap-2 sm:gap-4">
          <a
            href={`tel:${contact.phoneHref}`}
            className="hidden items-center gap-2 rounded-md text-sm font-bold whitespace-nowrap text-navy hover:text-primary 2xl:inline-flex"
          >
            <span className="grid size-9 place-items-center rounded-full bg-brand-soft text-primary">
              <Phone className="size-4" aria-hidden="true" />
            </span>
            <span className="flex flex-col leading-tight">
              <span className="text-xs font-medium text-muted-foreground">Call us</span>
              {contact.phoneDisplay}
            </span>
          </a>
          <a
            href={`tel:${contact.phoneHref}`}
            aria-label={`Call ${contact.phoneDisplay}`}
            className="hidden size-10 place-items-center rounded-full bg-brand-soft text-primary hover:bg-primary hover:text-white xl:grid 2xl:hidden"
          >
            <Phone className="size-4" aria-hidden="true" />
          </a>
          <Button asChild size="lg" className="hidden whitespace-nowrap sm:inline-flex">
            <Link to="/get-a-quote">Request a Free Estimate</Link>
          </Button>
          <MobileNavigation />
        </div>
      </div>
    </header>
  )
}
