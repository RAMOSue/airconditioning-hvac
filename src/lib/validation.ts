import { z } from 'zod'
import { getMarket, type MarketCode } from '@/config/market'

export const countryCodes = ['US', 'AU'] as const

export function phoneSchema(country: MarketCode) {
  const m = getMarket(country)
  return z
    .string()
    .trim()
    .min(1, 'Enter your phone number.')
    .refine((v) => m.phonePattern.test(v), `Enter a valid ${m.countryName === 'Australia' ? 'Australian' : 'US'} phone number (${m.phoneHint}).`)
}

export function postalSchema(country: MarketCode) {
  const m = getMarket(country)
  return z
    .string()
    .trim()
    .min(1, `Enter your ${m.postalLabel}.`)
    .refine((v) => m.postalPattern.test(v), `Enter a valid ${m.postalLabel} (${m.postalHint}).`)
}

export const emailSchema = z.string().trim().min(1, 'Enter your email address.').email('Enter a valid email address, e.g. name@example.com.')
export const nameSchema = z.string().trim().min(2, 'Enter your full name.').max(100, 'Name is too long.')

/** YYYY-MM-DD for today in the visitor's local time zone. */
export function todayISO() {
  const d = new Date()
  return `${d.getFullYear()}-${String(d.getMonth() + 1).padStart(2, '0')}-${String(d.getDate()).padStart(2, '0')}`
}

export const futureDateSchema = (required: boolean) =>
  z
    .string()
    .refine((v) => !required || v.length > 0, 'Choose a preferred date.')
    .refine((v) => !v || v >= todayISO(), 'Choose today or a future date.')

export function formatDate(iso: string, locale: string) {
  if (!iso) return ''
  const [y, m, d] = iso.split('-').map(Number)
  return new Date(y, m - 1, d).toLocaleDateString(locale, { weekday: 'short', day: 'numeric', month: 'short', year: 'numeric' })
}
