
import React from "react";
import { 
  Home, Settings, User, Globe, LogOut
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
  SidebarTrigger,
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
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Dashboard">
                <Link to="/dashboard">
                  <Home />
                  <span>{t("sidebar.dashboard")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Profile">
                <Link to="/profile">
                  <User />
                  <span>{t("sidebar.profile")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Settings">
                <Link to="/settings">
                  <Settings />
                  <span>{t("sidebar.settings")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
            <SidebarMenuItem>
              <SidebarMenuButton asChild tooltip="Language">
                <Link to="/language">
                  <Globe />
                  <span>{t("sidebar.language")}</span>
                </Link>
              </SidebarMenuButton>
            </SidebarMenuItem>
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
