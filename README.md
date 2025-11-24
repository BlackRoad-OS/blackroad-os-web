# BlackRoad OS · Public Web Portal

Static-first Next.js 14 portal with Tailwind typography, Contentlayer MDX docs, and Plausible hooks.

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
pnpm test
```

## Docker

```bash
docker build -t blackroad/web:0.0.1 .
docker run -e PORT=3000 -p 3000:3000 blackroad/web:0.0.1
```
