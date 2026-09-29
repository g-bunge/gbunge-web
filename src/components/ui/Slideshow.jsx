import useAutoplay from '../../hooks/useAutoplay.js'
import cx from '../../lib/cx.js'

/**
 * Full-bleed background slideshow: each new image pushes the previous one out to the left.
 * Fills its positioned parent.
 */
export default function Slideshow({ images, interval = 4000, className = '' }) {
  const { index, prev } = useAutoplay(images.length, { interval })

  return (
    <div className={cx('absolute inset-0 overflow-hidden', className)} aria-hidden>
      {images.map((src, i) => {
        let state = 'invisible'
        if (i === index) state = prev === null ? '' : 'animate-slide-in'
        else if (i === prev) state = 'animate-slide-out'
        return <div key={src} className={cx('absolute inset-0 bg-cover bg-center bg-no-repeat', state)} style={{ backgroundImage: `url(${src})` }} />
      })}
    </div>
  )
}
