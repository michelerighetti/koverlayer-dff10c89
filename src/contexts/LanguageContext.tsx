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
    "sidebar.probe": "Probe",
    "sidebar.monitoring": "Monitoring",
    "sidebar.settings": "Settings",
    "sidebar.alerts": "Alerts",
    "sidebar.vulnerabilities": "Vulnerabilities",
    "sidebar.reports": "Reports",
    "sidebar.organization": "Organization",
    "sidebar.support": "Support",
  },
  it: {
    "app.title": "KOVERLAYER",
    "login.title": "Accesso",
    "login.button": "Accedi",
    "logout.button": "Esci",
    "sidebar.dashboard": "Dashboard",
    "sidebar.probe": "Probe",
    "sidebar.monitoring": "Monitoraggio",
    "sidebar.settings": "Impostazioni",
    "sidebar.alerts": "Avvisi",
    "sidebar.vulnerabilities": "Vulnerabilità",
    "sidebar.reports": "Report",
    "sidebar.organization": "Organizzazione",
    "sidebar.support": "Supporto",
  },
  de: {
    "app.title": "KOVERLAYER",
    "login.title": "Anmeldung",
    "login.button": "Anmelden",
    "logout.button": "Abmelden",
    "sidebar.dashboard": "Dashboard",
    "sidebar.probe": "Sonde",
    "sidebar.monitoring": "Überwachung",
    "sidebar.settings": "Einstellungen",
    "sidebar.alerts": "Warnungen",
    "sidebar.vulnerabilities": "Schwachstellen",
    "sidebar.reports": "Berichte",
    "sidebar.organization": "Organisation",
    "sidebar.support": "Unterstützung",
  },
  es: {
    "app.title": "KOVERLAYER",
    "login.title": "Iniciar sesión",
    "login.button": "Entrar",
    "logout.button": "Salir",
    "sidebar.dashboard": "Panel",
    "sidebar.probe": "Sonda",
    "sidebar.monitoring": "Monitoreo",
    "sidebar.settings": "Configuración",
    "sidebar.alerts": "Alertas",
    "sidebar.vulnerabilities": "Vulnerabilidades",
    "sidebar.reports": "Informes",
    "sidebar.organization": "Organización",
    "sidebar.support": "Soporte",
  },
  sl: {
    "app.title": "KOVERLAYER",
    "login.title": "Prijava",
    "login.button": "Prijava",
    "logout.button": "Odjava",
    "sidebar.dashboard": "Nadzorna plošča",
    "sidebar.probe": "Sonda",
    "sidebar.monitoring": "Spremljanje",
    "sidebar.settings": "Nastavitve",
    "sidebar.alerts": "Opozorila",
    "sidebar.vulnerabilities": "Ranljivosti",
    "sidebar.reports": "Poročila",
    "sidebar.organization": "Organizacija",
    "sidebar.support": "Podpora",
  },
  hr: {
    "app.title": "KOVERLAYER",
    "login.title": "Prijava",
    "login.button": "Prijava",
    "logout.button": "Odjava",
    "sidebar.dashboard": "Nadzorna ploča",
    "sidebar.probe": "Sonda",
    "sidebar.monitoring": "Praćenje",
    "sidebar.settings": "Postavke",
    "sidebar.alerts": "Upozorenja",
    "sidebar.vulnerabilities": "Ranjivosti",
    "sidebar.reports": "Izvještaji",
    "sidebar.organization": "Organizacija",
    "sidebar.support": "Podrška",
  },
  zh: {
    "app.title": "KOVERLAYER",
    "login.title": "登录",
    "login.button": "登录",
    "logout.button": "登出",
    "sidebar.dashboard": "仪表板",
    "sidebar.probe": "探针",
    "sidebar.monitoring": "监控",
    "sidebar.settings": "设置",
    "sidebar.alerts": "警报",
    "sidebar.vulnerabilities": "漏洞",
    "sidebar.reports": "报告",
    "sidebar.organization": "组织",
    "sidebar.support": "支持",
  },
  ar: {
    "app.title": "KOVERLAYER",
    "login.title": "تسجيل الدخول",
    "login.button": "تسجيل الدخول",
    "logout.button": "تسجيل الخروج",
    "sidebar.dashboard": "لوحة القيادة",
    "sidebar.probe": "المجس",
    "sidebar.monitoring": "المراقبة",
    "sidebar.settings": "الإعدادات",
    "sidebar.alerts": "التنبيهات",
    "sidebar.vulnerabilities": "نقاط الضعف",
    "sidebar.reports": "التقارير",
    "sidebar.organization": "المؤسسة",
    "sidebar.support": "الدعم",
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
