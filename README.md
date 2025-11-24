# BlackRoad OS · Public Web Portal

Static-first Next.js 14 portal with Tailwind typography, Contentlayer MDX docs, and Plausible hooks.

## Quickstart

```bash
pnpm install
pnpm dev          # http://localhost:3000
pnpm build        # static export to .out
pnpm start        # serve the static bundle
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
