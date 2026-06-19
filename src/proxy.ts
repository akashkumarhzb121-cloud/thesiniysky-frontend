import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function proxy(request: NextRequest) {
  // For now, let all requests through - auth is handled by the frontend hooks
  return NextResponse.next();
}