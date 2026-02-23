"use client";
import { useState, useEffect } from "react";
import { useMemory } from "@blackroad/sdk";

interface MemoryEntry {
  hash: string;
  prev_hash: string;
  content: string;
  kind: "fact" | "observation" | "inference" | "commitment";
  truth_state: 1 | 0 | -1;
  timestamp: string;
}

const KIND_COLOR: Record<string, string> = {
  fact: "text-green-400", observation: "text-blue-400",
  inference: "text-yellow-400", commitment: "text-purple-400",
};
const TRUTH_LABEL: Record<number, string> = { 1: "TRUE", 0: "UNKNOWN", "-1": "FALSE" };
const TRUTH_COLOR: Record<number, string> = { 1: "text-green-400", 0: "text-yellow-400", "-1": "text-red-400" };

export default function MemoryPage() {
  const { entries, loading, error, write, verifyChain } = useMemory();
  const [chainValid, setChainValid] = useState<boolean | null>(null);
  const [newContent, setNewContent] = useState("");
  const [newKind, setNewKind] = useState<"fact" | "observation" | "inference">("fact");
  const [filter, setFilter] = useState("");

  useEffect(() => {
    verifyChain().then(setChainValid);
  }, [entries]);

  const handleWrite = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!newContent.trim()) return;
    await write(newContent, newKind);
    setNewContent("");
  };

  const filtered = filter
    ? entries.filter((e) => e.content.toLowerCase().includes(filter.toLowerCase()))
    : entries;

  return (
    <div className="p-6 max-w-4xl mx-auto space-y-6">
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-2xl font-bold text-white">Memory Chain</h1>
          <p className="text-sm text-zinc-400 mt-1">PS-SHA∞ tamper-evident knowledge store</p>
        </div>
        {chainValid !== null && (
          <div className={`px-3 py-1 rounded-full text-xs font-mono font-bold ${chainValid ? "bg-green-900 text-green-300" : "bg-red-900 text-red-300"}`}>
            {chainValid ? "✓ CHAIN VALID" : "✗ CHAIN BROKEN"}
          </div>
        )}
      </div>

      {/* Write new memory */}
      <form onSubmit={handleWrite} className="bg-zinc-900 border border-zinc-700 rounded-xl p-4 space-y-3">
        <h2 className="text-sm font-semibold text-zinc-300">Store Memory</h2>
        <textarea
          value={newContent}
          onChange={(e) => setNewContent(e.target.value)}
          placeholder="Enter a fact, observation, or inference..."
          rows={2}
          className="w-full bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white placeholder-zinc-500 resize-none"
        />
        <div className="flex items-center gap-3">
          <select
            value={newKind}
            onChange={(e) => setNewKind(e.target.value as typeof newKind)}
            className="bg-zinc-800 border border-zinc-700 rounded-lg px-3 py-2 text-sm text-white"
          >
            <option value="fact">Fact</option>
            <option value="observation">Observation</option>
            <option value="inference">Inference</option>
          </select>
          <button type="submit" className="ml-auto bg-violet-600 hover:bg-violet-500 text-white text-sm px-4 py-2 rounded-lg font-medium">
            Store →
          </button>
        </div>
      </form>

      {/* Filter */}
      <input
        value={filter}
        onChange={(e) => setFilter(e.target.value)}
        placeholder="Search memories..."
        className="w-full bg-zinc-900 border border-zinc-700 rounded-xl px-4 py-2 text-sm text-white placeholder-zinc-500"
      />

      {/* Entries */}
      <div className="space-y-2">
        {loading && <p className="text-zinc-500 text-sm text-center py-8">Loading chain...</p>}
        {error && <p className="text-red-400 text-sm">{error}</p>}
        {filtered.map((entry: MemoryEntry, i) => (
          <div key={entry.hash} className="bg-zinc-900 border border-zinc-800 rounded-xl p-4 font-mono text-xs">
            <div className="flex items-start justify-between gap-4">
              <div className="flex-1 min-w-0">
                <p className="text-white text-sm font-sans font-medium break-words">{entry.content}</p>
                <div className="flex items-center gap-3 mt-2">
                  <span className={`${KIND_COLOR[entry.kind]} uppercase`}>{entry.kind}</span>
                  <span className={`${TRUTH_COLOR[entry.truth_state]}`}>{TRUTH_LABEL[entry.truth_state]}</span>
                  <span className="text-zinc-500">{new Date(entry.timestamp).toLocaleString()}</span>
                </div>
              </div>
              <div className="text-right shrink-0">
                <p className="text-zinc-500">#{String(filtered.length - i).padStart(4, "0")}</p>
                <p className="text-zinc-700 mt-1">{entry.hash.slice(0, 8)}…</p>
              </div>
            </div>
          </div>
        ))}
        {!loading && filtered.length === 0 && (
          <p className="text-zinc-500 text-sm text-center py-12">No memories yet. Store your first entry above.</p>
        )}
      </div>
    </div>
  );
}
