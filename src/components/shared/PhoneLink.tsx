import { Phone } from 'lucide-react'
import { useMarket } from '@/lib/market-context'
import { cn } from '@/lib/utils'

export function PhoneLink({ className, showIcon = true, label }: { className?: string; showIcon?: boolean; label?: string }) {
  const { contact } = useMarket()
  return (
    <a href={`tel:${contact.phoneHref}`} className={cn('inline-flex items-center gap-2 rounded font-semibold', className)}>
      {showIcon && <Phone className="size-4" aria-hidden="true" />}
      {label ?? contact.phoneDisplay}
    </a>
  )
}
