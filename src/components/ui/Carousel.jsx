import { useState } from 'react'
import useAutoplay from '../../hooks/useAutoplay.js'
import cx from '../../lib/cx.js'
import { url } from '../../lib/url.js'
import { PlayIcon } from './Icons.jsx'

const arrow =
  'absolute top-1/2 -mt-3.25 size-6.5 rounded-full bg-white/35 text-20 leading-6 text-fg-on-light opacity-0 ' +
  '[transition:background_0.3s,opacity_0.3s,scale_0.3s_var(--ease-out)] group-hover/carousel:opacity-100 hover:scale-112 hover:bg-white/85'

/**
 * Autoplaying image carousel with arrows (on hover) and dot navigation.
 * `children` are rendered on top of the slides (e.g. a corner badge).
 * A slide is { src, alt }, plus optional `href` (the slide opens it in a new tab), `video` (a play badge on the still)
 * and `contain` (the whole image shows uncropped, over a blurred copy of itself).
 */
export default function Carousel({ slides, interval = 4500, className = '', children }) {
  const [hovered, setHovered] = useState(false)
  const { index, next, back, goTo } = useAutoplay(slides.length, { interval, paused: hovered })

  return (
    <div className={cx('group/carousel relative h-full overflow-hidden', className)} onMouseEnter={() => setHovered(true)} onMouseLeave={() => setHovered(false)}>
      <div className="flex h-full transition-transform duration-800 ease-out" style={{ transform: `translateX(-${index * 100}%)` }}>
        {slides.map((s, i) => (
          <div className="relative h-full flex-[0_0_100%]" key={i} aria-hidden={i !== index}>
            {s.contain && <img className="absolute inset-0 size-full scale-110 object-cover blur-xl brightness-50" src={url(s.src)} alt="" loading={i ? 'lazy' : undefined} aria-hidden />}
            {s.href ? (
              <a className="relative block size-full" href={s.href} target="_blank" rel="noreferrer" tabIndex={i === index ? 0 : -1}>
                <img className={cx('size-full', s.contain ? 'object-contain' : 'object-cover')} src={url(s.src)} alt={s.alt} loading={i ? 'lazy' : undefined} />
              </a>
            ) : (
              <img className={cx('relative size-full', s.contain ? 'object-contain' : 'object-cover')} src={url(s.src)} alt={s.alt} />
            )}
            {s.video && (
              <span className="pointer-events-none absolute top-1/2 left-1/2 grid size-14 -translate-1/2 place-items-center rounded-full bg-black/45 text-white backdrop-blur-sm" aria-hidden>
                <PlayIcon className="ml-0.5 size-6" />
              </span>
            )}
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
