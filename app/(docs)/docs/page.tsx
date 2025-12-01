import Link from 'next/link';

const quickLinks = [
  {
    href: '/docs/intro',
    title: 'Introduction',
    description: 'What is BlackRoad OS and why does it exist?',
  },
  {
    href: '/docs/get-started',
    title: 'Quickstart',
    description: 'Get up and running in under 5 minutes.',
  },
];

const fourFloors = [
  {
    floor: 4,
    name: 'Experience',
    description: 'Apps, consoles, and portals where humans interact with the system.',
    color: 'from-br-sunrise-orange to-br-warm-orange',
  },
  {
    floor: 3,
    name: 'Orchestration',
    description: 'API Gateway, Operator Engine, and workflow coordination.',
    color: 'from-br-hot-pink to-br-electric-magenta',
  },
  {
    floor: 2,
    name: 'Runtime',
    description: 'Agents, LLMs, RAG pipelines, and the mesh network.',
    color: 'from-br-deep-magenta to-br-vivid-purple',
  },
  {
    floor: 1,
    name: 'Infrastructure',
    description: 'DNS, CDN, databases, and compute resources.',
    color: 'from-br-vivid-purple to-br-cyber-blue',
  },
];

export default function DocsHomePage() {
  return (
    <div className="space-y-12">
      {/* Hero */}
      <section>
        <h1 className="text-4xl font-bold text-br-text">
          BlackRoad OS Documentation
        </h1>
        <p className="mt-4 text-lg text-br-text-muted">
          Everything you need to build, deploy, and orchestrate intelligent systems with BlackRoad OS.
        </p>
      </section>

      {/* Quick Links */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-br-text">
          Get Started
        </h2>
        <div className="grid gap-4 sm:grid-cols-2">
          {quickLinks.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className="group rounded-xl border border-br-border bg-br-surface p-6 transition hover:border-br-hot-pink/50 hover:bg-br-surface-2"
            >
              <h3 className="text-lg font-semibold text-br-text group-hover:text-br-hot-pink">
                {link.title}
              </h3>
              <p className="mt-2 text-sm text-br-text-muted">
                {link.description}
              </p>
            </Link>
          ))}
        </div>
      </section>

      {/* Four Floors */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-br-text">
          The Four Floors of BlackRoad OS
        </h2>
        <p className="mb-6 text-br-text-muted">
          BlackRoad OS is a composable stack organized into four layers, from infrastructure to experience.
        </p>
        <div className="space-y-3">
          {fourFloors.map((floor) => (
            <div
              key={floor.floor}
              className="relative overflow-hidden rounded-lg border border-br-border bg-br-surface p-4"
            >
              <div
                className={`absolute inset-y-0 left-0 w-1 bg-gradient-to-b ${floor.color}`}
              />
              <div className="ml-4 flex items-start gap-4">
                <span className="text-2xl font-bold text-br-surface-2">
                  {floor.floor}
                </span>
                <div>
                  <h3 className="font-semibold text-br-text">{floor.name}</h3>
                  <p className="text-sm text-br-text-muted">{floor.description}</p>
                </div>
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Cece for Builders */}
      <section className="rounded-xl border border-br-vivid-purple/30 bg-br-vivid-purple/5 p-6">
        <div className="flex items-start gap-4">
          <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-gradient-to-br from-br-vivid-purple to-br-hot-pink text-xl">
            🤖
          </div>
          <div>
            <h2 className="text-xl font-semibold text-br-text">
              Cece for Builders
            </h2>
            <p className="mt-2 text-br-text-muted">
              Cece is the AI assistant that lives inside BlackRoad OS. She&apos;s available in:
            </p>
            <ul className="mt-3 space-y-2 text-sm text-br-text-muted">
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-br-hot-pink" />
                <strong className="text-br-text">Workspace</strong> – Right panel at{' '}
                <code className="rounded bg-br-surface-2 px-1.5 py-0.5 text-xs">
                  app.blackroad.io
                </code>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-br-hot-pink" />
                <strong className="text-br-text">Console</strong> – Governor mode at{' '}
                <code className="rounded bg-br-surface-2 px-1.5 py-0.5 text-xs">
                  console.blackroad.io
                </code>
              </li>
              <li className="flex items-center gap-2">
                <span className="h-1.5 w-1.5 rounded-full bg-br-hot-pink" />
                <strong className="text-br-text">API</strong> – Operator Engine{' '}
                <code className="rounded bg-br-surface-2 px-1.5 py-0.5 text-xs">
                  /chat
                </code>{' '}
                endpoint
              </li>
            </ul>
            <p className="mt-4 text-sm text-br-text-muted">
              Cece can help you deploy, debug, and understand your projects. She&apos;s powered by the
              Operator Engine and can access RAG context when available.
            </p>
          </div>
        </div>
      </section>

      {/* Coming Soon */}
      <section>
        <h2 className="mb-4 text-xl font-semibold text-br-text">
          Coming Soon
        </h2>
        <div className="grid gap-4 sm:grid-cols-3">
          {[
            { title: 'API Reference', description: 'Full API docs with examples' },
            { title: 'Agent Guides', description: 'Build and deploy custom agents' },
            { title: 'RAG Pipelines', description: 'Connect knowledge bases' },
          ].map((item) => (
            <div
              key={item.title}
              className="rounded-lg border border-br-border bg-br-surface p-4 opacity-60"
            >
              <h3 className="font-semibold text-br-text">{item.title}</h3>
              <p className="mt-1 text-sm text-br-text-muted">{item.description}</p>
            </div>
          ))}
        </div>
      </section>
    </div>
  );
}
