import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';

// Import local translation files
import enLegislation from './locales/en.json';
import arLegislation from './locales/ar.json';

// Initialize i18next
const resources = {
  en: {
    legislation: enLegislation
  },
  ar: {
    legislation: arLegislation
  }
};

const getInitialLanguage = (): string => {
  const storedLang = localStorage.getItem('language');
  if (storedLang === 'en' || storedLang === 'ar') {
    return storedLang;
  }
  return 'ar'; // Default to Arabic
};

i18n
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    resources,
    lng: getInitialLanguage(), // language to use, more information here: https://www.i18next.com/overview/configuration-options#languages-namespaces-resources
    fallbackLng: 'ar',
    defaultNS: 'legislation',
    ns: ["legislation"], 
    interpolation: {
      escapeValue: false // react already safes from xss
    }
  });

export default i18n;
