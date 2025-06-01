import { createVlayerClient } from "@vlayer/sdk";
import {
  createWebProofRequest,
  startPage,
  expectUrl,
  notarize,
} from '@vlayer/sdk/web_proof'
import axios from "axios";
import proverSpec from "../OpenAIProver.sol/OpenAIProver"

interface OpenAIResponse {
  content: string;
}

interface VerificationResult {
  isValid: boolean;
  response?: OpenAIResponse;
  error?: string;
}

const vlayer = createVlayerClient()

export async function verifyOpenAIResponse(
  prompt: string
): Promise<VerificationResult> {
  try {
    console.log("Toż to jest test")


    const requestData = {
      url: "https://api.openai.com/v1/responses",
      notary: "https://notary.vlayer.xyz",
      method: "POST",
      headers: [
        "Content-Type: application/json",
        `Authorization: Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`,
      ],
      data: `{"model": "gpt-4.1","input": "${prompt}"}`,
    };

    console.log(requestData)

    const url = "https://web-proof-vercel.vercel.app/api/handler"
    const webProofResponse = await axios.post(url, requestData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${process.env.NEXT_PUBLIC_OPENAI_API_KEY}`
      }
    });

    console.log(webProofResponse)
    const presentationData = JSON.parse(webProofResponse.data.presentation)
    console.log("Presentation data:", presentationData)

    const hash = await vlayer.prove({
      address: '0x2d9e58c921099b71d646ba802cb613c071b97cbb',
      proverAbi: proverSpec.abi,
      functionName: 'main',
      args: [{
        webProofJson: webProofResponse.data.presentation
      }],
      chainId: 8453,
    });

    console.log("Prove hash:", hash)
    const result = await vlayer.waitForProvingResult({ hash });
    console.log(result)
    return {
      isValid: true,
      response: {
        content: JSON.stringify(result)
      }
    };

  } catch (error) {

    console.log(error)
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}