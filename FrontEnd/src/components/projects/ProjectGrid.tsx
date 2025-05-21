
import React from "react";
import { Button } from "@/components/ui/button";
import ProjectCard from "./ProjectCard";

interface Project {
  id: number;
  title: string;
  description: string;
  longDescription: string;
  image: string;
  technologies: string[];
  demoUrl: string;
  githubUrl: string;
}

interface ProjectGridProps {
  projects: Project[];
  handleProjectLinkClick: (e: React.MouseEvent) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

export default function ProjectGrid({ projects, handleProjectLinkClick, searchTerm, setSearchTerm }: ProjectGridProps) {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
      {projects.length > 0 ? (
        projects.map((project) => (
          <ProjectCard 
            key={project.id} 
            project={project} 
            handleProjectLinkClick={handleProjectLinkClick} 
          />
        ))
      ) : (
        <div className="col-span-full text-center py-12">
          <h3 className="text-xl font-medium mb-2">No projects found</h3>
          <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
          <Button onClick={() => setSearchTerm("")}>
            Clear Search
          </Button>
        </div>
      )}
    </div>
  );
}
