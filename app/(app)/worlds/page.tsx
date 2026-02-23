interface WorldStats {
  total: number
  by_node: Record<string, number>
  by_type: Record<string, number>
  recent: WorldEntry[]
}

interface WorldEntry {
  name: string
  type: 'world' | 'lore' | 'code' | string
  node: string
  generated_at: string
}

const TYPE_ICONS: Record<string, string> = {
  world: '🌍',
  lore: '📖',
  code: '💻',
}

const TYPE_COLORS: Record<string, string> = {
  world: 'text-green-400',
  lore: 'text-purple-400',
  code: 'text-blue-400',
}

async function getWorldStats(): Promise<{ worlds: WorldStats } | null> {
  try {
    const res = await fetch('https://worlds.blackroad.io/stats', {
      next: { revalidate: 30 },
    })
    return res.ok ? res.json() : null
  } catch {
    return null
  }
}

function formatRelativeTime(dateStr: string): string {
  const date = new Date(dateStr)
  const now = new Date()
  const diffMs = now.getTime() - date.getTime()
  const diffMins = Math.floor(diffMs / 60000)
  if (diffMins < 1) return 'just now'
  if (diffMins < 60) return `${diffMins}m ago`
  const diffHours = Math.floor(diffMins / 60)
  if (diffHours < 24) return `${diffHours}h ago`
  return `${Math.floor(diffHours / 24)}d ago`
}

function ProgressBar({
  value,
  max,
  color,
}: {
  value: number
  max: number
  color: string
}) {
  const pct = max > 0 ? Math.round((value / max) * 100) : 0
  const filled = Math.round(pct / 5) // 20 chars max
  const empty = 20 - filled
  return (
    <div className="flex items-center gap-2 font-mono text-sm">
      <span className={`${color} select-none tracking-tighter`}>
        {'█'.repeat(filled)}
        {'░'.repeat(empty)}
      </span>
      <span className="text-gray-400 text-xs w-8 text-right">{pct}%</span>
    </div>
  )
}

export default async function WorldsPage() {
  const data = await getWorldStats()
  const worlds = data?.worlds ?? null
  const total = worlds?.total ?? 0
  const byNode = worlds?.by_node ?? {}
  const byType = worlds?.by_type ?? {}
  const recent = worlds?.recent ?? []
  const maxType = Math.max(...Object.values(byType).map(Number), 1)

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            🌍 Worlds
            <span className="text-xs font-normal text-gray-500 bg-gray-800 px-2 py-1 rounded-full ml-1 flex items-center gap-1.5">
              <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-pulse inline-block" />
              Live
            </span>
          </h1>
          <p className="text-gray-400 mt-1">AI-generated worlds running on BlackRoad Pi fleet</p>
        </div>
        <div className="text-right">
          <div className="text-6xl font-mono font-black text-amber-400 leading-none tabular-nums">
            {total || '—'}
          </div>
          <div className="text-sm text-gray-400 mt-1">worlds generated</div>
        </div>
      </div>

      {/* Node breakdown */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(byNode).length > 0 ? (
          Object.entries(byNode).map(([node, count]) => (
            <div
              key={node}
              className="bg-gray-900 border border-gray-700 hover:border-amber-700/60 transition-colors rounded-xl p-5"
            >
              <div className="flex items-center gap-2 mb-2">
                <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
                <span className="text-gray-300 text-sm font-mono truncate">{node}</span>
              </div>
              <div className="text-4xl font-black font-mono text-white tabular-nums">
                {count as number}
              </div>
              <div className="text-xs text-gray-500 mt-1">worlds on this node</div>
              <div className="mt-3 h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className="h-full bg-amber-500 rounded-full transition-all duration-700"
                  style={{
                    width: `${total > 0 ? Math.round(((count as number) / total) * 100) : 0}%`,
                  }}
                />
              </div>
              <div className="text-xs text-gray-600 mt-1 font-mono">
                {total > 0 ? Math.round(((count as number) / total) * 100) : 0}% of total
              </div>
            </div>
          ))
        ) : (
          ['aria64', 'alice'].map((node) => (
            <div
              key={node}
              className="bg-gray-900 border border-gray-700 rounded-xl p-5 animate-pulse"
            >
              <div className="h-3 bg-gray-700 rounded w-16 mb-4" />
              <div className="h-10 bg-gray-700 rounded w-14 mb-2" />
              <div className="h-2 bg-gray-800 rounded-full mt-4" />
            </div>
          ))
        )}
      </div>

      {/* Type distribution */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Type Distribution
        </h2>
        <div className="space-y-4">
          {Object.entries(byType).length > 0 ? (
            Object.entries(byType).map(([type, count]) => (
              <div key={type} className="space-y-1.5">
                <div className="flex items-center justify-between text-sm">
                  <span className="flex items-center gap-2 font-medium text-white">
                    <span className="text-base leading-none">{TYPE_ICONS[type] ?? '🔷'}</span>
                    <span className="capitalize">{type}</span>
                  </span>
                  <span className="font-mono text-gray-300 tabular-nums">{count as number}</span>
                </div>
                <ProgressBar
                  value={count as number}
                  max={maxType}
                  color={TYPE_COLORS[type] ?? 'text-gray-400'}
                />
              </div>
            ))
          ) : (
            <div className="flex items-center gap-2.5 text-sm text-gray-500 py-2">
              <span className="inline-block w-2 h-2 rounded-full bg-amber-400 animate-pulse flex-shrink-0" />
              Generating...
            </div>
          )}
        </div>
      </div>

      {/* Recent worlds */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Recent Worlds
        </h2>
        {recent.length > 0 ? (
          <div>
            {recent.slice(0, 10).map((w: WorldEntry, i: number) => (
              <div
                key={i}
                className="flex items-center justify-between py-2.5 border-b border-gray-800/80 last:border-0 group"
              >
                <div className="flex items-center gap-3 min-w-0">
                  <span className="text-xl leading-none flex-shrink-0">
                    {TYPE_ICONS[w.type] ?? '🔷'}
                  </span>
                  <div className="min-w-0">
                    <div className="text-white font-medium text-sm group-hover:text-amber-400 transition-colors truncate">
                      {w.name}
                    </div>
                    <div className="flex items-center gap-1.5 mt-0.5">
                      <span
                        className={`text-xs font-mono capitalize ${TYPE_COLORS[w.type] ?? 'text-gray-400'}`}
                      >
                        {w.type}
                      </span>
                      <span className="text-gray-700">·</span>
                      <span className="text-xs text-gray-500 font-mono">{w.node}</span>
                    </div>
                  </div>
                </div>
                <div className="text-xs text-gray-600 font-mono flex-shrink-0 ml-3">
                  {formatRelativeTime(w.generated_at)}
                </div>
              </div>
            ))}
          </div>
        ) : (
          <div className="flex items-center gap-3 text-sm text-gray-500 py-4">
            <span className="w-2 h-2 rounded-full bg-amber-400 animate-pulse inline-block flex-shrink-0" />
            Generating worlds... check back soon.
          </div>
        )}
      </div>

      <p className="text-xs text-gray-600 text-center">
        Auto-refreshes every 30s · Powered by aria64 + alice Pi nodes
      </p>
    </div>
  )
}
