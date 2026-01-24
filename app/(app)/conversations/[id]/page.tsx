'use client';

import { useState, useRef, useEffect } from 'react';
import {
  Send, User, Copy, Check, RotateCcw, Sparkles,
  ChevronDown, Code, FileText, Lightbulb, Pencil,
  Zap, Brain, Shield, Activity
} from 'lucide-react';
import { useParams } from 'next/navigation';
import { toast } from '@/stores/toast-store';
import { cn } from '@/lib/cn';
import Markdown from '@/components/Markdown';

interface Message {
  id: string;
  role: 'user' | 'assistant';
  content: string;
  timestamp: Date;
}

interface Agent {
  id: string;
  name: string;
  description: string;
  icon: typeof Sparkles;
  color: string;
}

const agents: Agent[] = [
  { id: 'lucidia', name: 'Lucidia', description: 'General AI assistant', icon: Sparkles, color: 'from-blue-600 to-purple-600' },
  { id: 'codex', name: 'Codex', description: 'Code specialist', icon: Code, color: 'from-green-500 to-emerald-600' },
  { id: 'aria', name: 'Aria', description: 'Infrastructure expert', icon: Activity, color: 'from-pink-500 to-rose-600' },
  { id: 'sage', name: 'Sage', description: 'Research & knowledge', icon: Brain, color: 'from-violet-500 to-purple-600' },
  { id: 'sentinel', name: 'Sentinel', description: 'Security advisor', icon: Shield, color: 'from-red-500 to-orange-600' },
];

const quickPrompts = [
  { icon: Code, label: 'Write code', prompt: 'Help me write a function that' },
  { icon: FileText, label: 'Explain concept', prompt: 'Explain how' },
  { icon: Lightbulb, label: 'Brainstorm', prompt: 'Give me ideas for' },
  { icon: Pencil, label: 'Review code', prompt: 'Review this code and suggest improvements:' },
];

const demoResponses = [
  `Great question! Here's what I can help you with:

**Key Features:**
- Code generation and review
- Debugging assistance
- Research and analysis
- Creative writing

Let me know which area you'd like to explore!`,

  `I'd be happy to help! Here's a quick example:

\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet('World'));
\`\`\`

This is a simple JavaScript function. Would you like me to explain it further?`,

  `Here are some **key points** to consider:

1. First, understand the requirements
2. Break down the problem into smaller parts
3. Write tests before implementation
4. Refactor and optimize

> "Code is like humor. When you have to explain it, it's bad." - Cory House

Let me know if you need more details on any of these!`,

  `That's an interesting question! Let me break it down:

### Overview
The concept involves several interconnected parts.

### Details
- **Part A**: Handles the initial processing
- **Part B**: Manages the data flow
- **Part C**: Renders the final output

Would you like me to dive deeper into any specific part?`,
];

export default function ConversationPage() {
  const params = useParams();
  const [selectedAgent, setSelectedAgent] = useState<Agent>(agents[0]);
  const [showAgentDropdown, setShowAgentDropdown] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const isNewConversation = messages.length === 0;

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    if (!isNewConversation) {
      inputRef.current?.focus();
    }
  }, [isNewConversation]);

  const handleCopy = async (message: Message) => {
    try {
      await navigator.clipboard.writeText(message.content);
      setCopiedId(message.id);
      toast.success('Copied to clipboard');
      setTimeout(() => setCopiedId(null), 2000);
    } catch (err) {
      toast.error('Failed to copy');
    }
  };

  const handleRetry = (message: Message) => {
    const messageIndex = messages.findIndex(m => m.id === message.id);
    if (messageIndex > 0) {
      const previousUserMessage = messages[messageIndex - 1];
      if (previousUserMessage.role === 'user') {
        setInput(previousUserMessage.content);
        toast.info('Retry', 'Message copied to input. Press send to retry.');
      }
    }
  };

  const handleQuickPrompt = (prompt: string) => {
    setInput(prompt + ' ');
    inputRef.current?.focus();
  };

  const sendMessage = (content: string) => {
    if (!content.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: content.trim(),
      timestamp: new Date(),
    };

    setMessages((prev) => [...prev, userMessage]);
    setInput('');
    setIsLoading(true);

    // Demo response with markdown
    setTimeout(() => {
      const randomResponse = demoResponses[Math.floor(Math.random() * demoResponses.length)];
      const assistantMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: randomResponse,
        timestamp: new Date(),
      };
      setMessages((prev) => [...prev, assistantMessage]);
      setIsLoading(false);
    }, 1200);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    sendMessage(input);
  };

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  const AgentIcon = selectedAgent.icon;

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Agent Header */}
      <div className="border-b border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-3">
        <div className="max-w-3xl mx-auto">
          <div className="relative">
            <button
              onClick={() => setShowAgentDropdown(!showAgentDropdown)}
              className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-100 dark:hover:bg-gray-700 transition-colors"
            >
              <div className={cn(
                'h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white',
                selectedAgent.color
              )}>
                <AgentIcon className="h-4 w-4" />
              </div>
              <div className="text-left">
                <p className="font-medium text-gray-900 dark:text-white text-sm">{selectedAgent.name}</p>
                <p className="text-xs text-gray-500 dark:text-gray-400">{selectedAgent.description}</p>
              </div>
              <ChevronDown className={cn(
                'h-4 w-4 text-gray-400 transition-transform',
                showAgentDropdown && 'rotate-180'
              )} />
            </button>

            {/* Agent Dropdown */}
            {showAgentDropdown && (
              <>
                <div
                  className="fixed inset-0 z-10"
                  onClick={() => setShowAgentDropdown(false)}
                />
                <div className="absolute top-full left-0 mt-2 w-64 bg-white dark:bg-gray-800 rounded-xl border border-gray-200 dark:border-gray-700 shadow-xl z-20 overflow-hidden">
                  <div className="p-2">
                    <p className="text-xs font-semibold text-gray-400 dark:text-gray-500 uppercase tracking-wider px-2 py-1">
                      Select Agent
                    </p>
                    {agents.map((agent) => {
                      const Icon = agent.icon;
                      const isSelected = selectedAgent.id === agent.id;
                      return (
                        <button
                          key={agent.id}
                          onClick={() => {
                            setSelectedAgent(agent);
                            setShowAgentDropdown(false);
                            toast.info(`Switched to ${agent.name}`);
                          }}
                          className={cn(
                            'w-full flex items-center gap-3 px-3 py-2 rounded-lg transition-colors',
                            isSelected
                              ? 'bg-blue-50 dark:bg-blue-900/30 text-blue-700 dark:text-blue-300'
                              : 'hover:bg-gray-100 dark:hover:bg-gray-700 text-gray-700 dark:text-gray-300'
                          )}
                        >
                          <div className={cn(
                            'h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white',
                            agent.color
                          )}>
                            <Icon className="h-4 w-4" />
                          </div>
                          <div className="text-left">
                            <p className="font-medium text-sm">{agent.name}</p>
                            <p className="text-xs opacity-70">{agent.description}</p>
                          </div>
                          {isSelected && (
                            <Check className="h-4 w-4 ml-auto text-blue-500" />
                          )}
                        </button>
                      );
                    })}
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      </div>

      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto">
          {/* New Conversation Welcome */}
          {isNewConversation && !isLoading && (
            <div className="text-center py-12">
              <div className={cn(
                'h-20 w-20 mx-auto rounded-2xl bg-gradient-to-br flex items-center justify-center text-white mb-6 shadow-xl',
                selectedAgent.color
              )}>
                <AgentIcon className="h-10 w-10" />
              </div>
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-2">
                Chat with {selectedAgent.name}
              </h2>
              <p className="text-gray-500 dark:text-gray-400 mb-8 max-w-md mx-auto">
                {selectedAgent.description}. Start a conversation below or try one of these prompts:
              </p>

              {/* Quick Prompts */}
              <div className="grid grid-cols-2 gap-3 max-w-md mx-auto">
                {quickPrompts.map((qp, i) => {
                  const Icon = qp.icon;
                  return (
                    <button
                      key={i}
                      onClick={() => handleQuickPrompt(qp.prompt)}
                      className="flex items-center gap-3 p-4 bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-xl hover:border-blue-500 dark:hover:border-blue-500 hover:shadow-md transition-all text-left group"
                    >
                      <div className="h-10 w-10 rounded-lg bg-gray-100 dark:bg-gray-700 flex items-center justify-center text-gray-500 dark:text-gray-400 group-hover:bg-blue-100 dark:group-hover:bg-blue-900/30 group-hover:text-blue-600 dark:group-hover:text-blue-400 transition-colors">
                        <Icon className="h-5 w-5" />
                      </div>
                      <span className="font-medium text-gray-700 dark:text-gray-300 text-sm">
                        {qp.label}
                      </span>
                    </button>
                  );
                })}
              </div>
            </div>
          )}

          {/* Messages */}
          <div className="space-y-6">
            {messages.map((message) => (
              <div
                key={message.id}
                className={cn(
                  'flex gap-3 sm:gap-4 group',
                  message.role === 'user' ? 'justify-end' : 'justify-start'
                )}
              >
                {message.role === 'assistant' && (
                  <div className={cn(
                    'flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-md',
                    selectedAgent.color
                  )}>
                    <AgentIcon className="h-4 w-4" />
                  </div>
                )}

                <div className="flex flex-col max-w-[85%] sm:max-w-[70%]">
                  <div
                    className={cn(
                      'rounded-2xl px-4 py-3 shadow-sm',
                      message.role === 'user'
                        ? 'bg-blue-800 text-white rounded-br-md'
                        : 'bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 text-gray-900 dark:text-white rounded-bl-md'
                    )}
                  >
                    {message.role === 'assistant' ? (
                      <Markdown content={message.content} className="text-sm" />
                    ) : (
                      <p className="text-sm whitespace-pre-wrap leading-relaxed">{message.content}</p>
                    )}
                  </div>

                  <div className={cn(
                    'flex items-center gap-2 mt-1.5 px-1',
                    message.role === 'user' ? 'justify-end' : 'justify-start'
                  )}>
                    <span className={cn(
                      'text-xs',
                      message.role === 'user' ? 'text-gray-500 dark:text-gray-400' : 'text-gray-400 dark:text-gray-500'
                    )}>
                      {formatTime(message.timestamp)}
                    </span>

                    <div className="flex items-center gap-1 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button
                        onClick={() => handleCopy(message)}
                        className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                        title="Copy message"
                      >
                        {copiedId === message.id ? (
                          <Check className="h-3.5 w-3.5 text-green-500" />
                        ) : (
                          <Copy className="h-3.5 w-3.5" />
                        )}
                      </button>
                      {message.role === 'assistant' && (
                        <button
                          onClick={() => handleRetry(message)}
                          className="p-1 rounded hover:bg-gray-200 dark:hover:bg-gray-700 text-gray-400 hover:text-gray-600 dark:hover:text-gray-300 transition-colors"
                          title="Retry"
                        >
                          <RotateCcw className="h-3.5 w-3.5" />
                        </button>
                      )}
                    </div>
                  </div>
                </div>

                {message.role === 'user' && (
                  <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-gray-700 to-gray-500 flex items-center justify-center text-white shadow-md">
                    <User className="h-4 w-4" />
                  </div>
                )}
              </div>
            ))}

            {/* Loading indicator */}
            {isLoading && (
              <div className="flex gap-3 sm:gap-4">
                <div className={cn(
                  'flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br flex items-center justify-center text-white shadow-md',
                  selectedAgent.color
                )}>
                  <AgentIcon className="h-4 w-4" />
                </div>
                <div className="bg-white dark:bg-gray-800 border border-gray-200 dark:border-gray-700 rounded-2xl rounded-bl-md px-4 py-3 shadow-sm">
                  <div className="flex gap-1.5">
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '0ms' }} />
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '150ms' }} />
                    <div className="h-2 w-2 bg-blue-400 rounded-full animate-bounce" style={{ animationDelay: '300ms' }} />
                  </div>
                </div>
              </div>
            )}

            <div ref={messagesEndRef} />
          </div>
        </div>
      </div>

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-2 sm:gap-4">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder={`Message ${selectedAgent.name}...`}
              disabled={isLoading}
              className="flex-1 px-4 py-3 bg-gray-50 dark:bg-gray-900 border border-gray-300 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:opacity-50 disabled:cursor-not-allowed transition-all"
            />
            <button
              type="submit"
              disabled={isLoading || !input.trim()}
              className="px-4 sm:px-6 py-3 bg-blue-800 hover:bg-blue-700 text-white rounded-xl font-medium transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2 shadow-md hover:shadow-lg active:scale-[0.98]"
            >
              <Send className="h-5 w-5" />
              <span className="hidden sm:inline">Send</span>
            </button>
          </div>
          <p className="text-xs text-gray-400 dark:text-gray-500 text-center mt-2">
            Press <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">⌘K</kbd> for commands • <kbd className="px-1 py-0.5 bg-gray-200 dark:bg-gray-700 rounded text-xs">⌘/</kbd> for shortcuts
          </p>
        </form>
      </div>
    </div>
  );
}
