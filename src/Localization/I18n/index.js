// // src\Localization\I18n\index.js

// import i18n from 'i18next';
// import { initReactI18next } from 'react-i18next';
// import translationEN from '../Lang/en';
// import translationAR from '../Lang/ar';
// import AsyncStorage from '@react-native-async-storage/async-storage';
// const resources = {
//   en: {
//     translation: translationEN,
//   },
//   ar: {
//     translation: translationAR,
//   },
// };
// export const InitI18n = (lang) => {

//   i18n
//     .use(initReactI18next) // passes i18n down to react-i18next
//     .init({
//       resources,
//       lng: lang,
//       compatibilityJSON: 'v3',
//       keySeparator: false, // we do not use keys in form messages.welcome
//       fallbackLng: lang,
//       interpolation: {
//         escapeValue: false, // react already safes from xss
//       },
//       react: {
//         useSuspense: false
//       },
//       detect: callback => {
//         AsyncStorage.getItem('user-language', (err, language) => {
//           // if error fetching stored data or no language was stored
//           // display errors when in DEV mode as console statements
//           if (err || !language) {
//             if (err) {
//               alert('Error fetching Languages from asyncstorage ', err);
//             } else {
//               alert('No language is set, choosing English as fallback');
//             }
//             const findBestAvailableLanguage =
//               RNLocalize.findBestAvailableLanguage(LANG_CODES);
           
//             callback(findBestAvailableLanguage.languageTag || 'en');
//             return;
//           }
//           callback(language);
//         });
//       },

//       defaultNS: 'translation'
//     });
// }


// export default i18n;



import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import AsyncStorage from '@react-native-async-storage/async-storage';
import translationEN from '../Lang/en';
import translationAR from '../Lang/ar';

// اللغات المتاحة
const resources = {
  en: { translation: translationEN },
  ar: { translation: translationAR },
};

// دالة لاسترجاع اللغة المخزنة أو الافتراضية
const getStoredLanguage = async () => {
  try {
    const savedLang = await AsyncStorage.getItem('user-language');
    return savedLang || 'en';
  } catch (error) {
    console.error('Error fetching stored language:', error);
    return 'en';
  }
};

// تهيئة i18n
export const InitI18n = async () => {
  const lang = await getStoredLanguage(); // انتظر تحميل اللغة من التخزين

  await i18n
    .use(initReactI18next)
    .init({
      resources,
      lng: lang,
      fallbackLng: 'en',
      compatibilityJSON: 'v3',
      keySeparator: false,
      interpolation: { escapeValue: false },
      react: { useSuspense: false },
    });

  console.log('i18n initialized with language:', lang);
};

// تصدير i18n لاستخدامه في أي ملف آخر
export default i18n;
