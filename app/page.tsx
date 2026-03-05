'use client';

import Link from 'next/link';

const GRADIENT = 'linear-gradient(135deg, #F5A623, #FF1D6C, #9C27B0, #2979FF)';

const PORTALS = [
  { name: 'RoadWork',  desc: 'AI tutoring that adapts to how you actually learn. Not how a textbook thinks you should.',         tag: 'Education' },
  { name: 'RoadView',  desc: 'Search that verifies before it surfaces. Every result scored for confidence, not clicks.',          tag: 'Search' },
  { name: 'RoadGlitch', desc: 'Drag-and-drop automation that generates production code. Your codebase, your style.',             tag: 'Backend' },
  { name: 'RoadWorld', desc: 'Virtual environments with real-world bridges. 80% creator revenue. You own everything.',           tag: 'Worlds' },
  { name: 'BackRoad',  desc: 'Social without the sickness. No vanity metrics. No addiction mechanics. Just people.',             tag: 'Social' },
  { name: 'CashRoad',  desc: 'Financial clarity without judgment. Decision-time assistance, not post-spending shame.',           tag: 'Finance' },
];

const PRINCIPLES = [
  { number: '01', title: 'Truth-First',        body: 'Every piece of information carries a confidence score. No SEO gaming. No ad-driven rankings. Only verified facts surface.' },
  { number: '02', title: 'Creator-Owned',      body: '80% revenue share. Your data, your content, your audience. Portable identity across every portal in the ecosystem.' },
  { number: '03', title: 'Agent Intelligence', body: '1,000 AI agents with persistent memory, individual identities, and evolving capabilities oriented toward community betterment.' },
  { number: '04', title: 'Zero Admin',         body: 'The OS handles forms, PDFs, onboarding, and compliance in the background. Admin becomes invisible, not a life event.' },
];

const STATS = [
  { value: '1,000', label: 'AI Agents' },
  { value: '20',    label: 'Domains' },
  { value: '150+',  label: 'Subdomains' },
  { value: '80%',   label: 'Creator Revenue' },
];

const NAV_LINKS = [
  { label: 'Pricing', href: '/pricing' },
  { label: 'Docs',    href: '/docs' },
  { label: 'Status',  href: '/status' },
  { label: 'About',   href: '/about' },
];

function GradientBar({ height = 2 }: { height?: number }) {
  return (
    <div style={{ height, background: GRADIENT, borderRadius: height }} />
  );
}

function PortalCard({ portal }: { portal: typeof PORTALS[0] }) {
  return (
    <div className="rounded-2xl border border-white/10 bg-white/[0.03] p-6 hover:bg-white/[0.06] transition-colors flex flex-col gap-3">
      <div className="flex items-center justify-between">
        <span className="font-semibold text-white text-base">{portal.name}</span>
        <span className="text-xs px-2 py-0.5 rounded-full border border-white/10 text-gray-400">{portal.tag}</span>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{portal.desc}</p>
    </div>
  );
}

function PrincipleCard({ p }: { p: typeof PRINCIPLES[0] }) {
  return (
    <div className="flex gap-5 p-5 rounded-2xl border border-white/10 bg-white/[0.02]">
      <span className="text-xs font-mono text-gray-600 pt-0.5 shrink-0">{p.number}</span>
      <div>
        <div className="font-semibold text-white mb-1">{p.title}</div>
        <p className="text-sm text-gray-400 leading-relaxed">{p.body}</p>
      </div>
    </div>
  );
}

export default function HomePage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <GradientBar height={3} />

      {/* nav */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ background: 'linear-gradient(135deg,#F5A623,#FF1D6C,#9C27B0,#2979FF)' }}>B</div>
            <span className="font-semibold text-lg">BlackRoad OS</span>
          </div>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-white transition-colors">{l.label}</Link>
            ))}
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login"
              className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5">
              Log in
            </Link>
            <Link href="/signup"
              className="text-sm px-4 py-2 rounded-lg font-medium transition-colors"
              style={{ background: '#FF1D6C', color: '#fff' }}>
              Get started
            </Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">

        {/* hero */}
        <section className="py-24 text-center">
          <div className="inline-block mb-6 text-xs font-mono px-3 py-1.5 rounded-full border border-white/10 text-gray-400">
            317+ equations · 20 domains · 1,000 AI agents
          </div>
          <h1 className="text-5xl sm:text-6xl font-bold tracking-tight mb-6 leading-tight">
            The OS for<br />
            <span style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
              human flourishing
            </span>
          </h1>
          <p className="text-lg text-gray-400 max-w-xl mx-auto mb-10 leading-relaxed">
            BlackRoad OS is a distributed AI operating system built on novel mathematical foundations.
            Truth-first. Creator-owned. Zero admin.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#FF1D6C' }}>
              Start for free
            </Link>
            <Link href="/docs"
              className="px-6 py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors">
              Read the docs
            </Link>
          </div>
        </section>

        {/* stats */}
        <section className="py-10 border-t border-b border-white/10 mb-20">
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8 text-center">
            {STATS.map(s => (
              <div key={s.label}>
                <div className="text-3xl font-bold text-white mb-1"
                  style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}>
                  {s.value}
                </div>
                <div className="text-xs text-gray-500 uppercase tracking-widest">{s.label}</div>
              </div>
            ))}
          </div>
        </section>

        {/* portals */}
        <section className="mb-20">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">20 portals. One OS.</h2>
            <p className="text-gray-400">Each portal is a complete vertical built on the same infrastructure layer.</p>
          </div>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {PORTALS.map(p => <PortalCard key={p.name} portal={p} />)}
          </div>
        </section>

        {/* principles */}
        <section className="mb-20">
          <div className="mb-10">
            <h2 className="text-2xl font-bold text-white mb-2">Built on principles, not metrics.</h2>
            <p className="text-gray-400">Every design decision starts with the same question: does this serve humans?</p>
          </div>
          <div className="grid sm:grid-cols-2 gap-4">
            {PRINCIPLES.map(p => <PrincipleCard key={p.number} p={p} />)}
          </div>
        </section>

        {/* cta */}
        <section className="mb-20 rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Your AI. Your hardware. Your rules.</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
            No lock-in. No data extraction. No vanity metrics. Just a full-stack OS that works for you.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/pricing"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#2979FF' }}>
              View pricing
            </Link>
            <Link href="/about"
              className="px-6 py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors">
              Meet the agents
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-6xl mx-auto flex flex-col sm:flex-row items-center justify-between gap-4 text-xs text-gray-600">
          <span>© 2026 BlackRoad OS, Inc. All rights reserved.</span>
          <div className="flex gap-6">
            {NAV_LINKS.map(l => (
              <Link key={l.href} href={l.href} className="hover:text-gray-400 transition-colors">{l.label}</Link>
            ))}
          </div>
        </div>
      </footer>

      <GradientBar height={2} />
    </div>
  );
}

