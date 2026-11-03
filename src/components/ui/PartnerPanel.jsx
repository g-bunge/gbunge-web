import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button.jsx'
import { ArrowUpRight } from './Icons.jsx'
import cx from '../../lib/cx.js'
import { url } from '../../lib/url.js'

/**
 * A partner's details in a panel that slides in from the right over a dimmed page.
 * `partner` is null while closed; the last one stays rendered so the panel can slide out with it.
 * Closes on the ×, a click outside, or Escape. Portalled to <body> so no transformed parent boxes it in.
 */
export default function PartnerPanel({ partner, shown, lang, visitLabel, onClose }) {
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
    <div className={cx('fixed inset-0 z-110 [transition:visibility_0.4s]', shown ? 'visible' : 'invisible')} inert={!shown}>
      <div className={cx('absolute inset-0 bg-black/60 backdrop-blur-sm transition-opacity duration-400', shown ? 'opacity-100' : 'opacity-0')} onClick={onClose} aria-hidden />
      <aside
        className={cx(
          'absolute inset-y-0 right-0 flex w-[min(480px,100%)] flex-col overflow-y-auto border-l border-line bg-raised px-10 pt-20 pb-10 mobile:px-gutter',
          '[transition:translate_0.45s_var(--ease-out)]',
          shown ? 'translate-x-0' : 'translate-x-full',
        )}
        role="dialog"
        aria-modal="true"
        aria-labelledby="partner-panel-name"
      >
        <button type="button" className="absolute top-5 right-5 grid size-10 place-items-center text-28 leading-none text-fg-muted transition-colors duration-200 hover:text-fg" onClick={onClose} aria-label="Close">
          ×
        </button>
        {partner && (
          <>
            <div className="grid aspect-video place-items-center border border-line bg-surface p-[14%]">
              {partner.logo ? (
                <img className="size-full object-contain brightness-0 invert" src={url(partner.logo)} alt="" />
              ) : (
                <span className="font-display text-32 font-bold tracking-tight">{partner.name}</span>
              )}
            </div>
            <h2 id="partner-panel-name" className="mt-8 font-display text-36 font-semibold tracking-tight">
              {partner.name}
            </h2>
            <p className="mt-4 text-17 leading-7 break-keep text-fg-body">{partner.desc[lang]}</p>
            {partner.url && (
              <Button className="mt-8 self-start" href={partner.url} target="_blank" rel="noreferrer">
                {visitLabel}
                <ArrowUpRight className="ml-2 size-4" />
              </Button>
            )}
          </>
        )}
      </aside>
    </div>,
    document.body,
  )
}
