import { NextResponse } from 'next/server';

export async function GET() {
  const body = {
    status: 'ok',
    service: 'web',
    timestamp: new Date().toISOString(),
    env: process.env.NODE_ENV ?? 'development'
  };

  return NextResponse.json(body, { status: 200 });
}
