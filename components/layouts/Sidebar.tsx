'use client';

import Link from 'next/link';
import { useState } from 'react';

interface SidebarProps {
  variant: 'workspace' | 'console';
  currentSpace?: string;
}

// Workspace sidebar data
const workspaceSpaces = [
  { id: 'my-road', name: 'My Road', icon: '🛣️' },
  { id: 'work', name: 'Work', icon: '💼' },
  { id: 'lab', name: 'Lab', icon: '🧪' },
];

const workspaceProjects = [
  { id: 'blackroad-os', name: 'blackroad-os', status: 'healthy' },
  { id: 'lucidia', name: 'lucidia', status: 'healthy' },
  { id: 'demo-app', name: 'demo-app', status: 'inactive' },
];

const workspaceAgents = [
  { id: 'cece', name: 'Cece', status: 'active' },
  { id: 'devin', name: 'Devin', status: 'active' },
  { id: 'scout', name: 'Scout', status: 'idle' },
];

// Console sidebar data
const consoleServices = {
  compute: [
    { id: 'operator', name: 'Operator', status: 'healthy' },
    { id: 'gpt-oss', name: 'GPT-OSS', status: 'healthy' },
    { id: 'rag-api', name: 'RAG API', status: 'offline' },
    { id: 'worker', name: 'Worker', status: 'healthy' },
  ],
  data: [
    { id: 'postgres', name: 'Postgres', status: 'healthy' },
    { id: 'redis', name: 'Redis', status: 'healthy' },
    { id: 'meilisearch', name: 'Meilisearch', status: 'healthy' },
  ],
  network: [
    { id: 'caddy', name: 'Caddy', status: 'healthy' },
    { id: 'mesh', name: 'Mesh', status: 'offline' },
  ],
  sleeping: [
    { id: 'mysql', name: 'MySQL', status: 'sleeping' },
    { id: 'vectordb', name: 'VectorDB', status: 'sleeping' },
    { id: 'primary-old', name: 'Primary-T6I4', status: 'sleeping' },
  ],
};

function StatusDot({ status }: { status: string }) {
  const colors: Record<string, string> = {
    healthy: 'bg-green-500',
    active: 'bg-green-500',
    inactive: 'bg-br-text-muted',
    idle: 'bg-yellow-500',
    offline: 'bg-red-500',
    sleeping: 'bg-br-text-muted',
  };
  return <span className={`h-2 w-2 rounded-full ${colors[status] || 'bg-br-text-muted'}`} />;
}

function SidebarSection({
  title,
  children,
  defaultOpen = true,
}: {
  title: string;
  children: React.ReactNode;
  defaultOpen?: boolean;
}) {
  const [open, setOpen] = useState(defaultOpen);

  return (
    <div className="mb-4">
      <button
        onClick={() => setOpen(!open)}
        className="mb-1 flex w-full items-center gap-1 px-3 text-xs font-semibold uppercase tracking-wider text-br-text-muted hover:text-br-text"
      >
        <svg
          className={`h-3 w-3 transition-transform ${open ? 'rotate-90' : ''}`}
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
        </svg>
        {title}
      </button>
      {open && <div className="space-y-0.5">{children}</div>}
    </div>
  );
}

function SidebarItem({
  icon,
  name,
  status,
  href,
  active,
}: {
  icon?: string;
  name: string;
  status?: string;
  href?: string;
  active?: boolean;
}) {
  const content = (
    <div
      className={`flex items-center gap-2 rounded-md px-3 py-1.5 text-sm ${
        active
          ? 'bg-br-surface-2 text-br-hot-pink'
          : 'text-br-text-muted hover:bg-br-surface-2 hover:text-br-text'
      }`}
    >
      {status && <StatusDot status={status} />}
      {icon && <span className="text-base">{icon}</span>}
      <span className="truncate">{name}</span>
    </div>
  );

  if (href) {
    return <Link href={href}>{content}</Link>;
  }
  return <button className="w-full text-left">{content}</button>;
}

export function Sidebar({ variant, currentSpace }: SidebarProps) {
  const isConsole = variant === 'console';

  return (
    <aside className="flex w-60 flex-col border-r border-br-border bg-br-surface">
      <div className="flex-1 overflow-y-auto py-4">
        {isConsole ? (
          // Console Sidebar
          <>
            <SidebarSection title="Compute">
              {consoleServices.compute.map((svc) => (
                <SidebarItem
                  key={svc.id}
                  name={svc.name}
                  status={svc.status}
                  href={`/console/services/${svc.id}`}
                />
              ))}
            </SidebarSection>

            <SidebarSection title="Data">
              {consoleServices.data.map((svc) => (
                <SidebarItem
                  key={svc.id}
                  name={svc.name}
                  status={svc.status}
                  href={`/console/services/${svc.id}`}
                />
              ))}
            </SidebarSection>

            <SidebarSection title="Network">
              {consoleServices.network.map((svc) => (
                <SidebarItem
                  key={svc.id}
                  name={svc.name}
                  status={svc.status}
                  href={`/console/services/${svc.id}`}
                />
              ))}
            </SidebarSection>

            <SidebarSection title="Sleeping" defaultOpen={false}>
              {consoleServices.sleeping.map((svc) => (
                <SidebarItem
                  key={svc.id}
                  name={svc.name}
                  status={svc.status}
                  href={`/console/services/${svc.id}`}
                />
              ))}
            </SidebarSection>
          </>
        ) : (
          // Workspace Sidebar
          <>
            <SidebarSection title="Spaces">
              {workspaceSpaces.map((space) => (
                <SidebarItem
                  key={space.id}
                  icon={space.icon}
                  name={space.name}
                  href={`/app/space/${space.id}`}
                  active={currentSpace === space.id}
                />
              ))}
            </SidebarSection>

            <SidebarSection title="Projects">
              {workspaceProjects.map((proj) => (
                <SidebarItem
                  key={proj.id}
                  name={proj.name}
                  status={proj.status}
                  href={`/app/project/${proj.id}`}
                />
              ))}
            </SidebarSection>

            <SidebarSection title="Agents">
              {workspaceAgents.map((agent) => (
                <SidebarItem
                  key={agent.id}
                  icon="🤖"
                  name={agent.name}
                  href={`/app/agent/${agent.id}`}
                />
              ))}
            </SidebarSection>
          </>
        )}
      </div>

      {/* Bottom Actions */}
      <div className="border-t border-br-border p-3">
        <button className="flex w-full items-center gap-2 rounded-md px-3 py-2 text-sm text-br-text-muted hover:bg-br-surface-2 hover:text-br-text">
          <svg className="h-4 w-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
          </svg>
          {isConsole ? 'Add Service' : 'New Project'}
        </button>
      </div>
    </aside>
  );
}
