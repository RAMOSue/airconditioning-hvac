/**
 * Market definitions for the United States and Australia.
 *
 * Everything that differs between markets — currency, postal codes, phone
 * formats, temperature units, regional terminology — lives here so pages never
 * hard-code one country's conventions.
 */

export type MarketCode = 'US' | 'AU'

export interface MarketConfig {
  code: MarketCode
  countryName: string
  currency: 'USD' | 'AUD'
  currencySymbol: string
  locale: string
  temperatureUnit: '°F' | '°C'
  measurementSystem: 'imperial' | 'metric'
  areaUnit: 'sq ft' | 'm²'
  /** Field labels */
  postalLabel: 'ZIP code' | 'Postcode'
  regionLabel: 'State' | 'State or territory'
  localityLabel: 'City' | 'Suburb'
  postalPattern: RegExp
  postalHint: string
  phonePattern: RegExp
  phonePlaceholder: string
  phoneHint: string
  /** Industry terminology */
  terms: {
    industry: string // "HVAC" vs "air conditioning"
    repairShort: string
    installation: string
    heatingAndCooling: string
  }
  regions: string[]
  /** Illustrative property size buckets shown in forms and the estimator. */
  propertySizes: { small: string; medium: string; large: string }
}

const US: MarketConfig = {
  code: 'US',
  countryName: 'United States',
  currency: 'USD',
  currencySymbol: '$',
  locale: 'en-US',
  temperatureUnit: '°F',
  measurementSystem: 'imperial',
  areaUnit: 'sq ft',
  postalLabel: 'ZIP code',
  regionLabel: 'State',
  localityLabel: 'City',
  postalPattern: /^\d{5}(-\d{4})?$/,
  postalHint: '5-digit ZIP code, e.g. 78701',
  // Accepts (512) 555-0123, 512-555-0123, 5125550123, +1 512 555 0123
  phonePattern: /^(\+?1[\s.-]?)?\(?[2-9]\d{2}\)?[\s.-]?\d{3}[\s.-]?\d{4}$/,
  phonePlaceholder: '(555) 010-0123',
  phoneHint: '10-digit US phone number',
  terms: {
    industry: 'HVAC',
    repairShort: 'AC repair',
    installation: 'AC installation',
    heatingAndCooling: 'heating and cooling',
  },
  regions: [
    'Alabama', 'Alaska', 'Arizona', 'Arkansas', 'California', 'Colorado', 'Connecticut', 'Delaware',
    'District of Columbia', 'Florida', 'Georgia', 'Hawaii', 'Idaho', 'Illinois', 'Indiana', 'Iowa',
    'Kansas', 'Kentucky', 'Louisiana', 'Maine', 'Maryland', 'Massachusetts', 'Michigan', 'Minnesota',
    'Mississippi', 'Missouri', 'Montana', 'Nebraska', 'Nevada', 'New Hampshire', 'New Jersey',
    'New Mexico', 'New York', 'North Carolina', 'North Dakota', 'Ohio', 'Oklahoma', 'Oregon',
    'Pennsylvania', 'Rhode Island', 'South Carolina', 'South Dakota', 'Tennessee', 'Texas', 'Utah',
    'Vermont', 'Virginia', 'Washington', 'West Virginia', 'Wisconsin', 'Wyoming',
  ],
  propertySizes: {
    small: 'Under 1,500 sq ft',
    medium: '1,500–3,000 sq ft',
    large: 'Over 3,000 sq ft',
  },
}

const AU: MarketConfig = {
  code: 'AU',
  countryName: 'Australia',
  currency: 'AUD',
  currencySymbol: '$',
  locale: 'en-AU',
  temperatureUnit: '°C',
  measurementSystem: 'metric',
  areaUnit: 'm²',
  postalLabel: 'Postcode',
  regionLabel: 'State or territory',
  localityLabel: 'Suburb',
  postalPattern: /^\d{4}$/,
  postalHint: '4-digit postcode, e.g. 2000',
  // Accepts 04xx xxx xxx mobiles, (0x) xxxx xxxx landlines and +61 forms
  phonePattern: /^(\+?61[\s-]?|0)[2-478]([\s-]?\d){8}$/,
  phonePlaceholder: '0400 000 000',
  phoneHint: 'Australian mobile or landline, e.g. 0412 345 678',
  terms: {
    industry: 'air conditioning',
    repairShort: 'air conditioning repair',
    installation: 'air conditioning installation',
    heatingAndCooling: 'heating and cooling',
  },
  regions: [
    'Australian Capital Territory', 'New South Wales', 'Northern Territory', 'Queensland',
    'South Australia', 'Tasmania', 'Victoria', 'Western Australia',
  ],
  propertySizes: {
    small: 'Under 140 m²',
    medium: '140–280 m²',
    large: 'Over 280 m²',
  },
}

export const MARKETS: Record<MarketCode, MarketConfig> = { US, AU }

export function getMarket(code: MarketCode): MarketConfig {
  return MARKETS[code]
}

export function formatCurrency(amount: number, market: MarketConfig) {
  return new Intl.NumberFormat(market.locale, {
    style: 'currency',
    currency: market.currency,
    maximumFractionDigits: 0,
  }).format(amount)
}
