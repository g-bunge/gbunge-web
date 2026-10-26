import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Carousel from '../components/ui/Carousel.jsx'
import { ArrowUpRight, InstagramIcon } from '../components/ui/Icons.jsx'
import { storySlides } from '../data/stories.js'
import useInstagramFeed from '../hooks/useInstagramFeed.js'
import { posts } from '../data/posts.js'
import useLang from '../i18n/LanguageContext.js'
import { INSTAGRAM } from '../data/site.js'

export default function Stories() {
  const { lang } = useLang()
  const feed = useInstagramFeed()
  // the latest Instagram posts; the photos in data/stories.js while the feed loads or if it fails
  const slides = feed ?? storySlides.map((s) => ({ ...s, alt: s.alt[lang] }))

  return (
    <section id="stories" className="px-10 pt-22 pb-20 tablet:px-gutter tablet:py-20">
      {/* hashtag title, then a thin line dropping to a ringed Instagram button */}
      <Reveal className="flex flex-col items-center text-center">
        <p className="t-eyebrow mb-3">SNS&Blog</p>
        <h2 className="t-title flex items-center gap-3.5">
          <InstagramIcon className="size-7 text-brand" />
          <span className="underline decoration-brand decoration-3 underline-offset-10">#Our Stories</span>
        </h2>
        <span className="mt-7 h-12 w-px bg-white/25" aria-hidden />
        <a
          className="grid size-15 place-items-center rounded-full border border-white/25 text-fg ring-10 ring-white/4 transition-colors duration-300 hover:border-brand hover:text-brand"
          href={INSTAGRAM}
          target="_blank"
          rel="noreferrer"
          aria-label="Instagram"
        >
          <InstagramIcon className="size-5" />
        </a>
      </Reveal>

      <div className="mx-auto mt-14.5 grid max-w-309 grid-cols-[380fr_396fr_396fr] grid-rows-2 gap-8 tablet:grid-cols-2 tablet:grid-rows-none tablet:gap-4 mobile:grid-cols-1">
        {/* 4:5, Instagram's portrait post ratio; the two rows of post cards share its height */}
        <Reveal className="row-span-2 aspect-4/5 overflow-hidden clip-notch tablet:col-span-2 tablet:row-auto tablet:max-h-[70vh] tablet:justify-self-center mobile:col-auto" variant="left">
          <Carousel key={feed ? 'instagram' : 'fallback'} slides={slides}>
            <a
              className="absolute top-4.5 right-4.5 size-7 text-fg drop-shadow-[0_1px_4px_rgb(0_0_0/0.4)] transition-[scale] duration-300 ease-out hover:scale-115"
              href={INSTAGRAM}
              target="_blank"
              rel="noreferrer"
              aria-label="Instagram"
            >
              <InstagramIcon />
            </a>
          </Carousel>
        </Reveal>

        {posts.slice(0, 4).map((post, i) => (
          <Reveal
            as="article"
            key={post.slug}
            className="relative flex flex-col bg-surface p-6 font-ui clip-notch [transition:opacity_0.9s_var(--ease-out),transform_0.5s_var(--ease-out),translate_0.5s_var(--ease-out),background_0.3s,box-shadow_0.4s] tablet:min-h-55 [&.is-visible]:hover:-translate-y-1.5 [&.is-visible]:hover:bg-surface-hover [&.is-visible]:hover:shadow-lift"
            delay={100 + i * 90}
          >
            <span className="mb-4 font-display text-11 font-bold tracking-widest text-fg-muted">0{i + 1}</span>
            <h3 className="mb-2.5 font-sans text-20 font-semibold break-keep">{post.title[lang]}</h3>
            <p className="line-clamp-2 text-16 leading-7 text-fg-muted">{post.excerpt[lang]}</p>
            <Button className="mt-auto self-end pt-5" variant="link" href={`/stories/${post.slug}`}>
              Read more
              <ArrowUpRight />
            </Button>
          </Reveal>
        ))}
      </div>
    </section>
  )
}
