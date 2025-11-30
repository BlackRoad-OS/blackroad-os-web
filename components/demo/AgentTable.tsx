'use client';

import { useEffect, useState } from 'react';
import { listAgents, type Agent } from '../lib/trpc';

export default function AgentTable() {
  const [agents, setAgents] = useState<Agent[]>([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const load = async () => {
      setLoading(true);
      setError(null);
      try {
        const data = await listAgents();
        setAgents(data);
      } catch (err) {
        setError((err as Error).message);
      } finally {
        setLoading(false);
      }
    };

    void load();
  }, []);

  return (
    <div className="rounded-2xl border border-white/10 bg-white/5 p-6">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm text-white/70">Registry snapshot</p>
          <h2 className="text-2xl font-semibold">Agents</h2>
        </div>
        {loading && <span className="text-sm text-white/60">Loading…</span>}
      </div>
      {error && <p className="mt-3 text-sm text-red-300">{error}</p>}
      <div className="mt-4 overflow-hidden rounded-xl border border-white/10">
        <table className="min-w-full text-left text-sm">
          <thead className="bg-black/40 text-white/70">
            <tr>
              <th className="px-4 py-3">Name</th>
              <th className="px-4 py-3">Status</th>
              <th className="px-4 py-3">Last seen</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-white/10">
            {agents.map((agent) => (
              <tr key={agent.id} className="hover:bg-white/5">
                <td className="px-4 py-3 font-medium">{agent.name}</td>
                <td className="px-4 py-3">
                  <span
                    className={`rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-wide ${
                      agent.status === 'online'
                        ? 'bg-emerald-500/20 text-emerald-200'
                        : agent.status === 'degraded'
                          ? 'bg-amber-500/20 text-amber-100'
                          : 'bg-red-500/20 text-red-100'
                    }`}
                  >
                    {agent.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-white/70">{agent.lastSeen}</td>
              </tr>
            ))}
            {agents.length === 0 && !loading && (
              <tr>
                <td className="px-4 py-3 text-white/60" colSpan={3}>
                  No agents found. Seed the registry from the tour page.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
