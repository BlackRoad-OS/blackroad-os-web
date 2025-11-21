# BlackRoad OS – Web

Public-facing website and entrypoint for the BlackRoad Operating System. Built with Next.js (App Router) and React.

## Tech Stack
- Next.js 14 (App Router)
- React 18
- TypeScript

## Key Endpoints
- `/` — marketing landing page with system links and live health widget
- `/api/health` — service health probe
- `/api/info` — service metadata and base URLs
- `/api/version` — build and version metadata
- `/api/debug-env` — safe environment snapshot for diagnostics

## Configuration
Runtime configuration is centralized in `src/config/serviceConfig.ts` and `src/config.ts`.

Environment variables (see `.env.example`):
- `OS_ROOT` — BlackRoad OS root URL
- `SERVICE_BASE_URL` — Public base URL for this web service
- `NEXT_PUBLIC_OS_ROOT` — Client-exposed OS root
- `NEXT_PUBLIC_SERVICE_ID` — Service identifier (`web`)
- `NEXT_PUBLIC_SERVICE_NAME` — Human-readable service name
- `NEXT_PUBLIC_CONSOLE_URL` — Console link
- `NEXT_PUBLIC_DOCS_URL` — Documentation link
- `NEXT_PUBLIC_CORE_API_URL` — Core API base URL
- `NEXT_PUBLIC_PUBLIC_API_URL` — Public API base URL

## Local Development
```bash
npm install
npm run dev
```

## Build & Start
```bash
npm run build
npm start
```
Default port is **8080** (configurable via `PORT`).

## Railway Deployment
- Port: `8080`
- Healthcheck: `/api/health`
- Build command: `npm install && npm run build`
- Start command: `npm start`
- Required env vars: see `.env.example`

## Notes
- `/health` is also available and shares the `/api/health` handler.
- Status widget on the landing page polls `/api/health` every 15 seconds.
