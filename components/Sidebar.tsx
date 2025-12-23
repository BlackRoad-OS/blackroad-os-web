'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  Bot,
  Shield,
  Settings,
  Plus,
  LogOut
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { cn } from '@/lib/cn';

export default function Sidebar() {
  const pathname = usePathname();
  const logout = useAuthStore((state) => state.logout);
  const currentWorkspace = useWorkspaceStore((state) => state.currentWorkspace);

  const navigation = [
    {
      name: 'Conversations',
      href: '/workspace',
      icon: MessageSquare,
    },
    {
      name: 'Agents',
      href: '/agents',
      icon: Bot,
    },
    {
      name: 'Governance',
      href: '/governance',
      icon: Shield,
    },
    {
      name: 'Account',
      href: '/account',
      icon: Settings,
    },
  ];

  return (
    <div className="flex h-screen w-64 flex-col bg-gray-900 text-white">
      {/* Workspace header */}
      <div className="flex items-center justify-between p-4 border-b border-gray-800">
        <div>
          <h1 className="text-lg font-semibold">
            BlackRoad<span className="text-blue-400"> OS</span>
          </h1>
          <p className="text-xs text-gray-400 mt-1">
            {currentWorkspace?.name || 'Workspace'}
          </p>
        </div>
      </div>

      {/* New conversation button */}
      <div className="p-4">
        <Link
          href="/workspace?new=true"
          className="flex items-center justify-center gap-2 w-full px-4 py-2 bg-blue-800 hover:bg-blue-700 rounded-md text-sm font-medium transition-colors"
        >
          <Plus className="h-4 w-4" />
          New Conversation
        </Link>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 space-y-1">
        {navigation.map((item) => {
          const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
          return (
            <Link
              key={item.name}
              href={item.href}
              className={cn(
                'flex items-center gap-3 px-3 py-2 rounded-md text-sm font-medium transition-colors',
                isActive
                  ? 'bg-gray-800 text-white'
                  : 'text-gray-300 hover:bg-gray-800 hover:text-white'
              )}
            >
              <item.icon className="h-5 w-5" />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* User footer */}
      <div className="border-t border-gray-800 p-4">
        <button
          onClick={logout}
          className="flex items-center gap-3 px-3 py-2 w-full rounded-md text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
        >
          <LogOut className="h-5 w-5" />
          Sign out
        </button>
      </div>
    </div>
  );
}
