import Lines from './Lines.jsx'
import { links, isCurrent } from '../layout/links.js'
import useLang from '../../i18n/LanguageContext.js'
import { currentPath, url } from '../../lib/url.js'

/**
 * Photo banner for sub-pages: the title over the photo and a breadcrumb tab (Home › page)
 * cut into the banner's bottom-left corner.
 * `title` may be a string or an array of lines. `focus` is the photo's object-position (e.g. '50% 75%').
 */
export default function PageHero({ title, img, alt, focus }) {
  const { t } = useLang()
  const page = links.find(({ href }) => isCurrent(currentPath(), href))

  return (
    <header
      id="top"
      className="relative h-[clamp(320px,42vh,440px)] overflow-hidden after:absolute after:inset-0 after:bg-[linear-gradient(90deg,rgb(0_0_0/0.62),rgb(0_0_0/0.35))] mobile:h-[46vh]"
    >
      {/* the ::after darkens the photo, more on the left behind the title */}
      <img className="size-full animate-page-hero-zoom object-cover" style={{ objectPosition: focus }} src={url(img)} alt={alt} />

      <h1 className="absolute inset-x-gutter bottom-24 z-1 animate-page-hero-rise font-display text-hero leading-[0.95] font-semibold tracking-tighter mobile:bottom-20">
        <Lines lines={title} />
      </h1>

      {/* breadcrumb on a page-coloured tab whose right edge is cut on a slant */}
      <nav
        className="absolute bottom-0 left-0 z-1 flex h-12 items-center gap-2.5 bg-bg pr-14 pl-gutter font-ui text-12 font-semibold tracking-wider uppercase [clip-path:polygon(0_0,calc(100%-32px)_0,100%_100%,0_100%)]"
        aria-label="Breadcrumb"
      >
        <a className="text-fg-body transition-colors duration-200 hover:text-fg" href={url('/')}>
          Home
        </a>
        <span className="text-brand-end" aria-hidden>
          ›
        </span>
        <span className="text-brand-end" aria-current="page">
          {page ? t.nav[page.id] : <Lines lines={title} />}
        </span>
      </nav>
    </header>
  )
}
