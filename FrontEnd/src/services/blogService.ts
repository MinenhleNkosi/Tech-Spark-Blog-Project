
// This service helps manage blog post data across different components
const STORAGE_KEY = 'blogPosts';

// Initial blog posts data
const initialBlogPosts = [
  {
    id: 1,
    title: "Getting Started with React in 2025",
    excerpt: "Learn how to set up a modern React development environment with the latest tools and best practices.",
    date: "April 2, 2025",
    author: "Jane Cooper",
    tags: ["React", "JavaScript", "Frontend"],
    likes: 128,
    isLiked: false,
    image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 2,
    title: "The Future of Web Development",
    excerpt: "Exploring upcoming technologies and trends that will shape the future of web development.",
    date: "March 28, 2025",
    author: "John Smith",
    tags: ["Web Development", "Future Tech", "Trends"],
    likes: 95,
    isLiked: false,
    image: "https://images.unsplash.com/photo-1555066931-4365d14bab8c?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 3,
    title: "Building Scalable APIs with .NET Core",
    excerpt: "A comprehensive guide to building robust and scalable APIs using .NET Core and C#.",
    date: "March 25, 2025",
    author: "Emily Johnson",
    tags: [".NET Core", "C#", "API"],
    likes: 87,
    isLiked: false,
    image: "https://images.unsplash.com/photo-1593720213428-28a5b9e94613?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 4,
    title: "SQL Server Performance Optimization Techniques",
    excerpt: "Learn how to optimize your SQL Server queries and database structure for maximum performance.",
    date: "March 20, 2025",
    author: "Michael Brown",
    tags: ["SQL Server", "Database", "Performance"],
    likes: 76,
    isLiked: false,
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 5,
    title: "Angular vs React: Which One Should You Choose in 2025?",
    excerpt: "A detailed comparison of Angular and React frameworks to help you make the right choice for your project.",
    date: "March 15, 2025",
    author: "Sarah Williams",
    tags: ["Angular", "React", "Frontend"],
    likes: 112,
    isLiked: false,
    image: "https://images.unsplash.com/photo-1617040619263-41c5a9ca7521?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  },
  {
    id: 6,
    title: "Introduction to Microservices with .NET Core",
    excerpt: "Learn the basics of microservices architecture and how to implement it using .NET Core.",
    date: "March 10, 2025",
    author: "David Clark",
    tags: [".NET Core", "Microservices", "Architecture"],
    likes: 94,
    isLiked: false,
    image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
  }
];

// Initialize the storage if it doesn't exist
const initializeStorage = () => {
  try {
    if (!sessionStorage.getItem(STORAGE_KEY)) {
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(initialBlogPosts));
    }
  } catch (error) {
    console.error("Error initializing blog storage:", error);
  }
};

// Get all blog posts
const getAllPosts = () => {
  try {
    initializeStorage();
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY) || '[]');
  } catch (error) {
    console.error("Error getting blog posts:", error);
    return initialBlogPosts;
  }
};

// Get featured posts (latest 3)
const getFeaturedPosts = () => {
  try {
    const posts = getAllPosts();
    return posts.slice(0, 3);
  } catch (error) {
    console.error("Error getting featured posts:", error);
    return initialBlogPosts.slice(0, 3);
  }
};

// Add a new post
const addPost = (post: any) => {
  try {
    const posts = getAllPosts();
    const updatedPosts = [post, ...posts];
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    
    // Notify other components about the change
    window.dispatchEvent(new Event('storage'));
    
    return true;
  } catch (error) {
    console.error("Error adding blog post:", error);
    return false;
  }
};

// Update post (e.g., for likes)
const updatePost = (postId: number, updates: any) => {
  try {
    const posts = getAllPosts();
    const updatedPosts = posts.map(post => 
      post.id === postId ? { ...post, ...updates } : post
    );
    
    sessionStorage.setItem(STORAGE_KEY, JSON.stringify(updatedPosts));
    
    // Notify other components about the change
    window.dispatchEvent(new Event('storage'));
    
    return true;
  } catch (error) {
    console.error("Error updating blog post:", error);
    return false;
  }
};

// Get a single post by ID
const getPostById = (id: number) => {
  try {
    const posts = getAllPosts();
    return posts.find(post => post.id === id);
  } catch (error) {
    console.error("Error getting blog post by ID:", error);
    return null;
  }
};

export const blogService = {
  getAllPosts,
  getFeaturedPosts,
  addPost,
  updatePost,
  getPostById,
  initializeStorage
};
