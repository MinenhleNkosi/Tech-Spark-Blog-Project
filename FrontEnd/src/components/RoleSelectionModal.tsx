
import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "@/contexts/AuthContext";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { RadioGroup, RadioGroupItem } from "@/components/ui/radio-group";
import { Label } from "@/components/ui/label";
import { toast } from "sonner";
import { Shield, User, UserRound, CheckCircle2 } from "lucide-react";
import { RegisterModal } from "./RegisterModal";
import { LoginModal } from "./LoginModal";
import { motion } from "framer-motion";

export function RoleSelectionModal() {
  const [open, setOpen] = useState(true);
  const [selectedRole, setSelectedRole] = useState<string | null>(null);
  const { login, setUserRole } = useAuth();
  const navigate = useNavigate();
  
  // New state variables for registration and login modals
  const [showRegisterModal, setShowRegisterModal] = useState(false);
  const [showLoginModal, setShowLoginModal] = useState(false);
  const [registeredEmail, setRegisteredEmail] = useState("");
  const [registeredPassword, setRegisteredPassword] = useState("");
  const [selectedAdminRole, setSelectedAdminRole] = useState(false);
  
  // Animation state
  const [animateSelection, setAnimateSelection] = useState<string | null>(null);

  const roleOptions = [
    { id: "normal", name: "Normal User", icon: <User className="h-5 w-5 text-tech-blue" /> },
    { id: "visitor", name: "Visitor", icon: <UserRound className="h-5 w-5 text-tech-purple" /> },
    { id: "admin", name: "Admin", icon: <Shield className="h-5 w-5 text-green-600" /> },
  ];

  const handleRoleChange = (role: string) => {
    setSelectedRole(role);
    setAnimateSelection(role);
    
    // Reset animation after a delay for future selections
    setTimeout(() => {
      setAnimateSelection(null);
    }, 800);
  };

  const handleContinue = () => {
    if (!selectedRole) {
      toast.error("Please select a role to continue");
      return;
    }

    // For "admin" role, show login modal first
    if (selectedRole === "admin") {
      setOpen(false);
      setSelectedAdminRole(true);
      setShowLoginModal(true);
      return;
    }
    
    // For "normal" role, also show login modal when Continue is clicked
    if (selectedRole === "normal") {
      setOpen(false);
      setShowLoginModal(true);
      return;
    }
    
    // For visitor role, use the original flow
    login(); // No need to pass user data for simple login
    setUserRole(selectedRole);
    
    setOpen(false);
    toast.success(`Welcome! You are now logged in as ${selectedRole}`);
    navigate("/"); // Navigate to home page for visitor role
  };
  
  // Handle dialog close - assign "visitor" role if closed without selection
  const handleOpenChange = (isOpen: boolean) => {
    if (!isOpen && open) {
      // User is closing the modal without making a selection
      login();
      setUserRole("visitor");
      toast.success("Welcome! You have been assigned the Visitor role");
      navigate("/");
    }
    setOpen(isOpen);
  };
  
  const handleRegisterSuccess = (email: string, password: string) => {
    // Close registration modal and open login modal
    setShowRegisterModal(false);
    setRegisteredEmail(email);
    setRegisteredPassword(password);
    setShowLoginModal(true);
  };
  
  const handleLoginSuccess = () => {
    // Close login modal
    setShowLoginModal(false);
    
    // Set user role based on what was previously selected
    if (selectedAdminRole) {
      setUserRole("admin");
      toast.success(`Welcome! You are now logged in as an admin user`);
      navigate("/insights"); // Navigate to insights page for admin role
    } else {
      setUserRole("normal");
      toast.success(`Welcome! You are now logged in as a normal user`);
      navigate("/"); // Navigate to home page for normal role
    }
  };

  // Handler to switch from login to register modal
  const handleSwitchToRegister = () => {
    setShowLoginModal(false);
    setShowRegisterModal(true);
  };

  // New handler for login modal close
  const handleLoginModalOpenChange = (isOpen: boolean) => {
    setShowLoginModal(isOpen);
    
    // If the user is closing the login modal without signing in
    if (!isOpen && showLoginModal) {
      login();
      setUserRole("visitor");
      toast.success("Welcome! You have been assigned the Visitor role");
      navigate("/");
    }
  };

  // New handler for register modal close
  const handleRegisterModalOpenChange = (isOpen: boolean) => {
    setShowRegisterModal(isOpen);
    
    // If the user is closing the register modal without registering
    if (!isOpen && showRegisterModal) {
      login();
      setUserRole("visitor");
      toast.success("Welcome! You have been assigned the Visitor role");
      navigate("/");
    }
  };

  // Animation variants for items
  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.15,
      }
    }
  };
  
  const itemVariants = {
    hidden: { y: 20, opacity: 0 },
    visible: { 
      y: 0, 
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 300,
        damping: 24
      }
    }
  };

  return (
    <>
      <Dialog open={open} onOpenChange={handleOpenChange}>
        <DialogContent className="sm:max-w-md overflow-hidden">
          <DialogHeader>
            <motion.div
              initial={{ y: -20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ duration: 0.5, ease: "easeOut" }}
            >
              <DialogTitle className="text-xl">Select Your Role</DialogTitle>
              <DialogDescription className="mt-2">
                Please select a role to continue to Tech Spark
              </DialogDescription>
            </motion.div>
          </DialogHeader>
          <motion.div 
            className="py-4"
            variants={containerVariants}
            initial="hidden"
            animate="visible"
          >
            <RadioGroup value={selectedRole || ""} onValueChange={handleRoleChange} className="space-y-4">
              {roleOptions.map((role, index) => (
                <motion.div 
                  key={role.id}
                  variants={itemVariants}
                  custom={index}
                  className={`
                    flex items-center space-x-4 rounded-lg border p-4 
                    hover:bg-muted/50 transition cursor-pointer
                    ${animateSelection === role.id ? 'ring-2 ring-primary/50 ring-offset-2' : ''}
                  `}
                >
                  <motion.div
                    whileTap={{ scale: 0.95 }}
                    className="flex items-center space-x-4 w-full"
                  >
                    <RadioGroupItem value={role.id} id={role.id} />
                    <Label htmlFor={role.id} className="flex items-center gap-2 cursor-pointer font-medium">
                      {role.icon}
                      {role.name}
                    </Label>
                    {selectedRole === role.id && (
                      <motion.div 
                        className="ml-auto"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        transition={{ type: "spring", stiffness: 500, damping: 15 }}
                      >
                        <CheckCircle2 className="h-5 w-5 text-primary" />
                      </motion.div>
                    )}
                  </motion.div>
                </motion.div>
              ))}
            </RadioGroup>
          </motion.div>
          <motion.div 
            className="flex justify-end"
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6, duration: 0.3 }}
          >
            <Button 
              onClick={handleContinue}
              className="relative overflow-hidden group"
            >
              <span className="relative z-10">Continue</span>
              <span className="absolute inset-0 bg-gradient-to-r from-primary/80 to-primary opacity-0 group-hover:opacity-100 transition-opacity duration-300"></span>
            </Button>
          </motion.div>
        </DialogContent>
      </Dialog>
      
      {/* Registration modal */}
      <RegisterModal 
        open={showRegisterModal}
        onOpenChange={handleRegisterModalOpenChange}
        onRegisterSuccess={handleRegisterSuccess}
      />
      
      {/* Login modal */}
      <LoginModal
        open={showLoginModal}
        onOpenChange={handleLoginModalOpenChange}
        onLoginSuccess={handleLoginSuccess}
        onRegisterClick={handleSwitchToRegister}
        initialEmail={registeredEmail}
        initialPassword={registeredPassword}
      />
    </>
  );
}
