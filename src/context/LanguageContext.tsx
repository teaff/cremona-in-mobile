import React, { createContext, useContext, useState, ReactNode } from 'react';
import * as Localization from 'expo-localization';
import { translations, Language } from '../i18n/translations';

type LanguageContextType = {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: keyof (typeof translations)['it']) => string;
};

const LanguageContext = createContext<LanguageContextType | undefined>(
  undefined,
);

export const LanguageProvider = ({ children }: { children: ReactNode }) => {
  const [language, setLanguage] = useState<Language>(() => {
    const locales = Localization.getLocales();
    const deviceLanguage = locales[0]?.languageCode;
    return deviceLanguage === 'it' ? 'it' : 'en';
  });

  const t = (key: keyof (typeof translations)['it']) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (context === undefined) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};
