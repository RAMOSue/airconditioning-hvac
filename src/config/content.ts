import type { LucideIcon } from 'lucide-react'
import {
  Building,
  ClipboardList,
  Headset,
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

export const trustIndicators: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Building, title: 'Residential & Commercial Solutions', text: 'Homes, offices, and retail properties' },
  { icon: ClipboardList, title: 'Professional Service Requests', text: 'Simple online quote and booking requests' },
  { icon: Wrench, title: 'Installation & Maintenance', text: 'From new systems to seasonal servicing' },
  { icon: Headset, title: 'Customer-Focused Support', text: 'Clear communication at every step' },
]

export const whyChoose: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: Users, title: 'Professional Service', text: 'A customer-focused service request and support experience, from first enquiry to follow-up.' },
  { icon: MessageSquareText, title: 'Clear Communication', text: 'Transparent explanations of services, options, and next steps — before any work begins.' },
  { icon: Home, title: 'Residential and Commercial', text: 'HVAC solutions matched to different property types, sizes, and requirements.' },
  { icon: ShieldCheck, title: 'Maintenance-Focused', text: 'We encourage regular servicing and preventive maintenance to help systems run reliably.' },
]

export const processSteps = [
  { title: 'Tell Us What You Need', text: 'Select a service and describe your HVAC issue or project.' },
  { title: 'Submit Your Request', text: 'Provide your contact details and property location.' },
  { title: 'Our Team Reviews Your Request', text: 'The business receives your request and follows up with you.' },
  { title: 'Schedule Your Service', text: 'Confirm the appointment time directly with our team.' },
]

/** Illustrative portfolio examples — NOT actual completed ClimatePro projects. */
export const projects = [
  {
    id: 'residential-install',
    category: 'Residential Air Conditioning Installation',
    title: 'Dual-condenser cooling for a two-storey home',
    text: 'Example scope: replacing a single ageing condenser with two zoned systems so upstairs bedrooms and downstairs living areas can be controlled independently.',
    image: '/img/project-residential.jpg',
    imageAlt: 'Two new outdoor air conditioning condensers on a concrete pad beside a modern home',
  },
  {
    id: 'commercial-upgrade',
    category: 'Commercial HVAC Upgrade',
    title: 'Plant room upgrade for a mid-size office',
    text: 'Example scope: assessing air handling equipment and ductwork, then planning a phased upgrade to reduce disruption to tenants.',
    image: '/img/project-commercial.jpg',
    imageAlt: 'Technician reviewing a tablet in a commercial mechanical room with air handling units',
  },
  {
    id: 'maintenance',
    category: 'HVAC Maintenance Project',
    title: 'Pre-summer coil cleaning and system check',
    text: 'Example scope: cleaning condenser coils, checking electrical components, and reviewing system performance ahead of peak cooling season.',
    image: '/img/project-maintenance.jpg',
    imageAlt: 'Technician cleaning the coil fins of an outdoor air conditioning unit with a brush',
  },
]

/**
 * SAMPLE testimonials — placeholders only. Replace with genuine customer
 * reviews (with permission) before launch. Do not add ratings or counts that
 * are not verifiable.
 */
export const testimonials = [
  { id: 't1', quote: 'The quote request was simple to fill in, and the follow-up call explained our options clearly. We understood exactly what the installation would involve.', name: 'Sample Customer A', context: 'Residential installation enquiry' },
  { id: 't2', quote: 'Our office had uneven temperatures for months. The team walked through the building with us and put together a sensible maintenance plan.', name: 'Sample Customer B', context: 'Commercial maintenance enquiry' },
  { id: 't3', quote: 'I appreciated being told what was wrong before any work was done. No pressure, just a clear explanation and a fair recommendation.', name: 'Sample Customer C', context: 'HVAC repair request' },
  { id: 't4', quote: 'Booking a seasonal service online was easy, and they called to confirm a time that worked for us.', name: 'Sample Customer D', context: 'Seasonal servicing request' },
]

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
    summary: 'A straightforward starting point for keeping a single system checked.',
    features: ['Routine inspection request', 'Filter maintenance information', 'System performance review'],
    illustrativePrice: { US: 15, AU: 22 },
    bestFor: 'Single-system homes',
  },
  {
    id: 'premium',
    name: 'Premium Care',
    summary: 'Seasonal attention for households that rely on heating and cooling year-round.',
    features: ['Everything in Basic Care', 'Expanded maintenance request', 'Seasonal service reminders', 'Priority enquiry handling'],
    illustrativePrice: { US: 25, AU: 36 },
    highlighted: true,
    bestFor: 'Year-round comfort',
  },
  {
    id: 'complete',
    name: 'Complete Care',
    summary: 'Coordinated maintenance for larger homes, multiple systems, or commercial sites.',
    features: ['Residential or commercial maintenance enquiries', 'Scheduled maintenance planning', 'Dedicated service coordination'],
    illustrativePrice: { US: null, AU: null },
    bestFor: 'Multi-system & commercial',
  },
]

export const planDisclaimer =
  'Plans shown are illustrative concepts for this sample website, not offers of actual services or contractual benefits. Pricing, inclusions, and terms are configured by the business.'

/** Homepage maintenance promotion bullets. */
export const maintenancePromo = {
  planName: 'Premium Care',
  bullets: ['Seasonal service reminders', 'Expanded system inspection request', 'Priority enquiry handling', 'Filter and performance guidance'],
}

export const companyValues: { icon: LucideIcon; title: string; text: string }[] = [
  { icon: MessageSquareText, title: 'Explain before we act', text: 'Customers should understand the problem and the options before approving any work.' },
  { icon: Settings2, title: 'Right-sized solutions', text: 'Recommendations are based on the property and how it is used, not the most expensive option.' },
  { icon: ShieldCheck, title: 'Care for the long term', text: 'Regular maintenance and honest advice help systems — and relationships — last.' },
]
