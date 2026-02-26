# 🌌 BlackRoad OS Web

**Production-grade Next.js application with 5 quantum domains** - Full-stack BlackRoad OS web platform with official brand design system.

## 🌐 Live Deployments

This application serves **5 quantum domains**:
- **blackroad.io** - Primary domain
- **blackroadai.com** - AI-focused portal
- **blackroadquantum.com** - Quantum computing interface
- **lucidia.earth** - Companion AI platform
- **earth.blackroad.io** - Earth visualization

## ✨ Features

- **Next.js 15** - Latest App Router architecture
- **TypeScript** - Full type safety
- **Brand Compliant** - Official BlackRoad design system
- **Authentication** - Secure login/signup flows
- **Workspace** - Multi-domain workspace interface
- **Real-time** - Conversation and collaboration features
- **Responsive** - Mobile-first design

## 🎨 Brand Compliance

✅ **OFFICIAL BlackRoad Brand Design System Integrated:**
- Hot Pink (#FF1D6C) primary color
- Golden Ratio spacing (φ = 1.618): 8px, 13px, 21px, 34px, 55px, 89px, 144px
- SF Pro Display typography
- Line height: 1.618 (Golden Ratio)
- Official gradient: 135deg @ 38.2% & 61.8%
- No forbidden old colors

See `app/globals.css` for complete brand system implementation.

## 🚀 Getting Started

### Prerequisites
- Node.js 18+ or Bun
- npm, yarn, pnpm, or bun

### Installation

```bash
# Clone the repository
git clone https://github.com/BlackRoad-OS/blackroad-os-web.git
cd blackroad-os-web

# Set up BlackRoad-Private upstream (for team members with access)
git remote add upstream https://github.com/BlackRoad-OS/BlackRoad-Private.git
git fetch upstream

# Install dependencies
npm install
# or
bun install

# Run development server
npm run dev
# or
bun dev
```

Open [http://localhost:3000](http://localhost:3000) to see the application.

## 📁 Project Structure

```
blackroad-os-web/
├── app/                    # Next.js App Router
│   ├── (app)/             # Authenticated app routes
│   │   ├── workspace/     # Main workspace
│   │   └── conversations/ # Chat interface
│   ├── (auth)/            # Authentication routes
│   │   ├── login/         # Login page
│   │   └── signup/        # Signup page
│   ├── globals.css        # 🌌 OFFICIAL BRAND SYSTEM
│   └── layout.tsx         # Root layout
├── components/            # React components
├── stores/               # Zustand state management
├── lib/                  # Utilities
└── public/              # Static assets
```

## 🔧 Development

```bash
# Development server
npm run dev

# Production build
npm run build

# Start production server
npm start

# Lint code
npm run lint

# Type check
npm run type-check
```

## 🔄 Upstream Synchronization

This repository is connected to the private **BlackRoad-Private** upstream for advanced features and internal development.

### Keeping Your Fork Updated

```bash
# Fetch latest changes from upstream
git fetch upstream

# Merge upstream changes into your main branch
git checkout main
git merge upstream/main

# Push updates to your fork
git push origin main
```

### Working with Upstream

```bash
# Create a feature branch from upstream
git fetch upstream
git checkout -b feature-name upstream/main

# Cherry-pick specific commits from upstream
git cherry-pick <commit-hash>

# View upstream branches
git branch -r | grep upstream
```

**Note:** Access to BlackRoad-Private requires team membership. Contact blackroad.systems@gmail.com for access requests.

## 🚢 Deployment

### Cloudflare Pages (Recommended)

```bash
# Build for production
npm run build

# Deploy with Wrangler
wrangler pages deploy ./out --project-name=blackroad-os-web
```

### Automatic Deployment
Push to `main` branch triggers automatic deployment via GitHub Actions (if configured).

## 🔐 Environment Variables

Create `.env.local`:

```env
# Required
NEXT_PUBLIC_API_URL=https://api.blackroad.io
NEXT_PUBLIC_SUPABASE_URL=your_supabase_url
NEXT_PUBLIC_SUPABASE_ANON_KEY=your_supabase_key

# Optional
NEXT_PUBLIC_ANALYTICS_ID=your_analytics_id
```

## 📊 Performance

- **Lighthouse Score Target:** >90
- **First Contentful Paint:** <1.5s
- **Time to Interactive:** <3s
- **Core Web Vitals:** All Green

## 🔒 Security

- HTTPS enforced across all domains
- Security headers configured
- CSP (Content Security Policy)
- XSS protection
- CORS properly configured
- Environment variables for secrets

## 🧪 Testing

```bash
# Unit tests (when configured)
npm run test

# E2E tests (when configured)
npm run test:e2e
```

## 📚 Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Styling:** Tailwind CSS + Official Brand System
- **State:** Zustand
- **Deployment:** Cloudflare Pages
- **CI/CD:** GitHub Actions

## 🤝 Contributing

This is a production repository serving 5 live domains. All changes require:

1. GitHub issue or approved task
2. Pull request with comprehensive description
3. Brand compliance verification
4. All tests passing
5. Code review approval
6. No breaking changes to live domains

## 📄 License

Copyright © 2026 BlackRoad OS, Inc. All rights reserved.

See [LICENSE](./LICENSE) for details.

## 🔗 Related Projects

- [BlackRoad API](https://github.com/BlackRoad-OS/blackroad-api)
- [BlackRoad OS Interface](https://github.com/BlackRoad-OS/blackroad-os-interface)
- [BlackRoad Quantum](https://github.com/BlackRoad-OS/blackroad-os-quantum)
- [BlackRoad 30k Agents](https://github.com/BlackRoad-OS/blackroad-30k-agents)
- [BlackRoad-Private](https://github.com/BlackRoad-OS/BlackRoad-Private) - Private upstream (team access only)

## 📖 Documentation

- [Next.js Docs](https://nextjs.org/docs)
- [BlackRoad Brand System](../../BLACKROAD_BRAND_SYSTEM.md)
- [Traffic Light System](./TRAFFIC_LIGHT_SYSTEM.md)
- [Upstream Connection](./docs/UPSTREAM.md) - Connecting to BlackRoad-Private

## 💬 Support

- **Issues:** [GitHub Issues](https://github.com/BlackRoad-OS/blackroad-os-web/issues)
- **Email:** blackroad.systems@gmail.com

---

**Built with ❤️ by BlackRoad OS Team** | [blackroad.io](https://blackroad.io) | Powering 5 quantum domains
