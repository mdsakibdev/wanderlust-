<!-- BEGIN:nextjs-agent-rules -->

## This is NOT the Next.js you know

This version has breaking changes — APIs, conventions, and file structure may all differ from your training data. Read the relevant guide in `node_modules/next/dist/docs/` (resolved from this file's directory; in monorepos the `next` package may not be visible from the repo root) before writing any code. Heed deprecation notices.

This block is written and re-added by `next dev` — verify at `node_modules/next/dist/server/lib/generate-agent-files.js`. Removing it from a diff only re-creates the uncommitted change; committing it with your work keeps the tree clean.

<!-- END:nextjs-agent-rules -->

# Wanderlast

Early-stage Next.js travel app. The only route is a mostly empty `src/app/page.tsx`; nearly all code so far is shadcn UI scaffolding, so don't assume an architecture that isn't there yet.

## Commands

- npm is the package manager (`package-lock.json`; no pnpm/yarn/bun lockfiles).
- `npm run dev`, `npm run build`, `npm run lint` (ESLint 9 flat config via `eslint.config.mjs`).
- There is no test or typecheck script — for types run `npx tsc --noEmit`.

## Toolchain (differs from defaults)

- Next 16.4.3 with `cacheComponents: true`, `partialPrefetching: true`, and React Compiler (`reactCompiler: true` + `babel-plugin-react-compiler` in `next.config.ts`). These change caching/fetching semantics — check `node_modules/next/dist/docs/` before assuming stock Next behavior.
- Tailwind v4 is wired **only** through Turbopack (`@tailwindcss/turbopack` loader rule in `next.config.ts`). There is no `tailwind.config.*` or `postcss.config.*`; styling is CSS-first in `src/app/globals.css` (`@import "tailwindcss"`, `@theme inline`). Do not add a PostCSS or Tailwind config file.
- Route components use Next-generated typed prop globals, e.g. `LayoutProps<"/">` in `src/app/layout.tsx` (types emitted to `.next/types`, included by `tsconfig.json`). Don't replace them with hand-written prop types.

## UI components (shadcn "base-nova" style)

- `src/components/ui/*` wraps **Base UI** primitives (`@base-ui/react`), not Radix. Don't hand-copy the classic Radix-based shadcn components from memory or the web — they won't match this repo.
- Add/refresh components with `npx shadcn add <name>` (config in `components.json`, aliases under `@/components`, `@/lib`, `@/hooks`).
- `cn` comes from the npm package `cn`, re-exported by `src/lib/utils.ts`; UI files import `{ cn } from "cn"`. Don't add clsx/tailwind-merge.
- `globals.css` also imports `shadcn/tailwind.css` (theme from the `shadcn` package); design tokens are CSS variables.

## Layout

- App Router under `src/app`; path alias `@/*` → `./src/*`.
- `src/components/ui` (shadcn primitives), `src/hooks`, `src/lib`. Image assets live in `public/` (e.g. `public/destinations/`, `public/image/`).
