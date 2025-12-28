'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import { useRouter } from 'next/navigation';
import {
  Search,
  MessageSquare,
  Bot,
  Shield,
  Settings,
  Plus,
  LogOut,
  Moon,
  Sun,
  Monitor,
  Home,
  Command,
  ArrowRight,
  Sparkles
} from 'lucide-react';
import { useAuthStore } from '@/stores/auth-store';
import { useThemeStore } from '@/stores/theme-store';
import { cn } from '@/lib/cn';

interface CommandItem {
  id: string;
  title: string;
  description?: string;
  icon: typeof Search;
  action: () => void;
  category: 'navigation' | 'actions' | 'theme';
  keywords?: string[];
}

export default function CommandPalette() {
  const [isOpen, setIsOpen] = useState(false);
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);
  const router = useRouter();
  const logout = useAuthStore((state) => state.logout);
  const { setTheme } = useThemeStore();

  const commands: CommandItem[] = useMemo(() => [
    // Navigation
    {
      id: 'workspace',
      title: 'Go to Conversations',
      description: 'View all your conversations',
      icon: MessageSquare,
      action: () => router.push('/workspace'),
      category: 'navigation',
      keywords: ['home', 'chats', 'messages'],
    },
    {
      id: 'agents',
      title: 'Go to Agents',
      description: 'Browse AI agents',
      icon: Bot,
      action: () => router.push('/agents'),
      category: 'navigation',
      keywords: ['ai', 'bots', 'assistants'],
    },
    {
      id: 'governance',
      title: 'Go to Governance',
      description: 'Manage policies and access',
      icon: Shield,
      action: () => router.push('/governance'),
      category: 'navigation',
      keywords: ['security', 'policies', 'access', 'roles'],
    },
    {
      id: 'account',
      title: 'Go to Account Settings',
      description: 'Manage your profile and preferences',
      icon: Settings,
      action: () => router.push('/account'),
      category: 'navigation',
      keywords: ['profile', 'settings', 'preferences'],
    },
    // Actions
    {
      id: 'new-conversation',
      title: 'New Conversation',
      description: 'Start a new chat with an AI agent',
      icon: Plus,
      action: () => router.push(`/conversations/${Date.now()}`),
      category: 'actions',
      keywords: ['create', 'start', 'chat'],
    },
    {
      id: 'logout',
      title: 'Sign Out',
      description: 'Log out of your account',
      icon: LogOut,
      action: () => {
        logout();
        router.push('/login');
      },
      category: 'actions',
      keywords: ['logout', 'exit', 'leave'],
    },
    // Theme
    {
      id: 'theme-light',
      title: 'Switch to Light Mode',
      description: 'Use light color theme',
      icon: Sun,
      action: () => setTheme('light'),
      category: 'theme',
      keywords: ['bright', 'day'],
    },
    {
      id: 'theme-dark',
      title: 'Switch to Dark Mode',
      description: 'Use dark color theme',
      icon: Moon,
      action: () => setTheme('dark'),
      category: 'theme',
      keywords: ['night', 'dim'],
    },
    {
      id: 'theme-system',
      title: 'Use System Theme',
      description: 'Follow system color preference',
      icon: Monitor,
      action: () => setTheme('system'),
      category: 'theme',
      keywords: ['auto', 'automatic'],
    },
  ], [router, logout, setTheme]);

  const filteredCommands = useMemo(() => {
    if (!query) return commands;
    const lowerQuery = query.toLowerCase();
    return commands.filter(
      (cmd) =>
        cmd.title.toLowerCase().includes(lowerQuery) ||
        cmd.description?.toLowerCase().includes(lowerQuery) ||
        cmd.keywords?.some((k) => k.includes(lowerQuery))
    );
  }, [commands, query]);

  const groupedCommands = useMemo(() => {
    const groups: Record<string, CommandItem[]> = {
      navigation: [],
      actions: [],
      theme: [],
    };
    filteredCommands.forEach((cmd) => {
      groups[cmd.category].push(cmd);
    });
    return groups;
  }, [filteredCommands]);

  const handleKeyDown = useCallback(
    (e: KeyboardEvent) => {
      // Open command palette
      if ((e.metaKey || e.ctrlKey) && e.key === 'k') {
        e.preventDefault();
        setIsOpen((prev) => !prev);
        return;
      }

      if (!isOpen) return;

      switch (e.key) {
        case 'ArrowDown':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev < filteredCommands.length - 1 ? prev + 1 : 0
          );
          break;
        case 'ArrowUp':
          e.preventDefault();
          setSelectedIndex((prev) =>
            prev > 0 ? prev - 1 : filteredCommands.length - 1
          );
          break;
        case 'Enter':
          e.preventDefault();
          if (filteredCommands[selectedIndex]) {
            filteredCommands[selectedIndex].action();
            setIsOpen(false);
            setQuery('');
          }
          break;
        case 'Escape':
          e.preventDefault();
          setIsOpen(false);
          setQuery('');
          break;
      }
    },
    [isOpen, filteredCommands, selectedIndex]
  );

  useEffect(() => {
    document.addEventListener('keydown', handleKeyDown);
    return () => document.removeEventListener('keydown', handleKeyDown);
  }, [handleKeyDown]);

  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  if (!isOpen) return null;

  let flatIndex = -1;

  return (
    <div className="fixed inset-0 z-[100] overflow-y-auto">
      {/* Backdrop */}
      <div
        className="fixed inset-0 bg-black/50 backdrop-blur-sm"
        onClick={() => {
          setIsOpen(false);
          setQuery('');
        }}
      />

      {/* Dialog */}
      <div className="relative min-h-screen flex items-start justify-center pt-[15vh] px-4">
        <div className="relative w-full max-w-xl bg-white dark:bg-gray-800 rounded-2xl shadow-2xl border border-gray-200 dark:border-gray-700 overflow-hidden">
          {/* Search Input */}
          <div className="flex items-center gap-3 px-4 border-b border-gray-200 dark:border-gray-700">
            <Search className="h-5 w-5 text-gray-400" />
            <input
              type="text"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search commands..."
              autoFocus
              className="flex-1 py-4 bg-transparent text-gray-900 dark:text-white placeholder-gray-400 focus:outline-none text-lg"
            />
            <kbd className="hidden sm:inline-flex items-center gap-1 px-2 py-1 bg-gray-100 dark:bg-gray-700 rounded text-xs text-gray-500 dark:text-gray-400 font-mono">
              ESC
            </kbd>
          </div>

          {/* Results */}
          <div className="max-h-[60vh] overflow-y-auto p-2">
            {filteredCommands.length === 0 ? (
              <div className="py-8 text-center text-gray-500 dark:text-gray-400">
                <Sparkles className="h-8 w-8 mx-auto mb-2 opacity-50" />
                <p>No commands found</p>
              </div>
            ) : (
              <>
                {Object.entries(groupedCommands).map(([category, items]) => {
                  if (items.length === 0) return null;
                  return (
                    <div key={category} className="mb-2">
                      <div className="px-3 py-2 text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider">
                        {category}
                      </div>
                      {items.map((cmd) => {
                        flatIndex++;
                        const Icon = cmd.icon;
                        const isSelected = flatIndex === selectedIndex;
                        return (
                          <button
                            key={cmd.id}
                            onClick={() => {
                              cmd.action();
                              setIsOpen(false);
                              setQuery('');
                            }}
                            className={cn(
                              'w-full flex items-center gap-3 px-3 py-3 rounded-lg text-left transition-colors',
                              isSelected
                                ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                                : 'text-gray-700 dark:text-gray-300 hover:bg-gray-100 dark:hover:bg-gray-700'
                            )}
                          >
                            <div className={cn(
                              'h-10 w-10 rounded-lg flex items-center justify-center',
                              isSelected
                                ? 'bg-blue-100 dark:bg-blue-800 text-blue-600 dark:text-blue-300'
                                : 'bg-gray-100 dark:bg-gray-700 text-gray-500 dark:text-gray-400'
                            )}>
                              <Icon className="h-5 w-5" />
                            </div>
                            <div className="flex-1 min-w-0">
                              <p className="font-medium truncate">{cmd.title}</p>
                              {cmd.description && (
                                <p className="text-sm text-gray-500 dark:text-gray-400 truncate">
                                  {cmd.description}
                                </p>
                              )}
                            </div>
                            {isSelected && (
                              <ArrowRight className="h-4 w-4 text-blue-500" />
                            )}
                          </button>
                        );
                      })}
                    </div>
                  );
                })}
              </>
            )}
          </div>

          {/* Footer */}
          <div className="flex items-center justify-between px-4 py-3 border-t border-gray-200 dark:border-gray-700 text-xs text-gray-400 dark:text-gray-500">
            <div className="flex items-center gap-4">
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded font-mono">↑↓</kbd>
                navigate
              </span>
              <span className="flex items-center gap-1">
                <kbd className="px-1.5 py-0.5 bg-gray-100 dark:bg-gray-700 rounded font-mono">↵</kbd>
                select
              </span>
            </div>
            <div className="flex items-center gap-1">
              <Command className="h-3 w-3" />
              <span>K to toggle</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
