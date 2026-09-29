import Reveal from '../components/ui/Reveal.jsx'
import Button from '../components/ui/Button.jsx'
import Lines from '../components/ui/Lines.jsx'
import useLang from '../i18n/LanguageContext.js'
import { SPONSOR_EMAIL } from '../data/site.js'

export default function SponsorCta() {
  const { t } = useLang()

  return (
    <section id="contact" className="relative grid h-102 place-items-center overflow-hidden text-center mobile:h-auto mobile:px-gutter mobile:py-18">
      <div className="absolute inset-0 bg-[url(/images/cta.jpg)] bg-cover bg-center bg-no-repeat" />
      <Reveal className="relative">
        <h2 className="t-title mb-6">Become Our Sponsor</h2>
        <p className="t-body mb-11 leading-7.5">
          <Lines lines={t.cta.body} />
        </p>
        <Button className="w-37.5 px-0!" href={`mailto:${SPONSOR_EMAIL}`}>
          Contact Us
        </Button>
      </Reveal>
    </section>
  )
}
