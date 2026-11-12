import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import Button from './Button.jsx'
import { ArrowUpRight } from './Icons.jsx'
import cx from '../../lib/cx.js'
import { url } from '../../lib/url.js'

/*
 * Whether a phrase ends on a final consonant (받침), to choose 을 or 를 after it. A trailing (…) is skipped,
 * and digits and Latin letters go by how they're read: '…자원' → true, '용접기' / 'IR155-3204' → false.
 */
function endsOnConsonant(phrase) {
  const last = phrase.replace(/\s*\([^)]*\)\s*$/, '').trim().at(-1) ?? ''
  if (/[가-힣]/.test(last)) return (last.charCodeAt(0) - 0xac00) % 28 !== 0
  if (/\d/.test(last)) return '013678'.includes(last)
  return /[lmnr]/i.test(last)
}

/**
 * A partner's details in a window centred over the dimmed page: logo, who they are and what they give the team.
 * `partner` stays set while `shown` turns false, so the window can fade out with its content.
 * Closes on the ×, a click outside, or Escape. Portalled to <body> so no transformed parent boxes it in.
 * labels: { visit, support }, where support(josa) gives the sentence around the support item: [before, after]
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
      className={cx('fixed inset-0 z-110 grid place-items-center px-gutter py-6 [transition:visibility_0.3s]', shown ? 'visible' : 'invisible')}
      inert={!shown}
    >
      <div className={cx('absolute inset-0 bg-black/70 backdrop-blur-sm transition-opacity duration-300', shown ? 'opacity-100' : 'opacity-0')} onClick={onClose} aria-hidden />
      <div
        className={cx(
          /*
           * sized off its width alone: the width shrinks with a short window as well as a narrow one, and
           * everything inside is in cqw, so the whole window scales as one piece instead of being cut off
           */
          'relative @container max-h-full w-[min(45rem,100%,(100svh-3rem)*1.15)] overflow-y-auto border border-line bg-raised shadow-menu',
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
            {/* the main sponsor's logo sits larger in its band */}
            <div className={cx('grid aspect-5/2 place-items-center border-b border-line bg-surface', partner.main ? 'px-[12%] py-[6%]' : 'px-[22%] py-[8%]')}>
              {partner.logo ? (
                <img className="size-full object-contain brightness-0 invert" src={url(partner.logo)} alt="" />
              ) : (
                <span className="font-display text-[max(24px,5cqw)] font-bold tracking-tight">{partner.name}</span>
              )}
            </div>
            <div className="px-[8cqw] pt-[6cqw] pb-[7cqw]">
              <h2 id="partner-panel-name" className="font-display text-[max(22px,4.4cqw)] font-semibold tracking-tight">
                {partner.name}
              </h2>
              {/*
                who they are and what they give us, as one paragraph with the support item in red; a partner with
                its own `supportLead` gets the support sentence as a paragraph of its own, opening with that lead
              */}
              <p className="mt-[3cqw] text-[max(14px,2.4cqw)] leading-[1.75] break-keep text-fg-body">
                {partner.about?.[lang]}
                {partner.about && partner.support && !partner.supportLead && ' '}
                {partner.support && !partner.supportLead && <Support item={partner.support[lang]} sentence={labels.support} />}
              </p>
              {partner.support && partner.supportLead && (
                <p className="mt-[2cqw] text-[max(14px,2.4cqw)] leading-[1.75] break-keep text-fg-body">
                  <Support item={partner.support[lang]} sentence={labels.support} lead={partner.supportLead[lang]} />
                </p>
              )}
              {partner.url && (
                <Button className="mt-[5cqw]" href={partner.url} target="_blank" rel="noreferrer">
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

/** "지붕이에 <item>을 후원해주셨습니다." with the item in red and the right 을/를; `lead` replaces the opening. */
function Support({ item, sentence, lead }) {
  const [before, after] = sentence(endsOnConsonant(item) ? '을' : '를')
  return (
    <>
      {lead ?? before}
      <strong className="font-semibold text-brand-end">{item}</strong>
      {after}
    </>
  )
}
