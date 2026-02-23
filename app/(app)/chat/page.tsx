"use client";

import { useState, useRef, useEffect } from "react";

const AGENTS = [
  { id: null, name: "Default", color: "text-white" },
  { id: "LUCIDIA", name: "Lucidia", color: "text-red-400" },
  { id: "ALICE", name: "Alice", color: "text-green-400" },
  { id: "OCTAVIA", name: "Octavia", color: "text-purple-400" },
  { id: "PRISM", name: "Prism", color: "text-yellow-400" },
  { id: "ECHO", name: "Echo", color: "text-blue-400" },
  { id: "CIPHER", name: "Cipher", color: "text-slate-300" },
];

interface Message {
  role: "user" | "assistant";
  content: string;
  agent?: string | null;
}

export default function ChatPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const [selectedAgent, setSelectedAgent] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || loading) return;

    const userMsg: Message = { role: "user", content: input.trim() };
    setMessages((prev) => [...prev, userMsg]);
    setInput("");
    setLoading(true);

    try {
      const res = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          messages: [...messages, userMsg].map((m) => ({
            role: m.role,
            content: m.content,
          })),
          agent: selectedAgent,
          model: "qwen2.5:7b",
        }),
      });

      if (res.ok) {
        const data = await res.json();
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: data.message?.content || "...",
            agent: selectedAgent,
          },
        ]);
      } else {
        setMessages((prev) => [
          ...prev,
          {
            role: "assistant",
            content: "Gateway offline. Start it with: `br agent start`",
            agent: selectedAgent,
          },
        ]);
      }
    } catch {
      setMessages((prev) => [
        ...prev,
        {
          role: "assistant",
          content: "Could not reach gateway.",
          agent: selectedAgent,
        },
      ]);
    } finally {
      setLoading(false);
    }
  };

  const agent = AGENTS.find((a) => a.id === selectedAgent) ?? AGENTS[0];

  return (
    <div className="flex flex-col h-screen bg-black text-white">
      {/* Header */}
      <div className="border-b border-slate-800 p-4 flex items-center justify-between">
        <div>
          <h1 className="font-bold text-lg">Chat</h1>
          <p className="text-xs text-slate-400">
            {selectedAgent ? `Speaking as ${selectedAgent}` : "Default model"}
          </p>
        </div>
        {/* Agent selector */}
        <div className="flex gap-1">
          {AGENTS.map((a) => (
            <button
              key={a.id ?? "default"}
              onClick={() => setSelectedAgent(a.id)}
              className={`px-2.5 py-1 rounded text-xs font-medium transition-colors ${
                selectedAgent === a.id
                  ? "bg-slate-700 " + a.color
                  : "text-slate-500 hover:text-slate-300 hover:bg-slate-800"
              }`}
            >
              {a.name}
            </button>
          ))}
        </div>
      </div>

      {/* Messages */}
      <div className="flex-1 overflow-y-auto p-6 space-y-4">
        {messages.length === 0 && (
          <div className="text-center text-slate-600 mt-12">
            <div className="text-4xl mb-3">◎</div>
            <div className="text-sm">
              Start a conversation. Select an agent persona above.
            </div>
          </div>
        )}
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
          >
            <div
              className={`max-w-2xl rounded-2xl px-4 py-3 text-sm leading-relaxed ${
                msg.role === "user"
                  ? "bg-pink-600 text-white"
                  : "bg-slate-800 text-slate-100"
              }`}
            >
              {msg.role === "assistant" && msg.agent && (
                <div
                  className={`text-xs font-semibold mb-1 ${
                    AGENTS.find((a) => a.id === msg.agent)?.color ?? "text-slate-400"
                  }`}
                >
                  {msg.agent}
                </div>
              )}
              <div className="whitespace-pre-wrap">{msg.content}</div>
            </div>
          </div>
        ))}
        {loading && (
          <div className="flex justify-start">
            <div className="bg-slate-800 rounded-2xl px-4 py-3">
              <div className="flex gap-1">
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:0ms]" />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:150ms]" />
                <span className="w-1.5 h-1.5 bg-slate-500 rounded-full animate-bounce [animation-delay:300ms]" />
              </div>
            </div>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      {/* Input */}
      <div className="border-t border-slate-800 p-4">
        <div className="flex gap-3">
          <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => e.key === "Enter" && !e.shiftKey && sendMessage()}
            placeholder={`Message ${agent.name}...`}
            disabled={loading}
            className="flex-1 bg-slate-900 border border-slate-700 rounded-xl px-4 py-2.5 text-white placeholder-slate-500 text-sm focus:outline-none focus:border-pink-600 disabled:opacity-50"
          />
          <button
            onClick={sendMessage}
            disabled={loading || !input.trim()}
            className="px-4 py-2.5 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-700 text-white rounded-xl font-medium text-sm transition-colors"
          >
            Send
          </button>
        </div>
      </div>
    </div>
  );
}
