async function getVerifyStats() {
  try {
    const res = await fetch("https://verify.blackroad.io/facts", { next: { revalidate: 60 } })
    return res.ok ? res.json() : null
  } catch { return null }
}

export default async function VerifyPage() {
  const data = await getVerifyStats()

  return (
    <div className="p-6 space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-white">✅ Verify</h1>
        <p className="text-gray-400 mt-1">Information verification and fact-checking system</p>
      </div>

      <div className="grid grid-cols-2 gap-4">
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Known Facts</div>
          <div className="text-2xl font-bold text-green-400 mt-1">{data?.count ?? "—"}</div>
        </div>
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
          <div className="text-gray-400 text-sm">Status</div>
          <div className="text-2xl font-bold text-green-400 mt-1">{data ? "Online" : "—"}</div>
        </div>
      </div>

      {data?.facts && (
        <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
          <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">Verified Facts</h2>
          <div className="space-y-2">
            {Object.entries(data.facts).map(([key, val]) => (
              <div key={key} className="flex items-center justify-between py-2 border-b border-gray-800 last:border-0 text-sm">
                <span className="text-gray-400 font-mono">{key}</span>
                <span className="text-white">{String(val)}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      <div className="bg-gray-900 border border-gray-700 rounded-lg p-4">
        <h2 className="text-sm font-semibold text-gray-400 mb-3 uppercase tracking-wider">API Endpoints</h2>
        <div className="space-y-1 font-mono text-sm">
          {[
            ["GET", "/health", "Service health check"],
            ["GET", "/facts", "List known facts"],
            ["POST", "/verify/url", "Verify URL reachability"],
            ["POST", "/verify/claim", "Fact-check a claim"],
            ["POST", "/verify/schema", "Validate JSON/YAML"],
            ["POST", "/verify/batch", "Batch verify multiple items"],
          ].map(([method, path, desc]) => (
            <div key={path} className="flex items-center gap-3 py-1">
              <span className={`text-xs px-2 py-0.5 rounded font-bold w-12 text-center ${method === "GET" ? "bg-green-900 text-green-300" : "bg-blue-900 text-blue-300"}`}>{method}</span>
              <span className="text-amber-400">{path}</span>
              <span className="text-gray-500">{desc}</span>
            </div>
          ))}
        </div>
        <p className="text-gray-600 text-xs mt-3">Base URL: https://verify.blackroad.io</p>
      </div>
    </div>
  )
}
