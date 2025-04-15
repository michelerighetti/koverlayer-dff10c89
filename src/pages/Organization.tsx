
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Organization = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("sidebar.organization")}</h1>
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <p>Organization content will go here</p>
      </div>
    </div>
  );
};

export default Organization;
