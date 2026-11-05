import { useState } from 'react'
import { useForm, type Resolver } from 'react-hook-form'
import { zodResolver } from '@hookform/resolvers/zod'
import { z } from 'zod'
import { Link } from '@tanstack/react-router'
import { CheckCircle2, Loader2, Send } from 'lucide-react'
import { Button } from '@/components/ui/button'
import { Input } from '@/components/ui/input'
import { Textarea } from '@/components/ui/textarea'
import { business } from '@/config/business'
import { getMarket } from '@/config/market'
import { useMarket } from '@/lib/market-context'
import { submitLead } from '@/lib/submit'
import { emailSchema, nameSchema } from '@/lib/validation'
import { Field, FieldError, Honeypot, aria, inputClass, selectClass } from './fields'
import { SubmitError } from './SubmitStatus'

export const contactTopics = [
  { value: 'general', label: 'General enquiry' },
  { value: 'estimate', label: 'Installation or replacement estimate' },
  { value: 'repair', label: 'Repair or troubleshooting' },
  { value: 'maintenance-plan', label: 'Maintenance plan enquiry' },
  { value: 'commercial', label: 'Commercial HVAC' },
  { value: 'service-area', label: 'Service area check' },
  { value: 'other', label: 'Something else' },
] as const

export type ContactTopic = (typeof contactTopics)[number]['value']

interface ContactValues {
  fullName: string
  email: string
  phone: string
  topic: string
  message: string
  consent: boolean
}

export function ContactForm({ topic, plan }: { topic?: ContactTopic; plan?: string }) {
  const { code } = useMarket()
  const market = getMarket(code)
  const [status, setStatus] = useState<'idle' | 'pending' | 'error'>('idle')
  const [reference, setReference] = useState<string | null>(null)
  const [honeypot, setHoneypot] = useState('')

  const schema = z.object({
    fullName: nameSchema,
    email: emailSchema,
    phone: z.string().trim().refine((v) => v === '' || market.phonePattern.test(v), `Enter a valid phone number (${market.phoneHint}), or leave blank.`),
    topic: z.string().min(1, 'Choose an enquiry type.'),
    message: z.string().trim().min(10, 'Please enter a message (at least 10 characters).').max(2000),
    consent: z.boolean().refine((v) => v, 'Please confirm we may contact you about your enquiry.'),
  })

  const { register, handleSubmit, formState, reset } = useForm<ContactValues>({
    resolver: zodResolver(schema) as unknown as Resolver<ContactValues>,
    mode: 'onTouched',
    defaultValues: {
      fullName: '',
      email: '',
      phone: '',
      topic: topic ?? '',
      message: plan ? `I'd like to know more about the ${plan} maintenance plan.` : '',
      consent: false,
    },
  })
  const errors = formState.errors

  const onSubmit = handleSubmit(
    async (v) => {
      if (status === 'pending') return
      setStatus('pending')
      try {
        const res = await submitLead(
          'contact',
          { ...v, topic: contactTopics.find((t) => t.value === v.topic)?.label ?? v.topic, market: market.countryName, 'bot-field': honeypot },
          'CPC',
        )
        setReference(res.reference)
        setStatus('idle')
        reset()
      } catch {
        setStatus('error')
      }
    },
    (errs) => {
      const first = Object.keys(errs)[0]
      if (first) document.getElementById(`c-${first}`)?.focus()
    },
  )

  if (reference) {
    return (
      <div className="rounded-3xl border bg-white p-8 text-center" role="status">
        <CheckCircle2 className="mx-auto size-12 text-success" aria-hidden="true" />
        <h2 className="mt-4 text-2xl font-extrabold">Message received</h2>
        <p className="mt-2 text-muted-foreground">
          Thanks for getting in touch. Our team will reply during business hours ({business.hoursShort}).
        </p>
        <p className="mt-4 text-sm">
          Reference: <span className="font-mono font-bold text-navy">{reference}</span>
        </p>
        <Button variant="outline" className="mt-6" onClick={() => setReference(null)}>
          Send another message
        </Button>
      </div>
    )
  }

  return (
    <form onSubmit={onSubmit} noValidate className="space-y-5 rounded-3xl border bg-white p-5 sm:p-8">
      <h2 className="text-2xl font-extrabold">Send us a message</h2>
      <Honeypot value={honeypot} onChange={setHoneypot} />
      <div className="grid gap-5 sm:grid-cols-2">
        <Field id="c-fullName" label="Full name" required error={errors.fullName?.message}>
          <Input {...aria('c-fullName', errors.fullName?.message)} {...register('fullName')} autoComplete="name" className={inputClass} />
        </Field>
        <Field id="c-email" label="Email" required error={errors.email?.message}>
          <Input type="email" {...aria('c-email', errors.email?.message)} {...register('email')} autoComplete="email" className={inputClass} />
        </Field>
        <Field id="c-phone" label="Phone" hint={market.phoneHint} error={errors.phone?.message}>
          <Input type="tel" placeholder={market.phonePlaceholder} {...aria('c-phone', errors.phone?.message, true)} {...register('phone')} autoComplete="tel" className={inputClass} />
        </Field>
        <Field id="c-topic" label="Enquiry type" required error={errors.topic?.message}>
          <select {...aria('c-topic', errors.topic?.message)} {...register('topic')} className={selectClass}>
            <option value="">Select…</option>
            {contactTopics.map((t) => (
              <option key={t.value} value={t.value}>{t.label}</option>
            ))}
          </select>
        </Field>
        <Field id="c-message" label="Message" required error={errors.message?.message} className="sm:col-span-2">
          <Textarea {...aria('c-message', errors.message?.message)} {...register('message')} rows={5} className="rounded-lg bg-white text-base md:text-base" />
        </Field>
      </div>
      <div>
        <label className="flex cursor-pointer items-start gap-3 rounded-xl border bg-surface p-4">
          <input
            type="checkbox"
            id="c-consent"
            {...register('consent')}
            aria-invalid={errors.consent ? true : undefined}
            aria-describedby={errors.consent ? 'c-consent-error' : undefined}
            className="mt-0.5 size-5 shrink-0 accent-primary"
          />
          <span className="text-sm text-navy">
            I agree that {business.name} may contact me about this enquiry. See our{' '}
            <Link to="/privacy-policy" className="font-semibold text-primary underline">Privacy Policy</Link>.
            <span className="text-destructive" aria-hidden="true"> *</span>
          </span>
        </label>
        {errors.consent && <div className="mt-2"><FieldError id="c-consent-error">{errors.consent.message}</FieldError></div>}
      </div>
      {status === 'error' && <SubmitError />}
      <Button type="submit" size="xl" disabled={status === 'pending'} aria-busy={status === 'pending'} className="w-full sm:w-auto">
        {status === 'pending' ? (<><Loader2 className="animate-spin" /> Sending…</>) : (<><Send /> Send Message</>)}
      </Button>
    </form>
  )
}
