'use client';

import { create } from 'zustand';
import { persist } from 'zustand/middleware';

export interface Conversation {
  id: string;
  title: string;
  lastMessage: string;
  timestamp: string;
  agent: string;
  isPinned: boolean;
  createdAt: Date;
}

interface ConversationState {
  conversations: Conversation[];
  pinnedIds: Set<string>;
  addConversation: (conversation: Omit<Conversation, 'isPinned' | 'createdAt'>) => void;
  removeConversation: (id: string) => void;
  togglePin: (id: string) => void;
  updateConversation: (id: string, updates: Partial<Conversation>) => void;
  getConversation: (id: string) => Conversation | undefined;
  renameConversation: (id: string, title: string) => void;
}

const initialConversations: Conversation[] = [
  {
    id: '1',
    title: 'Getting Started with BlackRoad OS',
    lastMessage: 'How can I help you today? I can assist with code generation, debugging, research, and more.',
    timestamp: '2 hours ago',
    agent: 'Lucidia',
    isPinned: true,
    createdAt: new Date(Date.now() - 2 * 60 * 60 * 1000),
  },
  {
    id: '2',
    title: 'Project Planning Session',
    lastMessage: 'Let me summarize the key tasks and milestones we discussed...',
    timestamp: 'Yesterday',
    agent: 'Lucidia',
    isPinned: false,
    createdAt: new Date(Date.now() - 24 * 60 * 60 * 1000),
  },
  {
    id: '3',
    title: 'Code Review: API Endpoints',
    lastMessage: 'I found a few potential improvements in your authentication logic.',
    timestamp: '3 days ago',
    agent: 'Codex',
    isPinned: true,
    createdAt: new Date(Date.now() - 3 * 24 * 60 * 60 * 1000),
  },
  {
    id: '4',
    title: 'Infrastructure Setup',
    lastMessage: 'Your Docker configuration looks good! Here are some optimization tips...',
    timestamp: 'Last week',
    agent: 'Aria',
    isPinned: false,
    createdAt: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000),
  },
];

export const useConversationStore = create<ConversationState>()(
  persist(
    (set, get) => ({
      conversations: initialConversations,
      pinnedIds: new Set(['1', '3']),

      addConversation: (conversation) => {
        const newConversation: Conversation = {
          ...conversation,
          isPinned: false,
          createdAt: new Date(),
        };
        set((state) => ({
          conversations: [newConversation, ...state.conversations],
        }));
      },

      removeConversation: (id) => {
        set((state) => ({
          conversations: state.conversations.filter((c) => c.id !== id),
          pinnedIds: new Set([...state.pinnedIds].filter((pid) => pid !== id)),
        }));
      },

      togglePin: (id) => {
        set((state) => {
          const newPinnedIds = new Set(state.pinnedIds);
          const conversations = state.conversations.map((c) => {
            if (c.id === id) {
              const isPinned = !c.isPinned;
              if (isPinned) {
                newPinnedIds.add(id);
              } else {
                newPinnedIds.delete(id);
              }
              return { ...c, isPinned };
            }
            return c;
          });
          return { conversations, pinnedIds: newPinnedIds };
        });
      },

      updateConversation: (id, updates) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, ...updates } : c
          ),
        }));
      },

      getConversation: (id) => {
        return get().conversations.find((c) => c.id === id);
      },

      renameConversation: (id, title) => {
        set((state) => ({
          conversations: state.conversations.map((c) =>
            c.id === id ? { ...c, title } : c
          ),
        }));
      },
    }),
    {
      name: 'conversation-storage',
      partialize: (state) => ({
        conversations: state.conversations,
        pinnedIds: Array.from(state.pinnedIds),
      }),
      merge: (persisted: any, current) => ({
        ...current,
        ...persisted,
        pinnedIds: new Set(persisted?.pinnedIds || []),
      }),
    }
  )
);
