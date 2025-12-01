import Link from 'next/link';

export default function CTASection() {
  return (
    <section className="relative overflow-hidden px-6 py-24">
      {/* Background */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute inset-0 bg-gradient-to-b from-transparent via-br-hot-pink/5 to-transparent" />
        <div className="absolute left-1/2 top-1/2 h-96 w-96 -translate-x-1/2 -translate-y-1/2 rounded-full bg-br-vivid-purple/10 blur-[100px]" />
      </div>

      <div className="relative mx-auto max-w-3xl text-center">
        <h2 className="text-3xl font-bold text-br-text sm:text-4xl">
          Ready to build something amazing?
        </h2>
        <p className="mt-4 text-lg text-br-text-muted">
          Join builders who ship faster with BlackRoad OS. Free tier includes 1 project, 3 agents, and 100k LLM tokens/month.
        </p>
        <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-br-hot-pink to-br-vivid-purple px-8 py-4 text-lg font-semibold text-white transition hover:shadow-glow-pink"
          >
            Start Building — Free
          </Link>
          <Link
            href="/contact"
            className="inline-flex items-center gap-2 rounded-full border border-br-border px-8 py-4 text-lg font-semibold text-br-text transition hover:border-br-text-muted hover:bg-br-surface"
          >
            Talk to Sales
          </Link>
        </div>
        <p className="mt-6 text-xs text-br-text-muted">
          No credit card required • Setup in under 2 minutes
        </p>
      </div>
    </section>
  );
}
