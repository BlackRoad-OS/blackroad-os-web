const floors = [
  {
    name: 'Experience',
    description: 'Apps, Consoles, Portals',
    color: 'from-br-sunrise-orange to-br-warm-orange',
    icon: '🖥️',
  },
  {
    name: 'Orchestration',
    description: 'API Gateway, Operator, Workflows',
    color: 'from-br-hot-pink to-br-electric-magenta',
    icon: '⚙️',
  },
  {
    name: 'Runtime',
    description: 'Agents, LLMs, RAG, Mesh',
    color: 'from-br-deep-magenta to-br-vivid-purple',
    icon: '🤖',
  },
  {
    name: 'Infrastructure',
    description: 'DNS, CDN, Databases, Compute',
    color: 'from-br-vivid-purple to-br-cyber-blue',
    icon: '🏗️',
  },
];

export default function FourFloors() {
  return (
    <section className="mx-auto max-w-5xl px-6 py-20">
      <div className="mb-12 text-center">
        <h2 className="text-2xl font-bold text-br-text sm:text-3xl">
          The Four Floors of BlackRoad OS
        </h2>
        <p className="mt-3 text-br-text-muted">
          A complete stack from infrastructure to experience, all orchestrated.
        </p>
      </div>

      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        {floors.map((floor, index) => (
          <div
            key={floor.name}
            className="group relative overflow-hidden rounded-xl border border-br-border bg-br-surface p-6 transition hover:border-br-hot-pink/50"
          >
            {/* Gradient accent */}
            <div
              className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${floor.color} opacity-60 transition group-hover:opacity-100`}
            />

            {/* Floor number */}
            <div className="absolute right-4 top-4 text-4xl font-bold text-br-surface-2 transition group-hover:text-br-border">
              {4 - index}
            </div>

            {/* Content */}
            <div className="relative">
              <span className="mb-3 block text-3xl">{floor.icon}</span>
              <h3 className="text-lg font-semibold text-br-text">{floor.name}</h3>
              <p className="mt-1 text-sm text-br-text-muted">{floor.description}</p>
            </div>
          </div>
        ))}
      </div>
    </section>
  );
}
