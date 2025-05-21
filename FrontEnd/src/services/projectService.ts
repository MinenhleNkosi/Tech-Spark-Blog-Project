
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

// Default project images to use when user doesn't provide one
const DEFAULT_PROJECT_IMAGES = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1531297484001-80022131f5a1",
  "https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7"
];

// Initial projects data
const initialProjects = [
  {
    id: 1,
    title: "E-Commerce Platform",
    description: "A modern e-commerce solution built with .NET Core and Angular",
    longDescription: "Developed a comprehensive e-commerce platform with user authentication, product catalog, shopping cart, payment processing, and order management. Implemented responsive design for optimal user experience across all devices.",
    image: "https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    technologies: [".NET Core", "Angular", "SQL Server", "Entity Framework", "Identity", "Stripe API"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 2,
    title: "Task Management App",
    description: "Productivity app with real-time collaboration features",
    longDescription: "Built a Kanban-style task management application that allows teams to collaborate in real-time. Features include drag-and-drop interface, task assignments, due dates, comments, and activity tracking.",
    image: "https://images.unsplash.com/photo-1595931288159-8fa10f2ec337?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    technologies: ["Angular", ".NET Core", "SignalR", "SQL Server", "Entity Framework"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 3,
    title: "Social Media Dashboard",
    description: "Analytics dashboard for social media management",
    longDescription: "Created a dashboard for social media managers to track engagement metrics across multiple platforms. Integrated with various social media APIs to provide real-time analytics and reporting.",
    image: "https://images.unsplash.com/photo-1533750349088-cd871a92f312?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    technologies: ["React", ".NET Core", "D3.js", "SQL Server", "Social Media APIs"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 4,
    title: "Weather Application",
    description: "Real-time weather forecasting app with location detection",
    longDescription: "Developed a weather application that provides current conditions and forecasts based on user location. Includes features like saved locations, weather alerts, and detailed meteorological data.",
    image: "https://images.unsplash.com/photo-1592210454359-9043f067919b?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    technologies: ["Angular", "Node.js", "Weather API", "Geolocation API", "MongoDB"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 5,
    title: "Expense Tracker",
    description: "Personal finance application for tracking expenses and budgeting",
    longDescription: "Built a personal finance tool that helps users track expenses, set budgets, and visualize spending patterns. Features include receipt scanning, categorization, and financial reports.",
    image: "https://images.unsplash.com/photo-1554768804-50c1e2b50a6e?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    technologies: [".NET Core", "React", "SQL Server", "Entity Framework", "Chart.js"],
    demoUrl: "#",
    githubUrl: "#"
  },
  {
    id: 6,
    title: "Recipe Sharing Platform",
    description: "Community-driven recipe sharing and meal planning application",
    longDescription: "Created a platform for food enthusiasts to share recipes, create meal plans, and generate shopping lists. Includes features like nutritional information, cooking times, and user reviews.",
    image: "https://images.unsplash.com/photo-1556909211-36987daf7b4d?w=800&auto=format&fit=crop&q=60&ixlib=rb-4.0.3",
    technologies: ["Angular", ".NET Core", "SQL Server", "Entity Framework", "Azure Blob Storage"],
    demoUrl: "#",
    githubUrl: "#"
  }
];

// Helper function to get a random image from our default images array
export const getRandomDefaultImage = () => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_PROJECT_IMAGES.length);
  return DEFAULT_PROJECT_IMAGES[randomIndex];
};

// Initialize projects in storage
const initializeStorage = () => {
  const storedProjects = window.sessionStorage.getItem('projects');
  if (!storedProjects) {
    window.sessionStorage.setItem('projects', JSON.stringify(initialProjects));
  }
};

// Get all projects
const getAllProjects = (): Project[] => {
  const storedProjects = window.sessionStorage.getItem('projects');
  return storedProjects ? JSON.parse(storedProjects) : [];
};

// Get featured projects for the homepage (first two)
const getFeaturedProjects = (): Project[] => {
  const projects = getAllProjects();
  return projects.slice(0, 2);
};

// Add a new project
const addProject = (project: Omit<Project, 'id'>): Project => {
  const projects = getAllProjects();
  const newId = projects.length > 0 ? Math.max(...projects.map(p => p.id)) + 1 : 1;
  
  const newProject = {
    ...project,
    id: newId
  };
  
  const updatedProjects = [newProject, ...projects];
  window.sessionStorage.setItem('projects', JSON.stringify(updatedProjects));
  
  // Emit a storage event to notify other components
  window.dispatchEvent(new Event('storage'));
  
  return newProject;
};

export const projectService = {
  initializeStorage,
  getAllProjects,
  getFeaturedProjects,
  addProject,
};
