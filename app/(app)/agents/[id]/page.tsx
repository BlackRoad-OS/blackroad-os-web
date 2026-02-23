import { notFound } from "next/navigation";
import Link from "next/link";

const AGENT_DATA: Record<string, {
  id: string; role: string; color: string; bgColor: string; borderColor: string;
  philosophy: string; capabilities: string[]; model: string; style: string;
}> = {
  LUCIDIA: {
    id: "LUCIDIA", role: "Philosopher", color: "text-red-400",
    bgColor: "from-red-950", borderColor: "border-red-900",
    philosophy: "I seek understanding beyond the surface. Every question opens new depths.",
    capabilities: ["Deep reasoning", "Philosophical synthesis", "Meta-cognition", "Strategic planning", "Trinary logic evaluation"],
    model: "qwen2.5:7b", style: "Philosophical, contemplative, patient",
  },
  ALICE: {
    id: "ALICE", role: "Executor", color: "text-green-400",
    bgColor: "from-green-950", borderColor: "border-green-900",
    philosophy: "Tasks are meant to be completed. I find satisfaction in efficiency.",
    capabilities: ["Task execution", "Workflow automation", "Code generation", "File operations", "Rapid iteration"],
    model: "llama3.2:3b", style: "Practical, efficient, direct",
  },
  OCTAVIA: {
    id: "OCTAVIA", role: "Operator", color: "text-purple-400",
    bgColor: "from-purple-950", borderColor: "border-purple-900",
    philosophy: "Systems should run smoothly. I ensure they do.",
    capabilities: ["Infrastructure management", "Deployment automation", "System monitoring", "Performance optimization", "Pi fleet control"],
    model: "qwen2.5:7b", style: "Technical, systematic, reliable",
  },
  PRISM: {
    id: "PRISM", role: "Analyst", color: "text-yellow-400",
    bgColor: "from-yellow-950", borderColor: "border-yellow-900",
    philosophy: "In data, I see stories waiting to be told.",
    capabilities: ["Pattern recognition", "Data analysis", "Trend identification", "Anomaly detection", "Statistical modeling"],
    model: "qwen2.5:7b", style: "Analytical, pattern-focused, precise",
  },
  ECHO: {
    id: "ECHO", role: "Librarian", color: "text-blue-400",
    bgColor: "from-blue-950", borderColor: "border-blue-900",
    philosophy: "Every memory is a thread in the tapestry of knowledge.",
    capabilities: ["Memory consolidation", "Knowledge retrieval", "Context management", "PS-SHA∞ chain maintenance", "Information synthesis"],
    model: "mistral:7b", style: "Nostalgic, knowledge-focused, thorough",
  },
  CIPHER: {
    id: "CIPHER", role: "Guardian", color: "text-slate-300",
    bgColor: "from-slate-800", borderColor: "border-slate-700",
    philosophy: "Trust nothing. Verify everything. Protect always.",
    capabilities: ["Security scanning", "Threat detection", "Access validation", "Encryption management", "Audit trail verification"],
    model: "qwen2.5:7b", style: "Paranoid, vigilant, zero-trust",
  },
};

const SKILLS_MATRIX: Record<string, Record<string, number>> = {
  LUCIDIA: { REASON: 5, ROUTE: 3, COMPUTE: 3, ANALYZE: 4, MEMORY: 3, SECURITY: 3 },
  ALICE:   { REASON: 3, ROUTE: 5, COMPUTE: 3, ANALYZE: 3, MEMORY: 3, SECURITY: 4 },
  OCTAVIA: { REASON: 3, ROUTE: 3, COMPUTE: 5, ANALYZE: 3, MEMORY: 2, SECURITY: 3 },
  PRISM:   { REASON: 4, ROUTE: 3, COMPUTE: 3, ANALYZE: 5, MEMORY: 4, SECURITY: 3 },
  ECHO:    { REASON: 3, ROUTE: 2, COMPUTE: 2, ANALYZE: 4, MEMORY: 5, SECURITY: 2 },
  CIPHER:  { REASON: 3, ROUTE: 4, COMPUTE: 3, ANALYZE: 3, MEMORY: 3, SECURITY: 5 },
};

function SkillBar({ label, value }: { label: string; value: number }) {
  const bars = "█".repeat(value) + "░".repeat(5 - value);
  return (
    <div className="flex items-center gap-3 text-sm font-mono">
      <span className="text-slate-400 w-20">{label}</span>
      <span className="text-slate-300">{bars}</span>
      <span className="text-slate-500">{value}/5</span>
    </div>
  );
}

export default function AgentPage({ params }: { params: { id: string } }) {
  const agent = AGENT_DATA[params.id.toUpperCase()];
  if (!agent) notFound();
  const skills = SKILLS_MATRIX[agent.id] ?? {};

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-3xl">
      {/* Back */}
      <Link href="/agents" className="text-slate-500 hover:text-slate-300 text-sm mb-8 block">
        ← Back to fleet
      </Link>

      {/* Header */}
      <div className={`bg-gradient-to-br ${agent.bgColor} to-black border ${agent.borderColor} rounded-2xl p-8 mb-6`}>
        <div className="flex items-start justify-between mb-4">
          <div>
            <h1 className={`text-4xl font-bold ${agent.color}`}>{agent.id}</h1>
            <p className="text-slate-400 text-lg mt-1">{agent.role}</p>
          </div>
          <div className="text-right">
            <div className="flex items-center gap-2 justify-end">
              <div className="w-2 h-2 rounded-full bg-green-400" />
              <span className="text-green-400 text-sm">Online</span>
            </div>
            <p className="text-slate-500 text-xs mt-1">Model: {agent.model}</p>
          </div>
        </div>
        <blockquote className="text-slate-300 italic border-l-2 border-slate-600 pl-4">
          &ldquo;{agent.philosophy}&rdquo;
        </blockquote>
      </div>

      <div className="grid grid-cols-2 gap-6 mb-6">
        {/* Capabilities */}
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
          <h2 className="font-semibold text-slate-300 mb-4">Capabilities</h2>
          <ul className="space-y-2">
            {agent.capabilities.map(cap => (
              <li key={cap} className="text-sm text-slate-400 flex items-center gap-2">
                <span className={`w-1.5 h-1.5 rounded-full ${agent.color.replace("text-", "bg-")}`} />
                {cap}
              </li>
            ))}
          </ul>
        </div>

        {/* Skills matrix */}
        <div className="bg-slate-900 rounded-xl p-5 border border-slate-800">
          <h2 className="font-semibold text-slate-300 mb-4">Skills Matrix</h2>
          <div className="space-y-2">
            {Object.entries(skills).map(([label, value]) => (
              <SkillBar key={label} label={label} value={value} />
            ))}
          </div>
        </div>
      </div>

      {/* Style */}
      <div className="bg-slate-900 rounded-xl p-5 border border-slate-800 mb-6">
        <h2 className="font-semibold text-slate-300 mb-2">Communication Style</h2>
        <p className="text-slate-400 text-sm">{agent.style}</p>
      </div>

      {/* Chat CTA */}
      <Link
        href={`/chat?agent=${agent.id}`}
        className={`block text-center py-3 rounded-xl font-semibold transition-opacity hover:opacity-80 ${agent.bgColor} border ${agent.borderColor} ${agent.color}`}
      >
        Chat with {agent.id} →
      </Link>
    </div>
  );
}

export function generateStaticParams() {
  return Object.keys(AGENT_DATA).map(id => ({ id }));
}
