import { ArrowUp, GitHubIcon, InstagramIcon, MailIcon } from '../components/ui/Icons.jsx'
import useLang from '../i18n/LanguageContext.js'
import { EMAIL, INSTAGRAM, STORIES_ENABLED } from '../data/site.js'
import { url } from '../lib/url.js'

const menu = [
  { id: 'about', href: '/about' },
  { id: 'team', href: '/team' },
  { id: 'pastCars', href: '/past-cars' },
  ...(STORIES_ENABLED ? [{ id: 'stories', href: '/stories' }] : []),
  { id: 'sponsors', href: '/sponsors' },
]

/* TODO: fill in the GitHub org URL. */
const social = [
  { label: 'Instagram', href: INSTAGRAM, Icon: InstagramIcon },
  { label: 'Email', href: `mailto:${EMAIL}`, Icon: MailIcon },
  { label: 'GitHub', href: '#', Icon: GitHubIcon },
]

const heading = 'mb-4.5 text-12 font-semibold tracking-[0.16em] text-fg-muted uppercase'
const link = 'text-15 leading-[1.6] text-fg-body transition-colors duration-250 hover:text-brand-end'

export default function Footer() {
  const { t } = useLang()

  return (
    <footer
      className="relative bg-bg px-gutter pt-18 pb-8 font-ui mobile:pt-14 before:absolute before:inset-x-gutter before:top-0 before:h-px before:bg-[linear-gradient(90deg,var(--color-brand),rgb(255_255_255/0.08)_40%)]"
    >
      {/* the ::before is a thin brand hairline along the top edge */}
      <div className="grid grid-cols-[1.6fr_1fr_1.6fr_auto] gap-12 tablet:grid-cols-2 tablet:gap-[40px_24px] mobile:grid-cols-1 mobile:gap-8">
        <div>
          <img className="w-37.5" src={url('/images/logo-footer.png')} alt="G-BungE" />
          <p className="mt-4 text-13 font-medium tracking-[0.2em] text-fg-muted">{t.hero.subtitle}</p>
        </div>

        <nav aria-label="Footer">
          <h3 className={heading}>Menu</h3>
          <ul className="grid gap-2.5">
            {menu.map(({ id, href }) => (
              <li key={id}>
                <a className={link} href={url(href)}>
                  {t.nav[id]}
                </a>
              </li>
            ))}
          </ul>
        </nav>

        <div>
          <h3 className={heading}>Contact</h3>
          <a className={link} href={`mailto:${EMAIL}`}>
            {EMAIL}
          </a>
          <address className="mt-2.5 max-w-85 text-15 leading-[1.6] break-keep text-fg-muted not-italic">{t.footer.address}</address>
        </div>

        <div>
          <h3 className={heading}>Follow</h3>
          <div className="flex gap-5">
            {social.map(({ label, href, Icon }) => (
              <a key={label} className="text-fg" href={href} aria-label={label} {...(href.startsWith('http') && { target: '_blank', rel: 'noreferrer' })}>
                <Icon className="block size-5.5" />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-16 flex items-center justify-between gap-4 border-t border-line-soft pt-6 text-13 text-fg-muted mobile:mt-12">
        {/* easter egg: the copyright line opens the /race minigame */}
        <a href={url('/race')}>© 2026 G-BungE. All rights reserved.</a>
        <a className="inline-flex items-center gap-1.5 transition-colors duration-250 hover:text-fg" href="#top">
          Back to top
          <ArrowUp className="size-3.5" />
        </a>
      </div>
    </footer>
  )
}
