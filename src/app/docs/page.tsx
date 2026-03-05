"use client";

import { useState } from "react";

const COLORS = ["#FF6B2B", "#FF2255", "#CC00AA", "#8844FF", "#4488FF", "#00D4FF"];
const GRADIENT = `linear-gradient(90deg, ${COLORS.join(", ")})`;

const SIDEBAR_SECTIONS = [
  {
    title: "Getting Started",
    items: [
      { id: "overview",      label: "Overview" },
      { id: "quickstart",    label: "Quickstart" },
      { id: "architecture",  label: "Architecture" },
    ],
  },
  {
    title: "Core Concepts",
    items: [
      { id: "agents",      label: "Agents" },
      { id: "memory",      label: "Memory & PS-SHA∞" },
      { id: "governance",  label: "Governance (Cece)" },
      { id: "mesh",        label: "Mesh Network" },
    ],
  },
  {
    title: "API Reference",
    items: [
      { id: "auth",          label: "Authentication" },
      { id: "agents-api",    label: "Agents API" },
      { id: "memory-api",    label: "Memory API" },
      { id: "governance-api",label: "Governance API" },
      { id: "websockets",    label: "WebSockets" },
    ],
  },
  {
    title: "Frameworks",
    items: [
      { id: "z-framework",     label: "Z-Framework" },
      { id: "pauli-model",     label: "1-2-3-4 Pauli Model" },
      { id: "creative-energy", label: "Creative Energy" },
      { id: "trinary-logic",   label: "Trinary Logic" },
    ],
  },
  {
    title: "Portals",
    items: [
      { id: "roadwork",   label: "RoadWork" },
      { id: "roadview",   label: "RoadView" },
      { id: "roadglitch", label: "RoadGlitch" },
      { id: "cashroad",   label: "CashRoad" },
    ],
  },
];

const CONTENT: Record<string, { title: string; body: React.ReactNode }> = {
  overview: {
    title: "Overview",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          BlackRoad OS is an AI operating system designed to replace fragmented digital infrastructure with a unified,
          agent-powered platform. Built on 317+ equations and five novel frameworks, it handles everything from
          education to finance to social interaction.
        </p>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          At its core, BlackRoad OS consists of persistent AI agents with individual identities, a PS-SHA∞ hash-chain
          memory system, and a governance layer that ensures every decision is auditable and reversible.
        </p>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderLeft: `3px solid ${COLORS[4]}`, borderRadius: "0 8px 8px 0", padding: "14px 18px", margin: "16px 0" }}>
          <div style={{ fontSize: 10, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Note</div>
          <p style={{ fontSize: 13, color: "#737373", lineHeight: 1.6, margin: 0 }}>
            BlackRoad OS is currently in Phase 1 MVP. The API surface is stable but evolving. Pin your SDK version.
          </p>
        </div>
      </div>
    ),
  },
  quickstart: {
    title: "Quickstart",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 20 }}>
          Get up and running with the BlackRoad SDK in under 5 minutes.
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "#d4d4d4", margin: "24px 0 8px" }}>Install the SDK</h3>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 13, color: "#d4d4d4", marginBottom: 16 }}>
          npm install @blackroad/sdk
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "#d4d4d4", margin: "24px 0 8px" }}>Initialize</h3>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4", marginBottom: 16, whiteSpace: "pre" }}>
{`import { BlackRoadClient } from "@blackroad/sdk";

const client = new BlackRoadClient({
  apiKey: process.env.BLACKROAD_API_KEY,
});

const agent = await client.agents.spawn({
  role: "assistant",
  memory: true,
});`}
        </div>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "#d4d4d4", margin: "24px 0 8px" }}>Send a message</h3>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4", whiteSpace: "pre" }}>
{`const response = await agent.chat("Help me understand PS-SHA∞");
console.log(response.content);
// "PS-SHA∞ is a persistent hash-chain memory system..."`}
        </div>
      </div>
    ),
  },
  architecture: {
    title: "Architecture",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          BlackRoad OS is organized into four layers: Gateway, Intelligence, Memory, and Governance.
        </p>
        {[
          { layer: "Gateway", agent: "Alice", desc: "All requests enter through Alice. She routes, authenticates, load-balances, and maintains 2.4k concurrent WebSocket connections." },
          { layer: "Intelligence", agent: "Lucidia", desc: "Lucidia handles all reasoning, generation, and code execution. She maintains context across sessions via PS-SHA∞ commits." },
          { layer: "Memory", agent: "Cecilia", desc: "Cecilia writes every interaction to the PS-SHA∞ chain. No data is ever truly lost — only archived or rotated." },
          { layer: "Governance", agent: "Cece", desc: "Cece evaluates every policy decision. 12,400 evaluations logged. Zero bypasses. Every decision is auditable." },
        ].map((item) => (
          <div key={item.layer} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "16px 18px", marginBottom: 10 }}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: 6 }}>
              <span style={{ fontSize: 14, fontWeight: 600, color: "#d4d4d4" }}>{item.layer}</span>
              <span style={{ fontSize: 11, color: COLORS[2], fontFamily: "'JetBrains Mono', monospace" }}>{item.agent}</span>
            </div>
            <p style={{ fontSize: 13, color: "#525252", lineHeight: 1.5, margin: 0 }}>{item.desc}</p>
          </div>
        ))}
      </div>
    ),
  },
  agents: {
    title: "Agents",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          Agents are persistent, memory-bearing entities with individual identities. Each agent has a name, a role,
          a PS-SHA∞ memory chain, and evolving capabilities.
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "#d4d4d4", margin: "24px 0 12px" }}>Agent lifecycle</h3>
        <div style={{ display: "flex", flexDirection: "column", gap: 8, marginBottom: 16 }}>
          {["spawn → activate → learn → evolve → archive"].map((s) => (
            <div key={s} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 6, padding: "10px 14px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: COLORS[4] }}>
              {s}
            </div>
          ))}
        </div>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderLeft: `3px solid ${COLORS[0]}`, borderRadius: "0 8px 8px 0", padding: "14px 18px", margin: "16px 0" }}>
          <div style={{ fontSize: 10, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Tip</div>
          <p style={{ fontSize: 13, color: "#737373", lineHeight: 1.6, margin: 0 }}>
            Agents retain memory across sessions by default. Set <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4", background: "#141414", padding: "2px 6px", borderRadius: 4 }}>memory: false</code> for stateless agents.
          </p>
        </div>
      </div>
    ),
  },
  memory: {
    title: "Memory & PS-SHA∞",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          PS-SHA∞ (Persistent State Secure Hash, Infinite) is BlackRoad&apos;s hash-chain memory system. Every interaction
          is committed as a cryptographically-linked entry. Nothing is lost. Everything is verifiable.
        </p>
        <h3 style={{ fontSize: 17, fontWeight: 600, color: "#d4d4d4", margin: "24px 0 8px" }}>How it works</h3>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4", marginBottom: 16, whiteSpace: "pre" }}>
{`commit = {
  seq: 4821,
  hash: sha256(prev_hash + content),
  agent: "cecilia",
  timestamp: ISO8601,
  content: encrypted_payload,
}`}
        </div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7 }}>
          Each commit references the previous hash, forming an immutable chain. Tampering with any entry invalidates
          all subsequent entries — making the ledger self-auditing.
        </p>
      </div>
    ),
  },
  governance: {
    title: "Governance (Cece)",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          Cece is the governance agent. Every policy decision, scope assignment, and permission elevation flows through
          Cece&apos;s evaluation engine. All decisions are logged to the audit ledger.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 10, marginBottom: 16 }}>
          {[
            { label: "Total evaluations", value: "12,400+" },
            { label: "Policy bypasses", value: "0" },
            { label: "Audit entries", value: "48,200+" },
            { label: "Ledger integrity", value: "100%" },
          ].map((stat) => (
            <div key={stat.label} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 20, fontWeight: 700, color: COLORS[3], letterSpacing: "-0.02em" }}>{stat.value}</div>
              <div style={{ fontSize: 11, color: "#525252", marginTop: 2 }}>{stat.label}</div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  mesh: {
    title: "Mesh Network",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          The BlackRoad mesh network connects all agents, services, and Pi nodes into a unified compute fabric.
          Traffic is routed through Alice&apos;s gateway and distributed across nodes based on load.
        </p>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "14px 16px", marginBottom: 16 }}>
          {[
            { name: "mesh.blackroad.network", latency: "22ms", uptime: "99.95%" },
            { name: "mesh.na1", latency: "18ms", uptime: "99.97%" },
            { name: "mesh.eu1", latency: "31ms", uptime: "99.93%" },
          ].map((node) => (
            <div key={node.name} style={{ display: "flex", justifyContent: "space-between", padding: "6px 0", borderBottom: "1px solid #111", fontSize: 12 }}>
              <span style={{ color: "#a3a3a3", fontFamily: "'JetBrains Mono', monospace" }}>{node.name}</span>
              <span style={{ color: "#525252" }}>{node.latency} · {node.uptime}</span>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  auth: {
    title: "Authentication",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          All API requests require a Bearer token passed in the <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4", background: "#141414", padding: "2px 6px", borderRadius: 4 }}>Authorization</code> header.
        </p>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4", marginBottom: 16, whiteSpace: "pre" }}>
{`Authorization: Bearer br_live_xxxxxxxxxxxxxxxxxx`}
        </div>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderLeft: `3px solid ${COLORS[1]}`, borderRadius: "0 8px 8px 0", padding: "14px 18px" }}>
          <div style={{ fontSize: 10, color: "#525252", textTransform: "uppercase", letterSpacing: "0.08em", marginBottom: 6 }}>Warning</div>
          <p style={{ fontSize: 13, color: "#737373", lineHeight: 1.6, margin: 0 }}>
            Never expose API keys in client-side code. Use environment variables and server-side proxies.
          </p>
        </div>
      </div>
    ),
  },
  "agents-api": {
    title: "Agents API",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          The Agents API allows you to spawn, query, and interact with persistent AI agents.
        </p>
        {[
          { method: "POST",   path: "/v1/agents",          desc: "Spawn a new agent" },
          { method: "GET",    path: "/v1/agents",          desc: "List all agents" },
          { method: "GET",    path: "/v1/agents/:id",      desc: "Get agent details" },
          { method: "POST",   path: "/v1/agents/:id/chat", desc: "Send a message" },
          { method: "DELETE", path: "/v1/agents/:id",      desc: "Archive an agent" },
        ].map((ep) => (
          <div key={ep.path + ep.method} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #141414", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500, color: "#a3a3a3", background: "#1a1a1a", padding: "3px 8px", borderRadius: 4, flexShrink: 0 }}>{ep.method}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4" }}>{ep.path}</span>
            <span style={{ fontSize: 12, color: "#404040", marginLeft: "auto" }}>{ep.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  "memory-api": {
    title: "Memory API",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          Query and inspect PS-SHA∞ memory commits for any agent.
        </p>
        {[
          { method: "GET",  path: "/v1/memory/:agentId",       desc: "List commits" },
          { method: "GET",  path: "/v1/memory/:agentId/:seq",  desc: "Get specific commit" },
          { method: "POST", path: "/v1/memory/:agentId/verify",desc: "Verify chain integrity" },
        ].map((ep) => (
          <div key={ep.path} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #141414", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500, color: "#a3a3a3", background: "#1a1a1a", padding: "3px 8px", borderRadius: 4, flexShrink: 0 }}>{ep.method}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4" }}>{ep.path}</span>
            <span style={{ fontSize: 12, color: "#404040", marginLeft: "auto" }}>{ep.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  "governance-api": {
    title: "Governance API",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          Access Cece&apos;s governance engine to query policy evaluations, audit logs, and scope assignments.
        </p>
        {[
          { method: "GET",  path: "/v1/governance/policies",          desc: "List active policies" },
          { method: "POST", path: "/v1/governance/evaluate",           desc: "Evaluate a policy" },
          { method: "GET",  path: "/v1/governance/audit",              desc: "Query audit log" },
          { method: "GET",  path: "/v1/governance/ledger/verify",      desc: "Verify ledger integrity" },
        ].map((ep) => (
          <div key={ep.path} style={{ display: "flex", alignItems: "center", gap: 10, padding: "10px 0", borderBottom: "1px solid #141414", flexWrap: "wrap" }}>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 10, fontWeight: 500, color: "#a3a3a3", background: "#1a1a1a", padding: "3px 8px", borderRadius: 4, flexShrink: 0 }}>{ep.method}</span>
            <span style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4" }}>{ep.path}</span>
            <span style={{ fontSize: 12, color: "#404040", marginLeft: "auto" }}>{ep.desc}</span>
          </div>
        ))}
      </div>
    ),
  },
  websockets: {
    title: "WebSockets",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          Real-time communication with agents via WebSocket at <code style={{ fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4", background: "#141414", padding: "2px 6px", borderRadius: 4 }}>wss://ws.blackroad.io/v1</code>.
        </p>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "14px 16px", fontFamily: "'JetBrains Mono', monospace", fontSize: 12, color: "#d4d4d4", marginBottom: 16, whiteSpace: "pre" }}>
{`const ws = new WebSocket("wss://ws.blackroad.io/v1");
ws.send(JSON.stringify({
  type: "auth",
  token: "br_live_xxx",
}));
ws.send(JSON.stringify({
  type: "chat",
  agentId: "lucidia",
  content: "Hello",
}));`}
        </div>
      </div>
    ),
  },
  "z-framework": {
    title: "Z-Framework",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          The Z-Framework models creative energy as a function of tension and contradictions. Rather than resolving
          contradictions, the framework harnesses them as generative force.
        </p>
        <div style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "16px", marginBottom: 16, textAlign: "center" }}>
          <div style={{ fontSize: 18, fontFamily: "'JetBrains Mono', monospace", color: "#d4d4d4" }}>
            K(t) = C(t) · e<sup style={{ fontSize: 12 }}>λ|δ_t|</sup>
          </div>
          <p style={{ fontSize: 12, color: "#525252", marginTop: 8 }}>Creative energy scales super-linearly with contradiction magnitude</p>
        </div>
      </div>
    ),
  },
  "pauli-model": {
    title: "1-2-3-4 Pauli Model",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          The 1-2-3-4 Pauli Model maps quantum spin principles to agent coordination. Four agent types correspond
          to four quantum states, enabling stable multi-agent entanglement.
        </p>
        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: 8 }}>
          {[
            { state: "1 (spin-up)",   role: "Initiator",   desc: "Creates new threads and goals" },
            { state: "2 (spin-down)", role: "Executor",    desc: "Carries out defined tasks" },
            { state: "3 (superpose)", role: "Synthesizer", desc: "Merges and reconciles outputs" },
            { state: "4 (entangled)", role: "Coordinator", desc: "Manages multi-agent coherence" },
          ].map((item) => (
            <div key={item.state} style={{ background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ fontSize: 11, color: COLORS[3], fontFamily: "'JetBrains Mono', monospace", marginBottom: 4 }}>{item.state}</div>
              <div style={{ fontSize: 13, fontWeight: 600, color: "#d4d4d4", marginBottom: 4 }}>{item.role}</div>
              <p style={{ fontSize: 12, color: "#525252", margin: 0 }}>{item.desc}</p>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  "creative-energy": {
    title: "Creative Energy",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          Creative Energy theory posits that productive tension between opposing forces is the primary driver of
          innovation. BlackRoad OS is designed to maximize productive tension across all subsystems.
        </p>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7 }}>
          The system monitors contradiction density (δ_t) across the mesh and routes high-tension problems to
          agents with the highest creative energy potential.
        </p>
      </div>
    ),
  },
  "trinary-logic": {
    title: "Trinary Logic",
    body: (
      <div>
        <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7, marginBottom: 16 }}>
          BlackRoad OS uses a trinary logic system (Greenlight / Yellowlight / Redlight) instead of binary
          true/false. This allows for nuanced policy evaluation and graduated responses.
        </p>
        <div style={{ display: "flex", flexDirection: "column", gap: 8 }}>
          {[
            { state: "Greenlight", color: "#4CAF50", desc: "Proceed — action is approved and within policy" },
            { state: "Yellowlight", color: "#FF9800", desc: "Caution — action requires additional review or context" },
            { state: "Redlight", color: COLORS[1], desc: "Stop — action violates policy or requires escalation" },
          ].map((item) => (
            <div key={item.state} style={{ display: "flex", gap: 12, alignItems: "center", background: "#0a0a0a", border: "1px solid #1a1a1a", borderRadius: 8, padding: "12px 14px" }}>
              <div style={{ width: 10, height: 10, borderRadius: "50%", background: item.color, flexShrink: 0 }} />
              <div>
                <div style={{ fontSize: 13, fontWeight: 600, color: "#d4d4d4" }}>{item.state}</div>
                <p style={{ fontSize: 12, color: "#525252", margin: 0 }}>{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    ),
  },
  roadwork: { title: "RoadWork", body: <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7 }}>RoadWork is the education portal — AI tutoring that adapts to how you actually learn. K-12 curriculum with Lucidia as your personal tutor. Outcome-based pricing for institutions.</p> },
  roadview:  { title: "RoadView",  body: <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7 }}>RoadView is the search portal — every result scored for confidence, not clicks. No SEO gaming. No ad-driven rankings. Only verified facts surface.</p> },
  roadglitch:{ title: "RoadGlitch", body: <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7 }}>RoadGlitch is the automation portal — drag-and-drop workflow builder that generates production code in your style. Connect any API, trigger any event, deploy anywhere.</p> },
  cashroad:  { title: "CashRoad",  body: <p style={{ fontSize: 14, color: "#737373", lineHeight: 1.7 }}>CashRoad is the financial portal — decision-time assistance, not post-spending shame. Tracks cash flow, flags risks, and suggests optimizations without judgment.</p> },
};

function GradientBar({ height = 1 }: { height?: number }) {
  return <div style={{ height, background: GRADIENT }} />;
}

export default function DocsPage() {
  const [active, setActive] = useState("overview");
  const doc = CONTENT[active] ?? CONTENT["overview"];

  return (
    <div style={{ background: "#000", minHeight: "100vh", color: "#fff", fontFamily: "Inter, -apple-system, sans-serif", display: "flex", flexDirection: "column" }}>
      <GradientBar height={3} />

      <div style={{ display: "flex", flex: 1, maxWidth: 1200, margin: "0 auto", width: "100%" }}>
        {/* Sidebar */}
        <div style={{
          width: 220, flexShrink: 0, padding: "32px 0 32px 24px",
          borderRight: "1px solid #111", position: "sticky", top: 52, height: "calc(100vh - 52px)", overflowY: "auto",
        }}>
          {SIDEBAR_SECTIONS.map((section) => (
            <div key={section.title} style={{ marginBottom: 24 }}>
              <div style={{ fontSize: 10, color: "#404040", textTransform: "uppercase", letterSpacing: "0.1em", marginBottom: 6, paddingLeft: 8 }}>
                {section.title}
              </div>
              {section.items.map((item) => (
                <button
                  key={item.id}
                  onClick={() => setActive(item.id)}
                  style={{
                    display: "block", width: "100%", textAlign: "left",
                    padding: "5px 8px", borderRadius: 5, border: "none",
                    background: active === item.id ? "#1a1a1a" : "transparent",
                    color: active === item.id ? "#f5f5f5" : "#525252",
                    fontSize: 13, cursor: "pointer", marginBottom: 1,
                    transition: "color 0.1s",
                  }}
                >
                  {item.label}
                </button>
              ))}
            </div>
          ))}
        </div>

        {/* Content */}
        <div style={{ flex: 1, padding: "40px 48px", maxWidth: 720 }}>
          <h1 style={{ fontSize: "clamp(24px, 4vw, 32px)", fontWeight: 700, color: "#f5f5f5", letterSpacing: "-0.02em", margin: "0 0 20px" }}>
            {doc.title}
          </h1>
          <div style={{ height: 2, background: GRADIENT, borderRadius: 1, marginBottom: 28 }} />
          {doc.body}
        </div>
      </div>
    </div>
  );
}
