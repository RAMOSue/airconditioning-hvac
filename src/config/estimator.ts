import type { MarketCode } from './market'

/**
 * Installation estimate assistant settings.
 *
 * ALL rules and figures here are ILLUSTRATIVE assumptions for this sample site.
 * They are not real prices or engineering sizing guidance. A business adopting
 * this site should replace them with its own data — or leave `pricing.enabled`
 * false so visitors are asked to request a personalized estimate instead.
 */
export const estimatorConfig = {
  pricing: {
    /** When false, no price is displayed — only a recommendation. */
    enabled: false,
    /** Example per-zone ranges, used only when `enabled` is true. */
    perZone: {
      US: { low: 2500, high: 4500 },
      AU: { low: 2800, high: 5000 },
    } satisfies Record<MarketCode, { low: number; high: number }>,
    commercialMultiplier: 1.6,
  },
  assumptions: [
    'Recommendations are a general starting point based on the answers provided.',
    'System type suggestions follow simple illustrative rules, not a load calculation.',
    'Actual sizing requires a professional on-site assessment of insulation, windows, orientation, and ductwork.',
    'Any figures shown are illustrative and editable by the business; they are not quotes.',
  ],
}

export const propertyTypes = ['Residential', 'Commercial'] as const
export const installationTypes = [
  { value: 'new', label: 'New installation (no current cooling)' },
  { value: 'replacement', label: 'Replace an existing system' },
  { value: 'addition', label: 'Add cooling to new rooms or an extension' },
  { value: 'unsure', label: 'Not sure yet' },
] as const
export const existingSystems = [
  { value: 'none', label: 'No existing system' },
  { value: 'ducted-working', label: 'Ducted system — still working' },
  { value: 'ducted-failing', label: 'Ducted system — unreliable or not working' },
  { value: 'split', label: 'Split / wall-mounted units' },
  { value: 'portable', label: 'Window or portable units only' },
] as const
