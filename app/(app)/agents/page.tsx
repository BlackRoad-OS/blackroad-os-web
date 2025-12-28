'use client';

import { useState } from 'react';
import {
  Bot,
  Sparkles,
  Zap,
  Shield,
  Code,
  Brain,
  MessageSquare,
  Activity,
  Search,
  Filter,
  Plus,
  ExternalLink,
  Star,
  Clock
} from 'lucide-react';
import { cn } from '@/lib/cn';
import { toast } from '@/stores/toast-store';

interface Agent {
  id: string;
  name: string;
  description: string;
  category: 'core' | 'specialized' | 'community';
  icon: typeof Bot;
  color: string;
  status: 'active' | 'idle' | 'unavailable';
  capabilities: string[];
  usageCount: number;
  rating: number;
}

const agents: Agent[] = [
  {
    id: 'lucidia',
    name: 'Lucidia',
    description: 'Primary AI companion for conversations and task assistance. Expert in general knowledge and creative problem-solving.',
    category: 'core',
    icon: Sparkles,
    color: 'from-blue-600 to-purple-600',
    status: 'active',
    capabilities: ['Conversation', 'Analysis', 'Writing', 'Research'],
    usageCount: 15420,
    rating: 4.9,
  },
  {
    id: 'alice',
    name: 'Alice',
    description: 'Infrastructure and deployment specialist. Manages CI/CD pipelines, Docker containers, and cloud resources.',
    category: 'core',
    icon: Zap,
    color: 'from-amber-500 to-orange-600',
    status: 'active',
    capabilities: ['DevOps', 'Docker', 'CI/CD', 'Cloud'],
    usageCount: 8934,
    rating: 4.8,
  },
  {
    id: 'aria',
    name: 'Aria',
    description: 'Infrastructure Queen specializing in system architecture, monitoring, and reliability engineering.',
    category: 'core',
    icon: Activity,
    color: 'from-pink-500 to-rose-600',
    status: 'active',
    capabilities: ['Architecture', 'Monitoring', 'SRE', 'Performance'],
    usageCount: 6721,
    rating: 4.9,
  },
  {
    id: 'codex',
    name: 'Codex',
    description: 'Code generation and review specialist. Expert in multiple programming languages and best practices.',
    category: 'specialized',
    icon: Code,
    color: 'from-green-500 to-emerald-600',
    status: 'active',
    capabilities: ['Code Review', 'Generation', 'Refactoring', 'Testing'],
    usageCount: 12890,
    rating: 4.7,
  },
  {
    id: 'sentinel',
    name: 'Sentinel',
    description: 'Security and governance agent. Monitors for vulnerabilities and ensures compliance with policies.',
    category: 'specialized',
    icon: Shield,
    color: 'from-red-500 to-rose-600',
    status: 'idle',
    capabilities: ['Security Audit', 'Compliance', 'Vulnerability Scan', 'Access Control'],
    usageCount: 4523,
    rating: 4.8,
  },
  {
    id: 'sage',
    name: 'Sage',
    description: 'Knowledge management and research agent. Excels at information synthesis and learning assistance.',
    category: 'specialized',
    icon: Brain,
    color: 'from-violet-500 to-purple-600',
    status: 'active',
    capabilities: ['Research', 'Documentation', 'Learning', 'Synthesis'],
    usageCount: 7654,
    rating: 4.6,
  },
];

const categories = [
  { id: 'all', label: 'All Agents' },
  { id: 'core', label: 'Core' },
  { id: 'specialized', label: 'Specialized' },
  { id: 'community', label: 'Community' },
];

export default function AgentsPage() {
  const [searchQuery, setSearchQuery] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('all');
  const [selectedAgent, setSelectedAgent] = useState<Agent | null>(null);

  const filteredAgents = agents.filter((agent) => {
    const matchesSearch = agent.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      agent.description.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesCategory = selectedCategory === 'all' || agent.category === selectedCategory;
    return matchesSearch && matchesCategory;
  });

  const handleStartChat = (agent: Agent) => {
    toast.success(`Starting chat with ${agent.name}`, 'Opening new conversation...');
  };

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-8">
          <div>
            <h1 className="text-2xl font-bold text-gray-900 dark:text-white">AI Agents</h1>
            <p className="mt-1 text-sm text-gray-500 dark:text-gray-400">
              Discover and interact with specialized AI agents in your workspace
            </p>
          </div>
          <button className="inline-flex items-center gap-2 px-4 py-2 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors">
            <Plus className="h-4 w-4" />
            Create Custom Agent
          </button>
        </div>

        {/* Search and Filters */}
        <div className="flex flex-col sm:flex-row gap-4 mb-6">
          <div className="relative flex-1">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
            <input
              type="text"
              placeholder="Search agents..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-10 pr-4 py-2.5 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-lg text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
          </div>
          <div className="flex gap-2 overflow-x-auto pb-2 sm:pb-0">
            {categories.map((category) => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                className={cn(
                  'px-4 py-2.5 rounded-lg font-medium text-sm whitespace-nowrap transition-colors',
                  selectedCategory === category.id
                    ? 'bg-blue-800 text-white'
                    : 'bg-white dark:bg-gray-800 text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700 border border-gray-300 dark:border-gray-600'
                )}
              >
                {category.label}
              </button>
            ))}
          </div>
        </div>

        {/* Agents Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredAgents.map((agent) => {
            const Icon = agent.icon;
            return (
              <div
                key={agent.id}
                className="bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 overflow-hidden hover:shadow-lg transition-shadow cursor-pointer group"
                onClick={() => setSelectedAgent(agent)}
              >
                {/* Agent Header */}
                <div className="p-6">
                  <div className="flex items-start justify-between mb-4">
                    <div className={cn(
                      'h-12 w-12 rounded-xl bg-gradient-to-br flex items-center justify-center text-white',
                      agent.color
                    )}>
                      <Icon className="h-6 w-6" />
                    </div>
                    <div className="flex items-center gap-1.5">
                      <span className={cn(
                        'h-2 w-2 rounded-full',
                        agent.status === 'active' && 'bg-green-500',
                        agent.status === 'idle' && 'bg-yellow-500',
                        agent.status === 'unavailable' && 'bg-gray-400'
                      )} />
                      <span className="text-xs text-gray-500 dark:text-gray-400 capitalize">
                        {agent.status}
                      </span>
                    </div>
                  </div>

                  <h3 className="text-lg font-semibold text-gray-900 dark:text-white mb-2">
                    {agent.name}
                  </h3>
                  <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-4">
                    {agent.description}
                  </p>

                  {/* Capabilities */}
                  <div className="flex flex-wrap gap-2 mb-4">
                    {agent.capabilities.slice(0, 3).map((cap) => (
                      <span
                        key={cap}
                        className="px-2 py-1 bg-gray-100 dark:bg-gray-700 text-gray-600 dark:text-gray-300 text-xs rounded-md"
                      >
                        {cap}
                      </span>
                    ))}
                    {agent.capabilities.length > 3 && (
                      <span className="px-2 py-1 text-gray-400 text-xs">
                        +{agent.capabilities.length - 3} more
                      </span>
                    )}
                  </div>

                  {/* Stats */}
                  <div className="flex items-center justify-between pt-4 border-t border-gray-100 dark:border-gray-700">
                    <div className="flex items-center gap-1 text-sm text-gray-500 dark:text-gray-400">
                      <MessageSquare className="h-4 w-4" />
                      <span>{agent.usageCount.toLocaleString()}</span>
                    </div>
                    <div className="flex items-center gap-1 text-sm text-amber-500">
                      <Star className="h-4 w-4 fill-current" />
                      <span>{agent.rating}</span>
                    </div>
                  </div>
                </div>

                {/* Hover Action */}
                <div className="px-6 pb-6 opacity-0 group-hover:opacity-100 transition-opacity">
                  <button
                    onClick={(e) => {
                      e.stopPropagation();
                      handleStartChat(agent);
                    }}
                    className="w-full py-2.5 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center gap-2"
                  >
                    <MessageSquare className="h-4 w-4" />
                    Start Conversation
                  </button>
                </div>
              </div>
            );
          })}
        </div>

        {/* Empty State */}
        {filteredAgents.length === 0 && (
          <div className="text-center py-12">
            <Bot className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <h3 className="text-lg font-medium text-gray-900 dark:text-white mb-2">
              No agents found
            </h3>
            <p className="text-gray-500 dark:text-gray-400">
              Try adjusting your search or filter criteria
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
