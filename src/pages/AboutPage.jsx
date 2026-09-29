import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import Button from '../components/ui/Button.jsx'
import { ArrowUpRight } from '../components/ui/Icons.jsx'
import { teams } from '../data/team.js'
import { memberCount } from '../data/members.js'
import useLang from '../i18n/LanguageContext.js'
import cx from '../lib/cx.js'

/* src and the object-position that keeps each photo's subject in frame */
const galleryImages = [
  ['/images/hero-2.jpg', '50% 50%'],
  ['/images/mk5-obstacle.jpg', '56% 50%'],
  ['/images/hero-3.jpg', '50% 50%'],
]

/** /about page: who we are, key numbers, how we work and where we've been. */
export default function AboutPage() {
  const { t } = useLang()
  const copy = t.teamPage

  const stats = [
    { value: '2021', label: copy.stats.founded },
    { value: '5', label: copy.stats.cars },
    { value: teams.length, label: copy.stats.teams },
    { value: memberCount, label: copy.stats.members },
  ]

  return (
    <>
      <PageHero eyebrow="ABOUT US" title={['Build, break,', 'and rebuild.']} lead={copy.aboutLead} img="/images/mk5-side.jpg" focus="55% 65%" alt={t.about.heritageAlt} />

      <main>
        <section className="grid grid-cols-2 gap-x-[6vw] px-gutter pt-22 pb-18 tablet:grid-cols-1 tablet:gap-y-8 tablet:py-14">
          <Reveal>
            <SectionHeading eyebrow="WHO WE ARE" title={['Sorry for driving too fast,', "We're new here."]} />
          </Reveal>
          <Reveal delay={150}>
            {copy.intro.map((para, i) => (
              <p key={i} className="t-body break-keep not-first:mt-6">
                {para}
              </p>
            ))}
          </Reveal>
        </section>

        <dl className="mx-gutter grid grid-cols-4 border-y border-line tablet:grid-cols-2">
          {stats.map((stat, i) => (
            <Reveal
              key={stat.label}
              className={cx(
                'flex flex-col-reverse gap-3 px-8 py-10 tablet:px-5 tablet:py-7',
                i === 0 ? 'pl-0' : 'border-l border-line',
                /* two per row on tablet: the left one sits flush, the second row gets a top rule */
                i % 2 === 0 && 'tablet:border-l-0 tablet:pl-0',
                i >= 2 && 'tablet:border-t tablet:border-line',
              )}
              delay={i * 90}
            >
              <dt className="font-ui text-13 font-semibold tracking-widest text-fg-muted uppercase">{stat.label}</dt>
              <dd className="w-fit font-display text-stat leading-none font-semibold tracking-tighter text-brand-gradient">{stat.value}</dd>
            </Reveal>
          ))}
        </dl>

        {/* three equal photos, same shape at every size; the middle one (Break) sits a step lower on desktop */}
        <section className="grid grid-cols-3 gap-4 p-[96px_var(--spacing-gutter)] tablet:py-16 mobile:grid-cols-1">
          {copy.gallery.map((item, i) => (
            <Reveal
              as="figure"
              key={item.word}
              className={cx(
                'group/photo relative aspect-4/5 overflow-hidden mobile:aspect-4/3',
                i === 1 && 'mt-16 tablet:mt-0',
                'after:absolute after:inset-0 after:bg-[linear-gradient(transparent_50%,rgb(0_0_0/0.6))]',
              )}
              delay={i * 120}
            >
              <img
                className="size-full object-cover brightness-120 saturate-90 [transition:scale_0.8s_var(--ease-out),filter_0.8s] group-hover/photo:scale-105 group-hover/photo:brightness-140"
                src={galleryImages[i][0]}
                style={{ objectPosition: galleryImages[i][1] }}
                alt={item.alt}
              />
              <figcaption className="absolute bottom-6 left-7 z-1 flex items-baseline gap-3 font-display text-gallery font-semibold tracking-tight">
                <span className="text-14 font-bold text-brand-end">0{i + 1}</span>
                {item.word}
              </figcaption>
            </Reveal>
          ))}
        </section>

        <section className="grid grid-cols-[1fr_2fr] items-start gap-x-[6vw] bg-raised p-[104px_var(--spacing-gutter)] tablet:grid-cols-1 tablet:gap-y-8 tablet:py-18">
          <Reveal>
            <SectionHeading eyebrow="HOW WE WORK" title="Less talk, More torque" />
          </Reveal>
          <ol>
            {copy.values.map((value, i) => (
              <Reveal
                as="li"
                key={value.title}
                className="group/value grid grid-cols-[96px_1fr] grid-rows-[auto_auto] gap-x-6 border-t border-line py-8 last:border-b mobile:grid-cols-[64px_1fr] mobile:gap-x-4"
                delay={i * 120}
              >
                <span className="row-span-2 font-display text-56 leading-none font-semibold text-stroke-white/35 [transition:color_0.4s,-webkit-text-stroke-color_0.4s] group-hover/value:text-brand group-hover/value:[-webkit-text-stroke-color:transparent] mobile:text-40">
                  0{i + 1}
                </span>
                <h3 className="mb-2 text-24 font-semibold">{value.title}</h3>
                <p className="text-16 leading-6.5 break-keep text-fg-body">{value.body}</p>
              </Reveal>
            ))}
          </ol>
        </section>

        <section className="px-gutter pt-26 pb-24 tablet:py-18">
          <Reveal>
            <SectionHeading eyebrow="HERITAGE" title="The Road So Far" />
          </Reveal>
          <ol className="mt-14 grid grid-cols-4 gap-8 tablet:grid-cols-2 tablet:gap-y-12 mobile:grid-cols-1 mobile:gap-y-10">
            {copy.milestones.map((item, i) => (
              <Reveal
                as="li"
                key={i}
                className={cx(
                  /* dot on a shared rule; the latest one is filled and glows */
                  'relative border-t border-white/16 pt-9',
                  'before:absolute before:-top-1.5 before:left-0 before:size-2.75 before:rounded-full before:border-2 before:border-brand',
                  i === copy.milestones.length - 1 ? 'before:bg-brand before:shadow-[0_0_0_6px_rgb(217_67_51/0.6)]' : 'before:bg-bg',
                )}
                delay={i * 120}
              >
                <span className="font-ui text-14 font-semibold text-brand-end">{item.year}</span>
                <h3 className="my-2.5 font-display text-28 font-semibold">{item.title}</h3>
                <p className="text-15 leading-6 break-keep text-fg-body">{item.body}</p>
              </Reveal>
            ))}
          </ol>
          <Reveal className="mt-12">
            <Button variant="link" href="/past-cars">
              Past Cars
              <ArrowUpRight />
            </Button>
          </Reveal>
        </section>

        <Reveal
          as="section"
          className="group/cta relative mb-30 flex min-h-110 items-center overflow-hidden after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgb(0_0_0/0.7),transparent_70%)] tablet:mb-20 mobile:min-h-95"
        >
          <img className="absolute inset-0 size-full object-cover object-[50%_78%] brightness-45 transition-[scale] duration-1000 ease-out group-hover/cta:scale-103" src="/images/team-award-2026.jpg" alt="" />
          {/* copy lines up with the page gutter; text column stays as wide as before */}
          <div className="relative z-1 box-content max-w-98 px-gutter py-16 mobile:py-10">
            <p className="t-eyebrow mb-3.5">26/27 TEAM</p>
            <h2 className="t-title">{copy.cta.title}</h2>
            <p className="t-body mt-4 mb-9">{copy.cta.body}</p>
            <Button href="/team">Meet Our Team</Button>
          </div>
        </Reveal>
      </main>
    </>
  )
}
