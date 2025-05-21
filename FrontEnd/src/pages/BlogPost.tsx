
import { useParams, Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Separator } from "@/components/ui/separator";
import { Badge } from "@/components/ui/badge";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { ArrowLeft, Calendar, Heart, MessageSquare, Share2 } from "lucide-react";
import { useAuthExtended } from "@/contexts/AuthContextExtended";

// Mock data for a blog post
const blogPostData = {
  id: 1,
  title: "Getting Started with React in 2025",
  excerpt: "Learn how to set up a modern React development environment with the latest tools and best practices.",
  content: `
    <p class="mb-4">React continues to be one of the most popular JavaScript libraries for building user interfaces in 2025. Whether you're just getting started with web development or looking to update your skills, this guide will help you set up a modern React development environment.</p>
    
    <h2 class="text-2xl font-semibold mt-8 mb-4">Setting Up Your Development Environment</h2>
    
    <p class="mb-4">First, ensure you have Node.js installed on your machine. We recommend using the latest LTS version for the best compatibility.</p>
    
    <pre class="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
    <code>npx create-react-app my-app</code>
    </pre>
    
    <p class="mb-4">This command creates a new React application with a standard project structure and all the necessary dependencies. Alternatively, for a more modern setup, you can use Vite:</p>
    
    <pre class="bg-gray-100 p-4 rounded-md mb-6 overflow-x-auto">
    <code>npm create vite@latest my-app -- --template react-ts</code>
    </pre>
    
    <h2 class="text-2xl font-semibold mt-8 mb-4">Essential Tools for React Development</h2>
    
    <p class="mb-4">In 2025, several tools have become essential for React development:</p>
    
    <ul class="list-disc pl-6 mb-6">
      <li class="mb-2"><strong>TypeScript</strong> - Adding static typing to your JavaScript code</li>
      <li class="mb-2"><strong>ESLint</strong> - For code linting and enforcing coding standards</li>
      <li class="mb-2"><strong>Prettier</strong> - For automatic code formatting</li>
      <li class="mb-2"><strong>React Query</strong> - For data fetching and state management</li>
      <li class="mb-2"><strong>React Router</strong> - For client-side routing</li>
    </ul>
    
    <h2 class="text-2xl font-semibold mt-8 mb-4">Modern State Management</h2>
    
    <p class="mb-4">While Redux has been the go-to state management solution for years, in 2025 we have simpler alternatives:</p>
    
    <ul class="list-disc pl-6 mb-6">
      <li class="mb-2"><strong>React Context + useReducer</strong> - For global state management</li>
      <li class="mb-2"><strong>Zustand</strong> - A lightweight state management solution</li>
      <li class="mb-2"><strong>Jotai</strong> - Atomic state management approach</li>
    </ul>
    
    <p class="mb-4">For most applications, you can start with the built-in React Context API and hooks, then introduce additional libraries as your application grows in complexity.</p>
    
    <h2 class="text-2xl font-semibold mt-8 mb-4">Styling Solutions</h2>
    
    <p class="mb-4">For styling your React applications, consider these popular options:</p>
    
    <ul class="list-disc pl-6 mb-6">
      <li class="mb-2"><strong>Tailwind CSS</strong> - Utility-first CSS framework</li>
      <li class="mb-2"><strong>CSS Modules</strong> - Scoped CSS for components</li>
      <li class="mb-2"><strong>Styled Components</strong> - CSS-in-JS solution</li>
    </ul>
    
    <h2 class="text-2xl font-semibold mt-8 mb-4">Conclusion</h2>
    
    <p class="mb-4">Setting up a modern React development environment is easier than ever in 2025. The ecosystem has matured, offering better developer experience with fewer configuration headaches.</p>
    
    <p>Start with the essentials and gradually add tools as your project requires them. Happy coding!</p>
  `,
  date: "April 2, 2025",
  author: {
    name: "Jane Cooper",
    role: "Frontend Developer",
    avatar: "https://randomuser.me/api/portraits/women/11.jpg"
  },
  tags: ["React", "JavaScript", "Frontend"],
  likes: 128,
  image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  comments: [
    {
      id: 1,
      author: "Michael Scott",
      avatar: "https://randomuser.me/api/portraits/men/41.jpg",
      date: "April 3, 2025",
      content: "Great article! I've been using Vite for my React projects and it's so much faster than CRA."
    },
    {
      id: 2,
      author: "Pam Beesly",
      avatar: "https://randomuser.me/api/portraits/women/45.jpg",
      date: "April 3, 2025",
      content: "I'm just getting started with React and this was really helpful. Do you have any recommendations for learning resources?"
    }
  ]
};

export default function BlogPost() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [blogPost, setBlogPost] = useState({...blogPostData, hasLiked: false});
  const { userRole } = useAuthExtended();
  const isVisitor = userRole === 'visitor';
  const isRecruiter = userRole === 'recruiter';
  const isInteractionDisabled = isVisitor || isRecruiter;
  
  const handleLike = () => {
    if (isInteractionDisabled) return; // Prevent like action for visitors and recruiters
    setBlogPost(prev => ({
      ...prev,
      hasLiked: !prev.hasLiked,
      likes: prev.hasLiked ? prev.likes - 1 : prev.likes + 1
    }));
  };
  
  return (
    <div className="max-w-4xl mx-auto">
      {/* Back button */}
      <Button variant="ghost" asChild className="mb-6">
        <Link to="/blog" className="flex items-center gap-2">
          <ArrowLeft className="h-4 w-4" />
          Back to all posts
        </Link>
      </Button>
      
      {/* Article header */}
      <article>
        <div className="mb-8">
          <h1 className="mb-4">{blogPost.title}</h1>
          <div className="flex items-center gap-4 mb-6">
            <div className="flex items-center gap-2">
              <Avatar>
                <AvatarImage src={blogPost.author.avatar} alt={blogPost.author.name} />
                <AvatarFallback>{blogPost.author.name.charAt(0)}</AvatarFallback>
              </Avatar>
              <div>
                <div className="font-medium">{blogPost.author.name}</div>
                <div className="text-sm text-muted-foreground">{blogPost.author.role}</div>
              </div>
            </div>
            <div className="flex items-center gap-1 text-muted-foreground">
              <Calendar className="h-4 w-4" />
              <span className="text-sm">{blogPost.date}</span>
            </div>
          </div>
          <div className="flex flex-wrap gap-2 mb-6">
            {blogPost.tags.map((tag) => (
              <Badge key={tag} variant="outline" className="bg-tech-blue text-white">
                {tag}
              </Badge>
            ))}
          </div>
          <div className="rounded-xl overflow-hidden mb-8">
            <img
              src={blogPost.image}
              alt={blogPost.title}
              className="w-full max-h-[400px] object-cover"
            />
          </div>
        </div>
        
        {/* Article content */}
        <div 
          className="prose prose-lg max-w-none mb-8"
          dangerouslySetInnerHTML={{ __html: blogPost.content }}
        />
        
        {/* Article actions - conditionally show for users who can interact */}
        {!isInteractionDisabled && (
          <div className="flex items-center gap-4 my-8">
            <Button 
              variant="outline" 
              className={`gap-2 ${blogPost.hasLiked ? 'text-red-500 border-red-500 hover:text-red-600 hover:border-red-600' : ''}`}
              onClick={handleLike}
            >
              <Heart 
                className={`h-4 w-4 ${blogPost.hasLiked ? 'fill-red-500' : ''}`} 
              />
              {blogPost.hasLiked ? 'Liked' : 'Like'} ({blogPost.likes})
            </Button>
            <Button variant="outline" className="gap-2">
              <Share2 className="h-4 w-4" />
              Share
            </Button>
          </div>
        )}
        
        {/* For visitors and recruiters - just display the likes count without interaction */}
        {isInteractionDisabled && (
          <div className="flex items-center gap-4 my-8">
            <div className="text-muted-foreground flex items-center gap-2">
              <Heart className="h-4 w-4" />
              <span>Likes: {blogPost.likes}</span>
            </div>
          </div>
        )}
        
        {/* Comments section - always visible but interaction restricted */}
        <section>
          <h3 className="text-xl font-semibold mb-6 flex items-center gap-2">
            <MessageSquare className="h-5 w-5" />
            Comments ({blogPost.comments.length})
          </h3>
          
          {/* Existing comments */}
          <div className="space-y-6 mb-8">
            {blogPost.comments.map((comment) => (
              <div key={comment.id} className="flex gap-4">
                <Avatar>
                  <AvatarImage src={comment.avatar} alt={comment.author} />
                  <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                </Avatar>
                <div className="flex-1">
                  <div className="flex items-center justify-between mb-1">
                    <div className="font-medium">{comment.author}</div>
                    <div className="text-sm text-muted-foreground">{comment.date}</div>
                  </div>
                  <p className="text-muted-foreground">{comment.content}</p>
                </div>
              </div>
            ))}
          </div>
          
          {/* Comment form - hidden for visitors and recruiters */}
          {!isInteractionDisabled && (
            <form className="space-y-4">
              <h4 className="font-medium">Leave a comment</h4>
              <div className="grid grid-cols-2 gap-4">
                <Input placeholder="Name" />
                <Input placeholder="Email" type="email" />
              </div>
              <Textarea placeholder="Your comment..." className="min-h-[100px]" />
              <Button className="bg-tech-blue hover:bg-tech-blue/90">Submit Comment</Button>
            </form>
          )}
        </section>
      </article>
    </div>
  );
}
