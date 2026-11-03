import Lines from './Lines.jsx'
import cx from '../../lib/cx.js'

/** A section title. `title` may be a string or an array of lines. */
export default function SectionHeading({ title, align = 'left', as: Tag = 'h2', className = '' }) {
  return (
    <div className={cx(align === 'center' && 'flex flex-col items-center text-center', className)}>
      <Tag className="t-title">
        <Lines lines={title} />
      </Tag>
    </div>
  )
}
