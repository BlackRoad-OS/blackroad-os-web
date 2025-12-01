const features = [
  {
    icon: '🔄',
    title: 'One Interface',
    description: 'Code, docs, chat, deploy — all in one place. No more tab chaos.',
  },
  {
    icon: '🤖',
    title: 'AI Everywhere',
    description: 'Cece, your AI assistant, helps at every step. Code review, deploys, debugging.',
  },
  {
    icon: '⚡',
    title: 'Deploy in Seconds',
    description: 'Railway, Vercel, Cloudflare — one click. From idea to production.',
  },
  {
    icon: '👥',
    title: 'Agent Teams',
    description: 'Orchestrate multiple AI agents. They collaborate, you supervise.',
  },
  {
    icon: '🔐',
    title: 'Enterprise Ready',
    description: 'SSO, audit logs, compliance. Built for teams that ship.',
  },
  {
    icon: '🌐',
    title: 'Open Core',
    description: 'Self-host or cloud. Your data, your rules. Open source foundation.',
  },
];

export default function FeatureGrid() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-12 text-center">
        <p className="text-sm font-semibold uppercase tracking-widest text-br-hot-pink">
          For Builders Who Hate Context Switching
        </p>
        <h2 className="mt-3 text-2xl font-bold text-br-text sm:text-3xl">
          Everything you need. Nothing you don&apos;t.
        </h2>
      </div>

      <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
        {features.map((feature) => (
          <div
            key={feature.title}
            className="rounded-xl border border-br-border bg-br-surface p-6 transition hover:border-br-hot-pink/50 hover:bg-br-surface-2"
          >
            <span className="mb-4 block text-3xl">{feature.icon}</span>
            <h3 className="text-lg font-semibold text-br-text">{feature.title}</h3>
            <p className="mt-2 text-sm text-br-text-muted">{feature.description}</p>
          </div>
        ))}
      </div>
    </section>
  );
}
