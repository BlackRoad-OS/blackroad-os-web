'use client';
import { useEffect, useState } from 'react';
import { BarChart3, TrendingUp, Globe, Cpu, Users, Activity } from 'lucide-react';

interface WorldStats { total: number; by_type: Record<string, number>; by_node: Record<string, number>; }
interface GatewayStats { status: string; session_calls: number; total_entries: number; }

export default function AnalyticsPage() {
  const [worlds, setWorlds] = useState<WorldStats | null>(null);
  const [gateway, setGateway] = useState<GatewayStats | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    Promise.allSettled([
      fetch('https://worlds.blackroad.io/stats').then(r => r.json()),
      fetch('http://127.0.0.1:8787/v1/memory').then(r => r.json()),
    ]).then(([w, g]) => {
      if (w.status === 'fulfilled') setWorlds(w.value);
      if (g.status === 'fulfilled') setGateway(g.value);
      setLoading(false);
    });
  }, []);

  const ORGS = 17; const REPOS = 1825; const AGENTS = 30000; const WORKERS = 75;

  const metrics = [
    { label: 'Organizations', value: ORGS, icon: Users, color: '#FF1D6C' },
    { label: 'Repositories', value: REPOS.toLocaleString() + '+', icon: Globe, color: '#2979FF' },
    { label: 'AI Agents', value: AGENTS.toLocaleString(), icon: Cpu, color: '#9C27B0' },
    { label: 'CF Workers', value: WORKERS + '+', icon: Activity, color: '#F5A623' },
    { label: 'Worlds Generated', value: worlds?.total ?? '...', icon: Globe, color: '#FF1D6C' },
    { label: 'Memory Entries', value: gateway?.total_entries ?? '...', icon: BarChart3, color: '#2979FF' },
  ];

  return (
    <div className="space-y-6 p-6">
      <div>
        <h1 className="text-2xl font-bold flex items-center gap-2"><BarChart3 size={24} /> Analytics</h1>
        <p className="text-gray-400 mt-1">System-wide performance metrics</p>
      </div>

      <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
        {metrics.map(m => (
          <div key={m.label} className="bg-gray-900 border border-gray-800 rounded-xl p-4">
            <div className="flex items-center gap-2 mb-2">
              <m.icon size={16} style={{ color: m.color }} />
              <span className="text-xs text-gray-400">{m.label}</span>
            </div>
            <p className="text-2xl font-bold">{loading && ['Worlds Generated','Memory Entries'].includes(m.label) ? '...' : m.value}</p>
          </div>
        ))}
      </div>

      {worlds && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h2 className="font-semibold mb-3 flex items-center gap-2"><TrendingUp size={16} /> Worlds by Type</h2>
          <div className="space-y-2">
            {Object.entries(worlds.by_type).sort(([,a],[,b]) => b-a).map(([type, count]) => (
              <div key={type} className="flex items-center gap-3">
                <span className="text-xs text-gray-400 w-32 capitalize">{type}</span>
                <div className="flex-1 h-2 bg-gray-800 rounded-full overflow-hidden">
                  <div className="h-full bg-gradient-to-r from-pink-500 to-violet-500 rounded-full" style={{ width: `${Math.min(100, (count / worlds.total) * 100 * 3)}%` }} />
                </div>
                <span className="text-xs text-gray-300 w-8 text-right">{count}</span>
              </div>
            ))}
          </div>
        </div>
      )}

      {worlds?.by_node && (
        <div className="bg-gray-900 border border-gray-800 rounded-xl p-4">
          <h2 className="font-semibold mb-3">Worlds by Node</h2>
          <div className="grid grid-cols-2 gap-4">
            {Object.entries(worlds.by_node).map(([node, count]) => (
              <div key={node} className="text-center p-3 bg-gray-800 rounded-lg">
                <p className="text-2xl font-bold">{count as number}</p>
                <p className="text-xs text-gray-400 mt-1">{node}</p>
              </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
}
