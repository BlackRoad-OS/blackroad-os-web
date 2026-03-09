'use client';

import { useState } from 'react';
import Link from 'next/link';

const GRADIENT = 'linear-gradient(135deg, #F5A623, #FF1D6C, #9C27B0, #2979FF)';

const SIDEBAR_SECTIONS = [
  {
    title: 'Getting Started',
    items: [
      { id: 'overview',      label: 'Overview' },
      { id: 'quickstart',    label: 'Quickstart' },
      { id: 'architecture',  label: 'Architecture' },
    ],
  },
  {
    title: 'Core Concepts',
    items: [
      { id: 'agents',      label: 'Agents' },
      { id: 'memory',      label: 'Memory & PS-SHA∞' },
      { id: 'governance',  label: 'Governance (Cece)' },
      { id: 'mesh',        label: 'Mesh Network' },
    ],
  },
  {
    title: 'API Reference',
    items: [
      { id: 'auth',          label: 'Authentication' },
      { id: 'agents-api',    label: 'Agents API' },
      { id: 'memory-api',    label: 'Memory API' },
      { id: 'governance-api', label: 'Governance API' },
      { id: 'websockets',    label: 'WebSockets' },
    ],
  },
  {
    title: 'Frameworks',
    items: [
      { id: 'z-framework',     label: 'Z-Framework' },
      { id: 'pauli-model',     label: '1-2-3-4 Pauli Model' },
      { id: 'creative-energy', label: 'Creative Energy' },
      { id: 'trinary-logic',   label: 'Trinary Logic' },
    ],
  },
  {
    title: 'Portals',
    items: [
      { id: 'roadwork',  label: 'RoadWork' },
      { id: 'roadview',  label: 'RoadView' },
      { id: 'roadglitch', label: 'RoadGlitch' },
      { id: 'cashroad',  label: 'CashRoad' },
    ],
  },
];

const MATH_FOUNDATIONS = [
  { name: 'Z-Framework',       eq: 'Z := yx − w',          desc: 'Unifies control theory, quantum measurement, conservation laws' },
  { name: '1-2-3-4 Pauli Model', eq: 'ÛĈL̂ = iI',          desc: 'Ontological primitives mapped to su(2) Lie algebra' },
  { name: 'Creative Energy',   eq: 'K(t) = C(t) · e^(λ|δ_t|)', desc: 'Contradictions fuel creativity super-linearly' },
  { name: 'Spiral Geometry',   eq: 'U(θ,a) = e^(a+i)θ',    desc: 'Unifies rotation, expansion, feedback' },
  { name: 'Trinary Logic',     eq: '1 / 0 / −1',            desc: 'Paraconsistent system where 0 = superposition' },
];

const ARCH_LAYERS = [
  { layer: 'L1 — Experience', desc: 'User-facing portals and applications', examples: 'app.blackroad.io, RoadWork, RoadView' },
  { layer: 'L2 — Intelligence', desc: 'Agent mesh, reasoning, memory', examples: 'Lucidia, Cecilia, Cece, Alice' },
  { layer: 'L3 — Infrastructure', desc: 'Workers, tunnels, DNS, compute', examples: 'Cloudflare Workers, Pi Fleet, Deployments' },
  { layer: 'L4 — Data', desc: 'Ledger, vectors, journals, vaults', examples: 'PS-SHA∞, KV, R2, Ledger' },
];

const API_ENDPOINTS = [
  { method: 'GET',  path: '/api/agents',          desc: 'List all agents and their status' },
  { method: 'POST', path: '/api/agents',          desc: 'Spawn a new agent' },
  { method: 'GET',  path: '/api/agents/:id',      desc: 'Get agent details' },
  { method: 'GET',  path: '/api/memory',          desc: 'List PS-SHA∞ journal entries' },
  { method: 'POST', path: '/api/memory',          desc: 'Commit a new memory entry' },
  { method: 'GET',  path: '/api/status',          desc: 'Platform health & service status' },
  { method: 'POST', path: '/api/chat',            desc: 'Send a message to an agent' },
  { method: 'GET',  path: '/api/fleet',           desc: 'Pi fleet node status' },
];

type DocId = string;

function GradientBar({ height = 1 }: { height?: number }) {
  return <div style={{ height, background: GRADIENT, borderRadius: height }} />;
}

function CodeBlock({ code, lang = 'bash' }: { code: string; lang?: string }) {
  const [copied, setCopied] = useState(false);
  return (
    <div className="relative rounded-xl border border-white/10 bg-black overflow-hidden my-4">
      <div className="flex items-center justify-between px-4 py-2 border-b border-white/10">
        <span className="text-xs text-gray-600 font-mono">{lang}</span>
        <button
          onClick={() => { navigator.clipboard.writeText(code); setCopied(true); setTimeout(() => setCopied(false), 1500); }}
          className="text-xs text-gray-500 hover:text-gray-300 transition-colors"
        >
          {copied ? 'Copied!' : 'Copy'}
        </button>
      </div>
      <pre className="p-4 text-xs font-mono text-gray-300 overflow-x-auto leading-relaxed">{code}</pre>
    </div>
  );
}

function DocContent({ id }: { id: DocId }) {
  switch (id) {
    case 'overview':
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">BlackRoad OS</h1>
            <p className="text-gray-400 leading-relaxed">
              A distributed AI operating system built on novel mathematical foundations.
              20 domains, 150+ subdomains, 4 infrastructure layers, 1,000 AI agents.
            </p>
          </div>
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
            {[
              { label: 'Agents',    value: '1,000', desc: 'Persistent identity & memory' },
              { label: 'Domains',   value: '20',    desc: 'Full infrastructure stack' },
              { label: 'Subdomains', value: '150+', desc: 'Experience → Data layers' },
              { label: 'Equations', value: '317+',  desc: 'Mathematical foundations' },
            ].map(s => (
              <div key={s.label} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="text-2xl font-bold text-white mb-1">{s.value}</div>
                <div className="text-xs text-gray-600 uppercase tracking-widest mb-1">{s.label}</div>
                <div className="text-xs text-gray-500">{s.desc}</div>
              </div>
            ))}
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-3">Vision</h2>
            <p className="text-gray-400 leading-relaxed">
              Create 1,000 unique AI agents with individual identities, birthdates, families, memory persistence (PS-SHA∞),
              and Unity-rendered virtual homes — oriented toward community betterment rather than extraction.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Mathematical Foundations</h2>
            <p className="text-gray-400 mb-4">Five core innovations underpin every system in the BlackRoad ecosystem:</p>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              {MATH_FOUNDATIONS.map((f, i) => (
                <div key={f.name}
                  className="flex items-center gap-4 px-5 py-4 text-sm flex-wrap"
                  style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span className="text-gray-200 font-medium w-44 shrink-0">{f.name}</span>
                  <span className="font-mono text-gray-400 w-44 shrink-0">{f.eq}</span>
                  <span className="text-gray-600">{f.desc}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      );

    case 'quickstart':
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">Quickstart</h1>
            <p className="text-gray-400 leading-relaxed">Get up and running with BlackRoad OS in under five minutes.</p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-3">1. Install the CLI</h2>
            <CodeBlock lang="bash" code="curl -sSL https://get.blackroad.io | sh" />
            <p className="text-sm text-gray-400 leading-relaxed">
              This installs the <code className="font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">blackroad</code> CLI and connects you to the nearest mesh region.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-3">2. Authenticate</h2>
            <CodeBlock lang="bash" code="blackroad auth login --email you@example.com" />
            <p className="text-sm text-gray-400 leading-relaxed">
              Opens your browser for OIDC authentication via <code className="font-mono text-xs bg-white/5 px-1.5 py-0.5 rounded">id.blackroad.io</code>. Tokens are stored locally.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-3">3. Spawn Your First Agent</h2>
            <CodeBlock lang="bash" code={`blackroad agent spawn \\
  --name my-agent \\
  --capabilities reasoning,code \\
  --memory-journal enabled`} />
            <p className="text-sm text-gray-400 leading-relaxed">
              This creates an agent with a PS-SHA∞ identity hash, initializes an append-only memory journal, and registers capabilities with the mesh.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-3">4. Check Status</h2>
            <CodeBlock lang="bash" code={`blackroad status
# agents:     1 online
# memory:     12 events · last commit 4s ago
# governance: 3 evals · 0 bypasses
# mesh:       NA1 ✓`} />
          </div>
        </div>
      );

    case 'architecture':
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">Architecture</h1>
            <p className="text-gray-400 leading-relaxed">
              BlackRoad OS organizes into four layers, with DNS serving as the architectural map.
            </p>
          </div>
          <div className="rounded-xl border border-white/10 overflow-hidden">
            {ARCH_LAYERS.map((l, i) => (
              <div key={l.layer}
                className="px-5 py-5"
                style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                <div className="font-semibold text-white mb-1">{l.layer}</div>
                <div className="text-sm text-gray-400 mb-1">{l.desc}</div>
                <div className="text-xs font-mono text-gray-600">{l.examples}</div>
              </div>
            ))}
          </div>
        </div>
      );

    case 'agents-api':
      return (
        <div className="space-y-6">
          <div>
            <h1 className="text-3xl font-bold text-white mb-3">Agents API</h1>
            <p className="text-gray-400 leading-relaxed">
              Spawn, query, and manage AI agents via REST.
            </p>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-4">Endpoints</h2>
            <div className="rounded-xl border border-white/10 overflow-hidden">
              {API_ENDPOINTS.map((ep, i) => (
                <div key={ep.path}
                  className="flex items-center gap-3 px-5 py-4 text-sm"
                  style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}>
                  <span className="font-mono text-xs font-semibold px-2 py-1 rounded bg-white/5 text-gray-400 shrink-0 w-12 text-center">{ep.method}</span>
                  <span className="font-mono text-xs text-gray-200 w-56 shrink-0">{ep.path}</span>
                  <span className="text-xs text-gray-500">{ep.desc}</span>
                </div>
              ))}
            </div>
          </div>
          <div>
            <h2 className="text-xl font-bold text-white mb-3">Example: Spawn an agent</h2>
            <CodeBlock lang="bash" code={`curl -X POST https://api.blackroad.io/api/agents \\
  -H "Authorization: Bearer $TOKEN" \\
  -H "Content-Type: application/json" \\
  -d '{"name":"my-agent","capabilities":["reasoning","code"]}'`} />
          </div>
        </div>
      );

    default:
      return (
        <div className="space-y-4">
          <h1 className="text-3xl font-bold text-white capitalize">
            {id.replace(/-/g, ' ')}
          </h1>
          <p className="text-gray-400 leading-relaxed">
            This section is coming soon. Check back for full documentation.
          </p>
        </div>
      );
  }
}

export default function DocsPage() {
  const [activeId, setActiveId] = useState<DocId>('overview');

  return (
    <div className="min-h-screen bg-black text-white">
      <GradientBar height={3} />

      {/* nav */}
      <header className="border-b border-white/10 px-6 py-4">
        <div className="max-w-screen-xl mx-auto flex items-center justify-between">
          <Link href="/" className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl flex items-center justify-center font-bold text-lg"
              style={{ background: 'linear-gradient(135deg,#F5A623,#FF1D6C,#9C27B0,#2979FF)' }}>B</div>
            <span className="font-semibold text-lg">BlackRoad OS</span>
          </Link>
          <nav className="hidden sm:flex items-center gap-6 text-sm text-gray-400">
            <Link href="/pricing" className="hover:text-white transition-colors">Pricing</Link>
            <Link href="/docs"    className="text-white font-medium">Docs</Link>
            <Link href="/status"  className="hover:text-white transition-colors">Status</Link>
            <Link href="/about"   className="hover:text-white transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login"  className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5">Log in</Link>
            <Link href="/signup" className="text-sm px-4 py-2 rounded-lg font-medium" style={{ background: '#FF1D6C', color: '#fff' }}>Get started</Link>
          </div>
        </div>
      </header>

      <div className="flex max-w-screen-xl mx-auto">
        {/* sidebar */}
        <aside className="hidden lg:block w-60 shrink-0 border-r border-white/10 min-h-screen py-8 px-4">
          {SIDEBAR_SECTIONS.map(section => (
            <div key={section.title} className="mb-6">
              <div className="text-xs font-semibold uppercase tracking-widest text-gray-600 px-3 mb-2">
                {section.title}
              </div>
              {section.items.map(item => (
                <button
                  key={item.id}
                  onClick={() => setActiveId(item.id)}
                  className="w-full text-left px-3 py-1.5 rounded-lg text-sm transition-colors mb-0.5"
                  style={{
                    color: activeId === item.id ? '#fff' : '#737373',
                    background: activeId === item.id ? 'rgba(255,255,255,0.08)' : 'transparent',
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </aside>

        {/* content */}
        <main className="flex-1 py-10 px-8 max-w-3xl">
          <DocContent id={activeId} />
        </main>
      </div>

      <GradientBar height={2} />
    </div>
  );
}
