
import React, { createContext, useContext, useState, useEffect } from "react";

// Supported languages
export type Language = 
  | "it" // Italian
  | "en" // English
  | "de" // German
  | "es" // Spanish
  | "sl" // Slovenian
  | "hr" // Croatian
  | "zh" // Chinese
  | "ar"; // Arabic

interface LanguageContextType {
  language: Language;
  setLanguage: (lang: Language) => void;
  t: (key: string) => string;
}

// Simple translations
const translations: Record<Language, Record<string, string>> = {
  en: {
    "app.title": "KOVERLAYER",
    "login.title": "Login",
    "login.button": "Sign In",
    "logout.button": "Sign Out",
    "sidebar.dashboard": "Dashboard",
    "sidebar.profile": "Profile",
    "sidebar.settings": "Settings",
    "sidebar.language": "Language",
    "welcome": "Welcome to KOVERLAYER portal",
  },
  it: {
    "app.title": "KOVERLAYER",
    "login.title": "Accesso",
    "login.button": "Accedi",
    "logout.button": "Esci",
    "sidebar.dashboard": "Dashboard",
    "sidebar.profile": "Profilo",
    "sidebar.settings": "Impostazioni",
    "sidebar.language": "Lingua",
    "welcome": "Benvenuto nel portale KOVERLAYER",
  },
  de: {
    "app.title": "KOVERLAYER",
    "login.title": "Anmeldung",
    "login.button": "Anmelden",
    "logout.button": "Abmelden",
    "sidebar.dashboard": "Dashboard",
    "sidebar.profile": "Profil",
    "sidebar.settings": "Einstellungen",
    "sidebar.language": "Sprache",
    "welcome": "Willkommen im KOVERLAYER-Portal",
  },
  es: {
    "app.title": "KOVERLAYER",
    "login.title": "Iniciar sesión",
    "login.button": "Entrar",
    "logout.button": "Salir",
    "sidebar.dashboard": "Panel",
    "sidebar.profile": "Perfil",
    "sidebar.settings": "Configuración",
    "sidebar.language": "Idioma",
    "welcome": "Bienvenido al portal KOVERLAYER",
  },
  sl: {
    "app.title": "KOVERLAYER",
    "login.title": "Prijava",
    "login.button": "Prijava",
    "logout.button": "Odjava",
    "sidebar.dashboard": "Nadzorna plošča",
    "sidebar.profile": "Profil",
    "sidebar.settings": "Nastavitve",
    "sidebar.language": "Jezik",
    "welcome": "Dobrodošli na portalu KOVERLAYER",
  },
  hr: {
    "app.title": "KOVERLAYER",
    "login.title": "Prijava",
    "login.button": "Prijava",
    "logout.button": "Odjava",
    "sidebar.dashboard": "Nadzorna ploča",
    "sidebar.profile": "Profil",
    "sidebar.settings": "Postavke",
    "sidebar.language": "Jezik",
    "welcome": "Dobrodošli na portal KOVERLAYER",
  },
  zh: {
    "app.title": "KOVERLAYER",
    "login.title": "登录",
    "login.button": "登录",
    "logout.button": "登出",
    "sidebar.dashboard": "仪表板",
    "sidebar.profile": "个人资料",
    "sidebar.settings": "设置",
    "sidebar.language": "语言",
    "welcome": "欢迎访问KOVERLAYER门户",
  },
  ar: {
    "app.title": "KOVERLAYER",
    "login.title": "تسجيل الدخول",
    "login.button": "تسجيل الدخول",
    "logout.button": "تسجيل الخروج",
    "sidebar.dashboard": "لوحة القيادة",
    "sidebar.profile": "الملف الشخصي",
    "sidebar.settings": "الإعدادات",
    "sidebar.language": "اللغة",
    "welcome": "مرحبًا بك في بوابة KOVERLAYER",
  },
};

const LanguageContext = createContext<LanguageContextType | null>(null);

export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error("useLanguage must be used within a LanguageProvider");
  }
  return context;
};

export const LanguageProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [language, setLanguageState] = useState<Language>("en");

  useEffect(() => {
    // Load saved language preference
    const savedLanguage = localStorage.getItem("koverlayer_language") as Language;
    if (savedLanguage && Object.keys(translations).includes(savedLanguage)) {
      setLanguageState(savedLanguage);
    } else {
      // Browser language detection as fallback
      const browserLang = navigator.language.split("-")[0] as Language;
      if (Object.keys(translations).includes(browserLang)) {
        setLanguageState(browserLang);
      }
    }
    
    // Update document language for accessibility
    document.documentElement.lang = language;
    
    // Handle RTL for Arabic
    if (language === "ar") {
      document.documentElement.dir = "rtl";
    } else {
      document.documentElement.dir = "ltr";
    }
  }, [language]);

  const setLanguage = (lang: Language) => {
    localStorage.setItem("koverlayer_language", lang);
    setLanguageState(lang);
  };

  const t = (key: string) => {
    return translations[language][key] || key;
  };

  return (
    <LanguageContext.Provider value={{ language, setLanguage, t }}>
      {children}
    </LanguageContext.Provider>
  );
};
