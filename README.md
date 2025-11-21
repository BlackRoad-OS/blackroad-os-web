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

This application is configured for deployment on [Railway](https://railway.app) using Nixpacks.

### Configuration Files
- `railway.json` - Railway service configuration (healthcheck, restart policy)
- `nixpacks.toml` - Build configuration for Nixpacks builder
- `Dockerfile` - Alternative Docker-based deployment (optional)

### Deployment Steps

1. **Connect Repository**: Link your GitHub repository to Railway
2. **Configure Environment Variables**: Set all variables from `.env.example` in the Railway dashboard:
   - `NODE_ENV` - Set to `production`
   - `OS_ROOT` - Your BlackRoad OS root URL
   - `SERVICE_BASE_URL` - Public URL for this web service
   - `CORE_API_URL` - Core API base URL
   - `PUBLIC_WEB_URL` - Public web URL
   - `PUBLIC_CONSOLE_URL` - Console link
   - `PUBLIC_DOCS_URL` - Documentation link
   - `NEXT_PUBLIC_OS_ROOT` - Client-exposed OS root
   - `NEXT_PUBLIC_SERVICE_ID` - Service identifier (e.g., `web`)
   - `NEXT_PUBLIC_SERVICE_NAME` - Human-readable service name
   - `NEXT_PUBLIC_CONSOLE_URL` - Console link (client-side)
   - `NEXT_PUBLIC_DOCS_URL` - Documentation link (client-side)
   - `NEXT_PUBLIC_CORE_API_URL` - Core API base URL (client-side)
   - `NEXT_PUBLIC_PUBLIC_API_URL` - Public API base URL (client-side)

3. **Deploy**: Railway will automatically:
   - Detect Node.js and use Nixpacks builder
   - Install dependencies with `npm ci`
   - Build the application with `npm run build`
   - Start the server with `npm start`
   - Monitor health via `/api/health` endpoint

### Technical Details
- **Port**: Automatically assigned by Railway via `$PORT` environment variable
- **Healthcheck**: `/api/health` (checks every 100 seconds)
- **Restart Policy**: ON_FAILURE with max 10 retries
- **Builder**: Nixpacks (Node.js 18)

### Troubleshooting

**Build fails with "Missing required environment variable"**:
- Ensure all required environment variables are set in Railway dashboard before deployment
- The application requires environment variables during build time for Next.js

**Health check fails**:
- Verify the application is binding to `0.0.0.0` (not just `localhost`)
- Check that `PORT` environment variable is being used correctly
- Review logs for any startup errors

## Notes
- `/health` is also available and shares the `/api/health` handler.
- Status widget on the landing page polls `/api/health` every 15 seconds.
