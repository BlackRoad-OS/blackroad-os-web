'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import {
  MessageSquare,
  Bot,
  Shield,
  Settings,
  Plus,
  LogOut,
  X,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { useWorkspaceStore } from '@/stores/workspace-store';
import { cn } from '@/lib/cn';

interface SidebarProps {
  isOpen?: boolean;
  onClose?: () => void;
}

export default function Sidebar({ isOpen = true, onClose }: SidebarProps) {
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

  const handleNavClick = () => {
    // Close sidebar on mobile after navigation
    if (onClose) {
      onClose();
    }
  };

  return (
    <>
      {/* Mobile overlay */}
      {isOpen && (
        <div
          className="fixed inset-0 bg-black/50 z-40 lg:hidden"
          onClick={onClose}
        />
      )}

      {/* Sidebar */}
      <div
        className={cn(
          'fixed lg:static inset-y-0 left-0 z-50 flex h-screen w-64 flex-col bg-gray-900 text-white transform transition-transform duration-300 ease-in-out lg:translate-x-0',
          isOpen ? 'translate-x-0' : '-translate-x-full'
        )}
      >
        {/* Workspace header */}
        <div className="flex items-center justify-between p-4 border-b border-gray-800">
          <div className="flex items-center gap-2">
            <div className="h-8 w-8 rounded-lg bg-gradient-to-br from-blue-600 to-blue-800 flex items-center justify-center">
              <Sparkles className="h-4 w-4 text-white" />
            </div>
            <div>
              <h1 className="text-lg font-semibold">
                BlackRoad<span className="text-blue-400"> OS</span>
              </h1>
              <p className="text-xs text-gray-400">
                {currentWorkspace?.name || 'Workspace'}
              </p>
            </div>
          </div>
          {/* Mobile close button */}
          <button
            onClick={onClose}
            className="lg:hidden p-1 rounded-md hover:bg-gray-800 text-gray-400 hover:text-white"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        {/* New conversation button */}
        <div className="p-4">
          <Link
            href="/workspace?new=true"
            onClick={handleNavClick}
            className="flex items-center justify-center gap-2 w-full px-4 py-2.5 bg-blue-800 hover:bg-blue-700 rounded-lg text-sm font-medium transition-colors shadow-lg shadow-blue-900/30"
          >
            <Plus className="h-4 w-4" />
            New Conversation
          </Link>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-3 space-y-1 overflow-y-auto">
          {navigation.map((item) => {
            const isActive = pathname === item.href || pathname.startsWith(item.href + '/');
            return (
              <Link
                key={item.name}
                href={item.href}
                onClick={handleNavClick}
                className={cn(
                  'flex items-center gap-3 px-3 py-2.5 rounded-lg text-sm font-medium transition-all',
                  isActive
                    ? 'bg-gray-800 text-white shadow-md'
                    : 'text-gray-300 hover:bg-gray-800/70 hover:text-white'
                )}
              >
                <item.icon className={cn(
                  'h-5 w-5',
                  isActive && 'text-blue-400'
                )} />
                {item.name}
                {isActive && (
                  <span className="ml-auto h-1.5 w-1.5 rounded-full bg-blue-400" />
                )}
              </Link>
            );
          })}
        </nav>

        {/* User footer */}
        <div className="border-t border-gray-800 p-4">
          <button
            onClick={() => {
              logout();
              handleNavClick();
            }}
            className="flex items-center gap-3 px-3 py-2.5 w-full rounded-lg text-sm font-medium text-gray-300 hover:bg-gray-800 hover:text-white transition-colors"
          >
            <LogOut className="h-5 w-5" />
            Sign out
          </button>
        </div>
      </div>
    </>
  );
}
