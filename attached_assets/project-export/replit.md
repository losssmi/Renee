# Overview

This is a full-stack web application built with React and Express.js featuring a 30-day challenge platform called "Renegade OS". The application uses modern web development technologies including TypeScript, Tailwind CSS, and shadcn/ui components for the frontend, with Express.js serving both API endpoints and static assets. The backend is configured to use PostgreSQL with Drizzle ORM for database operations, though it currently implements in-memory storage as a placeholder.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript using Vite as the build tool
- **Styling**: Tailwind CSS with shadcn/ui component library for consistent, accessible UI components
- **Routing**: Wouter for client-side routing with a simple switch-based route structure
- **State Management**: TanStack Query (React Query) for server state management and API data fetching
- **UI Components**: Comprehensive shadcn/ui component system including buttons, cards, forms, dialogs, and navigation elements

## Backend Architecture
- **Server Framework**: Express.js with TypeScript for API endpoints and static file serving
- **Development Setup**: Custom Vite integration for hot module replacement and development middleware
- **API Design**: RESTful API structure with `/api` prefix for all backend routes
- **Error Handling**: Centralized error handling middleware with proper HTTP status codes
- **Logging**: Custom request/response logging for API endpoints with performance timing

## Data Storage Solutions
- **Database**: PostgreSQL configured through Drizzle ORM
- **Schema Management**: Drizzle Kit for database migrations and schema definition
- **Current Implementation**: In-memory storage (`MemStorage` class) as development placeholder
- **User Management**: Basic user schema with username/password fields and auto-incrementing IDs

## Authentication and Authorization
- **Session Management**: Express sessions with PostgreSQL session store (`connect-pg-simple`)
- **Security**: Prepared for cookie-based authentication with secure session handling
- **User Schema**: Zod validation schemas for user input validation and type safety

## External Dependencies
- **Database Provider**: Neon Database serverless PostgreSQL (@neondatabase/serverless)
- **UI Framework**: Radix UI primitives for accessible, unstyled components
- **Form Handling**: React Hook Form with Hookform resolvers for form validation
- **Date Management**: date-fns for date formatting and manipulation
- **Development Tools**: TSX for TypeScript execution, ESBuild for production builds
- **Replit Integration**: Specialized Vite plugins for Replit development environment