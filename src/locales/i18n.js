import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'
import en from './languages/en.json'
import it from './languages/it.json'

export const resources = {
  en: {
    translation: en,
  },
  it: {
    translation: it
  }
}

i18n.use(initReactI18next).init({
  resources,
  lng: 'en',
  fallbackLng: 'en',
  interpolation: {
    escapeValue: false,
  },
})

export default i18n