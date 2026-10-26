import Lines from './Lines.jsx'
import cx from '../../lib/cx.js'

/**
 * Eyebrow + title pair. `title` may be a string or an array of lines.
 * `num` ('01') sits small at the title's top-left, numbering the sections down the page.
 */
export default function SectionHeading({ eyebrow, title, num, align = 'left', as: Tag = 'h2', className = '' }) {
  const center = align === 'center'
  return (
    <div className={cx(center && 'flex flex-col items-center text-center', className)}>
      {eyebrow && <p className={cx('t-eyebrow', center ? 'mb-3' : 'mb-4')}>{eyebrow}</p>}
      <div className="flex items-start gap-4">
        {num && <span className="mt-1 font-display text-11 font-bold tracking-widest text-fg-muted">{num}</span>}
        <Tag className="t-title">
          <Lines lines={title} />
        </Tag>
      </div>
    </div>
  )
}
