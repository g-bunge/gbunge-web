import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Button from '../components/ui/Button.jsx'
import useLang from '../i18n/LanguageContext.js'
import { url } from '../lib/url.js'

/* overflow-x-clip: a photo sliding in from the side mustn't widen the page on a phone before it lands */
/* the original proportions (photo 545px, gap ~95px, of a 1280px content width), as shares of the row so they hold on any screen */
const split = 'grid items-center overflow-x-clip tablet:grid-cols-1 tablet:gap-y-10 tablet:p-[60px_var(--spacing-gutter)]'
const media = 'aspect-545/532 overflow-hidden'
const text = 'max-w-162.5 tablet:max-w-none'
/* paragraphs 29px apart, 52px above the button */
const body = 't-body mb-7.25 break-keep last-of-type:mb-13'

export default function About() {
  const { t } = useLang()

  return (
    <>
      <section id="about" className={`${split} grid-cols-[42.6%_1fr] gap-x-[7.4%] px-gutter pt-7.75`}>
        <Reveal className={media} variant="left">
          <img className="size-full object-cover" src={url('/images/who.jpg')} alt={t.about.whoAlt} />
        </Reveal>
        <Reveal className={text} delay={150}>
          <SectionHeading className="mb-6.5" title={['Sorry for driving too fast,', "We're new here."]} />
          <p className={body}>{t.about.who}</p>
          <Button href="/about">About Us</Button>
        </Reveal>
      </section>

      <section className={`${split} grid-cols-[1fr_42.5%] gap-x-[7.1%] px-gutter pt-20 pb-10`}>
        <Reveal className={text} delay={150}>
          <SectionHeading className="mb-6.5" title="Less talk, More torque" />
          {t.about.heritage.map((para, i) => (
            <p key={i} className={body}>
              {para}
            </p>
          ))}
          <Button href="/past-cars">Past Cars</Button>
        </Reveal>
        <Reveal className={`${media} tablet:-order-1`} variant="right">
          <img className="size-full object-cover" src={url('/images/heritage.jpg')} alt={t.about.heritageAlt} />
        </Reveal>
      </section>
    </>
  )
}
