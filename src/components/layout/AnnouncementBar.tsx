import { useState } from 'react'
import { Link } from '@tanstack/react-router'
import { Clock, Phone, X } from 'lucide-react'
import { business } from '@/config/business'
import { useMarket } from '@/lib/market-context'
import { MarketSwitcher } from './MarketSwitcher'

export function AnnouncementBar() {
  const { contact } = useMarket()
  const [visible, setVisible] = useState(true)
  if (!visible) return null

  return (
    <div className="bg-navy text-sm text-slate-200">
      <div className="mx-auto flex min-h-9 max-w-content items-center justify-between gap-3 px-4 py-1.5 sm:px-6 lg:px-8">
        <p className="hidden md:block">
          Heating and cooling help for homes and businesses.
        </p>
        <div className="flex flex-1 items-center justify-between gap-4 md:flex-none md:justify-end">
          <span className="hidden items-center gap-1.5 lg:inline-flex">
            <Clock className="size-3.5 text-brand" aria-hidden="true" />
            {business.hoursShort}
          </span>
          <a
            href={`tel:${contact.phoneHref}`}
            className="inline-flex items-center gap-1.5 font-semibold text-white hover:underline"
          >
            <Phone className="size-3.5 text-brand" aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
          {business.emergency.offered ? (
            <Link
              to="/book-service"
              search={{ urgent: 'yes' }}
              className="rounded-full bg-emergency-strong px-3 py-0.5 text-xs font-bold text-white transition-colors hover:bg-emergency-strong/90"
            >
              Urgent Service
            </Link>
          ) : (
            <Link
              to="/book-service"
              className="rounded-full bg-white/10 px-3 py-0.5 text-xs font-bold text-white transition-colors hover:bg-white/20"
            >
              Book a Service
            </Link>
          )}
          <MarketSwitcher className="hidden sm:inline-flex" />
          <button
            type="button"
            onClick={() => setVisible(false)}
            aria-label="Close announcement"
            className="grid size-7 shrink-0 place-items-center rounded text-slate-300 transition-colors hover:bg-white/10 hover:text-white focus-visible:outline-white"
          >
            <X className="size-4" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  )
}
