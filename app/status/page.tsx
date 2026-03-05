'use client';

import { useEffect, useState } from 'react';
import Link from 'next/link';

const GRADIENT = 'linear-gradient(90deg, #FF6B2B, #FF2255, #CC00AA, #8844FF, #4488FF, #00D4FF)';

const AGENTS_STATIC = [
  { name: 'alice',    role: 'Gateway',      status: 'active', mem: '2.4TB',  uptime: '347d', load: 34 },
  { name: 'lucidia',  role: 'Core AI',      status: 'active', mem: '1.8TB',  uptime: '289d', load: 61 },
  { name: 'cecilia',  role: 'Memory',       status: 'active', mem: '1.2TB',  uptime: '289d', load: 28 },
  { name: 'cece',     role: 'Governance',   status: 'active', mem: '940GB',  uptime: '245d', load: 12 },
  { name: 'meridian', role: 'Architecture', status: 'active', mem: '620GB',  uptime: '194d', load: 45 },
  { name: 'eve',      role: 'Monitoring',   status: 'active', mem: '380GB',  uptime: '156d', load: 72 },
  { name: 'cadence',  role: 'Music',        status: 'idle',   mem: '290GB',  uptime: '112d', load: 3  },
  { name: 'radius',   role: 'Physics',      status: 'idle',   mem: '210GB',  uptime: '98d',  load: 0  },
];

const SERVICES_STATIC = [
  { name: 'api.blackroad.io',         status: 'operational', latency: '12ms',  uptime: '99.99%' },
  { name: 'app.blackroad.io',         status: 'operational', latency: '34ms',  uptime: '99.97%' },
  { name: 'ws.blackroad.io',          status: 'operational', latency: '8ms',   uptime: '99.98%' },
  { name: 'mesh.blackroad.network',   status: 'operational', latency: '22ms',  uptime: '99.95%' },
  { name: 'ledger.blackroad.systems', status: 'operational', latency: '18ms',  uptime: '99.99%' },
  { name: 'vectors.blackroad.systems', status: 'degraded',   latency: '89ms',  uptime: '99.84%' },
];

const EVENTS_STATIC = [
  { time: '2m ago',  agent: 'cecilia', action: 'Memory commit #4821 — 3 entries written to PS-SHA∞ chain' },
  { time: '8m ago',  agent: 'cece',    action: 'Policy deployed: edu.review.teacher-only scope updated' },
  { time: '15m ago', agent: 'eve',     action: 'Latency spike on mesh.na1 — auto-scaled, resolved in 2m' },
  { time: '34m ago', agent: 'system',  action: 'DNS propagation complete for edu.blackroad.io' },
  { time: '1h ago',  agent: 'cadence', action: 'Composition #42 exported — 3:42, C minor, 108 BPM' },
  { time: '2h ago',  agent: 'alice',   action: 'Gateway health check passed — 7 endpoints, 2.4k concurrent WS' },
  { time: '3h ago',  agent: 'cece',    action: 'Weekly governance: 12,400 evals, 0 bypasses, ledger verified' },
];

function GradientBar({ height = 1 }: { height?: number }) {
  return <div style={{ height, background: GRADIENT, borderRadius: height }} />;
}

function statusColor(s: string) {
  if (s === 'operational') return '#4ade80';
  if (s === 'degraded')    return '#F5A623';
  return '#ef4444';
}

function LoadBar({ load }: { load: number }) {
  return (
    <div className="h-1 rounded-full bg-white/10 overflow-hidden w-20">
      <div
        className="h-full rounded-full transition-all"
        style={{
          width: `${load}%`,
          background: load > 70 ? '#FF1D6C' : load > 40 ? '#F5A623' : '#4ade80',
        }}
      />
    </div>
  );
}

interface ServiceRow { name: string; status: string; latency: string; uptime: string }
interface AgentRow   { name: string; role: string; status: string; mem: string; uptime: string; load: number }
interface EventRow   { time: string; agent: string; action: string }

export default function StatusPage() {
  const [services, setServices] = useState<ServiceRow[]>(SERVICES_STATIC);
  const [agents]   = useState<AgentRow[]>(AGENTS_STATIC);
  const [events]   = useState<EventRow[]>(EVENTS_STATIC);
  const [live, setLive] = useState(false);

  useEffect(() => {
    fetch('/api/status')
      .then(r => r.json())
      .then((data) => {
        if (data?.services?.length) {
          setServices(data.services.map((s: { name: string; status: string; latencyMs?: number }) => ({
            name:    s.name,
            status:  s.status,
            latency: s.latencyMs ? `${s.latencyMs}ms` : '—',
            uptime:  '—',
          })));
          setLive(true);
        }
      })
      .catch(() => {});
  }, []);

  const allOperational = services.every(s => s.status === 'operational');

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
            <Link href="/status"  className="text-white font-medium">Status</Link>
            <Link href="/about"   className="hover:text-white transition-colors">About</Link>
          </nav>
          <div className="flex items-center gap-3">
            <Link href="/login"  className="text-sm text-gray-400 hover:text-white transition-colors px-3 py-1.5">Log in</Link>
            <Link href="/signup" className="text-sm px-4 py-2 rounded-lg font-medium" style={{ background: '#FF1D6C', color: '#fff' }}>Get started</Link>
          </div>
        </div>
      </header>

      <main className="max-w-6xl mx-auto px-6 py-12 space-y-12">

        {/* overall status */}
        <div className="flex items-center gap-3">
          <span
            className="w-3 h-3 rounded-full"
            style={{
              backgroundColor: allOperational ? '#4ade80' : '#F5A623',
              boxShadow: `0 0 8px ${allOperational ? '#4ade80' : '#F5A623'}`,
            }}
          />
          <span className="text-lg font-semibold text-white">
            {allOperational ? 'All Systems Operational' : 'Partial Degradation'}
          </span>
          {live && <span className="text-xs text-gray-500 ml-2">· live</span>}
        </div>

        {/* services */}
        <section>
          <h2 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Services</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            {services.map((svc, i) => (
              <div
                key={svc.name}
                className="flex items-center justify-between px-6 py-4 text-sm"
                style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
              >
                <div className="flex items-center gap-3">
                  <span
                    className="w-2 h-2 rounded-full shrink-0"
                    style={{
                      backgroundColor: statusColor(svc.status),
                      boxShadow: svc.status === 'operational' ? `0 0 5px ${statusColor(svc.status)}` : 'none',
                    }}
                  />
                  <span className="text-gray-200 font-mono text-xs">{svc.name}</span>
                </div>
                <div className="flex items-center gap-6 text-xs text-gray-500">
                  <span>{svc.latency}</span>
                  <span>{svc.uptime}</span>
                  <span
                    className="capitalize font-medium"
                    style={{ color: statusColor(svc.status) }}
                  >
                    {svc.status}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* agents */}
        <section>
          <h2 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Agent Mesh</h2>
          <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-3">
            {agents.map(agent => (
              <div key={agent.name} className="rounded-xl border border-white/10 bg-white/[0.02] p-4">
                <div className="flex items-center justify-between mb-2">
                  <span className="font-semibold text-white capitalize">{agent.name}</span>
                  <span
                    className="text-xs px-2 py-0.5 rounded-full capitalize"
                    style={{
                      color: agent.status === 'active' ? '#4ade80' : '#737373',
                      background: agent.status === 'active' ? 'rgba(74,222,128,0.1)' : 'rgba(115,115,115,0.1)',
                    }}
                  >
                    {agent.status}
                  </span>
                </div>
                <div className="text-xs text-gray-500 mb-3">{agent.role}</div>
                <div className="flex items-center justify-between text-xs text-gray-600 mb-2">
                  <span>{agent.mem}</span>
                  <span>{agent.uptime}</span>
                </div>
                <LoadBar load={agent.load} />
              </div>
            ))}
          </div>
        </section>

        {/* event log */}
        <section>
          <h2 className="text-sm font-semibold text-white uppercase tracking-widest mb-4">Recent Events</h2>
          <div className="rounded-2xl border border-white/10 overflow-hidden">
            {events.map((ev, i) => (
              <div
                key={i}
                className="flex items-start gap-4 px-6 py-4 text-sm"
                style={{ borderTop: i > 0 ? '1px solid rgba(255,255,255,0.05)' : 'none' }}
              >
                <span className="text-xs text-gray-600 font-mono shrink-0 pt-0.5 w-16">{ev.time}</span>
                <span
                  className="text-xs font-mono shrink-0 pt-0.5 w-16 capitalize"
                  style={{ color: '#9C27B0' }}
                >
                  {ev.agent}
                </span>
                <span className="text-gray-400 text-xs leading-relaxed">{ev.action}</span>
              </div>
            ))}
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
