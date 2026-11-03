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
import { url } from '../lib/url.js'
import { SPONSOR_EMAIL } from '../data/site.js'

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
        {/* every partner's logo on a hairline grid; a click opens their details in a window */}
        <section className="px-gutter pt-14 pb-28">
          <Reveal as="ul" className="grid grid-cols-4 border-t border-l border-line tablet:grid-cols-3 mobile:grid-cols-2">
            {partners.map((partner, i) => (
              <li key={partner.name} className="border-r border-b border-line">
                <button
                  type="button"
                  className="grid aspect-3/2 w-full place-items-center p-[20%] transition-colors duration-300 hover:bg-surface focus-visible:bg-surface"
                  onClick={() => setOpen(i)}
                  aria-haspopup="dialog"
                >
                  {partner.logo ? (
                    <img
                      className="size-full object-contain brightness-0 invert opacity-85"
                      src={url(partner.logo)}
                      alt={partner.name}
                    />
                  ) : (
                    <span className="font-display text-24 font-bold tracking-tight opacity-85">
                      {partner.name}
                    </span>
                  )}
                </button>
              </li>
            ))}
          </Reveal>
        </section>

        <PartnerPanel
          partner={partners[shownPartner]}
          shown={open !== null}
          lang={lang}
          labels={{ visit: copy.visit, about: copy.partnerAbout, support: copy.partnerSupport }}
          onClose={close}
        />

        {/* why us: a sideways WHY down the left margin; a two-tone heading with a button; where the logo goes; four stat cards */}
        <section id="edge" className="grid grid-cols-[9vw_1fr] px-gutter pt-10 pb-28 tablet:grid-cols-1 tablet:pb-18">
          <p
            className="-ml-[0.12em] self-start font-display text-[clamp(72px,9vw,150px)] leading-none font-semibold tracking-tight text-white/16 italic [writing-mode:vertical-rl] rotate-180 select-none tablet:hidden"
            aria-hidden
          >
            / WHY
          </p>

          <div className="min-w-0">
            <Reveal className="flex items-end justify-between gap-10 tablet:flex-col tablet:items-start tablet:gap-7">
              <div>
                <p className="mb-5 font-ui text-14 tracking-[0.4em] text-fg-muted" aria-hidden>
                  +++++++
                </p>
                <h2 className="font-display text-[clamp(40px,4.6vw,68px)] leading-none font-semibold tracking-tighter">
                  <span className="text-fg-muted">Why</span> G-BungE
                </h2>
                <p className="mt-5 max-w-150 text-20 leading-[1.5] font-medium break-keep text-fg-body mobile:text-17">
                  {claim} <span className="text-brand-end">{answer}</span>
                </p>
              </div>
              {/* outlined button with the arrow in its own white square */}
              <a className="group/cta flex shrink-0 items-stretch border border-white/30 transition-colors duration-300 hover:border-fg" href="#contact">
                <span className="grid w-11 place-items-center bg-fg text-18 text-fg-on-light" aria-hidden>
                  →
                </span>
                <span className="px-5 py-3 font-ui text-15 font-semibold">{copy.supporters.cta}</span>
              </a>
            </Reveal>

            {/* where a sponsor's logo goes, as a strip between hairlines */}
            <Reveal className="mt-12 flex flex-wrap items-center gap-x-10 gap-y-3 border-y border-line py-5">
              <span className="font-ui text-13 font-semibold text-fg-muted">{copy.exposureTitle}</span>
              {copy.exposure.map((place) => (
                <span key={place} className="font-display text-18 font-semibold tracking-tight text-fg/90">
                  {place}
                </span>
              ))}
            </Reveal>

            <ol className="mt-8 grid grid-cols-4 gap-4 laptop:grid-cols-2 mobile:grid-cols-1">
              {copy.edge.pillars.map((pillar, i) => (
                <Reveal as="li" key={pillar.title} className="flex flex-col border border-line-faint bg-surface" delay={i * 90}>
                  <div className="flex flex-1 flex-col justify-between gap-10 p-6">
                    {/* a small badge in the corner, the number large */}
                    <span className="flex w-fit items-center gap-1.5 self-end bg-black/45 px-2.5 py-1 font-ui text-11 font-semibold text-fg-body before:size-1.5 before:rounded-full before:bg-brand">
                      {pillar.label}
                    </span>
                    <span className="font-display text-56 leading-none font-semibold tracking-tighter mobile:text-44">{pillar.stat.replace('{members}', memberCount)}</span>
                  </div>
                  <p className="border-t border-line-faint bg-white/4 px-6 py-4 text-16 font-semibold break-keep">{pillar.title}</p>
                </Reveal>
              ))}
            </ol>
          </div>
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
