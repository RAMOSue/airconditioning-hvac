import { Link } from '@tanstack/react-router'
import { Clock, Phone } from 'lucide-react'
import { business } from '@/config/business'
import { useMarket } from '@/lib/market-context'
import { MarketSwitcher } from './MarketSwitcher'

export function AnnouncementBar() {
  const { contact } = useMarket()
  return (
    <div className="bg-navy text-sm text-slate-200">
      <div className="mx-auto flex max-w-content items-center justify-between gap-4 px-4 py-2 sm:px-6 lg:px-8">
        <p className="hidden md:block">Need HVAC assistance? Our team is ready to help.</p>
        <div className="flex flex-1 items-center justify-between gap-4 md:flex-none md:justify-end">
          <span className="hidden items-center gap-1.5 lg:inline-flex">
            <Clock className="size-3.5 text-brand" aria-hidden="true" />
            {business.hoursShort}
          </span>
          <a href={`tel:${contact.phoneHref}`} className="inline-flex items-center gap-1.5 font-semibold text-white hover:underline">
            <Phone className="size-3.5 text-brand" aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
          <Link
            to="/book-service"
            search={{ urgent: 'yes' }}
            className="rounded-full bg-emergency-strong px-3 py-0.5 text-xs font-bold text-white hover:bg-emergency-strong/90"
          >
            Urgent Service
          </Link>
          <MarketSwitcher className="hidden sm:inline-flex" />
        </div>
      </div>
    </div>
  )
}
