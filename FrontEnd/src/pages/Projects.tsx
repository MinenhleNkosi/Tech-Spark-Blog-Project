
import { useState, useEffect } from "react";
import { useAuth } from "@/contexts/AuthContext";
import { LoginModal } from "@/components/LoginModal";
import { RegisterModal } from "@/components/RegisterModal";
import CreateProjectForm from "@/components/projects/CreateProjectForm";
import { projectService } from "@/services/projectService";
import SearchBar from "@/components/projects/SearchBar";
import ProjectGrid from "@/components/projects/ProjectGrid";

export default function Projects() {
  const [projects, setProjects] = useState<any[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [registerModalOpen, setRegisterModalOpen] = useState(false);
  const { userRole } = useAuth();
  
  // Load projects on component mount
  useEffect(() => {
    loadProjects();
    
    // Initialize project storage on first load
    projectService.initializeStorage();
    
    // Listen for storage events to update projects list
    const handleStorageChange = () => {
      loadProjects();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const loadProjects = () => {
    const allProjects = projectService.getAllProjects();
    setProjects(allProjects);
  };
  
  const filteredProjects = projects.filter(project => 
    project.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.description.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.longDescription.toLowerCase().includes(searchTerm.toLowerCase()) ||
    project.technologies.some((tech: string) => tech.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  const handleProjectLinkClick = (e: React.MouseEvent) => {
    // If the user is a visitor, prevent default navigation and show login modal
    if (userRole === "visitor") {
      e.preventDefault();
      setLoginModalOpen(true);
    }
    // For other roles, the default link behavior will work
  };

  const handleLoginSuccess = () => {
    setLoginModalOpen(false);
  };
  
  const handleRegisterClick = () => {
    setLoginModalOpen(false);
    setRegisterModalOpen(true);
  };
  
  const handleRegisterSuccess = (email: string, password: string) => {
    setRegisterModalOpen(false);
    setLoginModalOpen(true);
  };
  
  const handleProjectCreated = (project: any) => {
    loadProjects();
  };

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="gradient-text">Projects & Portfolio</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Explore my latest web development projects built with .NET Core, Angular, and other modern technologies.
        </p>
      </div>
      
      {/* Admin Controls - Only visible to admin users */}
      {userRole === "admin" && (
        <div className="mb-6">
          <CreateProjectForm onProjectCreated={handleProjectCreated} />
        </div>
      )}
      
      {/* Search component */}
      <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
      
      {/* Projects grid component */}
      <ProjectGrid 
        projects={filteredProjects}
        handleProjectLinkClick={handleProjectLinkClick}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />

      {/* Login Modal */}
      <LoginModal 
        open={loginModalOpen}
        onOpenChange={setLoginModalOpen}
        onLoginSuccess={handleLoginSuccess}
        onRegisterClick={handleRegisterClick}
      />
      
      {/* Register Modal */}
      <RegisterModal
        open={registerModalOpen}
        onOpenChange={setRegisterModalOpen}
        onRegisterSuccess={handleRegisterSuccess}
      />
    </div>
  );
}
