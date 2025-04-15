
import React from "react";
import { 
  LayoutDashboard, 
  Search, 
  Monitor, 
  Settings, 
  Bell, 
  Shield, 
  FileText, 
  Users, 
  HelpCircle,
  Globe, 
  LogOut 
} from "lucide-react";
import { useLanguage } from "@/contexts/LanguageContext";
import { useAuth } from "@/contexts/AuthContext";
import { Link } from "react-router-dom";
import Logo from "@/components/Logo";
import {
  Sidebar,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuItem,
  SidebarMenuButton,
  SidebarProvider,
} from "@/components/ui/sidebar";

export const SidebarWrapper: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <SidebarProvider>
      <div className="flex min-h-screen w-full">
        <AppSidebar />
        {children}
      </div>
    </SidebarProvider>
  );
};

const AppSidebar = () => {
  const { t } = useLanguage();
  const { logout, user } = useAuth();

  const menuItems = [
    { path: "/dashboard", icon: LayoutDashboard, label: "sidebar.dashboard" },
    { path: "/probe", icon: Search, label: "sidebar.probe" },
    { path: "/monitoring", icon: Monitor, label: "sidebar.monitoring" },
    { path: "/settings", icon: Settings, label: "sidebar.settings" },
    { path: "/alerts", icon: Bell, label: "sidebar.alerts" },
    { path: "/vulnerabilities", icon: Shield, label: "sidebar.vulnerabilities" },
    { path: "/reports", icon: FileText, label: "sidebar.reports" },
    { path: "/organization", icon: Users, label: "sidebar.organization" },
    { path: "/support", icon: HelpCircle, label: "sidebar.support" },
  ];

  return (
    <Sidebar>
      <SidebarHeader>
        <div className="flex items-center px-2 py-3">
          <Logo size={32} className="flex-shrink-0 mr-2" />
          <span className="text-xl font-bold truncate">KOVERLAYER</span>
        </div>
      </SidebarHeader>
      <SidebarContent>
        <SidebarGroup>
          <SidebarMenu>
            {menuItems.map((item) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton asChild tooltip={t(item.label)}>
                  <Link to={item.path}>
                    <item.icon />
                    <span>{t(item.label)}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>
      </SidebarContent>
      <SidebarFooter>
        <SidebarMenu>
          <SidebarMenuItem>
            <SidebarMenuButton 
              asChild 
              tooltip="Logout"
              onClick={() => logout()}
            >
              <button className="w-full">
                <LogOut />
                <span>{t("logout.button")}</span>
              </button>
            </SidebarMenuButton>
          </SidebarMenuItem>
        </SidebarMenu>
        {user && (
          <div className="p-2 flex items-center">
            <div className="flex-shrink-0 h-8 w-8 bg-primary/20 rounded-full mr-2 flex items-center justify-center">
              <span className="text-sm font-medium">{user.name.charAt(0)}</span>
            </div>
            <span className="text-sm font-medium truncate">{user.name}</span>
          </div>
        )}
      </SidebarFooter>
    </Sidebar>
  );
};
