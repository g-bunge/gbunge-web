import { useState } from 'react'
import cx from '../../lib/cx.js'

/**
 * Endless horizontal ticker. Items are duplicated once so the loop is seamless.
 * Logos come in white, and each is sized to cover about the same area as a 3:1 logo `itemWidth` wide,
 * so a long wordmark doesn't shrink to a sliver next to a squarer one.
 */
export default function Marquee({ items, duration = 28, gap = 106, itemWidth = 118, className = '' }) {
  const track = [...items, ...items]
  return (
    <div className={cx('group/marquee flex items-center overflow-hidden', className)}>
      <div
        className="flex w-max animate-marquee items-center gap-(--marquee-gap) pr-(--marquee-gap) group-hover/marquee:[animation-play-state:paused]"
        style={{ animationDuration: `${duration}s`, '--marquee-gap': `${gap}px` }}
      >
        {track.map((item, i) => (
          <Logo key={i} item={item} clone={i >= items.length} itemWidth={itemWidth} />
        ))}
      </div>
    </div>
  )
}

function Logo({ item, clone, itemWidth }) {
  const [width, setWidth] = useState(itemWidth)
  // no logo file yet: the name stands in, styled to sit with the logos
  if (!item.src) {
    return (
      <span className="font-display text-24 font-bold tracking-tight whitespace-nowrap opacity-45 transition-opacity duration-300 hover:opacity-100" aria-hidden={clone}>
        {item.alt}
      </span>
    )
  }
  const onLoad = (e) => {
    const { naturalWidth, naturalHeight } = e.currentTarget
    if (naturalWidth && naturalHeight) setWidth(Math.round(itemWidth * Math.sqrt(naturalWidth / naturalHeight / 3)))
  }
  return (
    <img
      className="h-auto brightness-0 invert opacity-45 [transition:opacity_0.3s,scale_0.3s_var(--ease-out)] hover:scale-108 hover:opacity-100"
      src={item.src}
      alt={clone ? '' : item.alt}
      aria-hidden={clone}
      style={{ width }}
      onLoad={onLoad}
    />
  )
}
