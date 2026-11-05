import { useEffect, useState } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowUp, FileText, Phone } from 'lucide-react'
import { useMarket } from '@/lib/market-context'
import { cn } from '@/lib/utils'

/** Sticky mobile call/quote bar and a back-to-top control. */
export function FloatingActions() {
  const { contact } = useMarket()
  const [showTop, setShowTop] = useState(false)

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 700)
    onScroll()
    window.addEventListener('scroll', onScroll, { passive: true })
    return () => window.removeEventListener('scroll', onScroll)
  }, [])

  return (
    <>
      <button
        type="button"
        aria-label="Back to top"
        onClick={() => window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' })}
        className={cn(
          'fixed right-4 bottom-20 z-30 grid size-11 place-items-center rounded-full bg-navy text-white shadow-lg transition-opacity md:right-6 md:bottom-6',
          showTop ? 'opacity-100' : 'pointer-events-none opacity-0',
        )}
        tabIndex={showTop ? 0 : -1}
      >
        <ArrowUp className="size-5" aria-hidden="true" />
      </button>

      <div className="fixed inset-x-0 bottom-0 z-30 grid grid-cols-2 gap-2 border-t bg-white p-2 shadow-[0_-4px_16px_rgba(16,29,53,0.08)] md:hidden">
        <a href={`tel:${contact.phoneHref}`} className="flex h-12 items-center justify-center gap-2 rounded-lg border-2 border-primary font-bold text-primary">
          <Phone className="size-4" aria-hidden="true" /> Call Now
        </a>
        <Link to="/get-a-quote" className="flex h-12 items-center justify-center gap-2 rounded-lg bg-primary font-bold text-white">
          <FileText className="size-4" aria-hidden="true" /> Free Estimate
        </Link>
      </div>
    </>
  )
}
