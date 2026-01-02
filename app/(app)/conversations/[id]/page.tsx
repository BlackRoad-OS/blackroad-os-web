'use client';

import { useState, useRef, useEffect } from 'react';
import { Send, Bot, User, Copy, Check, RotateCcw, Sparkles } from 'lucide-react';
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
  const [messages, setMessages] = useState<Message[]>([
    {
      id: '1',
      role: 'assistant',
      content: `Hello! I'm **Lucidia**, your AI companion built on BlackRoad OS.

I can help you with:
- Code generation and review
- Debugging and troubleshooting
- Research and documentation
- Creative problem-solving

How can I assist you today?`,
      timestamp: new Date(),
    },
  ]);
  const [input, setInput] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [copiedId, setCopiedId] = useState<string | null>(null);
  const messagesEndRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const scrollToBottom = () => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  };

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  useEffect(() => {
    inputRef.current?.focus();
  }, []);

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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!input.trim() || isLoading) return;

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: input,
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

  const formatTime = (date: Date) => {
    return date.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
  };

  return (
    <div className="flex flex-col h-full bg-gray-50 dark:bg-gray-900">
      {/* Messages area */}
      <div className="flex-1 overflow-y-auto px-4 py-6">
        <div className="max-w-3xl mx-auto space-y-6">
          {messages.map((message) => (
            <div
              key={message.id}
              className={cn(
                'flex gap-3 sm:gap-4 group',
                message.role === 'user' ? 'justify-end' : 'justify-start'
              )}
            >
              {message.role === 'assistant' && (
                <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-white shadow-md">
                  <Sparkles className="h-4 w-4" />
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

                {/* Message Actions & Timestamp */}
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

                  {/* Action buttons - visible on hover */}
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
              <div className="flex-shrink-0 h-8 w-8 rounded-full bg-gradient-to-br from-blue-800 to-blue-600 flex items-center justify-center text-white shadow-md">
                <Sparkles className="h-4 w-4" />
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

      {/* Input area */}
      <div className="border-t border-gray-200 dark:border-gray-700 bg-white dark:bg-gray-800 px-4 py-4">
        <form onSubmit={handleSubmit} className="max-w-3xl mx-auto">
          <div className="flex gap-2 sm:gap-4">
            <input
              ref={inputRef}
              type="text"
              value={input}
              onChange={(e) => setInput(e.target.value)}
              placeholder="Type your message..."
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
