
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { ArrowRight, Clock, Heart, User } from "lucide-react";
import { useAuthExtended } from "@/contexts/AuthContextExtended";
import { blogService } from "@/services/blogService";
import { projectService } from "@/services/projectService";
import { RecruiterAccessModal } from "@/components/RecruiterAccessModal";

export default function Home() {
  // Get user role from AuthContextExtended
  const { userRole } = useAuthExtended();
  const isVisitor = userRole === 'visitor';
  
  const [posts, setPosts] = useState<any[]>([]);
  const [featuredProjects, setFeaturedProjects] = useState<any[]>([]);
  const [recruiterModalOpen, setRecruiterModalOpen] = useState(false);

  // Effect to load featured content
  useEffect(() => {
    // Initialize storage
    blogService.initializeStorage();
    projectService.initializeStorage();
    
    // Load data
    loadFeaturedPosts();
    loadFeaturedProjects();
    
    // Listen for storage events to update featured content
    const handleStorageChange = () => {
      loadFeaturedPosts();
      loadFeaturedProjects();
    };

    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const loadFeaturedPosts = () => {
    const featuredPosts = blogService.getFeaturedPosts();
    setPosts(featuredPosts);
  };
  
  const loadFeaturedProjects = () => {
    const projects = projectService.getFeaturedProjects();
    setFeaturedProjects(projects);
  };

  const handleLike = (id: number) => {
    // Prevent visitors from liking posts
    if (isVisitor) return;
    
    const post = posts.find(p => p.id === id);
    if (post) {
      const isLiked = !post.isLiked;
      const likes = isLiked ? post.likes + 1 : post.likes - 1;
      
      blogService.updatePost(id, { isLiked, likes });
      loadFeaturedPosts();
    }
  };

  return (
    <div className="space-y-10 pb-10">
      {/* Hero Section */}
      <section className="text-center py-12 md:py-20 max-w-4xl mx-auto">
        <h1 className="font-bold mb-6 animate-fade-in">
          <span className="gradient-text">Tech Insights</span> &<br /> Development Portfolio
        </h1>
        <p className="text-lg md:text-xl text-muted-foreground mb-8 max-w-2xl mx-auto animate-fade-in">
          Exploring the latest trends in technology, sharing development insights, and showcasing innovative projects.
        </p>
        <div className="flex flex-wrap gap-4 justify-center animate-fade-in">
          <Button asChild size="lg" className="bg-tech-blue hover:bg-tech-blue/90">
            <Link to="/blog">Explore Blog</Link>
          </Button>
          
          {/* Recruiter Button - Only show for Visitor role */}
          {isVisitor && (
            <Button 
              size="lg" 
              variant="outline" 
              className="bg-tech-purple/10 hover:bg-tech-purple/20 border-tech-purple/30 text-tech-purple"
              onClick={() => setRecruiterModalOpen(true)}
            >
              <User className="mr-2 h-5 w-5" />
              Recruiter
            </Button>
          )}

          <Button asChild variant="outline" size="lg">
            <Link to="/projects">View Projects</Link>
          </Button>
        </div>
      </section>

      {/* Featured Posts */}
      <section>
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Articles</h2>
          <Button asChild variant="ghost" className="gap-1">
            <Link to="/blog">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {posts.map((post) => (
            <Card key={post.id} className="card overflow-hidden h-full flex flex-col">
              <div className="h-48 overflow-hidden">
                <img 
                  src={post.image} 
                  alt={post.title} 
                  className="w-full h-full object-cover transition-transform hover:scale-105 duration-500"
                />
              </div>
              <CardHeader>
                <CardTitle className="line-clamp-2 hover:text-tech-blue transition-colors">
                  <Link to={`/blog/${post.id}`}>{post.title}</Link>
                </CardTitle>
                <CardDescription className="flex items-center gap-2">
                  <Clock className="w-4 h-4" /> {post.date} • by {post.author}
                </CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-3">{post.excerpt}</p>
              </CardContent>
              <CardFooter className="flex justify-between mt-auto pt-4">
                <div className="flex gap-2">
                  {post.tags.slice(0, 2).map((tag: string) => (
                    <Badge key={tag} variant="outline" className="bg-tech-blue text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {isVisitor ? (
                  <div className="flex items-center gap-1 text-muted-foreground">
                    <Heart className="w-4 h-4" /> 
                    {post.likes}
                  </div>
                ) : (
                  <div 
                    className="flex items-center gap-1 text-muted-foreground cursor-pointer hover:text-red-500 transition-colors"
                    onClick={(e) => {
                      e.preventDefault();
                      handleLike(post.id);
                    }}
                  >
                    <Heart 
                      className={`w-4 h-4 ${post.isLiked ? 'text-red-500 fill-red-500' : ''}`} 
                    /> 
                    {post.likes}
                  </div>
                )}
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Projects Preview */}
      <section className="mt-16">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-2xl font-semibold">Featured Projects</h2>
          <Button asChild variant="ghost" className="gap-1">
            <Link to="/projects">
              View All <ArrowRight className="w-4 h-4" />
            </Link>
          </Button>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
          {featuredProjects.map(project => (
            <Card key={project.id} className="card overflow-hidden bg-gradient-to-br from-tech-blue/10 to-tech-purple/5">
              <CardHeader>
                <CardTitle>{project.title}</CardTitle>
                <CardDescription>{project.description}</CardDescription>
              </CardHeader>
              <CardContent>
                <p className="text-muted-foreground line-clamp-2">
                  {project.longDescription}
                </p>
                <div className="flex flex-wrap gap-2 mt-4">
                  {project.technologies.slice(0, 3).map((tech: string) => (
                    <Badge key={tech} variant="outline" className="bg-tech-gray text-tech-darkgray">
                      {tech}
                    </Badge>
                  ))}
                </div>
              </CardContent>
              <CardFooter>
                <Button asChild variant="outline">
                  <Link to={`/projects`}>View Project</Link>
                </Button>
              </CardFooter>
            </Card>
          ))}
        </div>
      </section>

      {/* Recruiter Access Modal */}
      <RecruiterAccessModal 
        open={recruiterModalOpen} 
        onOpenChange={setRecruiterModalOpen} 
      />
    </div>
  );
}
