
import { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Clock, Heart, Search } from "lucide-react";
import { useAuthExtended } from "@/contexts/AuthContextExtended";
import CreateBlogPostForm from "@/components/blog/CreateBlogPostForm";
import { blogService } from "@/services/blogService";

export default function Blog() {
  const [searchTerm, setSearchTerm] = useState("");
  const [blogPosts, setBlogPosts] = useState<any[]>([]);
  const { userRole } = useAuthExtended();
  const isVisitor = userRole === 'visitor';
  const isAdmin = userRole === 'admin';
  const isRecruiter = userRole === 'recruiter';
  
  // Load blog posts on component mount and when storage changes
  useEffect(() => {
    loadBlogPosts();
    
    // Listen for storage events to update state when posts change
    const handleStorageChange = () => {
      loadBlogPosts();
    };
    
    window.addEventListener('storage', handleStorageChange);
    
    return () => {
      window.removeEventListener('storage', handleStorageChange);
    };
  }, []);
  
  const loadBlogPosts = () => {
    const posts = blogService.getAllPosts();
    setBlogPosts(posts);
  };
  
  const handleLike = (id: number) => {
    if (isVisitor || isRecruiter) return; // Prevent like action for visitors and recruiters
    
    const post = blogPosts.find(p => p.id === id);
    if (post) {
      const isLiked = !post.isLiked;
      const likes = isLiked ? post.likes + 1 : post.likes - 1;
      
      blogService.updatePost(id, { isLiked, likes });
      loadBlogPosts();
    }
  };
  
  const handleCreatePost = (newPost: any) => {
    blogService.addPost(newPost);
    loadBlogPosts();
  };

  const filteredPosts = blogPosts.filter(post => 
    post.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.excerpt.toLowerCase().includes(searchTerm.toLowerCase()) ||
    post.tags.some((tag: string) => tag.toLowerCase().includes(searchTerm.toLowerCase()))
  );

  return (
    <div className="space-y-8">
      <div className="flex flex-col gap-4">
        <h1 className="gradient-text">Tech Blog</h1>
        <p className="text-lg text-muted-foreground max-w-3xl">
          Dive into the latest tech articles, tutorials, and insights on web development, 
          .NET Core, Angular, and more.
        </p>
      </div>
      
      {/* Controls Row - Search and Create Button */}
      <div className="flex flex-col sm:flex-row gap-4 justify-between items-start sm:items-center">
        {/* Search - Now at the top of the page */}
        <div className="relative max-w-md w-full">
          <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
          <Input
            type="search"
            placeholder="Search articles..."
            className="pl-10"
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
        </div>
        
        {/* Create Post Button for Admin */}
        {isAdmin && (
          <CreateBlogPostForm onPostCreated={handleCreatePost} />
        )}
      </div>
      
      {/* Blog Posts Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {filteredPosts.length > 0 ? (
          filteredPosts.map((post) => (
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
                <div className="flex flex-wrap gap-2">
                  {post.tags.map((tag: string) => (
                    <Badge key={tag} variant="outline" className="bg-tech-blue text-white">
                      {tag}
                    </Badge>
                  ))}
                </div>
                {isVisitor || isRecruiter ? (
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
          ))
        ) : (
          <div className="col-span-full text-center py-12">
            <h3 className="text-xl font-medium mb-2">No articles found</h3>
            <p className="text-muted-foreground mb-4">Try adjusting your search criteria</p>
            <Button onClick={() => setSearchTerm("")}>
              Clear Search
            </Button>
          </div>
        )}
      </div>
    </div>
  );
}
