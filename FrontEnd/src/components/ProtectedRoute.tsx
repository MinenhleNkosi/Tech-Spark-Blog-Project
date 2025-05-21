
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthExtended } from "@/contexts/AuthContextExtended";
import { ReactNode } from "react";

interface ProtectedRouteProps {
  children: ReactNode;
}

export function ProtectedRoute({ children }: ProtectedRouteProps) {
  const { isAuthenticated } = useAuth();
  const { isAuthenticated: isExtendedAuth, userRole } = useAuthExtended();
  const location = useLocation();

  // If neither auth context has authenticated the user, redirect to role selection
  if (!isAuthenticated && !isExtendedAuth) {
    return <Navigate to="/role-select" replace />;
  }

  // If the user is a visitor and trying to access the profile page, redirect to home
  if (userRole === "visitor" && location.pathname === "/profile") {
    return <Navigate to="/" replace />;
  }
  
  // If the user is not an admin or recruiter and trying to access the portfolio page, redirect to home
  if (userRole !== "admin" && userRole !== "recruiter" && location.pathname === "/portfolio") {
    return <Navigate to="/" replace />;
  }

  return <>{children}</>;
}
