import { getAnswerFromPanda } from '@/open-ai/get-answer-from-panda';
import { getTokens } from '@/blockscout/get-tokens';
import { riskLevelSchema, tagsSchema } from '@/open-ai/types';
import { NextResponse } from 'next/server';

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const tags = searchParams.get('tags') || '';
    const tagsArray = tags.split(',');
    const tagsParsed = tagsSchema.safeParse(tagsArray);

    if (tagsParsed.error) {
      return NextResponse.json({ error: 'Invalid tags' }, { status: 400 });
    }

    const riskLevel = searchParams.get('riskLevel') || '';
    const riskLevelParsed = riskLevelSchema.safeParse(riskLevel);

    if (riskLevelParsed.error) {
      return NextResponse.json({ error: 'Invalid risk level' }, { status: 400 });
    }

    const { items: tokens } = await getTokens();

    const answer = await getAnswerFromPanda({
      riskLevel: riskLevelParsed.data,
      tags: tagsParsed.data,
      tokens,
    });

    return NextResponse.json({
      answer,
    });
  } catch (error) {
    console.error('Failed to get answer from panda:', error);
    return NextResponse.json({ error: 'Failed to get answer from panda' }, { status: 500 });
  }
}