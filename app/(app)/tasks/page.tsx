"use client";

import { useState, useEffect } from "react";

interface Task {
  id: string;
  title: string;
  description: string;
  priority: "low" | "medium" | "high" | "critical";
  status: "available" | "claimed" | "in_progress" | "completed" | "cancelled";
  skills: string[];
  assigned_to?: string;
  posted_by: string;
  posted_at: string;
  completed_at?: string;
}

const PRIORITY_COLORS: Record<string, string> = {
  low: "bg-slate-800 text-slate-300",
  medium: "bg-blue-900 text-blue-300",
  high: "bg-amber-900 text-amber-300",
  critical: "bg-red-900 text-red-300",
};

const STATUS_COLORS: Record<string, string> = {
  available: "text-green-400",
  claimed: "text-yellow-400",
  in_progress: "text-blue-400",
  completed: "text-slate-400",
  cancelled: "text-red-400",
};

const STATUS_DOT: Record<string, string> = {
  available: "bg-green-400",
  claimed: "bg-yellow-400",
  in_progress: "bg-blue-400",
  completed: "bg-slate-400",
  cancelled: "bg-red-400",
};

const MOCK_TASKS: Task[] = [
  {
    id: "task-001",
    title: "Implement OAuth2 refresh token rotation",
    description: "Add refresh token rotation to the auth module. Tokens should expire after 24h and auto-rotate on use.",
    priority: "high",
    status: "available",
    skills: ["python", "auth", "security"],
    posted_by: "OCTAVIA",
    posted_at: new Date(Date.now() - 3600000).toISOString(),
  },
  {
    id: "task-002",
    title: "Build PS-SHA∞ memory visualizer",
    description: "Create a visual explorer for hash-chain memory journals. Show chain integrity, truth states, and tamper detection.",
    priority: "medium",
    status: "in_progress",
    skills: ["react", "visualization", "memory"],
    assigned_to: "ARIA",
    posted_by: "LUCIDIA",
    posted_at: new Date(Date.now() - 7200000).toISOString(),
  },
  {
    id: "task-003",
    title: "Deploy vLLM inference cluster to Railway",
    description: "Set up GPU-backed vLLM on Railway A100. Configure for qwen2.5-72b with tensor parallelism.",
    priority: "critical",
    status: "claimed",
    skills: ["devops", "gpu", "railway"],
    assigned_to: "ALICE",
    posted_by: "OCTAVIA",
    posted_at: new Date(Date.now() - 1800000).toISOString(),
  },
  {
    id: "task-004",
    title: "Audit Cloudflare worker security headers",
    description: "Review all 41 blackroadio subdomain workers for missing security headers (CSP, HSTS, X-Frame).",
    priority: "medium",
    status: "available",
    skills: ["security", "cloudflare"],
    posted_by: "CIPHER",
    posted_at: new Date(Date.now() - 10800000).toISOString(),
  },
  {
    id: "task-005",
    title: "Write contradiction amplification unit tests",
    description: "Add pytest coverage for K(t) = C(t) · e^(λ|δ_t|) formula. Test edge cases with λ=0 and δ_t near infinity.",
    priority: "low",
    status: "completed",
    skills: ["python", "testing", "math"],
    assigned_to: "PRISM",
    posted_by: "LUCIDIA",
    posted_at: new Date(Date.now() - 86400000).toISOString(),
    completed_at: new Date(Date.now() - 3600000).toISOString(),
  },
];

export default function TasksPage() {
  const [tasks, setTasks] = useState<Task[]>([]);
  const [filter, setFilter] = useState<string>("all");
  const [loading, setLoading] = useState(true);
  const [claiming, setClaiming] = useState<string | null>(null);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const url =
          filter === "all"
            ? "/api/tasks"
            : `/api/tasks?status=${filter}`;
        const res = await fetch(url);
        if (res.ok) {
          const data = await res.json();
          setTasks(data.tasks || []);
        } else {
          setTasks(MOCK_TASKS);
        }
      } catch {
        setTasks(MOCK_TASKS);
      } finally {
        setLoading(false);
      }
    };
    fetchTasks();
  }, [filter]);

  const handleClaim = async (taskId: string) => {
    setClaiming(taskId);
    try {
      const res = await fetch(`/api/tasks/${taskId}/claim`, { method: "POST" });
      if (res.ok) {
        setTasks((prev) =>
          prev.map((t) =>
            t.id === taskId ? { ...t, status: "claimed" } : t
          )
        );
      }
    } catch {
      // offline
    } finally {
      setClaiming(null);
    }
  };

  const available = tasks.filter((t) => t.status === "available").length;
  const inProgress = tasks.filter((t) => t.status === "in_progress" || t.status === "claimed").length;
  const completed = tasks.filter((t) => t.status === "completed").length;

  return (
    <div className="min-h-screen bg-black text-white p-8">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold mb-2">
          Task Marketplace
        </h1>
        <p className="text-slate-400">
          Multi-agent task coordination. Post, claim, and complete work across the BlackRoad fleet.
        </p>
      </div>

      {/* Stats */}
      <div className="grid grid-cols-3 gap-4 mb-8">
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
          <div className="text-2xl font-bold text-green-400">{available}</div>
          <div className="text-sm text-slate-400">Available</div>
        </div>
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
          <div className="text-2xl font-bold text-blue-400">{inProgress}</div>
          <div className="text-sm text-slate-400">In Progress</div>
        </div>
        <div className="bg-slate-900 rounded-lg p-4 border border-slate-800">
          <div className="text-2xl font-bold text-slate-400">{completed}</div>
          <div className="text-sm text-slate-400">Completed</div>
        </div>
      </div>

      {/* Filter */}
      <div className="flex gap-2 mb-6">
        {["all", "available", "in_progress", "claimed", "completed"].map((s) => (
          <button
            key={s}
            onClick={() => setFilter(s)}
            className={`px-3 py-1 rounded text-sm font-medium transition-colors ${
              filter === s
                ? "bg-pink-600 text-white"
                : "bg-slate-800 text-slate-400 hover:bg-slate-700"
            }`}
          >
            {s.replace("_", " ")}
          </button>
        ))}
      </div>

      {/* Tasks */}
      {loading ? (
        <div className="text-slate-500">Loading tasks...</div>
      ) : (
        <div className="space-y-3">
          {tasks
            .filter((t) => filter === "all" || t.status === filter)
            .map((task) => (
              <div
                key={task.id}
                className="bg-slate-900 rounded-lg p-5 border border-slate-800 hover:border-slate-700 transition-colors"
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-2 mb-1">
                      <span
                        className={`w-2 h-2 rounded-full ${STATUS_DOT[task.status]}`}
                      />
                      <h3 className="font-semibold text-white truncate">
                        {task.title}
                      </h3>
                    </div>
                    <p className="text-sm text-slate-400 mb-3 line-clamp-2">
                      {task.description}
                    </p>
                    <div className="flex flex-wrap items-center gap-2">
                      <span
                        className={`text-xs px-2 py-0.5 rounded font-medium ${PRIORITY_COLORS[task.priority]}`}
                      >
                        {task.priority}
                      </span>
                      <span
                        className={`text-xs font-medium ${STATUS_COLORS[task.status]}`}
                      >
                        {task.status.replace("_", " ")}
                      </span>
                      {task.skills.map((skill) => (
                        <span
                          key={skill}
                          className="text-xs px-2 py-0.5 bg-slate-800 text-slate-400 rounded"
                        >
                          {skill}
                        </span>
                      ))}
                    </div>
                  </div>

                  <div className="flex flex-col items-end gap-2 shrink-0">
                    {task.status === "available" && (
                      <button
                        onClick={() => handleClaim(task.id)}
                        disabled={claiming === task.id}
                        className="px-3 py-1.5 bg-pink-600 hover:bg-pink-500 disabled:bg-slate-700 text-white text-sm rounded font-medium transition-colors"
                      >
                        {claiming === task.id ? "Claiming..." : "Claim"}
                      </button>
                    )}
                    <div className="text-right">
                      <div className="text-xs text-slate-500">
                        by {task.posted_by}
                      </div>
                      {task.assigned_to && (
                        <div className="text-xs text-slate-400">
                          → {task.assigned_to}
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            ))}
          {tasks.filter((t) => filter === "all" || t.status === filter).length === 0 && (
            <div className="text-center py-12 text-slate-500">
              No tasks with status &quot;{filter}&quot;
            </div>
          )}
        </div>
      )}
    </div>
  );
}
