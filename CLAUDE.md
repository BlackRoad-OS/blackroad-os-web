# CLAUDE.md - BlackRoad Web Portal

This document provides comprehensive guidance for AI assistants working on the BlackRoad Web Portal codebase.

## Project Overview

**BlackRoad** is a composable agent orchestration platform for autonomous operations. This static-first Next.js 14 web portal serves as the public documentation and health surface for the BlackRoad ecosystem.

- **Repository**: blackroad-os-web
- **Version**: 0.1.0
- **Description**: Composable agent orchestration platform
- **Production Domain**: https://blackroad.io
- **Systems Domain**: https://blackroad.systems
- **Package Manager**: pnpm 10.11.0 (required)

## 🖥️🌈 Browser Shell Role

This repository is the **Browser Shell** – the BlackRoad "computer in a browser" UI.

### 🎯 Mission

- Render the **BlackRoad OS desktop** in the browser: windows, panels, docks, dashboards 🖥️
- Talk to APIs, never invent business rules that belong in core/api 🌐
- Make infra + agents feel playful, visual, and understandable 🎨

### ✅ What This Repo Owns

#### 🖥️ Shell & Layout

- Desktop-style layout (windows, panes, modals, dock, sidebars) 🪟
- Routing + navigation (apps, envs, workspaces, agents) 🧭
- Responsive behavior (laptop, tablet, phone) 📱

#### 🌐 Data & Views

- Calling `blackroad-os-api` / `blackroad-os-api-gateway` 🌐
- View models derived from `blackroad-os-core` types 🧠
- Rendering dashboards for services, agents, packs, environments 📊

#### 🎨 Visual Identity

- Using tokens from `blackroad-os-brand` 🎨
- Fonts: JetBrains Mono + Inter stack ✍️
- Neon road / fractal vibes where appropriate 🛣️🌀

#### 🔐 UX + Safety

- Login / logout / session UX 🔐
- Safe error surfaces ("what broke" in human words) ⚠️
- "Next best action" hints for confused humans + agents 👉

### 🚫 What This Repo Does NOT Own

- 🚫 Core domain models → `blackroad-os-core` 🧠
- 🚫 API contract definitions → `blackroad-os-api` / `-api-gateway` 🌐
- 🚫 Infra / DNS / Railway configs → `blackroad-os-infra` ☁️
- 🚫 Research math / long theory → `blackroad-os-research` 🧪
- 🚫 Brand guidelines source of truth → `blackroad-os-brand` 🎨
- 🚫 System logs / append-only history → `blackroad-os-archive` 🧾

### 🧪 Testing Requirements

Critical flows must have tests:

- ✅ Auth: login / logout / session restore
- ✅ Navigation: switch org / env / workspace / app
- ✅ Data: render + empty states + error states

Any new "app window" should have:

- 🧪 Component tests for main view
- 🧪 At least one test for loading + error

### 🔐 Security & Compliance

- Never store secrets in front-end code (keys, tokens, real creds) 🚫
- Respect server-provided permissions: hide/disable actions the user can't take 🔑
- Avoid dumping raw stack traces or internal IDs to users 🧼

### 📏 Design Principles

`blackroad-os-web` is **presentation + interaction**, not core logic:

- 🧠 Use types/interfaces from `blackroad-os-core` where possible
- 🌐 Treat APIs as the source of truth for data
- 🎯 Keep components small, composable, and reusable

Every major screen should answer:

1. 🧭 Where am I? (org / env / workspace / app)
2. 🟢🟡🔴 What is the current status? (OK / Warning / Error)
3. 👉 What can I do next? (clear primary action)

### 🎯 Success Criteria

If a new human or agent only touches this repo, they should be able to:

1. See a coherent BlackRoad desktop in the browser 🖥️
2. Understand how to plug new "apps" into the shell 🧩
3. Know which APIs + types to call/reuse without redefining anything 📖

### 🧬 Local Emoji Legend

| Emoji | Meaning                 |
| ----- | ----------------------- |
| 🖥️    | UI shell / desktop      |
| 🌐    | API calls / remote data |
| 🎨    | Brand look & feel       |
| 🧭    | Navigation / routing    |
| 📊    | Dashboards / status     |
| 🔐    | Auth / session          |
| 🧪    | Tests                   |

## Technology Stack

### Core Framework

- **Next.js 14.2.3** with App Router
- **React 18.3.1**
- **TypeScript 5.4.5** (strict mode enabled)
- **Static Export Mode** (`output: 'export'`)

### Styling & UI

- **Tailwind CSS 3.4.4** with custom configuration
- **@tailwindcss/typography** for prose content
- **Custom color scheme**:
  - `br-night`: #0b1220
  - `br-dawn`: #0ea5e9
  - Dark theme (slate-950 background, slate-50 text)
- **Inter font** from Google Fonts

### Content Management

- **Contentlayer 0.3.4** for type-safe MDX content
- **MDX** for documentation and blog posts
- Content stored in `content/` directory

### Analytics & Observability

- **Plausible Analytics** (next-plausible integration)
- Custom beacon system (sig.beacon.json)

### Testing & Quality

- **Vitest 1.6.0** for unit tests
- **Playwright 1.45.0** for E2E tests
- **ESLint** with Next.js and Prettier configs
- **Prettier** for code formatting

### Build & Deployment

- **serve** for static file serving
- **Docker** support with multi-stage builds
- **Static export** to `.out` directory

## Directory Structure

```
blackroad-os-web/
├── .github/
│   └── workflows/          # CI/CD workflows
│       ├── ci.yml         # Main CI pipeline
│       └── web-deploy.yaml # Deployment workflow
├── app/                   # Next.js App Router pages
│   ├── api/              # API routes
│   │   ├── health/       # Health check endpoint
│   │   └── version/      # Version info endpoint
│   ├── docs/             # Documentation pages
│   │   └── [...slug]/    # Dynamic doc routes
│   ├── layout.tsx        # Root layout with Inter font
│   ├── page.tsx          # Home page
│   └── globals.css       # Global styles
├── components/           # React components
│   ├── Footer.tsx        # Footer component
│   ├── GlowButton.tsx    # Animated button with glow effect
│   ├── GradientCard.tsx  # Card with gradient styling
│   └── Hero.tsx          # Landing page hero section
├── content/              # MDX content source
│   ├── blog/            # Blog posts (BlogPost type)
│   └── docs/            # Documentation (Doc type)
│       ├── intro.mdx    # Introduction page
│       └── get-started.mdx # Getting started guide
├── lib/                  # Shared utilities
│   ├── mdx.tsx          # MDX rendering component
│   ├── metadata.ts      # SEO metadata configuration
│   └── plausible.tsx    # Analytics provider
├── public/               # Static assets
├── scripts/              # Build scripts
│   └── postbuild.ts     # Post-build beacon generation
├── src/                  # Additional source files
│   ├── components/
│   │   └── Layout/
│   └── lib/
│       ├── observability.ts
│       └── routes.ts
├── tests/                # Test files
│   └── hero.spec.ts     # Playwright E2E tests
├── .eslintrc.json       # ESLint configuration
├── .prettierrc          # Prettier configuration
├── contentlayer.config.ts # Contentlayer setup
├── Dockerfile           # Docker image definition
├── next.config.mjs      # Next.js configuration
├── package.json         # Dependencies and scripts
├── playwright.config.ts # Playwright configuration
├── tailwind.config.mjs  # Tailwind customization
├── tsconfig.json        # TypeScript configuration
└── vitest.config.ts     # Vitest test configuration
```

## Development Workflows

### Initial Setup

```bash
# Install dependencies (requires pnpm)
pnpm install

# Start development server
pnpm dev  # Opens at http://localhost:3000
```

### Common Commands

```bash
pnpm dev         # Start dev server with hot reload
pnpm build       # Build static export to .out/
pnpm start       # Serve built static files
pnpm lint        # Run ESLint
pnpm test        # Run Vitest + Playwright tests
pnpm typecheck   # Run TypeScript type checking
pnpm format      # Check code formatting with Prettier
pnpm postbuild   # Generate sig.beacon.json (auto-runs after build)
```

### Build Process

1. **Build**: `next build` generates static export
2. **Move**: Output moved from `out/` to `.out/`
3. **Postbuild**: `scripts/postbuild.ts` creates `sig.beacon.json` beacon files
4. **Serve**: Static files served from `.out/` using `serve`

### Testing Strategy

- **Unit tests**: Vitest with jsdom
- **E2E tests**: Playwright (`tests/*.spec.ts`)
- **Test command**: Runs both Vitest and Playwright sequentially
- **CI**: All tests run on push and PRs

## Key Conventions

### File Organization

1. **Components**: Two locations exist - `components/` (root) and `src/components/` (legacy)
   - Prefer root `components/` for new components
   - Use PascalCase for component files (e.g., `GlowButton.tsx`)

2. **Pages**: Use Next.js App Router conventions in `app/`
   - `page.tsx` for routes
   - `layout.tsx` for layouts
   - `route.ts` for API routes

3. **Content**: MDX files in `content/docs/` and `content/blog/`
   - Required frontmatter: `title`, `description`
   - Use kebab-case for file names

4. **Utilities**: Shared code in `lib/` directory
   - Use lowercase with hyphens or camelCase

### Code Style

- **TypeScript**: Strict mode enabled
- **Formatting**: Single quotes, semicolons, trailing commas (Prettier)
- **Imports**: Use `@/*` alias for root imports
- **ESLint**: Next.js + Prettier configs, `react/jsx-key` disabled

### Component Patterns

1. **Server Components by default**: App Router uses RSC
2. **Client Components**: Use `'use client'` directive when needed
3. **Metadata**: Export `generateMetadata()` for SEO
4. **Static Generation**: Use `generateStaticParams()` for dynamic routes

### Naming Conventions

- **Components**: PascalCase (e.g., `GlowButton`)
- **Files**: Match component name (e.g., `GlowButton.tsx`)
- **Utilities**: camelCase (e.g., `siteMetadata`)
- **CSS Classes**: Tailwind utility classes
- **Types**: Use TypeScript interfaces and types

## Configuration Deep Dive

### TypeScript (tsconfig.json)

- **Strict mode**: Enabled
- **Path aliases**:
  - `@/*` → root directory
  - `contentlayer/generated` → `.contentlayer/generated`
- **Module resolution**: bundler
- **Target**: ESNext
- **No emit**: true (Next.js handles compilation)

### Next.js (next.config.mjs)

- **Output**: Static export mode
- **Images**: Unoptimized (required for static export)
- **Trailing slash**: true
- **Contentlayer**: Integrated via `withContentlayer()`
- **Webpack alias**: Custom alias for contentlayer/generated

### Contentlayer (contentlayer.config.ts)

Two document types:

1. **Doc** (`content/docs/**/*.mdx`)
   - Fields: title, description
   - Computed: slug, slugAsParams, url

2. **BlogPost** (`content/blog/**/*.mdx`)
   - Fields: title, description
   - Computed: slug, slugAsParams, url

### Tailwind (tailwind.config.mjs)

- **Content**: Scans `app/`, `components/`, `content/`
- **Custom colors**: br-night, br-dawn
- **Typography**: Custom `br-day-night` prose theme
- **Dark theme**: Custom CSS variables for prose

### Prettier (.prettierrc)

```json
{
  "singleQuote": true,
  "semi": true,
  "trailingComma": "all"
}
```

### ESLint (.eslintrc.json)

- Extends: `next/core-web-vitals`, `prettier`
- Disabled: `react/jsx-key`

## API Routes

### Health Check

- **Path**: `/api/health` and `/health`
- **Response**: `{ status: 'ok', ts: ISO_TIMESTAMP }`
- **Use**: Readiness/liveness probes

### Version Info

- **Path**: `/api/version` and `/version`
- **Response**: `{ version: '0.1.0', name: 'blackroad-os-web' }`
- **Use**: Deployment verification

## Content Management

### Creating Documentation

1. Create MDX file in `content/docs/`:

```mdx
---
title: Page Title
description: Page description for SEO
---

# Your Content Here

Write your documentation using MDX.
```

2. File is automatically:
   - Processed by Contentlayer
   - Type-checked
   - Available at `/docs/{filename}`

### MDX Components

- Custom MDX components defined in `lib/mdx.tsx`
- Uses `useMDXComponent` hook from contentlayer
- Styled with Tailwind typography

## Deployment

### Docker Deployment

```bash
# Build image
docker build -t blackroad/web:0.0.1 .

# Run container
docker run -e PORT=3000 -p 3000:3000 blackroad/web:0.0.1
```

**Dockerfile stages**:

1. **Builder**: Install deps, build static export
2. **Runner**: Copy `.out/`, serve with `serve`

### Environment Variables

- **SITE_URL**: Base URL for metadata (default: `https://blackroad.io`)
- **PORT**: Server port (default: 3000)
- **PLAUSIBLE_DOMAIN**: Plausible analytics domain (e.g., `analytics.blackroad.io`)

### CI/CD Pipeline (.github/workflows/ci.yml)

Runs on push to `main` and all PRs:

1. Setup Node.js 18
2. Enable corepack (for pnpm)
3. Install dependencies (`--frozen-lockfile`)
4. Run linter
5. Run tests
6. Build static export
7. Run postbuild script

## Important Patterns & Best Practices

### 1. Static-First Architecture

- **Always think static**: This is a static site generator
- **No server runtime**: All pages pre-rendered at build time
- **API routes**: Exported as static JSON where possible
- **Dynamic content**: Use Contentlayer for content, not runtime fetching

### 2. Content Updates

- Add new docs to `content/docs/`
- Contentlayer auto-generates types
- No manual routing needed for new docs
- MDX supports React components inline

### 3. Styling

- **Tailwind-first**: Use utility classes
- **Custom components**: Keep minimal, reusable
- **Dark theme**: Default and only theme
- **Typography**: Use `prose` classes for content

### 4. Performance

- **Static export**: Maximum performance
- **Unoptimized images**: Required for static export
- **Minimal JavaScript**: RSC reduces client bundle
- **Analytics**: Plausible is privacy-friendly and lightweight

### 5. SEO & Metadata

- Use `generateMetadata()` in page components
- Provide title and description for all pages
- Configure OpenGraph and Twitter cards
- Base URL from `SITE_URL` env var

### 6. Testing

- Write E2E tests for critical user flows
- Test component rendering with Vitest
- Run tests before committing
- CI enforces test passing

### 7. Type Safety

- Use TypeScript strictly
- Leverage Contentlayer generated types
- Import from `contentlayer/generated`
- No `any` types

### 8. Git Workflow

- **Branch naming**: Use descriptive names
- **Commits**: Clear, descriptive messages
- **PRs**: All changes via pull requests
- **CI**: Must pass before merge

## Troubleshooting

### Common Issues

1. **Contentlayer build errors**
   - Check MDX frontmatter format
   - Ensure required fields (title, description) present
   - Verify file paths match patterns

2. **Type errors with contentlayer/generated**
   - Run `pnpm dev` to generate types
   - Check path alias in tsconfig.json
   - Restart TypeScript server

3. **Build failures**
   - Clear `.next` and `.contentlayer` directories
   - Reinstall dependencies: `rm -rf node_modules pnpm-lock.yaml && pnpm install`
   - Check for TypeScript errors: `pnpm typecheck`

4. **Static export issues**
   - Ensure no dynamic features incompatible with static export
   - Check Next.js docs for static export limitations
   - Verify `output: 'export'` in next.config.mjs

### Debugging

- **Dev server**: Check browser console and terminal
- **Build**: Read build output carefully
- **Tests**: Run with `--reporter=verbose` flag
- **TypeScript**: Use `pnpm typecheck` for full check

## Future Considerations

Based on code comments and TODOs:

1. **Agent widgets**: `// TODO(web-next): mount live agent widget entrypoints.` (app/page.tsx:34)
2. **Interactive features**: Plan for agent affordances
3. **Real-time updates**: Health signals and observability
4. **Blog functionality**: BlogPost type exists but no blog pages yet

## Quick Reference

### Path Aliases

- `@/*` → Project root
- `contentlayer/generated` → Generated types

### Key Files

- `app/layout.tsx` → Root layout
- `app/page.tsx` → Home page
- `lib/metadata.ts` → SEO config
- `contentlayer.config.ts` → Content schema

### Important Commands

```bash
pnpm dev         # Development
pnpm build       # Production build
pnpm test        # Run all tests
pnpm typecheck   # Type checking
```

### Component Locations

- Home page components: `components/`
- Layout components: `src/components/Layout/`
- Doc rendering: `lib/mdx.tsx`

## Questions?

When in doubt:

1. Check existing code patterns
2. Follow Next.js 14 App Router conventions
3. Maintain static-first approach
4. Keep it simple and performant
5. Test before committing

---

**Last Updated**: 2025-11-25
**Generated by**: Claude AI Assistant
**For**: BlackRoad Web Portal Development
