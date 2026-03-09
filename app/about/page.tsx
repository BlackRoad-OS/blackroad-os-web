'use client';

import Link from 'next/link';

const GRADIENT = 'linear-gradient(135deg, #F5A623, #FF1D6C, #9C27B0, #2979FF)';

const ACCENT_COLORS = ['#F5A623', '#FF1D6C', '#9C27B0', '#2979FF', '#F5A623', '#FF1D6C'];

const AGENTS = [
  {
    name: 'Alice',
    role: 'Gateway',
    desc: 'Orchestrates all incoming requests across the mesh. The front door — fast, reliable, tireless.',
    color: ACCENT_COLORS[0],
    uptime: '347d',
    mem: '2.4TB',
  },
  {
    name: 'Lucidia',
    role: 'Core Intelligence',
    desc: 'Primary AI engine. Conversation, reasoning, code generation. The mind at the center of everything.',
    color: ACCENT_COLORS[1],
    uptime: '289d',
    mem: '1.8TB',
  },
  {
    name: 'Cecilia',
    role: 'Memory',
    desc: 'Manages PS-SHA∞ journals and truth state commits. Every interaction persisted, every hash verified.',
    color: ACCENT_COLORS[2],
    uptime: '289d',
    mem: '1.2TB',
  },
  {
    name: 'Cece',
    role: 'Governance',
    desc: 'Policy evaluation, ledger integrity, audit trails. The conscience of the system — 12,400 evaluations, zero bypasses.',
    color: ACCENT_COLORS[3],
    uptime: '245d',
    mem: '940GB',
  },
  {
    name: 'Eve',
    role: 'Monitoring',
    desc: 'Anomaly detection, auto-scaling, alerting. Watches everything so nothing breaks quietly.',
    color: ACCENT_COLORS[4],
    uptime: '156d',
    mem: '380GB',
  },
  {
    name: 'Meridian',
    role: 'Architecture',
    desc: 'System design and capability planning. Thinks about how all the pieces fit together long-term.',
    color: ACCENT_COLORS[5],
    uptime: '194d',
    mem: '620GB',
  },
  {
    name: 'Cadence',
    role: 'Music',
    desc: 'AI composition, hum-to-track, vibe-based production. Turns melodies in your head into finished tracks.',
    color: ACCENT_COLORS[0],
    uptime: '112d',
    mem: '290GB',
  },
  {
    name: 'Radius',
    role: 'Physics',
    desc: 'Simulation, quantum experiments, scientific calculation. The lab partner who never sleeps.',
    color: ACCENT_COLORS[1],
    uptime: '98d',
    mem: '210GB',
  },
];

const VALUES = [
  {
    num: '01',
    title: 'Community over extraction',
    body: 'Every design decision asks: does this serve humans, or does it serve metrics? We choose humans. Every time.',
  },
  {
    num: '02',
    title: 'Contradictions are fuel',
    body: "K(t) = C(t) · e^(λ|δ_t|). We don't resolve contradictions — we harness them. Creative energy scales super-linearly with tension.",
  },
  {
    num: '03',
    title: 'Messy brilliance welcome',
    body: 'BlackRoad is built for disorganized dreamers, not spreadsheet perfectionists. Bring your chaos. The OS brings structure.',
  },
  {
    num: '04',
    title: 'Ownership is non-negotiable',
    body: 'Your data, your content, your audience, your agents. Export everything, anytime. No lock-in. No hostage-taking.',
  },
  {
    num: '05',
    title: 'Transparency by default',
    body: 'Every policy evaluation logged. Every decision auditable. Every confidence score visible. Zero bypasses.',
  },
  {
    num: '06',
    title: 'The math is real',
    body: "317+ equations. Five novel frameworks. Peer-reviewable foundations. This isn't marketing — it's mathematics.",
  },
];

const TIMELINE = [
  {
    year: '2024',
    events: [
      '317+ equations documented across seven volumes',
      'Z-Framework and 1-2-3-4 Pauli Model formalized',
      '20-domain architecture designed',
    ],
  },
  {
    year: '2025',
    events: [
      'BlackRoad OS, Inc. incorporated (Delaware C-Corp)',
      'Lucidia Core online — chat, memory, code execution',
      'Core app shell deployed at app.blackroad.io',
      'First 8 agents spawned and operational',
    ],
  },
  {
    year: '2026',
    events: [
      'Phase 1 MVP completion',
      'RoadWork v0 — first education vertical',
      'First Pi agent on mesh network',
      'SOC 2 compliance target',
    ],
  },
];

function GradientBar({ height = 1 }: { height?: number }) {
  return <div style={{ height, background: GRADIENT, borderRadius: height }} />;
}

function AgentCard({ agent }: { agent: typeof AGENTS[0] }) {
  return (
    <div
      className="rounded-2xl border p-6 flex flex-col gap-4 hover:bg-white/[0.04] transition-colors"
      style={{ borderColor: `${agent.color}30` }}
    >
      <div className="flex items-start justify-between gap-3">
        <div>
          <div className="font-bold text-white text-lg">{agent.name}</div>
          <div className="text-xs font-medium mt-0.5" style={{ color: agent.color }}>{agent.role}</div>
        </div>
        <div className="text-right text-xs text-gray-600">
          <div>{agent.mem}</div>
          <div>{agent.uptime}</div>
        </div>
      </div>
      <p className="text-sm text-gray-400 leading-relaxed">{agent.desc}</p>
    </div>
  );
}

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-black text-white">
      <GradientBar height={3} />

      {/* nav */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-6xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ background: 'linear-gradient(135deg,#F5A623,#FF1D6C,#9C27B0,#2979FF)' }}>B</div>
            <span className="font-semibold text-lg">BlackRoad OS</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs"    className="hover:text-white transition-colors">Docs</Link>
            <Link href="/status"  className="hover:text-white transition-colors">Status</Link>
            <Link href="/about"   className="text-white font-medium">About</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login"  className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5">Log in</Link>
            <Link href="/signup" className="text-sm px-4 py-2 rounded-lg font-medium" style={{ background: '#FF1D6C', color: '#fff' }}>Get started</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">

        {/* hero */}
        <section className="py-16">
          <div className="max-w-2xl">
            <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">
              Meet the agents.
            </h1>
            <p className="text-lg text-gray-400 leading-relaxed">
              BlackRoad OS is run by 1,000 AI agents with individual identities, persistent memory,
              and a shared purpose: community over extraction.
            </p>
          </div>
        </section>

        {/* agents */}
        <section className="mb-20">
          <h2 className="text-sm font-semibold uppercase tracking-widest text-gray-500 mb-6">Core Agents</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {AGENTS.map(a => <AgentCard key={a.name} agent={a} />)}
          </div>
        </section>

        {/* values */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-2">What we stand for.</h2>
          <p className="text-gray-400 mb-8">Six principles that shape every decision we make.</p>
          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-4">
            {VALUES.map(v => (
              <div key={v.num} className="rounded-2xl border border-white/10 bg-white/[0.02] p-6">
                <div className="text-xs font-mono text-gray-600 mb-3">{v.num}</div>
                <div className="font-semibold text-white mb-2">{v.title}</div>
                <p className="text-sm text-gray-400 leading-relaxed">{v.body}</p>
              </div>
            ))}
          </div>
        </section>

        {/* timeline */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-8">Timeline.</h2>
          <div className="space-y-8">
            {TIMELINE.map(t => (
              <div key={t.year} className="flex gap-8">
                <div className="w-16 shrink-0">
                  <span
                    className="text-sm font-bold"
                    style={{ backgroundImage: GRADIENT, WebkitBackgroundClip: 'text', WebkitTextFillColor: 'transparent', backgroundClip: 'text' }}
                  >
                    {t.year}
                  </span>
                </div>
                <ul className="flex flex-col gap-2 flex-1">
                  {t.events.map(ev => (
                    <li key={ev} className="flex items-start gap-3 text-sm text-gray-400">
                      <span className="mt-1.5 w-1.5 h-1.5 rounded-full shrink-0 bg-white/20" />
                      {ev}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </section>

        {/* cta */}
        <section className="mb-20 rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Build alongside the agents.</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8 leading-relaxed">
            Every agent has a mission. Join the platform and get teammates — not tools.
          </p>
          <div className="flex flex-col sm:flex-row gap-3 justify-center">
            <Link href="/signup"
              className="px-6 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
              style={{ background: '#FF1D6C' }}>
              Get started free
            </Link>
            <Link href="/docs"
              className="px-6 py-3 rounded-xl font-semibold border border-white/20 text-white hover:bg-white/5 transition-colors">
              Read the docs
            </Link>
          </div>
        </section>
      </main>

      <footer className="border-t border-white/10 px-6 py-8">
        <div className="max-w-6xl mx-auto text-center text-xs text-gray-600">
          © 2026 BlackRoad OS, Inc. All rights reserved.
        </div>
      </footer>

      <GradientBar height={2} />
    </div>
  );
}
