import Reveal from '../components/ui/Reveal.jsx'
import SectionHeading from '../components/ui/SectionHeading.jsx'
import Button from '../components/ui/Button.jsx'
import useLang from '../i18n/LanguageContext.js'
import { url } from '../lib/url.js'

const split = 'relative grid items-center tablet:grid-cols-1 tablet:gap-y-10 tablet:p-[60px_var(--spacing-gutter)]'
const media = 'aspect-545/532 overflow-hidden'
/* a black panel that overlaps the photo's edge; the /// mark heads it */
const text =
  'relative z-1 max-w-162.5 bg-bg p-12 tablet:max-w-none tablet:p-0 ' +
  "before:mb-8 before:block before:font-display before:text-13 before:font-bold before:tracking-[0.3em] before:text-fg-muted before:content-['///'] tablet:before:hidden"
/* paragraphs 29px apart, 52px above the button */
const body = 't-body mb-7.25 last-of-type:mb-13'

export default function About() {
  const { t } = useLang()

  return (
    <>
      <section id="about" className={`${split} grid-cols-[44vw_1fr] px-gutter pt-24`}>
        <Reveal className={media} variant="left">
          <img className="size-full object-cover" src={url('/images/who.jpg')} alt={t.about.whoAlt} />
        </Reveal>
        <Reveal className={`${text} -ml-[6vw] tablet:ml-0`} delay={150}>
          <SectionHeading className="mb-6.5" eyebrow="WHO WE ARE" title={['Sorry for driving too fast,', "We're new here."]} />
          <p className={body}>{t.about.who}</p>
          <Button href="/about">About Us</Button>
        </Reveal>
      </section>

      <section className={`${split} grid-cols-[1fr_44vw] px-gutter pt-20 pb-24`}>
        <Reveal className={`${text} -mr-[6vw] tablet:mr-0`} delay={150}>
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
