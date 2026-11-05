import type { LucideIcon } from 'lucide-react'
import {
  Building,
  Home,
  MessageSquareText,
  Settings2,
  ShieldCheck,
  Users,
  Wrench,
} from 'lucide-react'
import type { MarketCode } from './market'

/**
 * Editable homepage and marketing content. All entries are SAMPLE content
 * for the ClimatePro portfolio brand — replace with the client's own.
 */

export const trustIndicators: {
  icon: LucideIcon
  title: string
  text: string
  cta: string
  to: '/services' | '/get-a-quote' | '/book-service'
}[] = [
  {
    icon: Building,
    title: 'For homes and businesses',
    text: 'Solutions for residential and commercial spaces',
    cta: 'Explore services',
    to: '/services',
  },
  {
    icon: MessageSquareText,
    title: 'Clear options, first',
    text: 'Understand the proposed work before it begins',
    cta: 'Request an estimate',
    to: '/get-a-quote',
  },
  {
    icon: Wrench,
    title: 'Help through every stage',
    text: 'Installation, repair, heating, cooling and maintenance',
    cta: 'Book a service',
    to: '/book-service',
  },
]

export const whyChoose: { icon: LucideIcon; title: string; text: string }[] = [
  {
    icon: Users,
    title: 'Professional Service',
    text: 'A customer-focused service request and support experience, from first enquiry to follow-up.',
  },
  {
    icon: MessageSquareText,
    title: 'Clear Communication',
    text: 'Transparent explanations of services, options, and next steps — before any work begins.',
  },
  {
    icon: Home,
    title: 'Residential and Commercial',
    text: 'HVAC solutions matched to different property types, sizes, and requirements.',
  },
  {
    icon: ShieldCheck,
    title: 'Maintenance-Focused',
    text: 'We encourage regular servicing and preventive maintenance to help systems run reliably.',
  },
]

export const processSteps = [
  {
    title: 'Tell us what changed',
    text: 'Share the issue you are noticing or the project you are planning.',
  },
  {
    title: 'Get the options',
    text: 'Discuss the property, your needs and the possible next steps.',
  },
  {
    title: 'Review the estimate',
    text: 'Understand the proposed work and costs before deciding.',
  },
  {
    title: 'Choose what works',
    text: 'If you are ready to proceed, arrange a service time with the team.',
  },
]

/** Illustrative portfolio examples — NOT actual completed ClimatePro projects. */
export const projects = [
  {
    id: 'residential-install',
    category: 'Residential Air Conditioning Installation',
    title: 'A more comfortable two-storey home',
    text: 'Illustrative example: planning separate comfort zones for upstairs and downstairs living.',
    image: '/img/project-residential.jpg',
    imageAlt:
      'Two new outdoor air conditioning condensers on a concrete pad beside a modern home',
  },
  {
    id: 'commercial-upgrade',
    category: 'Commercial HVAC Upgrade',
    title: 'Planning an office HVAC upgrade',
    text: 'Illustrative example: reviewing equipment and planning an upgrade around a working building.',
    image: '/img/project-commercial.jpg',
    imageAlt:
      'Technician reviewing a tablet in a commercial mechanical room with air handling units',
  },
  {
    id: 'maintenance',
    category: 'HVAC Maintenance Project',
    title: 'Preparing a system for the season',
    text: 'Illustrative example: inspecting and cleaning equipment as part of routine maintenance.',
    image: '/img/project-maintenance.jpg',
    imageAlt:
      'Technician cleaning the coil fins of an outdoor air conditioning unit with a brush',
  },
]

/**
 * Add genuine customer feedback here only with permission. Keep this empty
 * until verified reviews are available.
 */
export const testimonials: {
  id: string
  quote: string
  name: string
  context: string
}[] = []

export interface MaintenancePlan {
  id: 'basic' | 'premium' | 'complete'
  name: string
  summary: string
  features: string[]
  /** Illustrative monthly pricing per market. Set to null to show "Pricing on enquiry". */
  illustrativePrice: Record<MarketCode, number | null>
  highlighted?: boolean
  bestFor: string
}

export const maintenancePlans: MaintenancePlan[] = [
  {
    id: 'basic',
    name: 'Basic Care',
    summary:
      'A straightforward starting point for keeping a single system checked.',
    features: [
      'Routine inspection request',
      'Filter maintenance information',
      'System performance review',
    ],
    illustrativePrice: { US: 15, AU: 22 },
    bestFor: 'Single-system homes',
  },
  {
    id: 'premium',
    name: 'Premium Care',
    summary:
      'Seasonal attention for households that rely on heating and cooling year-round.',
    features: [
      'Everything in Basic Care',
      'Expanded maintenance request',
      'Seasonal service reminders',
      'Priority enquiry handling',
    ],
    illustrativePrice: { US: 25, AU: 36 },
    highlighted: true,
    bestFor: 'Year-round comfort',
  },
  {
    id: 'complete',
    name: 'Complete Care',
    summary:
      'Coordinated maintenance for larger homes, multiple systems, or commercial sites.',
    features: [
      'Residential or commercial maintenance enquiries',
      'Scheduled maintenance planning',
      'Dedicated service coordination',
    ],
    illustrativePrice: { US: null, AU: null },
    bestFor: 'Multi-system & commercial',
  },
]

export const planDisclaimer =
  'Plans shown are illustrative concepts for this sample website, not offers of actual services or contractual benefits. Pricing, inclusions, and terms are configured by the business.'

/** Homepage maintenance promotion bullets. */
export const maintenancePromo = {
  planName: 'Premium Care',
  bullets: [
    'Seasonal service reminders',
    'Expanded system inspection request',
    'Priority enquiry handling',
    'Filter and performance guidance',
  ],
}

export const companyValues: {
  icon: LucideIcon
  title: string
  text: string
}[] = [
  {
    icon: MessageSquareText,
    title: 'Explain before we act',
    text: 'Customers should understand the problem and the options before approving any work.',
  },
  {
    icon: Settings2,
    title: 'Right-sized solutions',
    text: 'Recommendations are based on the property and how it is used, not the most expensive option.',
  },
  {
    icon: ShieldCheck,
    title: 'Care for the long term',
    text: 'Regular maintenance and honest advice help systems — and relationships — last.',
  },
]
