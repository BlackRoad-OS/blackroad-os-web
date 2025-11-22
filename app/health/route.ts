import { NextResponse } from 'next/server';

export const dynamic = 'force-static';

// NOTE: Add api/health test once test infrastructure is wired up.
export async function GET() {
  return NextResponse.json({
    status: 'ok',
    service: 'web',
    env: process.env.NODE_ENV ?? 'development',
    timestamp: new Date().toISOString()
  });
}
