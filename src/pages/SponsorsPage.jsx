import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import SponsorForm from '../components/ui/SponsorForm.jsx'
import { ArrowUpRight, MailIcon } from '../components/ui/Icons.jsx'
import { partners } from '../data/sponsors.js'
import { supporterGroups } from '../data/supporters.js'
import { memberCount } from '../data/members.js'
import useLang from '../i18n/LanguageContext.js'
import cx from '../lib/cx.js'
import { url } from '../lib/url.js'
import { SPONSOR_EMAIL } from '../data/site.js'

/* label | content rows at the bottom of OUR EDGE */
const row = 'grid grid-cols-[1fr_2fr] gap-x-[6vw] gap-y-5 border-b border-line py-10 tablet:grid-cols-1'
const rowLabel = 'font-ui text-13 font-semibold tracking-widest text-brand-end uppercase'

/** /sponsors: current partners, why to sponsor us, and an inquiry form. */
export default function SponsorsPage() {
  const { lang, t } = useLang()
  const copy = t.sponsorsPage

  return (
    <>
      <PageHero eyebrow="PARTNERS" title="Our Sponsors" lead={copy.lead} img="/images/hero-3.jpg" focus="64% 35%" alt={copy.heroAlt} />

      <main>
        <section className="px-gutter pt-14 pb-28">
          <div className="grid grid-cols-3 gap-5 tablet:grid-cols-2 mobile:grid-cols-1">
            {partners.map((partner, i) => (
              <Reveal
                as="article"
                key={i}
                className="group/partner flex h-full flex-col border border-line-faint bg-raised [transition:border-color_0.3s,transform_0.5s_var(--ease-out),translate_0.5s_var(--ease-out),opacity_0.9s_var(--ease-out)] [&.is-visible]:hover:-translate-y-1 [&.is-visible]:hover:border-white/18"
                delay={(i % 3) * 90}
              >
                <div className="grid aspect-video place-items-center bg-surface p-[12%]">
                  {partner.logo ? (
                    <img className="size-full object-contain brightness-0 invert opacity-85 transition-opacity duration-300 group-hover/partner:opacity-100" src={url(partner.logo)} alt={partner.name} />
                  ) : (
                    <span className="font-display text-32 font-bold tracking-tight opacity-85 transition-opacity duration-300 group-hover/partner:opacity-100">{partner.name}</span>
                  )}
                </div>
                <div className="flex flex-1 flex-col items-start px-7 pt-6 pb-7">
                  <h3 className="mb-2.5 text-20 font-semibold">{partner.name}</h3>
                  <p className="text-15 leading-6.25 break-keep text-fg-body">{partner.desc[lang]}</p>
                  {partner.url && (
                    <Button className="mt-auto pt-5" variant="link" href={partner.url} target="_blank" rel="noreferrer">
                      {copy.visit}
                      <ArrowUpRight />
                    </Button>
                  )}
                </div>
              </Reveal>
            ))}
          </div>
        </section>

        {/* why us: the award as the headline proof, four edges as big stats, then label | content rows */}
        <section id="edge" className="px-gutter pb-28 tablet:pb-18">
          <Reveal className="grid grid-cols-[1fr_1fr] items-end gap-x-[6vw] gap-y-5 tablet:grid-cols-1">
            <SectionHeading eyebrow="OUR EDGE" title="Why G-BungE" />
            <p className="font-display text-26 leading-[1.35] font-semibold break-keep text-fg mobile:text-20">{copy.edge.lead}</p>
          </Reveal>

          <Reveal as="figure" className="relative mt-12 aspect-3/1 overflow-hidden tablet:aspect-2/1 mobile:aspect-auto mobile:overflow-visible">
            {/* on phones the photo sits above the text instead of under it */}
            <img className="absolute inset-0 size-full object-cover object-[50%_72%] mobile:relative mobile:aspect-4/3 mobile:h-auto" src={url('/images/team-award-2026.jpg')} alt={copy.edge.feature.alt} />
            <figcaption className="relative flex h-full flex-col justify-end bg-[linear-gradient(90deg,rgb(0_0_0/0.88),rgb(0_0_0/0.5)_50%,rgb(0_0_0/0.1))] p-12 mobile:bg-none mobile:px-0 mobile:pt-6 mobile:pb-2">
              <span className="font-ui text-12 font-semibold tracking-widest text-brand-end uppercase">{copy.edge.feature.kicker}</span>
              <span className="mt-4 max-w-150 font-display text-highlight leading-[1.2] font-semibold break-keep">{copy.edge.feature.title}</span>
              <span className="mt-4 max-w-130 text-16 leading-6.75 break-keep text-fg-body">{copy.edge.feature.body}</span>
            </figcaption>
          </Reveal>

          <ol className="grid grid-cols-4 border-b border-line tablet:grid-cols-2 mobile:grid-cols-1">
            {copy.edge.pillars.map((pillar, i) => (
              <Reveal
                as="li"
                key={pillar.title}
                className={cx(
                  'px-8 pt-10 pb-11 tablet:px-6',
                  i === 0 ? 'pl-0' : 'border-l border-line',
                  i % 2 === 0 && 'tablet:border-l-0 tablet:pl-0',
                  i >= 2 && 'tablet:border-t tablet:border-line',
                  'mobile:border-l-0 mobile:px-0 mobile:not-first:border-t mobile:not-first:border-line',
                )}
                delay={i * 90}
              >
                <p className="flex items-baseline gap-2.5">
                  <span className="w-fit font-display text-44 leading-none font-semibold tracking-tighter text-brand-gradient mobile:text-36">
                    {pillar.stat.replace('{members}', memberCount)}
                  </span>
                  <span className="font-ui text-13 font-semibold text-fg-muted">{pillar.label}</span>
                </p>
                <h3 className="mt-6 text-20 font-semibold break-keep">{pillar.title}</h3>
                <p className="mt-2.5 text-15 leading-6.25 break-keep text-fg-muted">{pillar.body}</p>
              </Reveal>
            ))}
          </ol>

          {/* the rest reads as label | content rows between hairlines: the school, then where the logo goes */}
          <Reveal className={row}>
            <h3 className={rowLabel}>{copy.edge.schoolLabel}</h3>
            <p className="max-w-190 text-16 leading-7 break-keep text-fg-body">{copy.edge.school}</p>
          </Reveal>

          <Reveal className={row}>
            <h3 className={rowLabel}>{copy.exposureTitle}</h3>
            <ul className="flex flex-wrap gap-2">
              {copy.exposure.map((place) => (
                <li key={place} className="rounded-full border border-white/16 px-4 py-2 text-14 font-medium">
                  {place}
                </li>
              ))}
            </ul>
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
          className="mx-gutter mb-30 grid grid-cols-[5fr_7fr] items-start gap-16 border border-brand/30 bg-raised bg-[radial-gradient(ellipse_at_0%_110%,rgb(217_67_51/0.4),transparent_55%)] px-16 py-20 tablet:grid-cols-1 tablet:gap-10 tablet:px-10 tablet:py-14 mobile:mx-0 mobile:mb-20 mobile:px-gutter"
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
