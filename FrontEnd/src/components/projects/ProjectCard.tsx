
import React from "react";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Github, Globe } from "lucide-react";
import { useAuthExtended } from "@/contexts/AuthContextExtended";

interface ProjectCardProps {
  project: {
    id: number;
    title: string;
    description: string;
    longDescription: string;
    image: string;
    technologies: string[];
    demoUrl: string;
    githubUrl: string;
  };
  handleProjectLinkClick: (e: React.MouseEvent) => void;
}

export default function ProjectCard({ project, handleProjectLinkClick }: ProjectCardProps) {
  const { userRole } = useAuthExtended();
  const isRecruiter = userRole === "recruiter";
  
  return (
    <Card key={project.id} className="card overflow-hidden h-full flex flex-col">
      <div className="h-48 overflow-hidden">
        <img 
          src={project.image} 
          alt={project.title} 
          className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
        />
      </div>
      <CardHeader>
        <CardTitle>{project.title}</CardTitle>
        <CardDescription>{project.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground mb-4">{project.longDescription}</p>
        <div className="flex flex-wrap gap-2 mt-4">
          {project.technologies.map((tech: string) => (
            <Badge key={tech} variant="outline" className="bg-tech-gray text-tech-darkgray">
              {tech}
            </Badge>
          ))}
        </div>
      </CardContent>
      <CardFooter className="flex gap-3">
        <Button asChild variant="outline" className="gap-2">
          <a 
            href={project.demoUrl} 
            target="_blank" 
            rel="noopener noreferrer"
            onClick={handleProjectLinkClick}
          >
            <Globe className="h-4 w-4" />
            Live Demo
          </a>
        </Button>
        
        {/* Only display the Source Code button if the user is not a recruiter */}
        {!isRecruiter && (
          <Button asChild variant="outline" className="gap-2">
            <a 
              href={project.githubUrl} 
              target="_blank" 
              rel="noopener noreferrer"
              onClick={handleProjectLinkClick}
            >
              <Github className="h-4 w-4" />
              Source Code
            </a>
          </Button>
        )}
      </CardFooter>
    </Card>
  );
}
