import { NextResponse } from 'next/server';
import { collectHealthPayload, identityHeaders } from '../../src/lib/observability';

export async function GET() {
  return NextResponse.json(collectHealthPayload(), { headers: identityHeaders });
}
