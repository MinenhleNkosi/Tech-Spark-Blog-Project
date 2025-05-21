
// Sample data for demonstration
export const weeklyData = [
  { name: "Mon", blogViews: 240, userEngagement: 140, projectViews: 320 },
  { name: "Tue", blogViews: 300, userEngagement: 180, projectViews: 280 },
  { name: "Wed", blogViews: 280, userEngagement: 200, projectViews: 250 },
  { name: "Thu", blogViews: 320, userEngagement: 230, projectViews: 310 },
  { name: "Fri", blogViews: 350, userEngagement: 280, projectViews: 340 },
  { name: "Sat", blogViews: 400, userEngagement: 300, projectViews: 380 },
  { name: "Sun", blogViews: 380, userEngagement: 250, projectViews: 360 },
];

export const monthlyData = [
  { name: "Jan", blogViews: 400, userEngagement: 240, projectViews: 520 },
  { name: "Feb", blogViews: 300, userEngagement: 138, projectViews: 420 },
  { name: "Mar", blogViews: 520, userEngagement: 280, projectViews: 550 },
  { name: "Apr", blogViews: 480, userEngagement: 305, projectViews: 500 },
  { name: "May", blogViews: 400, userEngagement: 240, projectViews: 449 },
  { name: "Jun", blogViews: 380, userEngagement: 250, projectViews: 410 },
];

export const yearlyData = [
  { name: "2020", blogViews: 3000, userEngagement: 1800, projectViews: 3500 },
  { name: "2021", blogViews: 3800, userEngagement: 2400, projectViews: 4200 },
  { name: "2022", blogViews: 4200, userEngagement: 2800, projectViews: 4800 },
  { name: "2023", blogViews: 5000, userEngagement: 3200, projectViews: 5600 },
  { name: "2024", blogViews: 5800, userEngagement: 3800, projectViews: 6200 },
];

export const userTypeData = [
  { name: "Normal Users", value: 65, color: "#8884d8" },
  { name: "Visitors", value: 35, color: "#82ca9d" },
];

export const engagementData = [
  { name: "Blog Posts", value: 45, color: "#8884d8" },
  { name: "Projects", value: 35, color: "#82ca9d" },
  { name: "Comments", value: 20, color: "#ffc658" },
];

// Chart configuration
export const chartConfig = {
  blogViews: {
    label: "Blog Views",
    color: "#8884d8"
  },
  projectViews: {
    label: "Project Views",
    color: "#82ca9d"
  },
  userEngagement: {
    label: "User Engagement",
    color: "#8884d8"
  }
};

export const topContentData = [
  {
    title: "The Future of AI in Tech",
    type: "Blog Post",
    views: 2452,
    engagement: 845,
    publishDate: "2024-04-28"
  },
  {
    title: "React State Management",
    type: "Blog Post",
    views: 1983,
    engagement: 756,
    publishDate: "2024-05-03"
  },
  {
    title: "E-Commerce Platform",
    type: "Project",
    views: 1876,
    engagement: 542,
    publishDate: "2024-04-15"
  },
  {
    title: "TypeScript Best Practices",
    type: "Blog Post",
    views: 1654,
    engagement: 487,
    publishDate: "2024-05-10"
  },
  {
    title: "Portfolio Website",
    type: "Project",
    views: 1543,
    engagement: 423,
    publishDate: "2024-04-22"
  }
];

export const getMetricsByTimeframe = (timeframe: string) => {
  switch (timeframe) {
    case "weekly":
      return {
        blogViews: { value: "2,270", change: "+12% from last week" },
        userEngagement: { value: "1,580", change: "+8% from last week" },
        normalUsers: { value: "342", change: "+18% from last week" },
        visitors: { value: "573", change: "+5% from last week" }
      };
    case "monthly":
      return {
        blogViews: { value: "12,480", change: "+8% from last month" },
        userEngagement: { value: "7,453", change: "+5% from last month" },
        normalUsers: { value: "1,258", change: "+12% from last month" },
        visitors: { value: "2,345", change: "+3% from last month" }
      };
    case "yearly":
      return {
        blogViews: { value: "124,580", change: "+35% from last year" },
        userEngagement: { value: "85,342", change: "+28% from last year" },
        normalUsers: { value: "15,678", change: "+42% from last year" },
        visitors: { value: "28,453", change: "+15% from last year" }
      };
    default:
      return {
        blogViews: { value: "0", change: "0%" },
        userEngagement: { value: "0", change: "0%" },
        normalUsers: { value: "0", change: "0%" },
        visitors: { value: "0", change: "0%" }
      };
  }
};

export const getTimeframeData = (timeframe: string) => {
  switch(timeframe) {
    case "weekly":
      return weeklyData;
    case "monthly":
      return monthlyData;
    case "yearly":
      return yearlyData;
    default:
      return weeklyData;
  }
};
