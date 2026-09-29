import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'

/* jagged loop around the card: points every ~12px along each edge, each nudged at random */
function arcPath({ left, top, right, bottom }) {
  const pad = 3
  const jitter = () => (Math.random() * 2 - 1) * 2.5
  const corners = [
    [left - pad, top - pad],
    [right + pad, top - pad],
    [right + pad, bottom + pad],
    [left - pad, bottom + pad],
  ]
  const points = corners.flatMap(([x0, y0], i) => {
    const [x1, y1] = corners[(i + 1) % 4]
    const n = Math.max(1, Math.round(Math.hypot(x1 - x0, y1 - y0) / 12))
    return Array.from({ length: n }, (_, k) => `${x0 + ((x1 - x0) * k) / n + jitter()},${y0 + ((y1 - y0) * k) / n + jitter()}`)
  })
  return `M${points.join('L')}Z`
}

/**
 * Current crackling around `rect` (a card's bounding box) while the lights dip, then `onDone`.
 * Portaled to <body> so it's positioned against the viewport. Styles: `.shock-arc` in index.css.
 */
export default function ShockArc({ rect, onDone }) {
  const [paths, setPaths] = useState(() => [arcPath(rect), arcPath(rect)])

  useEffect(() => {
    const id = setInterval(() => setPaths([arcPath(rect), arcPath(rect)]), 45)
    return () => clearInterval(id)
  }, [rect])

  return createPortal(
    <div className="shock-arc" onAnimationEnd={(e) => e.target === e.currentTarget && onDone()} aria-hidden="true">
      <svg fill="none" strokeLinejoin="bevel">
        <path d={paths[1]} className="shock-arc-glow" />
        <path d={paths[0]} className="shock-arc-glow" />
        <path d={paths[0]} className="shock-arc-core" />
      </svg>
    </div>,
    document.body,
  )
}
