"use client";
import { useEffect, useState } from "react";

interface PiNode {
  hostname: string; ip: string; role: "primary" | "secondary" | "backup";
  agent_capacity: number; agents_active: number;
  services: string[]; tunnel_active: boolean;
  ollama_models: string[]; uptime_pct: number;
}

const PI_NODES: PiNode[] = [
  { hostname: "aria64",     ip: "192.168.4.38", role: "primary",   agent_capacity: 22500, agents_active: 0,
    services: ["ollama", "agent-runtime", "cloudflared"], tunnel_active: true,
    ollama_models: ["qwen2.5:7b", "deepseek-r1:7b"], uptime_pct: 99.9 },
  { hostname: "blackroad-pi", ip: "192.168.4.64", role: "secondary", agent_capacity: 7500, agents_active: 0,
    services: ["ollama", "agent-runtime"], tunnel_active: false,
    ollama_models: ["llama3.2:3b"], uptime_pct: 99.5 },
  { hostname: "lucidia",    ip: "192.168.4.99", role: "backup",   agent_capacity: 0, agents_active: 0,
    services: ["agent-runtime"], tunnel_active: false,
    ollama_models: [], uptime_pct: 98.2 },
];

const ROLE_COLOR: Record<string, string> = {
  primary: "text-green-400 border-green-700", secondary: "text-blue-400 border-blue-700",
  backup: "text-zinc-400 border-zinc-700",
};

function PingDot({ active }: { active: boolean }) {
  return (
    <span className="relative inline-flex h-2.5 w-2.5">
      {active && <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-green-400 opacity-75" />}
      <span className={`relative inline-flex rounded-full h-2.5 w-2.5 ${active ? "bg-green-400" : "bg-zinc-600"}`} />
    </span>
  );
}

export default function FleetPage() {
  const [nodes, setNodes] = useState(PI_NODES);
  const [reachable, setReachable] = useState<Record<string, boolean>>({});

  useEffect(() => {
    // Poll /api/fleet for live status
    const poll = async () => {
      try {
        const r = await fetch("/api/fleet");
        if (r.ok) {
          const data = await r.json();
          setNodes(data.nodes ?? PI_NODES);
          setReachable(data.reachable ?? {});
        }
      } catch {}
    };
    poll();
    const id = setInterval(poll, 15_000);
    return () => clearInterval(id);
  }, []);

  const totalCapacity = nodes.reduce((s, n) => s + n.agent_capacity, 0);
  const totalActive = nodes.reduce((s, n) => s + n.agents_active, 0);

  return (
    <div className="p-6 max-w-5xl mx-auto space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">Pi Fleet</h1>
        <p className="text-sm text-zinc-400 mt-1">
          {nodes.length} nodes · {totalCapacity.toLocaleString()} agent capacity · {totalActive.toLocaleString()} active
        </p>
      </div>

      {/* Summary cards */}
      <div className="grid grid-cols-3 gap-4">
        {[
          { label: "Total Capacity", value: totalCapacity.toLocaleString(), sub: "agents" },
          { label: "Active Agents", value: totalActive.toLocaleString(), sub: "running" },
          { label: "Fleet Health", value: `${Math.round(nodes.reduce((s,n)=>s+n.uptime_pct,0)/nodes.length)}%`, sub: "avg uptime" },
        ].map(({ label, value, sub }) => (
          <div key={label} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4">
            <p className="text-xs text-zinc-500 uppercase tracking-wider">{label}</p>
            <p className="text-2xl font-bold text-white mt-1">{value}</p>
            <p className="text-xs text-zinc-500">{sub}</p>
          </div>
        ))}
      </div>

      {/* Node cards */}
      <div className="space-y-4">
        {nodes.map((node) => (
          <div key={node.hostname} className={`bg-zinc-900 border rounded-xl p-5 ${ROLE_COLOR[node.role].split(" ")[1]}`}>
            <div className="flex items-start justify-between">
              <div>
                <div className="flex items-center gap-3">
                  <PingDot active={reachable[node.ip] !== false} />
                  <h3 className="text-white font-bold font-mono text-lg">{node.hostname}</h3>
                  <span className={`text-xs uppercase font-semibold px-2 py-0.5 rounded-full border ${ROLE_COLOR[node.role]}`}>
                    {node.role}
                  </span>
                </div>
                <p className="text-zinc-400 font-mono text-sm mt-1">{node.ip}</p>
              </div>
              <div className="text-right">
                <p className="text-white text-lg font-bold">{node.agent_capacity.toLocaleString()}</p>
                <p className="text-zinc-500 text-xs">agent capacity</p>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-4 text-sm">
              <div>
                <p className="text-zinc-500 text-xs uppercase mb-2">Services</p>
                <div className="flex flex-wrap gap-1">
                  {node.services.map((s) => (
                    <span key={s} className="bg-zinc-800 text-zinc-300 text-xs px-2 py-0.5 rounded font-mono">{s}</span>
                  ))}
                </div>
              </div>
              <div>
                <p className="text-zinc-500 text-xs uppercase mb-2">Ollama Models</p>
                <div className="flex flex-wrap gap-1">
                  {node.ollama_models.length > 0
                    ? node.ollama_models.map((m) => (
                        <span key={m} className="bg-violet-900/40 text-violet-300 text-xs px-2 py-0.5 rounded font-mono">{m}</span>
                      ))
                    : <span className="text-zinc-600 text-xs">None configured</span>}
                </div>
              </div>
            </div>

            <div className="mt-3 flex items-center gap-4 text-xs text-zinc-500">
              <span>Uptime: <strong className="text-white">{node.uptime_pct}%</strong></span>
              {node.tunnel_active && <span className="text-cyan-400">⚡ Cloudflare Tunnel active</span>}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
