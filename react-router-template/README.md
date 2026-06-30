# React Router Template

A starter template for web applications with authentication, routing, and state management pre-configured.

## Tech Stack

| Category | Library | Version |
|---|---|---|
| UI Framework | React | 19 |
| Build Tool | Vite | 8 |
| Language | TypeScript | 6 |
| Routing | React Router | 8 |
| State Management | Zustand | 5 |
| Data Fetching | TanStack Query | 5 |
| HTTP Client | Axios | 1 |
| Authentication | Keycloak JS | 26 |
| Styling | Tailwind CSS | 4 |
| Component Library | shadcn/ui + Base UI | — |
| Toast | Sonner | 2 |
| Env Validation | Zod | — |
| Formatter | Prettier | 3 |
| Linter | ESLint | 10 |

## Project Structure

```
src/
├── config/
│   └── env.config.ts          # Env var parsing and Zod validation
├── core/
│   ├── layouts/               # Layout components (Navbar, Sidebar)
│   │   ├── navbar/
│   │   ├── sidebar/
│   │   └── index.tsx          # Root layout wrapper
│   ├── middlewares/
│   │   └── auth.middleware.ts # Keycloak auth guard for routes
│   ├── providers/
│   │   ├── QueryProvider.tsx  # TanStack Query setup
│   │   ├── ThemeProvider.tsx  # Dark/Light mode
│   │   └── index.tsx          # Combines all providers
│   ├── router/
│   │   ├── routes.ts          # Route definitions (lazy-loaded)
│   │   └── index.tsx          # Router instance
│   └── stores/
│       └── auth.store.ts      # Zustand store for user session
├── features/
│   └── demo/
│       └── route.ts           # Example feature routes
├── pages/
│   ├── demo/DemoPage.tsx
│   ├── ErrorPage.tsx
│   ├── LoginErrorPage.tsx
│   ├── NotFoundPage.tsx
│   └── RootRedirectPage.tsx
├── shared/
│   ├── components/
│   │   ├── common/            # Shared UI components
│   │   └── ui/                # shadcn/ui components
│   ├── hooks/                 # Custom hooks
│   ├── lib/                   # queryClient, utils
│   ├── service/api/           # apiClient, endpoints, keycloak
│   ├── stores/                # Shared Zustand stores
│   ├── types/                 # TypeScript types
│   └── utils/                 # Utility functions
└── styles/
    └── index.css              # Global styles + Tailwind
```

## Getting Started

### 1. Install dependencies

```bash
npm install
```

### 2. Configure environment variables

Create a `.env.local` file at the project root:

```env
# API
VITE_API_BASE_URL=https://your-api.example.com

# Keycloak
VITE_KEYCLOAK_URL=https://your-keycloak.example.com
VITE_KEYCLOAK_REALM=your-realm
VITE_KEYCLOAK_CLIENT_ID=your-client-id
```

> All env vars are validated by Zod on startup. If any required variable is missing, the app will throw an error with a clear message before rendering.

### 3. Start the dev server

```bash
npm run dev
```

### 4. Build for production

```bash
npm run build
```

## Authentication Flow

This template uses **Keycloak** for SSO authentication:

1. When a user navigates to a protected route, `authMiddleware` runs
2. The middleware calls `initKeycloak()` to verify the session
3. If authenticated → user data is fetched from the API and stored in `useAuthStore`
4. If not authenticated → redirects to `/login-error`

### Enable Auth Middleware

In [src/core/router/routes.ts](src/core/router/routes.ts), uncomment these lines:

```ts
// import { authMiddleware } from '../middlewares/auth.middleware';
// middleware: [authMiddleware],
```

### Auth State Hooks

```ts
import { useUser, useIsAuthenticated, useUserRoles } from '@/core/stores/auth.store';

const user = useUser();                      // AuthUser | null
const isAuthenticated = useIsAuthenticated(); // boolean
const roles = useUserRoles();                // string[]
```

## Adding a New Feature

1. Create a new folder at `src/features/<feature-name>/`
2. Add a `route.ts` file defining the feature's routes
3. Import and spread it into `src/core/router/routes.ts`

Example from [src/features/demo/route.ts](src/features/demo/route.ts):

```ts
import type { RouteObject } from 'react-router';

export const demoRoutes: RouteObject[] = [
  {
    path: '/demo',
    lazy: async () => {
      const { default: Component } = await import('@/pages/demo/DemoPage');
      return { Component };
    },
  },
];
```

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start dev server with HMR |
| `npm run build` | Type check + build for production |
| `npm run preview` | Preview the production build locally |
| `npm run lint` | Run ESLint |
