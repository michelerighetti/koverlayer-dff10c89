
import React from "react";
import { Globe } from "lucide-react";
import { SidebarWrapper } from "./Sidebar";
import { useLanguage } from "@/contexts/LanguageContext";
import Logo from "@/components/Logo";
import type { Language } from "@/contexts/LanguageContext";

export const MainLayout: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const { language, setLanguage } = useLanguage();
  
  const languages = [
    { code: 'en', name: 'English' },
    { code: 'it', name: 'Italiano' },
    { code: 'de', name: 'Deutsch' },
    { code: 'es', name: 'Español' },
    { code: 'sl', name: 'Slovenščina' },
    { code: 'hr', name: 'Hrvatski' },
    { code: 'zh', name: '中文' },
    { code: 'ar', name: 'العربية' }
  ];

  return (
    <SidebarWrapper>
      <div className="flex flex-col flex-1 w-full">
        <div className="p-4 border-b flex items-center justify-between">
          <div className="flex items-center">
            <Logo size={32} className="mr-2" />
            <span className="text-xl font-bold">KOVERLAYER</span>
          </div>
          <LanguageSelector 
            language={language} 
            setLanguage={setLanguage} 
            languages={languages} 
          />
        </div>
        <main className="flex-1 p-4 overflow-auto">
          {children}
        </main>
      </div>
    </SidebarWrapper>
  );
};

interface LanguageSelectorProps {
  language: Language;
  setLanguage: (lang: Language) => void;
  languages: { code: string; name: string }[];
}

const LanguageSelector: React.FC<LanguageSelectorProps> = ({ 
  language, 
  setLanguage, 
  languages 
}) => {
  return (
    <div className="relative group">
      <button className="flex items-center gap-1 text-sm px-3 py-2 rounded-md hover:bg-muted">
        <Globe className="h-4 w-4" />
        <span>{languages.find(l => l.code === language)?.name}</span>
        <ChevronDown className="h-4 w-4" />
      </button>
      <div className="absolute right-0 mt-1 w-48 bg-background border rounded-md shadow-lg hidden group-hover:block z-50 language-selector-dropdown">
        <div className="py-1">
          {languages.map((lang) => (
            <button
              key={lang.code}
              className={`w-full text-left px-4 py-2 text-sm hover:bg-muted ${
                language === lang.code ? 'bg-muted/50 font-medium' : ''
              }`}
              onClick={() => setLanguage(lang.code as Language)}
            >
              {lang.name}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
};

const ChevronDown = (props: React.SVGProps<SVGSVGElement>) => (
  <svg 
    xmlns="http://www.w3.org/2000/svg" 
    width="24" 
    height="24" 
    viewBox="0 0 24 24" 
    fill="none" 
    stroke="currentColor" 
    strokeWidth="2" 
    strokeLinecap="round" 
    strokeLinejoin="round"
    {...props}
  >
    <path d="m6 9 6 6 6-6"/>
  </svg>
);
