export type BlogPost = {
  slug: string;
  title: string;
  excerpt: string;
  date: string;
  author: string;
  category: string;
  readTime: string;
  content: string;
};

export const blogPosts: BlogPost[] = [
  {
    slug: 'hello-world',
    title: 'Introducing BlackRoad OS',
    excerpt: 'Welcome to BlackRoad OS, a revolutionary platform for orchestrating autonomous agents at scale.',
    date: '2024-11-24',
    author: 'BlackRoad Team',
    category: 'Announcement',
    readTime: '5 min read',
    content: `# Welcome to BlackRoad OS

BlackRoad OS is a revolutionary platform for orchestrating autonomous agents at scale. We're building the future of intelligent systems.

## Key Features

- **Composable Agents**: Wire services, signals, and humans together with event-driven flows
- **Predictable Control**: Typed contracts, deterministic fallbacks, and audited traces by default
- **Built for Operations**: Observability-ready primitives with live dashboards

## Getting Started

To get started with BlackRoad OS, check out our [documentation](/docs) and explore the [Prism Console](/dashboard).

## What's Next

We're constantly improving and adding new features. Stay tuned for updates!`,
  },
  {
    slug: 'agent-orchestration',
    title: 'The Future of Agent Orchestration',
    excerpt: 'Learn how BlackRoad OS enables seamless coordination between thousands of autonomous agents.',
    date: '2024-11-20',
    author: 'John Doe',
    category: 'Technical',
    readTime: '8 min read',
    content: `# The Future of Agent Orchestration

Scaling agents is as much about coordination as raw horsepower. BlackRoad OS provides event-driven routing, guardrails, and robust observability to keep complex systems stable.

## Why It Matters

- **Elastic throughput** with backpressure-aware pipelines
- **Safeguards** that enforce contracts and expected behaviors
- **Unified visibility** across human, AI, and service participants

## Apply It

Experiment with multi-agent tasks in staging and promote flows once their traces meet your SLOs.`,
  },
  {
    slug: 'security-first',
    title: 'Security-First Architecture',
    excerpt: 'Discover how we built BlackRoad OS with security at its core, ensuring your agents operate safely.',
    date: '2024-11-15',
    author: 'Jane Smith',
    category: 'Security',
    readTime: '6 min read',
    content: `# Security-First Architecture

Agent systems need strong protections by default. BlackRoad OS layers authentication, authorization, and audit trails into every flow.

## Security Pillars

- **Identity-aware routing** keeps every message tied to a verified principal
- **Policy-driven execution** applies least privilege at the edge
- **Tamper-evident traces** simplify compliance reviews

## Next Steps

Roll out new integrations behind feature flags, monitor their behavior, and ship with confidence.`,
  },
];
