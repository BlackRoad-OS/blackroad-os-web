'use client';

import { useState } from 'react';
import {
  Shield,
  Users,
  Key,
  FileText,
  AlertTriangle,
  CheckCircle,
  Clock,
  Lock,
  Unlock,
  Eye,
  Settings,
  Plus,
  Search,
  ChevronRight,
  Activity
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { toast } from '@/stores/toast-store';

interface Policy {
  id: string;
  name: string;
  description: string;
  status: 'active' | 'draft' | 'archived';
  lastUpdated: string;
  enforcedBy: string[];
}

interface AuditLog {
  id: string;
  action: string;
  user: string;
  resource: string;
  timestamp: string;
  status: 'success' | 'warning' | 'error';
}

interface Role {
  id: string;
  name: string;
  description: string;
  members: number;
  permissions: string[];
}

const policies: Policy[] = [
  {
    id: '1',
    name: 'Data Retention Policy',
    description: 'Defines how long conversation data and user interactions are retained.',
    status: 'active',
    lastUpdated: '2 days ago',
    enforcedBy: ['All Agents', 'Storage System'],
  },
  {
    id: '2',
    name: 'Agent Response Guidelines',
    description: 'Guidelines for AI agent responses including safety filters and content policies.',
    status: 'active',
    lastUpdated: '1 week ago',
    enforcedBy: ['Lucidia', 'Codex', 'Sage'],
  },
  {
    id: '3',
    name: 'Access Control Matrix',
    description: 'Role-based access control definitions for workspace resources.',
    status: 'active',
    lastUpdated: '3 days ago',
    enforcedBy: ['Auth System', 'API Gateway'],
  },
  {
    id: '4',
    name: 'Sensitive Data Handling',
    description: 'Rules for handling PII and other sensitive information in conversations.',
    status: 'draft',
    lastUpdated: '5 hours ago',
    enforcedBy: ['Sentinel'],
  },
];

const auditLogs: AuditLog[] = [
  { id: '1', action: 'Policy Updated', user: 'Admin', resource: 'Data Retention Policy', timestamp: '2 min ago', status: 'success' },
  { id: '2', action: 'New Member Added', user: 'System', resource: 'dev-team', timestamp: '15 min ago', status: 'success' },
  { id: '3', action: 'Permission Denied', user: 'guest@example.com', resource: 'admin-settings', timestamp: '1 hour ago', status: 'warning' },
  { id: '4', action: 'API Key Rotated', user: 'Admin', resource: 'Production API', timestamp: '3 hours ago', status: 'success' },
  { id: '5', action: 'Failed Login Attempt', user: 'unknown', resource: 'auth-system', timestamp: '5 hours ago', status: 'error' },
];

const roles: Role[] = [
  { id: '1', name: 'Admin', description: 'Full access to all workspace features', members: 2, permissions: ['all'] },
  { id: '2', name: 'Developer', description: 'Can access agents and create conversations', members: 8, permissions: ['agents:read', 'conversations:all', 'workspace:read'] },
  { id: '3', name: 'Viewer', description: 'Read-only access to conversations', members: 15, permissions: ['conversations:read', 'workspace:read'] },
];

export default function GovernancePage() {
  const [activeTab, setActiveTab] = useState<'overview' | 'policies' | 'roles' | 'audit'>('overview');

  const stats = [
    { label: 'Active Policies', value: policies.filter(p => p.status === 'active').length, icon: FileText, color: 'text-blue-600 dark:text-blue-400' },
    { label: 'Team Members', value: 25, icon: Users, color: 'text-green-600 dark:text-green-400' },
    { label: 'Active Roles', value: roles.length, icon: Key, color: 'text-purple-600 dark:text-purple-400' },
    { label: 'Security Score', value: '94%', icon: Shield, color: 'text-amber-600 dark:text-amber-400' },
  ];

  const tabs = [
    { id: 'overview', label: 'Overview', icon: Activity },
    { id: 'policies', label: 'Policies', icon: FileText },
    { id: 'roles', label: 'Roles & Access', icon: Key },
    { id: 'audit', label: 'Audit Log', icon: Clock },
  ];

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">Governance</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Manage policies, roles, and access controls for your workspace
            </p>
          </div>
          <button
            onClick={() => toast.info('Coming soon', 'Settings panel is under development')}
            className="inline-flex items-center gap-2 px-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 text-gray-700 dark:text-gray-300 rounded-lg font-medium hover:bg-gray-50 dark:hover:bg-gray-700 transition-colors"
          >
            <Settings className="h-4 w-4" />
            Security Settings
          </button>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-4 mb-8">
          {stats.map((stat) => {
            const Icon = stat.icon;
            return (
              <div
                key={stat.label}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-4"
              >
                <div className="flex items-center gap-3">
                  <div className={cn('p-2 rounded-lg bg-gray-100 dark:bg-gray-700', stat.color)}>
                    <Icon className="h-5 w-5" />
                  </div>
                  <div>
                    <p className="text-2xl font-bold text-gray-900 dark:text-white">{stat.value}</p>
                    <p className="text-sm text-gray-500 dark:text-gray-400">{stat.label}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>

        {/* Tabs */}
        <div className="border-b border-gray-200 dark:border-gray-700 mb-6">
          <nav className="flex gap-4 overflow-x-auto">
            {tabs.map((tab) => {
              const Icon = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveTab(tab.id as typeof activeTab)}
                  className={cn(
                    'flex items-center gap-2 px-4 py-3 text-sm font-medium border-b-2 transition-colors whitespace-nowrap',
                    activeTab === tab.id
                      ? 'border-blue-600 text-blue-600 dark:text-blue-400 dark:border-blue-400'
                      : 'border-transparent text-gray-500 dark:text-gray-400 hover:text-gray-700 dark:hover:text-gray-300'
                  )}
                >
                  <Icon className="h-4 w-4" />
                  {tab.label}
                </button>
              );
            })}
          </nav>
        </div>

        {/* Tab Content */}
        {activeTab === 'overview' && (
          <div className="grid lg:grid-cols-2 gap-6">
            {/* Compliance Status */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Compliance Status</h3>
              <div className="space-y-4">
                {['SOC 2', 'GDPR', 'HIPAA'].map((compliance) => (
                  <div key={compliance} className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <CheckCircle className="h-5 w-5 text-green-500" />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{compliance}</span>
                    </div>
                    <span className="text-xs px-2 py-1 bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400 rounded-full">
                      Compliant
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* Recent Activity */}
            <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6">
              <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-4">Recent Activity</h3>
              <div className="space-y-3">
                {auditLogs.slice(0, 4).map((log) => (
                  <div key={log.id} className="flex items-center justify-between py-2 border-b border-gray-100 dark:border-gray-700 last:border-0">
                    <div className="flex items-center gap-3">
                      <span className={cn(
                        'h-2 w-2 rounded-full',
                        log.status === 'success' && 'bg-green-500',
                        log.status === 'warning' && 'bg-yellow-500',
                        log.status === 'error' && 'bg-red-500'
                      )} />
                      <span className="text-sm text-gray-700 dark:text-gray-300">{log.action}</span>
                    </div>
                    <span className="text-xs text-gray-400">{log.timestamp}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {activeTab === 'policies' && (
          <div className="space-y-4">
            <div className="flex justify-between items-center">
              <div className="relative max-w-xs">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
                <input
                  type="text"
                  placeholder="Search policies..."
                  className="w-full pl-10 pr-4 py-2 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-sm"
                />
              </div>
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-medium text-sm">
                <Plus className="h-4 w-4" />
                New Policy
              </button>
            </div>

            {policies.map((policy) => (
              <div
                key={policy.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6 hover:shadow-md transition-shadow cursor-pointer"
              >
                <div className="flex items-start justify-between">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-2">
                      <h4 className="font-semibold text-gray-900 dark:text-white">{policy.name}</h4>
                      <span className={cn(
                        'text-xs px-2 py-1 rounded-full',
                        policy.status === 'active' && 'bg-green-100 dark:bg-green-900/30 text-green-700 dark:text-green-400',
                        policy.status === 'draft' && 'bg-yellow-100 dark:bg-yellow-900/30 text-yellow-700 dark:text-yellow-400',
                        policy.status === 'archived' && 'bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-400'
                      )}>
                        {policy.status}
                      </span>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 mb-3">{policy.description}</p>
                    <div className="flex items-center gap-4 text-xs text-gray-500 dark:text-gray-400">
                      <span>Updated {policy.lastUpdated}</span>
                      <span>•</span>
                      <span>Enforced by: {policy.enforcedBy.join(', ')}</span>
                    </div>
                  </div>
                  <ChevronRight className="h-5 w-5 text-gray-400" />
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'roles' && (
          <div className="space-y-4">
            <div className="flex justify-end">
              <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-medium text-sm">
                <Plus className="h-4 w-4" />
                Create Role
              </button>
            </div>

            {roles.map((role) => (
              <div
                key={role.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 p-6"
              >
                <div className="flex items-start justify-between mb-4">
                  <div>
                    <div className="flex items-center gap-3 mb-1">
                      <Key className="h-5 w-5 text-blue-600 dark:text-blue-400" />
                      <h4 className="font-semibold text-gray-900 dark:text-white">{role.name}</h4>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400">{role.description}</p>
                  </div>
                  <span className="text-sm text-gray-500 dark:text-gray-400">
                    {role.members} members
                  </span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {role.permissions.map((perm) => (
                    <span
                      key={perm}
                      className="inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                    >
                      {perm === 'all' ? <Unlock className="h-3 w-3" /> : <Lock className="h-3 w-3" />}
                      {perm}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        )}

        {activeTab === 'audit' && (
          <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead className="bg-gray-50 dark:bg-gray-900">
                  <tr>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Action</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">User</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Resource</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Time</th>
                    <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 dark:text-gray-400 uppercase tracking-wider">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-gray-200 dark:divide-gray-700">
                  {auditLogs.map((log) => (
                    <tr key={log.id} className="hover:bg-gray-50 dark:hover:bg-gray-700/50">
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-900 dark:text-white">{log.action}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{log.user}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-600 dark:text-gray-400">{log.resource}</td>
                      <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500 dark:text-gray-400">{log.timestamp}</td>
                      <td className="px-6 py-4 whitespace-nowrap">
                        <span className={cn(
                          'inline-flex items-center gap-1 text-xs',
                          log.status === 'success' && 'text-green-600 dark:text-green-400',
                          log.status === 'warning' && 'text-yellow-600 dark:text-yellow-400',
                          log.status === 'error' && 'text-red-600 dark:text-red-400'
                        )}>
                          {log.status === 'success' && <CheckCircle className="h-3 w-3" />}
                          {log.status === 'warning' && <AlertTriangle className="h-3 w-3" />}
                          {log.status === 'error' && <AlertTriangle className="h-3 w-3" />}
                          {log.status}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
