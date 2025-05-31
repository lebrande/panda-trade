import { BlockscoutToken } from '@/blockscout/types';
import { Tag } from '@/open-ai/types';
import OpenAI from 'openai';

const pandaClient = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
});

export const getAnswerFromPanda = async ({
  riskLevel,
  tags,
  tokens,
}: {
  riskLevel: number;
  tags: Tag[];
  tokens: BlockscoutToken[];
}) => {
  try {
    const riskLevelString = `${riskLevel}%`;
    const tagsParamsString = tags.join(', ');

    const textPrompt = `
    You're an expert in the field of blockchain and cryptocurrency.
    Give me an answer in JSON format like in the template below.
    The answer should be a list of tokens with their proportions.
    The proportions should sum to 1.
    Replace the token addresses with the actual token addresses.

    {
      "tokens": [
        {
          "tokenAddress": "0x0000000000000000000000000000000000000000",
          "proportion": 0.5
        }
        {
          "tokenAddress": "0x0000000000000000000000000000000000000000",
          "proportion": 0.2
        }
        {
          "tokenAddress": "0x0000000000000000000000000000000000000000",
          "proportion": 0.3
        }
      ]
    }

    My risk level is ${riskLevelString}.
    My tags are ${tagsParamsString}.

    Pick tokens from the list below.

    ${JSON.stringify(tokens)}
    `;


    const response = await pandaClient.responses.create({
      model: "gpt-4.1",
      input: textPrompt,
    });

    const json = JSON.parse(response.output_text);

    return json;
  } catch (error) {
    console.error(error);
  }
}