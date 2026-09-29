import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Button from '../components/ui/Button.jsx'
import useLang from '../i18n/LanguageContext.js'
import { url } from '../lib/url.js'

const split = 'grid items-center tablet:grid-cols-1 tablet:gap-y-10 tablet:p-[60px_var(--spacing-gutter)]'
const media = 'aspect-545/532 overflow-hidden'
const text = 'max-w-162.5 tablet:max-w-none'
/* paragraphs 29px apart, 52px above the button */
const body = 't-body mb-7.25 last-of-type:mb-13'

export default function About() {
  const { t } = useLang()

  return (
    <>
      <section id="about" className={`${split} grid-cols-[37.85vw_1fr] gap-x-[6.6vw] px-gutter pt-7.75`}>
        <Reveal className={media} variant="left">
          <img className="size-full object-cover" src={url('/images/who.jpg')} alt={t.about.whoAlt} />
        </Reveal>
        <Reveal className={text} delay={150}>
          <SectionHeading className="mb-6.5" eyebrow="WHO WE ARE" title={['Sorry for driving too fast,', "We're new here."]} />
          <p className={body}>{t.about.who}</p>
          <Button href="/about">About Us</Button>
        </Reveal>
      </section>

      <section className={`${split} grid-cols-[1fr_37.8vw] gap-x-[6.3vw] px-gutter pt-20 pb-10`}>
        <Reveal className={text} delay={150}>
          <SectionHeading className="mb-6.5" eyebrow="HERITAGE" title="Less talk, More torque" />
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
