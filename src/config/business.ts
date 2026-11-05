import type { MarketCode } from './market'

/**
 * ─────────────────────────────────────────────────────────────────────────
 *  CENTRAL BUSINESS CONFIGURATION
 * ─────────────────────────────────────────────────────────────────────────
 * ClimatePro is a fictional portfolio brand. Every value below is SAMPLE
 * content. To adapt the site for a real HVAC business, replace these values
 * and set `isSampleData` to false. While `isSampleData` is true the site shows
 * "sample content" labels and keeps contact details OUT of structured data.
 */

export interface ContactDetails {
  /** Human-readable phone number */
  phoneDisplay: string
  /** E.164 number used for tel: links */
  phoneHref: string
  email: string
  /** Leave address fields empty until a real address is configured. */
  address: {
    street: string
    locality: string
    region: string
    postalCode: string
  }
  /** Primary city / region the business is based in (shown in copy). */
  baseLocation: string
}

export interface BusinessHours {
  label: string
  hours: string
}

export const business = {
  name: 'ClimatePro',
  tagline: 'Comfort You Can Count On.',
  description:
    'ClimatePro provides residential and commercial heating, ventilation, and air conditioning installation, maintenance, replacement, and repair services.',

  /** Marks every business detail as illustrative. Set false for a real client. */
  isSampleData: true,

  /** Public site URL — used for canonical links, sitemap, and Open Graph. */
  siteUrl: 'https://climatepro-hvac-website.netlify.app',

  /** Default market shown to visitors. Visitors can preview the other market from the footer. */
  defaultMarket: 'US' as MarketCode,

  /** Contact details per market (sample, reserved-for-fiction numbers). */
  contact: {
    US: {
      phoneDisplay: '(512) 555-0142',
      phoneHref: '+15125550142',
      email: 'hello@climatepro.example',
      address: { street: '', locality: '', region: '', postalCode: '' },
      baseLocation: 'Austin, Texas',
    },
    AU: {
      phoneDisplay: '(02) 5550 4321',
      phoneHref: '+61255504321',
      email: 'hello@climatepro.example',
      address: { street: '', locality: '', region: '', postalCode: '' },
      baseLocation: 'Sydney, New South Wales',
    },
  } satisfies Record<MarketCode, ContactDetails>,

  hours: [
    { label: 'Monday – Friday', hours: '7:00 am – 6:00 pm' },
    { label: 'Saturday', hours: '8:00 am – 2:00 pm' },
    { label: 'Sunday', hours: 'Closed' },
  ] satisfies BusinessHours[],
  hoursShort: 'Mon–Fri 7am–6pm · Sat 8am–2pm',

  /**
   * Emergency / after-hours service. Keep `offered: false` unless the business
   * genuinely provides it — the site never promises 24/7 availability otherwise.
   */
  emergency: {
    offered: false,
    note: 'Assistance is available during the business hours listed. After-hours availability depends on the configured business schedule — please call to discuss urgent issues.',
  },

  /** Social profiles. Empty strings render as disabled placeholders. */
  social: {
    facebook: '',
    instagram: '',
    linkedin: '',
    youtube: '',
  },

  /** Year used in the copyright notice. */
  foundedNote: 'Sample portfolio brand',
} as const

export type Business = typeof business

export function hasAddress(details: ContactDetails) {
  const a = details.address
  return Boolean(a.street && a.locality && a.region && a.postalCode)
}
