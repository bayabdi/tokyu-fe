import Vue from 'vue'
import VueI18n from 'vue-i18n'
import ja from '@/i18n/ja'
import en from '@/i18n/en'

Vue.use(VueI18n)

export const i18n = new VueI18n({
  locale: 'ja',
  fallbackLocale: 'en',
  messages: {
    ja,
    en
  }
})

export const languages = {
  en: 'en-US',
  ja: 'ja-JP'
}

export const currentLanguage = () => {
  return languages[i18n.locale]
}
