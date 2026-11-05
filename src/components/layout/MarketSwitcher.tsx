import { useMarket } from '@/lib/market-context'
import type { MarketCode } from '@/config/market'
import { cn } from '@/lib/utils'

const options: { code: MarketCode; label: string; full: string }[] = [
  { code: 'US', label: 'US', full: 'United States' },
  { code: 'AU', label: 'AU', full: 'Australia' },
]

/** Lets portfolio visitors preview the site's US and Australian configurations. */
export function MarketSwitcher({ tone = 'dark', className }: { tone?: 'dark' | 'light'; className?: string }) {
  const { code, setMarket } = useMarket()
  return (
    <div role="group" aria-label="Preview market" className={cn('inline-flex items-center gap-1 rounded-full p-0.5', tone === 'dark' ? 'bg-white/10' : 'bg-muted', className)}>
      {options.map((o) => (
        <button
          key={o.code}
          type="button"
          aria-pressed={code === o.code}
          aria-label={`Show ${o.full} configuration`}
          onClick={() => setMarket(o.code)}
          className={cn(
            'rounded-full px-2.5 py-0.5 text-xs font-bold transition-colors',
            code === o.code
              ? 'bg-brand text-white'
              : tone === 'dark'
                ? 'text-slate-300 hover:text-white'
                : 'text-muted-foreground hover:text-navy',
          )}
        >
          {o.label}
        </button>
      ))}
    </div>
  )
}
