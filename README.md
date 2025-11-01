## Nuxt Saas Boilerplate — Nuxt 4 Starter (Multi-Org, Auth, Drizzle)

A concise, production-ready Nuxt 4 boilerplate for SaaS/internal apps that need authentication, multi-organization tenancy, MySQL with Drizzle ORM, email templates, and local file uploads. Opinionated, minimal, and reusable.

## Key Features

-   Nuxt 4 + Nitro (SSR/ISR) with Nuxt UI v4 components
-   Better Auth (email/password, 2FA, admin, organizations) and global auth middleware
-   Drizzle ORM (MySQL) with typed schema and drizzle-kit migrations
-   Request validation using h3-zod
-   Email rendering with Vue Email; Resend provider included (SMTP stub present)
-   Local file uploads via `nuxt-file-storage`
-   TypeScript (strict) and ESLint configured

## Tech Stack

-   Nuxt 4, Nitro, Vite
-   Nuxt UI v4, @vueuse/nuxt
-   Better Auth (+ plugins: twoFactor, admin, organization)
-   Drizzle ORM + drizzle-kit (MySQL, mysql2)
-   h3-zod, Vue Email, Resend API

## Project Layout (short)

```
app/                # UI (pages, components, layouts)
modules/            # Modules: auth/, email/
server/             # API (Nitro), database schema, utils, tasks
shared/             # Shared types & enums
public/storage/     # File uploads (mounted by nuxt-file-storage)
```

Modules of note:

-   `modules/auth` → exposes `/api/auth/**`, `useAuth()` composable, global middleware
-   `modules/email` → `sendEmail()` util with `resend|smtp` providers

## Requirements

-   Node.js 20+ and pnpm 10+
-   MySQL 8+ (or compatible) and a working DSN

## Quick Start

1. Install dependencies

```bash
pnpm install
```

2. Copy environment file

```bash
cp .env.example .env
```

3. Push database schema (Drizzle)

```bash
pnpm db:push
```

4. Start development server

```bash
pnpm dev
```

Open http://localhost:3000

## Minimum Environment Variables

-   `DATABASE_URL` — MySQL DSN (e.g. `mysql://user:pass@host:3306/dbname`)
-   `NUXT_SITE_URL` — public site URL (default: `http://localhost:3000`)
-   `APP_SIGNUP_ENABLED` — `true|false` to enable signups

Email (Resend default):

-   `MAIL_PROVIDER=resend`
-   `MAIL_RESEND_KEY=<key>`
-   `MAIL_FROM="Acme <no-reply@acme.test>"`

SMTP (optional, stub):

-   `MAIL_PROVIDER=smtp`, `MAIL_SMTP_HOST`, `MAIL_SMTP_PORT`, `MAIL_SMTP_USERNAME`, `MAIL_SMTP_PASSWORD`, `MAIL_SMTP_SECURE=true|false`

## Database & Drizzle

-   Schema: `server/database/schema/*` (auth, core, relations)
-   Migrate: `pnpm db:push`
-   Studio: `pnpm db:studio`
-   Regenerate auth schema (when upgrading Better Auth): `pnpm auth:db`

## Auth & Multi-Organization

-   Auth endpoints are available under `/api/auth/**` (handled by Better Auth module)
-   Use `useAuth()` composable to access session, organizations, and `setActiveOrganization()`
-   Global middleware redirects guests to sign-in or to organization creation when none exists
-   In production, email verification is enabled by default (see `modules/auth/runtime/server/utils/auth.ts`)

## Email

-   Example template: `server/emails/WelcomeMail.vue`
-   Use `sendEmail({ to, subject, html })` — default provider: Resend
-   SMTP provider is scaffolded but not implemented (stub)

## Uploads & Storage

-   Upload endpoint: `POST /api/upload` with body `{ files: File[] }`
-   Returns public URLs under `/storage/...`
-   Storage folder: `public/storage` (configured via `fileStorage.mount`)

## API & Tenancy Conventions

-   Always derive `organizationId` from session server-side (`useAuthSession(event)`) — never trust client-provided org IDs
-   Use `useValidatedBody` / `useValidatedQuery` (h3-zod) for input validation
-   Drizzle queries must filter by organization: `eq(tables.<table>.organizationId, orgId)`
-   Use `ulid()` for new IDs, set `updatedAt` on updates, and return rows with `.returning()` for mutations

## Important Scripts

From `package.json`:

```jsonc
{
	"build": "nuxt build",
	"dev": "nuxt dev",
	"preview": "nuxt preview",
	"typecheck": "nuxt typecheck",
	"lint": "eslint .",
	"lint:fix": "eslint . --fix",
	"db:push": "drizzle-kit push",
	"db:studio": "drizzle-kit studio",
	"auth:db": "npx @better-auth/cli@latest generate ..."
}
```

## Deploy

-   Build

```bash
pnpm build
```

-   Preview locally

```bash
pnpm preview
```

-   PM2 (cluster) — use `ecosystem.config.cjs` after build

```bash
pm2 start ecosystem.config.cjs
```

Nitro server entry: `./.output/server/index.mjs`

## UI Patterns

-   Pages: fetch with `useFetch('/api/<resource>')`
-   Forms: submit with `$fetch` and handle errors via `handleError(error, form)`
-   Use Nuxt UI v4 components and minimal custom CSS (`app/assets/css/main.css`)

## Notes

-   Nitro Tasks are enabled (experimental) — see `server/tasks/*` for examples
-   UI copy is English; repository language should remain English for public publishing
-   Enforce tenancy server-side; never leak tenant data

---

Fork this repository to reuse the boilerplate. Adjust schemas and modules under `server/` and `app/`, then publish to GitHub. Happy building! ✨
