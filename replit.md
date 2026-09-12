# HireLoop

HireLoop is a modern job marketplace that helps seekers find meaningful work and helps teams discover strong candidates.

## Run & Operate

- `pnpm --filter @workspace/api-server run dev` — run the API server (port 5000)
- `pnpm run typecheck` — full typecheck across all packages
- `pnpm run build` — typecheck + build all packages
- `pnpm --filter @workspace/api-spec run codegen` — regenerate API hooks and Zod schemas from the OpenAPI spec
- `pnpm --filter @workspace/db run push` — push DB schema changes (dev only)
- Required env: `DATABASE_URL` — Postgres connection string

## Stack

- pnpm workspaces, Node.js 24, TypeScript 5.9
- API: Express 5
- DB: PostgreSQL + Drizzle ORM
- Validation: Zod (`zod/v4`), `drizzle-zod`
- API codegen: Orval (from OpenAPI spec)
- Build: esbuild (CJS bundle)
- Web: React + Vite, Wouter, Tailwind CSS, Recharts, Lucide React

## Where things live

- `artifacts/hireloop/src/App.tsx` — public marketplace, role-based demo workspaces, routing, and UI state
- `artifacts/hireloop/src/index.css` — HireLoop visual tokens and global styling
- `artifacts/api-server/src/lib/demo-data.ts` — development dataset for jobs, companies, platform stats, and dashboards
- `artifacts/api-server/src/routes/` — REST handlers mounted at `/api`
- `lib/api-spec/openapi.yaml` — source of truth for generated API hooks and schemas

## Architecture decisions

- API contracts are defined in OpenAPI first and generated into the shared React client and Zod package.
- The first build uses a validated demo data service so the marketplace and dashboards are usable before persistence/auth integrations are connected.
- Public routes and role-based dashboard routes share one application shell; dashboard role switching is intentionally framed as demo access until Clerk is configured.
- The frontend keeps graceful fallback states aligned to the API response shapes so a transient API outage does not blank the main product surface.

## Product

- Public home page with platform stats and featured roles
- Searchable and filterable job discovery with job details
- Approved company directory and seeker/recruiter pricing
- Seeker, recruiter, and admin dashboard surfaces with charts, pipelines, settings, billing, and moderation views
- Responsive navigation, mobile drawer, loading/error/empty states, save/apply demo interactions

## User preferences

The user asked for a premium, modern SaaS-style job hunting platform called HireLoop with responsive layouts, accessible interactions, and restrained motion.

## Gotchas

- Run `pnpm --filter @workspace/api-spec run codegen` after changing `lib/api-spec/openapi.yaml`.
- Restart both `artifacts/api-server: API Server` and `artifacts/hireloop: web` after contract or runtime changes.
- Clerk is not configured in this project yet; do not replace the demo dashboard access with a local auth implementation.

## Pointers

- See the `pnpm-workspace` skill for workspace structure, TypeScript setup, and package details
