# Prompt Gap Analysis

This repository currently contains only a partial monorepo scaffold and an incomplete `packages/db` package.

## 1) Monorepo & Root Configuration

- `apps/` directory is missing entirely, so both required apps are absent:
  - `apps/web` (TanStack Start)
  - `apps/api` (NestJS)
- `packages/types` package is missing entirely.
- Root `package.json` is not aligned with requirements:
  - workspace uses only `packages/*` and does not include `apps/*`
  - dependency uses `turborepo` package name instead of `turbo`
  - required scripts for DB tasks are not wired at root
  - package name is still `inventory-management`, not the requested monorepo naming pattern
- `pnpm-workspace.yaml` includes an `apps:` key (invalid for pnpm workspace spec) and should only define `packages:` globs.
- `turbo.json` uses old `pipeline` format, but prompt expects `tasks` schema and specific outputs.
- Root `.env.example` is missing.
- Root `README.md` with setup instructions is missing.

## 2) Shared Package: `packages/db`

- Package name is `@brondai/db`, but prompt requires `@my-app/db`.
- `drizzle.config.ts` is missing.
- `tsconfig.json` inside the package is missing.
- Schema implementation is incorrect/incomplete versus prompt:
  - wrong import path (`drizzle-orm/schema` instead of `drizzle-orm/pg-core`)
  - references undefined `prisma` helpers (`prisma.raw`, `prisma.fn`) which are not Drizzle APIs
  - `users` columns do not match required fields (`name`, `email`, `passwordHash`, `emailVerified`, `createdAt`, `updatedAt`)
  - `sessions` shape does not match required fields (`id uuid`, `token unique`, `expiresAt`, etc.)
  - foreign key behavior does not explicitly enforce `onDelete: 'cascade'`
- Exported inferred types (`User`, `NewUser`, `Session`) are missing.
- `db:generate` and `db:migrate` scripts exist but likely unusable without drizzle config and valid schema.
- `createDb` currently uses `postgres-js`; this is acceptable only if the rest of stack and dependencies are completed consistently.

## 3) Shared Package: `packages/types`

Entire package is missing. Required items not implemented:

- `RegisterSchema`, `LoginSchema`, `AuthResponseSchema`
- `RegisterDto`, `LoginDto`, `AuthResponse` inferred types
- package-level `package.json` and `tsconfig.json`
- export entrypoint (`src/index.ts`)

## 4) Backend App: `apps/api` (NestJS)

Entire backend app is missing. Required modules/files not present:

- `src/auth/*` (module, controller, service, jwt strategy, guard)
- `src/users/*` (module, service)
- `src/db/*` (global db module/service)
- `src/app.module.ts`, `src/main.ts`

Required backend behavior not implemented at all:

- register/login/me endpoints
- password hashing with `bcryptjs`
- JWT cookie auth (`access_token`, httpOnly)
- JWT config from env vars
- CORS with credentials for web origin
- global ValidationPipe
- `cookie-parser` usage
- class-validator DTO boundaries

Also missing API dependencies listed in prompt.

## 5) Frontend App: `apps/web` (TanStack Start)

Entire frontend app is missing. Required files/components/routes not present:

- route tree and auth/dashboard routes
- `app/lib/api.ts` ky client with `credentials: 'include'`
- `app/lib/auth.ts`
- `LoginForm` / `RegisterForm`
- shadcn/ui setup and Tailwind v4 integration

Required behavior not implemented:

- zod-form validation using shared schemas
- login/register flows and redirect logic
- protected dashboard flow via `/auth/me`

## 6) TypeScript & Workspace Alignment

- Root path aliases point to placeholder `@brondai/*` paths and not workspace packages.
- Per-package/per-app strict `tsconfig.json` files are missing (except root base config).
- Workspace alias contract (`@my-app/db`, `@my-app/types`) not configured.

## 7) Priority Order to Complete

1. Fix root workspace/tooling files (`package.json`, `pnpm-workspace.yaml`, `turbo.json`, `.env.example`).
2. Rebuild `packages/db` with valid Drizzle schema, types, and `drizzle.config.ts`.
3. Create `packages/types` with shared zod schemas and DTO types.
4. Scaffold `apps/api` NestJS app and wire auth flow + DB integration.
5. Scaffold `apps/web` TanStack Start app and wire auth UX + typed API client.
6. Add root `README.md` and run end-to-end checks (`pnpm install`, build/lint/typecheck, db scripts).
