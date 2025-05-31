import { getTokens } from '@/1inch/get-tokens';
import { NextResponse } from 'next/server';

export async function GET() {
  try {
    const tokens = await getTokens();
    return NextResponse.json(tokens);
  } catch (error) {
    // Optionally log the error
    console.error('Failed to fetch tokens:', error);
    return NextResponse.json({ error: 'Failed to fetch tokens' }, { status: 500 });
  }
}