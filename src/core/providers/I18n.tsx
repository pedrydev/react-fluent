import i18n from 'i18next';
import LanguageDetector from 'i18next-browser-languagedetector';
import Backend from 'i18next-http-backend';
import type { PropsWithChildren } from 'react';
import { I18nextProvider, initReactI18next } from 'react-i18next';

i18n
  .use(Backend)
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    backend: {
      loadPath: '/locales/{{lng}}/{{ns}}.json',
    },
    debug: import.meta.env.DEV,
    detection: {
      lookupLocalStorage: 'lang',
      order: ['localStorage'],
    },
    fallbackLng: import.meta.env.VITE_APP_DEFAULT_LANGUAGE,
    interpolation: {
      escapeValue: false,
    },
    load: 'languageOnly',
    supportedLngs: import.meta.env.VITE_APP_SUPPORTED_LANGUAGES.split(','),
  });

export default function I18n({ children }: PropsWithChildren<unknown>) {
  return <I18nextProvider i18n={i18n}>{children}</I18nextProvider>;
}
