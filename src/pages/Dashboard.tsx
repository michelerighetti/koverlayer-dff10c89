
import React from "react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Shield, Users, UserRound } from "lucide-react";

const Dashboard = () => {
  const { t } = useLanguage();
  const { user } = useAuth();

  const getRoleIcon = () => {
    switch (user?.role) {
      case 'producer':
        return <Shield className="w-8 h-8 text-primary" />;
      case 'reseller':
        return <Users className="w-8 h-8 text-primary" />;
      case 'customer':
        return <UserRound className="w-8 h-8 text-primary" />;
      default:
        return null;
    }
  };

  return (
    <div className="space-y-4">
      <h1 className="text-2xl font-bold">{t("sidebar.dashboard")}</h1>
      
      <div className="bg-card rounded-lg border shadow-sm p-6 mb-6">
        <div className="flex items-center gap-4">
          {getRoleIcon()}
          <div>
            <h2 className="text-xl font-semibold">{user?.name}</h2>
            <p className="text-muted-foreground capitalize">{user?.role}</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {[1, 2, 3].map((i) => (
          <div
            key={i}
            className="p-6 bg-card rounded-lg border shadow-sm"
          >
            <h3 className="text-lg font-medium mb-2">
              {user?.role === 'producer' 
                ? `Reseller ${i} Overview` 
                : user?.role === 'reseller' 
                  ? `Customer ${i} Overview`
                  : `Overview ${i}`}
            </h3>
            <p className="text-sm text-muted-foreground">
              {user?.role === 'producer' 
                ? 'Reseller performance metrics'
                : user?.role === 'reseller'
                  ? 'Customer activity summary'
                  : 'Your activity summary'}
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Dashboard;
