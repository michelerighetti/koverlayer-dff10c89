
import React from "react";
import { useAuth } from "@/contexts/AuthContext";
import { useLanguage } from "@/contexts/LanguageContext";

const Profile = () => {
  const { user } = useAuth();
  const { t } = useLanguage();
  
  if (!user) return null;

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("sidebar.profile")}</h1>
      
      <div className="bg-card rounded-lg shadow-sm border p-6">
        <div className="flex items-center mb-6">
          <div className="h-16 w-16 bg-primary/20 rounded-full flex items-center justify-center mr-4">
            <span className="text-xl font-bold">{user.name.charAt(0)}</span>
          </div>
          <div>
            <h2 className="text-xl font-bold">{user.name}</h2>
            <p className="text-muted-foreground">{user.email}</p>
          </div>
        </div>
        
        <div className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div>
              <label className="text-sm font-medium text-muted-foreground">ID</label>
              <p>{user.id}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Name</label>
              <p>{user.name}</p>
            </div>
            <div>
              <label className="text-sm font-medium text-muted-foreground">Email</label>
              <p>{user.email}</p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
