import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Button from '../components/ui/Button.jsx'
import Carousel from '../components/ui/Carousel.jsx'
import { ArrowUpRight, InstagramIcon } from '../components/ui/Icons.jsx'
import { storySlides } from '../data/stories.js'
import { posts } from '../data/posts.js'
import useLang from '../i18n/LanguageContext.js'
import { INSTAGRAM } from '../data/site.js'

export default function Stories() {
  const { lang } = useLang()
  const slides = storySlides.map((s) => ({ ...s, alt: s.alt[lang] }))

  return (
    <section id="stories" className="px-10 pt-22 pb-20 tablet:px-gutter tablet:py-20">
      <Reveal>
        <SectionHeading eyebrow="SNS&Blog" title="Our Stories" align="center" />
      </Reveal>

      <div className="mx-auto mt-14.5 grid max-w-309 grid-cols-[380fr_396fr_396fr] grid-rows-[238px_238px] gap-8 tablet:grid-cols-2 tablet:grid-rows-none tablet:gap-4 mobile:grid-cols-1">
        <Reveal className="row-span-2 overflow-hidden tablet:col-span-2 tablet:row-auto tablet:aspect-461/518 tablet:max-h-[70vh] mobile:col-auto" variant="left">
          <Carousel slides={slides}>
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
            className="relative flex flex-col bg-surface p-6 font-ui [transition:opacity_0.9s_var(--ease-out),transform_0.5s_var(--ease-out),translate_0.5s_var(--ease-out),background_0.3s,box-shadow_0.4s] tablet:min-h-55 [&.is-visible]:hover:-translate-y-1.5 [&.is-visible]:hover:bg-surface-hover [&.is-visible]:hover:shadow-lift"
            delay={100 + i * 90}
          >
            <h3 className="mb-2.5 text-20 font-semibold">{post.title[lang]}</h3>
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
