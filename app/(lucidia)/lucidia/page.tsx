import Link from 'next/link';

const audiences = [
  {
    emoji: '👧',
    title: 'Kids',
    description: 'Playful introductions to how computers think and learn.',
    color: 'from-teal-400 to-cyan-400',
  },
  {
    emoji: '👨‍👩‍👧',
    title: 'Parents',
    description: 'Help your children understand AI safely and thoughtfully.',
    color: 'from-br-vivid-purple to-br-hot-pink',
  },
  {
    emoji: '👩‍🏫',
    title: 'Educators',
    description: 'Curriculum-ready materials about systems and intelligence.',
    color: 'from-br-hot-pink to-br-sunrise-orange',
  },
  {
    emoji: '🧠',
    title: 'Curious Adults',
    description: 'Deep dives without the jargon. Understand what\'s under the hood.',
    color: 'from-br-cyber-blue to-br-vivid-purple',
  },
];

const activities = [
  {
    icon: '📖',
    title: 'Learn About AI Safely',
    description:
      'Stories and explanations designed to demystify artificial intelligence without the hype or fear.',
  },
  {
    icon: '🎨',
    title: 'Explore Visual Stories',
    description:
      'See how systems work through illustrated narratives. From databases to neural networks.',
  },
  {
    icon: '🛠️',
    title: 'Build With Guidance',
    description:
      'Future: Kid-friendly tools built on BlackRoad OS. Create your own mini-agents.',
  },
];

export default function LucidiaHomePage() {
  return (
    <div className="relative">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute inset-0 overflow-hidden">
        <div className="absolute -left-40 top-20 h-80 w-80 rounded-full bg-br-vivid-purple/10 blur-[100px]" />
        <div className="absolute -right-40 top-60 h-80 w-80 rounded-full bg-teal-500/10 blur-[100px]" />
      </div>

      {/* Hero */}
      <section className="relative px-6 py-24 text-center">
        <div className="mx-auto max-w-3xl">
          <div className="mb-6 inline-flex items-center gap-2 rounded-full border border-br-vivid-purple/30 bg-br-vivid-purple/10 px-4 py-2 text-sm text-br-vivid-purple">
            <span>✨</span>
            <span>The Learning Side of BlackRoad</span>
          </div>

          <h1 className="text-4xl font-bold leading-tight text-br-text sm:text-5xl md:text-6xl">
            <span className="bg-gradient-to-r from-br-vivid-purple via-teal-400 to-br-hot-pink bg-clip-text text-transparent">
              Lucidia
            </span>
          </h1>

          <p className="mx-auto mt-6 max-w-xl text-lg text-br-text-muted">
            Stories, tools, and agents that help humans understand the machines.
            For curious minds of all ages.
          </p>
        </div>
      </section>

      {/* For Who? */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-5xl">
          <h2 className="mb-4 text-center text-2xl font-bold text-br-text">
            For Who?
          </h2>
          <p className="mb-10 text-center text-br-text-muted">
            Lucidia meets you where you are.
          </p>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {audiences.map((audience) => (
              <div
                key={audience.title}
                className="group relative overflow-hidden rounded-2xl border border-br-border bg-br-surface p-6 transition hover:border-br-vivid-purple/50"
              >
                {/* Gradient accent */}
                <div
                  className={`absolute inset-x-0 top-0 h-1 bg-gradient-to-r ${audience.color} opacity-60 transition group-hover:opacity-100`}
                />

                <div className="text-4xl">{audience.emoji}</div>
                <h3 className="mt-4 text-lg font-semibold text-br-text">
                  {audience.title}
                </h3>
                <p className="mt-2 text-sm text-br-text-muted">
                  {audience.description}
                </p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* What You Can Do Here */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-4xl">
          <h2 className="mb-4 text-center text-2xl font-bold text-br-text">
            What You Can Do Here
          </h2>
          <p className="mb-10 text-center text-br-text-muted">
            Lucidia is a place to explore, learn, and eventually create.
          </p>

          <div className="space-y-4">
            {activities.map((activity) => (
              <div
                key={activity.title}
                className="flex items-start gap-4 rounded-xl border border-br-border bg-br-surface p-6"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-br-surface-2 text-2xl">
                  {activity.icon}
                </div>
                <div>
                  <h3 className="font-semibold text-br-text">{activity.title}</h3>
                  <p className="mt-1 text-sm text-br-text-muted">
                    {activity.description}
                  </p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* The Lucidia Story */}
      <section className="relative px-6 py-16">
        <div className="mx-auto max-w-3xl rounded-2xl border border-teal-500/20 bg-gradient-to-br from-br-surface via-teal-500/5 to-br-surface p-8 text-center">
          <h2 className="text-xl font-bold text-br-text">The Lucidia Story</h2>
          <p className="mt-4 text-br-text-muted">
            In the BlackRoad universe, Lucidia is both a place and a presence. She&apos;s the gentle
            guide who helps newcomers understand the vast systems that power our digital world.
            Think of her as the librarian of a magical library where the books are alive and
            the shelves rearrange themselves to show you exactly what you need.
          </p>
          <p className="mt-4 text-sm text-br-text-muted/70">
            More stories coming soon...
          </p>
        </div>
      </section>

      {/* CTA */}
      <section className="relative px-6 py-20">
        <div className="mx-auto max-w-xl text-center">
          <h2 className="text-2xl font-bold text-br-text">
            Stay Curious
          </h2>
          <p className="mt-4 text-br-text-muted">
            Lucidia is just getting started. Join the journey as we build a place where
            humans and machines learn together.
          </p>

          <div className="mt-8 flex flex-wrap justify-center gap-4">
            <button
              disabled
              className="rounded-full bg-gradient-to-r from-br-vivid-purple to-teal-500 px-6 py-3 font-semibold text-white opacity-50"
            >
              Join Mailing List (Coming Soon)
            </button>
            <Link
              href="/"
              className="rounded-full border border-br-border px-6 py-3 font-semibold text-br-text transition hover:border-br-text-muted hover:bg-br-surface"
            >
              Explore BlackRoad OS
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}
