import { NextResponse } from 'next/server';
import { collectVersionPayload, identityHeaders } from '../../src/lib/observability';

export async function GET() {
  return NextResponse.json(collectVersionPayload(), { headers: identityHeaders });
}

export type VersionPayload = ReturnType<typeof collectVersionPayload>;
