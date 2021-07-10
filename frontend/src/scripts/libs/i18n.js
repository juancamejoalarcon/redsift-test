import i18n from 'i18next';
import XHR from 'i18next-xhr-backend';
import LanguageDetector from 'i18next-browser-languagedetector';

i18n
  .use(XHR)
  .use(LanguageDetector)
  .init({
    backend: {
      loadPath: 'locales/{{lng}}/{{ns}}.json'
    },
    fallbackLng: 'en',
    ns: ['common', 'error'],
    defaultNS: 'common',
    interpolation: {
      escapeValue: false
    }
  });

export default i18n;