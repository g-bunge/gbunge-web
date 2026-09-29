import Slideshow from '../components/ui/Slideshow.jsx'
import { ChevronWide } from '../components/ui/Icons.jsx'
import LangToggle from '../components/ui/LangToggle.jsx'
import useScrollY from '../hooks/useScrollY.js'
import useLang from '../i18n/LanguageContext.js'
import { heroImages } from '../data/hero.js'
import cx from '../lib/cx.js'

export default function Hero() {
  const scrollY = useScrollY()
  const { lang, t } = useLang()

  const scrollToContent = () => {
    document.getElementById('sponsors')?.scrollIntoView({ behavior: 'smooth' })
  }

  return (
    <header id="top" className="relative grid h-screen min-h-140 place-items-center overflow-hidden">
      <div
        className="absolute inset-[-2%_0_0] animate-hero-zoom overflow-hidden bg-bg will-change-transform after:absolute after:inset-0 after:z-1 after:bg-[linear-gradient(transparent_30%,rgb(0_0_0/0.5))]"
        style={{ transform: `translate3d(0, ${scrollY * 0.35}px, 0)` }}
      >
        {/* the ::after darkens the bottom edge so the next section blends in */}
        <Slideshow images={heroImages} />
      </div>

      <div className="relative z-1 flex -translate-y-3.5 flex-col items-center" style={{ opacity: Math.max(0, 1 - scrollY / 600) }}>
        <h1>
          <img className="w-[min(478px,78vw)] animate-hero-in" src="/images/logo-hero.png" alt="G-BungE | GIST" />
        </h1>
        {/* the negative right margin cancels the trailing letter-space so the line stays centred */}
        <p
          className={cx(
            'mt-9 animate-hero-in text-20 font-medium whitespace-nowrap text-white/92 mobile:text-13',
            lang === 'en' ? '-mr-[0.2em] tracking-[0.2em]' : '-mr-[0.4em] tracking-[0.4em]',
          )}
        >
          {t.hero.subtitle}
        </p>
      </div>

      <div className="absolute top-7 right-gutter z-2">
        <LangToggle />
      </div>

      <button className="absolute bottom-9 left-1/2 z-1 -ml-5 w-10 animate-hero-scroll text-fg" onClick={scrollToContent} aria-label="Scroll down">
        <ChevronWide className="h-5 w-10" />
      </button>
    </header>
  )
}
