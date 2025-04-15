
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Alerts = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("sidebar.alerts")}</h1>
      <div className="bg-card rounded-lg border shadow-sm p-6">
        <p>Alerts content will go here</p>
      </div>
    </div>
  );
};

export default Alerts;
