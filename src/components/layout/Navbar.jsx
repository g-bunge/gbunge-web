import LangToggle from '../ui/LangToggle.jsx'
import MobileMenu from './MobileMenu.jsx'
import { links, isCurrent } from './links.js'
import useScrollY from '../../hooks/useScrollY.js'
import useLang from '../../i18n/LanguageContext.js'
import cx from '../../lib/cx.js'
import { currentPath, url } from '../../lib/url.js'

/**
 * Top bar that slides in once the hero has mostly scrolled out of view.
 * `alwaysVisible` is for sub-pages, which have no hero to scroll past.
 */
export default function Navbar({ alwaysVisible = false }) {
  const scrollY = useScrollY()
  const visible = alwaysVisible || scrollY > window.innerHeight * 0.8
  const path = currentPath()
  const { t } = useLang()

  return (
    <nav
      className={cx(
        'fixed inset-x-0 top-0 z-100 flex h-nav items-center gap-12 px-gutter [transition:translate_0.5s_var(--ease-out),opacity_0.5s_var(--ease-out)] mobile:h-15',
        /* shade the top of the viewport rather than the bar's own box, so no edge shows */
        'before:pointer-events-none before:absolute before:inset-x-0 before:top-0 before:-z-1 before:h-27.5',
        'before:bg-[linear-gradient(rgb(0_0_0/0.6),rgb(0_0_0/0.42)_25%,rgb(0_0_0/0.2)_55%,rgb(0_0_0/0.06)_80%,transparent)]',
        !visible && '-translate-y-full opacity-0',
      )}
      aria-hidden={!visible}
      inert={!visible}
    >
      <a href={alwaysVisible ? url('/') : '#top'} aria-label="Home">
        <img className="h-7 w-auto" src={url('/images/logo-footer.png')} alt="G-BungE" />
      </a>
      <ul className="ml-auto flex gap-9 mobile:hidden">
        {links.map(({ id, href, children }) => (
          <li key={id} className={cx(children && 'group/drop relative')}>
            <a
              className={cx(
                'relative font-ui text-15 font-medium text-fg-body transition-colors duration-300 hover:text-fg aria-[current=page]:text-fg',
                /* brand underline that grows from the left; stays on for the current page */
                'after:absolute after:inset-x-0 after:-bottom-1.5 after:h-0.5 after:origin-left after:scale-x-0 after:bg-brand-gradient after:transition-transform after:duration-350 after:ease-out',
                'hover:after:scale-x-100 aria-[current=page]:after:scale-x-100',
              )}
              href={url(href)}
              aria-current={isCurrent(path, href) ? 'page' : undefined}
            >
              {t.nav[id]}
            </a>
            {/* sub-pages drop down on hover or keyboard focus, one after another; the top padding bridges the gap to the link */}
            {children && (
              <div className="invisible absolute top-full left-1/2 -translate-x-1/2 pt-5 opacity-0 [transition:opacity_0.25s,visibility_0.25s] group-focus-within/drop:visible group-focus-within/drop:opacity-100 group-hover/drop:visible group-hover/drop:opacity-100">
                <ul className="min-w-44 border border-white/10 bg-raised/95 p-1.5 shadow-menu backdrop-blur-md">
                  {children.map((child, i) => (
                    <li
                      key={child.href}
                      className="-translate-y-2 opacity-0 [transition:opacity_0.3s,translate_0.35s_var(--ease-out)] group-focus-within/drop:translate-y-0 group-focus-within/drop:opacity-100 group-hover/drop:translate-y-0 group-hover/drop:opacity-100"
                      style={{ transitionDelay: `${i * 45}ms` }}
                    >
                      <a
                        className="flex items-baseline justify-between gap-6 px-3.5 py-2.5 font-ui text-15 font-medium text-fg-body transition-colors duration-200 hover:bg-surface hover:text-fg aria-[current=page]:text-brand-end"
                        href={url(child.href)}
                        aria-current={path === child.href ? 'page' : undefined}
                      >
                        {child.label}
                        {child.note && <span className="text-12 text-fg-muted">{child.note}</span>}
                      </a>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </li>
        ))}
      </ul>
      <LangToggle className="-ml-6 mobile:ml-auto" />
      <MobileMenu className="-ml-10" />
    </nav>
  )
}
