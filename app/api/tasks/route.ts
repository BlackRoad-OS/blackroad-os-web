import { NextRequest, NextResponse } from "next/server";

const GATEWAY = process.env.BLACKROAD_GATEWAY_URL ?? "http://127.0.0.1:8787";

// Mock tasks for offline/dev mode
const MOCK_TASKS = [
  { id: "t1", title: "Deploy gateway to Railway", priority: "high", status: "available", agent: null, tags: ["devops"], createdAt: new Date().toISOString() },
  { id: "t2", title: "Write memory system tests", priority: "medium", status: "claimed", agent: "ALICE", tags: ["testing"], createdAt: new Date().toISOString() },
  { id: "t3", title: "Analyze agent communication patterns", priority: "low", status: "completed", agent: "PRISM", tags: ["research"], createdAt: new Date().toISOString() },
];

export async function GET(req: NextRequest) {
  const { searchParams } = req.nextUrl;
  const status = searchParams.get("status");
  const priority = searchParams.get("priority");

  try {
    const url = new URL(`${GATEWAY}/tasks`);
    if (status) url.searchParams.set("status", status);
    if (priority) url.searchParams.set("priority", priority);

    const upstream = await fetch(url.toString(), { cache: "no-store" });
    const data = await upstream.json();
    return NextResponse.json(data);
  } catch {
    let tasks = MOCK_TASKS;
    if (status) tasks = tasks.filter(t => t.status === status);
    if (priority) tasks = tasks.filter(t => t.priority === priority);
    return NextResponse.json({ tasks, total: tasks.length, offline: true });
  }
}

export async function POST(req: NextRequest) {
  const body = await req.json();
  try {
    const upstream = await fetch(`${GATEWAY}/tasks`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });
    const data = await upstream.json();
    return NextResponse.json(data, { status: 201 });
  } catch {
    return NextResponse.json({
      id: `offline-${Date.now()}`,
      ...body,
      status: "available",
      createdAt: new Date().toISOString(),
      offline: true,
    }, { status: 201 });
  }
}
