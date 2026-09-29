import { createContext, useContext } from 'react'

export const LanguageContext = createContext(null)

/** Current language, its setter, and `t`: the translation table for that language. */
export default function useLang() {
  return useContext(LanguageContext)
}
