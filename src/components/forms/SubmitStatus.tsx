import { AlertTriangle, Phone } from 'lucide-react'
import { useMarket } from '@/lib/market-context'

/** Honest failure message — the visitor's input is kept so they can retry. */
export function SubmitError() {
  const { contact } = useMarket()
  return (
    <div role="alert" className="flex gap-3 rounded-xl border border-destructive/30 bg-red-50 p-4 text-sm text-red-900">
      <AlertTriangle className="mt-0.5 size-5 shrink-0 text-destructive" aria-hidden="true" />
      <div>
        <p className="font-bold">Your request was not sent.</p>
        <p className="mt-1">
          Nothing was confirmed as received. Your details are still here — please try again in a moment, or call us on{' '}
          <a href={`tel:${contact.phoneHref}`} className="inline-flex items-center gap-1 font-semibold underline">
            <Phone className="size-3" aria-hidden="true" />
            {contact.phoneDisplay}
          </a>
          .
        </p>
      </div>
    </div>
  )
}
