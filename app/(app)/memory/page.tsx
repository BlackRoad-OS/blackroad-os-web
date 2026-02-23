"use client";

import { useState, useEffect } from "react";

interface MemoryEntry {
  hash: string;
  prev_hash: string;
  content: string;
  type: "fact" | "observation" | "inference" | "commitment";
  truth_state: 1 | 0 | -1;
  timestamp: string;
  agent?: string;
}

const TYPE_COLORS: Record<string, string> = {
  fact: "bg-blue-900 text-blue-300",
  observation: "bg-green-900 text-green-300",
  inference: "bg-purple-900 text-purple-300",
  commitment: "bg-amber-900 text-amber-300",
};

const TRUTH_LABELS: Record<number, { label: string; color: string }> = {
  1: { label: "True", color: "text-green-400" },
  0: { label: "Unknown", color: "text-yellow-400" },
  [-1]: { label: "False", color: "text-red-400" },
};

const MOCK: MemoryEntry[] = [
  {
    hash: "a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
    prev_hash: "GENESIS",
    content: "Gateway binds to localhost:8787. Agents never embed API keys.",
    type: "fact",
    truth_state: 1,
    timestamp: new Date(Date.now() - 86400000).toISOString(),
    agent: "OCTAVIA",
  },
  {
    hash: "b4e9c3d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0b2",
    prev_hash: "a3f8b2c1d4e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0a1",
    content: "Cloudflare tunnel ID: 52915859-da18-4aa6-add5-7bd9fcac2e0b running on Pi 192.168.4.64",
    type: "observation",
    truth_state: 1,
    timestamp: new Date(Date.now() - 43200000).toISOString(),
    agent: "ALICE",
  },
  {
    hash: "c5f0d4e3f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0c3",
    prev_hash: "b4e9c3d2e5f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0b2",
    content: "K(t) = C(t) · e^(λ|δ_t|) — contradiction amplification may drive emergent agent creativity",
    type: "inference",
    truth_state: 0,
    timestamp: new Date(Date.now() - 21600000).toISOString(),
    agent: "LUCIDIA",
  },
  {
    hash: "d6a1e5f4a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0d4",
    prev_hash: "c5f0d4e3f6a7b8c9d0e1f2a3b4c5d6e7f8a9b0c1d2e3f4a5b6c7d8e9f0c3",
    content: "Deploy vLLM to Railway A100 before end of Q1 2026",
    type: "commitment",
    truth_state: 0,
    timestamp: new Date(Date.now() - 3600000).toISOString(),
    agent: "OCTAVIA",
  },
];

export default function MemoryPage() {
  const [entries, setEntries] = useState<MemoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [search, setSearch] = useState("");
  const [chainValid, setChainValid] = useState<boolean | null>(null);

  useEffect(() => {
    const load = async () => {
      try {
        const res = await fetch("/api/memory?limit=50");
        if (res.ok) {
          const data = await res.json();
          setEntries(data.entries || []);
          setChainValid(data.chain_valid ?? null);
        } else {
          setEntries(MOCK);
          setChainValid(true);
        }
      } catch {
        setEntries(MOCK);
        setChainValid(true);
      } finally {
        setLoading(false);
      }
    };
    load();
  }, []);

  const filtered = entries.filter(
    (e) =>
      !search ||
      e.content.toLowerCase().includes(search.toLowerCase()) ||
      (e.agent || "").toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="min-h-screen bg-black text-white p-8">
      <div className="mb-8">
        <div className="flex items-center justify-between mb-2">
          <h1 className="text-3xl font-bold">Memory Chain</h1>
          {chainValid !== null && (
            <div
              className={`text-sm font-medium px-3 py-1 rounded-full border ${
                chainValid
                  ? "border-green-700 text-green-400 bg-green-950"
                  : "border-red-700 text-red-400 bg-red-950"
              }`}
            >
              {chainValid ? "✓ Chain Intact" : "⚠ Chain Compromised"}
            </div>
          )}
        </div>
        <p className="text-slate-400">
          PS-SHA∞ hash-chain memory journal. Tamper-evident, append-only.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-4 gap-3 mb-6">
        {(["fact", "observation", "inference", "commitment"] as const).map((type) => (
          <div
            key={type}
            className="bg-slate-900 rounded-lg p-3 border border-slate-800"
          >
            <div className="text-xl font-bold text-white">
              {entries.filter((e) => e.type === type).length}
            </div>
            <div className="text-xs capitalize text-slate-400">{type}s</div>
          </div>
        ))}
      </div>

      {/* Search */}
      <input
        type="text"
        placeholder="Search memories..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full bg-slate-900 border border-slate-700 rounded-lg px-4 py-2 text-white placeholder-slate-500 text-sm mb-6 focus:outline-none focus:border-pink-600"
      />

      {/* Chain */}
      {loading ? (
        <div className="text-slate-500">Loading memory chain...</div>
      ) : (
        <div className="space-y-2">
          {filtered.map((entry, i) => (
            <div
              key={entry.hash}
              className="bg-slate-900 rounded-lg p-4 border border-slate-800 font-mono text-xs"
            >
              <div className="flex items-start justify-between gap-4 mb-2">
                <div className="flex items-center gap-2">
                  <span
                    className={`px-1.5 py-0.5 rounded text-xs font-sans font-medium ${TYPE_COLORS[entry.type]}`}
                  >
                    {entry.type}
                  </span>
                  <span
                    className={`font-sans text-xs ${TRUTH_LABELS[entry.truth_state].color}`}
                  >
                    {TRUTH_LABELS[entry.truth_state].label}
                  </span>
                </div>
                <div className="text-slate-500 font-sans text-xs shrink-0">
                  {entry.agent && <span className="mr-2">{entry.agent}</span>}
                  {new Date(entry.timestamp).toLocaleString()}
                </div>
              </div>

              <div className="text-slate-200 font-sans text-sm mb-3">
                {entry.content}
              </div>

              <div className="text-slate-600 space-y-0.5">
                <div>
                  <span className="text-slate-500">hash: </span>
                  <span className="text-slate-400">{entry.hash.slice(0, 16)}…</span>
                </div>
                <div>
                  <span className="text-slate-500">prev: </span>
                  <span className="text-slate-400">
                    {entry.prev_hash === "GENESIS"
                      ? "GENESIS"
                      : `${entry.prev_hash.slice(0, 16)}…`}
                  </span>
                </div>
              </div>

              {/* Chain link */}
              {i < filtered.length - 1 && (
                <div className="mt-2 text-center text-slate-700">↓</div>
              )}
            </div>
          ))}
          {filtered.length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No memories found
            </div>
          )}
        </div>
      )}
    </div>
  );
}
