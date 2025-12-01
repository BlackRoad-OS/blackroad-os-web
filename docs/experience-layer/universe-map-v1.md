# BlackRoad Universe Map v1

> **The Complete Experience Layer Blueprint**
> Last Updated: 2024-12-01
> Status: DRAFT

---

## High-Level Universe Diagram

```
                              🌌 BLACKROAD UNIVERSE 🌌

    ┌─────────────────────────────────────────────────────────────────────┐
    │                                                                     │
    │                         PUBLIC DOORS                                │
    │                                                                     │
    │   ┌─────────────┐   ┌─────────────┐   ┌─────────────┐             │
    │   │ blackroad.io│   │lucidia.earth│   │blackroad.   │             │
    │   │  (Marketing)│   │ (Education) │   │  systems    │             │
    │   └──────┬──────┘   └──────┬──────┘   └──────┬──────┘             │
    │          │                 │                  │                    │
    │          ▼                 ▼                  ▼                    │
    │   ┌─────────────────────────────────────────────────────────┐     │
    │   │                   EXPERIENCE LAYER                       │     │
    │   │                                                          │     │
    │   │  ┌─────────────┐  ┌─────────────┐  ┌─────────────┐     │     │
    │   │  │app.blackroad│  │console.black│  │docs.blackroad│     │     │
    │   │  │    .io      │  │   road.io   │  │    .io       │     │     │
    │   │  │ (User App)  │  │ (Operator)  │  │   (Docs)     │     │     │
    │   │  └──────┬──────┘  └──────┬──────┘  └──────────────┘     │     │
    │   │         │                │                               │     │
    │   │         └────────┬───────┘                               │     │
    │   └──────────────────┼───────────────────────────────────────┘     │
    │                      │                                              │
    │                      ▼                                              │
    │   ┌─────────────────────────────────────────────────────────┐     │
    │   │                 ORCHESTRATION LAYER                      │     │
    │   │                                                          │     │
    │   │  ┌─────────────────────────────────────────────────────┐│     │
    │   │  │              api.blackroad.io                       ││     │
    │   │  │              (API Gateway)                          ││     │
    │   │  └──────────────────────┬──────────────────────────────┘│     │
    │   │                         │                                │     │
    │   │  ┌──────────────────────┴──────────────────────────────┐│     │
    │   │  │         blackroad-os-operator                       ││     │
    │   │  │         (Operator Engine)                           ││     │
    │   │  │         POST /chat → Hero Flow #1/#2                ││     │
    │   │  └──────────────────────┬──────────────────────────────┘│     │
    │   └──────────────────────────┼───────────────────────────────┘     │
    │                              │                                      │
    │                              ▼                                      │
    │   ┌─────────────────────────────────────────────────────────┐     │
    │   │                   RUNTIME LAYER                          │     │
    │   │                                                          │     │
    │   │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │     │
    │   │  │ GPT-OSS    │  │  RAG API   │  │   Mesh     │        │     │
    │   │  │ Model      │  │ (Future)   │  │ (Future)   │        │     │
    │   │  │ (Ollama)   │  │            │  │            │        │     │
    │   │  └────────────┘  └────────────┘  └────────────┘        │     │
    │   │                                                          │     │
    │   │  ┌──────────────────────────────────────────────┐       │     │
    │   │  │              blackroad.network               │       │     │
    │   │  │           (Community / Partners)             │       │     │
    │   │  └──────────────────────────────────────────────┘       │     │
    │   └──────────────────────────────────────────────────────────┘     │
    │                              │                                      │
    │                              ▼                                      │
    │   ┌─────────────────────────────────────────────────────────┐     │
    │   │                 INFRASTRUCTURE LAYER                     │     │
    │   │                                                          │     │
    │   │  ┌────────────┐  ┌────────────┐  ┌────────────┐        │     │
    │   │  │ Postgres   │  │   Redis    │  │ Meilisearch│        │     │
    │   │  └────────────┘  └────────────┘  └────────────┘        │     │
    │   │                                                          │     │
    │   │  ┌────────────────────────────────────────────┐         │     │
    │   │  │   Railway (Compute)  |  Cloudflare (Edge)  │         │     │
    │   │  └────────────────────────────────────────────┘         │     │
    │   └──────────────────────────────────────────────────────────┘     │
    │                                                                     │
    └─────────────────────────────────────────────────────────────────────┘
```

---

## User Flow Diagrams

### Flow 1: New User → Sign Up → App

```
[blackroad.io]
     │
     │ "Get Started" click
     ▼
[blackroad.io/signup]
     │
     │ Create account
     ▼
[app.blackroad.io]
     │
     │ Onboarding wizard
     ▼
[app.blackroad.io/road/my-first-project]
     │
     │ First project created
     ▼
[Chat with Cece, deploy first service]
```

### Flow 2: Developer → Docs → Build

```
[docs.blackroad.io]
     │
     │ Search "API"
     ▼
[docs.blackroad.io/api/chat]
     │
     │ Read endpoint docs
     ▼
[Copy curl command]
     │
     │ Test in terminal
     ▼
[app.blackroad.io]
     │
     │ Build integration
     ▼
[Deploy via Cece]
```

### Flow 3: Alexa → Operator Console → Fix Issue

```
[console.blackroad.io]
     │
     │ See alert: "RAG API offline"
     ▼
[console.blackroad.io/services/rag-api]
     │
     │ Check logs, see error
     ▼
[Ask Cece Governor: "Why is RAG down?"]
     │
     │ Cece: "Service not deployed yet"
     ▼
[Click Runbook: "Deploy RAG API"]
     │
     │ Follow steps
     ▼
[Service online, alert resolved]
```

### Flow 4: Parent → Lucidia → Kids App

```
[lucidia.earth]
     │
     │ "Start Your Adventure"
     ▼
[lucidia.earth/signup]
     │
     │ Parent creates family account
     ▼
[app.lucidia.earth]
     │
     │ Child profile setup
     ▼
[play.lucidia.earth]
     │
     │ Educational games
     ▼
[Progress tracked for parent]
```

---

## Domain → Page → Repo Mapping

| Door / URL | Lands On | Backed By | Status |
|------------|----------|-----------|--------|
| blackroad.io | Marketing Landing | blackroad-os-web | ✅ Live |
| app.blackroad.io | User Workspace | blackroad-os-web | 🚧 Building |
| console.blackroad.io | Operator Console | blackroad-os-web or blackroad-console | 🚧 Building |
| docs.blackroad.io | Docs Landing | blackroad-os-docs | 🚧 Building |
| api.blackroad.io | API Gateway | blackroad-os-api-gateway | 🚧 Building |
| status.blackroad.io | Status Page | External (Instatus?) | 📋 Planned |
| lucidia.earth | Story Landing | lucidia site (TBD) | 📋 Planned |
| app.lucidia.earth | Education App | lucidia-core | 📋 Planned |
| blackroad.systems | Technical Docs | blackroad-os-docs | 📋 Planned |
| blackroad.network | Community Portal | TBD | 📋 Planned |

---

## A Day in the Life

### The New Builder

> Sarah discovers BlackRoad from a tweet. She clicks through to **blackroad.io** and sees the dark, neon-lit landing page. "Dream It → Build It → Scale It" catches her eye.
>
> She clicks "Get Started" and creates an account. Within 60 seconds, she's in **app.blackroad.io**, staring at a clean workspace. Cece greets her: "Hi Sarah! Ready to build something?"
>
> She describes her idea: "A simple API that returns dad jokes." Cece scaffolds the project, writes the code, and offers to deploy. One click later, it's live on Railway.
>
> Sarah's first BlackRoad project took 5 minutes. She's hooked.

### The Operator (Alexa)

> It's 2am and Alexa's phone buzzes. "GPT-OSS Model: High Memory Usage."
>
> She opens **console.blackroad.io** on her phone. The dashboard shows the alert in red. She taps the service and sees the logs: a partial model download filled the volume.
>
> Cece Governor suggests: "Run the volume cleanup runbook?" Alexa confirms. The runbook executes, clears the partial files, and restarts the service.
>
> Alert resolved. Alexa goes back to sleep. The system heals itself with human oversight.

### The Parent

> Miguel wants to get his 8-year-old daughter Luna into coding, but she finds tutorials boring.
>
> He discovers **lucidia.earth** through a parenting blog. The magical landing page shows animated characters floating in space. Luna immediately wants to play.
>
> They create a family account. Luna picks an avatar and starts "Math Magic" - a game where solving equations unlocks story chapters. She doesn't realize she's learning. She just knows she's having fun.
>
> Miguel checks the parent dashboard: Luna's spent 2 hours on multiplication. He smiles.

### The Developer

> Raj is building a Slack bot that needs AI responses. He Googles "BlackRoad API" and lands on **docs.blackroad.io**.
>
> The search bar instantly finds `/chat` endpoint. The documentation is clear: POST request, message body, response with trace.
>
> He copies the curl command, tweaks it, and gets a response in his terminal. "Nice," he thinks.
>
> He logs into **app.blackroad.io** to get an API key, integrates it into his bot, and deploys. His Slack workspace now has an AI assistant powered by BlackRoad.

---

## Key Principles

### 1. Every Door Has a Job
Each domain/subdomain serves one clear purpose. No overlap, no confusion.

### 2. Progressive Disclosure
Marketing → Sign up → Workspace → Power features. Users discover complexity at their own pace.

### 3. Cece Everywhere
AI assistance is available on every surface: app, console, docs, even the marketing site (chat widget).

### 4. Dark by Default
The visual language is consistent: dark backgrounds, neon accents, technical-but-approachable typography.

### 5. Mobile-First, Desktop-Optimized
All surfaces work on mobile, but power features shine on desktop.

---

## Implementation Priority

### Phase 1: Core Surfaces (Now)
1. ✅ blackroad.io (marketing exists)
2. 🚧 app.blackroad.io (workspace shell)
3. 🚧 console.blackroad.io (operator shell)
4. 🚧 docs.blackroad.io (docs structure)

### Phase 2: Polish & Features (Next)
1. Full workspace features (projects, agents, deploys)
2. Full operator features (all services, logs, metrics)
3. Docs content (API reference, guides)
4. Status page integration

### Phase 3: Expansion (Later)
1. lucidia.earth (education launch)
2. blackroad.network (community)
3. blackroad.systems (technical specs)
4. Additional subdomains as needed

---

## Related Documents

- [universe-domains-v1.md](./universe-domains-v1.md) - Domain & subdomain architecture
- [layouts-web-v1.md](./layouts-web-v1.md) - Website page layouts
- [layouts-app-v1.md](./layouts-app-v1.md) - App/dashboard layouts
- [~/BLACKROAD_UNIVERSE.md](file:///Users/alexa/BLACKROAD_UNIVERSE.md) - Original vision doc

---

*This is the BlackRoad Universe Map v1. It's a living document that evolves as we build.*

🛣️ **Dream It → Build It → Scale It** 🌌
