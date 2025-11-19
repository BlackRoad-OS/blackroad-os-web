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

## Deployment

This repo deploys as the `web-app` service inside the Railway project **`blackroad-web`**.

- **Environments → URLs**
  - `dev`: Railway dev URL (or `https://dev.blackroad.systems` when fronted by Cloudflare)
  - `staging`: `https://staging.blackroad.systems`
  - `prod`: `https://blackroad.systems`

- **Core API endpoints**
  - `dev`: core dev Railway URL
  - `staging`: `https://staging.core.blackroad.systems`
  - `prod`: `https://core.blackroad.systems`

- **Environment variables expected**
  - `NODE_ENV` (`development` | `staging` | `production`)
  - `CORE_API_URL` / `PUBLIC_APP_URL` (server-side)
  - `NEXT_PUBLIC_CORE_API_URL` / `NEXT_PUBLIC_APP_URL` (client-exposed)

- **Commands**
  - Install: `npm install`
  - Build: `npm run build`
  - Start: `npm run start`

Deployments are automated via `.github/workflows/deploy-web.yml` and perform a post-deploy `/health` check against the environment URL.
