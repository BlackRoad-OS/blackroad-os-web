# BlackRoad OS – Web

`blackroad-os-web` is the public-facing web experience for BlackRoad OS, styled as a retro desktop shell. It tells the story of the stack (Core, Operator, API, Prism, Web, Infra, Docs, Agents) and funnels visitors to Prism Console, Docs, or Contact.

## Getting started

Install dependencies and start the dev server:

```bash
npm install
npm run dev
```

Build and run in production mode:

```bash
npm run build
npm run start
```

The server binds to `0.0.0.0` and defaults to port `8080` (override with `PORT`).

## Environment variables

Set these to wire the navigation and calls-to-action to the right destinations:

- `NEXT_PUBLIC_PRISM_URL` — URL for Prism Console.
- `NEXT_PUBLIC_DOCS_URL` — URL for the BlackRoad docs site.
- `NEXT_PUBLIC_CONTACT_URL` — contact or waitlist destination (falls back to `mailto:blackroad.systems@gmail.com`).

## What lives here

- Next.js 14 (App Router) + React 18 + TypeScript marketing shell.
- Desktop-inspired hero + stack map describing Core, Operator, API, Prism, Web, Infra, Docs, and Agents.
- Reusable UI primitives (`Window`, `Card`, `Button`, `Tag`) and sections for hero, stack overview, use cases, roadmap, and CTA.

## Relationship to other repos

This site is the public entry point for the shared **“BlackRoad OS - Master Orchestration”** project. It mirrors the same component map used across:

- `blackroad-os-core` (identity, truth, events)
- `blackroad-os-operator` (automation runtime)
- `blackroad-os-api` (typed HTTP surface)
- `blackroad-os-prism-console` (operator console)
- `blackroad-os-infra` (deployments, runbooks)
- `blackroad-os-docs` (owner’s manual)
- Agents such as Atlas and Lucidia

## Deployment notes

- Health checks: `/health` or `/api/health`
- Production build command: `npm ci && npm run build`
- Start command: `npm run start`

