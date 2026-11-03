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
      {/* every car, this one marked: jump between them without going back */}
      <nav className="mx-gutter mt-12 grid grid-cols-5 border-y border-line mobile:mt-6" aria-label={copy.indexLabel}>
        {pastCars.map((c) => (
          <a
            key={c.id}
            className="group/car flex items-baseline justify-between gap-3 px-5 py-6 transition-colors duration-300 not-first:border-l not-first:border-line hover:bg-raised aria-[current=page]:bg-raised mobile:flex-col mobile:items-center mobile:gap-1 mobile:px-1 mobile:py-4"
            href={url(`/past-cars/${c.id}`)}
            aria-current={c.id === car.id ? 'page' : undefined}
          >
            <span className="font-display text-28 font-semibold transition-colors duration-300 group-hover/car:text-brand-end group-aria-[current=page]/car:text-brand-end mobile:text-18">
              {c.name}
            </span>
            {c.year && <span className="font-ui text-13 text-fg-muted mobile:text-11">{c.year}</span>}
          </a>
        ))}
      </nav>

      <article className="group/car grid grid-cols-[7fr_5fr] items-center gap-x-[5vw] px-gutter py-20 tablet:grid-cols-1 tablet:gap-y-8 tablet:py-14">
        <Reveal className="aspect-16/10 overflow-hidden" variant="left">
          {car.img ? (
            <img className="size-full object-cover transition-[scale] duration-800 ease-out group-hover/car:scale-104" src={url(car.img)} alt={car.name} />
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
          <h1 className="mt-2.5 mb-5 font-display text-car leading-none font-semibold tracking-tighter">{car.name}</h1>
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

      <div className="px-gutter pb-28 mobile:pb-18">
        <section className={row}>
          <Reveal>
            <SectionHeading eyebrow={[car.year, 'SPONSORS'].filter(Boolean).join(' ')} title={copy.sponsors.title} />
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
            <SectionHeading eyebrow={[car.year, 'ADVISOR'].filter(Boolean).join(' ')} title={copy.advisor.title} />
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
            <SectionHeading eyebrow={[car.year, 'MEMBERS'].filter(Boolean).join(' ')} title={copy.members.title} />
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
