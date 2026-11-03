import { useCallback, useState } from 'react'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import SponsorForm from '../components/ui/SponsorForm.jsx'
import PartnerPanel from '../components/ui/PartnerPanel.jsx'
import { ArrowUpRight, MailIcon } from '../components/ui/Icons.jsx'
import { partners, supporterGroups } from '../data/sponsors.js'
import { memberCount } from '../data/members.js'
import useLang from '../i18n/LanguageContext.js'
import cx from '../lib/cx.js'
import { url } from '../lib/url.js'
import { SPONSOR_EMAIL } from '../data/site.js'

/* logos rest dim and come up to full brightness while their cell is lifted */
const grow = 'opacity-55 transition-opacity duration-300 group-hover/partner:opacity-100 group-focus-visible/partner:opacity-100'

/** /sponsors: current partners, why to sponsor us, and an inquiry form. */
export default function SponsorsPage() {
  const { lang, t } = useLang()
  const copy = t.sponsorsPage
  // the partner whose panel is open; `shownPartner` keeps the last one while the panel slides out
  const [open, setOpen] = useState(null)
  const [shownPartner, setShownPartner] = useState(0)
  if (open !== null && open !== shownPartner) setShownPartner(open)
  const close = useCallback(() => setOpen(null), [])
  // the edge line splits into the claim and its answer, which is set in red: '…경력이 아닙니다.' / '기술입니다.'
  const [, claim, answer] = copy.edge.lead.match(/^(.*[.?!])\s+(\S.*)$/) ?? [null, copy.edge.lead, '']

  return (
    <>
      <PageHero title="Our Sponsors" img="/images/hero-3.jpg" focus="64% 35%" alt={copy.heroAlt} />

      <main>
        {/* every partner's logo on a hairline grid; a click opens their details in the side panel */}
        <section className="px-gutter pt-14 pb-28">
          <Reveal as="ul" className="grid grid-cols-4 border-t border-l border-line tablet:grid-cols-3 mobile:grid-cols-2">
            {partners.map((partner, i) => (
              <li key={partner.name} className="border-r border-b border-line">
                <button
                  type="button"
                  className={
                    /* on hover the whole cell grows and lifts above its neighbours */
                    'group/partner relative grid aspect-3/2 w-full place-items-center p-[20%] outline-1 outline-transparent ' +
                    '[transition:scale_0.45s_var(--ease-out),background_0.3s,box-shadow_0.45s,outline-color_0.3s] ' +
                    'hover:z-10 hover:scale-110 hover:bg-surface hover:shadow-[0_28px_60px_-18px_rgb(0_0_0/0.9)] hover:outline-white/14 ' +
                    'focus-visible:z-10 focus-visible:scale-110 focus-visible:bg-surface'
                  }
                  onClick={() => setOpen(i)}
                  aria-haspopup="dialog"
                >
                  {partner.logo ? (
                    <img
                      className={grow + ' size-full object-contain brightness-0 invert'}
                      src={url(partner.logo)}
                      alt={partner.name}
                    />
                  ) : (
                    <span className={grow + ' font-display text-24 font-bold tracking-tight'}>
                      {partner.name}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </Reveal>
        </section>

        <PartnerPanel partner={partners[shownPartner]} shown={open !== null} lang={lang} visitLabel={copy.visit} onClose={close} />

        {/* why us: one big line with the answer in red, four big numbers, then where a sponsor's logo goes */}
        <section id="edge" className="px-gutter pt-6 pb-28 tablet:pb-18">
          <Reveal>
            <p className="t-eyebrow flex items-center gap-3 tracking-label before:h-0.5 before:w-8 before:bg-brand-gradient">WHY G-BUNGE</p>
            <h2 className="mt-7 font-display text-[clamp(40px,5.4vw,84px)] leading-[1.04] font-semibold tracking-tighter break-keep">
              {claim}
              <br />
              <span className="text-brand-gradient">{answer}</span>
            </h2>
          </Reveal>

          <ol className="mt-18 grid grid-cols-4 border-y border-line tablet:grid-cols-2 mobile:mt-12">
            {copy.edge.pillars.map((pillar, i) => (
              <Reveal
                as="li"
                key={pillar.title}
                className={cx('px-8 py-11 tablet:px-6 mobile:px-4 mobile:py-8', i % 4 !== 0 && 'border-l border-line', i >= 2 && 'tablet:border-t', i % 2 === 0 && 'tablet:border-l-0')}
                delay={i * 90}
              >
                <p className="font-display text-stat leading-none font-semibold tracking-tighter">{pillar.stat.replace('{members}', memberCount)}</p>
                <p className="mt-5 font-ui text-14 font-semibold text-fg-muted">{pillar.label}</p>
                <p className="mt-1.5 text-17 font-semibold break-keep">{pillar.title}</p>
              </Reveal>
            ))}
          </ol>

          <Reveal className="flex flex-wrap items-baseline gap-x-8 gap-y-3 border-b border-line py-7">
            <h3 className="font-ui text-13 font-semibold tracking-widest text-brand-end uppercase">{copy.exposureTitle}</h3>
            <p className="text-16 text-fg-body">{copy.exposure.join('  ·  ')}</p>
          </Reveal>
        </section>

        {/* credits roll: every individual supporter, grouped, centred like the end of a film */}
        <section id="supporters" className="px-gutter pt-26 pb-28 text-center tablet:py-18">
          <Reveal className="mx-auto flex max-w-150 flex-col items-center">
            <SectionHeading eyebrow="SUPPORTERS" title="Thank You, Supporters" align="center" />
            <p className="mt-5 text-16 leading-6.75 break-keep text-fg-body">{copy.supporters.lead}</p>
          </Reveal>

          {supporterGroups.map((group) => (
            <Reveal key={group.id} className="mx-auto mt-16 max-w-240">
              {/* group label between two hairlines */}
              <h3 className="flex items-center gap-5 font-ui text-12 font-semibold tracking-label text-fg-muted uppercase before:h-px before:flex-1 before:bg-line after:h-px after:flex-1 after:bg-line">
                {copy.supporters.groups[group.id]}
                {group.names.length > 0 && <span className="text-brand-end">{String(group.names.length).padStart(2, '0')}</span>}
              </h3>
              {group.names.length > 0 ? (
                <ul className="mt-8 flex flex-wrap justify-center gap-x-10 gap-y-4 mobile:gap-x-6">
                  {group.names.map((name, j) => (
                    <li key={j} className="font-display text-22 font-medium tracking-tight text-fg/85 transition-colors duration-300 hover:text-fg mobile:text-18">
                      {name}
                    </li>
                  ))}
                </ul>
              ) : (
                <p className="mt-8 font-display text-22 font-medium tracking-tight text-fg-muted mobile:text-18">{copy.supporters.empty}</p>
              )}
            </Reveal>
          ))}

          <Reveal className="mt-20 flex flex-col items-center gap-6">
            <p className="text-15 break-keep text-fg-muted">{copy.supporters.note}</p>
            <Button variant="link" href="#contact">
              {copy.supporters.cta}
              <ArrowUpRight />
            </Button>
          </Reveal>
        </section>

        <section
          id="contact"
          className="mx-gutter mb-30 grid grid-cols-[5fr_7fr] items-start gap-16 border border-brand/30 bg-raised px-16 py-20 tablet:grid-cols-1 tablet:gap-10 tablet:px-10 tablet:py-14 mobile:mx-0 mobile:mb-20 mobile:px-gutter"
        >
          <Reveal className="sticky top-30 tablet:static">
            <p className="t-eyebrow mb-4 tracking-label">BECOME OUR SPONSOR</p>
            <h2 className="font-display text-cta-title leading-[1.15] font-semibold tracking-tight break-keep">{copy.cta.title}</h2>
            <p className="t-body mt-6 mb-8 break-keep">{copy.cta.body}</p>
            <a className="inline-flex items-center gap-2.5 font-ui text-16 font-medium text-fg-body transition-colors duration-300 hover:text-fg" href={`mailto:${SPONSOR_EMAIL}`}>
              <MailIcon className="size-5" />
              {SPONSOR_EMAIL}
            </a>
          </Reveal>
          <Reveal delay={150}>
            <SponsorForm />
          </Reveal>
        </section>
      </main>
    </>
  )
}
