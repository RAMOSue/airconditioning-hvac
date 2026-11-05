import { useEffect, useRef, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import {
  ArrowLeft,
  ArrowRight,
  Building2,
  Check,
  CheckCircle2,
  Home,
  Loader2,
  Pencil,
  Phone,
  Send,
} from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { services, serviceLabel, serviceOptions } from '@/config/services'
import { getMarket, type MarketCode } from '@/config/market'
import { business } from '@/config/business'
import { useMarket } from '@/lib/market-context'
import { submitLead } from '@/lib/submit'
import { emailSchema, formatDate, futureDateSchema, nameSchema, phoneSchema, postalSchema, todayISO } from '@/lib/validation'
import { cn } from '@/lib/utils'
import { ChoiceCard, Field, FieldError, Honeypot, aria, inputClass, selectClass } from './fields'
import { SubmitError } from './SubmitStatus'

const serviceValues = ['air-conditioning-installation', 'hvac-repair', 'hvac-maintenance', 'heating', 'commercial-hvac', 'other'] as const
const sizeValues = ['small', 'medium', 'large', 'unsure'] as const
const contactMethods = [
  { value: 'phone', label: 'Phone call' },
  { value: 'email', label: 'Email' },
  { value: 'either', label: 'Either is fine' },
] as const

export interface QuoteValues {
  service: string
  propertyType: string
  propertySize: string
  units: string
  country: MarketCode
  postal: string
  locality: string
  details: string
  urgent: string
  preferredDate: string
  contactMethod: string
  fullName: string
  email: string
  phone: string
  notes: string
  consent: boolean
}

export type QuotePrefill = Partial<Pick<QuoteValues, 'service' | 'propertyType' | 'propertySize' | 'units' | 'country' | 'postal' | 'locality' | 'details'>>

const steps = [
  { title: 'Service', fields: ['service'] },
  { title: 'Property', fields: ['propertyType', 'propertySize', 'units', 'country', 'postal', 'locality'] },
  { title: 'Details', fields: ['details', 'urgent', 'preferredDate', 'contactMethod'] },
  { title: 'Contact', fields: ['fullName', 'email', 'phone', 'notes', 'consent'] },
  { title: 'Review', fields: [] },
] as const

function schemaFor(step: number, country: MarketCode) {
  const s0 = z.object({ service: z.enum(serviceValues, { error: 'Select the service you need.' }) })
  const s1 = z.object({
    propertyType: z.enum(['Residential', 'Commercial'], { error: 'Select a property type.' }),
    propertySize: z.enum(sizeValues, { error: 'Select a property size, or “Not sure”.' }),
    units: z.string().trim().refine((v) => v === '' || (/^\d{1,3}$/.test(v) && Number(v) >= 1 && Number(v) <= 500), 'Enter a number between 1 and 500, or leave blank.'),
    country: z.enum(['US', 'AU']),
    postal: postalSchema(country),
    locality: z.string().trim().min(2, `Enter your ${getMarket(country).localityLabel.toLowerCase()}.`).max(80),
  })
  const s2 = z.object({
    details: z.string().trim().min(10, 'Please describe your requirements (at least 10 characters).').max(2000, 'Please keep this under 2,000 characters.'),
    urgent: z.enum(['yes', 'no'], { error: 'Let us know whether this is urgent.' }),
    preferredDate: futureDateSchema(false),
    contactMethod: z.enum(['phone', 'email', 'either'], { error: 'Choose how you would like to be contacted.' }),
  })
  const s3 = z.object({
    fullName: nameSchema,
    email: emailSchema,
    phone: phoneSchema(country),
    notes: z.string().max(1000, 'Please keep notes under 1,000 characters.'),
    consent: z.boolean().refine((v) => v, 'Please confirm we may contact you about this request.'),
  })
  const all = [s0, s1, s2, s3]
  if (step < 4) return all[step]
  return s0.merge(s1).merge(s2).merge(s3)
}

export function QuoteWizard({ prefill }: { prefill: QuotePrefill }) {
  const { code, contact } = useMarket()
  const [step, setStep] = useState(prefill.service ? 1 : 0)
  const [maxStep, setMaxStep] = useState(prefill.service ? 1 : 0)
  const [status, setStatus] = useState<'idle' | 'pending' | 'error'>('idle')
  const [result, setResult] = useState<{ reference: string; service: string; contactMethod: string } | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [minDate, setMinDate] = useState<string>()
  const headingRef = useRef<HTMLHeadingElement>(null)
  const stepRef = useRef(step)
  useEffect(() => {
    stepRef.current = step
  }, [step])

  const resolver: Resolver<QuoteValues> = (values, ctx, opts) =>
    zodResolver(schemaFor(stepRef.current, values.country) as never)(values, ctx, opts as never) as never

  const form = useForm<QuoteValues>({
    resolver,
    mode: 'onTouched',
    defaultValues: {
      service: prefill.service ?? '',
      propertyType: prefill.propertyType ?? '',
      propertySize: prefill.propertySize ?? '',
      units: prefill.units ?? '',
      country: prefill.country ?? code,
      postal: prefill.postal ?? '',
      locality: prefill.locality ?? '',
      details: prefill.details ?? '',
      urgent: '',
      preferredDate: '',
      contactMethod: '',
      fullName: '',
      email: '',
      phone: '',
      notes: '',
      consent: false,
    },
  })
  const { register, watch, setValue, formState, trigger, getValues, handleSubmit } = form
  const errors = formState.errors
  const values = watch()
  const market = getMarket(values.country)

  useEffect(() => setMinDate(todayISO()), [])
  // Follow the site-wide market preview unless the URL supplied a country.
  useEffect(() => {
    if (!prefill.country && !formState.dirtyFields.country) setValue('country', code)
  }, [code, prefill.country, formState.dirtyFields.country, setValue])

  const focusHeading = () => requestAnimationFrame(() => headingRef.current?.focus())

  async function next() {
    const ok = await trigger(steps[step].fields as unknown as (keyof QuoteValues)[])
    if (!ok) {
      const first = steps[step].fields.find((f) => errors[f as keyof QuoteValues] || form.getFieldState(f as keyof QuoteValues).invalid)
      if (first) document.getElementById(`q-${first}`)?.focus()
      return
    }
    const n = step + 1
    setStep(n)
    setMaxStep((m) => Math.max(m, n))
    focusHeading()
  }
  function goTo(i: number) {
    if (i > maxStep || status === 'pending') return
    setStep(i)
    setStatus('idle')
    focusHeading()
  }

  const onSubmit = handleSubmit(async (v) => {
    if (status === 'pending') return
    setStatus('pending')
    try {
      const { reference } = await submitLead(
        'quote-request',
        {
          service: serviceLabel(v.service),
          propertyType: v.propertyType,
          propertySize: v.propertySize === 'unsure' ? 'Not sure' : `${v.propertySize} (${getMarket(v.country).propertySizes[v.propertySize as 'small']})`,
          units: v.units,
          country: getMarket(v.country).countryName,
          postal: v.postal,
          locality: v.locality,
          details: v.details,
          urgent: v.urgent,
          preferredDate: v.preferredDate,
          contactMethod: v.contactMethod,
          fullName: v.fullName,
          email: v.email,
          phone: v.phone,
          notes: v.notes,
          consent: v.consent,
          'bot-field': honeypot,
        },
        'CPQ',
      )
      setResult({ reference, service: serviceLabel(v.service), contactMethod: v.contactMethod })
      window.scrollTo({ top: 0 })
      focusHeading()
    } catch {
      setStatus('error')
    }
  })

  if (result) {
    return (
      <div className="rounded-3xl border bg-white p-6 text-center sm:p-12">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="size-9" aria-hidden="true" />
        </span>
        <h2 ref={headingRef} tabIndex={-1} className="mt-6 text-3xl font-extrabold outline-none">
          Thank you — your request has been received
        </h2>
        <p className="mx-auto mt-3 max-w-lg text-lg text-muted-foreground">
          Our team will review your <strong className="text-navy">{result.service}</strong> request and contact you
          {result.contactMethod === 'email' ? ' by email' : result.contactMethod === 'phone' ? ' by phone' : ''}.
        </p>
        <dl className="mx-auto mt-8 grid max-w-md gap-3 text-left sm:grid-cols-2">
          <div className="rounded-xl bg-surface p-4">
            <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Reference</dt>
            <dd className="mt-1 font-mono text-lg font-bold text-navy">{result.reference}</dd>
          </div>
          <div className="rounded-xl bg-surface p-4">
            <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Service</dt>
            <dd className="mt-1 font-bold text-navy">{result.service}</dd>
          </div>
        </dl>
        <div className="mx-auto mt-8 max-w-lg text-left">
          <h3 className="font-bold">What happens next</h3>
          <ol className="mt-3 space-y-2 text-muted-foreground">
            <li className="flex gap-3"><span className="font-bold text-primary">1.</span> Our team reviews the details you provided.</li>
            <li className="flex gap-3"><span className="font-bold text-primary">2.</span> We contact you during business hours ({business.hoursShort}) to discuss your requirements.</li>
            <li className="flex gap-3"><span className="font-bold text-primary">3.</span> If needed, we arrange an assessment and then provide your estimate.</li>
          </ol>
        </div>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="xl" variant="outline">
            <a href={`tel:${contact.phoneHref}`}>
              <Phone /> Call {contact.phoneDisplay}
            </a>
          </Button>
          <Button asChild size="xl">
            <Link to="/">Back to Home</Link>
          </Button>
        </div>
        <p className="mt-6 text-sm text-muted-foreground">Please keep your reference number if you call about this request.</p>
      </div>
    )
  }

  const progress = ((step + 1) / steps.length) * 100

  return (
    <form onSubmit={(e) => { e.preventDefault(); if (step === 4) void onSubmit(e); else void next() }} noValidate className="rounded-3xl border bg-white">
      {/* Progress */}
      <div className="border-b p-5 sm:p-8">
        <p className="text-sm font-semibold text-muted-foreground">
          Step {step + 1} of {steps.length}
        </p>
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-muted" role="progressbar" aria-valuemin={0} aria-valuemax={100} aria-valuenow={Math.round(progress)} aria-label="Form progress">
          <div className="h-full rounded-full bg-primary transition-all motion-reduce:transition-none" style={{ width: `${progress}%` }} />
        </div>
        <ol className="mt-4 grid grid-cols-5 gap-1">
          {steps.map((s, i) => (
            <li key={s.title}>
              <button
                type="button"
                onClick={() => goTo(i)}
                disabled={i > maxStep}
                aria-current={i === step ? 'step' : undefined}
                className={cn(
                  'flex w-full flex-col items-center gap-1.5 rounded-lg py-1 text-xs font-semibold disabled:cursor-not-allowed',
                  i === step ? 'text-primary' : i <= maxStep ? 'text-navy hover:text-primary' : 'text-muted-foreground',
                )}
              >
                <span className={cn('grid size-8 place-items-center rounded-full border-2 text-sm', i < step || (i <= maxStep && i !== step) ? 'border-primary bg-primary text-white' : i === step ? 'border-primary text-primary' : 'border-border')}>
                  {i < step || (i <= maxStep && i !== step) ? <Check className="size-4" aria-hidden="true" /> : i + 1}
                </span>
                <span className="hidden sm:block">{s.title}</span>
              </button>
            </li>
          ))}
        </ol>
      </div>

      <div className="p-5 sm:p-8">
        <Honeypot value={honeypot} onChange={setHoneypot} />

        {step === 0 && (
          <fieldset>
            <legend>
              <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-extrabold outline-none">Select your service</h2>
              <p className="mt-1 text-muted-foreground">Which service are you requesting an estimate for?</p>
            </legend>
            <div className="mt-6 grid gap-3 sm:grid-cols-2" id="q-service" tabIndex={-1}>
              {serviceOptions.map((o) => {
                const svc = services.find((s) => s.slug === o.value)
                const Icon = svc?.icon
                return (
                  <ChoiceCard
                    key={o.value}
                    name="service"
                    value={o.value}
                    checked={values.service === o.value}
                    onChange={(v) => setValue('service', v, { shouldValidate: true, shouldDirty: true })}
                    title={o.label}
                    description={svc?.cardDescription ?? 'Something else, or not sure which service fits.'}
                    icon={Icon ? <Icon className="size-5" /> : <Pencil className="size-5" />}
                  />
                )
              })}
            </div>
            {errors.service && <div className="mt-3"><FieldError>{errors.service.message}</FieldError></div>}
          </fieldset>
        )}

        {step === 1 && (
          <div className="space-y-6">
            <div>
              <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-extrabold outline-none">Property information</h2>
              <p className="mt-1 text-muted-foreground">Tell us about the property that needs service.</p>
            </div>
            <fieldset>
              <legend className="text-sm font-semibold text-navy">Property type <span className="text-destructive" aria-hidden="true">*</span></legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-2" id="q-propertyType" tabIndex={-1}>
                <ChoiceCard name="propertyType" value="Residential" checked={values.propertyType === 'Residential'} onChange={(v) => setValue('propertyType', v, { shouldValidate: true })} title="Residential" description="House, townhouse, apartment" icon={<Home className="size-5" />} />
                <ChoiceCard name="propertyType" value="Commercial" checked={values.propertyType === 'Commercial'} onChange={(v) => setValue('propertyType', v, { shouldValidate: true })} title="Commercial" description="Office, retail, other business" icon={<Building2 className="size-5" />} />
              </div>
              {errors.propertyType && <div className="mt-2"><FieldError>{errors.propertyType.message}</FieldError></div>}
            </fieldset>
            <fieldset>
              <legend className="text-sm font-semibold text-navy">Property size <span className="text-destructive" aria-hidden="true">*</span></legend>
              <div className="mt-2 grid grid-cols-2 gap-3 sm:grid-cols-4" id="q-propertySize" tabIndex={-1}>
                {sizeValues.map((sz) => (
                  <ChoiceCard
                    key={sz}
                    name="propertySize"
                    value={sz}
                    checked={values.propertySize === sz}
                    onChange={(v) => setValue('propertySize', v, { shouldValidate: true })}
                    title={sz === 'unsure' ? 'Not sure' : sz[0].toUpperCase() + sz.slice(1)}
                    description={sz === 'unsure' ? 'That’s fine' : market.propertySizes[sz]}
                  />
                ))}
              </div>
              {errors.propertySize && <div className="mt-2"><FieldError>{errors.propertySize.message}</FieldError></div>}
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="q-units" label="Number of HVAC units" hint="If known — e.g. 1 outdoor unit and 2 indoor units = 3" error={errors.units?.message}>
                <Input {...aria('q-units', errors.units?.message, true)} {...register('units')} inputMode="numeric" className={inputClass} />
              </Field>
              <Field id="q-country" label="Country" required>
                <select {...aria('q-country')} {...register('country')} className={selectClass}>
                  <option value="US">United States</option>
                  <option value="AU">Australia</option>
                </select>
              </Field>
              <Field id="q-postal" label={market.postalLabel} required hint={market.postalHint} error={errors.postal?.message}>
                <Input {...aria('q-postal', errors.postal?.message, true)} {...register('postal')} inputMode="numeric" autoComplete="postal-code" className={inputClass} />
              </Field>
              <Field id="q-locality" label={market.localityLabel} required error={errors.locality?.message}>
                <Input {...aria('q-locality', errors.locality?.message)} {...register('locality')} autoComplete="address-level2" className={inputClass} />
              </Field>
            </div>
          </div>
        )}

        {step === 2 && (
          <div className="space-y-6">
            <div>
              <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-extrabold outline-none">Service details</h2>
              <p className="mt-1 text-muted-foreground">The more detail you share, the better we can prepare.</p>
            </div>
            <Field id="q-details" label="Describe your requirements" required hint="E.g. system age, symptoms, rooms to cool or heat, error codes" error={errors.details?.message}>
              <Textarea {...aria('q-details', errors.details?.message, true)} {...register('details')} rows={5} className="rounded-lg bg-white text-base md:text-base" />
            </Field>
            <fieldset>
              <legend className="text-sm font-semibold text-navy">Is this an urgent request? <span className="text-destructive" aria-hidden="true">*</span></legend>
              <div className="mt-2 grid gap-3 sm:grid-cols-2" id="q-urgent" tabIndex={-1}>
                <ChoiceCard name="urgent" value="yes" checked={values.urgent === 'yes'} onChange={(v) => setValue('urgent', v, { shouldValidate: true })} title="Yes, it’s urgent" description="System not working or causing discomfort" />
                <ChoiceCard name="urgent" value="no" checked={values.urgent === 'no'} onChange={(v) => setValue('urgent', v, { shouldValidate: true })} title="No, I’m planning ahead" description="Flexible on timing" />
              </div>
              {errors.urgent && <div className="mt-2"><FieldError>{errors.urgent.message}</FieldError></div>}
              {values.urgent === 'yes' && (
                <p className="mt-3 rounded-lg bg-red-50 p-3 text-sm text-red-900">
                  For urgent issues, calling is usually fastest:{' '}
                  <a href={`tel:${contact.phoneHref}`} className="font-bold underline">{contact.phoneDisplay}</a>. Availability depends on business hours.
                </p>
              )}
            </fieldset>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="q-preferredDate" label="Preferred service date" error={errors.preferredDate?.message} hint="A preference only — we’ll confirm availability">
                <Input type="date" min={minDate} {...aria('q-preferredDate', errors.preferredDate?.message, true)} {...register('preferredDate')} className={inputClass} />
              </Field>
              <Field id="q-contactMethod" label="Preferred contact method" required error={errors.contactMethod?.message}>
                <select {...aria('q-contactMethod', errors.contactMethod?.message)} {...register('contactMethod')} className={selectClass}>
                  <option value="">Select…</option>
                  {contactMethods.map((c) => (
                    <option key={c.value} value={c.value}>{c.label}</option>
                  ))}
                </select>
              </Field>
            </div>
          </div>
        )}

        {step === 3 && (
          <div className="space-y-6">
            <div>
              <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-extrabold outline-none">Contact information</h2>
              <p className="mt-1 text-muted-foreground">How can our team reach you about this request?</p>
            </div>
            <div className="grid gap-5 sm:grid-cols-2">
              <Field id="q-fullName" label="Full name" required error={errors.fullName?.message} className="sm:col-span-2">
                <Input {...aria('q-fullName', errors.fullName?.message)} {...register('fullName')} autoComplete="name" className={inputClass} />
              </Field>
              <Field id="q-email" label="Email" required error={errors.email?.message}>
                <Input type="email" {...aria('q-email', errors.email?.message)} {...register('email')} autoComplete="email" className={inputClass} />
              </Field>
              <Field id="q-phone" label="Phone number" required hint={market.phoneHint} error={errors.phone?.message}>
                <Input type="tel" placeholder={market.phonePlaceholder} {...aria('q-phone', errors.phone?.message, true)} {...register('phone')} autoComplete="tel" className={inputClass} />
              </Field>
              <Field id="q-notes" label="Additional notes" error={errors.notes?.message} className="sm:col-span-2" hint="Access instructions, best times to call, pets on site, etc.">
                <Textarea {...aria('q-notes', errors.notes?.message, true)} {...register('notes')} rows={3} className="rounded-lg bg-white text-base md:text-base" />
              </Field>
            </div>
            <div>
              <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-surface p-4">
                <input
                  type="checkbox"
                  id="q-consent"
                  {...register('consent')}
                  aria-invalid={errors.consent ? true : undefined}
                  aria-describedby={errors.consent ? 'q-consent-error' : undefined}
                  className="mt-0.5 size-5 shrink-0 accent-primary"
                />
                <span className="text-sm text-navy">
                  I agree that {business.name} may contact me by phone or email about this request. See our{' '}
                  <Link to="/privacy-policy" className="font-semibold text-primary underline">Privacy Policy</Link>.
                  <span className="text-destructive" aria-hidden="true"> *</span>
                </span>
              </label>
              {errors.consent && <div className="mt-2"><FieldError id="q-consent-error">{errors.consent.message}</FieldError></div>}
            </div>
          </div>
        )}

        {step === 4 && <Review values={getValues()} goTo={goTo} headingRef={headingRef} />}

        {status === 'error' && <div className="mt-6"><SubmitError /></div>}
      </div>

      <div className="flex flex-col-reverse gap-3 border-t p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        {step > 0 ? (
          <Button type="button" variant="outline" size="xl" onClick={() => goTo(step - 1)} disabled={status === 'pending'}>
            <ArrowLeft /> Back
          </Button>
        ) : (
          <span />
        )}
        {step < 4 ? (
          <Button type="submit" size="xl">
            Continue <ArrowRight />
          </Button>
        ) : (
          <Button type="submit" size="xl" disabled={status === 'pending'} aria-busy={status === 'pending'}>
            {status === 'pending' ? (
              <>
                <Loader2 className="animate-spin" /> Sending…
              </>
            ) : (
              <>
                <Send /> Submit My Request
              </>
            )}
          </Button>
        )}
      </div>
    </form>
  )
}

function Review({ values: v, goTo, headingRef }: { values: QuoteValues; goTo: (i: number) => void; headingRef: React.RefObject<HTMLHeadingElement | null> }) {
  const m = getMarket(v.country)
  const sections: { title: string; step: number; rows: [string, string][] }[] = [
    { title: 'Service', step: 0, rows: [['Service', serviceLabel(v.service)]] },
    {
      title: 'Property',
      step: 1,
      rows: [
        ['Property type', v.propertyType],
        ['Size', v.propertySize === 'unsure' ? 'Not sure' : `${v.propertySize[0]?.toUpperCase()}${v.propertySize.slice(1)} (${m.propertySizes[v.propertySize as 'small']})`],
        ['HVAC units', v.units || '—'],
        ['Location', `${v.locality}, ${v.postal}, ${m.countryName}`],
      ],
    },
    {
      title: 'Details',
      step: 2,
      rows: [
        ['Requirements', v.details],
        ['Urgent', v.urgent === 'yes' ? 'Yes' : 'No'],
        ['Preferred date', v.preferredDate ? formatDate(v.preferredDate, m.locale) : 'No preference'],
        ['Contact method', contactMethods.find((c) => c.value === v.contactMethod)?.label ?? ''],
      ],
    },
    {
      title: 'Contact',
      step: 3,
      rows: [
        ['Name', v.fullName],
        ['Email', v.email],
        ['Phone', v.phone],
        ['Notes', v.notes || '—'],
      ],
    },
  ]
  return (
    <div>
      <h2 ref={headingRef} tabIndex={-1} className="text-2xl font-extrabold outline-none">Review and submit</h2>
      <p className="mt-1 text-muted-foreground">Check your details below. You can edit any section before submitting.</p>
      <div className="mt-6 space-y-4">
        {sections.map((s) => (
          <section key={s.title} className="rounded-xl border p-5" aria-labelledby={`review-${s.step}`}>
            <div className="flex items-center justify-between gap-3">
              <h3 id={`review-${s.step}`} className="font-bold">{s.title}</h3>
              <Button type="button" variant="ghost" size="sm" onClick={() => goTo(s.step)} aria-label={`Edit ${s.title.toLowerCase()}`}>
                <Pencil /> Edit
              </Button>
            </div>
            <dl className="mt-3 grid gap-x-6 gap-y-2 text-sm sm:grid-cols-[10rem_1fr]">
              {s.rows.map(([k, val]) => (
                <div key={k} className="contents">
                  <dt className="text-muted-foreground">{k}</dt>
                  <dd className="font-medium break-words whitespace-pre-line text-navy">{val}</dd>
                </div>
              ))}
            </dl>
          </section>
        ))}
      </div>
      <p className="mt-5 text-sm text-muted-foreground">
        Submitting sends your request to our team. It is not a confirmed booking or a final price.
      </p>
    </div>
  )
}
