
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import type { Language } from "@/contexts/LanguageContext";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";

const Language = () => {
  const { language, setLanguage, t } = useLanguage();
  
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
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("sidebar.language")}</h1>
      
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <RadioGroup 
          value={language} 
          onValueChange={(value) => setLanguage(value as Language)}
          className="space-y-3"
        >
          {languages.map((lang) => (
            <div key={lang.code} className="flex items-center space-x-3">
              <RadioGroupItem value={lang.code} id={lang.code} />
              <Label htmlFor={lang.code}>{lang.name}</Label>
            </div>
          ))}
        </RadioGroup>
      </div>
    </div>
  );
};

export default Language;
