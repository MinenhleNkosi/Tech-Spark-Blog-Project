
import { useState } from "react";
import { Link, useLocation } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  BookText,
  Briefcase,
  ChartPieIcon,
  Home,
  Menu,
  MessageSquare,
  User,
  X,
} from "lucide-react";
import { useAuthExtended } from "@/contexts/AuthContextExtended";

export function Sidebar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();
  const { userRole } = useAuthExtended();

  const toggleSidebar = () => {
    setIsOpen(!isOpen);
  };

  const isAdmin = userRole === "admin";
  const isRecruiter = userRole === "recruiter";

  const navItems = [
    { name: "Home", path: "/", icon: <Home className="w-5 h-5" /> },
    { name: "Blog", path: "/blog", icon: <BookText className="w-5 h-5" /> },
    { name: "Projects", path: "/projects", icon: <Briefcase className="w-5 h-5" /> },
  ];

  // Show Portfolio for admin and recruiter users
  const portfolioItem = (isAdmin || isRecruiter) ? 
    { name: "Portfolio", path: "/portfolio", icon: <User className="w-5 h-5" /> } : 
    null;
  
  // Show Contact for normal users and recruiters
  const contactItem = !isAdmin ?
    { name: "Contact", path: "/contact", icon: <MessageSquare className="w-5 h-5" /> } :
    null;
  
  // Add Insights link only for admin users
  const adminNavItems = isAdmin ? [
    { name: "Insights", path: "/insights", icon: <ChartPieIcon className="w-5 h-5" /> }
  ] : [];

  // Combine the nav items
  const allNavItems = [
    ...navItems, 
    ...(portfolioItem ? [portfolioItem] : []),
    ...(contactItem ? [contactItem] : []),
    ...adminNavItems
  ];

  return (
    <>
      {/* Mobile Menu Toggle */}
      <div className="lg:hidden fixed top-4 left-4 z-30">
        <Button 
          variant="outline" 
          size="icon" 
          onClick={toggleSidebar}
          className="rounded-full h-10 w-10 bg-white shadow-md"
        >
          {isOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
        </Button>
      </div>

      {/* Sidebar */}
      <div
        className={`fixed inset-y-0 left-0 z-20 flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm transform transition-transform duration-300 lg:translate-x-0 ${
          isOpen ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="p-4 border-b flex items-center justify-between">
          <Link to="/" className="flex items-center space-x-2" onClick={() => setIsOpen(false)}>
            <div className="font-bold text-xl gradient-text">Tech<span className="text-tech-blue">Spark</span></div>
          </Link>
          <Button variant="ghost" size="icon" onClick={toggleSidebar} className="lg:hidden">
            <X className="h-5 w-5" />
          </Button>
        </div>

        {/* Navigation Links */}
        <nav className="flex-1 p-4 space-y-1">
          {allNavItems.map((item) => (
            <Link
              key={item.name}
              to={item.path}
              className={`nav-link ${location.pathname === item.path ? "active" : ""}`}
              onClick={() => setIsOpen(false)}
            >
              {item.icon}
              <span>{item.name}</span>
            </Link>
          ))}
        </nav>
      </div>

      {/* Overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 z-10 bg-black/20 lg:hidden"
          onClick={toggleSidebar}
        />
      )}
    </>
  );
}
