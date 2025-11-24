import { NextResponse } from 'next/server';
import { collectHealthPayload, identityHeaders } from '@/lib/observability';

export const dynamic = 'force-dynamic';

export async function GET() {
  return NextResponse.json(collectHealthPayload(), { headers: identityHeaders });
}
