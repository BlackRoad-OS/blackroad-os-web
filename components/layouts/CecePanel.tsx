'use client';

import { useState } from 'react';

interface CecePanelProps {
  variant: 'workspace' | 'console';
}

const quickActions = {
  workspace: [
    { label: 'Deploy', icon: '🚀' },
    { label: 'Run Tests', icon: '🧪' },
    { label: 'Git Push', icon: '📤' },
  ],
  console: [
    { label: 'Restart', icon: '🔄' },
    { label: 'Scale', icon: '📈' },
    { label: 'Logs', icon: '📋' },
    { label: 'Redeploy', icon: '🚀' },
  ],
};

const runbooks = [
  { id: 'clear-volume', label: 'Clear volume' },
  { id: 'pull-model', label: 'Pull new model' },
  { id: 'sleep-fossils', label: 'Sleep fossils' },
  { id: 'hero-flow-test', label: 'Hero Flow test' },
];

export function CecePanel({ variant }: CecePanelProps) {
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([
    {
      role: 'assistant',
      content: variant === 'console'
        ? "I'm Cece in Governor mode. I can help you manage services, run diagnostics, and execute runbooks."
        : "Hi! I'm Cece. How can I help you today?",
    },
  ]);

  const isConsole = variant === 'console';
  const actions = quickActions[variant];

  const handleSend = () => {
    if (!message.trim()) return;
    setMessages([...messages, { role: 'user', content: message }]);
    setMessage('');
    // TODO: Actually send to /chat endpoint
    setTimeout(() => {
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: "I'm processing your request. This is a demo response.",
        },
      ]);
    }, 1000);
  };

  return (
    <aside className="flex w-80 flex-col border-l border-br-border bg-br-surface">
      {/* Header */}
      <div className="border-b border-br-border p-4">
        <div className="flex items-center gap-2">
          <div className="flex h-8 w-8 items-center justify-center rounded-full bg-gradient-to-br from-br-vivid-purple to-br-hot-pink">
            <span className="text-sm">🤖</span>
          </div>
          <div>
            <h3 className="text-sm font-semibold text-br-text">
              {isConsole ? 'CECE GOV' : 'CECE'}
            </h3>
            <p className="text-xs text-br-text-muted">
              {isConsole ? 'Governor Mode' : 'AI Assistant'}
            </p>
          </div>
          <div className="ml-auto flex h-2 w-2 items-center">
            <span className="h-2 w-2 rounded-full bg-green-500" />
          </div>
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 text-sm ${
                msg.role === 'assistant'
                  ? 'bg-br-surface-2 text-br-text'
                  : 'ml-8 bg-br-vivid-purple/20 text-br-text'
              }`}
            >
              {msg.content}
            </div>
          ))}
        </div>
      </div>

      {/* Input */}
      <div className="border-t border-br-border p-4">
        <div className="flex gap-2">
          <input
            type="text"
            value={message}
            onChange={(e) => setMessage(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSend()}
            placeholder={isConsole ? 'Ask about this service...' : 'Type a message...'}
            className="flex-1 rounded-lg border border-br-border bg-br-surface-2 px-3 py-2 text-sm text-br-text placeholder:text-br-text-muted focus:border-br-hot-pink focus:outline-none"
          />
          <button
            onClick={handleSend}
            className="rounded-lg bg-br-hot-pink px-3 py-2 text-sm font-medium text-white hover:bg-br-hot-pink/80"
          >
            Send
          </button>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="border-t border-br-border p-4">
        <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-br-text-muted">
          {isConsole ? 'Actions' : 'Quick'}
        </h4>
        <div className="flex flex-wrap gap-2">
          {actions.map((action) => (
            <button
              key={action.label}
              className="flex items-center gap-1 rounded-md border border-br-border bg-br-surface-2 px-2 py-1 text-xs text-br-text hover:border-br-hot-pink hover:text-br-hot-pink"
            >
              <span>{action.icon}</span>
              {action.label}
            </button>
          ))}
        </div>
      </div>

      {/* Runbooks (Console only) */}
      {isConsole && (
        <div className="border-t border-br-border p-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-br-text-muted">
            Runbooks
          </h4>
          <div className="space-y-1">
            {runbooks.map((rb) => (
              <button
                key={rb.id}
                className="flex w-full items-center gap-2 rounded-md px-2 py-1.5 text-left text-xs text-br-text-muted hover:bg-br-surface-2 hover:text-br-text"
              >
                <span className="text-br-text-muted">•</span>
                {rb.label}
              </button>
            ))}
          </div>
        </div>
      )}

      {/* Context (Workspace only) */}
      {!isConsole && (
        <div className="border-t border-br-border p-4">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-br-text-muted">
            Context
          </h4>
          <div className="space-y-1 text-xs">
            <div className="flex justify-between">
              <span className="text-br-text-muted">Project:</span>
              <span className="text-br-text">blackroad-os</span>
            </div>
            <div className="flex justify-between">
              <span className="text-br-text-muted">Branch:</span>
              <span className="text-br-text">main</span>
            </div>
            <div className="flex justify-between">
              <span className="text-br-text-muted">File:</span>
              <span className="text-br-text">—</span>
            </div>
          </div>
        </div>
      )}
    </aside>
  );
}
