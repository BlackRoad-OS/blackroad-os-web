'use client';

import { useState, useRef, useEffect } from 'react';
import {
  sendCeceMessage,
  type CeceChatResponse,
  type CeceChatTrace,
} from '@/lib/ceceClient';

interface CecePanelProps {
  variant: 'workspace' | 'console';
}

interface Message {
  role: 'user' | 'assistant';
  content: string;
  trace?: CeceChatTrace;
  isError?: boolean;
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
  const [isLoading, setIsLoading] = useState(false);
  const [showTrace, setShowTrace] = useState(false);
  const [lastTrace, setLastTrace] = useState<CeceChatTrace | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);

  const [messages, setMessages] = useState<Message[]>([
    {
      role: 'assistant',
      content:
        variant === 'console'
          ? "I'm Cece in Governor mode. I can help you manage services, run diagnostics, and execute runbooks. Try asking me anything!"
          : "Hi! I'm Cece, your AI assistant. I'm connected to the BlackRoad Operator Engine. How can I help you today?",
    },
  ]);

  const isConsole = variant === 'console';
  const actions = quickActions[variant];

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const handleSend = async () => {
    if (!message.trim() || isLoading) return;

    const userMessage = message.trim();
    setMessage('');
    setMessages((prev) => [...prev, { role: 'user', content: userMessage }]);
    setIsLoading(true);

    try {
      const response: CeceChatResponse = await sendCeceMessage({
        message: userMessage,
        userId: 'web-user', // TODO: Get from auth context
      });

      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: response.reply,
          trace: response.trace,
        },
      ]);
      setLastTrace(response.trace);
    } catch (error) {
      const errorMessage =
        error instanceof Error ? error.message : 'Unknown error occurred';
      setMessages((prev) => [
        ...prev,
        {
          role: 'assistant',
          content: `Sorry, I'm having trouble connecting right now. ${errorMessage}`,
          isError: true,
        },
      ]);
    } finally {
      setIsLoading(false);
    }
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
          <div className="ml-auto flex items-center gap-2">
            <button
              onClick={() => setShowTrace(!showTrace)}
              className={`rounded px-1.5 py-0.5 text-xs ${
                showTrace
                  ? 'bg-br-vivid-purple/20 text-br-vivid-purple'
                  : 'text-br-text-muted hover:text-br-text'
              }`}
              title="Toggle trace info"
            >
              DBG
            </button>
            <span
              className={`h-2 w-2 rounded-full ${
                isLoading ? 'animate-pulse bg-yellow-500' : 'bg-green-500'
              }`}
            />
          </div>
        </div>
      </div>

      {/* Trace Panel (collapsible) */}
      {showTrace && lastTrace && (
        <div className="border-b border-br-border bg-br-surface-2 p-3">
          <h4 className="mb-2 text-xs font-semibold uppercase tracking-wider text-br-text-muted">
            Last Response Trace
          </h4>
          <div className="grid grid-cols-2 gap-2 text-xs">
            <div>
              <span className="text-br-text-muted">Model:</span>
              <span className="ml-1 text-br-text">{lastTrace.model}</span>
            </div>
            <div>
              <span className="text-br-text-muted">Provider:</span>
              <span className="ml-1 text-br-text">{lastTrace.llm_provider}</span>
            </div>
            <div>
              <span className="text-br-text-muted">RAG:</span>
              <span
                className={`ml-1 ${
                  lastTrace.used_rag ? 'text-green-400' : 'text-br-text-muted'
                }`}
              >
                {lastTrace.used_rag ? 'enabled' : 'disabled'}
              </span>
            </div>
            <div>
              <span className="text-br-text-muted">Time:</span>
              <span className="ml-1 text-br-text">
                {lastTrace.response_time_ms}ms
              </span>
            </div>
            {lastTrace.rag_latency_ms !== undefined && (
              <div>
                <span className="text-br-text-muted">RAG latency:</span>
                <span className="ml-1 text-br-text">
                  {lastTrace.rag_latency_ms}ms
                </span>
              </div>
            )}
            {lastTrace.num_context_chunks !== undefined && (
              <div>
                <span className="text-br-text-muted">Chunks:</span>
                <span className="ml-1 text-br-text">
                  {lastTrace.num_context_chunks}
                </span>
              </div>
            )}
          </div>
        </div>
      )}

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-4">
        <div className="space-y-4">
          {messages.map((msg, i) => (
            <div
              key={i}
              className={`rounded-lg p-3 text-sm ${
                msg.role === 'assistant'
                  ? msg.isError
                    ? 'border border-red-500/30 bg-red-500/10 text-red-300'
                    : 'bg-br-surface-2 text-br-text'
                  : 'ml-8 bg-br-vivid-purple/20 text-br-text'
              }`}
            >
              {msg.content}
              {msg.trace && showTrace && (
                <div className="mt-2 border-t border-br-border pt-2 text-xs text-br-text-muted">
                  {msg.trace.model} • {msg.trace.response_time_ms}ms
                  {msg.trace.used_rag && ' • RAG'}
                </div>
              )}
            </div>
          ))}
          {isLoading && (
            <div className="rounded-lg bg-br-surface-2 p-3 text-sm text-br-text-muted">
              <span className="inline-flex items-center gap-1">
                <span className="animate-bounce">●</span>
                <span className="animate-bounce" style={{ animationDelay: '0.1s' }}>
                  ●
                </span>
                <span className="animate-bounce" style={{ animationDelay: '0.2s' }}>
                  ●
                </span>
              </span>
            </div>
          )}
          <div ref={messagesEndRef} />
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
            placeholder={
              isConsole ? 'Ask about this service...' : 'Type a message...'
            }
            disabled={isLoading}
            className="flex-1 rounded-lg border border-br-border bg-br-surface-2 px-3 py-2 text-sm text-br-text placeholder:text-br-text-muted focus:border-br-hot-pink focus:outline-none disabled:opacity-50"
          />
          <button
            onClick={handleSend}
            disabled={isLoading || !message.trim()}
            className="rounded-lg bg-br-hot-pink px-3 py-2 text-sm font-medium text-white hover:bg-br-hot-pink/80 disabled:opacity-50"
          >
            {isLoading ? '...' : 'Send'}
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
