
import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Plus } from "lucide-react";
import { useToast } from "@/hooks/use-toast";
import { projectService, getRandomDefaultImage } from "@/services/projectService";

interface CreateProjectFormProps {
  onProjectCreated: (project: any) => void;
}

export default function CreateProjectForm({ onProjectCreated }: CreateProjectFormProps) {
  const [isOpen, setIsOpen] = useState(false);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [longDescription, setLongDescription] = useState("");
  const [technologies, setTechnologies] = useState("");
  const [imageUrl, setImageUrl] = useState("");
  const [demoUrl, setDemoUrl] = useState("");
  const [githubUrl, setGithubUrl] = useState("");
  const { toast } = useToast();

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Validate required fields
    if (!title || !description || !longDescription || !technologies) {
      toast({
        title: "Missing fields",
        description: "Please fill in all required fields",
        variant: "destructive",
      });
      return;
    }

    // Use default URLs if not provided
    const finalDemoUrl = demoUrl.trim() || "#";
    const finalGithubUrl = githubUrl.trim() || "#";
    
    // Use a default image if the user didn't provide one
    const finalImageUrl = imageUrl.trim() || getRandomDefaultImage();

    // Create new project
    const newProject = {
      title,
      description,
      longDescription,
      technologies: technologies.split(",").map(tech => tech.trim()),
      image: finalImageUrl,
      demoUrl: finalDemoUrl,
      githubUrl: finalGithubUrl
    };

    // Add the project using the service
    const createdProject = projectService.addProject(newProject);
    
    // Call the callback to notify parent component
    onProjectCreated(createdProject);
    
    // Reset form and close dialog
    resetForm();
    setIsOpen(false);
    
    toast({
      title: "Project created",
      description: "Your project has been successfully created",
    });
  };

  const resetForm = () => {
    setTitle("");
    setDescription("");
    setLongDescription("");
    setTechnologies("");
    setImageUrl("");
    setDemoUrl("");
    setGithubUrl("");
  };

  return (
    <>
      <Button 
        onClick={() => setIsOpen(true)} 
        className="flex items-center gap-2 bg-tech-blue hover:bg-tech-blue/90"
      >
        <Plus className="h-4 w-4" /> Create New Project
      </Button>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent className="sm:max-w-[600px] max-h-[90vh] overflow-y-auto">
          <DialogHeader>
            <DialogTitle>Create New Project</DialogTitle>
            <DialogDescription>
              Fill in the details for your new project.
            </DialogDescription>
          </DialogHeader>
          
          <form onSubmit={handleSubmit} className="space-y-4 py-4">
            <div className="space-y-2">
              <label htmlFor="title" className="text-sm font-medium">Project Title</label>
              <Input
                id="title"
                placeholder="Enter project title"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="description" className="text-sm font-medium">Short Description</label>
              <Input
                id="description"
                placeholder="Brief summary of the project"
                value={description}
                onChange={(e) => setDescription(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="longDescription" className="text-sm font-medium">Full Description</label>
              <Textarea
                id="longDescription"
                placeholder="Enter a detailed description of the project"
                value={longDescription}
                onChange={(e) => setLongDescription(e.target.value)}
                rows={4}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="technologies" className="text-sm font-medium">Technologies</label>
              <Input
                id="technologies"
                placeholder="Enter technologies separated by commas (e.g., React, Node.js, MongoDB)"
                value={technologies}
                onChange={(e) => setTechnologies(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="image" className="text-sm font-medium">Image URL (optional)</label>
              <Input
                id="image"
                placeholder="Enter image URL for the project (if left blank, a default image will be used)"
                value={imageUrl}
                onChange={(e) => setImageUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="demoUrl" className="text-sm font-medium">Live Demo URL (optional)</label>
              <Input
                id="demoUrl"
                placeholder="Enter URL to live demo"
                value={demoUrl}
                onChange={(e) => setDemoUrl(e.target.value)}
              />
            </div>

            <div className="space-y-2">
              <label htmlFor="githubUrl" className="text-sm font-medium">GitHub URL (optional)</label>
              <Input
                id="githubUrl"
                placeholder="Enter URL to GitHub repository"
                value={githubUrl}
                onChange={(e) => setGithubUrl(e.target.value)}
              />
            </div>

            <DialogFooter>
              <Button type="button" variant="outline" onClick={() => setIsOpen(false)}>
                Cancel
              </Button>
              <Button type="submit">Create Project</Button>
            </DialogFooter>
          </form>
        </DialogContent>
      </Dialog>
    </>
  );
}
