'use client';

import { useState, useEffect, useMemo, useRef } from 'react';
import { useRouter } from 'next/navigation';
import { MessageSquare, Plus, Search, Clock, Sparkles, Trash2, Pin, PinOff, Pencil, Check, X } from 'lucide-react';
import Link from 'next/link';
import { cn } from '@/lib/cn';
import { ConversationCardSkeleton } from '@/components/Skeleton';
import { toast } from '@/stores/toast-store';
import { useConversationStore, Conversation } from '@/stores/conversation-store';

export default function WorkspacePage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');

  const { conversations, removeConversation, togglePin, renameConversation } = useConversationStore();
  const [editingId, setEditingId] = useState<string | null>(null);
  const [editingTitle, setEditingTitle] = useState('');
  const editInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 600);
    return () => clearTimeout(timer);
  }, []);

  const filteredConversations = useMemo(() => {
    return conversations.filter(
      (conv) =>
        conv.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        conv.lastMessage.toLowerCase().includes(searchQuery.toLowerCase())
    );
  }, [conversations, searchQuery]);

  const pinnedConversations = useMemo(() => {
    return filteredConversations.filter((c) => c.isPinned);
  }, [filteredConversations]);

  const unpinnedConversations = useMemo(() => {
    return filteredConversations.filter((c) => !c.isPinned);
  }, [filteredConversations]);

  const handleDelete = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    removeConversation(id);
    toast.success('Conversation deleted');
  };

  const handleTogglePin = (id: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    const conv = conversations.find((c) => c.id === id);
    togglePin(id);
    toast.success(conv?.isPinned ? 'Unpinned' : 'Pinned', conv?.isPinned ? 'Conversation unpinned' : 'Conversation pinned to top');
  };

  const handleStartRename = (id: string, title: string, e: React.MouseEvent) => {
    e.stopPropagation();
    e.preventDefault();
    setEditingId(id);
    setEditingTitle(title);
    setTimeout(() => editInputRef.current?.focus(), 0);
  };

  const handleSaveRename = (id: string, e?: React.MouseEvent | React.FormEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    if (editingTitle.trim()) {
      renameConversation(id, editingTitle.trim());
      toast.success('Renamed', 'Conversation renamed successfully');
    }
    setEditingId(null);
    setEditingTitle('');
  };

  const handleCancelRename = (e?: React.MouseEvent) => {
    e?.stopPropagation();
    e?.preventDefault();
    setEditingId(null);
    setEditingTitle('');
  };

  const handleNewConversation = () => {
    const newId = Date.now().toString();
    router.push(`/conversations/${newId}`);
  };

  const ConversationCard = ({ conversation }: { conversation: Conversation }) => (
    <Link
      href={`/conversations/${conversation.id}`}
      className={cn(
        'group bg-white dark:bg-gray-800 border rounded-xl p-5 hover:shadow-lg transition-all',
        conversation.isPinned
          ? 'border-blue-200 dark:border-blue-800 bg-blue-50/50 dark:bg-blue-900/10'
          : 'border-gray-200 dark:border-gray-700 hover:border-blue-500 dark:hover:border-blue-500'
      )}
    >
      <div className="flex items-start gap-4">
        <div className={cn(
          'h-10 w-10 rounded-full flex items-center justify-center text-white flex-shrink-0 shadow-md',
          conversation.isPinned
            ? 'bg-gradient-to-br from-blue-600 to-purple-600'
            : 'bg-gradient-to-br from-blue-800 to-blue-600'
        )}>
          <Sparkles className="h-5 w-5" />
        </div>
        <div className="flex-1 min-w-0">
          <div className="flex items-start justify-between gap-2">
            <div className="flex items-center gap-2 min-w-0 flex-1">
              {conversation.isPinned && (
                <Pin className="h-3.5 w-3.5 text-blue-500 flex-shrink-0" />
              )}
              {editingId === conversation.id ? (
                <form
                  onSubmit={(e) => handleSaveRename(conversation.id, e)}
                  className="flex items-center gap-1 flex-1"
                  onClick={(e) => e.stopPropagation()}
                >
                  <input
                    ref={editInputRef}
                    type="text"
                    value={editingTitle}
                    onChange={(e) => setEditingTitle(e.target.value)}
                    className="flex-1 px-2 py-1 text-sm bg-white dark:bg-gray-700 border border-blue-500 rounded focus:outline-none focus:ring-2 focus:ring-blue-500 text-gray-900 dark:text-white"
                    onKeyDown={(e) => {
                      if (e.key === 'Escape') handleCancelRename();
                    }}
                  />
                  <button
                    type="submit"
                    className="p-1 rounded hover:bg-green-100 dark:hover:bg-green-900/30 text-green-600 transition-all"
                    title="Save"
                  >
                    <Check className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={handleCancelRename}
                    className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-red-500 transition-all"
                    title="Cancel"
                  >
                    <X className="h-4 w-4" />
                  </button>
                </form>
              ) : (
                <h3 className="font-semibold text-gray-900 dark:text-white truncate group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                  {conversation.title}
                </h3>
              )}
            </div>
            {editingId !== conversation.id && (
              <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                <button
                  onClick={(e) => handleStartRename(conversation.id, conversation.title, e)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-blue-500 transition-all"
                  title="Rename"
                >
                  <Pencil className="h-4 w-4" />
                </button>
                <button
                  onClick={(e) => handleTogglePin(conversation.id, e)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-blue-500 transition-all"
                  title={conversation.isPinned ? 'Unpin' : 'Pin to top'}
                >
                  {conversation.isPinned ? (
                    <PinOff className="h-4 w-4" />
                  ) : (
                    <Pin className="h-4 w-4" />
                  )}
                </button>
                <button
                  onClick={(e) => handleDelete(conversation.id, e)}
                  className="p-1 rounded hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-400 hover:text-red-500 transition-all"
                  title="Delete conversation"
                >
                  <Trash2 className="h-4 w-4" />
                </button>
              </div>
            )}
          </div>
          <p className="text-sm text-gray-600 dark:text-gray-400 line-clamp-2 mb-3 mt-1">
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
  );

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

        {/* Pinned conversations */}
        {!isLoading && pinnedConversations.length > 0 && (
          <div className="mb-8">
            <h2 className="flex items-center gap-2 text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
              <Pin className="h-4 w-4" />
              Pinned
            </h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {pinnedConversations.map((conversation) => (
                <ConversationCard key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </div>
        )}

        {/* Other conversations */}
        {!isLoading && unpinnedConversations.length > 0 && (
          <div>
            {pinnedConversations.length > 0 && (
              <h2 className="text-sm font-semibold text-gray-500 dark:text-gray-400 uppercase tracking-wider mb-3">
                Recent
              </h2>
            )}
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
              {unpinnedConversations.map((conversation) => (
                <ConversationCard key={conversation.id} conversation={conversation} />
              ))}
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
