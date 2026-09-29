import Lines from './Lines.jsx'
import cx from '../../lib/cx.js'

/** Eyebrow + title pair. `title` may be a string or an array of lines. */
export default function SectionHeading({ eyebrow, title, align = 'left', as: Tag = 'h2', className = '' }) {
  const center = align === 'center'
  return (
    <div className={cx(center && 'flex flex-col items-center text-center', className)}>
      {eyebrow && <p className={cx('t-eyebrow', center ? 'mb-2.5' : 'mb-4')}>{eyebrow}</p>}
      <Tag className="t-title">
        <Lines lines={title} />
      </Tag>
    </div>
  )
}
