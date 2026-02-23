// app/(app)/memory/page.tsx
// Shows PS-SHA∞ gateway memory journal

async function getMemoryData() {
  try {
    const [stats, recent] = await Promise.all([
      fetch('http://127.0.0.1:8787/v1/memory', { next: { revalidate: 10 } }).then(r => r.json()),
      fetch('http://127.0.0.1:8787/v1/memory/recent', { next: { revalidate: 10 } }).then(r => r.json()),
    ])
    return { stats, recent: recent.entries || [] }
  } catch { return { stats: null, recent: [] } }
}

export default async function MemoryPage() {
  const { stats, recent } = await getMemoryData()
  return (
    <div className="p-8 max-w-5xl">
      <h1 className="text-3xl font-bold mb-2">PS-SHA∞ Memory</h1>
      <p className="text-muted-foreground mb-8">Hash-chain journal — every gateway interaction recorded</p>
      
      {stats ? (
        <div className="grid grid-cols-3 gap-4 mb-8">
          <div className="rounded-xl border p-5 text-center">
            <div className="text-3xl font-bold">{stats.total_entries || 0}</div>
            <div className="text-sm text-muted-foreground mt-1">Journal Entries</div>
          </div>
          <div className="rounded-xl border p-5 text-center">
            <div className="text-3xl font-bold">{stats.session_calls || 0}</div>
            <div className="text-sm text-muted-foreground mt-1">Session Calls</div>
          </div>
          <div className="rounded-xl border p-5 text-center">
            <div className="text-3xl font-bold text-green-500">SHA∞</div>
            <div className="text-sm text-muted-foreground mt-1">Hash Chain</div>
          </div>
        </div>
      ) : (
        <div className="rounded-xl border p-6 mb-8 text-center text-muted-foreground">
          Gateway offline · <code className="font-mono text-xs">br gateway start</code>
        </div>
      )}
      
      {recent.length > 0 && (
        <div>
          <h2 className="text-lg font-semibold mb-3">Recent Entries</h2>
          <div className="rounded-xl border divide-y">
            {recent.slice(0, 10).map((entry: any, i: number) => (
              <div key={i} className="p-4 flex items-start gap-4">
                <div className="font-mono text-xs text-muted-foreground pt-0.5 w-32 shrink-0">
                  {entry.timestamp ? new Date(entry.timestamp).toLocaleTimeString() : '—'}
                </div>
                <div className="flex-1 min-w-0">
                  <div className="text-sm font-medium">{entry.agent || entry.type || 'unknown'}</div>
                  <div className="text-xs text-muted-foreground font-mono truncate">{entry.hash?.slice(0,16)}...</div>
                </div>
                <div className={`text-xs px-2 py-0.5 rounded-full ${entry.status === 'success' ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'}`}>
                  {entry.status || 'ok'}
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  )
}
