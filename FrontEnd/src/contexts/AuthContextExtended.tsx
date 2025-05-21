
import { createContext, useContext, useState, ReactNode, useEffect } from "react";
import { useAuth } from "./AuthContext";

type AuthContextType = {
  isAuthenticated: boolean;
  userRole: string | null;
  login: () => void;
  logout: () => void;
  setUserRole: (role: string) => void;
};

type AuthProviderProps = {
  children: ReactNode;
};

const AuthContextExtended = createContext<AuthContextType | undefined>(undefined);

export const AuthProviderExtended = ({ children }: AuthProviderProps) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [userRole, setUserRole] = useState<string | null>(null);
  
  // Get values from original AuthContext to sync them
  const originalAuth = useAuth();

  // Sync the authentication state with original context
  useEffect(() => {
    setIsAuthenticated(originalAuth.isAuthenticated);
    setUserRole(originalAuth.userRole);
  }, [originalAuth.isAuthenticated, originalAuth.userRole]);

  const login = () => {
    setIsAuthenticated(true);
  };

  const logout = () => {
    setIsAuthenticated(false);
    setUserRole(null);
  };

  const handleSetUserRole = (role: string) => {
    setUserRole(role);
    // Also update the role in the original context
    originalAuth.setUserRole(role);
  };

  return (
    <AuthContextExtended.Provider
      value={{
        isAuthenticated,
        userRole,
        login,
        logout,
        setUserRole: handleSetUserRole,
      }}
    >
      {children}
    </AuthContextExtended.Provider>
  );
};

export const useAuthExtended = () => {
  const context = useContext(AuthContextExtended);
  if (context === undefined) {
    throw new Error("useAuthExtended must be used within an AuthProviderExtended");
  }
  return context;
};
