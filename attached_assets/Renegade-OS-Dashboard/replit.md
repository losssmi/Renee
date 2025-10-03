# Overview

This is a full-stack web application built with a React frontend and Express backend, designed for a real estate performance dashboard called "Renegade". The application provides agents with insights into their sales performance, listings, marketing activities, and personal wellness tracking. It uses a modern TypeScript stack with Vite for the frontend build tooling and includes a comprehensive UI component library based on shadcn/ui (Radix UI primitives with Tailwind CSS styling).

The application follows a monorepo structure with shared code between client and server, and is configured to use PostgreSQL with Drizzle ORM for database operations, though it currently includes an in-memory storage implementation as well.

# User Preferences

Preferred communication style: Simple, everyday language.

# System Architecture

## Frontend Architecture

**Technology Stack**: React 18 with TypeScript, Vite as the build tool and development server.

**Routing**: Uses `wouter` for lightweight client-side routing. The application is a single-page application (SPA) with route definitions in `client/src/App.tsx`.

**State Management**: React Query (`@tanstack/react-query`) for server state management with custom query client configuration. Queries are configured with infinite stale time and disabled automatic refetching to provide manual control over data freshness.

**UI Component Library**: Comprehensive component system built on Radix UI primitives with custom styling. Uses shadcn/ui pattern (components in `client/src/components/ui/`). All components follow the "New York" style variant as configured in `components.json`.

**Styling**: Tailwind CSS with custom CSS variables for theming. Configuration includes custom color palette (neutral, primary, accent colors) and design tokens. PostCSS with autoprefixer for browser compatibility.

**Form Handling**: React Hook Form with Zod validation via `@hookform/resolvers`.

**Path Aliases**: Configured TypeScript path aliases for clean imports:
- `@/` → `client/src/`
- `@shared/` → `shared/`
- `@assets/` → `attached_assets/`

## Backend Architecture

**Technology Stack**: Express.js with TypeScript, using ESM (ES Modules) instead of CommonJS.

**Server Structure**: 
- Main entry point: `server/index.ts`
- Route registration: `server/routes.ts` (currently minimal, expects API routes to be prefixed with `/api`)
- Storage abstraction: `server/storage.ts` with interface-based design allowing multiple implementations

**Development Setup**: Custom Vite integration in development mode for HMR (Hot Module Replacement) and seamless frontend-backend integration. Production builds serve static files from `dist/public`.

**Logging**: Custom logging middleware that tracks request duration and captures JSON responses for API routes. Logs are truncated to 80 characters for readability.

**Error Handling**: Centralized error handling middleware that normalizes error responses with status codes and messages.

## Data Storage Solutions

**ORM**: Drizzle ORM configured for PostgreSQL dialect with migrations stored in `./migrations`.

**Database Schema** (defined in `shared/schema.ts`):
- Users table with UUID primary keys (generated via `gen_random_uuid()`)
- Zod schema validation integrated via `drizzle-zod` for type-safe inserts
- Schema exports both TypeScript types and Zod validators for runtime validation

**Current Implementation**: In-memory storage (`MemStorage` class) used for development/demo purposes. Implements `IStorage` interface with methods for user CRUD operations. This allows easy swapping to database-backed storage later.

**Database Connection**: Configured to use Neon serverless Postgres (`@neondatabase/serverless`) with connection URL from environment variables.

## Authentication and Authorization

**Current State**: Basic user schema exists but no authentication implementation yet. The schema includes username/password fields suggesting future session-based or JWT authentication.

**Planned Architecture** (based on dependencies):
- Session storage via `connect-pg-simple` for PostgreSQL-backed sessions
- User storage interface already defined in storage abstraction layer

## External Dependencies

**UI Framework**: Radix UI - Complete set of accessible, unstyled UI primitives including:
- Dialog, Dropdown, Popover, Tooltip components
- Form elements (Checkbox, Radio, Select, Slider, Switch)
- Navigation components (Tabs, Accordion, Navigation Menu)
- Feedback components (Toast, Alert, Progress)

**Database**: 
- PostgreSQL (via Neon serverless driver)
- Drizzle ORM for type-safe database queries
- Drizzle Kit for migrations

**Development Tools**:
- Replit-specific plugins for error overlays, dev banners, and source maps
- tsx for TypeScript execution in Node.js
- esbuild for server-side bundling in production

**Utilities**:
- clsx and class-variance-authority for conditional CSS classes
- tailwind-merge for merging Tailwind classes
- date-fns for date formatting and manipulation
- cmdk for command palette functionality
- nanoid for unique ID generation
- Embla Carousel for carousel components

**Fonts**: Google Fonts integration with Plus Jakarta Sans, Architects Daughter, DM Sans, Fira Code, and Geist Mono.