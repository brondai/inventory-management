# My App Monorepo

Full-stack monorepo using Turborepo + pnpm workspaces:

- `apps/web`: TanStack Start frontend (port `3000`)
- `apps/api`: NestJS REST API (port `3001`)
- `packages/db`: Drizzle ORM schema + DB factory
- `packages/types`: shared Zod schemas + inferred types

## Prerequisites

- Node.js 20+
- pnpm 9+
- PostgreSQL running locally

## Setup

1. Install dependencies:

```bash
pnpm install
```

2. Copy env file:

```bash
cp .env.example .env
```

3. Update `DATABASE_URL` and `JWT_SECRET` in `.env`.

4. Generate and run migrations:

```bash
pnpm db:generate
pnpm db:migrate
```

## Run in development

```bash
pnpm dev
```

- Web: http://localhost:3000
- API: http://localhost:3001

## Scripts

- `pnpm build` – build all workspaces through turbo
- `pnpm lint` – type/lint checks through turbo
- `pnpm db:generate` – generate Drizzle migration files
- `pnpm db:migrate` – apply migrations
