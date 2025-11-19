# BlackRoad OS — Web Client

## Short Description

The modern browser-native interface for BlackRoad OS.

## Long Description

The Web Client provides the user-facing interface for BlackRoad OS. Built for deterministic, minimal JS environments, it integrates Pocket OS, communicates with Core and API, and renders the user’s desktop environment with your signature aesthetic.

## Structured Table

| Field          | Value                           |
| -------------- | ------------------------------- |
| **Purpose**    | Frontend UI, Pocket OS frontend |
| **Depends On** | API Gateway                     |
| **Used By**    | End users, Core, Prism          |
| **Owner**      | Alexa + Cece                    |
| **Status**     | Active — user-facing alpha      |

## App Layout

- **Framework:** Next.js 14 with the App Router
- **Entrypoint:** `app/layout.tsx` and `app/page.tsx`
- **Shared UI:** `src/components/` (layout primitives, info cards)
- **Core utilities:** `src/config.ts` for env handling and `src/lib/` for API + telemetry hooks
- **Health check:** `GET /health` returns a JSON heartbeat with the current environment

## Local Development

```bash
npm install
npm run dev
```

Environment variables must be set before running locally. See [`.env.example`](.env.example).

## Deployment & Environments

This repository contains the BlackRoad OS web UI. It deploys to the Railway project **`blackroad-web`** as the `web-app` service.

- **Environment → URL**
  - `dev`: Railway dev URL (or `https://dev.blackroad.systems`)
  - `staging`: `https://staging.blackroad.systems`
  - `prod`: `https://blackroad.systems`

- **Required environment variables**
  - `NODE_ENV`
  - `CORE_API_URL`
  - `PUBLIC_APP_URL`
  - `NEXT_PUBLIC_CORE_API_URL`
  - `NEXT_PUBLIC_APP_URL`

- **Commands**
  - Install: `npm install`
  - Build: `npm run build`
  - Start: `npm run start`

Deployment automation lives in `.github/workflows/deploy-web.yml` and performs post-deploy health checks against the environment URL.
