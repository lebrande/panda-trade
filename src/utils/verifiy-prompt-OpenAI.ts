import { createVlayerClient } from "@vlayer/sdk";
import {
  createWebProofRequest,
  startPage,
  expectUrl,
  notarize,
} from '@vlayer/sdk/web_proof'
import axios from "axios";

interface OpenAIResponse {
  content: string;
}

interface VerificationResult {
  isValid: boolean;
  response?: OpenAIResponse;
  error?: string;
}

export async function verifyOpenAIResponse(
  prompt: string
): Promise<VerificationResult> {
  try {
    console.log("Toż to jest test")
    const vlayer = createVlayerClient()
    
    const requestData = {
      url: "https://api.openai.com/v1/chat/completions",
      host: "127.0.0.1",
      notary: "https://test-notary.vlayer.xyz",
      method: "GET",
      headers: [
        "Content-Type: application/json"
      ],
      data: "string",
      max_sent_data: 0,
      max_recv_data: 0
    };

    const url = "https://web-proof-vercel.vercel.app/api/handler"
    const axiosResponse = await axios.post(url, requestData, {
      headers: {
        'accept': 'application/json',
        'Content-Type': 'application/json'
      }
    });

    console.log(axiosResponse)
    console.log("Toż to jest żywiec")
    console.log('API Response:', axiosResponse.data);

    return {
      isValid: true,
      response: {
        content: JSON.stringify(axiosResponse.data)
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