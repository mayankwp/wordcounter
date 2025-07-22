# Word Counter Application

## Overview

This is a modern web application built as a Premium Tool Dashboard for Creative Content Creators and Content Agencies. The application provides a sophisticated word counter tool with both basic and advanced features, designed with a clean, professional interface that resembles a native desktop application.

## User Preferences

Preferred communication style: Simple, everyday language.

## System Architecture

The application follows a full-stack architecture with clear separation between client and server:

- **Frontend**: React-based SPA with TypeScript
- **Backend**: Express.js server with TypeScript
- **Database**: PostgreSQL with Drizzle ORM (configured but using in-memory storage currently)
- **Styling**: Tailwind CSS with shadcn/ui components
- **Build System**: Vite for frontend, esbuild for backend

## Key Components

### Frontend Architecture
- **Framework**: React 18 with TypeScript
- **Routing**: Wouter for client-side routing
- **State Management**: TanStack Query for server state, React hooks for local state
- **UI Library**: shadcn/ui components built on Radix UI primitives
- **Styling**: Tailwind CSS with custom design tokens for sand/warm color scheme
- **Theme System**: Custom dark/light mode implementation with localStorage persistence

### Backend Architecture
- **Framework**: Express.js with TypeScript
- **Database ORM**: Drizzle ORM configured for PostgreSQL
- **Storage**: Currently using in-memory storage with interface for easy database migration
- **Development**: Hot reloading with Vite integration
- **Build**: ESM modules with esbuild bundling

### Core Features
- **Word Counter Tool**: Real-time text analysis with comprehensive statistics (19 different metrics)
- **Advanced Analytics**: Extended statistics including unique words, sentence analysis, reading/speaking/writing time calculations, syllable counting, and more
- **Dual Modes**: Basic mode (minimal interface) and Advanced mode (full statistics sidebar)
- **Customizable Statistics**: Users can toggle any of the 19 statistics on/off through the options panel
- **Smart Tooltips**: Help icons with detailed explanations for complex metrics (Publisher words, Reading level, etc.)
- **Options System**: Comprehensive settings with tabbed interface (General, Statistics, Keyword Density, Activity, Buttons)
- **Auto-save**: Local storage persistence with activity tracking
- **Responsive Design**: Mobile-first approach with adaptive layouts

## Data Flow

1. **Text Input**: User types in the main textarea component
2. **Real-time Analysis**: Custom hooks process text and calculate statistics
3. **State Management**: React hooks manage UI state, TanStack Query handles server state
4. **Auto-save**: Text is automatically saved to localStorage after 1 second of inactivity
5. **Theme Persistence**: Theme preference stored in localStorage and applied to document root

## External Dependencies

### UI Components
- **Radix UI**: Comprehensive set of unstyled, accessible components
- **Lucide React**: Icon library for consistent iconography
- **Class Variance Authority**: Type-safe CSS class management
- **Tailwind Merge**: Intelligent CSS class merging

### Development Tools
- **Vite**: Fast build tool with HMR
- **TypeScript**: Type safety across the entire application
- **ESBuild**: Fast JavaScript bundler for production builds

### Database & ORM
- **Drizzle ORM**: Type-safe database toolkit
- **@neondatabase/serverless**: PostgreSQL driver for serverless environments
- **Drizzle-Zod**: Schema validation integration

## Deployment Strategy

### Development
- Frontend: Vite dev server with HMR
- Backend: tsx for TypeScript execution with nodemon-like behavior
- Database: In-memory storage for rapid prototyping

### Production
- Frontend: Static assets built with Vite, served by Express
- Backend: Compiled to ESM with esbuild, runs on Node.js
- Database: PostgreSQL with connection pooling via environment variables

### Key Configuration Files
- `vite.config.ts`: Frontend build configuration with path aliases
- `drizzle.config.ts`: Database migration and schema configuration
- `tsconfig.json`: TypeScript configuration with path mapping
- `tailwind.config.ts`: Styling configuration with custom design tokens

The application is designed for easy deployment to platforms like Replit, with development-specific features (cartographer, runtime error overlay) that are conditionally loaded based on environment.