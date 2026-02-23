interface NodeSpec {
  name: string
  ip: string
  user: string
  role: string
  capacity: number
  model: string
  ram: string
}

interface NodeStatus extends NodeSpec {
  online: boolean
  worlds: number
  lastSeen: string | null
}

const PI_NODES: NodeSpec[] = [
  { name: 'aria64',  ip: '192.168.4.38', user: 'alexa',      role: 'Primary',   capacity: 22500, model: 'Pi 5 + AI HAT+', ram: '8GB' },
  { name: 'alice',   ip: '192.168.4.49', user: 'blackroad',  role: 'Secondary', capacity: 7500,  model: 'Pi 4B',          ram: '8GB' },
  { name: 'lucidia', ip: '192.168.4.99', user: 'pi',         role: 'Backup',    capacity: 2000,  model: 'Pi 4B',          ram: '4GB' },
]

async function getFleetStatus() {
  try {
    const res = await fetch('https://worlds.blackroad.io/stats', {
      next: { revalidate: 30 },
    })
    return res.ok ? res.json() : null
  } catch {
    return null
  }
}

function SSHBadge({ active }: { active: boolean }) {
  return (
    <div
      className={`flex items-center gap-1.5 text-xs font-mono px-2 py-1 rounded border ${
        active
          ? 'bg-green-900/40 text-green-400 border-green-800/70'
          : 'bg-gray-800 text-gray-600 border-gray-700'
      }`}
    >
      <span
        className={`w-1.5 h-1.5 rounded-full flex-shrink-0 ${
          active ? 'bg-green-400 animate-pulse' : 'bg-gray-600'
        }`}
      />
      SSH {active ? 'Active' : 'Offline'}
    </div>
  )
}

export default async function FleetPage() {
  const data = await getFleetStatus()
  const nodeWorlds: Record<string, number> = data?.worlds?.by_node ?? data?.by_node ?? {}
  const recentWorlds: Array<{ node: string; generated_at: string }> =
    data?.worlds?.recent ?? data?.recent ?? []
  const totalWorlds: number = data?.worlds?.total ?? data?.total ?? 0

  // Derive last-seen per node from recent world list
  const nodeLastSeen: Record<string, string> = {}
  for (const w of recentWorlds) {
    if (!nodeLastSeen[w.node]) nodeLastSeen[w.node] = w.generated_at
  }

  const nodes: NodeStatus[] = PI_NODES.map((n) => ({
    ...n,
    worlds: nodeWorlds[n.name] ?? 0,
    online: (nodeWorlds[n.name] ?? 0) > 0,
    lastSeen: nodeLastSeen[n.name] ?? null,
  }))

  const totalCapacity = PI_NODES.reduce((s, n) => s + n.capacity, 0)
  const onlineNodes = nodes.filter((n) => n.online).length

  return (
    <div className="p-6 space-y-6 max-w-4xl">
      {/* Header */}
      <div className="flex items-start justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white flex items-center gap-2">
            🖥️ Fleet
            <span className="text-xs font-normal text-gray-500 bg-gray-800 px-2 py-1 rounded-full">
              {onlineNodes}/{PI_NODES.length} online
            </span>
          </h1>
          <p className="text-gray-400 mt-1">
            Raspberry Pi agent nodes powering BlackRoad OS
          </p>
        </div>
        <div className="text-right">
          <div className="text-4xl font-black font-mono text-white tabular-nums">
            {totalCapacity.toLocaleString()}
          </div>
          <div className="text-sm text-gray-400 mt-0.5">total agent slots</div>
        </div>
      </div>

      {/* Node cards */}
      <div className="grid gap-4">
        {nodes.map((node) => (
          <div
            key={node.name}
            className={`bg-gray-900 border rounded-xl p-5 transition-colors ${
              node.online
                ? 'border-green-800/70 shadow-[0_0_30px_rgba(74,222,128,0.04)]'
                : 'border-gray-800'
            }`}
          >
            {/* Node header */}
            <div className="flex items-start justify-between mb-4">
              <div>
                <div className="flex items-center gap-3 flex-wrap">
                  <span className="text-white font-bold text-xl font-mono">{node.name}</span>
                  <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded font-mono">
                    {node.role}
                  </span>
                  <SSHBadge active={node.online} />
                </div>
                <div className="text-gray-500 text-sm mt-1 font-mono">
                  {node.user}@{node.ip}
                </div>
                <div className="text-gray-600 text-xs mt-0.5">
                  {node.model} · {node.ram} RAM
                </div>
              </div>
              <div className="text-right flex-shrink-0">
                <div className="text-3xl font-black font-mono text-amber-400 tabular-nums">
                  {node.worlds}
                </div>
                <div className="text-xs text-gray-500">worlds</div>
                {node.lastSeen && (
                  <div className="text-xs text-gray-600 mt-1 font-mono">
                    {new Date(node.lastSeen).toLocaleTimeString([], {
                      hour: '2-digit',
                      minute: '2-digit',
                    })}
                  </div>
                )}
              </div>
            </div>

            {/* Capacity bar */}
            <div className="space-y-1 mb-3">
              <div className="flex justify-between text-xs text-gray-500">
                <span>Agent capacity</span>
                <span className="font-mono">{node.capacity.toLocaleString()}</span>
              </div>
              <div className="h-1.5 bg-gray-800 rounded-full overflow-hidden">
                <div
                  className={`h-full rounded-full transition-all duration-700 ${
                    node.online ? 'bg-green-500' : 'bg-gray-700'
                  }`}
                  style={{
                    width: `${Math.round((node.capacity / totalCapacity) * 100)}%`,
                  }}
                />
              </div>
              <div className="text-xs text-gray-700 font-mono">
                {Math.round((node.capacity / totalCapacity) * 100)}% of fleet capacity
              </div>
            </div>

            {/* Grid metrics */}
            <div className="grid grid-cols-3 gap-2 text-sm">
              <div className="bg-gray-800 rounded-lg p-2 text-center">
                <div className="text-gray-400 text-xs">Status</div>
                <div
                  className={`font-semibold mt-0.5 text-sm ${
                    node.online ? 'text-green-400' : 'text-gray-500'
                  }`}
                >
                  {node.online ? '● Online' : '○ Offline'}
                </div>
              </div>
              <div className="bg-gray-800 rounded-lg p-2 text-center">
                <div className="text-gray-400 text-xs">Worlds</div>
                <div className="text-white font-mono font-semibold mt-0.5">{node.worlds}</div>
              </div>
              <div className="bg-gray-800 rounded-lg p-2 text-center">
                <div className="text-gray-400 text-xs">Share</div>
                <div className="text-amber-400 font-mono font-semibold mt-0.5">
                  {totalWorlds > 0
                    ? `${Math.round((node.worlds / totalWorlds) * 100)}%`
                    : '—'}
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Fleet summary */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-5">
        <h2 className="text-xs font-semibold text-gray-400 uppercase tracking-widest mb-4">
          Fleet Summary
        </h2>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-3xl font-black text-white tabular-nums">{onlineNodes}</div>
            <div className="text-xs text-gray-500 mt-1">Nodes Online</div>
          </div>
          <div>
            <div className="text-3xl font-black text-amber-400 tabular-nums">{totalWorlds}</div>
            <div className="text-xs text-gray-500 mt-1">Worlds Generated</div>
          </div>
          <div>
            <div className="text-3xl font-black text-white tabular-nums">
              {totalCapacity.toLocaleString()}
            </div>
            <div className="text-xs text-gray-500 mt-1">Agent Slots</div>
          </div>
        </div>
      </div>

      <p className="text-xs text-gray-600 text-center">
        Auto-refreshes every 30s · SSH indicators reflect world generation activity
      </p>
    </div>
  )
}
