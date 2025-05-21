
import { Navigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import Home from "./Home";

const Index = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return <Home />;
};

export default Index;
