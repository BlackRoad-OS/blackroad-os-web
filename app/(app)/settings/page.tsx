"use client";

import { useState } from "react";

const PROVIDERS = ["ollama", "anthropic", "openai"] as const;
const AGENTS = ["LUCIDIA", "ALICE", "OCTAVIA", "PRISM", "ECHO", "CIPHER"] as const;

export default function SettingsPage() {
  const [gatewayUrl, setGatewayUrl] = useState("http://127.0.0.1:8787");
  const [provider, setProvider] = useState<(typeof PROVIDERS)[number]>("ollama");
  const [defaultAgent, setDefaultAgent] = useState<(typeof AGENTS)[number]>("LUCIDIA");
  const [saved, setSaved] = useState(false);

  const save = () => {
    if (typeof window !== "undefined") {
      localStorage.setItem("br_gateway_url", gatewayUrl);
      localStorage.setItem("br_provider", provider);
      localStorage.setItem("br_default_agent", defaultAgent);
    }
    setSaved(true);
    setTimeout(() => setSaved(false), 2000);
  };

  return (
    <div className="min-h-screen bg-black text-white p-8 max-w-2xl">
      <h1 className="text-3xl font-bold mb-2">Settings</h1>
      <p className="text-slate-400 mb-8">Configure your BlackRoad OS connection</p>

      {/* Gateway */}
      <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-4">
        <h2 className="font-semibold text-slate-200 mb-4">Gateway</h2>
        <div className="space-y-4">
          <div>
            <label className="text-sm text-slate-400 block mb-1">Gateway URL</label>
            <input
              type="text"
              value={gatewayUrl}
              onChange={e => setGatewayUrl(e.target.value)}
              className="w-full bg-black border border-slate-700 rounded-lg px-4 py-2 text-white text-sm font-mono focus:outline-none focus:border-slate-500"
              placeholder="http://127.0.0.1:8787"
            />
            <p className="text-xs text-slate-500 mt-1">Default: http://127.0.0.1:8787 — change for remote deployments</p>
          </div>
        </div>
      </section>

      {/* Provider */}
      <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-4">
        <h2 className="font-semibold text-slate-200 mb-4">AI Provider</h2>
        <div className="grid grid-cols-3 gap-3">
          {PROVIDERS.map(p => (
            <button
              key={p}
              onClick={() => setProvider(p)}
              className={`py-3 rounded-lg border text-sm font-medium transition-colors ${
                provider === p
                  ? "border-blue-500 bg-blue-950 text-blue-400"
                  : "border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {p === "ollama" ? "🦙 Ollama" : p === "anthropic" ? "🤖 Anthropic" : "⚡ OpenAI"}
            </button>
          ))}
        </div>
        {provider === "ollama" && (
          <p className="text-xs text-slate-500 mt-3">Ollama runs locally — no API key needed</p>
        )}
        {provider !== "ollama" && (
          <p className="text-xs text-yellow-600 mt-3">⚠ API keys configured in gateway .env — never in this UI</p>
        )}
      </section>

      {/* Default agent */}
      <section className="bg-slate-900 rounded-xl p-6 border border-slate-800 mb-6">
        <h2 className="font-semibold text-slate-200 mb-4">Default Chat Agent</h2>
        <div className="grid grid-cols-3 gap-2">
          {AGENTS.map(a => (
            <button
              key={a}
              onClick={() => setDefaultAgent(a)}
              className={`py-2 rounded-lg border text-sm transition-colors ${
                defaultAgent === a
                  ? "border-pink-500 bg-pink-950 text-pink-400"
                  : "border-slate-700 text-slate-400 hover:border-slate-500"
              }`}
            >
              {a}
            </button>
          ))}
        </div>
      </section>

      {/* Save */}
      <button
        onClick={save}
        className="w-full py-3 rounded-xl font-semibold transition-colors"
        style={{ background: saved ? "#1a2e1a" : "linear-gradient(135deg,#F5A623 0%,#FF1D6C 38.2%,#9C27B0 61.8%,#2979FF 100%)" }}
      >
        {saved ? "✓ Saved" : "Save Settings"}
      </button>
    </div>
  );
}
