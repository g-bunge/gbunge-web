import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import { pastCars } from '../data/cars.js'
import { partners } from '../data/sponsors.js'
import useLang from '../i18n/LanguageContext.js'
import { url } from '../lib/url.js'

/* a sponsor named in cars.js that's also in sponsors.json shows that partner's logo */
const partnerByName = Object.fromEntries(partners.map((p) => [p.name, p]))

/* each people section: heading on the left, content on the right */
const row = 'grid grid-cols-[1fr_2fr] items-start gap-x-[6vw] border-t border-line py-16 tablet:grid-cols-1 tablet:gap-y-8 tablet:py-12'
const soon = 'text-17 leading-7 break-keep text-fg-muted'

/** /past-cars/<id>: one car, then who was behind it that year: sponsors, faculty advisor and members. */
export default function CarPage({ car }) {
  const { lang, t } = useLang()
  const copy = t.carsPage

  return (
    <main className="pt-nav">
      <header className="px-gutter pt-14 mobile:pt-8">
        {/* where you are on the left, every car on the right, on one line over a rule */}
        <div className="flex items-baseline justify-between gap-6 border-b border-line pb-5 font-ui text-14 mobile:flex-col mobile:gap-3">
          <p className="text-fg-muted">
            <a className="transition-colors duration-200 hover:text-fg" href={url('/past-cars')}>
              {t.nav.pastCars}
            </a>
            <span className="mx-2.5" aria-hidden>
              /
            </span>
            <span className="text-fg">{car.name}</span>
          </p>
          <nav className="flex gap-5" aria-label={copy.indexLabel}>
            {pastCars.map((c) => (
              <a
                key={c.id}
                className="font-medium text-fg-muted transition-colors duration-200 hover:text-fg aria-[current=page]:text-brand-end"
                href={url(`/past-cars/${c.id}`)}
                aria-current={c.id === car.id ? 'page' : undefined}
              >
                {c.name}
              </a>
            ))}
          </nav>
        </div>

        <div className="mt-12 flex items-end justify-between gap-8 mobile:mt-8 mobile:flex-col mobile:items-start mobile:gap-5">
          <div>
            <p className="t-eyebrow tracking-widest">{[car.type, car.year].filter(Boolean).join(' · ')}</p>
            <h1 className="mt-3 font-display text-car leading-[0.9] font-semibold tracking-tighter">{car.name}</h1>
          </div>
          {car.award && (
            <p className="mb-2 shrink-0 bg-brand-gradient px-3.5 py-1.75 font-ui text-13 font-semibold text-fg before:content-['🏆_'] mobile:mb-0">{car.award[lang]}</p>
          )}
        </div>
      </header>

      <div className="mt-10 px-gutter mobile:mt-7">
        <div className="aspect-21/9 overflow-hidden bg-placeholder mobile:aspect-16/10">
          {car.img ? (
            <img className="size-full animate-page-hero-zoom object-cover object-[50%_60%]" src={url(car.img)} alt={car.name} />
          ) : (
            <div className="relative grid h-full place-items-center">
              <span className="font-display text-ghost font-bold tracking-tightest text-stroke-white/18" aria-hidden>
                {car.name}
              </span>
              <p className="absolute bottom-5 left-6 font-ui text-13 text-fg-muted">{copy.photoSoon}</p>
            </div>
          )}
        </div>
      </div>

      {/* description on the left, the six specs as a 3 × 2 grid on the right */}
      <Reveal className="grid grid-cols-[5fr_7fr] gap-x-[6vw] px-gutter pt-14 pb-24 tablet:grid-cols-1 tablet:gap-y-10 mobile:pt-10 mobile:pb-16">
        <p className="t-body break-keep">{car.desc?.[lang] ?? copy.descSoon}</p>
        <dl className="grid grid-cols-3 border-t border-l border-line mobile:grid-cols-2">
          {Object.entries(car.specs).map(([key, value]) => (
            <div key={key} className="border-r border-b border-line px-5 py-5">
              <dt className="mb-2 font-ui text-12 font-semibold tracking-wider text-fg-muted uppercase">{copy.specs[key]}</dt>
              <dd className="font-display text-18 leading-snug font-semibold">{value}</dd>
            </div>
          ))}
        </dl>
      </Reveal>

      <div className="px-gutter pb-28 mobile:pb-18">
        <section className={row}>
          <Reveal>
            <SectionHeading title={copy.sponsors.title} />
          </Reveal>
          <Reveal delay={120}>
            {car.sponsors.length ? (
              <ul className="grid grid-cols-3 gap-4 laptop:grid-cols-2 mobile:grid-cols-1">
                {car.sponsors.map((name) => {
                  const partner = partnerByName[name]
                  return (
                    <li key={name} className="grid aspect-video place-items-center bg-surface p-[14%]">
                      {partner?.logo ? (
                        <img className="size-full object-contain brightness-0 invert opacity-85" src={url(partner.logo)} alt={name} />
                      ) : (
                        <span className="font-display text-24 font-bold tracking-tight opacity-85">{name}</span>
                      )}
                    </li>
                  )
                })}
              </ul>
            ) : (
              <p className={soon}>{copy.sponsors.soon}</p>
            )}
          </Reveal>
        </section>

        <section className={row}>
          <Reveal>
            <SectionHeading title={copy.advisor.title} />
          </Reveal>
          <Reveal delay={120}>
            {car.advisor ? (
              <>
                <p className="font-display text-36 leading-[1.15] font-semibold tracking-tight mobile:text-28">{car.advisor.name[lang]}</p>
                {car.advisor.dept && <p className="mt-2 font-ui text-15 text-fg-muted">{car.advisor.dept[lang]}</p>}
              </>
            ) : (
              <p className={soon}>{copy.advisor.soon}</p>
            )}
          </Reveal>
        </section>

        <section className={row}>
          <Reveal>
            <SectionHeading title={copy.members.title} />
          </Reveal>
          <Reveal delay={120}>
            {car.members.length ? (
              <ul className="grid grid-cols-4 gap-x-6 gap-y-7 laptop:grid-cols-3 mobile:grid-cols-2">
                {car.members.map((m, i) => (
                  <li key={i} className="border-t border-line pt-3.5">
                    <p className="text-18 font-semibold">{m.name}</p>
                    {m.role && <p className="mt-1 font-ui text-13 text-fg-muted">{m.role}</p>}
                  </li>
                ))}
              </ul>
            ) : (
              <p className={soon}>{copy.members.soon}</p>
            )}
          </Reveal>
        </section>
      </div>
    </main>
  )
}
