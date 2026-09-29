import { Fragment } from 'react'
import cx from '../../lib/cx.js'
import { url } from '../../lib/url.js'

/*
 * Renders a post body: an array of blocks, as written by scripts/fetch-posts.mjs.
 *   'text'                              : a plain paragraph (hand-written posts)
 *   { type: 'p' | 'h2' | 'h3' | 'quote', text }
 *   { type: 'ul' | 'ol', items: [text] }
 *   { type: 'img', src, caption }
 *   { type: 'hr' }
 * `text` is an array of runs: { text, bold, italic, strike, underline, code, href }.
 */

function Rich({ runs }) {
  return runs.map((r, i) => {
    let node = r.text
    if (r.code) node = <code className="rounded bg-surface px-1.5 py-0.5 font-mono text-[0.9em]">{node}</code>
    if (r.bold) node = <strong className="font-semibold text-fg">{node}</strong>
    if (r.italic) node = <em>{node}</em>
    if (r.strike) node = <s>{node}</s>
    if (r.underline) node = <u>{node}</u>
    if (r.href) {
      node = (
        <a className="text-brand-end underline decoration-1 underline-offset-4" href={r.href} target="_blank" rel="noreferrer">
          {node}
        </a>
      )
    }
    return <Fragment key={i}>{node}</Fragment>
  })
}

const text = 'text-18 leading-8 break-keep text-fg-body mobile:text-16 mobile:leading-7'

function Block({ block }) {
  if (typeof block === 'string') return <p className={text}>{block}</p>
  switch (block.type) {
    case 'h2':
      return (
        <h2 className="mt-14! font-display text-28 leading-[1.3] font-semibold">
          <Rich runs={block.text} />
        </h2>
      )
    case 'h3':
      return (
        <h3 className="mt-10! text-21 leading-[1.4] font-semibold">
          <Rich runs={block.text} />
        </h3>
      )
    case 'quote':
      return (
        <blockquote className={cx(text, 'border-l-2 border-brand pl-5')}>
          <Rich runs={block.text} />
        </blockquote>
      )
    case 'ul':
    case 'ol': {
      const List = block.type
      return (
        <List className={cx(text, 'space-y-2 pl-6 marker:text-brand-end', block.type === 'ul' ? 'list-disc' : 'list-decimal')}>
          {block.items.map((item, i) => (
            <li key={i}>
              <Rich runs={item} />
            </li>
          ))}
        </List>
      )
    }
    case 'img':
      return (
        <figure className="my-12!">
          <img className="w-full" src={url(block.src)} alt={block.caption.map((r) => r.text).join('')} loading="lazy" />
          {block.caption.length > 0 && (
            <figcaption className="mt-3 text-center font-ui text-13 text-fg-muted">
              <Rich runs={block.caption} />
            </figcaption>
          )}
        </figure>
      )
    case 'hr':
      return <hr className="my-12! border-line" />
    default:
      return (
        <p className={text}>
          <Rich runs={block.text ?? []} />
        </p>
      )
  }
}

/** A post's body, centred in a reading-width column. */
export default function PostBody({ blocks, className = '' }) {
  return (
    <article className={cx('mx-auto max-w-180 space-y-7', className)}>
      {blocks.map((block, i) => (
        <Block key={i} block={block} />
      ))}
    </article>
  )
}
