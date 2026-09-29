import { useState } from 'react'
import useAutoplay from '../../hooks/useAutoplay.js'
import cx from '../../lib/cx.js'
import { url } from '../../lib/url.js'

const arrow =
  'absolute top-1/2 -mt-3.25 size-6.5 rounded-full bg-white/35 text-20 leading-6 text-fg-on-light opacity-0 ' +
  '[transition:background_0.3s,opacity_0.3s,scale_0.3s_var(--ease-out)] group-hover/carousel:opacity-100 hover:scale-112 hover:bg-white/85'

/**
 * Autoplaying image carousel with arrows (on hover) and dot navigation.
 * `children` are rendered on top of the slides (e.g. a corner badge).
 */
export default function Carousel({ slides, interval = 4500, className = '', children }) {
  const [hovered, setHovered] = useState(false)
  const { index, next, back, goTo } = useAutoplay(slides.length, { interval, paused: hovered })

  return (
    <div className={cx('group/carousel relative h-full overflow-hidden', className)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex h-full transition-transform duration-800 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div className="h-full flex-[0_0_100%]" key={i} aria-hidden={i !== index}>
            <img className="size-full object-cover" src={url(s.src)} alt={s.alt} />
          </div>
        ))}
      </div>

      {children}

      <button className={cx(arrow, 'left-2')} onClick={back} aria-label="Previous slide">
        ‹
      </button>
      <button className={cx(arrow, 'right-2')} onClick={next} aria-label="Next slide">
        ›
      </button>

      <div className="absolute inset-x-0 bottom-4 flex justify-center gap-2">
        {slides.map((_, i) => (
          <button
            key={i}
            className={cx(
              'h-1.5 rounded-[3px] [transition:width_0.3s_var(--ease-out),background_0.3s]',
              i === index ? 'w-4 bg-brand-gradient' : 'w-1.5 bg-white/70',
            )}
            onClick={() => goTo(i)}
            aria-label={`Slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  )
}
