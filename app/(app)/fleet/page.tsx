// Raspberry Pi fleet status
const PI_FLEET = [
  { name: 'aria64',       ip: '192.168.4.38', role: 'Primary', capacity: 22500, worlds_dir: 'worlds/' },
  { name: 'blackroad-pi', ip: '192.168.4.64', role: 'Secondary', capacity: 7500, worlds_dir: 'worlds/' },
  { name: 'alice',        ip: '192.168.4.49', role: 'Tertiary', capacity: 5000, worlds_dir: 'alice-worlds/' },
]

async function getFleetStatus() {
  try {
    const res = await fetch('https://blackroad-agents-status.amundsonalexa.workers.dev/fleet', 
      { next: { revalidate: 30 } })
    if (!res.ok) return null
    return await res.json()
  } catch { return null }
}

export default async function FleetPage() {
  const status = await getFleetStatus()
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">🍓 Pi Fleet</h1>
      <p className="text-muted-foreground mb-8">
        Raspberry Pi infrastructure — {PI_FLEET.length} nodes · 35,000 agent capacity
      </p>
      <div className="grid gap-4">
        {PI_FLEET.map(pi => (
          <div key={pi.name} className="rounded-xl border p-6 flex items-start gap-6">
            <div className="text-4xl">🍓</div>
            <div className="flex-1">
              <div className="flex items-center gap-3 mb-2">
                <span className="font-bold text-lg">{pi.name}</span>
                <span className="text-xs text-muted-foreground bg-muted rounded px-2 py-0.5">{pi.role}</span>
              </div>
              <div className="text-sm text-muted-foreground font-mono">{pi.ip}</div>
              <div className="text-sm text-muted-foreground mt-1">
                Capacity: {pi.capacity.toLocaleString()} agents
              </div>
            </div>
            <div className="text-sm text-right">
              <div className="w-2 h-2 rounded-full bg-green-500 inline-block mr-1"></div>
              <span className="text-green-600 text-xs">Online</span>
            </div>
          </div>
        ))}
      </div>
    </div>
  )
}
