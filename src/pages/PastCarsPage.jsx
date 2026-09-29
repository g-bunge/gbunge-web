import Reveal from '../components/ui/Reveal.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { pastCars } from '../data/cars.js'
import useLang from '../i18n/LanguageContext.js'
import cx from '../lib/cx.js'

/** /past-cars page: every car we've raced, newest first. */
export default function PastCarsPage() {
  const { lang, t } = useLang()
  const copy = t.carsPage

  return (
    <>
      <PageHero eyebrow="HERITAGE" title="Past Cars" lead={copy.lead} img="/images/mk5-race.jpg" focus="45% 55%" alt={copy.heroAlt} />

      <main>
        <nav className="mx-gutter mt-12 grid grid-cols-[repeat(5,1fr)] border-y border-line mobile:mt-6 mobile:grid-cols-5" aria-label={copy.indexLabel}>
          {pastCars.map((car) => (
            <a
              key={car.id}
              className="group/car flex items-baseline justify-between gap-3 px-5 py-6 transition-colors duration-300 not-first:border-l not-first:border-line hover:bg-raised mobile:flex-col mobile:items-center mobile:gap-1 mobile:px-1 mobile:py-4"
              href={`#${car.id}`}
            >
              <span className="font-display text-28 font-semibold transition-colors duration-300 group-hover/car:text-brand-end mobile:text-18">{car.name}</span>
              {car.year && <span className="font-ui text-13 text-fg-muted mobile:text-11">{car.year}</span>}
            </a>
          ))}
        </nav>

        <section className="px-gutter pt-10 pb-30 mobile:pb-18">
          {pastCars.map((car, i) => {
            /* alternate sides */
            const flipped = i % 2 === 1
            return (
              <article
                key={car.id}
                id={car.id}
                className={cx(
                  'group/car grid scroll-mt-nav items-center gap-x-[5vw] py-20 not-first:border-t not-first:border-line-soft tablet:grid-cols-1 tablet:gap-y-8 tablet:py-14',
                  flipped ? 'grid-cols-[5fr_7fr]' : 'grid-cols-[7fr_5fr]',
                )}
              >
                <Reveal className={cx('aspect-16/10 overflow-hidden', flipped && 'order-2 tablet:order-none')} variant="left">
                  {car.img ? (
                    <img className="size-full object-cover transition-[scale] duration-800 ease-out group-hover/car:scale-104" src={car.img} alt={car.name} />
                  ) : (
                    <div className="relative grid h-full place-items-center bg-placeholder">
                      <span className="font-display text-ghost font-bold tracking-tightest text-stroke-white/18" aria-hidden>
                        {car.name}
                      </span>
                      <p className="absolute bottom-5 left-6 font-ui text-13 text-fg-muted">{copy.photoSoon}</p>
                    </div>
                  )}
                </Reveal>

                <Reveal delay={150}>
                  <p className="t-eyebrow tracking-widest">{[car.type, car.year].filter(Boolean).join(' · ')}</p>
                  <h2 className="mt-2.5 mb-5 font-display text-car leading-none font-semibold tracking-tighter">{car.name}</h2>
                  {car.award && (
                    <p className="mb-5 inline-block bg-brand-gradient px-3.5 py-1.75 font-ui text-13 font-semibold text-fg before:content-['🏆_']">{car.award[lang]}</p>
                  )}
                  <p className="t-body break-keep">{car.desc?.[lang] ?? copy.descSoon}</p>
                  <dl className="mt-8 grid grid-cols-2 border-t border-line">
                    {Object.entries(car.specs).map(([key, value]) => (
                      <div key={key} className="border-b border-line py-4">
                        <dt className="mb-1 font-ui text-12 font-semibold tracking-wider text-fg-muted uppercase">{copy.specs[key]}</dt>
                        <dd className="font-display text-20 font-semibold">{value}</dd>
                      </div>
                    ))}
                  </dl>
                </Reveal>
              </article>
            )
          })}
        </section>

      </main>
    </>
  )
}
