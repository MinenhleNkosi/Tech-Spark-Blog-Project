
// Initial data (would typically come from an API/database)

export const initialProfileData = {
  name: "John Doe",
  jobTitle: "Full Stack Developer",
  city: "San Francisco, CA",
  summary: "Experienced software engineer with expertise in React, TypeScript, and Node.js. Passionate about creating user-friendly interfaces and scalable backend systems.",
  profileImage: "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=300&h=300",
  githubUrl: "https://github.com",
  linkedinUrl: "https://linkedin.com",
  cvUrl: null // Added CV URL property
};

export const initialCertifications = [
  {
    id: "cert-1",
    title: "AWS Certified Solutions Architect",
    issuer: "Amazon Web Services",
    date: "2024-01-15",
    imageUrl: "https://images.unsplash.com/photo-1500673922987-e212871fec22?auto=format&fit=crop&w=800&q=80",
    certUrl: "https://aws.amazon.com/certification/"
  }
];

export const initialBadges = [
  {
    id: "badge-1",
    title: "React Developer Expert",
    issuer: "React Community",
    date: "2023-11-10",
    imageUrl: "https://images.unsplash.com/photo-1581092795360-fd1ca04f0952?auto=format&fit=crop&w=800&q=80",
    badgeUrl: "https://reactjs.org"
  }
];

export const initialAwards = [
  {
    id: "award-1",
    title: "Outstanding Engineering Award",
    date: "2024-03-20",
    description: "Recognized for contributions to improving application performance by 40%",
    skills: "Performance Optimization, React, TypeScript"
  }
];
