import { getAnswerFromPanda } from '@/open-ai/get-answer-from-panda';
import { getTokens } from '@/blockscout/get-tokens';
import { riskLevelSchema, tagsSchema } from '@/open-ai/types';
import { NextResponse } from 'next/server';
import { verifyOpenAIResponse } from '@/utils/verifiy-prompt-OpenAI';


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
    console.log("######################################")
    const answer = await getAnswerFromPanda({
      riskLevel: riskLevelParsed.data,
      tags: tagsParsed.data,
      tokens,
    });
    console.log(answer)
    const prompt = `Give me a list of tokens that are related to the tags ${tags} and the risk level ${riskLevel}`;
    const verifiedAnswer = await verifyOpenAIResponse(prompt);

    console.log(verifiedAnswer);
    return NextResponse.json({
      verifiedAnswer,
    });
    
  } catch (error) {
    console.error('Failed to get answer from panda:', error);
    return NextResponse.json({ error: 'Failed to get answer from panda' }, { status: 500 });
  }
}