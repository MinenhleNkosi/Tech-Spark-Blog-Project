
// Default blog post images to use when user doesn't provide one
export const DEFAULT_BLOG_IMAGES = [
  "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b",
  "https://images.unsplash.com/photo-1518770660439-4636190af475",
  "https://images.unsplash.com/photo-1461749280684-dccba630e2f6",
  "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d",
  "https://images.unsplash.com/photo-1581091226825-a6a2a5aee158"
];

// Helper function to get a random image from our default images array
export const getRandomDefaultImage = () => {
  const randomIndex = Math.floor(Math.random() * DEFAULT_BLOG_IMAGES.length);
  return DEFAULT_BLOG_IMAGES[randomIndex];
};
