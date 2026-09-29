import { categories, formatDate, teamName } from '../../data/posts.js'
import cx from '../../lib/cx.js'
import { url } from '../../lib/url.js'

/** Cover, category · team · date, title and excerpt: links to the post. `featured` lays it out wide. */
export default function PostCard({ post, lang, featured = false, label }) {
  return (
    <a
      className={cx('group/post h-full', featured ? 'grid grid-cols-[7fr_5fr] items-center gap-12 tablet:grid-cols-1 tablet:gap-0' : 'flex flex-col')}
      href={url(`/stories/${post.slug}`)}
    >
      <span className="relative block aspect-16/10 overflow-hidden bg-placeholder">
        {post.cover && (
          <img
            className="size-full object-cover brightness-90 [transition:scale_0.7s_var(--ease-out),filter_0.7s] group-hover/post:scale-105 group-hover/post:brightness-110"
            src={url(post.cover)}
            alt=""
          />
        )}
        {label && <span className="absolute top-4 left-4 bg-brand-gradient px-3 py-1.5 font-ui text-12 font-semibold tracking-wide">{label}</span>}
      </span>
      <span className={cx('flex flex-col', featured ? 'tablet:pt-6' : 'pt-5')}>
        <span className="flex gap-3 font-ui text-13 font-medium text-fg-muted">
          <span className="font-semibold text-brand-end">{categories[post.category][lang]}</span>
          {post.team && <em className="font-semibold not-italic">{teamName(post.team)}</em>}
          {post.date && <time dateTime={post.date}>{formatDate(post.date)}</time>}
        </span>
        <span
          className={cx(
            'font-semibold break-keep transition-colors duration-300 group-hover/post:text-brand-end',
            featured ? 'my-4 font-display text-feature leading-[1.25]' : 'my-2.5 text-21 leading-[1.4]',
          )}
        >
          {post.title[lang]}
        </span>
        <span className={cx('overflow-hidden break-keep', featured ? 'line-clamp-4 text-17 leading-7 text-fg-body' : 'line-clamp-2 text-15 leading-6.25 text-fg-muted')}>
          {post.excerpt[lang]}
        </span>
      </span>
    </a>
  )
}
