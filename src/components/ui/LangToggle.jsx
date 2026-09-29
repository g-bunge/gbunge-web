import { useEffect, useRef, useState } from 'react'
import { GlobeIcon } from './Icons.jsx'
import useLang from '../../i18n/LanguageContext.js'
import cx from '../../lib/cx.js'

const languages = [
  { code: 'ko', label: '한국어' },
  { code: 'en', label: 'English' },
]

/** Globe button that opens a small menu of languages. */
export default function LangToggle({ className = '' }) {
  const { lang, setLang, t } = useLang()
  const [open, setOpen] = useState(false)
  const ref = useRef(null)

  // close on outside click or Escape
  useEffect(() => {
    if (!open) return
    const onPointer = (e) => ref.current?.contains(e.target) || setOpen(false)
    const onKey = (e) => e.key === 'Escape' && setOpen(false)
    document.addEventListener('pointerdown', onPointer)
    document.addEventListener('keydown', onKey)
    return () => {
      document.removeEventListener('pointerdown', onPointer)
      document.removeEventListener('keydown', onKey)
    }
  }, [open])

  const choose = (code) => {
    setLang(code)
    setOpen(false)
  }

  return (
    <div ref={ref} className={cx('relative', className)}>
      <button
        type="button"
        className={cx('grid size-10 place-items-center text-fg transition-opacity duration-300 hover:opacity-100', open ? 'opacity-100' : 'opacity-85')}
        onClick={() => setOpen(!open)}
        aria-label={t.langToggle}
        aria-haspopup="menu"
        aria-expanded={open}
      >
        <GlobeIcon className="size-7" />
      </button>
      <ul
        className={cx(
          'absolute top-[calc(100%+10px)] right-0 min-w-33 border border-white/10 bg-raised p-1.5 shadow-menu',
          '[transition:opacity_0.25s_var(--ease-out),translate_0.25s_var(--ease-out),visibility_0.25s]',
          open ? 'visible opacity-100' : 'invisible -translate-y-1.5 opacity-0',
        )}
        role="menu"
      >
        {languages.map(({ code, label }) => (
          <li key={code} role="none">
            <button
              type="button"
              role="menuitemradio"
              aria-checked={lang === code}
              lang={code}
              className={cx(
                'relative block w-full px-3 py-2.25 text-left font-ui text-14 font-medium transition-colors duration-200 hover:bg-surface hover:text-fg',
                lang === code ? 'text-fg underline decoration-1 underline-offset-5' : 'text-fg-muted',
              )}
              onClick={() => choose(code)}
              tabIndex={open ? 0 : -1}
            >
              {label}
            </button>
          </li>
        ))}
      </ul>
    </div>
  )
}
