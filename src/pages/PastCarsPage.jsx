import Reveal from '../components/ui/Reveal.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { ArrowUpRight } from '../components/ui/Icons.jsx'
import { pastCars } from '../data/cars.js'
import useLang from '../i18n/LanguageContext.js'
import cx from '../lib/cx.js'
import { url } from '../lib/url.js'

/* a grid cell: a vertical rule on its left and a full-width rule under it */
const cell = 'relative border-l border-line after:absolute after:-inset-x-[100vw] after:bottom-0 after:h-px after:bg-line'

/* empty cells that complete the last row at 3, 2 and 1 columns, as the visibility classes each needs */
const fillers = (() => {
  const missing = (cols) => (cols - (pastCars.length % cols)) % cols
  const [desk, tab, phone] = [missing(3), missing(2), missing(1)]
  return Array.from({ length: Math.max(desk, tab, phone) }, (_, k) =>
    cx(k < desk ? 'block' : 'hidden', k < tab ? 'tablet:block' : 'tablet:hidden', k < phone ? 'mobile:block' : 'mobile:hidden'),
  )
})()

/** /past-cars: every car we've raced, newest first, each card opening that car's own page. */
export default function PastCarsPage() {
  const { lang, t } = useLang()
  const copy = t.carsPage

  return (
    <>
      <PageHero title="Past Cars" img="/images/mk5-race.jpg" focus="45% 55%" alt={copy.heroAlt} />

      {/*
        cars on a hairline grid like the sponsor logos: the horizontal rules run the full width of the screen
        (the ::before on top, each cell's ::after below), while the cards and their vertical rules stay within
        the 1280px content width. Empty cells complete a short last row.
      */}
      <main className="overflow-x-clip pt-14 pb-30 mobile:pb-18">
        <div className="px-gutter">
          <ul className="relative grid grid-cols-3 border-r border-line before:absolute before:-inset-x-[100vw] before:top-0 before:h-px before:bg-line tablet:grid-cols-2 mobile:grid-cols-1">
            {pastCars.map((car, i) => (
              <Reveal as="li" key={car.id} className={cell} delay={(i % 3) * 90}>
                <a className="group/car flex h-full flex-col p-6 transition-colors duration-300 hover:bg-raised mobile:p-5" href={url(`/past-cars/${car.id}`)}>
                  <span className="relative block aspect-16/10 overflow-hidden bg-placeholder">
                    {car.img ? (
                      <img className="size-full object-cover" src={url(car.img)} alt="" />
                    ) : (
                      <span className="grid h-full place-items-center font-display text-56 font-bold tracking-tightest text-stroke-white/18" aria-hidden>
                        {car.name}
                      </span>
                    )}
                  </span>
                  <span className="flex flex-1 flex-col pt-5">
                    <span className="t-eyebrow tracking-widest">{[car.type, car.year].filter(Boolean).join(' · ')}</span>
                    <span className="mt-2 font-display text-36 leading-none font-semibold tracking-tight transition-colors duration-300 group-hover/car:text-brand-end">
                      {car.name}
                    </span>
                    {car.award && <span className="mt-3 font-ui text-13 font-semibold text-fg-body before:content-['🏆_']">{car.award[lang]}</span>}
                    <span className="mt-auto inline-flex items-center gap-1.5 self-end pt-5 font-ui text-14 font-semibold text-brand-end [&>svg]:size-4">
                      {copy.view}
                      <ArrowUpRight />
                    </span>
                  </span>
                </a>
              </Reveal>
            ))}
            {fillers.map((show, k) => (
              <li key={`filler-${k}`} className={cx(cell, show)} aria-hidden />
            ))}
          </ul>
        </div>
      </main>
    </>
  )
}
