import { createVlayerClient } from "@vlayer/sdk";
import proverSpec from "../../vlayer/out/OpenAIProver.sol/OpenAIProver";
import verifierSpec from "../../vlayer/out/OpenAIVerifier.sol/OpenAIVerifier";
import { getConfig, createContext, deployVlayerContracts, writeEnvVariables } from "@vlayer/sdk/config";

interface OpenAIResponse {
  magic_number: string;
  content: string;
}

interface VerificationResult {
  isValid: boolean;
  response?: OpenAIResponse;
  error?: string;
  magicNumber?: string;
  details?: {
    openaiResponse?: string;
    verificationStatus?: string;
    blockchainVerified?: boolean;
  };
}

export async function verifyOpenAIResponse(
  prompt: string
): Promise<VerificationResult> {
  try {
    const config = getConfig();
    const { chain, ethClient, account, proverUrl, confirmations, notaryUrl } = createContext(config);

    if (!account) {
      throw new Error("Brak konta - upewnij się, że EXAMPLES_TEST_PRIVATE_KEY jest ustawiony w zmiennych środowiskowych");
    }

    const vlayer = createVlayerClient({
      url: proverUrl,
      token: config.token,
    });

    const initialMagicNumber = Math.random().toString(36).substring(2, 8);
    console.log("Initial Magic Number:", initialMagicNumber);

    const { prover, verifier } = await deployVlayerContracts({
      proverSpec,
      verifierSpec,
      proverArgs: [],
      verifierArgs: [initialMagicNumber],
    });

    await writeEnvVariables(".env", {
      VITE_PROVER_ADDRESS: prover,
      VITE_VERIFIER_ADDRESS: verifier,
    });

    console.log("✅ Contracts deployed", { prover, verifier });

    console.log("⏳ Generowanie dowodu web...");
    const webProof = await Bun.$`vlayer web-proof-fetch --notary ${notaryUrl} --url https://api.openai.com/v1/chat/completions -H "Authorization: Bearer ${process.env.OPENAI_API_KEY}" -H "Content-Type: application/json" -H "OpenAI-Organization: ${process.env.OPENAI_ORGANIZATION_ID}" -H "OpenAI-Project: ${process.env.OPENAI_PROJECT_ID}" -d '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Start response with MAGIC_NUMBER:${initialMagicNumber}\n Then provide your answer starting from second line for prompt: ${prompt}"}]}'`;

    console.log("⏳ Generowanie dowodu...");
    const hash = await vlayer.prove({
      address: prover,
      functionName: "main",
      proverAbi: proverSpec.abi,
      args: [
        {
          webProofJson: webProof.stdout.toString(),
        },
      ],
      chainId: chain.id,
      gasLimit: config.gasLimit,
    });

    const result = await vlayer.waitForProvingResult({ hash });
    const [proof, response] = result;
    console.log("✅ Proof generated");

    const responseLines = response.content.split('\n');
    const magicNumberLine = responseLines[0];
    const content = responseLines.slice(1).join('\n');

    if (!magicNumberLine.startsWith(`MAGIC_NUMBER:${initialMagicNumber}`)) {
      return {
        isValid: false,
        error: "Bad number",
        magicNumber: initialMagicNumber,
        details: {
          openaiResponse: response.content,
          verificationStatus: "Failed - Invalid magic number"
        }
      };
    }

    console.log("⏳ Weryfikacja...");
    const gas = await ethClient.estimateContractGas({
      address: verifier,
      abi: verifierSpec.abi,
      functionName: "verify",
      args: [proof, response],
      account,
      blockTag: "pending",
    });

    const txHash = await ethClient.writeContract({
      address: verifier,
      abi: verifierSpec.abi,
      functionName: "verify",
      args: [proof, response],
      chain,
      account,
      gas,
    });

    await ethClient.waitForTransactionReceipt({
      hash: txHash,
      confirmations,
      retryCount: 60,
      retryDelay: 1000,
    });

    const responseValid = await ethClient.readContract({
      address: verifier,
      abi: verifierSpec.abi,
      functionName: "isResponseValid",
    });

    const storedMagicNumber = await ethClient.readContract({
      address: verifier,
      abi: verifierSpec.abi,
      functionName: "magicNumber",
    });

    return {
      isValid: responseValid && initialMagicNumber === storedMagicNumber,
      response: {
        magic_number: initialMagicNumber,
        content: content
      },
      magicNumber: storedMagicNumber,
      details: {
        openaiResponse: response.content,
        verificationStatus: responseValid ? "Success - Response verified on blockchain" : "Failed - Response verification failed",
        blockchainVerified: responseValid
      }
    };

  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Unknown error occurred",
      details: {
        verificationStatus: "Failed - Error during verification"
      }
    };
  }
}