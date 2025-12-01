# Host Routing & App Routes

> Universe v2.0 — Five Doors to the Universe

This document explains how BlackRoad OS maps domains to application routes.

## Host → Route Table

| Domain                  | Route        | Description                    | TLD Type    |
| ----------------------- | ------------ | ------------------------------ | ----------- |
| `blackroad.io`          | `/`          | Marketing homepage             | Root        |
| `www.blackroad.io`      | `/`          | Marketing homepage             | Root        |
| `app.blackroad.io`      | `/workspace` | User workspace dashboard       | Subdomain   |
| `console.blackroad.io`  | `/console`   | Operator console               | Subdomain   |
| `docs.blackroad.io`     | `/docs`      | Developer Hub                  | Subdomain   |
| `lucidia.earth`         | `/lucidia`   | Lore/Education portal          | External    |

## The Five Doors

```
                    ┌─────────────────────────────────────────┐
                    │           BLACKROAD UNIVERSE            │
                    │                                         │
    blackroad.io ──►│  /             Marketing                │
                    │                                         │
app.blackroad.io ──►│  /workspace    User Workspace           │
                    │                                         │
console.blackroad.io►│  /console     Operator Console         │
                    │                                         │
docs.blackroad.io ──►│  /docs        Developer Hub            │
                    │                                         │
  lucidia.earth ───►│  /lucidia     Lore & Education         │
                    │                                         │
                    └─────────────────────────────────────────┘
```

## Implementation

Host-based routing is implemented via Next.js middleware in `middleware.ts`.

### Routing Logic

1. **Marketing (root domain)**
   - `blackroad.io` and `www.blackroad.io` serve `/` as-is
   - No rewriting needed

2. **Subdomains (blackroad.io)**
   - `app.blackroad.io/` → rewrites to `/workspace`
   - `console.blackroad.io/` → rewrites to `/console`
   - `docs.blackroad.io/` → rewrites to `/docs`
   - Deeper paths are prefixed: `app.blackroad.io/settings` → `/workspace/settings`

3. **External Domains**
   - `lucidia.earth` → rewrites to `/lucidia`
   - Full domain matching (not subdomain-based)

4. **Local Development**
   - `localhost` is **not** rewritten
   - Manually navigate to `/workspace`, `/console`, `/docs`, `/lucidia`

### File Structure

```
blackroad-os-web/
├── middleware.ts              ← Host-based routing logic
├── lib/
│   └── hosts.ts               ← Domain constants
├── app/
│   ├── page.tsx               ← Marketing (/)
│   ├── (app)/
│   │   └── workspace/         ← User workspace (/workspace)
│   ├── (console)/
│   │   └── console/           ← Operator console (/console)
│   ├── (docs)/
│   │   └── docs/              ← Developer Hub (/docs)
│   └── (lucidia)/
│       └── lucidia/           ← Lore portal (/lucidia)
```

### Key Files

- **`middleware.ts`** — Routing logic with ASCII table in comments
- **`lib/hosts.ts`** — Domain constants and helpers

## Configuration

### Environment Variables

| Variable                   | Description                          | Default                                                      |
| -------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| `NEXT_PUBLIC_OPERATOR_URL` | Base URL for Operator Engine `/chat` | `https://blackroad-os-operator-production-8d28.up.railway.app` |

### Setting the Operator URL

```bash
# .env.local
NEXT_PUBLIC_OPERATOR_URL=https://your-operator.example.com
```

## DNS Setup (Production)

### BlackRoad.io Subdomains

```
blackroad.io          A     <your-ip>
www.blackroad.io      CNAME blackroad.io
app.blackroad.io      CNAME blackroad.io
console.blackroad.io  CNAME blackroad.io
docs.blackroad.io     CNAME blackroad.io
```

### Lucidia.earth (Separate Domain)

```
lucidia.earth         A     <your-ip>
www.lucidia.earth     CNAME lucidia.earth
```

All domains point to the same Next.js deployment; middleware handles routing.

## Testing Locally

```bash
# Start dev server
pnpm dev

# Test routes manually:
http://localhost:3000/           → Marketing homepage
http://localhost:3000/workspace  → App workspace (Cece panel)
http://localhost:3000/console    → Operator console (Cece GOV)
http://localhost:3000/docs       → Developer Hub
http://localhost:3000/lucidia    → Lore & Education portal
```

### Testing with Real Hosts (Optional)

Edit `/etc/hosts`:
```
127.0.0.1 blackroad.io
127.0.0.1 app.blackroad.io
127.0.0.1 console.blackroad.io
127.0.0.1 docs.blackroad.io
127.0.0.1 lucidia.earth
```

## Related Docs

- [Universe Domains v1](./universe-domains-v1.md) — Full domain architecture
- [Layouts App v1](./layouts-app-v1.md) — App layout specifications
- [Layouts Web v1](./layouts-web-v1.md) — Marketing layout specifications
- [Universe Map v1](./universe-map-v1.md) — Master blueprint
