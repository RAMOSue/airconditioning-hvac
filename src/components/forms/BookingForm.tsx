import { useEffect, useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { CalendarCheck2, CheckCircle2, Info, Loader2, Phone, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { serviceLabel, serviceOptions } from '@/config/services'
import { business } from '@/config/business'
import { getMarket, type MarketCode } from '@/config/market'
import { useMarket } from '@/lib/market-context'
import { submitLead } from '@/lib/submit'
import { emailSchema, formatDate, futureDateSchema, nameSchema, phoneSchema, todayISO } from '@/lib/validation'
import { Field, FieldError, Honeypot, aria, inputClass, selectClass } from './fields'
import { SubmitError } from './SubmitStatus'

export const timeWindows = [
  { value: 'morning', label: 'Morning (8am – 12pm)' },
  { value: 'afternoon', label: 'Afternoon (12pm – 4pm)' },
  { value: 'late', label: 'Late afternoon (4pm – 6pm)' },
  { value: 'any', label: 'Any time' },
] as const

interface BookingValues {
  service: string
  fullName: string
  email: string
  phone: string
  country: MarketCode
  address: string
  preferredDate: string
  timeWindow: string
  details: string
  urgent: boolean
  consent: boolean
}

function schema(country: MarketCode) {
  return z.object({
    service: z.string().min(1, 'Select a service category.'),
    fullName: nameSchema,
    email: emailSchema,
    phone: phoneSchema(country),
    country: z.enum(['US', 'AU']),
    address: z.string().trim().min(4, `Enter your address or ${getMarket(country).postalLabel}.`).max(200),
    preferredDate: futureDateSchema(true),
    timeWindow: z.string().min(1, 'Select a preferred time window.'),
    details: z.string().trim().min(10, 'Please describe the HVAC issue (at least 10 characters).').max(2000),
    urgent: z.boolean(),
    consent: z.boolean().refine((v) => v, 'Please confirm we may contact you about this request.'),
  })
}

/**
 * Appointment REQUEST form. Submits through the lead adapter (Netlify Forms by
 * default); a real booking provider can replace the transport in lib/submit.ts.
 */
export function BookingForm({ initialService, urgent }: { initialService?: string; urgent?: boolean }) {
  const { code, contact } = useMarket()
  const [status, setStatus] = useState<'idle' | 'pending' | 'error'>('idle')
  const [done, setDone] = useState<{ reference: string; service: string; date: string; window: string } | null>(null)
  const [honeypot, setHoneypot] = useState('')
  const [minDate, setMinDate] = useState<string>()

  const resolver: Resolver<BookingValues> = (values, ctx, opts) => zodResolver(schema(values.country) as never)(values, ctx, opts as never) as never

  const { register, handleSubmit, formState, setValue, watch } = useForm<BookingValues>({
    resolver,
    mode: 'onTouched',
    defaultValues: {
      service: initialService ?? '',
      fullName: '',
      email: '',
      phone: '',
      country: code,
      address: '',
      preferredDate: '',
      timeWindow: '',
      details: '',
      urgent: urgent ?? false,
      consent: false,
    },
  })
  const errors = formState.errors
  const country = watch('country')
  const isUrgent = watch('urgent')
  const market = getMarket(country)

  useEffect(() => setMinDate(todayISO()), [])
  useEffect(() => {
    if (!formState.dirtyFields.country) setValue('country', code)
  }, [code, formState.dirtyFields.country, setValue])

  const onSubmit = handleSubmit(
    async (v) => {
      if (status === 'pending') return
      setStatus('pending')
      try {
        const windowLabel = timeWindows.find((t) => t.value === v.timeWindow)?.label ?? v.timeWindow
        const { reference } = await submitLead(
          'service-booking',
          {
            service: serviceLabel(v.service),
            fullName: v.fullName,
            email: v.email,
            phone: v.phone,
            country: getMarket(v.country).countryName,
            address: v.address,
            preferredDate: v.preferredDate,
            timeWindow: windowLabel,
            details: v.details,
            urgent: v.urgent,
            consent: v.consent,
            'bot-field': honeypot,
          },
          'CPB',
        )
        setDone({ reference, service: serviceLabel(v.service), date: formatDate(v.preferredDate, getMarket(v.country).locale), window: windowLabel })
        window.scrollTo({ top: 0 })
      } catch {
        setStatus('error')
      }
    },
    (errs) => {
      const first = Object.keys(errs)[0]
      if (first) document.getElementById(`b-${first}`)?.focus()
    },
  )

  if (done) {
    return (
      <div className="rounded-3xl border bg-white p-6 text-center sm:p-12" role="status">
        <span className="mx-auto grid size-16 place-items-center rounded-full bg-success/10 text-success">
          <CheckCircle2 className="size-9" aria-hidden="true" />
        </span>
        <h2 className="mt-6 text-3xl font-extrabold">Appointment request received</h2>
        <p className="mx-auto mt-3 max-w-lg text-lg text-muted-foreground">
          This is not yet a confirmed appointment. Our team will contact you to confirm availability for your preferred time.
        </p>
        <dl className="mx-auto mt-8 grid max-w-xl gap-3 text-left sm:grid-cols-3">
          <div className="rounded-xl bg-surface p-4">
            <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Reference</dt>
            <dd className="mt-1 font-mono font-bold text-navy">{done.reference}</dd>
          </div>
          <div className="rounded-xl bg-surface p-4">
            <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Service</dt>
            <dd className="mt-1 font-bold text-navy">{done.service}</dd>
          </div>
          <div className="rounded-xl bg-surface p-4">
            <dt className="text-xs font-semibold tracking-wider text-muted-foreground uppercase">Requested</dt>
            <dd className="mt-1 text-sm font-bold text-navy">{done.date}<br />{done.window}</dd>
          </div>
        </dl>
        <div className="mt-10 flex flex-col justify-center gap-3 sm:flex-row">
          <Button asChild size="xl" variant="outline">
            <a href={`tel:${contact.phoneHref}`}><Phone /> Call {contact.phoneDisplay}</a>
          </Button>
          <Button asChild size="xl"><Link to="/">Back to Home</Link></Button>
        </div>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="rounded-3xl border bg-white">
      <div className="flex gap-3 rounded-t-3xl border-b bg-brand-soft/70 p-5 sm:px-8">
        <Info className="mt-0.5 size-5 shrink-0 text-primary" aria-hidden="true" />
        <p className="text-sm font-medium text-navy">
          Your preferred appointment time is a request only. Our team will contact you to confirm availability.
        </p>
      </div>
      <div className="space-y-6 p-5 sm:p-8">
        <Honeypot value={honeypot} onChange={setHoneypot} />
        <div className="grid gap-5 sm:grid-cols-2">
          <Field id="b-service" label="Service category" required error={errors.service?.message} className="sm:col-span-2">
            <select {...aria('b-service', errors.service?.message)} {...register('service')} className={selectClass}>
              <option value="">Select a service…</option>
              {serviceOptions.map((o) => (
                <option key={o.value} value={o.value}>{o.label}</option>
              ))}
            </select>
          </Field>
          <Field id="b-fullName" label="Full name" required error={errors.fullName?.message}>
            <Input {...aria('b-fullName', errors.fullName?.message)} {...register('fullName')} autoComplete="name" className={inputClass} />
          </Field>
          <Field id="b-email" label="Email" required error={errors.email?.message}>
            <Input type="email" {...aria('b-email', errors.email?.message)} {...register('email')} autoComplete="email" className={inputClass} />
          </Field>
          <Field id="b-phone" label="Phone number" required hint={market.phoneHint} error={errors.phone?.message}>
            <Input type="tel" placeholder={market.phonePlaceholder} {...aria('b-phone', errors.phone?.message, true)} {...register('phone')} autoComplete="tel" className={inputClass} />
          </Field>
          <Field id="b-country" label="Country" required>
            <select {...aria('b-country')} {...register('country')} className={selectClass}>
              <option value="US">United States</option>
              <option value="AU">Australia</option>
            </select>
          </Field>
          <Field id="b-address" label={`Address or ${market.postalLabel}`} required error={errors.address?.message} className="sm:col-span-2">
            <Input {...aria('b-address', errors.address?.message)} {...register('address')} autoComplete="street-address" className={inputClass} />
          </Field>
          <Field id="b-preferredDate" label="Preferred date" required error={errors.preferredDate?.message}>
            <Input type="date" min={minDate} {...aria('b-preferredDate', errors.preferredDate?.message)} {...register('preferredDate')} className={inputClass} />
          </Field>
          <Field id="b-timeWindow" label="Preferred time window" required error={errors.timeWindow?.message}>
            <select {...aria('b-timeWindow', errors.timeWindow?.message)} {...register('timeWindow')} className={selectClass}>
              <option value="">Select a time window…</option>
              {timeWindows.map((t) => (
                <option key={t.value} value={t.value}>{t.label}</option>
              ))}
            </select>
          </Field>
          <Field id="b-details" label="Description of HVAC issue" required hint="What is happening, when it started, any error codes or noises" error={errors.details?.message} className="sm:col-span-2">
            <Textarea {...aria('b-details', errors.details?.message, true)} {...register('details')} rows={5} className="rounded-lg bg-white text-base md:text-base" />
          </Field>
        </div>

        <label className="flex cursor-pointer items-start gap-3 rounded-xl border p-4">
          <input type="checkbox" id="b-urgent" {...register('urgent')} className="mt-0.5 size-5 shrink-0 accent-primary" />
          <span className="text-sm text-navy">
            <span className="font-semibold">This is an urgent issue</span>
            <span className="block text-muted-foreground">We’ll prioritize reviewing urgent requests during business hours.</span>
          </span>
        </label>
        {isUrgent && (
          <p className="rounded-lg bg-red-50 p-3 text-sm text-red-900">
            For urgent problems, calling is usually fastest: <a href={`tel:${contact.phoneHref}`} className="font-bold underline">{contact.phoneDisplay}</a>.{' '}
            {business.emergency.note}
          </p>
        )}

        <div>
          <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-surface p-4">
            <input
              type="checkbox"
              id="b-consent"
              {...register('consent')}
              aria-invalid={errors.consent ? true : undefined}
              aria-describedby={errors.consent ? 'b-consent-error' : undefined}
              className="mt-0.5 size-5 shrink-0 accent-primary"
            />
            <span className="text-sm text-navy">
              I agree that {business.name} may contact me about this appointment request. See our{' '}
              <Link to="/privacy-policy" className="font-semibold text-primary underline">Privacy Policy</Link>.
              <span className="text-destructive" aria-hidden="true"> *</span>
            </span>
          </label>
          {errors.consent && <div className="mt-2"><FieldError id="b-consent-error">{errors.consent.message}</FieldError></div>}
        </div>

        {status === 'error' && <SubmitError />}
      </div>
      <div className="flex flex-col gap-3 border-t p-5 sm:flex-row sm:items-center sm:justify-between sm:p-8">
        <p className="flex items-center gap-2 text-sm text-muted-foreground">
          <CalendarCheck2 className="size-4 text-primary" aria-hidden="true" /> We confirm every appointment personally.
        </p>
        <Button type="submit" size="xl" disabled={status === 'pending'} aria-busy={status === 'pending'}>
          {status === 'pending' ? (<><Loader2 className="animate-spin" /> Sending…</>) : (<><Send /> Request Appointment</>)}
        </Button>
      </div>
    </form>
  )
}
