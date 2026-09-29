import useReveal from '../../hooks/useReveal.js'
import cx from '../../lib/cx.js'

/**
 * Fades its children in when scrolled into view (styles: `.reveal` in styles/index.css).
 * variant: 'up' | 'left' | 'right': the direction it slides in from.
 */
export default function Reveal({ as: Tag = 'div', variant = 'up', delay = 0, className = '', style, children, ...rest }) {
  const [ref, visible] = useReveal()
  return (
    <Tag ref={ref} className={cx('reveal', `reveal--${variant}`, visible && 'is-visible', className)} style={{ transitionDelay: `${delay}ms`, ...style }} {...rest}>
      {children}
    </Tag>
  )
}
