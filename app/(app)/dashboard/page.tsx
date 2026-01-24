'use client';

import { useState, useEffect } from 'react';
import {
  MessageSquare,
  Clock,
  Zap,
  TrendingUp,
  Users,
  Bot,
  Calendar,
  BarChart3,
  Activity,
  ArrowUpRight,
  ArrowDownRight,
  Sparkles,
  Code,
  Shield,
  Database,
  Brain,
} from 'lucide-react';
import { cn } from '@/lib/cn';

interface StatCard {
  title: string;
  value: string;
  change: number;
  changeLabel: string;
  icon: React.ElementType;
  color: string;
}

interface AgentUsage {
  name: string;
  icon: React.ElementType;
  color: string;
  messages: number;
  percentage: number;
}

interface ActivityItem {
  id: string;
  action: string;
  agent: string;
  timestamp: string;
  type: 'conversation' | 'task' | 'system';
}

const stats: StatCard[] = [
  {
    title: 'Total Conversations',
    value: '128',
    change: 12,
    changeLabel: 'vs last week',
    icon: MessageSquare,
    color: 'from-blue-500 to-blue-600',
  },
  {
    title: 'Messages Sent',
    value: '2,847',
    change: 23,
    changeLabel: 'vs last week',
    icon: Zap,
    color: 'from-purple-500 to-purple-600',
  },
  {
    title: 'Active Time',
    value: '47.2h',
    change: -5,
    changeLabel: 'vs last week',
    icon: Clock,
    color: 'from-green-500 to-green-600',
  },
  {
    title: 'Tasks Completed',
    value: '89',
    change: 34,
    changeLabel: 'vs last week',
    icon: TrendingUp,
    color: 'from-orange-500 to-orange-600',
  },
];

const agentUsage: AgentUsage[] = [
  { name: 'Lucidia', icon: Sparkles, color: 'bg-blue-500', messages: 1245, percentage: 44 },
  { name: 'Codex', icon: Code, color: 'bg-green-500', messages: 892, percentage: 31 },
  { name: 'Aria', icon: Database, color: 'bg-purple-500', messages: 412, percentage: 14 },
  { name: 'Sentinel', icon: Shield, color: 'bg-red-500', messages: 198, percentage: 7 },
  { name: 'Nova', icon: Brain, color: 'bg-amber-500', messages: 100, percentage: 4 },
];

const recentActivity: ActivityItem[] = [
  { id: '1', action: 'Started new conversation', agent: 'Lucidia', timestamp: '2 min ago', type: 'conversation' },
  { id: '2', action: 'Completed code review', agent: 'Codex', timestamp: '15 min ago', type: 'task' },
  { id: '3', action: 'Generated infrastructure diagram', agent: 'Aria', timestamp: '1 hour ago', type: 'task' },
  { id: '4', action: 'Security scan completed', agent: 'Sentinel', timestamp: '2 hours ago', type: 'system' },
  { id: '5', action: 'Research task finished', agent: 'Nova', timestamp: '3 hours ago', type: 'task' },
  { id: '6', action: 'API endpoint created', agent: 'Codex', timestamp: '5 hours ago', type: 'task' },
];

const weeklyData = [
  { day: 'Mon', messages: 320, conversations: 12 },
  { day: 'Tue', messages: 480, conversations: 18 },
  { day: 'Wed', messages: 390, conversations: 15 },
  { day: 'Thu', messages: 520, conversations: 22 },
  { day: 'Fri', messages: 610, conversations: 28 },
  { day: 'Sat', messages: 280, conversations: 10 },
  { day: 'Sun', messages: 247, conversations: 8 },
];

export default function DashboardPage() {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 500);
    return () => clearTimeout(timer);
  }, []);

  const maxMessages = Math.max(...weeklyData.map((d) => d.messages));

  if (isLoading) {
    return (
      <div className="min-h-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
        <div className="max-w-7xl mx-auto">
          <div className="animate-pulse">
            <div className="h-8 w-48 bg-gray-200 dark:bg-gray-800 rounded mb-2" />
            <div className="h-4 w-64 bg-gray-200 dark:bg-gray-800 rounded mb-6" />
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
              {[1, 2, 3, 4].map((i) => (
                <div key={i} className="h-32 bg-gray-200 dark:bg-gray-800 rounded-xl" />
              ))}
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-6">
          <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
            Dashboard
          </h1>
          <p className="text-gray-600 dark:text-gray-400">
            Your AI collaboration analytics and insights
          </p>
        </div>

        {/* Stats Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
          {stats.map((stat) => (
            <div
              key={stat.title}
              className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700 hover:shadow-lg transition-shadow"
            >
              <div className="flex items-start justify-between mb-4">
                <div
                  className={cn(
                    'h-10 w-10 rounded-lg bg-gradient-to-br flex items-center justify-center text-white',
                    stat.color
                  )}
                >
                  <stat.icon className="h-5 w-5" />
                </div>
                <div
                  className={cn(
                    'flex items-center gap-1 text-sm font-medium',
                    stat.change >= 0 ? 'text-green-600' : 'text-red-500'
                  )}
                >
                  {stat.change >= 0 ? (
                    <ArrowUpRight className="h-4 w-4" />
                  ) : (
                    <ArrowDownRight className="h-4 w-4" />
                  )}
                  {Math.abs(stat.change)}%
                </div>
              </div>
              <h3 className="text-2xl font-bold text-gray-900 dark:text-white mb-1">
                {stat.value}
              </h3>
              <p className="text-sm text-gray-500 dark:text-gray-400">{stat.title}</p>
            </div>
          ))}
        </div>

        {/* Charts Row */}
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          {/* Weekly Activity Chart */}
          <div className="lg:col-span-2 bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Weekly Activity
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Messages and conversations this week
                </p>
              </div>
              <div className="flex items-center gap-4 text-sm">
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-blue-500" />
                  <span className="text-gray-600 dark:text-gray-400">Messages</span>
                </div>
                <div className="flex items-center gap-2">
                  <div className="h-3 w-3 rounded-full bg-purple-500" />
                  <span className="text-gray-600 dark:text-gray-400">Conversations</span>
                </div>
              </div>
            </div>
            <div className="flex items-end justify-between gap-2 h-48">
              {weeklyData.map((day) => (
                <div key={day.day} className="flex-1 flex flex-col items-center gap-2">
                  <div className="w-full flex flex-col items-center gap-1">
                    <div
                      className="w-full max-w-[40px] bg-blue-500 rounded-t-md transition-all hover:bg-blue-600"
                      style={{ height: `${(day.messages / maxMessages) * 160}px` }}
                    />
                  </div>
                  <span className="text-xs text-gray-500 dark:text-gray-400 font-medium">
                    {day.day}
                  </span>
                </div>
              ))}
            </div>
          </div>

          {/* Agent Usage */}
          <div className="bg-white dark:bg-gray-800 rounded-xl p-5 border border-gray-200 dark:border-gray-700">
            <div className="flex items-center justify-between mb-6">
              <div>
                <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                  Agent Usage
                </h2>
                <p className="text-sm text-gray-500 dark:text-gray-400">
                  Distribution by agent
                </p>
              </div>
              <Bot className="h-5 w-5 text-gray-400" />
            </div>
            <div className="space-y-4">
              {agentUsage.map((agent) => (
                <div key={agent.name}>
                  <div className="flex items-center justify-between mb-1">
                    <div className="flex items-center gap-2">
                      <div
                        className={cn(
                          'h-6 w-6 rounded-full flex items-center justify-center text-white',
                          agent.color
                        )}
                      >
                        <agent.icon className="h-3 w-3" />
                      </div>
                      <span className="text-sm font-medium text-gray-700 dark:text-gray-300">
                        {agent.name}
                      </span>
                    </div>
                    <span className="text-sm text-gray-500 dark:text-gray-400">
                      {agent.percentage}%
                    </span>
                  </div>
                  <div className="h-2 bg-gray-100 dark:bg-gray-700 rounded-full overflow-hidden">
                    <div
                      className={cn('h-full rounded-full transition-all', agent.color)}
                      style={{ width: `${agent.percentage}%` }}
                    />
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Recent Activity */}
        <div className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700">
          <div className="flex items-center justify-between p-5 border-b border-gray-200 dark:border-gray-700">
            <div>
              <h2 className="text-lg font-semibold text-gray-900 dark:text-white">
                Recent Activity
              </h2>
              <p className="text-sm text-gray-500 dark:text-gray-400">
                Your latest interactions
              </p>
            </div>
            <Activity className="h-5 w-5 text-gray-400" />
          </div>
          <div className="divide-y divide-gray-200 dark:divide-gray-700">
            {recentActivity.map((activity) => (
              <div
                key={activity.id}
                className="flex items-center gap-4 p-4 hover:bg-gray-50 dark:hover:bg-gray-700/50 transition-colors"
              >
                <div
                  className={cn(
                    'h-10 w-10 rounded-full flex items-center justify-center',
                    activity.type === 'conversation'
                      ? 'bg-blue-100 dark:bg-blue-900/30 text-blue-600 dark:text-blue-400'
                      : activity.type === 'task'
                      ? 'bg-green-100 dark:bg-green-900/30 text-green-600 dark:text-green-400'
                      : 'bg-purple-100 dark:bg-purple-900/30 text-purple-600 dark:text-purple-400'
                  )}
                >
                  {activity.type === 'conversation' ? (
                    <MessageSquare className="h-5 w-5" />
                  ) : activity.type === 'task' ? (
                    <Zap className="h-5 w-5" />
                  ) : (
                    <BarChart3 className="h-5 w-5" />
                  )}
                </div>
                <div className="flex-1 min-w-0">
                  <p className="text-sm font-medium text-gray-900 dark:text-white">
                    {activity.action}
                  </p>
                  <p className="text-xs text-gray-500 dark:text-gray-400">
                    with {activity.agent}
                  </p>
                </div>
                <span className="text-xs text-gray-500 dark:text-gray-400 whitespace-nowrap">
                  {activity.timestamp}
                </span>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
