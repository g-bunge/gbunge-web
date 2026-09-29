import { useCallback, useEffect, useState } from 'react'

/**
 * Slide index state shared by every slideshow.
 * `prev` is the index that was showing before the last change (null before the first one).
 */
export default function useAutoplay(count, { interval = 5000, paused = false } = {}) {
  const [{ index, prev }, setState] = useState({ index: 0, prev: null })

  const goTo = useCallback(
    (target) =>
      setState((s) => {
        const next = ((target % count) + count) % count
        return next === s.index ? s : { index: next, prev: s.index }
      }),
    [count],
  )

  const next = useCallback(() => setState((s) => ({ index: (s.index + 1) % count, prev: s.index })), [count])
  const back = useCallback(() => setState((s) => ({ index: (s.index - 1 + count) % count, prev: s.index })), [count])

  useEffect(() => {
    if (paused || count < 2) return
    const id = setInterval(next, interval)
    return () => clearInterval(id)
  }, [paused, count, interval, next, index])

  return { index, prev, next, back, goTo }
}
