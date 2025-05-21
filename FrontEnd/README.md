[![Git](https://img.shields.io/badge/Git-F05032?logo=git&logoColor=fff)](#)
[![GitHub](https://img.shields.io/badge/GitHub-%23121011.svg?logo=github&logoColor=white)](#)
[![Gmail](https://img.shields.io/badge/Gmail-D14836?logo=gmail&logoColor=white)](#)
[![LinkedIn](https://custom-icon-badges.demolab.com/badge/LinkedIn-0A66C2?logo=linkedin-white&logoColor=fff)](#)
[![YAML](https://img.shields.io/badge/YAML-CB171E?logo=yaml&logoColor=fff)](#)
[![TypeScript](https://img.shields.io/badge/TypeScript-3178C6?logo=typescript&logoColor=fff)](#)
[![JSON](https://img.shields.io/badge/JSON-000?logo=json&logoColor=fff)](#)
[![JavaScript](https://img.shields.io/badge/JavaScript-F7DF1E?logo=javascript&logoColor=000)](#)
[![HTML](https://img.shields.io/badge/HTML-%23E34F26.svg?logo=html5&logoColor=white)](#)
[![CSS](https://img.shields.io/badge/CSS-1572B6?logo=css3&logoColor=fff)](#)
[![npm](https://img.shields.io/badge/npm-CB3837?logo=npm&logoColor=fff)](#)
[![Vite](https://img.shields.io/badge/Vite-646CFF?logo=vite&logoColor=fff)](#)
[![shadcn/ui](https://img.shields.io/badge/shadcn%2Fui-000?logo=shadcnui&logoColor=fff)](#)
[![React Router](https://img.shields.io/badge/React_Router-CA4245?logo=react-router&logoColor=white)](#)
[![React](https://img.shields.io/badge/React-%2320232a.svg?logo=react&logoColor=%2361DAFB)](#)
[![React Query](https://img.shields.io/badge/React%20Query-FF4154?logo=reactquery&logoColor=fff)](#)
[![Figma](https://img.shields.io/badge/Figma-F24E1E?logo=figma&logoColor=white)](#)

# TechSpark [The FrontEnd]

<a>Flow Diagram<br /><img src="https://app.eraser.io/workspace/Mh6RNld4rNvXQJmTbcJR/preview?elements=94nmqKAcqkqcBDpTrIrLGw&type=embed" /></a>

## 1. Initial Requirements 📱
**Functional Requirements:**
* User authentication system with role-based access (`Normal User`, `Visitor`, `Admin`, `Recruiter`)
* **Blog** system with ability to *create*, *view*, and *like* posts
* **Project** showcase with filtering capabilities
* **Contact** form for user inquiries
* **Admin dashboard** with analytics and insights
* **Portfolio section** for personal achievements and professional information
* **Social media** integration

**Non-Functional Requirements:**
* Responsive design for all device sizes
* Modern, clean UI with animations for improved user experience
* Fast page load times
* Secure authentication system
* Intuitive navigation and user flow

## ✨ Features

- **Role-based Authentication**
  - **Admin**: Full access to all features including analytics and content creation
  - **Normal** User: Access to projects, blog posts, and contact features
  - **Visitor**: Limited access to public content

- **Project Showcase**
  - Browse tech projects with filtering capabilities
  - View project details including technologies used
  - Admin can create and manage projects

- **Blog System**
  - Read blog posts about tech topics
  - Admin can create and publish new content
  - Interaction features for authenticated users

- **Portfolio Section**
  - Professional profile information
  - Achievements, certifications, and awards
  - CV upload and download functionality

- **Admin Insights**
  - Analytics dashboard with charts and metrics
  - User engagement statistics
  - Content performance tracking

- **Contact System**
  - Contact form for inquiries
  - Social media connections
  - Professional networking options

## 2. Tech Stack 🚀
### Core Technologies
* **TypeScript**: Strongly-typed programming language that builds on `JavaScript` for better development experience and error prevention.
* **React**: Frontend library for building user interfaces with a component-based architecture
* **Vite**: Build tool that provides faster development server and optimized builds

### UI/UX & Styling
* **Tailwind CSS**: Utility-first CSS framework for rapid UI development
* **Shadcn UI**: Component library built on Radix UI primitives
* **Framer Motion**: Animation library for React applications
* **Lord Icon**: Animated icon library

### State Management & Data Handling
* **React Router**: Navigation and routing solution
* **React Query**: Data fetching, caching, and state management
* **Local Storage**: Client-side data persistence for demonstration purposes

### Tools & Utilities
* **npm/yarn**: Package management
* **Git**: Version control
* **Sonner**: Toast notification system
* **Recharts**: Chart library for data visualization

## 3. Architecture Overview 🤝
### Components
* **Authentication System**: Handles user login, registration, and role selection
* **Layout Components**: Sidebar, navigation, and page structure
* **Feature Components**: Blog, projects, portfolio, and contact modules
* **Admin Components**: Dashboard with insights and analytics
* **UI Components**: Reusable UI elements built with Shadcn UI

### Data Flow
* Client-side rendering with React components
* Local storage for data persistence (simulating a backend)
* React contexts for state management across components
* React Query for data fetching and caching

### Routing
* **Public routes**: Home, Blog, Projects, Contact
* **Protected routes**: Admin insights, User portfolio
* Role-based access control through AuthContext

## 4. User Roles 👥

### Admin
- Access to all features
- Can create, edit, and delete content
- View analytics and insights
- Navigate to admin-only pages

### Normal User
- Browse projects and blog posts
- Contact via the contact form
- View limited portfolio information
- Cannot access admin features or create content

### Visitor
- Limited access to public content
- Cannot access restricted areas
- Prompted to register or login for fuller experience

### Visitor
- Limited access to public content
- Cannot access restricted areas except having access to Admin's portfolio
- Prompted to register or login for fuller experience
- Can contact Admin

## 5. UI/UX Features 🎨

- Responsive design for all screen sizes
- Smooth animations and transitions
- Accessible components following best practices
- Dark/light mode support
- Toast notifications for user feedback

## 6. Project Structure 🏗️

```
techspark/
├── public/              # Static assets
├── src/
│   ├── components/      # Reusable UI components
│   │   ├── ui/          # Shadcn UI components
│   │   ├── blog/        # Blog-related components
│   │   ├── portfolio/   # Portfolio components
│   │   ├── projects/    # Project components
│   │   └── insights/    # Admin insights components
│   ├── contexts/        # React contexts
│   ├── hooks/           # Custom React hooks
│   ├── lib/             # Utility functions
│   ├── pages/           # Page components
│   └── services/        # API and data services
├── index.html           # Entry HTML file
├── tailwind.config.ts   # Tailwind CSS configuration
└── vite.config.ts       # Vite configuration
```

## 7. Getting Started 🚀

### Prerequisites

- Node.js (v18.0.0 or later)
- npm or yarn package manager

### Installation

1. Clone the repository:
   ```bash
   git clone <repository-url>
   cd techspark
   ```

2. Install dependencies:
   ```bash
   npm install
   # or
   yarn install
   ```

3. Start the development server:
   ```bash
   npm run dev
   # or
   yarn dev
   ```

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.
