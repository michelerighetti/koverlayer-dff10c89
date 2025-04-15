
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Monitoring = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("sidebar.monitoring")}</h1>
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <p>Monitoring content will go here</p>
      </div>
    </div>
  );
};

export default Monitoring;
