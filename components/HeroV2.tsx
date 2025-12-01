import Link from 'next/link';

export default function HeroV2() {
  return (
    <section className="relative isolate overflow-hidden px-6 pb-24 pt-20">
      {/* Background Gradients */}
      <div className="pointer-events-none absolute inset-0" aria-hidden>
        <div className="absolute left-[20%] top-[10%] h-96 w-96 rounded-full bg-br-hot-pink/10 blur-[120px]" />
        <div className="absolute right-[10%] top-[5%] h-80 w-80 rounded-full bg-br-vivid-purple/8 blur-[100px]" />
        <div className="absolute bottom-0 left-1/2 h-64 w-[600px] -translate-x-1/2 bg-gradient-to-t from-br-hot-pink/5 to-transparent blur-2xl" />
      </div>

      <div className="relative mx-auto flex max-w-4xl flex-col items-center gap-8 text-center">
        {/* Badge */}
        <div className="inline-flex items-center gap-2 rounded-full border border-br-border bg-br-surface/50 px-4 py-1.5 text-xs backdrop-blur">
          <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-green-400" />
          <span className="text-br-text-muted">Operator Engine v1 is live</span>
          <Link href="/console" className="text-br-hot-pink hover:underline">
            View Console →
          </Link>
        </div>

        {/* Main Heading */}
        <h1 className="text-balance text-4xl font-bold leading-tight tracking-tight text-br-text sm:text-5xl lg:text-6xl">
          <span className="block">Dream It.</span>
          <span className="block bg-gradient-to-r from-br-sunrise-orange via-br-hot-pink to-br-vivid-purple bg-clip-text text-transparent">
            Build It.
          </span>
          <span className="block">Scale It.</span>
        </h1>

        {/* Subheading */}
        <p className="max-w-2xl text-lg text-br-text-muted sm:text-xl">
          The AI-native operating system for builders who move fast. One interface for code, docs, chat, and deploy.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-wrap items-center justify-center gap-4">
          <Link
            href="/signup"
            className="group relative inline-flex items-center gap-2 rounded-full bg-gradient-to-r from-br-hot-pink to-br-vivid-purple px-6 py-3 text-sm font-semibold text-white transition hover:shadow-glow-pink"
          >
            Get Started — Free
            <svg
              className="h-4 w-4 transition-transform group-hover:translate-x-0.5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
            </svg>
          </Link>
          <Link
            href="/docs"
            className="inline-flex items-center gap-2 rounded-full border border-br-border px-6 py-3 text-sm font-semibold text-br-text transition hover:border-br-text-muted hover:bg-br-surface"
          >
            Read the Docs
          </Link>
        </div>

        {/* Trust Signals */}
        <p className="text-xs text-br-text-muted">
          ✓ Free tier available • ✓ No credit card required • ✓ Deploy in seconds
        </p>
      </div>
    </section>
  );
}
