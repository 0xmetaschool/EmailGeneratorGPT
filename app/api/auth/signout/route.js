import { NextResponse } from 'next/server';
import { removeTokenCookie } from '@/lib/auth';

export async function POST() {
  removeTokenCookie();
  return NextResponse.json({ success: true });
}