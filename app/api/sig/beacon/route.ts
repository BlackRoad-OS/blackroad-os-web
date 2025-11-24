import { NextResponse } from 'next/server';

export const runtime = 'edge';

export async function GET() {
  const beacon = {
    version: '1.0.0',
    timestamp: new Date().toISOString(),
    system: {
      status: 'operational',
      uptime: 99.98,
      region: 'us-east-1',
    },
    agents: [
      {
        id: 'lucidia-001',
        name: 'Lucidia',
        status: 'active',
        lastHeartbeat: new Date().toISOString(),
        operations: 1547,
        successRate: 98.5,
        avgResponseTime: 145,
      },
      {
        id: 'sentinel-002',
        name: 'Sentinel',
        status: 'thinking',
        lastHeartbeat: new Date(Date.now() - 30000).toISOString(),
        operations: 892,
        successRate: 99.2,
        avgResponseTime: 112,
      },
      {
        id: 'orchestrator-003',
        name: 'Orchestrator',
        status: 'idle',
        lastHeartbeat: new Date(Date.now() - 120000).toISOString(),
        operations: 2341,
        successRate: 97.8,
        avgResponseTime: 203,
      },
      {
        id: 'guardian-004',
        name: 'Guardian',
        status: 'active',
        lastHeartbeat: new Date().toISOString(),
        operations: 5672,
        successRate: 99.7,
        avgResponseTime: 89,
      },
    ],
    metrics: {
      totalOperations: 10452,
      activeAgents: 12,
      queuedTasks: 37,
      completedToday: 8547,
    },
  };

  return NextResponse.json(beacon, {
    headers: {
      'Cache-Control': 'public, s-maxage=10, stale-while-revalidate=59',
    },
  });
}
