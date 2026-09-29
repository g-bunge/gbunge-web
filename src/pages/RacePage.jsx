import { useEffect, useRef, useState } from 'react'
import Button from '../components/ui/Button.jsx'
import useLang from '../i18n/LanguageContext.js'
import { clamp, fitCanvas, isPressing, listenKeys, rand, readBest, saveBest } from '../lib/game.js'
import { url } from '../lib/url.js'

/*
 * /race: hidden autocross minigame, reached from the footer copyright line.
 * The track is drawn on a 360×640 canvas; React only handles the ready / game-over screens.
 */

const W = 360
const H = 640
const ROAD_L = 36
const ROAD_R = 324
const CAR_Y = H - 120
const CAR_W = 24
const CAR_H = 50
const CONE_R = 8
const START_SPEED = 280
const MAX_SPEED = 720
const BEST_KEY = 'gbunge-race-best'

const BRAND = '#d94333'
const CONE = '#ff7a1a'

const lerp = (a, b, k) => a + (b - a) * k

function newGame() {
  return { x: W / 2, vx: 0, speed: START_SPEED, dist: 0, scroll: 0, cones: [], nextRow: 320, gapX: W / 2, flip: false, crash: null, score: 0 }
}

/* 0 at the start, 1 at top speed */
const difficulty = (g) => clamp((g.speed - START_SPEED) / (MAX_SPEED - START_SPEED), 0, 1)

/* one row of cones: mostly gates the car must thread, sometimes a slalom cluster */
function spawnRow(g) {
  const k = difficulty(g)
  const y = -20
  if (Math.random() < 0.6) {
    const gap = lerp(120, 78, k)
    const shift = lerp(90, 130, k)
    g.gapX = clamp(g.gapX + rand(-shift, shift), ROAD_L + gap / 2 + 10, ROAD_R - gap / 2 - 10)
    for (let x = ROAD_L + 14; x <= ROAD_R - 14; x += 30) {
      if (Math.abs(x - g.gapX) > gap / 2) g.cones.push({ x, y })
    }
  } else {
    g.flip = !g.flip
    const center = lerp(ROAD_L, ROAD_R, g.flip ? 0.3 : 0.7) + rand(-24, 24)
    const n = 2 + Math.round(k * 2)
    for (let i = 0; i < n; i++) g.cones.push({ x: center + (i - (n - 1) / 2) * 22, y })
    g.gapX = lerp(ROAD_L, ROAD_R, g.flip ? 0.72 : 0.28)
  }
  return lerp(260, 190, k)
}

function update(g, dt, steer, phase) {
  if (phase === 'ready') {
    g.scroll += 120 * dt
    return
  }

  if (!g.crash) {
    g.speed = Math.min(MAX_SPEED, g.speed + 9 * dt)
    g.vx += (steer * 300 - g.vx) * Math.min(1, dt * 8)
    g.x = clamp(g.x + g.vx * dt, ROAD_L + CAR_W / 2 + 6, ROAD_R - CAR_W / 2 - 6)
  } else {
    g.crash.t += dt
    g.speed = Math.max(0, g.speed - 1100 * dt)
    g.vx *= 0.85
  }

  const dy = g.speed * dt
  g.scroll += dy
  g.dist += dy

  for (const c of g.cones) {
    c.y += dy
    if (c.fly) {
      c.x += c.fly.vx * dt
      c.y += c.fly.vy * dt
      c.fly.vy += 900 * dt
      c.fly.rot += c.fly.spin * dt
    }
  }
  g.cones = g.cones.filter((c) => c.y < H + 40)

  if (g.crash) return

  g.nextRow -= dy
  if (g.nextRow <= 0) g.nextRow += spawnRow(g)

  const hit = g.cones.find((c) => Math.abs(c.x - g.x) < CAR_W / 2 + CONE_R - 3 && Math.abs(c.y - CAR_Y) < CAR_H / 2 + CONE_R - 4)
  if (hit) {
    hit.fly = { vx: (hit.x - g.x) * 10 + rand(-60, 60), vy: -520, rot: 0, spin: rand(-14, 14) }
    g.crash = { t: 0 }
    g.score = Math.floor(g.dist / 10)
    return true
  }
}

function drawTrack(ctx, g) {
  ctx.fillStyle = '#0b0b0b'
  ctx.fillRect(0, 0, W, H)

  // runoff dots scroll with the track so the speed reads at the edges too
  ctx.fillStyle = 'rgb(255 255 255 / 0.05)'
  const dotOffset = g.scroll % 32
  for (let y = -32 + dotOffset; y < H; y += 32) {
    for (const x of [10, 22, W - 22, W - 10]) ctx.fillRect(x, y, 2, 2)
  }

  ctx.fillStyle = '#1a1a1a'
  ctx.fillRect(ROAD_L, 0, ROAD_R - ROAD_L, H)

  // kerbs
  const stripe = 22
  const kerbOffset = g.scroll % (stripe * 2)
  for (let y = -stripe * 2 + kerbOffset, i = 0; y < H; y += stripe, i++) {
    ctx.fillStyle = i % 2 ? '#e9e9e9' : BRAND
    ctx.fillRect(ROAD_L - 8, y, 8, stripe)
    ctx.fillRect(ROAD_R, y, 8, stripe)
  }

  // faint centre dashes
  ctx.fillStyle = 'rgb(255 255 255 / 0.06)'
  const dashOffset = g.scroll % 70
  for (let y = -70 + dashOffset; y < H; y += 70) ctx.fillRect(W / 2 - 1.5, y, 3, 34)
}

function drawCone(ctx, c) {
  ctx.save()
  ctx.translate(c.x, c.y)
  if (c.fly) ctx.rotate(c.fly.rot)
  ctx.fillStyle = 'rgb(0 0 0 / 0.35)'
  ctx.beginPath()
  ctx.ellipse(2, 3, CONE_R + 2, CONE_R, 0, 0, Math.PI * 2)
  ctx.fill()
  ctx.fillStyle = '#c85200'
  ctx.fillRect(-CONE_R - 1, -CONE_R - 1, CONE_R * 2 + 2, CONE_R * 2 + 2)
  ctx.fillStyle = CONE
  ctx.beginPath()
  ctx.arc(0, 0, CONE_R, 0, Math.PI * 2)
  ctx.fill()
  ctx.strokeStyle = '#fff'
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(0, 0, CONE_R * 0.55, 0, Math.PI * 2)
  ctx.stroke()
  ctx.fillStyle = '#ffb070'
  ctx.beginPath()
  ctx.arc(0, 0, 2, 0, Math.PI * 2)
  ctx.fill()
  ctx.restore()
}

/* top-down open-wheel car, nose up */
function drawCar(ctx, g) {
  ctx.save()
  ctx.translate(g.x, CAR_Y)
  ctx.rotate(g.vx * 0.0009)

  ctx.fillStyle = 'rgb(0 0 0 / 0.4)'
  ctx.fillRect(-CAR_W / 2 + 3, -CAR_H / 2 + 5, CAR_W, CAR_H)

  // wheels
  ctx.fillStyle = '#050505'
  for (const [x, y] of [[-15, -14], [15, -14], [-15, 14], [15, 14]]) ctx.fillRect(x - 4, y - 7, 8, 14)

  // wings
  ctx.fillStyle = '#e9e9e9'
  ctx.fillRect(-14, -CAR_H / 2 - 1, 28, 4)
  ctx.fillStyle = '#222'
  ctx.fillRect(-13, CAR_H / 2 - 5, 26, 6)

  // body
  ctx.fillStyle = BRAND
  ctx.beginPath()
  ctx.moveTo(0, -CAR_H / 2 + 1)
  ctx.lineTo(5, -8)
  ctx.lineTo(9, 4)
  ctx.lineTo(9, 18)
  ctx.lineTo(6, CAR_H / 2 - 4)
  ctx.lineTo(-6, CAR_H / 2 - 4)
  ctx.lineTo(-9, 18)
  ctx.lineTo(-9, 4)
  ctx.lineTo(-5, -8)
  ctx.closePath()
  ctx.fill()

  // cockpit and helmet
  ctx.fillStyle = '#111'
  ctx.fillRect(-4, -2, 8, 12)
  ctx.fillStyle = '#f2f2f2'
  ctx.beginPath()
  ctx.arc(0, 3, 3.2, 0, Math.PI * 2)
  ctx.fill()

  ctx.restore()
}

function drawHud(ctx, g) {
  const meters = g.crash ? g.score : Math.floor(g.dist / 10)
  ctx.fillStyle = '#fff'
  ctx.font = '700 22px Urbanist, sans-serif'
  ctx.textAlign = 'left'
  ctx.fillText(`${meters} m`, ROAD_L + 8, 34)
  ctx.fillStyle = 'rgb(255 255 255 / 0.55)'
  ctx.font = '600 13px Inter, sans-serif'
  ctx.textAlign = 'right'
  ctx.fillText(`${Math.round(g.speed * 0.25)} km/h`, ROAD_R - 8, 32)
}

function draw(ctx, g, phase) {
  ctx.save()
  if (g.crash && g.crash.t < 0.3) {
    const a = (0.3 - g.crash.t) * 20
    ctx.translate(rand(-a, a), rand(-a, a))
  }
  drawTrack(ctx, g)
  g.cones.forEach((c) => drawCone(ctx, c))
  drawCar(ctx, g)
  if (phase !== 'ready') drawHud(ctx, g)
  ctx.restore()
}

export default function RacePage() {
  const { t } = useLang()
  const copy = t.race
  const canvasRef = useRef(null)
  const game = useRef(newGame())
  const steer = useRef({ left: 0, right: 0, touch: 0 })
  const [phase, setPhase] = useState('ready')
  const phaseRef = useRef(phase)
  const [result, setResult] = useState(null)
  const [best, setBest] = useState(() => readBest(BEST_KEY))
  const bestRef = useRef(best)

  // the loop reads the ref, React renders from the state
  const go = (next) => {
    phaseRef.current = next
    setPhase(next)
  }

  const start = () => {
    game.current = newGame()
    setResult(null)
    go('playing')
  }

  // game loop
  useEffect(() => {
    const ctx = fitCanvas(canvasRef.current, W, H)

    let raf
    let last = performance.now()
    const frame = (now) => {
      const dt = Math.min(0.05, (now - last) / 1000)
      last = now
      const g = game.current
      const s = steer.current
      const crashed = update(g, dt, clamp(s.right - s.left + s.touch, -1, 1), phaseRef.current)
      if (crashed) {
        const isBest = g.score > bestRef.current
        if (isBest) {
          bestRef.current = g.score
          saveBest(BEST_KEY, g.score)
          setBest(g.score)
        }
        setResult({ score: g.score, isBest })
        // let the cone land before the results come up
        setTimeout(() => go('over'), 700)
      }
      draw(ctx, g, phaseRef.current)
      raf = requestAnimationFrame(frame)
    }
    raf = requestAnimationFrame(frame)
    return () => cancelAnimationFrame(raf)
  }, [])

  // keyboard: arrows / A D steer, Space or Enter starts
  useEffect(() => {
    const keys = { ArrowLeft: 'left', a: 'left', A: 'left', ArrowRight: 'right', d: 'right', D: 'right' }
    const onKey = (e) => {
      const down = e.type === 'keydown'
      if (keys[e.key]) {
        steer.current[keys[e.key]] = down ? 1 : 0
        e.preventDefault()
      } else if (down && (e.key === ' ' || e.key === 'Enter') && phaseRef.current !== 'playing') {
        e.preventDefault()
        start()
      }
    }
    return listenKeys(onKey)
  }, [])

  // touch: hold the left or right half of the track
  const onPointer = (e) => {
    const rect = e.currentTarget.getBoundingClientRect()
    const side = e.clientX < rect.left + rect.width / 2 ? -1 : 1
    steer.current.touch = isPressing(e) ? side : 0
  }

  return (
    <main className="flex min-h-dvh flex-col items-center justify-center gap-5 bg-bg px-4 py-6 font-ui select-none">
      <div className="flex w-[min(360px,calc((100dvh-140px)*9/16))] items-center justify-between text-13 text-fg-muted">
        <a className="transition-colors duration-250 hover:text-fg" href={url('/')}>
          ← {copy.back}
        </a>
        <span>
          {copy.best} {best} m
        </span>
      </div>

      <div
        className="relative aspect-9/16 w-[min(360px,calc((100dvh-140px)*9/16))] touch-none overflow-hidden border border-line-soft"
        onPointerDown={onPointer}
        onPointerMove={onPointer}
        onPointerUp={onPointer}
        onPointerCancel={onPointer}
        onPointerLeave={onPointer}
      >
        <canvas ref={canvasRef} className="block size-full" />

        {phase !== 'playing' && (
          <div className="absolute inset-0 flex flex-col items-center justify-center bg-black/60 px-8 text-center backdrop-blur-[2px]">
            {phase === 'ready' ? (
              <>
                <p className="text-12 font-semibold tracking-[0.16em] text-brand-end">G-BungE</p>
                <h1 className="mt-2 font-display text-40 font-bold tracking-tight">AUTOCROSS</h1>
                <p className="mt-4 text-14 leading-5.5 break-keep text-fg-body">{copy.tagline}</p>
                <p className="mt-2 text-12 leading-5 break-keep text-fg-muted">{copy.controls}</p>
              </>
            ) : (
              <>
                <p className="text-12 font-semibold tracking-[0.16em] text-brand-end">{result?.isBest ? copy.newBest : copy.crashed}</p>
                <p className="mt-3 font-display text-56 leading-none font-bold">
                  {result?.score}
                  <span className="ml-1 text-24 text-fg-muted">m</span>
                </p>
                <p className="mt-3 text-13 text-fg-muted">
                  {copy.best} {best} m
                </p>
              </>
            )}
            <Button className="mt-8" onClick={start}>
              {phase === 'ready' ? copy.start : copy.retry}
            </Button>
            <p className="mt-3 text-11 text-fg-muted">{copy.startHint}</p>
          </div>
        )}
      </div>
    </main>
  )
}
