# BlackRoad

**Composable agent orchestration platform for autonomous operations**

Static-first Next.js 14 web portal with Tailwind typography, Contentlayer MDX docs, and observability-ready primitives.

## Domains

- **Production**: [blackroad.io](https://blackroad.io)
- **Systems**: [blackroad.systems](https://blackroad.systems)

## Quickstart

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static export to .out
pnpm start        # serve the static bundle
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
