import { useState, type FormEvent } from 'react'
import { Link } from '@tanstack/react-router'
import { ArrowRight, Building2, Calculator, ClipboardCheck, Home, Info, Minus, Plus, RotateCcw } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { estimatorConfig, existingSystems, installationTypes } from '@/config/estimator'
import { formatCurrency, getMarket, type MarketCode } from '@/config/market'
import { useMarket } from '@/lib/market-context'
import { ChoiceCard, Field, aria, inputClass, selectClass } from './fields'

type Size = 'small' | 'medium' | 'large' | 'unsure'

interface EstimatorState {
  propertyType: 'Residential' | 'Commercial'
  size: Size
  zones: number
  installType: (typeof installationTypes)[number]['value']
  existing: (typeof existingSystems)[number]['value']
  country: MarketCode
  postal: string
}

interface Recommendation {
  systemType: string
  rationale: string
  complexity: 'Standard' | 'Moderate' | 'Complex'
  checks: string[]
  priceRange?: string
}

function recommend(s: EstimatorState): Recommendation {
  const market = getMarket(s.country)
  const au = s.country === 'AU'
  const hasDucts = s.existing === 'ducted-working' || s.existing === 'ducted-failing'
  const checks = ['Room-by-room cooling requirements', 'Electrical supply and circuit capacity']
  let systemType: string
  let rationale: string

  if (s.propertyType === 'Commercial') {
    systemType = s.zones >= 4 ? 'Packaged rooftop or VRF system (consultation)' : 'Commercial split or multi-split system'
    rationale = 'Commercial spaces usually need a consultation to review occupancy, operating hours, and existing plant.'
    checks.push('Roof or plant room access', 'Building controls and zoning')
  } else if (hasDucts && s.zones >= 3) {
    systemType = au ? 'Ducted reverse-cycle system' : 'Central air / ducted system with zoning'
    rationale = 'Existing ductwork and multiple zones often suit a ducted system, subject to the ducts’ condition.'
    checks.push('Ductwork condition, sizing, and sealing')
  } else if (s.zones <= 2) {
    systemType = au ? 'Split system (reverse-cycle)' : 'Ductless mini-split system'
    rationale = 'One or two zones are commonly served by individual wall-mounted indoor units.'
    checks.push('Indoor and outdoor unit placement')
  } else {
    systemType = au ? 'Multi-split or ducted reverse-cycle system' : 'Multi-zone ductless or new ducted system'
    rationale = 'Several zones without suitable ductwork can be served by multi-split units or a new ducted layout.'
    checks.push('Ceiling or roof space for ducting', 'Indoor and outdoor unit placement')
  }

  if (s.installType === 'replacement' || s.existing === 'ducted-failing') checks.push('Removal and disposal of existing equipment')
  if (s.size === 'unsure') checks.push(`Measurement of conditioned floor area (${market.areaUnit})`)

  const score = (s.zones >= 5 ? 2 : s.zones >= 3 ? 1 : 0) + (s.propertyType === 'Commercial' ? 2 : 0) + (s.size === 'large' ? 1 : 0) + (s.installType === 'new' && !hasDucts && s.zones >= 3 ? 1 : 0)
  const complexity = score >= 3 ? 'Complex' : score >= 1 ? 'Moderate' : 'Standard'

  let priceRange: string | undefined
  if (estimatorConfig.pricing.enabled) {
    const { low, high } = estimatorConfig.pricing.perZone[s.country]
    const mult = s.propertyType === 'Commercial' ? estimatorConfig.pricing.commercialMultiplier : 1
    priceRange = `${formatCurrency(low * s.zones * mult, market)} – ${formatCurrency(high * s.zones * mult, market)} ${market.currency}`
  }

  return { systemType, rationale, complexity, checks, priceRange }
}

export function InstallEstimator() {
  const { code } = useMarket()
  // `country: null` follows the site-wide market preview until the visitor picks one here.
  const [raw, setState] = useState<Omit<EstimatorState, 'country'> & { country: MarketCode | null }>({
    propertyType: 'Residential',
    size: 'medium',
    zones: 2,
    installType: 'new',
    existing: 'none',
    country: null,
    postal: '',
  })
  const [result, setResult] = useState<Recommendation | null>(null)
  const [postalError, setPostalError] = useState<string>()

  const state: EstimatorState = { ...raw, country: raw.country ?? code }

  const market = getMarket(state.country)
  const set = <K extends keyof EstimatorState>(key: K, value: EstimatorState[K]) => {
    setState((s) => ({ ...s, [key]: value }))
    setResult(null)
  }

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    if (state.postal && !market.postalPattern.test(state.postal.trim())) {
      setPostalError(`Enter a valid ${market.postalLabel} (${market.postalHint}).`)
      return
    }
    setPostalError(undefined)
    setResult(recommend(state))
    requestAnimationFrame(() => document.getElementById('estimate-result')?.focus())
  }

  const sizeLabel = state.size === 'unsure' ? 'Not sure' : market.propertySizes[state.size]
  const summary = `Installation estimate assistant: ${state.propertyType}, ${sizeLabel}, ${state.zones} room(s)/zone(s), ${installationTypes.find((t) => t.value === state.installType)?.label}, existing: ${existingSystems.find((t) => t.value === state.existing)?.label}.${result ? ` Suggested starting point: ${result.systemType}.` : ''}`

  return (
    <div className="grid gap-8 lg:grid-cols-5">
      <form onSubmit={onSubmit} className="space-y-7 rounded-3xl border bg-white p-6 sm:p-8 lg:col-span-3" noValidate>
        <fieldset>
          <legend className="text-sm font-semibold text-navy">1. Property type</legend>
          <div className="mt-2 grid gap-3 sm:grid-cols-2">
            <ChoiceCard name="est-property" value="Residential" checked={state.propertyType === 'Residential'} onChange={() => set('propertyType', 'Residential')} title="Residential" description="House, townhouse, apartment" icon={<Home className="size-5" />} />
            <ChoiceCard name="est-property" value="Commercial" checked={state.propertyType === 'Commercial'} onChange={() => set('propertyType', 'Commercial')} title="Commercial" description="Office, retail, other business" icon={<Building2 className="size-5" />} />
          </div>
        </fieldset>

        <fieldset>
          <legend className="text-sm font-semibold text-navy">2. Property size</legend>
          <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4">
            {(['small', 'medium', 'large', 'unsure'] as Size[]).map((sz) => (
              <ChoiceCard
                key={sz}
                name="est-size"
                value={sz}
                checked={state.size === sz}
                onChange={() => set('size', sz)}
                title={sz === 'unsure' ? 'Not sure' : sz[0].toUpperCase() + sz.slice(1)}
                description={sz === 'unsure' ? 'We can measure' : market.propertySizes[sz]}
              />
            ))}
          </div>
        </fieldset>

        <div className="grid gap-1.5">
          <span id="zones-label" className="text-sm font-semibold text-navy">3. Number of rooms or zones to cool</span>
          <div className="flex items-center gap-3" role="group" aria-labelledby="zones-label">
            <Button type="button" variant="outline" size="icon-lg" onClick={() => set('zones', Math.max(1, state.zones - 1))} aria-label="Decrease rooms or zones">
              <Minus />
            </Button>
            <output aria-live="polite" className="w-16 text-center text-2xl font-extrabold text-navy">
              {state.zones}
              {state.zones >= 12 ? '+' : ''}
            </output>
            <Button type="button" variant="outline" size="icon-lg" onClick={() => set('zones', Math.min(12, state.zones + 1))} aria-label="Increase rooms or zones">
              <Plus />
            </Button>
          </div>
        </div>

        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="est-install" label="4. Installation type" required>
            <select {...aria('est-install')} className={selectClass} value={state.installType} onChange={(e) => set('installType', e.target.value as EstimatorState['installType'])}>
              {installationTypes.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </Field>
          <Field id="est-existing" label="5. Existing system status" required>
            <select {...aria('est-existing')} className={selectClass} value={state.existing} onChange={(e) => set('existing', e.target.value as EstimatorState['existing'])}>
              {existingSystems.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </Field>
          <Field id="est-country" label="6. Country" required>
            <select {...aria('est-country')} className={selectClass} value={state.country} onChange={(e) => { set('country', e.target.value as MarketCode); setPostalError(undefined) }}>
              <option value="US">United States</option>
              <option value="AU">Australia</option>
            </select>
          </Field>
          <Field id="est-postal" label={market.postalLabel} hint={market.postalHint} error={postalError}>
            <Input
              {...aria('est-postal', postalError, true)}
              className={inputClass}
              inputMode="numeric"
              autoComplete="postal-code"
              value={state.postal}
              onChange={(e) => set('postal', e.target.value)}
            />
          </Field>
        </div>

        <Button type="submit" size="xl" className="w-full sm:w-auto">
          <Calculator /> See My Recommendation
        </Button>
      </form>

      <div className="lg:col-span-2">
        <div
          id="estimate-result"
          tabIndex={-1}
          aria-live="polite"
          className="sticky top-28 rounded-3xl bg-navy p-6 text-white outline-none sm:p-8"
        >
          {result ? (
            <>
              <p className="eyebrow text-brand">Indicative recommendation</p>
              <h3 className="mt-3 text-2xl font-extrabold text-white">{result.systemType}</h3>
              <p className="mt-3 leading-relaxed text-slate-300">{result.rationale}</p>
              <dl className="mt-6 grid grid-cols-2 gap-3 text-sm">
                <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <dt className="text-slate-400">Rooms / zones</dt>
                  <dd className="mt-0.5 text-lg font-bold">{state.zones}</dd>
                </div>
                <div className="rounded-xl bg-white/5 p-3 ring-1 ring-white/10">
                  <dt className="text-slate-400">Project complexity</dt>
                  <dd className="mt-0.5 text-lg font-bold">{result.complexity}</dd>
                </div>
              </dl>
              <h4 className="mt-6 flex items-center gap-2 text-sm font-bold text-white">
                <ClipboardCheck className="size-4 text-brand" aria-hidden="true" /> What an assessment would review
              </h4>
              <ul className="mt-2 space-y-1.5 text-sm text-slate-300">
                {result.checks.map((c) => (
                  <li key={c} className="flex gap-2"><span className="text-brand" aria-hidden="true">•</span>{c}</li>
                ))}
              </ul>
              <div className="mt-6 rounded-xl bg-white/10 p-4 text-sm">
                {result.priceRange ? (
                  <>
                    <p className="font-bold text-white">Illustrative range: {result.priceRange}</p>
                    <p className="mt-1 text-slate-300">Example figures configured by the business — not a quote.</p>
                  </>
                ) : (
                  <p className="text-slate-200">
                    Your installation requirements will be reviewed by our team. Request a personalized estimate for accurate pricing.
                  </p>
                )}
              </div>
              <Button asChild size="xl" variant="light" className="mt-6 w-full whitespace-normal">
                <Link
                  to="/get-a-quote"
                  search={{
                    service: 'air-conditioning-installation',
                    propertyType: state.propertyType,
                    size: state.size,
                    units: String(state.zones),
                    country: state.country,
                    postal: state.postal || undefined,
                    details: summary,
                  }}
                >
                  Get My Free Installation Estimate <ArrowRight />
                </Link>
              </Button>
              <button type="button" onClick={() => setResult(null)} className="mt-3 inline-flex w-full items-center justify-center gap-1.5 rounded text-sm text-slate-300 hover:text-white">
                <RotateCcw className="size-3.5" aria-hidden="true" /> Adjust answers
              </button>
            </>
          ) : (
            <>
              <Calculator className="size-10 text-brand" aria-hidden="true" />
              <h3 className="mt-4 text-xl font-bold text-white">Your recommendation will appear here</h3>
              <p className="mt-2 leading-relaxed text-slate-300">
                Answer six quick questions to see a suggested starting point for your installation and what a professional
                assessment would review.
              </p>
            </>
          )}
        </div>
      </div>

      <div className="rounded-2xl border bg-surface p-5 text-sm text-muted-foreground lg:col-span-5">
        <p className="flex items-center gap-2 font-bold text-navy">
          <Info className="size-4 text-primary" aria-hidden="true" /> About this estimate assistant
        </p>
        <ul className="mt-2 grid gap-1.5 sm:grid-cols-2">
          {estimatorConfig.assumptions.map((a) => (
            <li key={a} className="flex gap-2"><span aria-hidden="true">•</span>{a}</li>
          ))}
          <li className="flex gap-2"><span aria-hidden="true">•</span>This tool is not a substitute for a professional HVAC assessment.</li>
        </ul>
      </div>
    </div>
  )
}
