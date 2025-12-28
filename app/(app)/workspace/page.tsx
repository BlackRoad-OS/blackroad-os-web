'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Plus, Search, Clock, Sparkles, Trash2 } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { ConversationCardSkeleton } from '@/components/Skeleton';
import { toast } from '@/stores/toast-store';

interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  agent: string;
}

export default function WorkspacePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [conversations, setConversations] = useState<Conversation[]>([
    {
      id: '1',
      title: 'Getting Started with BlackRoad OS',
      lastMessage: 'How can I help you today? I can assist with code generation, debugging, research, and more.',
      timestamp: '2 hours ago',
      agent: 'Lucidia',
    },
    {
      id: '2',
      title: 'Project Planning Session',
      lastMessage: 'Let me summarize the key tasks and milestones we discussed...',
      timestamp: 'Yesterday',
      agent: 'Lucidia',
    },
    {
      id: '3',
      title: 'Code Review: API Endpoints',
      lastMessage: 'I found a few potential improvements in your authentication logic.',
      timestamp: '3 days ago',
      agent: 'Codex',
    },
    {
      id: '4',
      title: 'Infrastructure Setup',
      lastMessage: 'Your Docker configuration looks good! Here are some optimization tips...',
      timestamp: 'Last week',
      agent: 'Aria',
    },
  ]);

  useEffect(() => {
    // Simulate loading
    const timer = setTimeout(() => setIsLoading(false), 800);
    return () => clearTimeout(timer);
  }, []);

  const filteredConversations = conversations.filter(
    (conv) =>
      conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
      conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
  );

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setConversations(prev => prev.filter(c => c.id !== id));
    toast.success('Conversation deleted');
  };

  const handleNewConversation = () => {
    const newId = Date.now().toString();
    router.push(`/conversations/${newId}`);
  };

  return (
    <div className="min-h-full bg-gray-50 dark:bg-gray-900 p-4 sm:p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between gap-4 mb-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-bold text-gray-900 dark:text-white mb-1">
              Conversations
            </h1>
            <p className="text-gray-600 dark:text-gray-400">
              Continue your conversations or start a new one
            </p>
          </div>
          <button
            onClick={handleNewConversation}
            className="inline-flex items-center justify-center gap-2 px-4 py-2.5 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors shadow-lg shadow-blue-900/20"
          >
            <Plus className="h-5 w-5" />
            New Conversation
          </button>
        </div>

        {/* Search */}
        <div className="relative mb-6">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
          <input
            type="text"
            placeholder="Search conversations..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
            className="w-full pl-10 pr-4 py-3 bg-white dark:bg-gray-800 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
        </div>

        {/* Loading state */}
        {isLoading && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {[1, 2, 3, 4, 5, 6].map((i) => (
              <ConversationCardSkeleton key={i} />
            ))}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && filteredConversations.length === 0 && (
          <div className="flex flex-col items-center justify-center py-16 sm:py-20">
            <div className="h-20 w-20 sm:h-24 sm:w-24 rounded-full bg-gray-100 dark:bg-gray-800 flex items-center justify-center mb-6">
              <MessageSquare className="h-10 w-10 sm:h-12 sm:w-12 text-gray-400" />
            </div>
            <h3 className="text-lg sm:text-xl font-semibold text-gray-900 dark:text-white mb-2 text-center">
              {searchQuery ? 'No conversations found' : 'No conversations yet'}
            </h3>
            <p className="text-gray-600 dark:text-gray-400 mb-6 text-center max-w-md px-4">
              {searchQuery
                ? 'Try adjusting your search terms'
                : 'Start your first conversation with Lucidia to begin collaborating on your projects'}
            </p>
            {!searchQuery && (
              <button
                onClick={handleNewConversation}
                className="flex items-center gap-2 px-6 py-3 bg-blue-800 hover:bg-blue-700 text-white rounded-lg font-medium transition-colors"
              >
                <Plus className="h-5 w-5" />
                Start a Conversation
              </button>
            )}
          </div>
        )}

        {/* Conversation grid */}
        {!isLoading && filteredConversations.length > 0 && (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredConversations.map((conversation) => (
              <Link
                key={conversation.id}
                href={`/conversations/${conversation.id}`}
                className="group bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl p-5 hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-lg transition-all"
              >
                <div className="flex items-start gap-4">
                  <div className="h-10 w-10 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-white flex-shrink-0 shadow-md">
                    <Sparkles className="h-5 w-5" />
                  </div>
                  <div className="flex-1 min-w-0">
                    <div className="flex items-start justify-between gap-2">
                      <h3 className="font-semibold text-gray-900 dark:text-white mb-1 truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        {conversation.title}
                      </h3>
                      <button
                        onClick={(e) => handleDelete(conversation.id, e)}
                        className="opacity-0 group-hover:opacity-100 p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-red-500 transition-all"
                        title="Delete conversation"
                      >
                        <Trash2 className="h-4 w-4" />
                      </button>
                    </div>
                    <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3">
                      {conversation.lastMessage}
                    </p>
                    <div className="flex items-center justify-between">
                      <span className="text-xs px-2 py-0.5 bg-blue-100 dark:bg-blue-900/30 text-blue-700 dark:text-blue-400 rounded-full">
                        {conversation.agent}
                      </span>
                      <span className="flex items-center gap-1 text-xs text-gray-500 dark:text-gray-400">
                        <Clock className="h-3 w-3" />
                        {conversation.timestamp}
                      </span>
                    </div>
                  </div>
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
