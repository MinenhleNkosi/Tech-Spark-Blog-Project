
import { ReactNode } from "react";
import { Sidebar } from "./Sidebar";
import { useAuth } from "@/contexts/AuthContext";
import { useAuthExtended } from "@/contexts/AuthContextExtended";
import { Button } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import { useToast } from "@/hooks/use-toast";
import { useNavigate } from "react-router-dom";
import { Shield, User, UserRound } from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger
} from "@/components/ui/dropdown-menu";
 
interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { logout } = useAuth();
  const { userRole, logout: extendedLogout } = useAuthExtended();
  const { toast } = useToast();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    extendedLogout(); // Also logout from extended auth
    toast({
      title: "Logged out",
      description: "You have been successfully logged out.",
    });
    navigate('/role-select');
  };

  const handleProfileClick = () => {
    navigate('/profile');
  };

  const getRoleIcon = () => {
    switch(userRole) {
      case 'admin':
        return <Shield className="h-4 w-4 text-green-600" />;
      case 'visitor':
        return <UserRound className="h-4 w-4 text-tech-purple" />;
      case 'recruiter':
        return <User className="h-4 w-4 text-tech-blue" />;
      default:
        return <User className="h-4 w-4 text-tech-blue" />;
    }
  };

  const isRecruiter = userRole === 'recruiter';

  return (
    <div className="min-h-screen flex bg-gradient-to-br from-background/80 to-background">
      <Sidebar />
      <main className="flex-1 lg:ml-64 min-h-screen">
        <div className="container mx-auto px-4 py-6 lg:py-10">
          <div className="flex justify-between items-center mb-4">
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button variant="ghost" className="flex items-center gap-1 bg-white/50 backdrop-blur-sm cursor-pointer hover:bg-white/60 h-auto py-1 px-3">
                  {getRoleIcon()}
                  {userRole && userRole.charAt(0).toUpperCase() + userRole.slice(1)}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="start" className="bg-white">
                {!isRecruiter && userRole !== "visitor" && (
                  <DropdownMenuItem onClick={handleProfileClick} className="cursor-pointer">
                    Profile
                  </DropdownMenuItem>
                )}
                <DropdownMenuItem onClick={handleLogout} className="cursor-pointer">
                  Logout
                </DropdownMenuItem>
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
          <div className="backdrop-blur-sm bg-white/30 rounded-xl p-6 border border-white/20 shadow-lg">
            {children}
          </div>
        </div>
      </main>
    </div>
  );
}
