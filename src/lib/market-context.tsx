import { createContext, useContext, useMemo, useSyncExternalStore, type ReactNode } from 'react'
import { business, type ContactDetails } from '@/config/business'
import { getMarket, type MarketCode, type MarketConfig } from '@/config/market'

interface MarketContextValue {
  code: MarketCode
  market: MarketConfig
  contact: ContactDetails
  setMarket: (code: MarketCode) => void
}

const STORAGE_KEY = 'climatepro-market'
const CHANGE_EVENT = 'climatepro-market-change'

function readStored(): MarketCode {
  try {
    const stored = window.localStorage.getItem(STORAGE_KEY)
    if (stored === 'US' || stored === 'AU') return stored
  } catch {
    // Storage unavailable (privacy mode) — fall back to the default market.
  }
  return business.defaultMarket
}

function subscribe(onChange: () => void) {
  window.addEventListener(CHANGE_EVENT, onChange)
  window.addEventListener('storage', onChange)
  return () => {
    window.removeEventListener(CHANGE_EVENT, onChange)
    window.removeEventListener('storage', onChange)
  }
}

const MarketContext = createContext<MarketContextValue | null>(null)

/**
 * Provides the active market (US or AU). The default comes from
 * `business.defaultMarket`; a visitor's preview choice is remembered in
 * localStorage (server renders the default; the client store syncs after hydration).
 */
export function MarketProvider({ children }: { children: ReactNode }) {
  const code = useSyncExternalStore(subscribe, readStored, () => business.defaultMarket)

  const value = useMemo<MarketContextValue>(
    () => ({
      code,
      market: getMarket(code),
      contact: business.contact[code],
      setMarket: (next) => {
        window.localStorage.setItem(STORAGE_KEY, next)
        window.dispatchEvent(new Event(CHANGE_EVENT))
      },
    }),
    [code],
  )

  return <MarketContext.Provider value={value}>{children}</MarketContext.Provider>
}

export function useMarket() {
  const ctx = useContext(MarketContext)
  if (!ctx) throw new Error('useMarket must be used inside MarketProvider')
  return ctx
}
