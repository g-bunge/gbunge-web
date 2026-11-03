import Reveal from '../components/ui/Reveal.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import { ArrowUpRight } from '../components/ui/Icons.jsx'
import { pastCars } from '../data/cars.js'
import useLang from '../i18n/LanguageContext.js'
import { url } from '../lib/url.js'

/** /past-cars: every car we've raced, newest first, each card opening that car's own page. */
export default function PastCarsPage() {
  const { lang, t } = useLang()
  const copy = t.carsPage

  return (
    <>
      <PageHero title="Past Cars" img="/images/mk5-race.jpg" focus="45% 55%" alt={copy.heroAlt} />

      <main className="px-gutter pt-14 pb-30 mobile:pb-18">
        <ul className="grid grid-cols-3 gap-5 tablet:grid-cols-2 mobile:grid-cols-1">
          {pastCars.map((car, i) => (
            <Reveal as="li" key={car.id} delay={(i % 3) * 90}>
              <a className="group/car flex h-full flex-col bg-raised transition-colors duration-300 hover:bg-surface" href={url(`/past-cars/${car.id}`)}>
                <span className="relative block aspect-16/10 overflow-hidden bg-placeholder">
                  {car.img ? (
                    <img className="size-full object-cover transition-[scale] duration-700 ease-out group-hover/car:scale-105" src={url(car.img)} alt="" />
                  ) : (
                    <span className="grid h-full place-items-center font-display text-56 font-bold tracking-tightest text-stroke-white/18" aria-hidden>
                      {car.name}
                    </span>
                  )}
                </span>
                <span className="flex flex-1 flex-col px-6 pt-5 pb-6">
                  <span className="t-eyebrow tracking-widest">{[car.type, car.year].filter(Boolean).join(' · ')}</span>
                  <span className="mt-2 font-display text-36 leading-none font-semibold tracking-tight transition-colors duration-300 group-hover/car:text-brand-end">
                    {car.name}
                  </span>
                  {car.award && <span className="mt-3 font-ui text-13 font-semibold text-fg-body">{car.award[lang]}</span>}
                  <span className="mt-auto inline-flex items-center gap-1.5 self-end pt-5 font-ui text-14 font-semibold text-brand-end [&>svg]:size-4">
                    {copy.view}
                    <ArrowUpRight />
                  </span>
                </span>
              </a>
            </Reveal>
          ))}
        </ul>
      </main>
    </>
  )
}
