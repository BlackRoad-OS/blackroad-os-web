import { Suspense } from "react"

async function getWorldStats() {
  try {
    const res = await fetch("https://worlds.blackroad.io/stats", { next: { revalidate: 30 } })
    return res.ok ? res.json() : null
  } catch { return null }
}

async function getRecentWorlds() {
  try {
    const res = await fetch("https://worlds.blackroad.io/recent?limit=20", { next: { revalidate: 30 } })
    return res.ok ? res.json() : []
  } catch { return [] }
}

export default async function WorldsPage() {
  const [stats, worlds] = await Promise.all([getWorldStats(), getRecentWorlds()])

  return (
    <div className="p-6 space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">🌍 Worlds</h1>
          <p className="text-gray-400 mt-1">AI-generated worlds running on BlackRoad Pi fleet</p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-mono font-bold text-amber-400">{stats?.total ?? "—"}</div>
          <div className="text-sm text-gray-400">total worlds</div>
        </div>
      </div>

      {/* Node Stats */}
      <div className="grid grid-cols-2 gap-4">
        {Object.entries(stats?.by_node ?? {}).map(([node, count]) => (
          <div key={node} className="bg-gray-900 border border-gray-700 rounded-lg p-4">
            <div className="text-gray-400 text-sm font-mono">{node}</div>
            <div className="text-2xl font-bold text-white mt-1">{count as number}</div>
            <div className="text-xs text-gray-500">worlds</div>
          </div>
        ))}
      </div>

      {/* Type breakdown */}
      {stats?.by_type && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">By Type</h2>
          <div className="flex gap-6">
            {Object.entries(stats.by_type).map(([type, count]) => (
              <div key={type} className="text-center">
                <div className="text-xl font-bold text-white">{count as number}</div>
                <div className="text-xs text-gray-500 capitalize">{type}</div>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Recent worlds */}
      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
        <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Recent Worlds</h2>
        {Array.isArray(worlds) && worlds.length > 0 ? (
          <div className="space-y-2">
            {worlds.slice(0, 10).map((w: any, i: number) => (
              <div key={i} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0">
                <div>
                  <span className="text-white font-medium">{w.title ?? w.name ?? `World #${i+1}`}</span>
                  {w.type && <span className="ml-2 text-xs text-amber-400 bg-amber-400/10 px-2 py-0.5 rounded">{w.type}</span>}
                </div>
                <div className="text-xs text-gray-500">{w.node ?? ""}</div>
              </div>
            ))}
          </div>
        ) : (
          <p className="text-gray-500 text-sm">Worlds are generating... check back soon.</p>
        )}
      </div>

      <p className="text-xs text-gray-600 text-center">Auto-refreshes every 30s • Powered by aria64 + alice Pi nodes</p>
    </div>
  )
}
