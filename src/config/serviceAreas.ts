import type { MarketCode } from './market'

/**
 * SAMPLE service areas. Replace with the client's real coverage.
 * `postalCodes` entries may be exact codes ("78613") or prefixes ending in
 * "*" ("787*"). Matching a postcode only suggests a location is in a listed
 * area — the UI always asks customers to confirm coverage with the team.
 */
export interface ServiceArea {
  id: string
  name: string
  region: string
  postalCodes: string[]
  summary: string
  propertyTypes: ('Residential' | 'Commercial')[]
}

export const serviceAreas: Record<MarketCode, ServiceArea[]> = {
  US: [
    { id: 'austin', name: 'Austin', region: 'Texas', postalCodes: ['787*'], summary: 'Central and surrounding Austin neighborhoods, homes and commercial properties.', propertyTypes: ['Residential', 'Commercial'] },
    { id: 'round-rock', name: 'Round Rock', region: 'Texas', postalCodes: ['78664', '78665', '78681'], summary: 'Residential neighborhoods and business parks in Round Rock.', propertyTypes: ['Residential', 'Commercial'] },
    { id: 'cedar-park', name: 'Cedar Park', region: 'Texas', postalCodes: ['78613'], summary: 'Homes and small businesses across Cedar Park.', propertyTypes: ['Residential', 'Commercial'] },
    { id: 'georgetown', name: 'Georgetown', region: 'Texas', postalCodes: ['78626', '78628', '78633'], summary: 'Residential service enquiries in Georgetown.', propertyTypes: ['Residential'] },
    { id: 'pflugerville', name: 'Pflugerville', region: 'Texas', postalCodes: ['78660', '78691'], summary: 'Residential and light-commercial properties in Pflugerville.', propertyTypes: ['Residential', 'Commercial'] },
    { id: 'san-marcos', name: 'San Marcos', region: 'Texas', postalCodes: ['78666'], summary: 'Selected residential enquiries in San Marcos — call to confirm.', propertyTypes: ['Residential'] },
  ],
  AU: [
    { id: 'sydney-cbd', name: 'Sydney CBD', region: 'New South Wales', postalCodes: ['2000'], summary: 'Commercial offices and apartment buildings in the CBD.', propertyTypes: ['Commercial', 'Residential'] },
    { id: 'parramatta', name: 'Parramatta', region: 'New South Wales', postalCodes: ['2150', '2151'], summary: 'Homes and businesses in and around Parramatta.', propertyTypes: ['Residential', 'Commercial'] },
    { id: 'chatswood', name: 'Chatswood', region: 'New South Wales', postalCodes: ['2067'], summary: 'Residential and retail properties on the North Shore.', propertyTypes: ['Residential', 'Commercial'] },
    { id: 'bondi', name: 'Bondi', region: 'New South Wales', postalCodes: ['2026'], summary: 'Houses and apartments in the eastern suburbs.', propertyTypes: ['Residential'] },
    { id: 'hornsby', name: 'Hornsby', region: 'New South Wales', postalCodes: ['2077'], summary: 'Residential air conditioning enquiries in Hornsby.', propertyTypes: ['Residential'] },
    { id: 'penrith', name: 'Penrith', region: 'New South Wales', postalCodes: ['2750'], summary: 'Homes and commercial sites in Western Sydney.', propertyTypes: ['Residential', 'Commercial'] },
  ],
}

function matchesPostal(code: string, pattern: string) {
  return pattern.endsWith('*') ? code.startsWith(pattern.slice(0, -1)) : code === pattern
}

export function searchServiceAreas(market: MarketCode, query: string): ServiceArea[] {
  const q = query.trim().toLowerCase()
  if (!q) return serviceAreas[market]
  const digits = q.replace(/\s/g, '')
  return serviceAreas[market].filter((area) => {
    if (/^\d+/.test(digits)) {
      const zip = digits.slice(0, market === 'US' ? 5 : 4)
      return area.postalCodes.some((p) =>
        zip.length >= (market === 'US' ? 5 : 4) ? matchesPostal(zip, p) : p.replace('*', '').startsWith(zip) || zip.startsWith(p.replace('*', '')),
      )
    }
    return area.name.toLowerCase().includes(q) || area.region.toLowerCase().includes(q)
  })
}
