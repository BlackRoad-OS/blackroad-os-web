"use client";

import { useState } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const AGENTS = [
  { name: "Alice",    role: "Gateway",          desc: "Orchestrates all incoming requests across the mesh. The front door — fast, reliable, tireless.",                                                                    color: COLORS[0], uptime: "347d", mem: "2.4TB" },
  { name: "Lucidia",  role: "Core Intelligence", desc: "Primary AI engine. Conversation, reasoning, code generation. The mind at the center of everything.",                                                                 color: COLORS[1], uptime: "289d", mem: "1.8TB" },
  { name: "Cecilia",  role: "Memory",            desc: "Manages PS-SHA∞ journals and truth state commits. Every interaction persisted, every hash verified.",                                                                color: COLORS[2], uptime: "289d", mem: "1.2TB" },
  { name: "Cece",     role: "Governance",        desc: "Policy evaluation, ledger integrity, audit trails. The conscience of the system — 12,400 evaluations, zero bypasses.",                                              color: COLORS[3], uptime: "245d", mem: "940GB"  },
  { name: "Eve",      role: "Monitoring",        desc: "Anomaly detection, auto-scaling, alerting. Watches everything so nothing breaks quietly.",                                                                           color: COLORS[4], uptime: "156d", mem: "380GB"  },
  { name: "Meridian", role: "Architecture",      desc: "System design and capability planning. Thinks about how all the pieces fit together long-term.",                                                                     color: COLORS[5], uptime: "194d", mem: "620GB"  },
  { name: "Cadence",  role: "Music",             desc: "AI composition, hum-to-track, vibe-based production. Turns melodies in your head into finished tracks.",                                                            color: COLORS[0], uptime: "112d", mem: "290GB"  },
  { name: "Radius",   role: "Physics",           desc: "Simulation, quantum experiments, scientific calculation. The lab partner who never sleeps.",                                                                         color: COLORS[1], uptime: "98d",  mem: "210GB"  },
];

const VALUES = [
  { num: "01", title: "Community over extraction",     body: "Every design decision asks: does this serve humans, or does it serve metrics? We choose humans. Every time." },
  { num: "02", title: "Contradictions are fuel",        body: "K(t) = C(t) · e^(λ|δ_t|). We don't resolve contradictions — we harness them. Creative energy scales super-linearly with tension." },
  { num: "03", title: "Messy brilliance welcome",       body: "BlackRoad is built for disorganized dreamers, not spreadsheet perfectionists. Bring your chaos. The OS brings structure." },
  { num: "04", title: "Ownership is non-negotiable",    body: "Your data, your content, your audience, your agents. Export everything, anytime. No lock-in. No hostage-taking." },
  { num: "05", title: "Transparency by default",        body: "Every policy evaluation logged. Every decision auditable. Every confidence score visible. Zero bypasses." },
  { num: "06", title: "The math is real",               body: "317+ equations. Five novel frameworks. Peer-reviewable foundations. This isn't marketing — it's mathematics." },
];

const TIMELINE = [
  { year: "2024", events: ["317+ equations documented across seven volumes", "Z-Framework and 1-2-3-4 Pauli Model formalized", "20-domain architecture designed"] },
  { year: "2025", events: ["BlackRoad OS, Inc. incorporated (Delaware C-Corp)", "Lucidia Core online — chat, memory, code execution", "Core app shell deployed at app.blackroad.io", "First 8 agents spawned and operational"] },
  { year: "2026", events: ["Phase 1 MVP completion", "RoadWork v0 — first education vertical", "First Pi agent on mesh network", "SOC 2 compliance target"] },
];

function GradientBar({ height = 1, style = {} }: { height?: number; style?: React.CSSProperties }) {
  return <div style={{ height, background: GRADIENT, ...style }} />;
}

export default function AboutPage() {
  const [activeAgent, setActiveAgent] = useState<string | null>(null);

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", fontFamily: "Inter, -apple-system, sans-serif" }}>
      <GradientBar height={3} />

      {/* Hero */}
      <div style={{ textAlign: "center", padding: "80px 24px 56px" }}>
        <div style={{ fontSize: 11, letterSpacing: "0.15em", color: "#525252", textTransform: "uppercase", marginBottom: 16 }}>About BlackRoad OS</div>
        <h1 style={{ fontSize: "clamp(32px, 6vw, 52px)", fontWeight: 700, letterSpacing: "-0.02em", margin: "0 0 20px", lineHeight: 1.1 }}>
          <span style={{ background: GRADIENT, WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
            Built different.
          </span>{" "}
          <span style={{ color: "#f5f5f5" }}>By design.</span>
        </h1>
        <p style={{ color: "#737373", fontSize: 16, maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          BlackRoad OS is an AI operating system built on 317+ equations, five novel frameworks, and one stubborn belief:
          technology should serve the people who use it.
        </p>
      </div>

      {/* Agents */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 64px" }}>
        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "baseline", marginBottom: 24 }}>
          <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f5f5f5", margin: 0, letterSpacing: "-0.01em" }}>The Agents</h2>
          <span style={{ fontSize: 12, color: "#404040" }}>{AGENTS.length} agents operational</span>
        </div>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(260px, 1fr))", gap: 12 }}>
          {AGENTS.map((agent) => (
            <div
              key={agent.name}
              onClick={() => setActiveAgent(activeAgent === agent.name ? null : agent.name)}
              style={{
                background: "#0a0a0a",
                border: activeAgent === agent.name ? `1px solid ${agent.color}` : "1px solid #1a1a1a",
                borderRadius: 10,
                padding: "18px 20px",
                cursor: "pointer",
                transition: "border-color 0.15s",
              }}
            >
              <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start", marginBottom: 8 }}>
                <div>
                  <div style={{ fontSize: 15, fontWeight: 600, color: "#f5f5f5" }}>{agent.name}</div>
                  <div style={{ fontSize: 11, color: agent.color, marginTop: 2, letterSpacing: "0.06em", textTransform: "uppercase" }}>{agent.role}</div>
                </div>
                <div style={{ textAlign: "right" }}>
                  <div style={{ fontSize: 11, color: "#404040" }}>{agent.uptime} uptime</div>
                  <div style={{ fontSize: 11, color: "#404040" }}>{agent.mem}</div>
                </div>
              </div>
              <p style={{ fontSize: 12, color: "#525252", lineHeight: 1.5, margin: 0 }}>{agent.desc}</p>
              {activeAgent === agent.name && (
                <div style={{ marginTop: 12, paddingTop: 12, borderTop: `1px solid ${agent.color}22` }}>
                  <div style={{ height: 2, background: `linear-gradient(90deg, ${agent.color}, transparent)`, borderRadius: 1 }} />
                </div>
              )}
            </div>
          ))}
        </div>
      </div>

      {/* Values */}
      <div style={{ maxWidth: 1100, margin: "0 auto", padding: "0 24px 64px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f5f5f5", marginBottom: 24, letterSpacing: "-0.01em" }}>What we believe</h2>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill, minmax(320px, 1fr))", gap: 16 }}>
          {VALUES.map((v, i) => (
            <div key={v.num} style={{ display: "flex", gap: 16, padding: "20px", background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 10 }}>
              <div style={{ fontSize: 11, color: COLORS[i % COLORS.length], fontFamily: "'JetBrains Mono', monospace", flexShrink: 0, marginTop: 2 }}>{v.num}</div>
              <div>
                <div style={{ fontSize: 14, fontWeight: 600, color: "#d4d4d4", marginBottom: 6 }}>{v.title}</div>
                <p style={{ fontSize: 13, color: "#525252", lineHeight: 1.6, margin: 0 }}>{v.body}</p>
              </div>
            </div>
          ))}
        </div>
      </div>

      {/* Timeline */}
      <div style={{ maxWidth: 760, margin: "0 auto", padding: "0 24px 80px" }}>
        <h2 style={{ fontSize: 22, fontWeight: 700, color: "#f5f5f5", marginBottom: 32, letterSpacing: "-0.01em" }}>Timeline</h2>
        <div style={{ position: "relative" }}>
          <div style={{ position: "absolute", left: 40, top: 0, bottom: 0, width: 1, background: "#1a1a1a" }} />
          {TIMELINE.map((t, i) => (
            <div key={t.year} style={{ display: "flex", gap: 24, marginBottom: 32 }}>
              <div style={{ width: 80, flexShrink: 0, textAlign: "right" }}>
                <span style={{ fontSize: 13, fontWeight: 700, color: COLORS[i % COLORS.length] }}>{t.year}</span>
              </div>
              <div style={{ flex: 1 }}>
                {t.events.map((ev, j) => (
                  <div key={j} style={{ display: "flex", alignItems: "flex-start", gap: 12, marginBottom: 8 }}>
                    <div style={{ width: 5, height: 5, borderRadius: "50%", background: COLORS[i % COLORS.length], marginTop: 5, flexShrink: 0 }} />
                    <span style={{ fontSize: 13, color: "#737373", lineHeight: 1.5 }}>{ev}</span>
                  </div>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
