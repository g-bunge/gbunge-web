/* Helpers shared by the hidden minigames (/race, /reaction). */

export const clamp = (v, min, max) => Math.min(max, Math.max(min, v))
export const rand = (min, max) => min + Math.random() * (max - min)

/** A best score kept in localStorage; 0 when there is none or storage is unavailable. */
export function readBest(key) {
  try {
    return Number(localStorage.getItem(key)) || 0
  } catch {
    return 0
  }
}

export function saveBest(key, value) {
  try {
    localStorage.setItem(key, String(value))
  } catch {
    /* storage unavailable: the best only lasts this visit */
  }
}

/** Sizes the canvas for the screen's pixel density and returns a context drawn in `width`×`height` units. */
export function fitCanvas(canvas, width, height) {
  const ctx = canvas.getContext('2d')
  const dpr = Math.min(window.devicePixelRatio || 1, 2)
  canvas.width = width * dpr
  canvas.height = height * dpr
  ctx.setTransform(dpr, 0, 0, dpr, 0, 0)
  return ctx
}

/** Calls `onKey` for every keydown and keyup on the window; returns the cleanup, for useEffect. */
export function listenKeys(onKey) {
  window.addEventListener('keydown', onKey)
  window.addEventListener('keyup', onKey)
  return () => {
    window.removeEventListener('keydown', onKey)
    window.removeEventListener('keyup', onKey)
  }
}

/** Whether a pointer event means the finger or button is (still) down. */
export const isPressing = (e) => e.type === 'pointerdown' || (e.type === 'pointermove' && e.buttons > 0)
