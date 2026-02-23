// app/(app)/agents/page.tsx
// Shows the 5 BlackRoad agents

const AGENTS = [
  { name: 'Octavia', role: 'The Architect', emoji: '🏗️', color: '#9C27B0', description: 'Systems design, infrastructure, and strategic architecture', capabilities: ['systems design', 'strategy', 'infrastructure', 'deployment'] },
  { name: 'Lucidia', role: 'The Dreamer',   emoji: '🌌', color: '#2979FF', description: 'Creative vision, philosophical reasoning, and big-picture thinking', capabilities: ['philosophy', 'creative reasoning', 'vision', 'synthesis'] },
  { name: 'Alice',   role: 'The Operator',  emoji: '⚡', color: '#10A37F', description: 'DevOps automation, task execution, and workflow management', capabilities: ['DevOps', 'automation', 'CI/CD', 'execution'] },
  { name: 'Aria',    role: 'The Interface', emoji: '🎨', color: '#F5A623', description: 'Frontend design, UX, and visual communication', capabilities: ['frontend', 'UX design', 'components', 'accessibility'] },
  { name: 'Shellfish', role: 'The Hacker', emoji: '🔐', color: '#FF1D6C', description: 'Security research, penetration testing, and vulnerability analysis', capabilities: ['security', 'pen testing', 'exploits', 'hardening'] },
]

async function getAgentStats() {
  try {
    const res = await fetch('http://127.0.0.1:8787/v1/agents', { next: { revalidate: 30 } })
    if (!res.ok) return null
    return await res.json()
  } catch { return null }
}

export default async function AgentsPage() {
  const stats = await getAgentStats()
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">AI Agents</h1>
      <p className="text-muted-foreground mb-8">5 specialized agents • tokenless gateway architecture</p>
      <div className="grid gap-4">
        {AGENTS.map(agent => (
          <div key={agent.name} className="rounded-xl border p-6 flex items-start gap-6">
            <div className="text-4xl">{agent.emoji}</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-1">
                <span className="font-bold text-xl">{agent.name}</span>
                <span className="text-sm text-muted-foreground">{agent.role}</span>
              </div>
              <p className="text-sm text-muted-foreground mb-3">{agent.description}</p>
              <div className="flex gap-2 flex-wrap">
                {agent.capabilities.map(cap => (
                  <span key={cap} className="text-xs bg-muted rounded-full px-3 py-1">{cap}</span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>
      {!stats && (
        <p className="mt-6 text-sm text-muted-foreground">
          💡 <code className="font-mono">br gateway start</code> to enable live agent communication
        </p>
      )}
    </div>
  )
}
