
import React, { createContext, useContext, useState, useEffect } from "react";
import type { User, UserRole } from "@/types/auth";

interface AuthContextType {
  isAuthenticated: boolean;
  user: User | null;
  login: () => Promise<void>;
  logout: () => Promise<void>;
  isLoading: boolean;
  canViewUser: (userId: string) => boolean;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Helper function to check if a user can view another user's data
  const canViewUser = (targetUserId: string): boolean => {
    if (!user) return false;

    // Producer can view all
    if (user.role === 'producer') return true;

    // Reseller can view their own customers
    if (user.role === 'reseller') {
      // Return true if the target user is a customer with this reseller as parent
      return user.id === targetUserId || mockUsers.some(u => 
        u.id === targetUserId && 
        u.role === 'customer' && 
        u.parentId === user.id
      );
    }

    // Customers can only view their own data
    return user.id === targetUserId;
  };

  // Mock users for demonstration
  const mockUsers = [
    {
      id: "producer1",
      name: "Main Producer",
      email: "producer@koverlayer.com",
      role: 'producer' as UserRole
    },
    {
      id: "reseller1",
      name: "First Reseller",
      email: "reseller1@example.com",
      role: 'reseller' as UserRole,
      parentId: "producer1"
    },
    {
      id: "reseller2",
      name: "Second Reseller",
      email: "reseller2@example.com",
      role: 'reseller' as UserRole,
      parentId: "producer1"
    },
    {
      id: "customer1",
      name: "Customer One",
      email: "customer1@example.com",
      role: 'customer' as UserRole,
      parentId: "reseller1"
    },
    {
      id: "customer2",
      name: "Customer Two",
      email: "customer2@example.com",
      role: 'customer' as UserRole,
      parentId: "reseller1"
    }
  ];

  useEffect(() => {
    // Check if user is already authenticated
    const checkAuth = async () => {
      try {
        const storedUser = localStorage.getItem("koverlayer_user");
        if (storedUser) {
          setUser(JSON.parse(storedUser));
          setIsAuthenticated(true);
        }
      } catch (error) {
        console.error("Authentication check failed:", error);
      } finally {
        setIsLoading(false);
      }
    };

    checkAuth();
  }, []);

  // Mock login function - in real implementation, this would be replaced with Azure B2C
  const login = async () => {
    setIsLoading(true);
    try {
      // For demo purposes, we'll randomly select a user role
      const mockUser = mockUsers[Math.floor(Math.random() * mockUsers.length)];
      
      localStorage.setItem("koverlayer_user", JSON.stringify(mockUser));
      setUser(mockUser);
      setIsAuthenticated(true);
    } catch (error) {
      console.error("Login failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    try {
      localStorage.removeItem("koverlayer_user");
      setUser(null);
      setIsAuthenticated(false);
    } catch (error) {
      console.error("Logout failed:", error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AuthContext.Provider
      value={{
        isAuthenticated,
        user,
        login,
        logout,
        isLoading,
        canViewUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
