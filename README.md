# Willy's Academy — Web

Next.js frontend for the Willy's Academy learning platform.

## Prerequisites

- [Node.js](https://nodejs.org/) >= 20
- [pnpm](https://pnpm.io/) >= 10

## Getting Started

### 1. Install dependencies

```bash
pnpm install
```

### 2. Configure environment

```bash
cp .env.example .env
```

### 3. Start development server

```bash
pnpm dev
```

Open http://localhost:3000

## Commands

| Command | Description |
|---|---|
| `pnpm dev` | Start dev server on port 3000 |
| `pnpm build` | Build for production |
| `pnpm start` | Run production build |
| `pnpm lint` | Lint with ESLint |
| `pnpm typecheck` | TypeScript type checking |
| `pnpm format` | Format with Prettier |

## Component Architecture — Atomic Design

```
src/components/
├── atoms/          Smallest primitives (Button, Input, Label, Icon)
├── molecules/      Small combos of atoms (FormField, SearchBar)
├── organisms/      Complex sections (Header, GameBoard, CourseCard)
└── templates/      Page layouts (DashboardTemplate, AuthTemplate)
```

Pages live in `src/app/` (Next.js App Router).

## State Management

- **RTK Query** for all server state (API calls, caching)
- **Redux Toolkit slices** for complex client-only state
- Store config: `src/store/`
- API services: `src/store/api/`
