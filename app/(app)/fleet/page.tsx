import { Suspense } from "react"

const PI_NODES = [
  { name: "aria64", ip: "192.168.4.38", user: "alexa", role: "Primary", capacity: 22500 },
  { name: "alice",  ip: "192.168.4.49", user: "blackroad", role: "Secondary", capacity: 7500 },
  { name: "lucidia", ip: "192.168.4.99", user: "pi", role: "Backup", capacity: 2000 },
]

async function getFleetStatus() {
  try {
    const res = await fetch("https://worlds.blackroad.io/stats", { next: { revalidate: 30 } })
    return res.ok ? res.json() : null
  } catch { return null }
}

export default async function FleetPage() {
  const stats = await getFleetStatus()
  const nodeWorlds = stats?.by_node ?? {}

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">🖥️ Fleet</h1>
        <p className="text-gray-400 mt-1">Raspberry Pi agent nodes powering BlackRoad OS</p>
      </div>

      <div className="grid gap-4">
        {PI_NODES.map((node) => {
          const worlds = nodeWorlds[node.name] ?? 0
          const active = worlds > 0
          return (
            <div key={node.name} className={`bg-gray-900 border rounded-lg p-5 ${active ? "border-green-700" : "border-gray-700"}`}>
              <div className="flex items-start justify-between">
                <div>
                  <div className="flex items-center gap-2">
                    <span className={`w-2 h-2 rounded-full ${active ? "bg-green-400 animate-pulse" : "bg-gray-600"}`}></span>
                    <span className="text-white font-bold text-lg font-mono">{node.name}</span>
                    <span className="text-xs text-gray-500 bg-gray-800 px-2 py-0.5 rounded">{node.role}</span>
                  </div>
                  <div className="text-gray-500 text-sm mt-1 font-mono">{node.user}@{node.ip}</div>
                </div>
                <div className="text-right">
                  <div className="text-2xl font-bold text-amber-400">{worlds}</div>
                  <div className="text-xs text-gray-500">worlds</div>
                </div>
              </div>
              <div className="mt-4 grid grid-cols-2 gap-3 text-sm">
                <div className="bg-gray-800 rounded p-2">
                  <div className="text-gray-400">Capacity</div>
                  <div className="text-white font-mono">{node.capacity.toLocaleString()} agents</div>
                </div>
                <div className="bg-gray-800 rounded p-2">
                  <div className="text-gray-400">Status</div>
                  <div className={active ? "text-green-400" : "text-gray-500"}>{active ? "Online" : "Offline"}</div>
                </div>
              </div>
            </div>
          )
        })}
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4 text-sm text-gray-400">
        <p className="font-semibold text-white mb-1">Total Fleet Capacity</p>
        <p className="text-2xl font-bold text-white">{PI_NODES.reduce((s,n) => s + n.capacity, 0).toLocaleString()} <span className="text-sm text-gray-400">agents</span></p>
      </div>
    </div>
  )
}
