import Link from 'next/link';

const services = [
  {
    id: 'operator',
    name: 'blackroad-os-operator',
    status: 'healthy',
    uptime: '47h 23m',
    version: 'f0d8285',
    category: 'compute',
  },
  {
    id: 'gpt-oss',
    name: 'GPT-OSS Model',
    status: 'healthy',
    uptime: '120h 15m',
    version: 'ollama:latest',
    category: 'compute',
  },
  {
    id: 'rag-api',
    name: 'RAG API',
    status: 'offline',
    uptime: '—',
    version: '—',
    category: 'compute',
  },
  {
    id: 'postgres',
    name: 'Postgres',
    status: 'healthy',
    uptime: '720h',
    version: '15.4',
    category: 'data',
  },
  {
    id: 'redis',
    name: 'Redis',
    status: 'healthy',
    uptime: '720h',
    version: '7.2',
    category: 'data',
  },
];

const alerts = [
  { id: 1, severity: 'warning', message: 'RAG API is offline', time: '5m ago' },
  { id: 2, severity: 'info', message: 'GPT-OSS Model volume at 85%', time: '1h ago' },
];

const recentEvents = [
  { time: '12:34:01', level: 'INFO', message: 'POST /chat 200 9234ms' },
  { time: '12:33:45', level: 'INFO', message: 'GET /health 200 23ms' },
  { time: '12:33:12', level: 'INFO', message: 'GET /llm/health 200 45ms' },
  { time: '12:32:58', level: 'WARN', message: 'RAG API unreachable' },
];

function StatusBadge({ status }: { status: string }) {
  const styles: Record<string, string> = {
    healthy: 'bg-green-500/20 text-green-400 border-green-500/50',
    offline: 'bg-red-500/20 text-red-400 border-red-500/50',
    warning: 'bg-yellow-500/20 text-yellow-400 border-yellow-500/50',
  };
  return (
    <span
      className={`inline-flex items-center gap-1.5 rounded-full border px-2 py-0.5 text-xs font-medium ${
        styles[status] || 'bg-br-surface-2 text-br-text-muted border-br-border'
      }`}
    >
      <span
        className={`h-1.5 w-1.5 rounded-full ${
          status === 'healthy' ? 'bg-green-400' : status === 'offline' ? 'bg-red-400' : 'bg-yellow-400'
        }`}
      />
      {status}
    </span>
  );
}

export default function ConsoleDashboard() {
  const healthyCount = services.filter((s) => s.status === 'healthy').length;
  const totalCount = services.length;

  return (
    <div className="space-y-6">
      {/* Header Stats */}
      <div className="grid grid-cols-2 gap-4 sm:grid-cols-4">
        <div className="rounded-lg border border-br-border bg-br-surface p-4">
          <p className="text-xs text-br-text-muted">Services</p>
          <p className="mt-1 text-2xl font-bold text-br-text">
            <span className="text-green-400">{healthyCount}</span>
            <span className="text-br-text-muted">/{totalCount}</span>
          </p>
        </div>
        <div className="rounded-lg border border-br-border bg-br-surface p-4">
          <p className="text-xs text-br-text-muted">Alerts</p>
          <p className="mt-1 text-2xl font-bold text-yellow-400">{alerts.length}</p>
        </div>
        <div className="rounded-lg border border-br-border bg-br-surface p-4">
          <p className="text-xs text-br-text-muted">Environment</p>
          <p className="mt-1 text-lg font-bold text-br-text">Production</p>
        </div>
        <div className="rounded-lg border border-br-border bg-br-surface p-4">
          <p className="text-xs text-br-text-muted">Railway Project</p>
          <p className="mt-1 truncate text-lg font-bold text-br-text">Operator Engine</p>
        </div>
      </div>

      {/* Alerts */}
      {alerts.length > 0 && (
        <div className="rounded-lg border border-yellow-500/50 bg-yellow-500/10 p-4">
          <h2 className="mb-3 flex items-center gap-2 text-sm font-semibold text-yellow-400">
            <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z"
              />
            </svg>
            Active Alerts
          </h2>
          <div className="space-y-2">
            {alerts.map((alert) => (
              <div key={alert.id} className="flex items-center justify-between">
                <span className="text-sm text-br-text">{alert.message}</span>
                <span className="text-xs text-br-text-muted">{alert.time}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {/* Services Table */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-br-text-muted">
          Services
        </h2>
        <div className="overflow-hidden rounded-lg border border-br-border">
          <table className="w-full">
            <thead className="bg-br-surface">
              <tr className="border-b border-br-border text-left text-xs font-medium uppercase tracking-wider text-br-text-muted">
                <th className="px-4 py-3">Service</th>
                <th className="px-4 py-3">Status</th>
                <th className="hidden px-4 py-3 sm:table-cell">Uptime</th>
                <th className="hidden px-4 py-3 md:table-cell">Version</th>
                <th className="px-4 py-3"></th>
              </tr>
            </thead>
            <tbody className="divide-y divide-br-border bg-br-surface-2">
              {services.map((service) => (
                <tr key={service.id} className="hover:bg-br-surface">
                  <td className="px-4 py-3">
                    <Link
                      href={`/console/services/${service.id}`}
                      className="font-medium text-br-text hover:text-br-hot-pink"
                    >
                      {service.name}
                    </Link>
                  </td>
                  <td className="px-4 py-3">
                    <StatusBadge status={service.status} />
                  </td>
                  <td className="hidden px-4 py-3 text-sm text-br-text-muted sm:table-cell">
                    {service.uptime}
                  </td>
                  <td className="hidden px-4 py-3 font-mono text-xs text-br-text-muted md:table-cell">
                    {service.version}
                  </td>
                  <td className="px-4 py-3">
                    <Link
                      href={`/console/services/${service.id}`}
                      className="text-xs text-br-hot-pink hover:underline"
                    >
                      View →
                    </Link>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </section>

      {/* Recent Logs */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-br-text-muted">
          Recent Events
        </h2>
        <div className="rounded-lg border border-br-border bg-br-surface p-4">
          <div className="space-y-2 font-mono text-xs">
            {recentEvents.map((event, i) => (
              <div key={i} className="flex gap-4">
                <span className="text-br-text-muted">{event.time}</span>
                <span
                  className={
                    event.level === 'WARN'
                      ? 'text-yellow-400'
                      : event.level === 'ERROR'
                        ? 'text-red-400'
                        : 'text-br-text-muted'
                  }
                >
                  {event.level}
                </span>
                <span className="text-br-text">{event.message}</span>
              </div>
            ))}
          </div>
          <button className="mt-4 text-xs text-br-hot-pink hover:underline">
            View Full Logs →
          </button>
        </div>
      </section>
    </div>
  );
}
