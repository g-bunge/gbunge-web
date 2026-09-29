import { useRef, useState } from 'react'
import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Button from '../components/ui/Button.jsx'
import ShockArc from '../components/ui/ShockArc.jsx'
import { ChevronDown } from '../components/ui/Icons.jsx'
import { teams } from '../data/team.js'
import useLang from '../i18n/LanguageContext.js'
import cx from '../lib/cx.js'

/* easter egg: clicking these cards in this order opens the /reaction minigame */
const REACTION_CODE = ['aerodynamics', 'c-baja', 'powertrain']

export default function Team() {
  const [open, setOpen] = useState(null)
  const [shock, setShock] = useState(null)
  const shockClicks = useRef(0)
  const recentClicks = useRef([])
  const { lang } = useLang()

  const onCardClick = (e, team, i, isOpen) => {
    setOpen(isOpen ? null : i)
    // easter egg: every third time the High Voltage card is opened; closing doesn't count
    if (team.shock && !isOpen && ++shockClicks.current % 3 === 0) setShock({ id: shockClicks.current, rect: e.currentTarget.getBoundingClientRect() })
    // easter egg: the last few clicks spell out REACTION_CODE
    recentClicks.current = [...recentClicks.current, team.img].slice(-REACTION_CODE.length)
    if (recentClicks.current.join() === REACTION_CODE.join()) window.location.assign('/reaction')
  }

  return (
    <section id="team" className="bg-raised px-6 pt-20.75 pb-20 tablet:px-gutter tablet:pt-18 tablet:pb-14">
      <Reveal>
        <SectionHeading eyebrow="26/27 Team" title="Our Team" align="center" />
      </Reveal>

      <div className="mx-auto mt-17.5 flex max-w-218 flex-wrap justify-center gap-6 mobile:gap-3">
        {teams.map((team, i) => {
          const isOpen = open === i
          return (
            <Reveal
              key={team.name}
              className="h-95 w-50 mobile:aspect-200/380 mobile:h-auto mobile:w-[calc(50%-6px)]"
              delay={(i % 4) * 90 + (i >= 4 ? 120 : 0)}
            >
              <button
                className={cx(
                  'group/card relative block size-full overflow-hidden text-center transition-[scale] duration-500 ease-out hover:scale-104',
                  'after:absolute after:inset-0 after:transition-opacity after:duration-500 after:ease-out',
                  isOpen ? 'after:bg-black/72 after:opacity-100' : 'after:bg-[linear-gradient(transparent_55%,rgb(0_0_0/0.5))] after:opacity-60',
                )}
                onClick={(e) => onCardClick(e, team, i, isOpen)}
                aria-expanded={isOpen}
              >
                {team.photo === false ? (
                  <span className="block size-full bg-placeholder" />
                ) : (
                  <img className="size-full object-cover brightness-75 transition-[filter] duration-500 group-hover/card:brightness-100" src={`/images/team-${team.img}.jpg`} alt="" />
                )}
                <span
                  className={cx(
                    'absolute inset-x-0 z-2 font-display text-18 font-bold tracking-snug [text-shadow:0_1px_8px_rgb(0_0_0/0.35)] [transition:top_0.6s_var(--ease-out)]',
                    isOpen ? 'top-22.5 mobile:top-auto mobile:bottom-[60%]' : 'top-71.5 mobile:top-auto mobile:bottom-15.5',
                  )}
                >
                  {team.name}
                </span>
                {/* stays put when the card opens: only flips */}
                <ChevronDown
                  className={cx(
                    'absolute top-80.5 left-1/2 z-2 -ml-2.5 h-3 w-5 transition-[rotate] duration-500 ease-out mobile:top-auto mobile:bottom-9',
                    isOpen && 'rotate-180',
                  )}
                />
                <span
                  className={cx(
                    'pointer-events-none absolute inset-x-4.5 top-37.5 z-2 text-14 leading-5.5 break-keep [transition:opacity_0.4s,translate_0.6s_var(--ease-out)] mobile:top-[45%]',
                    isOpen ? 'opacity-100 delay-150' : 'translate-y-5 opacity-0',
                  )}
                >
                  {team.desc[lang]}
                </span>
              </button>
            </Reveal>
          )
        })}
      </div>

      {shock && <ShockArc key={shock.id} rect={shock.rect} onDone={() => setShock(null)} />}

      <Reveal className="mt-16 text-center">
        <Button className="w-50 px-0!" href="/team">
          About Our Team
        </Button>
      </Reveal>
    </section>
  )
}
