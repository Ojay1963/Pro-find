import React, { createContext, useContext, useEffect, useMemo, useState } from 'react'
import { defaultLanguage, supportedLanguages, translations } from '../i18n/translations'
import { enableRuntimeDomTranslations } from '../i18n/runtimeDomTranslations'

const I18N_STORAGE_KEY = 'profind_language'
const supportedLanguageCodes = new Set(supportedLanguages.map((item) => item.code))

const getObjectValue = (obj, keyPath) => {
  if (!obj || !keyPath) return undefined
  return keyPath.split('.').reduce((acc, part) => (acc && acc[part] !== undefined ? acc[part] : undefined), obj)
}

const detectLanguage = () => {
  const saved = (localStorage.getItem(I18N_STORAGE_KEY) || '').trim().toLowerCase()
  if (saved && supportedLanguageCodes.has(saved) && translations[saved]) return saved
  const browser = (navigator.language || 'en').slice(0, 2).toLowerCase()
  return supportedLanguageCodes.has(browser) && translations[browser] ? browser : defaultLanguage
}

const I18nContext = createContext({
  language: defaultLanguage,
  setLanguage: () => {},
  t: (key, fallback) => fallback || key,
  languages: supportedLanguages
})

export function I18nProvider({ children }) {
  const [language, setLanguageState] = useState(detectLanguage)

  useEffect(() => {
    document.documentElement.lang = language
  }, [language])

  useEffect(() => {
    const cleanup = enableRuntimeDomTranslations(language)
    return cleanup
  }, [language])

  const setLanguage = (code) => {
    const next = supportedLanguageCodes.has(code) && translations[code] ? code : defaultLanguage
    setLanguageState(next)
    localStorage.setItem(I18N_STORAGE_KEY, next)
    document.documentElement.lang = next
  }

  const value = useMemo(() => {
    const t = (key, fallback = '') => {
      const current = getObjectValue(translations[language], key)
      if (current !== undefined) return current
      const english = getObjectValue(translations[defaultLanguage], key)
      if (english !== undefined) return english
      return fallback || key
    }

    return {
      language,
      setLanguage,
      t,
      languages: supportedLanguages
    }
  }, [language])

  return (
    <I18nContext.Provider value={value}>
      <React.Fragment key={language}>{children}</React.Fragment>
    </I18nContext.Provider>
  )
}

export const useI18n = () => useContext(I18nContext)
