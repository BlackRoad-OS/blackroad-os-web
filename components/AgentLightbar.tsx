'use client';

import { useState, useEffect } from 'react';

type AgentStatus = {
  id: string;
  name: string;
  status: 'active' | 'thinking' | 'idle' | 'offline';
  lastActivity: string;
};

export default function AgentLightbar() {
  const [agents, setAgents] = useState<AgentStatus[]>([
    { id: '1', name: 'Lucidia', status: 'active', lastActivity: 'Just now' },
    { id: '2', name: 'Sentinel', status: 'thinking', lastActivity: '2m ago' },
    { id: '3', name: 'Orchestrator', status: 'idle', lastActivity: '15m ago' },
    { id: '4', name: 'Guardian', status: 'active', lastActivity: '1m ago' },
  ]);

  useEffect(() => {
    // TODO: Implement WebSocket connection to sig.beacon.json
    const interval = setInterval(() => {
      setAgents((prev) =>
        prev.map((agent) => {
          const statuses: AgentStatus['status'][] = ['active', 'thinking', 'idle'];
          const randomStatus = statuses[Math.floor(Math.random() * statuses.length)];
          return { ...agent, status: randomStatus };
        })
      );
    }, 5000);

    return () => clearInterval(interval);
  }, []);

  const getStatusColor = (status: AgentStatus['status']) => {
    switch (status) {
      case 'active':
        return 'bg-green-500';
      case 'thinking':
        return 'bg-yellow-500';
      case 'idle':
        return 'bg-slate-500';
      case 'offline':
        return 'bg-red-500';
    }
  };

  const getStatusLabel = (status: AgentStatus['status']) => {
    switch (status) {
      case 'active':
        return 'Active';
      case 'thinking':
        return 'Thinking';
      case 'idle':
        return 'Idle';
      case 'offline':
        return 'Offline';
    }
  };

  return (
    <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
      <div className="mb-4 flex items-center justify-between">
        <h3 className="text-lg font-semibold text-white">Live Agent Status</h3>
        <div className="flex items-center gap-2">
          <div className="h-2 w-2 animate-pulse rounded-full bg-green-500"></div>
          <span className="text-xs text-slate-400">Live</span>
        </div>
      </div>

      <div className="space-y-3">
        {agents.map((agent) => (
          <div
            key={agent.id}
            className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-800/50 p-3 transition hover:bg-slate-800"
          >
            <div className="flex items-center gap-3">
              <div className="relative">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800 text-sm font-medium text-slate-300">
                  {agent.name.charAt(0)}
                </div>
                <div
                  className={`absolute -bottom-0.5 -right-0.5 h-3 w-3 rounded-full border-2 border-slate-900 ${getStatusColor(
                    agent.status
                  )}`}
                ></div>
              </div>
              <div>
                <p className="font-medium text-white">{agent.name}</p>
                <p className="text-xs text-slate-400">{agent.lastActivity}</p>
              </div>
            </div>
            <div>
              <span
                className={`inline-flex items-center gap-1.5 rounded-full px-2.5 py-1 text-xs font-medium ${
                  agent.status === 'active'
                    ? 'bg-green-500/20 text-green-400'
                    : agent.status === 'thinking'
                    ? 'bg-yellow-500/20 text-yellow-400'
                    : agent.status === 'idle'
                    ? 'bg-slate-500/20 text-slate-400'
                    : 'bg-red-500/20 text-red-400'
                }`}
              >
                {agent.status === 'thinking' && (
                  <span className="flex gap-0.5">
                    <span className="h-1 w-1 animate-bounce rounded-full bg-current" style={{ animationDelay: '0ms' }}></span>
                    <span className="h-1 w-1 animate-bounce rounded-full bg-current" style={{ animationDelay: '150ms' }}></span>
                    <span className="h-1 w-1 animate-bounce rounded-full bg-current" style={{ animationDelay: '300ms' }}></span>
                  </span>
                )}
                {getStatusLabel(agent.status)}
              </span>
            </div>
          </div>
        ))}
      </div>

      <div className="mt-4 rounded-md border border-slate-800 bg-slate-800/30 p-3">
        <p className="text-xs text-slate-400">
          <span className="font-medium text-cyan-400">{agents.filter((a) => a.status === 'active').length}</span>{' '}
          agents active •{' '}
          <span className="font-medium text-yellow-400">{agents.filter((a) => a.status === 'thinking').length}</span>{' '}
          thinking •{' '}
          <span className="font-medium text-slate-400">{agents.filter((a) => a.status === 'idle').length}</span>{' '}
          idle
        </p>
      </div>
    </div>
  );
}
