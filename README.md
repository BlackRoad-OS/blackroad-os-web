# BlackRoad OS — Web Client

Public marketing + landing experience for BlackRoad OS. Built with Next.js (App Router) and wired for Railway deployments.

## Framework & Routes
- **Framework:** Next.js 14 App Router (`app/layout.tsx`, `app/page.tsx`).
- **Primary pages:**
  - `/` — homepage with environment badges, OS branding hooks, and CTAs to console/docs.
  - `/console` — placeholder console surface.
  - `/settings` — placeholder settings surface.
- **APIs:**
  - `GET /api/health` (and `/health`) → `{ status: "ok", service: "web" }`.
  - `GET /version` → returns service, app version, commit, build time, and environment.

## Configuration
All runtime links are centralized in `src/config.ts` and validated per environment.

Required variables:
```
NODE_ENV=development|staging|production
CORE_API_URL=...
NEXT_PUBLIC_CORE_API_URL=...
PUBLIC_WEB_URL=...
PUBLIC_CONSOLE_URL=...
PUBLIC_DOCS_URL=...
NEXT_PUBLIC_CONSOLE_URL=...
NEXT_PUBLIC_DOCS_URL=...
```
See [`.env.example`](.env.example) for a filled-out template. `NEXT_PUBLIC_*` values are exposed to the client and power navigation CTAs.

## Local Development
```bash
npm install
npm run dev
```
Set the environment variables above (e.g., via `.env.local`) so console/docs/health links point to your desired endpoints while you develop.

## Deployment
- **Railway:** `railway.json` defines the `web` service with build/start commands and `/api/health` healthcheck.
- **CI:** `.github/workflows/web-deploy.yaml` builds, deploys to Railway for `dev/staging/main`, and verifies `/api/health` on the deployed URL.

Base commands:
- Install: `npm install`
- Build: `npm run build`
- Start: `npm run start`

Adjust the console/docs URLs via the environment variables above to point at live console and docs instances.
