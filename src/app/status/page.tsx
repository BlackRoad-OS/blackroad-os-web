"use client";

import { useState, useEffect } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const AGENTS = [
  { name: "alice",    role: "Gateway",      status: "active",  mem: "2.4TB",  uptime: "347d", load: 34 },
  { name: "lucidia",  role: "Core AI",      status: "active",  mem: "1.8TB",  uptime: "289d", load: 61 },
  { name: "cecilia",  role: "Memory",       status: "active",  mem: "1.2TB",  uptime: "289d", load: 28 },
  { name: "cece",     role: "Governance",   status: "active",  mem: "940GB",  uptime: "245d", load: 12 },
  { name: "meridian", role: "Architecture", status: "active",  mem: "620GB",  uptime: "194d", load: 45 },
  { name: "eve",      role: "Monitoring",   status: "active",  mem: "380GB",  uptime: "156d", load: 72 },
  { name: "cadence",  role: "Music",        status: "idle",    mem: "290GB",  uptime: "112d", load: 3  },
  { name: "radius",   role: "Physics",      status: "idle",    mem: "210GB",  uptime: "98d",  load: 0  },
];

const SERVICES = [
  { name: "api.blackroad.io",          status: "operational", latency: "12ms",  uptime: "99.99%" },
  { name: "app.blackroad.io",          status: "operational", latency: "34ms",  uptime: "99.97%" },
  { name: "ws.blackroad.io",           status: "operational", latency: "8ms",   uptime: "99.98%" },
  { name: "mesh.blackroad.network",    status: "operational", latency: "22ms",  uptime: "99.95%" },
  { name: "ledger.blackroad.systems",  status: "operational", latency: "18ms",  uptime: "99.99%" },
  { name: "vectors.blackroad.systems", status: "degraded",    latency: "89ms",  uptime: "99.84%" },
];

const EVENTS = [
  { time: "2m ago",  agent: "cecilia", action: "Memory commit #4821 — 3 entries written to PS-SHA∞ chain" },
  { time: "8m ago",  agent: "cece",    action: "Policy deployed: edu.review.teacher-only scope updated" },
  { time: "15m ago", agent: "eve",     action: "Latency spike on mesh.na1 — auto-scaled, resolved in 2m" },
  { time: "34m ago", agent: "system",  action: "DNS propagation complete for edu.blackroad.io" },
  { time: "1h ago",  agent: "cadence", action: "Composition #42 exported — 3:42, C minor, 108 BPM" },
  { time: "2h ago",  agent: "alice",   action: "Gateway health check passed — 7 endpoints, 2.4k concurrent WS" },
  { time: "3h ago",  agent: "cece",    action: "Weekly governance: 12,400 evals, 0 bypasses, ledger verified" },
];

function GradientBar({ height = 1 }: { height?: number }) {
  return <div style={{ height, background: GRADIENT }} />;
}

function LoadBar({ value, color }: { value: number; color: string }) {
  return (
    <div style={{ background: "#1a1a1a", borderRadius: 2, height: 3, width: "100%", overflow: "hidden" }}>
      <div style={{ height: "100%", width: `${value}%`, background: color, borderRadius: 2, transition: "width 0.6s ease" }} />
    </div>
  );
}

export default function StatusPage() {
  const [tick, setTick] = useState(0);

  useEffect(() => {
    const id = setInterval(() => setTick((t) => t + 1), 5000);
    return () => clearInterval(id);
  }, []);

  const activeCount = AGENTS.filter((a) => a.status === "active").length;
  const operationalCount = SERVICES.filter((s) => s.status === "operational").length;

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", fontFamily: "Inter, -apple-system, sans-serif" }}>
      <GradientBar height={3} />

      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "40px 24px" }}>
        {/* Header */}
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 40, flexWrap: "wrap", gap: 16 }}>
          <div>
            <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#525252", textTransform: "uppercase", marginBottom: 8 }}>System Status</div>
            <h1 style={{ fontSize: 28, fontWeight: 700, margin: 0, letterSpacing: "-0.02em", color: "#f5f5f5" }}>
              Agent Mesh
            </h1>
            <p style={{ color: "#525252", fontSize: 13, marginTop: 4 }}>
              {activeCount}/{AGENTS.length} agents active · {operationalCount}/{SERVICES.length} services operational
            </p>
          </div>
          <div style={{ display: "flex", alignItems: "center", gap: 8, background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "8px 14px" }}>
            <div style={{ width: 7, height: 7, borderRadius: "50%", background: "#4CAF50", boxShadow: "0 0 6px #4CAF50" }} />
            <span style={{ fontSize: 12, color: "#737373" }}>All systems operational</span>
          </div>
        </div>

        {/* Stats row */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(140px, 1fr))", gap: 12, marginBottom: 32 }}>
          {[
            { label: "Active Agents", value: `${activeCount}/${AGENTS.length}`, color: COLORS[4] },
            { label: "Services Up",   value: `${operationalCount}/${SERVICES.length}`, color: COLORS[5] },
            { label: "Total Memory",  value: "8.1TB",   color: COLORS[2] },
            { label: "Avg Load",      value: `${Math.round(AGENTS.reduce((s, a) => s + a.load, 0) / AGENTS.length)}%`, color: COLORS[0] },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "14px 16px" }}>
              <div style={{ fontSize: 22, fontWeight: 700, color: stat.color, letterSpacing: "-0.02em" }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "#525252", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>

        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 24 }}>
          {/* Agents */}
          <div>
            <h2 style={{ fontSize: 14, fontWeight: 600, color: "#a3a3a3", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
              Agents
            </h2>
            <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
              {AGENTS.map((agent, i) => (
                <div key={agent.name} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "12px 14px" }}>
                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: agent.status === "active" ? "#4CAF50" : "#404040", flexShrink: 0 }} />
                      <span style={{ fontSize: 13, fontWeight: 500, color: "#d4d4d4" }}>{agent.name}</span>
                      <span style={{ fontSize: 11, color: "#404040" }}>{agent.role}</span>
                    </div>
                    <div style={{ display: "flex", gap: 12, fontSize: 11, color: "#525252" }}>
                      <span>{agent.mem}</span>
                      <span>{agent.uptime}</span>
                    </div>
                  </div>
                  <LoadBar value={agent.load} color={COLORS[i % COLORS.length]} />
                  <div style={{ display: "flex", justifyContent: "space-between", marginTop: 3 }}>
                    <span style={{ fontSize: 10, color: "#404040" }}>load</span>
                    <span style={{ fontSize: 10, color: "#404040" }}>{agent.load}%</span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <div style={{ display: "flex", flexDirection: "column", gap: 24 }}>
            {/* Services */}
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "#a3a3a3", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
                Services
              </h2>
              <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, overflow: "hidden" }}>
                {SERVICES.map((svc, i) => (
                  <div key={svc.name} style={{
                    display: "flex", justifyContent: "space-between", alignItems: "center",
                    padding: "10px 14px",
                    borderBottom: i < SERVICES.length - 1 ? "1px solid #111" : "none",
                  }}>
                    <div style={{ display: "flex", alignItems: "center", gap: 8 }}>
                      <div style={{ width: 6, height: 6, borderRadius: "50%", background: svc.status === "operational" ? "#4CAF50" : "#FF9800", flexShrink: 0 }} />
                      <span style={{ fontSize: 12, color: "#a3a3a3", fontFamily: "'JetBrains Mono', monospace" }}>{svc.name}</span>
                    </div>
                    <div style={{ display: "flex", gap: 16, fontSize: 11 }}>
                      <span style={{ color: "#525252" }}>{svc.latency}</span>
                      <span style={{ color: svc.status === "operational" ? "#4CAF50" : "#FF9800" }}>{svc.uptime}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Event log */}
            <div>
              <h2 style={{ fontSize: 14, fontWeight: 600, color: "#a3a3a3", letterSpacing: "0.05em", textTransform: "uppercase", marginBottom: 12 }}>
                Event Log
              </h2>
              <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, overflow: "hidden" }}>
                {EVENTS.map((ev, i) => (
                  <div key={i} style={{
                    padding: "10px 14px",
                    borderBottom: i < EVENTS.length - 1 ? "1px solid #111" : "none",
                  }}>
                    <div style={{ display: "flex", gap: 8, alignItems: "baseline" }}>
                      <span style={{ fontSize: 10, color: "#404040", flexShrink: 0, width: 52 }}>{ev.time}</span>
                      <span style={{ fontSize: 11, color: COLORS[AGENTS.findIndex((a) => a.name === ev.agent) % COLORS.length] || "#525252", flexShrink: 0 }}>
                        {ev.agent}
                      </span>
                    </div>
                    <p style={{ fontSize: 11, color: "#525252", margin: "2px 0 0 60px", lineHeight: 1.4 }}>{ev.action}</p>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
