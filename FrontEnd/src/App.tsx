
import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";

import { Layout } from "./components/layout/Layout";
import Home from "./pages/Home";
import Blog from "./pages/Blog";
import BlogPost from "./pages/BlogPost";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Login from "./pages/Login";
import Register from "./pages/Register";
import NotFound from "./pages/NotFound";
import Profile from "./pages/Profile";
import Insights from "./pages/Insights";
import Portfolio from "./pages/Portfolio"; // Import the new Portfolio page
import { AuthProvider } from "./contexts/AuthContext";
import { AuthProviderExtended } from "./contexts/AuthContextExtended";
import { ProtectedRoute } from "./components/ProtectedRoute";
import { AuthRedirect } from "./components/AuthRedirect";
import RoleSelection from "./pages/RoleSelection";

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <AuthProvider>
      <AuthProviderExtended>
        <TooltipProvider>
          <Toaster />
          <Sonner />
          <BrowserRouter>
            <Routes>
              {/* Role selection route - this is the entry point */}
              <Route path="/role-select" element={<RoleSelection />} />
              
              {/* Protected routes */}
              <Route path="/" element={
                <ProtectedRoute>
                  <Layout><Home /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/blog" element={
                <ProtectedRoute>
                  <Layout><Blog /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/blog/:id" element={
                <ProtectedRoute>
                  <Layout><BlogPost /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/projects" element={
                <ProtectedRoute>
                  <Layout><Projects /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/contact" element={
                <ProtectedRoute>
                  <Layout><Contact /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/portfolio" element={
                <ProtectedRoute>
                  <Layout><Portfolio /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/profile" element={
                <ProtectedRoute>
                  <Layout><Profile /></Layout>
                </ProtectedRoute>
              } />
              <Route path="/insights" element={
                <ProtectedRoute>
                  <Layout><Insights /></Layout>
                </ProtectedRoute>
              } />
              
              {/* Auth routes - redirect to home if already logged in */}
              <Route path="/login" element={
                <AuthRedirect>
                  <Login />
                </AuthRedirect>
              } />
              <Route path="/register" element={
                <AuthRedirect>
                  <Register />
                </AuthRedirect>
              } />
              
              {/* Default route - redirect to role selection */}
              <Route path="*" element={<Navigate to="/role-select" replace />} />
            </Routes>
          </BrowserRouter>
        </TooltipProvider>
      </AuthProviderExtended>
    </AuthProvider>
  </QueryClientProvider>
);

export default App;
