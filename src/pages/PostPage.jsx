import Reveal from '../components/ui/Reveal.jsx'
import PostCard from '../components/ui/PostCard.jsx'
import PostBody from '../components/ui/PostBody.jsx'
import Button from '../components/ui/Button.jsx'
import { authorName, categories, findPost, formatDate, posts, teamName } from '../data/posts.js'
import useLang from '../i18n/LanguageContext.js'
import cx from '../lib/cx.js'

const page = 'px-gutter pt-37.5 pb-30 mobile:pt-27.5'
const rule = 'border-t border-line'
const pagerLink = 'flex flex-col gap-2 bg-raised p-6 text-17 leading-[1.4] font-semibold break-keep transition-colors duration-300 hover:bg-surface'
const pagerLabel = 'font-ui text-13 font-medium text-fg-muted'

/** /stories/<slug>: one blog post, with links to its neighbours and a couple more. */
export default function PostPage({ slug }) {
  const { lang, t } = useLang()
  const copy = t.storiesPage
  const post = findPost(slug)

  if (!post) {
    return (
      <main id="top" className={cx(page, 'flex min-h-[60vh] flex-col items-start gap-8')}>
        <h1 className="t-title">{copy.notFound}</h1>
        <Button href="/stories">{copy.back}</Button>
      </main>
    )
  }

  const index = posts.indexOf(post)
  const newer = posts[index - 1]
  const older = posts[index + 1]
  const more = posts.filter((p) => p !== post).slice(0, 3)
  const info = [
    [copy.info.category, categories[post.category][lang]],
    [copy.info.team, post.team && teamName(post.team)],
    [copy.info.author, post.author && authorName(post.author, lang)],
    [copy.info.date, post.date && <time key="date" dateTime={post.date}>{formatDate(post.date)}</time>],
  ].filter(([, value]) => value)

  return (
    <main id="top" className={page}>
      <header className="mx-auto max-w-205">
        <a className="mb-10 inline-block font-ui text-14 font-medium text-fg-muted transition-colors duration-300 hover:text-fg" href="/stories">
          ← {copy.back}
        </a>
        <p className="flex gap-3.5 font-ui text-14 text-fg-muted">
          <span className="font-semibold text-brand-end">{categories[post.category][lang]}</span>
        </p>
        <h1 className="mt-4.5 mb-6 font-display text-post-title leading-[1.15] font-semibold tracking-tight break-keep">{post.title[lang]}</h1>
        <p className="text-20 leading-8 break-keep text-fg-body mobile:text-17 mobile:leading-7">{post.excerpt[lang]}</p>
        <dl className="mt-9 flex flex-wrap gap-[16px_48px] border-t border-surface pt-6 font-ui">
          {info.map(([label, value]) => (
            <div key={label}>
              <dt className="mb-1.5 text-12 font-medium tracking-wide text-fg-muted">{label}</dt>
              <dd className="text-15 font-semibold text-fg">{value}</dd>
            </div>
          ))}
        </dl>
      </header>

      {post.cover ? (
        <figure className="mx-auto my-16 aspect-video max-w-280 overflow-hidden mobile:-mx-gutter mobile:my-10">
          <img className="size-full object-cover" src={post.cover} alt="" />
        </figure>
      ) : (
        <div className={cx(rule, 'mx-auto my-14 max-w-205')} />
      )}

      <PostBody blocks={post.body[lang]} />

      <nav className={cx(rule, 'mx-auto mt-24 grid max-w-205 grid-cols-2 gap-4 pt-10 mobile:grid-cols-1')} aria-label={copy.more}>
        {older ? (
          <a className={pagerLink} href={`/stories/${older.slug}`}>
            <span className={pagerLabel}>← {copy.prev}</span>
            {older.title[lang]}
          </a>
        ) : (
          <span />
        )}
        {newer && (
          <a className={cx(pagerLink, 'text-right')} href={`/stories/${newer.slug}`}>
            <span className={pagerLabel}>{copy.next} →</span>
            {newer.title[lang]}
          </a>
        )}
      </nav>

      <section className="mt-30">
        <h2 className="mb-10 font-display text-32 font-semibold">{copy.more}</h2>
        <div className="grid grid-cols-3 gap-7 tablet:grid-cols-2 mobile:grid-cols-1">
          {more.map((p, i) => (
            /* two per row on tablet, so the third one is left out there */
            <Reveal key={p.slug} className={i === 2 ? 'tablet:hidden mobile:block' : undefined} delay={i * 100}>
              <PostCard post={p} lang={lang} />
            </Reveal>
          ))}
        </div>
      </section>
    </main>
  )
}
