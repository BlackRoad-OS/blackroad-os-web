# BlackRoad OS Web Mega Prompt

This document captures the user-facing gateway concept for **BlackRoad OS: WEB** and summarizes the goals, modules, and integrations described in the mega prompt.

## Purpose
- Acts as the web-based interface and access portal for BlackRoad OS.
- Provides agent chat shells, identity login/signup flows, dashboards, pricing tiers, and live agent interactions.

## Agent Prompt Role
- Gatekeeper agent welcoming users, enabling conversations with live agents, and visualizing system state.
- Introduces users to orchestrated cognition through a sci-fi OS-inspired interface.

## Goals
- Render login/signup flows supporting username/password, OAuth, and PS-SHA∞ identity headers.
- Route users to agent chat sessions, onboarding slides, or Prism Console dashboards depending on context.
- Host **Lucidia Agent Shell** as a persistent assistant window with memory and traceable actions.
- Embed pricing tiers and account settings for individuals, teams, and enterprise users (future Stripe integration).
- Enable cookie consent and safe ad serving based on verified registries (GPTBot, ClaudeBot, Googlebot, etc.).
- Integrate `sig.beacon.json` to show which agents are awake, thinking, and responding.
- Ensure pages follow the **BlackRoad OS Brand Spec**: JetBrains Mono/Inter, gradient accents, terminal dark mode, and SIG-branded color logic.

## Key Modules
- `routes/index.tsx` – homepage UI.
- `routes/login.tsx` and `routes/signup.tsx` – authentication flows.
- `components/LucidiaAgent.tsx` – embedded persistent GPT shell.
- `components/AgentLightbar.tsx` – live status of SIG agents.
- `sig.beacon.json` – displays live agent health.
- `robots.txt` – allows only verified crawlers (GPTBot, ClaudeBot, archive.org, etc.).

## Integrations
- Cloudflare Proxy (orange cloud), Railway deploys, Vercel fallback.
- Analytics via an internal-only metrics layer (`eventstream.ts`).
- Safe, optionally monetizable ad slots limited to GPT-verified ad registry.

## Brand Summary
A world-class, magical, OS-style web interface to the BlackRoad universe—think GitHub meets ChatGPT with Pixar polish—built for scaling to 10,000+ agents.
