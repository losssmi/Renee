# Overview

This is a full-stack web application built with a React frontend and Express.js backend. The application appears to be a business dashboard system with components for displaying metrics, charts, and data visualization. It uses modern web development technologies including TypeScript, Tailwind CSS, and shadcn/ui components for a polished user interface.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture
- **Framework**: React 18 with TypeScript and Vite as the build tool
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design system variables
- **State Management**: TanStack React Query for server state management
- **Routing**: Wouter for client-side routing
- **Form Handling**: React Hook Form with Zod validation via @hookform/resolvers

## Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database**: PostgreSQL with Drizzle ORM for type-safe database operations
- **Schema**: Shared TypeScript schemas between frontend and backend using Drizzle-Zod
- **Storage Pattern**: Abstract storage interface with in-memory implementation for development
- **Development**: Hot reload with tsx and Vite development server integration

## Data Layer
- **ORM**: Drizzle ORM with PostgreSQL dialect
- **Migrations**: Drizzle Kit for database schema management
- **Type Safety**: Full type safety from database to frontend using shared schemas
- **Validation**: Zod schemas for runtime validation and type inference

## Development Setup
- **Monorepo Structure**: Shared code between client and server directories
- **Build Process**: Vite for frontend, esbuild for backend bundling
- **Development Server**: Integrated Vite dev server with Express backend
- **TypeScript Configuration**: Unified tsconfig with path mapping for clean imports

## UI Component System
- **Design System**: shadcn/ui with neutral color scheme and CSS variables
- **Component Library**: Comprehensive set of accessible components (buttons, forms, dialogs, etc.)
- **Theming**: CSS custom properties for consistent styling across components
- **Responsive Design**: Mobile-first approach with Tailwind CSS breakpoints

# External Dependencies

## Database
- **Neon Database**: Serverless PostgreSQL database (@neondatabase/serverless)
- **Connection**: Uses DATABASE_URL environment variable for database connectivity

## UI Libraries
- **Radix UI**: Headless UI components for accessibility and behavior
- **Lucide React**: Icon library for consistent iconography
- **TanStack React Query**: Data fetching and caching library
- **date-fns**: Date manipulation and formatting utility

## Development Tools
- **Vite**: Frontend build tool and development server
- **esbuild**: Fast JavaScript bundler for backend
- **tsx**: TypeScript execution engine for development
- **Drizzle Kit**: Database migration and schema management tool

## Styling and Design
- **Tailwind CSS**: Utility-first CSS framework
- **class-variance-authority**: Utility for creating component variants
- **clsx**: Conditional class name utility
- **tailwind-merge**: Utility for merging Tailwind classes

## Form and Validation
- **React Hook Form**: Form state management and validation
- **Zod**: Schema validation library
- **@hookform/resolvers**: Integration between React Hook Form and Zod