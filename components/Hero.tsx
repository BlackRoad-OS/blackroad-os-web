import GlowButton from './GlowButton';
import Link from 'next/link';

export default function Hero() {
  return (
    <section className="relative isolate overflow-hidden bg-gradient-to-b from-slate-950 via-slate-900 to-slate-950 px-6 pb-20 pt-24 text-center">
      {/* Simple Navigation */}
      <nav className="absolute left-6 top-6 flex gap-4 text-sm">
        <Link href="/status" className="text-slate-400 hover:text-cyan-400 transition-colors">
          Status
        </Link>
        <Link href="/docs/intro" className="text-slate-400 hover:text-cyan-400 transition-colors">
          Docs
        </Link>
      </nav>

      <div className="pointer-events-none absolute inset-0 opacity-60" aria-hidden>
        <div className="absolute left-1/2 top-10 h-72 w-72 -translate-x-1/2 rounded-full bg-cyan-500/20 blur-3xl" />
        <div className="absolute left-1/3 top-48 h-64 w-64 rounded-full bg-emerald-500/10 blur-3xl" />
      </div>
      <div className="relative mx-auto flex max-w-3xl flex-col items-center gap-6">
        <p className="text-sm font-semibold uppercase tracking-[0.3em] text-cyan-300">BlackRoad OS</p>
        <h1 className="text-balance text-4xl font-bold leading-tight text-white sm:text-5xl">
          BlackRoad OS – Public Web Portal for autonomous operations
        </h1>
        <p className="text-lg text-slate-300 sm:text-xl">
          Instrumentation, docs, and live agent affordances designed for static-first delivery.
        </p>
        <div className="flex flex-wrap items-center justify-center gap-4">
          <GlowButton href="/docs/intro" label="Explore documentation" />
          <GlowButton href="/api/health" label="API health" />
        </div>
      </div>
    </section>
  );
}
