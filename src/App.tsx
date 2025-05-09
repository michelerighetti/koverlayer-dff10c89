import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { AuthProvider, useAuth } from "@/contexts/AuthContext";
import { LanguageProvider } from "@/contexts/LanguageContext";
import { MainLayout } from "@/components/layout/MainLayout";
import LoginForm from "@/components/auth/LoginForm";
import Dashboard from "./pages/Dashboard";
import Profile from "./pages/Profile";
import Settings from "./pages/Settings";
import Language from "./pages/Language";
import NotFound from "./pages/NotFound";
import Probe from "./pages/Probe";
import Monitoring from "./pages/Monitoring";
import Alerts from "./pages/Alerts";
import Vulnerabilities from "./pages/Vulnerabilities";
import Reports from "./pages/Reports";
import Organization from "./pages/Organization";
import Support from "./pages/Support";

const queryClient = new QueryClient();

// Protected route wrapper
const ProtectedRoute = ({ children }: { children: React.ReactNode }) => {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return (
      <div className="flex h-screen items-center justify-center">
        <div className="animate-spin h-8 w-8 border-4 border-primary border-t-transparent rounded-full" />
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" />;
  }

  return <MainLayout>{children}</MainLayout>;
};

const App = () => (
  <QueryClientProvider client={queryClient}>
    <LanguageProvider>
      <AuthProvider>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <AppRoutes />
          </BrowserRouter>
        </TooltipProvider>
      </AuthProvider>
    </LanguageProvider>
  </QueryClientProvider>
);

const AppRoutes = () => {
  const { isAuthenticated } = useAuth();

  return (
    <Routes>
      <Route 
        path="/login" 
        element={isAuthenticated ? <Navigate to="/dashboard" /> : <LoginForm />} 
      />
      <Route 
        path="/" 
        element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} />} 
      />
      <Route 
        path="/dashboard" 
        element={
          <ProtectedRoute>
            <Dashboard />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/probe" 
        element={
          <ProtectedRoute>
            <Probe />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/monitoring" 
        element={
          <ProtectedRoute>
            <Monitoring />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/settings" 
        element={
          <ProtectedRoute>
            <Settings />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/alerts" 
        element={
          <ProtectedRoute>
            <Alerts />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/vulnerabilities" 
        element={
          <ProtectedRoute>
            <Vulnerabilities />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/reports" 
        element={
          <ProtectedRoute>
            <Reports />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/organization" 
        element={
          <ProtectedRoute>
            <Organization />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="/support" 
        element={
          <ProtectedRoute>
            <Support />
          </ProtectedRoute>
        } 
      />
      <Route 
        path="*" 
        element={
          <ProtectedRoute>
            <NotFound />
          </ProtectedRoute>
        } 
      />
    </Routes>
  );
};

export default App;
