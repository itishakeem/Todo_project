# Frontend - Claude Code Instructions

This file contains frontend-specific instructions for Claude Code.

## Frontend Architecture

- **Framework:** Next.js 16+ with App Router
- **Language:** TypeScript (strict mode enabled)
- **Styling:** Tailwind CSS
- **Directory Structure:**
  - `/app` - Next.js App Router pages and layouts
  - `/components` - Reusable React components
  - `/lib` - Utility functions and shared logic
  - `/styles` - Global styles and CSS files

## Development Rules

- All components must be TypeScript with proper typing
- Use functional components with React hooks
- Follow App Router conventions (layout.tsx, page.tsx, etc.)
- Use Tailwind utility classes for styling
- No inline styles unless absolutely necessary
- Keep components small and focused
- Extract reusable logic into `/lib` utilities

## Code Quality

- Prefer server components by default (use 'use client' only when needed)
- Implement proper error boundaries
- Follow accessibility best practices
- Use semantic HTML elements
- Implement proper loading and error states

## File Organization

- Group related components in subdirectories under `/components`
- Keep page-specific components in the same directory as the page
- Export utilities from `/lib` with clear, descriptive names
- Use index files for cleaner imports when appropriate

## API Communication

**CRITICAL RULES:**
- `/lib/api.ts` is the ONLY place for backend API calls
- NEVER use `fetch()` directly in components or pages
- All API functions are centralized in the `api` singleton instance
- JWT tokens are automatically attached via Authorization header

**Available API Functions:**
- `api.setToken(token)` - Set JWT token for authenticated requests
- `api.getTasks(params?)` - Get all tasks with optional filtering
- `api.getTask(id)` - Get single task by ID
- `api.createTask(data)` - Create new task
- `api.updateTask(id, data)` - Update existing task
- `api.deleteTask(id)` - Delete task
- `api.toggleTaskComplete(id)` - Toggle task completion status
- `api.register(data)` - Register new user
- `api.login(data)` - Login user (auto-sets token)
- `api.logout()` - Logout user (clears token)
- `api.getCurrentUser()` - Get current user info

**Environment Variables:**
- Create `.env.local` from `.env.example`
- `NEXT_PUBLIC_API_BASE_URL` - Backend API base URL (default: http://localhost:8000)

**Type Safety:**
- All API types are defined in `/lib/types.ts`
- Use proper TypeScript types for all API requests/responses
- Import types: `import type { Task, CreateTaskRequest } from '@/lib/types'`

## Testing & Build

- All code must pass TypeScript compilation
- Run `npm run build` to verify production readiness
- Fix all linting errors before committing
