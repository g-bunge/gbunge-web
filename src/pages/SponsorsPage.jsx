import { useCallback, useState } from 'react'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import SponsorForm from '../components/ui/SponsorForm.jsx'
import PartnerPanel from '../components/ui/PartnerPanel.jsx'
import { ArrowUpRight, MailIcon } from '../components/ui/Icons.jsx'
import { partners, supporterGroups } from '../data/sponsors.js'
import useLang from '../i18n/LanguageContext.js'
import cx from '../lib/cx.js'
import { url } from '../lib/url.js'
import { SPONSOR_EMAIL, SUPPORTERS_ENABLED } from '../data/site.js'

/*
 * Empty cells that complete the partner grid's last row at each column count (5, 3 on tablets, 2 on phones),
 * as the visibility classes each one needs.
 */
const fillers = (() => {
  const missing = (cols) => (cols - (partners.length % cols)) % cols
  const [desk, tab, phone] = [missing(5), missing(3), missing(2)]
  return Array.from({ length: Math.max(desk, tab, phone) }, (_, k) =>
    cx(k < desk ? 'block' : 'hidden', k < tab ? 'tablet:block' : 'tablet:hidden', k < phone ? 'mobile:block' : 'mobile:hidden'),
  )
})()

/** /sponsors: current partners, why to sponsor us, and an inquiry form. */
export default function SponsorsPage() {
  const { lang, t } = useLang()
  const copy = t.sponsorsPage
  // the partner whose panel is open; `shownPartner` keeps the last one while the panel slides out
  const [open, setOpen] = useState(null)
  const [shownPartner, setShownPartner] = useState(0)
  if (open !== null && open !== shownPartner) setShownPartner(open)
  const close = useCallback(() => setOpen(null), [])

  return (
    <>
      <PageHero title="Our Sponsors" img="/images/hero-3.jpg" focus="64% 35%" alt={copy.heroAlt} />

      <main>
        {/*
          every partner's logo on a hairline grid running the full width of the screen: no outer frame, the
          rules go edge to edge (the last column's right rule falls just past the screen), and empty cells
          fill out a short last row so its rule still reaches the edge. A click opens the details window.
        */}
        <section className="overflow-hidden pt-20 pb-28 tablet:pt-14">
          <Reveal className="mb-12 px-gutter text-center">
            <SectionHeading title="26/27 Sponsors" align="center" />
            <p className="mt-4 t-body break-keep text-fg-body">{copy.partnersLead}</p>
          </Reveal>
          <Reveal as="ul" className="grid w-[calc(100%+1px)] grid-cols-5 border-t border-line tablet:grid-cols-3 mobile:grid-cols-2">
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
            {fillers.map((show, k) => (
              <li key={`filler-${k}`} className={cx('border-r border-b border-line', show)} aria-hidden />
            ))}
          </Reveal>
        </section>

        <PartnerPanel
          partner={partners[shownPartner]}
          shown={open !== null}
          lang={lang}
          labels={{ visit: copy.visit, support: copy.partnerSupport }}
          onClose={close}
        />

        {/* why us: the heading, four numbered points as cards, then a bar that leads to the inquiry form */}
        <section id="edge" className="px-gutter pt-6 pb-28 tablet:pb-18">
          <Reveal>
            <SectionHeading title="Why G-BungE" />
          </Reveal>

          {/* the four points share hairlines, like the sponsor grid above: no fill, no gaps */}
          <ol className="mt-12 grid grid-cols-4 border-t border-l border-line laptop:grid-cols-2 mobile:grid-cols-1">
            {copy.edge.pillars.map((pillar, i) => (
              <Reveal as="li" key={pillar.title} className="border-r border-b border-line p-7 mobile:p-6" delay={i * 90}>
                <div className="flex items-start justify-between">
                  <span className="font-display text-44 leading-none font-semibold tracking-tight">{String(i + 1).padStart(2, '0')}</span>
                  <ArrowUpRight className="mt-1 size-5 text-fg-muted" />
                </div>
                <h3 className="mt-8 text-18 font-semibold break-keep">{pillar.title}</h3>
                <p className="mt-3 text-15 leading-6.5 break-keep text-fg-muted">{pillar.body}</p>
              </Reveal>
            ))}
          </ol>

          {/* a long bar under the cards: the ask, where the logo goes, and the button to the form */}
          <Reveal className="mt-4 flex items-center gap-6 bg-surface px-7 py-6 tablet:flex-col tablet:items-start mobile:px-6">
            <MailIcon className="size-6 shrink-0 text-brand-end tablet:hidden" />
            <div className="flex-1">
              <p className="text-17 font-semibold">{copy.cta.title}</p>
              <p className="mt-1 text-15 break-keep text-fg-muted">
                {copy.exposureTitle}: {copy.exposure.join(' · ')}
              </p>
            </div>
            <Button className="shrink-0" href="#contact">
              {copy.supporters.cta}
            </Button>
          </Reveal>
        </section>

        {/* credits roll: every individual supporter, grouped, centred like the end of a film (hidden while SUPPORTERS_ENABLED is false) */}
        {SUPPORTERS_ENABLED && (
          <section id="supporters" className="px-gutter pt-26 pb-28 text-center tablet:py-18">
            <Reveal className="mx-auto flex max-w-150 flex-col items-center">
              <SectionHeading title="Thank You, Supporters" align="center" />
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
        )}

        <section
          id="contact"
          className="mx-gutter mb-30 grid grid-cols-[5fr_7fr] items-start gap-16 border border-brand/30 bg-raised px-16 py-20 tablet:grid-cols-1 tablet:gap-10 tablet:px-10 tablet:py-14 mobile:mx-0 mobile:mb-20 mobile:px-gutter"
        >
          <Reveal className="sticky top-30 tablet:static">
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
