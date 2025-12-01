import Link from 'next/link';

const quickActions = [
  { label: 'New Project', icon: '➕', href: '/app/new' },
  { label: 'Terminal', icon: '💻', href: '/app/terminal' },
  { label: 'Chat w/ Cece', icon: '💬', href: '#' },
  { label: 'Deploy', icon: '🚀', href: '/app/deploy' },
];

const recentProjects = [
  { id: 'blackroad-os', name: 'blackroad-os', lastActive: '2h ago', color: 'from-br-hot-pink to-br-vivid-purple' },
  { id: 'lucidia', name: 'lucidia', lastActive: '5h ago', color: 'from-br-cyber-blue to-br-vivid-purple' },
  { id: 'demo-app', name: 'demo-app', lastActive: '1d ago', color: 'from-br-sunrise-orange to-br-hot-pink' },
];

const systemStatus = [
  { label: 'Operator', status: 'healthy' },
  { label: 'GPT-OSS', status: 'healthy' },
  { label: 'Jobs queued', value: '3' },
];

const activityFeed = [
  { time: '2m ago', action: 'Deployed operator-engine', type: 'deploy' },
  { time: '15m ago', action: 'Cece completed code review', type: 'agent' },
  { time: '1h ago', action: 'Pull request merged', type: 'git' },
  { time: '3h ago', action: 'Hero Flow #2 test passed', type: 'test' },
];

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    healthy: 'bg-green-500',
    warning: 'bg-yellow-500',
    error: 'bg-red-500',
  };
  return <span className={`h-2 w-2 rounded-full ${colors[status] || 'bg-br-text-muted'}`} />;
}

export default function WorkspaceDashboard() {
  const greeting = getGreeting();

  return (
    <div className="mx-auto max-w-5xl space-y-8">
      {/* Greeting */}
      <div>
        <h1 className="text-2xl font-bold text-br-text">
          {greeting}, <span className="text-br-hot-pink">Alexa</span>
        </h1>
        <p className="mt-1 text-br-text-muted">Welcome back to your workspace.</p>
      </div>

      {/* Quick Actions */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-br-text-muted">
          Quick Actions
        </h2>
        <div className="grid grid-cols-2 gap-3 sm:grid-cols-4">
          {quickActions.map((action) => (
            <Link
              key={action.label}
              href={action.href}
              className="flex flex-col items-center gap-2 rounded-lg border border-br-border bg-br-surface p-4 text-center transition hover:border-br-hot-pink hover:bg-br-surface-2"
            >
              <span className="text-2xl">{action.icon}</span>
              <span className="text-sm text-br-text">{action.label}</span>
            </Link>
          ))}
        </div>
      </section>

      {/* Recent Projects */}
      <section>
        <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-br-text-muted">
          Recent Projects
        </h2>
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-3">
          {recentProjects.map((project) => (
            <Link
              key={project.id}
              href={`/app/project/${project.id}`}
              className="group rounded-lg border border-br-border bg-br-surface p-4 transition hover:border-br-hot-pink"
            >
              <div
                className={`mb-3 h-20 rounded-md bg-gradient-to-br ${project.color} opacity-60 transition group-hover:opacity-80`}
              />
              <h3 className="font-medium text-br-text">{project.name}</h3>
              <p className="text-xs text-br-text-muted">{project.lastActive}</p>
            </Link>
          ))}
        </div>
      </section>

      {/* Two Column: Status + Activity */}
      <div className="grid grid-cols-1 gap-6 lg:grid-cols-2">
        {/* System Status */}
        <section className="rounded-lg border border-br-border bg-br-surface p-4">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-br-text-muted">
            System Status
          </h2>
          <div className="space-y-3">
            {systemStatus.map((item) => (
              <div key={item.label} className="flex items-center justify-between">
                <span className="text-sm text-br-text">{item.label}</span>
                <div className="flex items-center gap-2">
                  {item.status && <StatusDot status={item.status} />}
                  {item.value && (
                    <span className="rounded bg-br-surface-2 px-2 py-0.5 text-xs text-br-text">
                      {item.value}
                    </span>
                  )}
                  {item.status && (
                    <span className="text-xs capitalize text-br-text-muted">{item.status}</span>
                  )}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Activity Feed */}
        <section className="rounded-lg border border-br-border bg-br-surface p-4">
          <h2 className="mb-4 text-sm font-semibold uppercase tracking-wider text-br-text-muted">
            Activity Feed
          </h2>
          <div className="space-y-3">
            {activityFeed.map((item, i) => (
              <div key={i} className="flex items-start gap-3">
                <span className="mt-1 text-xs text-br-text-muted">{item.time}</span>
                <span className="text-sm text-br-text">{item.action}</span>
              </div>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}

function getGreeting(): string {
  const hour = new Date().getHours();
  if (hour < 12) return 'Good morning';
  if (hour < 18) return 'Good afternoon';
  return 'Good evening';
}
