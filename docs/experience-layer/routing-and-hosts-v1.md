# Host Routing & App Routes

> Universe v1.5 — Subdomain to Route Mapping

This document explains how BlackRoad OS maps subdomains to application routes.

## Host → Route Table

| Domain                  | Route        | Description                    |
| ----------------------- | ------------ | ------------------------------ |
| `blackroad.io`          | `/`          | Marketing homepage             |
| `www.blackroad.io`      | `/`          | Marketing homepage (redirect)  |
| `app.blackroad.io`      | `/workspace` | User workspace dashboard       |
| `console.blackroad.io`  | `/console`   | Operator console               |
| `docs.blackroad.io`     | `/docs`      | Documentation portal           |

## Implementation

Host-based routing is implemented via Next.js middleware in `middleware.ts`.

### How It Works

1. **Marketing (root domain)**
   - `blackroad.io` and `www.blackroad.io` serve `/` as-is
   - No rewriting needed

2. **App Subdomains**
   - `app.blackroad.io/` → rewrites to `/workspace`
   - `app.blackroad.io/settings` → rewrites to `/workspace/settings`
   - All paths under the subdomain are prefixed with the target route

3. **Console Subdomain**
   - `console.blackroad.io/` → rewrites to `/console`
   - Same path-prefixing behavior as app subdomain

4. **Local Development**
   - `localhost` is **not** rewritten
   - You can manually navigate to `/workspace`, `/console`, etc.
   - This makes local testing straightforward

### Middleware Location

```
blackroad-os-web/
├── middleware.ts          ← Host-based routing
├── lib/
│   └── hosts.ts           ← Domain constants
```

### Key Files

- **`middleware.ts`** — The actual routing logic
- **`lib/hosts.ts`** — Constants for domain names

## Configuration

### Environment Variables

| Variable                   | Description                          | Default                                                      |
| -------------------------- | ------------------------------------ | ------------------------------------------------------------ |
| `NEXT_PUBLIC_OPERATOR_URL` | Base URL for Operator Engine `/chat` | `https://blackroad-os-operator-production-8d28.up.railway.app` |

### Setting the Operator URL

In production, you may want to point to a different Operator instance:

```bash
# .env.local
NEXT_PUBLIC_OPERATOR_URL=https://your-operator.example.com
```

## DNS Setup (Production)

For production, configure your DNS provider with:

```
blackroad.io          A     <your-ip>
www.blackroad.io      CNAME blackroad.io
app.blackroad.io      CNAME blackroad.io
console.blackroad.io  CNAME blackroad.io
docs.blackroad.io     CNAME blackroad.io
```

All subdomains point to the same deployment; the middleware handles routing.

## Testing Locally

```bash
# Start dev server
pnpm dev

# Test routes manually:
# http://localhost:3000/           → Marketing homepage
# http://localhost:3000/workspace  → App workspace
# http://localhost:3000/console    → Operator console
```

To test actual subdomain routing locally, you can:
1. Edit `/etc/hosts` to point subdomains to `127.0.0.1`
2. Use a tool like `dnsmasq` for wildcard local DNS

## Related Docs

- [Universe Domains v1](./universe-domains-v1.md) — Full domain architecture
- [Layouts App v1](./layouts-app-v1.md) — App layout specifications
- [Layouts Web v1](./layouts-web-v1.md) — Marketing layout specifications
