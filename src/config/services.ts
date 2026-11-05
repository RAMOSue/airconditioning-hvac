import type { LucideIcon } from 'lucide-react'
import { AirVent, Building2, Flame, ShieldCheck, Wrench } from 'lucide-react'
import type { MarketCode } from './market'

export type ServiceSlug =
  | 'air-conditioning-installation'
  | 'hvac-repair'
  | 'hvac-maintenance'
  | 'heating'
  | 'commercial-hvac'

export interface ServiceItem {
  slug: ServiceSlug
  name: string
  /** Optional market-specific display names (e.g. Australian terminology). */
  marketName?: Partial<Record<MarketCode, string>>
  icon: LucideIcon
  image: string
  imageAlt: string
  cardDescription: string
  cardCta: string
  seo: { title: string; description: string }
  headline: string
  intro: string
  overview: string[]
  /** Optional market-specific note shown in the overview. */
  marketNote?: Partial<Record<MarketCode, string>>
  problemsHeading: string
  problems: { title: string; text: string }[]
  features: { title: string; text: string }[]
  process: { title: string; text: string }[]
  faqs: { q: string; a: string }[]
  ctaLabel: string
  ctaText: string
  related: ServiceSlug[]
}

export const services: ServiceItem[] = [
  {
    slug: 'air-conditioning-installation',
    name: 'Air Conditioning Installation',
    icon: AirVent,
    image: '/img/ac-installation.jpg',
    imageAlt: 'Technician levelling a wall-mounted ductless air conditioner in a bright living room',
    cardDescription:
      'Professional air conditioning installation and system replacement for homes and businesses.',
    cardCta: 'Explore Installation',
    seo: {
      title: 'Air Conditioning Installation & Replacement | ClimatePro',
      description:
        'Plan a new air conditioning system or replace an ageing unit. Use the installation estimate assistant and request a free, personalized installation estimate.',
    },
    headline: 'Air Conditioning Installation Planned Around Your Property',
    intro:
      'Whether you are cooling a new build, adding zones to an extension, or replacing a system that has reached the end of its working life, a good installation starts with understanding the space.',
    overview: [
      'Choosing an air conditioning system involves more than picking a unit size. Room layout, insulation, window orientation, existing ductwork, and how each space is used all influence which type of system will work well. Our installation enquiries begin with those details so the recommendation fits the property rather than a generic rule of thumb.',
      'We discuss ducted, ductless (split and multi-split), and packaged options, explain the trade-offs in plain language, and provide a written estimate before any work is scheduled. Replacement projects include a review of the existing equipment so you understand what can be reused and what needs upgrading.',
    ],
    marketNote: {
      AU: 'In Australia, reverse-cycle split and ducted systems are popular because they provide both cooling and heating from one installation.',
    },
    problemsHeading: 'Common reasons customers plan an installation',
    problems: [
      { title: 'Ageing or unreliable system', text: 'Frequent breakdowns or rising repair costs on an older unit.' },
      { title: 'Uneven temperatures', text: 'Some rooms stay warm while others are comfortable.' },
      { title: 'Renovation or extension', text: 'New living space that the current system was never sized for.' },
      { title: 'No existing cooling', text: 'Homes or offices that have relied on fans or portable units.' },
      { title: 'Noisy equipment', text: 'Outdoor or indoor units that have become disruptive.' },
      { title: 'Planning ahead of summer', text: 'Customers who want work completed before peak demand.' },
    ],
    features: [
      { title: 'Site assessment', text: 'Room-by-room review of layout, insulation, and airflow requirements before recommending equipment.' },
      { title: 'System options explained', text: 'Clear comparisons between ducted, ductless, and zoned systems so you can make an informed choice.' },
      { title: 'Written estimate', text: 'An itemized estimate covering equipment, installation, and any electrical or ductwork changes.' },
      { title: 'Tidy installation', text: 'Careful placement of indoor and outdoor units, neat line sets, and a clean work area.' },
      { title: 'Commissioning & walkthrough', text: 'System testing on completion and a walkthrough of controls and thermostat settings.' },
      { title: 'Maintenance guidance', text: 'Advice on filter care and recommended service intervals for the new system.' },
    ],
    process: [
      { title: 'Share your requirements', text: 'Use the estimate assistant or quote form to describe the property and what you need.' },
      { title: 'Property assessment', text: 'Our team reviews the space and existing equipment, on site or by phone first.' },
      { title: 'Receive your estimate', text: 'You receive system options and a written estimate to review at your own pace.' },
      { title: 'Installation & handover', text: 'Once approved, installation is scheduled, completed, tested, and explained.' },
    ],
    faqs: [
      { q: 'How do I know what size system I need?', a: 'System sizing depends on floor area, ceiling height, insulation, windows, local climate, and how rooms are used. The estimate assistant on this page gives a general starting point only — a professional assessment is needed for an accurate recommendation.' },
      { q: 'Can my existing ductwork be reused?', a: 'Often, yes — but it depends on the condition, size, and layout of the ducts. We check this during the assessment and explain whether repairs, sealing, or replacement are advisable.' },
      { q: 'Is a ductless system a good option for my home?', a: 'Ductless systems suit homes without ductwork, extensions, and spaces needing individual room control. Ducted systems may suit whole-home comfort better. We explain both options for your property.' },
      { q: 'Do you provide estimates before starting work?', a: 'Yes. Every installation enquiry receives a written estimate first. No work is scheduled until you have reviewed and approved it.' },
      { q: 'How long does an installation take?', a: 'Timing varies with system type and complexity. A single ductless unit may take a day, while a full ducted replacement can take longer. Your estimate will include an expected timeframe.' },
    ],
    ctaLabel: 'Request an Installation Estimate',
    ctaText: 'Tell us about your property and we will prepare a personalized installation estimate.',
    related: ['hvac-maintenance', 'heating', 'commercial-hvac'],
  },
  {
    slug: 'hvac-repair',
    name: 'HVAC Repair',
    marketName: { AU: 'Air Conditioning Repair' },
    icon: Wrench,
    image: '/img/hvac-repair.jpg',
    imageAlt: 'Technician testing the electrical panel of an outdoor AC unit with a digital multimeter',
    cardDescription: 'Troubleshooting and repair enquiries for heating and cooling equipment.',
    cardCta: 'Explore Repairs',
    seo: {
      title: 'HVAC Repair & Troubleshooting | ClimatePro',
      description:
        'AC not cooling, heater not working, strange noises or weak airflow? Request an HVAC repair and our team will follow up to diagnose the problem.',
    },
    headline: 'Professional HVAC Repair and Troubleshooting',
    intro:
      'When your heating or cooling stops working properly, you want a clear diagnosis and an honest explanation of the options. That is how we approach every repair request.',
    overview: [
      'HVAC faults can range from a tripped safety switch or a blocked condensate line to a failed capacitor, refrigerant leak, or worn blower motor. A structured diagnosis — checking power, controls, airflow, and refrigerant circuits in order — avoids guesswork and unnecessary part replacements.',
      'After diagnosing the issue, we explain what has failed, why it matters, and what the repair involves before any work goes ahead. If a repair is not cost-effective for an older system, we will tell you and outline the alternatives.',
    ],
    problemsHeading: 'Problems we can help troubleshoot',
    problems: [
      { title: 'Air conditioning not cooling', text: 'The system runs but blows warm or barely cool air.' },
      { title: 'Heating system not working', text: 'No heat, intermittent heat, or the furnace will not ignite.' },
      { title: 'Unusual equipment noise', text: 'Grinding, rattling, buzzing, or squealing from indoor or outdoor units.' },
      { title: 'Poor airflow', text: 'Weak air from vents, or rooms that never reach the set temperature.' },
      { title: 'Thermostat problems', text: 'Unresponsive controls, incorrect readings, or short cycling.' },
      { title: 'System performance issues', text: 'Water leaks, ice on lines, unusual smells, or rising energy use.' },
    ],
    features: [
      { title: 'Systematic diagnosis', text: 'Electrical, control, airflow, and refrigerant checks completed in a logical sequence.' },
      { title: 'Explanation before work', text: 'You hear what is wrong and what the repair involves before anything is replaced.' },
      { title: 'Repair vs. replace guidance', text: 'Honest advice when an older system may not justify further repair costs.' },
      { title: 'Most system types', text: 'Enquiries welcome for split systems, ducted systems, heat pumps, and furnaces.' },
      { title: 'Safety checks', text: 'Combustion and electrical safety considered as part of heating and cooling repairs.' },
      { title: 'Clear follow-up', text: 'Notes on what was done and any recommended next steps.' },
    ],
    process: [
      { title: 'Describe the problem', text: 'Tell us what the system is doing, when it started, and any error codes.' },
      { title: 'Team review', text: 'We review your request and contact you to discuss urgency and availability.' },
      { title: 'On-site diagnosis', text: 'A technician inspects the system and explains the fault and repair options.' },
      { title: 'Repair & testing', text: 'Approved repairs are completed and the system is tested before we leave.' },
    ],
    faqs: [
      { q: 'What should I check before requesting a repair?', a: 'Confirm the thermostat is set correctly and has power, check the circuit breaker, and make sure the air filter is not heavily clogged. If the problem continues, switch the system off and request a repair.' },
      { q: 'My air conditioner is running but not cooling. Is that urgent?', a: 'It can indicate a refrigerant, airflow, or electrical issue. Turn the system off if you notice ice on the lines or a burning smell, then contact our team so we can discuss next steps.' },
      { q: 'Do you repair all brands?', a: 'We accept repair enquiries for most common residential and light-commercial brands. Let us know the make and model when you submit your request so we can prepare.' },
      { q: 'Will I know the cost before the repair is done?', a: 'Yes. After diagnosis, the technician explains the repair and its cost. Work proceeds only once you approve it.' },
      { q: 'Should I repair or replace my system?', a: 'It depends on the system’s age, condition, repair cost, and efficiency. We provide an honest recommendation, but the decision is always yours.' },
    ],
    ctaLabel: 'Request an HVAC Repair',
    ctaText: 'Describe the issue and our team will contact you to discuss the next available appointment.',
    related: ['hvac-maintenance', 'heating', 'air-conditioning-installation'],
  },
  {
    slug: 'hvac-maintenance',
    name: 'HVAC Maintenance',
    marketName: { AU: 'Air Conditioning Servicing' },
    icon: ShieldCheck,
    image: '/img/hvac-maintenance.jpg',
    imageAlt: 'Technician replacing a pleated air filter in a residential air handler',
    cardDescription: 'Preventive maintenance and seasonal system servicing.',
    cardCta: 'Explore Maintenance',
    seo: {
      title: 'HVAC Maintenance & Seasonal Servicing | ClimatePro',
      description:
        'Preventive HVAC maintenance and seasonal servicing for heating and cooling systems. Book a maintenance visit or explore maintenance plan options.',
    },
    headline: 'Preventive HVAC Maintenance and Seasonal Servicing',
    intro:
      'Regular servicing gives a technician the chance to spot wear, clean critical components, and check operation before small issues become bigger ones.',
    overview: [
      'Heating and cooling equipment works hardest at the start of summer and winter. A pre-season service checks electrical connections, cleans coils and filters, clears condensate drains, and confirms the system is cycling correctly — the kind of work that is easy to overlook until something stops.',
      'Maintenance visits also create a record of your system’s condition over time. That history makes future repair or replacement decisions easier and can help with manufacturer warranty requirements where regular servicing is specified.',
    ],
    problemsHeading: 'Signs your system is due for servicing',
    problems: [
      { title: 'No service in over a year', text: 'Most systems benefit from at least annual professional servicing.' },
      { title: 'Dusty or musty air', text: 'Dirty filters, coils, or drains can affect indoor air quality.' },
      { title: 'Longer run times', text: 'The system takes longer than usual to reach the set temperature.' },
      { title: 'Higher energy bills', text: 'Energy use creeping up without a change in usage habits.' },
      { title: 'Seasonal changeover', text: 'Preparing cooling before summer or heating before winter.' },
      { title: 'Warranty requirements', text: 'Manufacturer terms that recommend documented maintenance.' },
    ],
    features: [
      { title: 'Filter & coil care', text: 'Filter check or replacement and cleaning of accessible coils.' },
      { title: 'Electrical inspection', text: 'Check of connections, capacitors, contactors, and controls.' },
      { title: 'Drainage check', text: 'Condensate lines and trays inspected and cleared where needed.' },
      { title: 'Performance review', text: 'Temperature split, airflow, and cycling checked against expectations.' },
      { title: 'Written service notes', text: 'A summary of findings and any recommended follow-up work.' },
      { title: 'Reminder scheduling', text: 'Optional reminders so the next seasonal service is not forgotten.' },
    ],
    process: [
      { title: 'Request a service', text: 'Book a maintenance visit online or enquire about a maintenance plan.' },
      { title: 'Confirm a time', text: 'Our team contacts you to confirm the appointment window.' },
      { title: 'Service visit', text: 'Your system is inspected, cleaned, and tested.' },
      { title: 'Findings & next steps', text: 'You receive service notes and recommendations, if any.' },
    ],
    faqs: [
      { q: 'How often should my HVAC system be serviced?', a: 'A common recommendation is at least once a year, with many households servicing cooling before summer and heating before winter. Your manufacturer’s guidance and usage should also be considered.' },
      { q: 'How often should I change my air filter?', a: 'It varies with filter type, pets, and usage — typically every one to three months for disposable filters. Washable filters in split systems should be cleaned regularly.' },
      { q: 'Does maintenance guarantee my system won’t break down?', a: 'No. Maintenance can help identify potential issues early, but it cannot guarantee against future faults or failures.' },
      { q: 'What is the difference between a service and a maintenance plan?', a: 'A service is a single visit. A maintenance plan is an ongoing arrangement for scheduled visits and reminders. Explore the illustrative plan options on our Maintenance Plans page.' },
    ],
    ctaLabel: 'Book a Maintenance Visit',
    ctaText: 'Request a seasonal service or ask about ongoing maintenance options.',
    related: ['hvac-repair', 'heating', 'commercial-hvac'],
  },
  {
    slug: 'heating',
    name: 'Heating Services',
    icon: Flame,
    image: '/img/heating.jpg',
    imageAlt: 'Technician inspecting a high-efficiency gas furnace with a flashlight in a basement utility room',
    cardDescription: 'Heating system inspections, repairs, and installation enquiries.',
    cardCta: 'Explore Heating',
    seo: {
      title: 'Heating Repair, Inspection & Installation | ClimatePro',
      description:
        'Furnace, heat pump, and reverse-cycle heating inspections, repairs, and installation enquiries. Request heating service before the cold sets in.',
    },
    headline: 'Heating Inspections, Repairs, and Installations',
    intro:
      'A dependable heating system matters most on the coldest days. We help customers keep existing systems running safely and plan replacements when the time comes.',
    overview: [
      'Heating systems vary widely — gas furnaces, heat pumps, ducted gas heating, hydronic systems, and reverse-cycle air conditioners all work differently. We start by identifying the type of system you have and how it is performing, then recommend inspection, repair, or replacement based on what we find.',
      'For fuel-burning appliances, inspections include checks related to safe combustion and venting. For heat pumps and reverse-cycle systems, we look at defrost operation, refrigerant performance, and airflow so the system delivers heat efficiently in cooler weather.',
    ],
    marketNote: {
      US: 'Common US heating systems include gas furnaces, heat pumps, and dual-fuel setups paired with central air.',
      AU: 'Heating services differ across Australia. Depending on your region and system, this may include reverse-cycle air conditioning, ducted gas heating, or other systems — let us know what you have.',
    },
    problemsHeading: 'Heating issues customers ask us about',
    problems: [
      { title: 'No heat or not enough heat', text: 'The system runs but the home stays cold.' },
      { title: 'Furnace won’t ignite', text: 'Pilot, igniter, or flame sensor issues on gas systems.' },
      { title: 'Heat pump icing up', text: 'Heavy frost that does not clear during defrost cycles.' },
      { title: 'Frequent cycling', text: 'The heater turns on and off more often than it should.' },
      { title: 'Unusual smells or sounds', text: 'Burning odors, banging, or whistling during operation.' },
      { title: 'Planning a replacement', text: 'Older systems that are becoming unreliable or inefficient.' },
    ],
    features: [
      { title: 'Pre-winter inspections', text: 'Seasonal checks to confirm safe and reliable operation.' },
      { title: 'Furnace & heat pump repair', text: 'Diagnosis and repair enquiries for common heating systems.' },
      { title: 'Safety-focused checks', text: 'Attention to combustion, venting, and electrical safety.' },
      { title: 'Thermostat & controls', text: 'Programming, replacement, and troubleshooting of heating controls.' },
      { title: 'Replacement planning', text: 'Options and estimates for replacing ageing heating equipment.' },
      { title: 'Combined heating & cooling', text: 'Guidance on systems that provide both, such as heat pumps.' },
    ],
    process: [
      { title: 'Tell us about your system', text: 'Share the heating type, its age if known, and what is happening.' },
      { title: 'Request review', text: 'Our team reviews the details and contacts you to arrange a visit.' },
      { title: 'Inspection or diagnosis', text: 'A technician assesses the system and explains the findings.' },
      { title: 'Agreed next steps', text: 'Repairs, servicing, or replacement options proceed once approved.' },
    ],
    faqs: [
      { q: 'When should I have my heating inspected?', a: 'Ideally before the cold season begins, so any issues can be addressed before you rely on the system daily.' },
      { q: 'I smell gas. What should I do?', a: 'Leave the property immediately and contact your gas utility or emergency services from a safe location. Do not use switches or open flames. An HVAC enquiry form is not the right channel for a suspected gas leak.' },
      { q: 'Is a heat pump suitable for my climate?', a: 'Modern heat pumps work in a wide range of climates, but suitability depends on local temperatures, the home, and the specific equipment. We can discuss whether one is a good fit.' },
      { q: 'Can you work on reverse-cycle air conditioners?', a: 'Yes, reverse-cycle systems can be included in heating enquiries. Tell us the make and model where possible.' },
    ],
    ctaLabel: 'Request Heating Service',
    ctaText: 'Tell us about your heating system and we will follow up to arrange an inspection or repair.',
    related: ['hvac-repair', 'hvac-maintenance', 'air-conditioning-installation'],
  },
  {
    slug: 'commercial-hvac',
    name: 'Commercial HVAC',
    icon: Building2,
    image: '/img/commercial-hvac.jpg',
    imageAlt: 'Technician in safety gear walking between rooftop HVAC units on a city office building',
    cardDescription:
      'Heating and cooling solutions for offices, retail spaces, and commercial properties.',
    cardCta: 'Explore Commercial Services',
    seo: {
      title: 'Commercial HVAC Services for Offices & Retail | ClimatePro',
      description:
        'Commercial HVAC maintenance, repair, and upgrade enquiries for offices, retail stores, and commercial properties. Request a commercial service consultation.',
    },
    headline: 'Commercial HVAC for Offices, Retail, and Property Portfolios',
    intro:
      'In a commercial building, heating and cooling affects staff comfort, customer experience, and sometimes stock or equipment. Planned maintenance and responsive repairs help keep disruption to a minimum.',
    overview: [
      'Commercial systems — rooftop packaged units, split and VRF systems, air handlers, and building controls — need a maintenance approach scaled to the property. We work with business owners and property managers to understand operating hours, access requirements, and which spaces are most critical.',
      'For property managers with multiple sites, we can coordinate scheduled maintenance, keep service notes organized by location, and provide upgrade options when equipment approaches the end of its service life.',
    ],
    problemsHeading: 'Challenges commercial clients bring to us',
    problems: [
      { title: 'Hot and cold zones', text: 'Uneven comfort across open-plan offices or retail floors.' },
      { title: 'Rooftop unit failures', text: 'Packaged units that trip, short cycle, or stop cooling.' },
      { title: 'Ageing equipment', text: 'Systems nearing end of life that need a replacement plan.' },
      { title: 'Tenant comfort complaints', text: 'Recurring issues reported to property managers.' },
      { title: 'Maintenance compliance', text: 'Lease or warranty requirements for documented servicing.' },
      { title: 'Fit-outs & refurbishments', text: 'Layout changes that affect airflow and system capacity.' },
    ],
    features: [
      { title: 'Planned maintenance', text: 'Scheduled servicing aligned with your operating hours and access needs.' },
      { title: 'Multi-site coordination', text: 'Organized service records and scheduling across locations.' },
      { title: 'Repair enquiries', text: 'Diagnosis of rooftop units, split systems, and air handlers.' },
      { title: 'Upgrade planning', text: 'Replacement options and phased upgrade estimates.' },
      { title: 'After-hours scheduling', text: 'Work arranged outside trading hours where it can be accommodated.' },
      { title: 'Clear reporting', text: 'Written findings that support budgeting and planning.' },
    ],
    process: [
      { title: 'Consultation request', text: 'Share the property type, equipment, and your priorities.' },
      { title: 'Site walkthrough', text: 'We review equipment, access, and critical spaces with your team.' },
      { title: 'Service proposal', text: 'Receive a maintenance, repair, or upgrade proposal to review.' },
      { title: 'Ongoing support', text: 'Scheduled visits and reporting, adjusted as your needs change.' },
    ],
    faqs: [
      { q: 'What types of commercial properties do you work with?', a: 'Enquiries are welcome from offices, retail stores, restaurants, medical suites, warehouses with office areas, and multi-tenant buildings.' },
      { q: 'Can maintenance be scheduled outside business hours?', a: 'Where it can be accommodated, we aim to schedule work around your trading hours to minimize disruption. Discuss your requirements when you enquire.' },
      { q: 'Do you work with property managers?', a: 'Yes. We can coordinate with property managers, facility teams, and tenants, and keep service notes organized by site.' },
      { q: 'Can you help plan a phased equipment upgrade?', a: 'Yes. We can assess existing equipment and outline a phased replacement approach to help with budgeting.' },
    ],
    ctaLabel: 'Request a Commercial Consultation',
    ctaText: 'Tell us about your property and HVAC requirements to start a commercial service conversation.',
    related: ['hvac-maintenance', 'hvac-repair', 'air-conditioning-installation'],
  },
]

export function getService(slug: string) {
  return services.find((s) => s.slug === slug)
}

export function serviceName(service: ServiceItem, market: MarketCode) {
  return service.marketName?.[market] ?? service.name
}

/** Options used in quote, booking, and contact forms. */
export const serviceOptions = [
  ...services.map((s) => ({ value: s.slug as string, label: s.name })),
  { value: 'other', label: 'Other' },
]

export function serviceLabel(value: string) {
  return serviceOptions.find((o) => o.value === value)?.label ?? value
}
