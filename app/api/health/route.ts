import { NextResponse } from 'next/server';

export async function GET() {
  const body = {
    status: 'ok',
    service: 'web'
  };

  return NextResponse.json(body, { status: 200 });
}
