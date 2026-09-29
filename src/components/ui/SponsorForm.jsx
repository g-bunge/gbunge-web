import { useState } from 'react'
import Button from './Button.jsx'
import useLang from '../../i18n/LanguageContext.js'
import { SPONSOR_EMAIL } from '../../data/site.js'
import cx from '../../lib/cx.js'

/*
 * Where inquiries are sent. Set in `.env.local` (see .env.example):
 *   VITE_SPONSOR_FORM_ENDPOINT: a form-backend URL that accepts a FormData POST and answers JSON,
 *                                e.g. https://formspree.io/f/xxxxxxx or https://api.web3forms.com/submit
 *   VITE_SPONSOR_FORM_KEY     : only for services that want an access key in the body (Web3Forms)
 * Without an endpoint the form falls back to opening a pre-filled email to SPONSOR_EMAIL (data/site.js).
 */
const ENDPOINT = import.meta.env.VITE_SPONSOR_FORM_ENDPOINT
const ACCESS_KEY = import.meta.env.VITE_SPONSOR_FORM_KEY

const panel = 'flex flex-col border border-white/10 bg-black/55 backdrop-blur-sm mobile:px-5 mobile:py-7'
const fieldLabel = 'font-ui text-13 font-semibold text-fg-body'
const input =
  'w-full rounded-none border border-white/12 bg-raised px-3.5 py-3.25 text-15 text-fg outline-none [transition:border-color_0.2s,background_0.2s] ' +
  'placeholder:text-fg-muted hover:border-white/25 focus:border-brand focus:bg-surface'
const requiredMark = <em className="text-brand-end not-italic" aria-hidden>*</em>

/** Sponsorship inquiry form: company, contact person, kinds of support and a message. */
export default function SponsorForm() {
  const { t } = useLang()
  const copy = t.sponsorForm
  const [status, setStatus] = useState('idle') // idle | sending | sent | error

  const onSubmit = async (e) => {
    e.preventDefault()
    const form = e.currentTarget
    const data = new FormData(form)
    if (data.get('website')) return // honeypot filled: a bot

    const support = data.getAll('support').join(', ')
    data.delete('support')
    data.set('support', support || '-')
    data.delete('website')

    if (!ENDPOINT) {
      const body = [...data.entries()].map(([key, value]) => `${copy.fields[key] ?? key}: ${value}`).join('\n')
      window.location.href = `mailto:${SPONSOR_EMAIL}?subject=${encodeURIComponent(`[Sponsorship] ${data.get('company')}`)}&body=${encodeURIComponent(body)}`
      return
    }

    data.set('subject', `[Sponsorship] ${data.get('company')}`)
    if (ACCESS_KEY) data.set('access_key', ACCESS_KEY)

    setStatus('sending')
    try {
      const res = await fetch(ENDPOINT, { method: 'POST', body: data, headers: { Accept: 'application/json' } })
      if (!res.ok) throw new Error(res.statusText)
      form.reset()
      setStatus('sent')
    } catch {
      setStatus('error')
    }
  }

  if (status === 'sent') {
    return (
      <div className={cx(panel, 'min-h-105 items-center justify-center gap-3.5 p-10 text-center')} role="status">
        <span className="mb-2 grid size-14 place-items-center rounded-full bg-brand-gradient text-26" aria-hidden>
          ✓
        </span>
        <h3 className="font-display text-28 font-semibold">{copy.sentTitle}</h3>
        <p className="mb-4 text-fg-body">{copy.sentBody}</p>
        <Button variant="light" onClick={() => setStatus('idle')}>
          {copy.again}
        </Button>
      </div>
    )
  }

  return (
    <form className={cx(panel, 'gap-5 p-10 text-left')} onSubmit={onSubmit}>
      <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
        <Field name="company" label={copy.fields.company} required autoComplete="organization" />
        <Field name="name" label={copy.fields.name} required autoComplete="name" />
      </div>
      <div className="grid grid-cols-2 gap-4 mobile:grid-cols-1">
        <Field name="email" type="email" label={copy.fields.email} required autoComplete="email" />
        <Field name="phone" type="tel" label={copy.fields.phone} autoComplete="tel" />
      </div>

      <fieldset>
        <legend className={cx(fieldLabel, 'mb-2.5')}>{copy.fields.support}</legend>
        <div className="flex flex-wrap gap-2">
          {copy.supportTypes.map((type) => (
            <label key={type} className="group/chip relative cursor-pointer">
              <input className="peer absolute inset-0 cursor-pointer opacity-0" type="checkbox" name="support" value={type} />
              <span className="block rounded-full border border-white/18 px-4 py-2 text-14 font-medium text-fg-body [transition:color_0.2s,background_0.2s,border-color_0.2s] group-hover/chip:border-white/40 peer-checked:border-transparent peer-checked:bg-brand-gradient peer-checked:text-fg peer-focus-visible:outline-2 peer-focus-visible:outline-offset-2 peer-focus-visible:outline-brand">
                {type}
              </span>
            </label>
          ))}
        </div>
      </fieldset>

      <label className="flex flex-col gap-2">
        <span className={fieldLabel}>
          {copy.fields.message} {requiredMark}
        </span>
        <textarea className={cx(input, 'min-h-30 resize-y leading-[1.6]')} name="message" rows={5} required placeholder={copy.messagePlaceholder} />
      </label>

      {/* honeypot: hidden from people, bots fill it in */}
      <input className="absolute -left-[9999px] size-px" type="text" name="website" tabIndex={-1} autoComplete="off" aria-hidden />

      <div className="mt-1 flex items-center justify-between gap-5 mobile:flex-col mobile:items-stretch">
        <p className={cx('text-13 leading-5', status === 'error' ? 'text-brand-end' : 'text-fg-muted')} role={status === 'error' ? 'alert' : undefined}>
          {status === 'error' ? copy.error(SPONSOR_EMAIL) : copy.note}
        </p>
        <Button type="submit" disabled={status === 'sending'}>
          {status === 'sending' ? copy.sending : copy.submit}
        </Button>
      </div>
    </form>
  )
}

function Field({ name, label, type = 'text', required = false, ...rest }) {
  return (
    <label className="flex flex-col gap-2">
      <span className={fieldLabel}>
        {label} {required && requiredMark}
      </span>
      <input className={input} type={type} name={name} required={required} {...rest} />
    </label>
  )
}
