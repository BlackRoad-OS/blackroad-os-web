# BlackRoad

**Composable agent orchestration platform for autonomous operations**

Static-first Next.js 14 web portal with Tailwind typography, Contentlayer MDX docs, and observability-ready primitives.

## Domains

- **Production**: [blackroad.io](https://blackroad.io)
- **Systems**: [blackroad.systems](https://blackroad.systems)

This is the primary **marketing + status + login shell** for BlackRoad OS, providing:
- A simple landing page for BlackRoad OS
- A status / health UI for service monitoring
- Basic shell/layout for future Prism Console, Login, etc.

## Quickstart

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static export to .out
pnpm start        # serve the static bundle
```

## Standard Endpoints

### Health Check
- **Route:** `GET /api/health` or `GET /health`
- **Purpose:** Simple JSON health signal
- **Response:**
```json
{
  "ok": true,
  "service": "blackroad-os-web",
  "timestamp": "<ISO-8601>",
  ...additional observability fields
}
```

### Version Info
- **Route:** `GET /api/version` or `GET /version`
- **Purpose:** Report build/version info
- **Response:**
```json
{
  "service": "blackroad-os-web",
  "version": "0.1.0",
  "commit": "UNKNOWN",
  "env": "local",
  ...additional fields
}
```

### Readiness Check
- **Route:** `GET /api/ready`
- **Purpose:** Returns readiness status (basic check, no external network calls)
- **Response:**
```json
{
  "ready": true,
  "timestamp": "<ISO-8601>"
}
```

## Pages

### Landing Page – `/`
Minimal, tasteful landing page with:
- BlackRoad OS name and tagline
- Navigation to Status and Docs
- Simple header, main content, and footer

### Status Page – `/status`
Simple status overview showing:
- Web service status (from `/api/health`)
- API status (mock/stub for now)
- Operator status (mock/stub for now)

## Infrastructure Reference

For the full infrastructure blueprint—including hardware layout, Cloudflare setup, Tailscale mesh, deployment pipeline, and operational runbooks—see [INFRASTRUCTURE.md](./INFRASTRUCTURE.md).

## Environment Variables

```bash
# BlackRoad OS standard variables
BR_OS_ENV=local              # Environment: local, staging, prod
BR_OS_WEB_VERSION=0.1.0      # Service version
BR_OS_WEB_COMMIT=UNKNOWN     # Git commit SHA

# Other supported variables (see .env.example)
SITE_URL=https://blackroad.os
PLAUSIBLE_DOMAIN=analytics.example.com
```

## Tests

```bash
pnpm test         # run Vitest + Playwright tests
pnpm typecheck    # run TypeScript type checking
pnpm lint         # run ESLint
pnpm format       # check code formatting
```

## Docker

```bash
docker build -t blackroad/web:0.1.0 .
docker run -e PORT=3000 -p 3000:3000 blackroad/web:0.1.0
```

## Environment Configuration

Copy `.env.example` to `.env.local` and configure:

```bash
SITE_URL=https://blackroad.io
PLAUSIBLE_DOMAIN=analytics.blackroad.io
```

## Documentation

See [CLAUDE.md](./CLAUDE.md) for comprehensive AI assistant guidance and development workflows.
