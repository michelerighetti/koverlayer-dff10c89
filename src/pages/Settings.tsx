
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { Switch } from "@/components/ui/switch";
import { Label } from "@/components/ui/label";

const Settings = () => {
  const { t } = useLanguage();
  
  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("sidebar.settings")}</h1>
      
      <div className="bg-card rounded-lg shadow-sm border p-6 space-y-6">
        <div>
          <h3 className="text-lg font-medium mb-4">Preferences</h3>
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="notifications">Enable notifications</Label>
                <p className="text-sm text-muted-foreground">Receive email notifications</p>
              </div>
              <Switch id="notifications" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="marketing">Marketing emails</Label>
                <p className="text-sm text-muted-foreground">Receive marketing emails</p>
              </div>
              <Switch id="marketing" />
            </div>
            
            <div className="flex items-center justify-between">
              <div className="space-y-0.5">
                <Label htmlFor="analytics">Usage analytics</Label>
                <p className="text-sm text-muted-foreground">Share anonymous usage data</p>
              </div>
              <Switch id="analytics" defaultChecked />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Settings;
