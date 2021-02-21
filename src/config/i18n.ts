import i18n from 'i18next';
import { initReactI18next } from 'react-i18next';
import LanguageDetector from 'i18next-browser-languagedetector';

import store from '@/store';
import { ILangType } from '@/store/lang/type';
import { getCurrentUrlLang } from '@/library/format';
// language
import en from '@/locale/en';
import zh_CN from '@/locale/zh_CN';

// 初始化当前语言（优先从本地获取）
const lang = store.getState().lang;
let currentLang = lang.local;
const getLangByUrl = getCurrentUrlLang() as ILangType | null;
const LocalLang = localStorage.getItem('language') as ILangType | null;
const isExitLang = lang.langList.some(v => v.key === LocalLang);
const isExitLang2 = lang.langList.some(v => v.key === getLangByUrl);

if (isExitLang && LocalLang) {
  currentLang = LocalLang;
}

if (isExitLang2 && getLangByUrl) {
  currentLang = getLangByUrl;
}

console.log('当前语言为：', currentLang);

await i18n
  .use(LanguageDetector)
  .use(initReactI18next)
  .init({
    resources: {
      en: {
        translation: en
      },
      zh_CN: {
        translation: zh_CN
      }
    },
    lng: currentLang || 'zh_CN',
    fallbackLng: currentLang || 'zh_CN', // 选择默认语言，选择内容为上述配置中的key，即en/zh
    debug: process.env.NODE_ENV === 'development',
    interpolation: {
      escapeValue: false // not needed for react as it escapes by default
    }
  });

export default i18n;
