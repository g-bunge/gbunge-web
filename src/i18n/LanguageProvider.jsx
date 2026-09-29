import { useEffect, useMemo, useState } from 'react'
import { LanguageContext } from './LanguageContext.js'
import { translations } from './translations.js'

const STORAGE_KEY = 'gbunge-lang'

function initialLang() {
  try {
    const saved = localStorage.getItem(STORAGE_KEY)
    if (saved in translations) return saved
  } catch {
    /* storage unavailable: fall through */
  }
  return navigator.language?.startsWith('ko') ? 'ko' : 'en'
}

export default function LanguageProvider({ children }) {
  const [lang, setLang] = useState(initialLang)

  useEffect(() => {
    document.documentElement.lang = lang
    try {
      localStorage.setItem(STORAGE_KEY, lang)
    } catch {
      /* ignore */
    }
  }, [lang])

  const value = useMemo(() => ({ lang, setLang, t: translations[lang] }), [lang])
  return <LanguageContext.Provider value={value}>{children}</LanguageContext.Provider>
}
