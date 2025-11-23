# BlackRoad OS – Web

Public-facing marketing site for BlackRoad OS, the AI-first operating system that lets one human orchestrator direct 10,000+ virtual employees across regulated domains.

## What this repo is
- Marketing and storytelling surface for BlackRoad OS (not the Prism admin console or API).
- Built with Next.js 14 (App Router) and React 18 using TypeScript.
- Includes pages for product, pricing, regulated industries, about, contact, and legal stubs.

## Getting started
1. Install dependencies and run the dev server:
   ```bash
   npm install
   npm run dev
   ```
   Visit [http://localhost:3000](http://localhost:3000).

2. Build and start in production mode:
   ```bash
   npm run build
   npm run start
   ```
   Default port is **8080** (configurable via `PORT`). The server binds to `0.0.0.0`.

## Configuration
Key environment variables (see `.env.example`):
- `NEXT_PUBLIC_DOCS_URL` — destination for “Docs” links.
- `NEXT_PUBLIC_CONSOLE_URL` — console link used on legacy routes.
- `NEXT_PUBLIC_CORE_API_URL` and `NEXT_PUBLIC_PUBLIC_API_URL` — surfaced in telemetry widgets.
- `SERVICE_BASE_URL`, `OS_ROOT`, and other `PUBLIC_*` keys — used by runtime config and health endpoints.

## Deployment (Railway)
- Build: `npm ci && npm run build`
- Start: `npm run start` (respects `$PORT`, defaults to 8080)
- Health: `/health` or `/api/health`

## Repository structure
- `/app` — Next.js routes (marketing pages, legacy console/status routes, API handlers)
- `/src/components` — shared UI (layout, marketing blocks, status widgets)
- `/src/lib` — helpers such as navigation routes
- `/docs/site-structure.md` — notes on pages and navigation

## Future enhancements
- Add richer SEO/OpenGraph metadata per page.
- Wire the contact form to a backend and add analytics.
- Expand localization and accessibility coverage.
