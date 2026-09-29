import { useEffect, useRef, useState } from 'react'
import Button from '../components/ui/Button.jsx'
import useLang from '../i18n/LanguageContext.js'
import { listenKeys, rand, readBest, saveBest } from '../lib/game.js'
import cx from '../lib/cx.js'

/*
 * /reaction: hidden reaction-time test, reached by clicking the home Team cards
 * AERODYNAMICS > C-BAJA > POWERTRAIN. Five start lights come on one by one, then go out
 * after a random hold; press as soon as they do. Pressing earlier is a jump start.
 */

const LIGHTS = 5
const LIGHT_STEP = 800 // ms between lights coming on
const BEST_KEY = 'gbunge-reaction-best'

/* slowest time (s) that still earns each rating, fastest first */
const RATINGS = [
  [0.2, 'elite'],
  [0.25, 'fast'],
  [0.35, 'good'],
  [Infinity, 'slow'],
]

export default function ReactionPage() {
  const { t } = useLang()
  const copy = t.reaction
  // ready → lights → go → result; a press during lights ends in jump
  const [phase, setPhase] = useState('ready')
  const phaseRef = useRef(phase)
  const [lit, setLit] = useState(0)
  const [time, setTime] = useState(null)
  const [isBest, setIsBest] = useState(false)
  const [best, setBest] = useState(() => readBest(BEST_KEY))
  const timers = useRef([])
  const goAt = useRef(0)

  const go = (next) => {
    phaseRef.current = next
    setPhase(next)
  }

  const clearTimers = () => {
    timers.current.forEach(clearTimeout)
    timers.current = []
  }

  const start = () => {
    clearTimers()
    setLit(0)
    setTime(null)
    go('lights')
    for (let i = 1; i <= LIGHTS; i++) timers.current.push(setTimeout(() => setLit(i), i * LIGHT_STEP))
    // lights out after a random hold, so the moment can't be timed
    const out = LIGHTS * LIGHT_STEP + rand(200, 3000)
    timers.current.push(
      setTimeout(() => {
        setLit(0)
        goAt.current = performance.now()
        go('go')
      }, out),
    )
  }

  const press = () => {
    const p = phaseRef.current
    if (p === 'lights') {
      clearTimers()
      go('jump')
    } else if (p === 'go') {
      const s = Math.round(performance.now() - goAt.current) / 1000
      const record = !best || s < best
      if (record) {
        saveBest(BEST_KEY, s)
        setBest(s)
      }
      setIsBest(record)
      setTime(s)
      go('result')
    } else {
      start()
    }
  }

  // stop pending lights when leaving the page
  useEffect(() => clearTimers, [])

  // Space / Enter / ↑ both start and react; held-key repeats don't count
  const pressRef = useRef(press)
  useEffect(() => {
    pressRef.current = press
  })
  useEffect(
    () =>
      listenKeys((e) => {
        if (e.type !== 'keydown' || e.repeat || ![' ', 'Enter', 'ArrowUp'].includes(e.key)) return
        e.preventDefault()
        pressRef.current()
      }),
    [],
  )

  const rating = time !== null && RATINGS.find(([limit]) => time <= limit)[1]
  const showPanel = phase === 'ready' || phase === 'result' || phase === 'jump'

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-bg px-4 py-6 font-ui select-none">
      <div className="flex w-[min(640px,100%)] items-center justify-between text-13 text-fg-muted">
        <a className="transition-colors duration-250 hover:text-fg" href="/">
          ← {copy.back}
        </a>
        <span>
          {copy.best} {best ? `${best.toFixed(3)} s` : '-'}
        </span>
      </div>

      {/* the whole stage takes the press while the lights run */}
      <div
        className="relative flex aspect-16/9 w-[min(640px,100%)] touch-none flex-col items-center justify-center overflow-hidden border border-line-soft bg-raised"
        onPointerDown={() => (phase === 'lights' || phase === 'go') && press()}
      >
        <div className="flex gap-4 rounded-2xl bg-black px-6 py-5 mobile:gap-2.5 mobile:px-4 mobile:py-3.5">
          {Array.from({ length: LIGHTS }, (_, i) => (
            <span
              key={i}
              className={cx(
                'size-12 rounded-full transition-[background,box-shadow] duration-75 mobile:size-8',
                i < lit ? 'bg-[#ff2a1a] shadow-[0_0_24px_4px_rgb(255_42_26/0.6)]' : 'bg-[#262626]',
              )}
            />
          ))}
        </div>
        <p className="mt-6 text-14 text-fg-muted">{phase === 'lights' || phase === 'go' ? copy.waitHint : ' '}</p>

        {showPanel && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/70 px-8 text-center backdrop-blur-[2px]">
            {phase === 'ready' && (
              <>
                <p className="text-12 font-semibold tracking-[0.16em] text-brand-end">G-BungE · LIGHTS OUT</p>
                <h1 className="mt-2 font-display text-40 font-bold tracking-tight mobile:text-28">REACTION</h1>
                <p className="mt-3 max-w-110 text-14 leading-5.5 break-keep text-fg-body mobile:text-13">{copy.tagline}</p>
                <p className="mt-1.5 max-w-110 text-12 leading-5 break-keep text-fg-muted">{copy.controls}</p>
              </>
            )}
            {phase === 'jump' && (
              <>
                <p className="text-12 font-semibold tracking-[0.16em] text-brand-end">JUMP START</p>
                <p className="mt-3 font-display text-32 font-bold">{copy.jump}</p>
              </>
            )}
            {phase === 'result' && (
              <>
                <p className="text-12 font-semibold tracking-[0.16em] text-brand-end">{isBest ? copy.newBest : copy.ratings[rating]}</p>
                <p className="mt-2 font-display text-56 leading-none font-bold mobile:text-40">
                  {time.toFixed(3)}
                  <span className="ml-1 text-24 text-fg-muted">s</span>
                </p>
                {isBest && <p className="mt-3 text-13 text-fg-muted">{copy.ratings[rating]}</p>}
              </>
            )}
            <Button className="mt-6 mobile:mt-4" onClick={start}>
              {phase === 'ready' ? copy.start : copy.retry}
            </Button>
            <p className="mt-2.5 text-11 text-fg-muted">{copy.startHint}</p>
          </div>
        )}
      </div>
    </main>
  )
}
