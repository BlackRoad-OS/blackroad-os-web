'use client';

import { useState } from 'react';
import Link from 'next/link';

const GRADIENT = 'linear-gradient(90deg, #FF6B2B, #FF2255, #CC00AA, #8844FF, #4488FF, #00D4FF)';

const PLANS = [
  {
    name: 'Open',
    price: '0',
    period: '',
    desc: 'For learners, explorers, and anyone who just wants to see what this is.',
    features: [
      'Full K-12 RoadWork access',
      'Lucidia chat — 50 messages/day',
      'RoadView search — unlimited',
      'BackRoad social — full access',
      '1 AI agent companion',
      'Community support',
    ],
    cta: 'Get Started',
    highlight: false,
  },
  {
    name: 'Builder',
    price: '10',
    period: '/mo',
    desc: 'For creators, students, and independent professionals building real things.',
    features: [
      'Everything in Open',
      'Unlimited Lucidia chat + code',
      'RoadGlitch automations — 100/mo',
      'SoundRoad — 10 tracks/mo',
      'Genesis Road — basic 3D',
      'VaultRoad second brain — 10GB',
      '5 AI agents with memory',
      'CashRoad financial co-pilot',
      'Priority support',
    ],
    cta: 'Start Building',
    highlight: true,
  },
  {
    name: 'Studio',
    price: '29',
    period: '/mo',
    desc: 'For teams, studios, and serious creators who need the full stack.',
    features: [
      'Everything in Builder',
      'Unlimited automations',
      'SoundRoad — unlimited tracks',
      'Genesis Road — full engine',
      'VaultRoad — 100GB',
      '25 AI agents with persistent memory',
      'RoadWorld — publish & earn',
      '80% revenue on all content',
      'API access',
      'Team collaboration — up to 5',
    ],
    cta: 'Go Studio',
    highlight: false,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    period: '',
    desc: 'For schools, organizations, and companies that need the OS at scale.',
    features: [
      'Everything in Studio',
      'Unlimited agents',
      'Custom agent training',
      'Dedicated infrastructure',
      'SSO / SAML / SCIM',
      'Compliance & audit logs',
      'Outcome-based pricing for schools',
      'SLA guarantee',
      'Dedicated support engineer',
    ],
    cta: 'Talk to Us',
    highlight: false,
  },
];

const FAQS = [
  {
    q: "What's outcome-based pricing?",
    a: "Schools pay per successful student outcome — not per seat. If a student doesn't learn, you don't pay. We believe in aligning incentives with actual results.",
  },
  {
    q: 'Can I switch plans anytime?',
    a: 'Yes. Upgrade instantly, downgrade at end of billing cycle. No contracts, no cancellation fees, no friction.',
  },
  {
    q: "What does 80% creator revenue mean?",
    a: "When you publish content, sell assets, or earn through the ecosystem, you keep 80%. Compare that to Roblox at 29%, YouTube at 55%, or Spotify at roughly 0.3%.",
  },
  {
    q: "What's an AI agent with memory?",
    a: "Each agent has persistent memory via PS-SHA∞ hashing. They remember every interaction, evolve over time, and develop individual capabilities. They're teammates, not tools.",
  },
  {
    q: 'Is my data portable?',
    a: 'Always. Export everything — your content, your audience contacts, your agent configurations, your vault. You own it all.',
  },
  {
    q: 'Do you sell my data?',
    a: 'No. Ever. Your data trains nothing except your own agents. BlackRoad is funded by subscriptions and creator revenue sharing — not surveillance.',
  },
];

const COMPARISONS = [
  { feature: 'Creator revenue share', blackroad: '80%',              others: '29–55%' },
  { feature: 'Data ownership',        blackroad: 'Full export',      others: 'Platform-locked' },
  { feature: 'AI agents with memory', blackroad: 'Up to 1,000',      others: 'None' },
  { feature: 'Search verification',   blackroad: 'Confidence scored', others: 'SEO-driven' },
  { feature: 'Social metrics',        blackroad: 'Hidden by design',  others: 'Vanity-first' },
  { feature: 'Admin automation',      blackroad: 'Zero-friction OS',  others: 'Manual' },
];

function GradientBar({ height = 2 }: { height?: number }) {
  return <div style={{ height, background: GRADIENT, borderRadius: height }} />;
}

function PlanCard({ plan }: { plan: typeof PLANS[0] }) {
  return (
    <div
      className="rounded-2xl border p-6 flex flex-col gap-5 relative"
      style={{
        borderColor: plan.highlight ? '#FF1D6C' : 'rgba(255,255,255,0.1)',
        background: plan.highlight ? 'rgba(255,29,108,0.06)' : 'rgba(255,255,255,0.02)',
      }}
    >
      {plan.highlight && (
        <div className="absolute -top-3 left-6 text-xs px-3 py-1 rounded-full font-semibold"
          style={{ background: '#FF1D6C', color: '#fff' }}>
          Most popular
        </div>
      )}
      <div>
        <div className="font-semibold text-white text-lg mb-1">{plan.name}</div>
        <div className="flex items-baseline gap-1 mb-2">
          {plan.price === 'Custom' ? (
            <span className="text-3xl font-bold text-white">Custom</span>
          ) : (
            <>
              <span className="text-3xl font-bold text-white">${plan.price}</span>
              <span className="text-gray-500 text-sm">{plan.period}</span>
            </>
          )}
        </div>
        <p className="text-sm text-gray-400 leading-relaxed">{plan.desc}</p>
      </div>
      <ul className="flex flex-col gap-2 flex-1">
        {plan.features.map(f => (
          <li key={f} className="flex items-start gap-2 text-sm text-gray-300">
            <span className="mt-0.5 shrink-0" style={{ color: '#4ade80' }}>✓</span>
            {f}
          </li>
        ))}
      </ul>
      <Link
        href="/signup"
        className="block text-center px-4 py-3 rounded-xl font-semibold text-sm transition-opacity hover:opacity-90"
        style={{
          background: plan.highlight ? '#FF1D6C' : 'rgba(255,255,255,0.08)',
          color: '#fff',
        }}
      >
        {plan.cta}
      </Link>
    </div>
  );
}

function FaqItem({ faq }: { faq: typeof FAQS[0] }) {
  const [open, setOpen] = useState(false);
  return (
    <div className="border-b border-white/10 py-5">
      <button
        onClick={() => setOpen(v => !v)}
        className="w-full flex items-center justify-between text-left gap-4 group"
      >
        <span className="font-medium text-white group-hover:text-gray-200 transition-colors">{faq.q}</span>
        <span className="text-gray-500 shrink-0 text-lg leading-none">{open ? '−' : '+'}</span>
      </button>
      {open && (
        <p className="mt-3 text-sm text-gray-400 leading-relaxed">{faq.a}</p>
      )}
    </div>
  );
}

export default function PricingPage() {
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
            <Link href="/pricing" className="text-white font-medium">Pricing</Link>
            <Link href="/docs"    className="hover:text-white transition-colors">Docs</Link>
            <Link href="/status"  className="hover:text-white transition-colors">Status</Link>
            <Link href="/about"   className="hover:text-white transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login"  className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5">Log in</Link>
            <Link href="/signup" className="text-sm px-4 py-2 rounded-lg font-medium" style={{ background: '#FF1D6C', color: '#fff' }}>Get started</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6">

        {/* hero */}
        <section className="py-16 text-center">
          <h1 className="text-4xl sm:text-5xl font-bold tracking-tight mb-4">Simple, honest pricing.</h1>
          <p className="text-lg text-gray-400 max-w-lg mx-auto">
            No dark patterns. No bait-and-switch. Start free, scale when you need to.
          </p>
        </section>

        {/* plans */}
        <section className="mb-20">
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-4">
            {PLANS.map(p => <PlanCard key={p.name} plan={p} />)}
          </div>
        </section>

        {/* comparison */}
        <section className="mb-20">
          <h2 className="text-2xl font-bold text-white mb-2">How we compare.</h2>
          <p className="text-gray-400 mb-8">Most platforms charge you twice — once with money, once with your data.</p>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            <div className="grid grid-cols-3 bg-white/[0.03] px-6 py-3 text-xs font-semibold uppercase tracking-widest text-gray-500">
              <span>Feature</span>
              <span className="text-center" style={{ color: '#FF1D6C' }}>BlackRoad</span>
              <span className="text-center">Others</span>
            </div>
            {COMPARISONS.map((row, i) => (
              <div
                key={row.feature}
                className="grid grid-cols-3 px-6 py-4 border-t border-white/5 text-sm"
                style={{ background: i % 2 === 0 ? 'transparent' : 'rgba(255,255,255,0.01)' }}
              >
                <span className="text-gray-300">{row.feature}</span>
                <span className="text-center font-medium" style={{ color: '#4ade80' }}>{row.blackroad}</span>
                <span className="text-center text-gray-500">{row.others}</span>
              </div>
            ))}
          </div>
        </section>

        {/* faqs */}
        <section className="mb-20 max-w-2xl mx-auto">
          <h2 className="text-2xl font-bold text-white mb-8">Frequently asked questions.</h2>
          {FAQS.map(f => <FaqItem key={f.q} faq={f} />)}
        </section>

        {/* cta */}
        <section className="mb-20 rounded-3xl border border-white/10 bg-white/[0.02] p-12 text-center">
          <h2 className="text-3xl font-bold text-white mb-4">Start free. No credit card.</h2>
          <p className="text-gray-400 max-w-md mx-auto mb-8">
            The Open plan is free forever. Upgrade only when you need more.
          </p>
          <Link href="/signup"
            className="inline-block px-8 py-3 rounded-xl font-semibold text-white transition-opacity hover:opacity-90"
            style={{ background: '#FF1D6C' }}>
            Create your free account
          </Link>
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
