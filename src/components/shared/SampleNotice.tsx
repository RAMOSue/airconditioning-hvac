import { Info } from 'lucide-react'
import { business } from '@/config/business'
import { cn } from '@/lib/utils'

/** Small label marking illustrative content. Hidden once real data is configured. */
export function SampleBadge({ children = 'Sample content', className }: { children?: React.ReactNode; className?: string }) {
  if (!business.isSampleData) return null
  return (
    <span className={cn('inline-flex items-center gap-1 rounded-full border border-amber-300 bg-amber-50 px-2.5 py-0.5 text-xs font-semibold text-amber-900', className)}>
      <Info className="size-3" aria-hidden="true" />
      {children}
    </span>
  )
}

export function SampleNotice({ children, className }: { children: React.ReactNode; className?: string }) {
  if (!business.isSampleData) return null
  return (
    <p className={cn('flex items-start gap-2 rounded-lg border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-900', className)}>
      <Info className="mt-0.5 size-4 shrink-0" aria-hidden="true" />
      <span>{children}</span>
    </p>
  )
}
