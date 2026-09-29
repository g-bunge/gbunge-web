import { useState } from 'react'
import Reveal from '../components/ui/Reveal.jsx'
import PageHero from '../components/ui/PageHero.jsx'
import PostCard from '../components/ui/PostCard.jsx'
import Button from '../components/ui/Button.jsx'
import { InstagramIcon } from '../components/ui/Icons.jsx'
import { categories, posts } from '../data/posts.js'
import useLang from '../i18n/LanguageContext.js'
import { INSTAGRAM } from '../data/site.js'
import cx from '../lib/cx.js'

/** /stories: the blog: latest post up top, then every post with a category filter. */
export default function StoriesPage() {
  const { lang, t } = useLang()
  const copy = t.storiesPage
  const [filter, setFilter] = useState('all')

  const [latest, ...rest] = posts
  const shown = filter === 'all' ? rest : posts.filter((p) => p.category === filter)
  const filters = [['all', copy.all], ...Object.entries(categories).map(([id, name]) => [id, name[lang]])]

  return (
    <>
      <PageHero eyebrow="SNS & BLOG" title="Our Stories" lead={copy.lead} img="/images/hero-2.jpg" alt={copy.heroAlt} />

      <main className="px-gutter pt-12 pb-30">
        <Reveal className="border-b border-line pb-18 mobile:pb-12">
          <PostCard post={latest} lang={lang} featured label={copy.latest} />
        </Reveal>

        <div className="mt-14 mb-10 flex flex-wrap gap-2 mobile:mt-10 mobile:mb-8" role="group" aria-label={copy.filterLabel}>
          {filters.map(([id, label]) => (
            <button
              key={id}
              type="button"
              className={cx(
                'h-9.5 rounded-full border px-5 font-ui text-14 font-semibold [transition:color_0.3s,border-color_0.3s,background_0.3s]',
                filter === id ? 'border-transparent bg-brand-gradient text-fg' : 'border-white/14 text-fg-muted hover:border-white/40 hover:text-fg',
              )}
              aria-pressed={filter === id}
              onClick={() => setFilter(id)}
            >
              {label}
            </button>
          ))}
        </div>

        <div className="grid grid-cols-3 gap-[56px_28px] tablet:grid-cols-2 mobile:grid-cols-1 mobile:gap-10">
          {shown.map((post, i) => (
            <Reveal key={post.slug} delay={(i % 3) * 100}>
              <PostCard post={post} lang={lang} />
            </Reveal>
          ))}
        </div>

        <Reveal
          as="section"
          className="mt-26 flex items-center gap-7 border border-line-faint bg-raised px-12 py-10 mobile:mt-18 mobile:flex-col mobile:items-start mobile:gap-5 mobile:px-6 mobile:py-8"
        >
          <InstagramIcon className="size-11 flex-none text-brand-end" />
          <div>
            <h2 className="font-display text-26 font-semibold">{copy.insta.title}</h2>
            <p className="mt-1.5 text-15 text-fg-muted">{copy.insta.body}</p>
          </div>
          <Button className="ml-auto mobile:ml-0" href={INSTAGRAM} target="_blank" rel="noreferrer">
            @gbunge_
          </Button>
        </Reveal>
      </main>
    </>
  )
}
