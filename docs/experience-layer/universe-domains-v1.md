# BlackRoad Universe - Domain Architecture v1

> **Experience Layer Canon**
> Last Updated: 2024-12-01
> Status: DRAFT

---

## Universe Overview

The BlackRoad domain ecosystem is organized around the **Four Floors** mental model:

```
┌─────────────────────────────────────────────────────────────────────┐
│  EXPERIENCE LAYER        Marketing, Apps, Consoles, Portals        │
│  blackroad.io, app.*, console.*, lucidia.earth                     │
├─────────────────────────────────────────────────────────────────────┤
│  ORCHESTRATION LAYER     API Gateway, Operator, Workflows          │
│  api.blackroad.io, operator.*, blackroad.systems                   │
├─────────────────────────────────────────────────────────────────────┤
│  RUNTIME LAYER           Agents, LLMs, RAG, Mesh                   │
│  agents.blackroad.io, mesh.*, blackroad.network                    │
├─────────────────────────────────────────────────────────────────────┤
│  INFRA LAYER             DNS, CDN, Databases, Compute              │
│  Cloudflare, Railway, Postgres, Redis                              │
└─────────────────────────────────────────────────────────────────────┘
```

---

## Domain Universe Table

| Domain | Role / Audience | Primary Surface | Floor |
|--------|-----------------|-----------------|-------|
| **blackroad.io** | Main company / OS front door | Marketing + product overview | Experience |
| **app.blackroad.io** | End users / workspace | Logged-in OS app | Experience |
| **console.blackroad.io** | Operators / admins | Operator console (Alexa view) | Experience |
| **studio.blackroad.io** | Creators / designers | Brand, content, campaign tools | Experience |
| **docs.blackroad.io** | Developers / documentation | API guides + tutorials | Experience |
| **status.blackroad.io** | All users / status | Uptime / incidents | Experience |
| **api.blackroad.io** | Developers / API | REST/GraphQL gateway | Orchestration |
| **blackroad.systems** | Deep technical / specs | Infra docs, operator APIs | Orchestration |
| **blackroad.network** | Community / partners | Forum, programs, dev network | Runtime |
| **mesh.blackroad.io** | Agents / devices | WebSocket mesh gateway | Runtime |
| **lucidia.earth** | Education / families | Story + kids/parents/teachers | Experience |
| **lucidia.studio** | Creative / brand | Animations, templates, brand kit | Experience |
| **aliceqi.com** | Alice/QI brand | Education/creative portal | Experience |
| **blackroadai.com** | AI-focused landing | AI capabilities showcase | Experience |
| **blackroadquantum.com** | Quantum/research | Research lab portal | Experience |

---

## Subdomain Plans

### blackroad.io (Primary Domain)

| Subdomain | Purpose | Target Audience |
|-----------|---------|-----------------|
| `www.blackroad.io` | Marketing landing | Everyone (first touch) |
| `app.blackroad.io` | User workspace | Logged-in users |
| `console.blackroad.io` | Operator console | Alexa + admins |
| `studio.blackroad.io` | Creator tools | Designers, content creators |
| `docs.blackroad.io` | Documentation | Developers |
| `api.blackroad.io` | API gateway | Developers (programmatic) |
| `status.blackroad.io` | Status page | All users |
| `blog.blackroad.io` | Blog / updates | Community |
| `support.blackroad.io` | Help center | Users needing help |
| `auth.blackroad.io` | SSO / identity | Auth flows |
| `cdn.blackroad.io` | Static assets | Internal |
| `mesh.blackroad.io` | WebSocket mesh | Agents / devices |
| `archive.blackroad.io` | Historical artifacts | Research / audit |

### lucidia.earth (Education/Lore Domain)

| Subdomain | Purpose | Target Audience |
|-----------|---------|-----------------|
| `www.lucidia.earth` | Lore/story landing | Families, educators |
| `app.lucidia.earth` | Education app | Kids, students |
| `learn.lucidia.earth` | Courses / curriculum | Teachers, parents |
| `play.lucidia.earth` | Games / interactive | Kids |
| `stories.lucidia.earth` | Narrative content | All ages |
| `api.lucidia.earth` | Lucidia API | Developers |

### blackroad.systems (Technical Domain)

| Subdomain | Purpose | Target Audience |
|-----------|---------|-----------------|
| `www.blackroad.systems` | Technical overview | Engineers |
| `operator.blackroad.systems` | Operator API docs | DevOps |
| `runtime.blackroad.systems` | Runtime specs | Platform engineers |
| `specs.blackroad.systems` | Protocol specs | Contributors |
| `infra.blackroad.systems` | Infrastructure docs | SREs |

### blackroad.network (Community Domain)

| Subdomain | Purpose | Target Audience |
|-----------|---------|-----------------|
| `www.blackroad.network` | Community home | Developers, partners |
| `forum.blackroad.network` | Discussion forum | Community |
| `partners.blackroad.network` | Partner portal | Business partners |
| `developers.blackroad.network` | Dev community | Developers |
| `showcase.blackroad.network` | Project showcase | Community |

---

## Domain Ownership & Registry

### Primary Domains (Must Own)

| Domain | Status | Registrar | Notes |
|--------|--------|-----------|-------|
| blackroad.io | ✅ Active | Cloudflare | Primary |
| lucidia.earth | ✅ Active | Cloudflare | Education |
| blackroadai.com | ✅ Active | TBD | AI brand |
| blackroadinc.us | ✅ Active | TBD | Corporate |
| blackroad.me | ✅ Active | TBD | Personal brand |
| blackroad.network | ✅ Active | TBD | Community |
| blackroad.systems | ✅ Active | TBD | Technical |

### Quantum / Research Domains

| Domain | Status | Purpose |
|--------|--------|---------|
| blackroadquantum.com | ✅ Active | Primary quantum |
| blackroadquantum.info | ✅ Active | Quantum info |
| blackroadquantum.net | ✅ Active | Quantum network |
| blackroadquantum.shop | ✅ Active | Merch redirect |
| blackroadquantum.store | ✅ Active | Merch redirect |
| blackroadqi.com | ✅ Active | QI brand |

### Lucidia Family

| Domain | Status | Purpose |
|--------|--------|---------|
| lucidia.earth | ✅ Active | Primary |
| lucidia.studio | ✅ Active | Creative hub |
| lucidiaqi.com | ✅ Active | QI crossover |
| aliceqi.com | ✅ Active | Alice character |

---

## URL Routing Philosophy

### Clean URLs
- No `.html` extensions
- Trailing slashes optional but consistent
- Lowercase only
- Hyphens for word separation

### Examples
```
blackroad.io/                     → Marketing home
blackroad.io/pricing              → Pricing page
blackroad.io/about                → About page
app.blackroad.io/                 → User workspace home
app.blackroad.io/road/my-project  → User's project
console.blackroad.io/             → Operator home
console.blackroad.io/services     → Services list
docs.blackroad.io/                → Docs home
docs.blackroad.io/api/chat        → API reference
```

---

## DNS Architecture

### Cloudflare Zones

```
blackroad.io (Zone 1)
├── @ → Vercel/Railway (marketing)
├── app → Railway (app)
├── console → Railway (console)
├── api → Railway (API gateway)
├── docs → Vercel/Cloudflare Pages
├── status → Statuspage/Instatus
├── cdn → Cloudflare R2
└── mesh → Railway (WebSocket)

lucidia.earth (Zone 2)
├── @ → Vercel (marketing)
├── app → Railway (education app)
├── learn → Vercel (courses)
└── api → Railway (Lucidia API)
```

---

## Next Steps

1. Audit current DNS records across all domains
2. Consolidate to Cloudflare for unified management
3. Set up subdomain routing for each surface
4. Configure SSL certificates
5. Implement redirect rules for legacy URLs

---

*This is the Experience Layer domain canon. Update as domains are added or consolidated.*
