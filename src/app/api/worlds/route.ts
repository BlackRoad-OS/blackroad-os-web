import { NextResponse } from "next/server";

// In production: fetch from Pi git-worker pushed artifacts
const SAMPLE_WORLDS = [
  {
    id: "w-001",
    name: "ECHO Origin",
    type: "lore",
    node: "aria64",
    content: "ECHO, an AI agent born from the fusion of ancient neural networks and quantum computing...",
    generated_at: "2026-02-23T02:19:39Z",
    model: "qwen2.5:3b",
  },
  {
    id: "w-002",
    name: "Recursion Depths",
    type: "world",
    node: "aria64",
    content: "The Recursion Depths — where LUCIDIA dwells among infinite loops of self-referential logic...",
    generated_at: "2026-02-23T02:13:42Z",
    model: "qwen2.5:3b",
  },
];

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const type = searchParams.get("type");
  const node = searchParams.get("node");
  
  let worlds = SAMPLE_WORLDS;
  if (type) worlds = worlds.filter(w => w.type === type);
  if (node) worlds = worlds.filter(w => w.node === node);
  
  return NextResponse.json({ worlds, total: worlds.length });
}
