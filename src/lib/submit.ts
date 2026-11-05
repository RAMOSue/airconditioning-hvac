/**
 * Lead submission adapter.
 *
 * Default transport: Netlify Forms. Forms are registered at deploy time via the
 * static skeleton in /public/__forms.html, and submissions are POSTed there as
 * URL-encoded data (the SSR catch-all would intercept a POST to "/").
 *
 * To connect a CRM, booking provider, or email service later, replace
 * `transport` with one that calls a server endpoint — components don't change.
 */

export type LeadFormName = 'quote-request' | 'service-booking' | 'contact'

export interface SubmitResult {
  reference: string
}

export class SubmissionError extends Error {}

type Transport = (form: LeadFormName, fields: Record<string, string>) => Promise<void>

const netlifyFormsTransport: Transport = async (form, fields) => {
  const body = new URLSearchParams({ 'form-name': form, ...fields })
  const response = await fetch('/__forms.html', {
    method: 'POST',
    headers: { 'Content-Type': 'application/x-www-form-urlencoded' },
    body: body.toString(),
    signal: AbortSignal.timeout(15000),
  })
  if (!response.ok) throw new SubmissionError(`Submission failed (${response.status})`)
  // A plain static server (e.g. local Vite) returns the unprocessed skeleton
  // file with 200 — that is NOT a successful submission.
  const text = await response.text()
  if (/\bdata-netlify\s*=/i.test(text)) throw new SubmissionError('Form handling is unavailable')
}

let transport: Transport = netlifyFormsTransport

/** Swap the transport (e.g. in tests or when wiring a CRM endpoint). */
export function setSubmissionTransport(next: Transport) {
  transport = next
}

export function createReference(prefix: string) {
  const d = new Date()
  const date = `${String(d.getFullYear()).slice(2)}${String(d.getMonth() + 1).padStart(2, '0')}${String(d.getDate()).padStart(2, '0')}`
  const rand = Math.random().toString(36).slice(2, 6).toUpperCase()
  return `${prefix}-${date}-${rand}`
}

export async function submitLead(
  form: LeadFormName,
  values: Record<string, string | boolean | number | undefined | null>,
  prefix: string,
): Promise<SubmitResult> {
  const reference = createReference(prefix)
  const fields: Record<string, string> = { reference }
  for (const [key, value] of Object.entries(values)) {
    if (value === undefined || value === null) continue
    fields[key] = typeof value === 'boolean' ? (value ? 'yes' : 'no') : String(value)
  }
  await transport(form, fields)
  return { reference }
}
