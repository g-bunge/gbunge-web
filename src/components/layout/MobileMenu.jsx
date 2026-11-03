import { useEffect, useState } from 'react'
import { createPortal } from 'react-dom'
import { links, isCurrent } from './links.js'
import useLang from '../../i18n/LanguageContext.js'
import cx from '../../lib/cx.js'
import { currentPath, url } from '../../lib/url.js'

/* the three bars of the button; the outer two cross into an × while the menu is open */
const bar = 'absolute left-0 h-0.5 w-6 bg-fg [transition:translate_0.3s_var(--ease-out),rotate_0.3s_var(--ease-out),opacity_0.2s]'

/**
 * Hamburger button (phones only) that opens the menu over the whole screen.
 * The panel is portalled to <body> so a transformed parent (the sliding navbar) can't box it in.
 */
export default function MobileMenu({ className = '' }) {
  const [open, setOpen] = useState(false)
  const path = currentPath()
  const { t } = useLang()

  // Escape closes it; the page behind doesn't scroll while it's open
  useEffect(() => {
    if (!open) return
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('keydown', onKey)
    document.body.style.overflow = 'hidden'
    return () => {
      document.removeEventListener('keydown', onKey)
      document.body.style.overflow = ''
    }
  }, [open])

  return (
    <>
      <button
        type="button"
        className={cx('relative z-120 hidden size-10 place-items-center mobile:grid', className)}
        onClick={() => setOpen(!open)}
        aria-label={open ? 'Close menu' : 'Open menu'}
        aria-expanded={open}
        aria-controls="mobile-menu"
      >
        <span className="relative block h-4 w-6">
          <span className={cx(bar, 'top-0', open && 'translate-y-[7px] rotate-45')} />
          <span className={cx(bar, 'top-[7px]', open && 'opacity-0')} />
          <span className={cx(bar, 'top-[14px]', open && '-translate-y-[7px] -rotate-45')} />
        </span>
      </button>

      {createPortal(
        <nav
          id="mobile-menu"
          className={cx(
            'fixed inset-0 z-110 flex flex-col justify-center bg-bg/96 px-gutter backdrop-blur-md',
            '[transition:opacity_0.3s_var(--ease-out),visibility_0.3s]',
            open ? 'visible opacity-100' : 'invisible opacity-0',
          )}
          aria-label="Menu"
          inert={!open}
        >
          {/* the opening button sits under this panel, so the panel brings its own close button */}
          <button
            type="button"
            className="absolute top-2.5 right-[calc(var(--spacing-gutter)-8px)] grid size-10 place-items-center"
            onClick={() => setOpen(false)}
            aria-label="Close menu"
          >
            <span className="relative block h-4 w-6">
              <span className={cx(bar, 'top-[7px] rotate-45')} />
              <span className={cx(bar, 'top-[7px] -rotate-45')} />
            </span>
          </button>
          <ul className="grid gap-2">
            {links.map(({ id, href, children }, i) => (
              <li
                key={id}
                className={cx('[transition:opacity_0.4s,translate_0.5s_var(--ease-out)]', open ? 'opacity-100' : 'translate-y-4 opacity-0')}
                style={{ transitionDelay: open ? `${80 + i * 50}ms` : '0ms' }}
              >
                <a
                  className="block py-2 font-display text-36 font-semibold tracking-tight text-fg-body transition-colors duration-200 hover:text-fg aria-[current=page]:text-brand-end"
                  href={url(href)}
                  aria-current={isCurrent(path, href) ? 'page' : undefined}
                  onClick={() => setOpen(false)}
                >
                  {t.nav[id]}
                </a>
                {children && (
                  <ul className="mb-2 flex flex-wrap gap-x-5 gap-y-1">
                    {children.map((child) => (
                      <li key={child.href}>
                        <a
                          className="block py-1 font-ui text-16 font-medium text-fg-muted transition-colors duration-200 hover:text-fg aria-[current=page]:text-brand-end"
                          href={url(child.href)}
                          aria-current={path === child.href ? 'page' : undefined}
                          onClick={() => setOpen(false)}
                        >
                          {child.label}
                        </a>
                      </li>
                    ))}
                  </ul>
                )}
              </li>
            ))}
          </ul>
        </nav>,
        document.body,
      )}
    </>
  )
}
