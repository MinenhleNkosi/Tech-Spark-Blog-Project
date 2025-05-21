
import React, { createContext, useContext, useState, ReactNode } from "react";

type User = {
  id: string;
  name: string;
  email: string;
};

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  userRole: string | null; // Add userRole property
  login: (user?: User) => void; // Make user parameter optional
  logout: () => void;
  setUserRole: (role: string) => void; // Add setUserRole function
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [userRole, setUserRole] = useState<string | null>(null); // Add userRole state

  const login = (userData?: User) => {
    if (userData) {
      setUser(userData);
      // In a real app, you would store the user in localStorage or a token
      localStorage.setItem("user", JSON.stringify(userData));
    } else {
      // Simple login without user data, just set authentication to true
      setIsAuthenticated(true);
    }
  };

  const logout = () => {
    setUser(null);
    setUserRole(null); // Clear userRole on logout
    localStorage.removeItem("user");
  };

  // Add function to set user role
  const handleSetUserRole = (role: string) => {
    setUserRole(role);
  };

  // Check if user exists in localStorage on initial load
  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
  }, []);

  // Add isAuthenticated state variable
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const value = {
    user,
    isAuthenticated: !!user || isAuthenticated, // Consider both user object and isAuthenticated flag
    userRole,
    login,
    logout,
    setUserRole: handleSetUserRole
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
