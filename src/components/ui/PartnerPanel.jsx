import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button.jsx'
import { ArrowUpRight } from './Icons.jsx'
import cx from '../../lib/cx.js'
import { url } from '../../lib/url.js'

/**
 * A partner's details in a window centred over the dimmed page: logo, who they are and what they give the team.
 * `partner` stays set while `shown` turns false, so the window can fade out with its content.
 * Closes on the ×, a click outside, or Escape. Portalled to <body> so no transformed parent boxes it in.
 * labels: { visit, about, support }
 */
export default function PartnerPanel({ partner, shown, lang, labels, onClose }) {
  useEffect(() => {
    if (!shown) return
    const onKey = (e) => e.key === 'Escape' && onClose()
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [shown, onClose])

  return createPortal(
    <div
      className={cx('fixed inset-0 z-110 grid place-items-center p-gutter [transition:visibility_0.3s]', shown ? 'visible' : 'invisible')}
      inert={!shown}
    >
      <div className={cx('absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300', shown ? 'opacity-100' : 'opacity-0')} onClick={onClose} aria-hidden />
      <div
        className={cx(
          'relative max-h-full w-full max-w-180 overflow-y-auto border border-line bg-raised shadow-menu',
          '[transition:opacity_0.3s,scale_0.35s_var(--ease-out)]',
          shown ? 'scale-100 opacity-100' : 'scale-96 opacity-0',
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-panel-name"
      >
        <button type="button" className="absolute top-3 right-3 z-1 grid size-10 place-items-center text-28 leading-none text-fg-muted transition-colors duration-200 hover:text-fg" onClick={onClose} aria-label="Close">
          ×
        </button>
        {partner && (
          <>
            <div className="grid aspect-5/2 place-items-center border-b border-line bg-surface px-[22%] py-[8%] mobile:aspect-2/1">
              {partner.logo ? (
                <img className="size-full object-contain brightness-0 invert" src={url(partner.logo)} alt="" />
              ) : (
                <span className="font-display text-36 font-bold tracking-tight">{partner.name}</span>
              )}
            </div>
            <div className="px-12 pt-9 pb-11 mobile:px-6">
              <h2 id="partner-panel-name" className="font-display text-32 font-semibold tracking-tight">
                {partner.name}
              </h2>
              {/* who they are, then what they give us, each under a small label */}
              <dl className="mt-6 grid gap-6">
                {partner.about && (
                  <div>
                    <dt className="font-ui text-12 font-semibold tracking-widest text-fg-muted uppercase">{labels.about}</dt>
                    <dd className="mt-2 text-16 leading-7 break-keep text-fg-body">{partner.about[lang]}</dd>
                  </div>
                )}
                {partner.support && (
                  <div>
                    <dt className="font-ui text-12 font-semibold tracking-widest text-brand-end uppercase">{labels.support}</dt>
                    <dd className="mt-2 text-20 font-semibold break-keep">{partner.support[lang]}</dd>
                  </div>
                )}
              </dl>
              {partner.url && (
                <Button className="mt-8" href={partner.url} target="_blank" rel="noreferrer">
                  {labels.visit}
                  <ArrowUpRight className="ml-2 size-4" />
                </Button>
              )}
            </div>
          </>
        )}
      </div>
    </div>,
    document.body,
  )
}
