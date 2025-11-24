'use client';

import { useState } from 'react';
import Link from 'next/link';
import AgentLightbar from '../../components/AgentLightbar';

export default function DashboardPage() {
  const [stats] = useState({
    activeAgents: 12,
    totalOperations: 8547,
    successRate: 98.5,
    avgResponseTime: 145,
  });

  const recentActivity = [
    { id: 1, agent: 'Lucidia', action: 'Processed user query', timestamp: '2 minutes ago', status: 'success' },
    { id: 2, agent: 'Sentinel', action: 'Security scan completed', timestamp: '5 minutes ago', status: 'success' },
    { id: 3, agent: 'Orchestrator', action: 'Workflow initialized', timestamp: '8 minutes ago', status: 'success' },
    { id: 4, agent: 'Guardian', action: 'Anomaly detected', timestamp: '12 minutes ago', status: 'warning' },
    { id: 5, agent: 'Analyzer', action: 'Data analysis complete', timestamp: '15 minutes ago', status: 'success' },
  ];

  return (
    <div className="min-h-[calc(100vh-4rem)] px-6 py-12">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-8 flex items-center justify-between">
          <div>
            <h1 className="text-3xl font-bold text-white">Dashboard</h1>
            <p className="mt-2 text-slate-400">Welcome back to your BlackRoad OS Prism Console</p>
          </div>
          <Link
            href="/settings"
            className="rounded-full border border-slate-700 px-4 py-2 text-sm font-medium text-white transition hover:bg-slate-800"
          >
            Settings
          </Link>
        </div>

        {/* Stats Grid */}
        <div className="mb-8 grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Active Agents</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.activeAgents}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-cyan-500/20">
                <svg className="h-6 w-6 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-xs text-green-400">+2 from yesterday</p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Total Operations</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.totalOperations.toLocaleString()}</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-blue-500/20">
                <svg className="h-6 w-6 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M13 10V3L4 14h7v7l9-11h-7z"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-xs text-green-400">+12% from last week</p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Success Rate</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.successRate}%</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-green-500/20">
                <svg className="h-6 w-6 text-green-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-xs text-green-400">+0.3% improvement</p>
          </div>

          <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm text-slate-400">Avg Response</p>
                <p className="mt-2 text-3xl font-bold text-white">{stats.avgResponseTime}ms</p>
              </div>
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-purple-500/20">
                <svg className="h-6 w-6 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z"
                  />
                </svg>
              </div>
            </div>
            <p className="mt-2 text-xs text-green-400">-15ms faster</p>
          </div>
        </div>

        <div className="grid gap-8 lg:grid-cols-3">
          {/* Recent Activity */}
          <div className="lg:col-span-2">
            <div className="rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
              <h2 className="mb-6 text-xl font-semibold text-white">Recent Activity</h2>
              <div className="space-y-4">
                {recentActivity.map((activity) => (
                  <div
                    key={activity.id}
                    className="flex items-center justify-between rounded-md border border-slate-800 bg-slate-800/50 p-4"
                  >
                    <div className="flex items-center gap-4">
                      <div className="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-br from-slate-700 to-slate-800">
                        <span className="text-sm font-medium text-slate-300">{activity.agent.charAt(0)}</span>
                      </div>
                      <div>
                        <p className="font-medium text-white">{activity.agent}</p>
                        <p className="text-sm text-slate-400">{activity.action}</p>
                      </div>
                    </div>
                    <div className="text-right">
                      <p className="text-xs text-slate-500">{activity.timestamp}</p>
                      <span
                        className={`mt-1 inline-flex rounded-full px-2 py-0.5 text-xs font-medium ${
                          activity.status === 'success'
                            ? 'bg-green-500/20 text-green-400'
                            : 'bg-yellow-500/20 text-yellow-400'
                        }`}
                      >
                        {activity.status}
                      </span>
                    </div>
                  </div>
                ))}
              </div>
              <button className="mt-4 w-full rounded-md border border-slate-700 py-2 text-sm font-medium text-slate-300 transition hover:bg-slate-800">
                View all activity
              </button>
            </div>
          </div>

          {/* Agent Status */}
          <div className="lg:col-span-1">
            <AgentLightbar />

            {/* Quick Actions */}
            <div className="mt-8 rounded-lg border border-slate-800 bg-slate-900/50 p-6 backdrop-blur-sm">
              <h3 className="mb-4 text-lg font-semibold text-white">Quick Actions</h3>
              <div className="space-y-3">
                <button className="flex w-full items-center gap-3 rounded-md border border-slate-700 bg-slate-800/50 p-3 text-left transition hover:bg-slate-800">
                  <svg className="h-5 w-5 text-cyan-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v16m8-8H4" />
                  </svg>
                  <span className="text-sm font-medium text-white">Deploy New Agent</span>
                </button>
                <button className="flex w-full items-center gap-3 rounded-md border border-slate-700 bg-slate-800/50 p-3 text-left transition hover:bg-slate-800">
                  <svg className="h-5 w-5 text-blue-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z"
                    />
                  </svg>
                  <span className="text-sm font-medium text-white">View Analytics</span>
                </button>
                <button className="flex w-full items-center gap-3 rounded-md border border-slate-700 bg-slate-800/50 p-3 text-left transition hover:bg-slate-800">
                  <svg className="h-5 w-5 text-purple-400" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z"
                    />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                  </svg>
                  <span className="text-sm font-medium text-white">Configure System</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
