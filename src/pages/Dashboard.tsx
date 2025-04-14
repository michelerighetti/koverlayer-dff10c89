
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";

const Dashboard = () => {
  const { t } = useLanguage();

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("sidebar.dashboard")}</h1>
      <p>{t("welcome")}</p>
      
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 bg-card rounded-lg border shadow-sm"
          >
            <h3 className="text-lg font-medium mb-2">Card {i}</h3>
            <p className="text-sm text-muted-foreground">
              Sample dashboard card content
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
