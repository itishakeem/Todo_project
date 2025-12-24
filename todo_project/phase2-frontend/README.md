# Todo Frontend

A modern, clean frontend scaffold built with Next.js 16+, TypeScript, and Tailwind CSS.

## Tech Stack

- **Framework:** Next.js 16.0.10
- **Language:** TypeScript 5
- **Styling:** Tailwind CSS 3.4
- **Runtime:** React 19

## Project Structure

```
frontend/
├── app/              # Next.js App Router
│   ├── layout.tsx   # Root layout component
│   └── page.tsx     # Homepage
├── components/       # Reusable React components
├── lib/             # Utility functions and shared logic
│   ├── api.ts       # Centralized API client (ONLY place for backend calls)
│   ├── types.ts     # TypeScript type definitions
│   ├── config.ts    # Configuration and environment variables
│   └── API_USAGE.md # API client usage guide
├── styles/          # Global styles
│   └── globals.css  # Tailwind directives and global CSS
├── CLAUDE.md        # Frontend-specific Claude Code instructions
├── .env.example     # Environment variables template
└── package.json     # Dependencies and scripts
```

## Getting Started

### 1. Install Dependencies

```bash
npm install
```

### 2. Configure Environment

Copy the example environment file and configure your backend API URL:

```bash
cp .env.example .env.local
```

Edit `.env.local`:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:8000
```

### 3. Start Development Server

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

### Build for Production

```bash
npm run build
```

### Start Production Server

```bash
npm start
```

## Available Scripts

- `npm run dev` - Start development server with hot-reload
- `npm run build` - Create optimized production build
- `npm start` - Start production server
- `npm run lint` - Run ESLint to check code quality

## Features

- ✅ Next.js 16+ with App Router
- ✅ TypeScript with strict mode
- ✅ Tailwind CSS configured
- ✅ Dark mode support (system preference)
- ✅ Optimized production builds
- ✅ ESLint configured
- ✅ Centralized API client with JWT support
- ✅ Type-safe API communication
- ✅ Environment-based configuration

## API Communication

The frontend includes a fully-configured API client ready for backend integration:

### Key Files

- **[lib/api.ts](lib/api.ts)** - Centralized API client (ONLY place for backend calls)
- **[lib/types.ts](lib/types.ts)** - TypeScript type definitions for API models
- **[lib/config.ts](lib/config.ts)** - Environment configuration
- **[lib/API_USAGE.md](lib/API_USAGE.md)** - Comprehensive usage guide with examples

### Quick Example

```typescript
import { api } from '@/lib/api';

// Login and automatically set JWT token
const response = await api.login({ email, password });

// All subsequent calls include JWT token
const tasks = await api.getTasks();
const newTask = await api.createTask({
  description: 'My new task',
  priority: 'high'
});
```

### Available API Functions

- **Authentication:** `register`, `login`, `logout`, `getCurrentUser`
- **Tasks:** `getTasks`, `getTask`, `createTask`, `updateTask`, `deleteTask`, `toggleTaskComplete`
- **Token Management:** `setToken`, `getToken`

See [lib/API_USAGE.md](lib/API_USAGE.md) for complete documentation and examples.

## Development Guidelines

See [CLAUDE.md](./CLAUDE.md) for detailed development guidelines and best practices.

## Next Steps

The frontend is now ready for:
- ✅ Backend API integration (API client configured)
- ⏳ UI component development
- ⏳ Authentication flow implementation
- ⏳ Task management features
