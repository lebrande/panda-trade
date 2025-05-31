import { createVlayerClient } from "@vlayer/sdk";
import proverSpec from "../../vlayer/out/OpenAIProver.sol/OpenAIProver";
import verifierSpec from "../../vlayer/out/OpenAIVerifier.sol/OpenAIVerifier";
import { getConfig, createContext, deployVlayerContracts, writeEnvVariables } from "@vlayer/sdk/config";

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
    const config = getConfig();
    const { chain, ethClient, account, proverUrl, confirmations, notaryUrl } = createContext(config);

    if (!account) {
      throw new Error("No account found - make sure EXAMPLES_TEST_PRIVATE_KEY is set in your environment variables");
    }

    const vlayer = createVlayerClient({
      url: proverUrl,
      token: config.token,
    });

    const { prover, verifier } = await deployVlayerContracts({
      proverSpec,
      verifierSpec,
      proverArgs: [],
      verifierArgs: [],
    });

    await writeEnvVariables(".env", {
      VITE_PROVER_ADDRESS: prover,
      VITE_VERIFIER_ADDRESS: verifier,
    });

    console.log("✅ Contracts deployed", { prover, verifier });

    console.log("⏳ Generating web proof...");
    const webProof = await Bun.$`vlayer web-proof-fetch --notary ${notaryUrl} --url https://api.openai.com/v1/chat/completions -H "Authorization: Bearer ${process.env.OPENAI_API_KEY}" -H "Content-Type: application/json" -H "OpenAI-Organization: ${process.env.OPENAI_ORGANIZATION_ID}" -H "OpenAI-Project: ${process.env.OPENAI_PROJECT_ID}" -d '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "${prompt}"}]}'`;

    console.log("⏳ Generating proof...");
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

    console.log("⏳ Verifying on blockchain...");
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

    console.log("✅ Blockchain verification completed");

    return {
      isValid: true,
      response: {
        content: response.content
      }
    };

  } catch (error) {
    return {
      isValid: false,
      error: error instanceof Error ? error.message : "Unknown error occurred"
    };
  }
}