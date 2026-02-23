import { NextRequest, NextResponse } from "next/server";

const GATEWAY = process.env.BLACKROAD_GATEWAY_URL ?? "http://127.0.0.1:8787";

export async function POST(req: NextRequest) {
  const body = await req.json();

  try {
    const upstream = await fetch(`${GATEWAY}/v1/chat`, {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(body),
    });

    // Stream back if gateway sends SSE
    if (upstream.headers.get("content-type")?.includes("text/event-stream")) {
      return new NextResponse(upstream.body, {
        status: 200,
        headers: {
          "Content-Type": "text/event-stream",
          "Cache-Control": "no-cache",
          "X-Accel-Buffering": "no",
        },
      });
    }

    const data = await upstream.json();
    return NextResponse.json(data, { status: upstream.status });
  } catch {
    // Offline graceful degradation
    return NextResponse.json(
      {
        role: "assistant",
        content:
          "Gateway offline. To enable live AI responses, start the BlackRoad gateway: `br gateway start`",
        agent: body.agent ?? "SYSTEM",
        offline: true,
      },
      { status: 200 }
    );
  }
}
