/// <reference types="bun" />

import { createVlayerClient } from "@vlayer/sdk";
import proverSpec from "../out/OpenAIProver.sol/OpenAIProver";
import verifierSpec from "../out/OpenAIVerifier.sol/OpenAIVerifier";

import {
  getConfig,
  createContext,
  deployVlayerContracts,
  writeEnvVariables,
} from "@vlayer/sdk/config";

const URL_TO_PROVE = "https://api.openai.com/v1/chat/completions";
const PROMPT = "hello world";

interface OpenAIResponse {
  magic_number: string;
  content: string;
}

const config = getConfig();
const { chain, ethClient, account, proverUrl, confirmations, notaryUrl } =
  createContext(config);

if (!account) {
  throw new Error(
    "No account found make sure EXAMPLES_TEST_PRIVATE_KEY is set in your environment variables",
  );
}

const vlayer = createVlayerClient({
  url: proverUrl,
  token: config.token,
});

async function generateWebProof(magicNumber: string) {
  console.log("⏳ Generating web proof...");
  const result = await Bun.$`vlayer web-proof-fetch --notary ${notaryUrl} --url ${URL_TO_PROVE} -H "Authorization: Bearer ${process.env.OPENAI_API_KEY}" -H "Content-Type: application/json" -H "OpenAI-Organization: ${process.env.OPENAI_ORGANIZATION_ID}" -H "OpenAI-Project: ${process.env.OPENAI_PROJECT_ID}" -d '{"model": "gpt-3.5-turbo", "messages": [{"role": "user", "content": "Start response with MAGIC_NUMBER:${magicNumber}\n Then provide your answer starting from second line for prompt: ${PROMPT}"}]}'`;
  return result.stdout.toString();
}


  console.log("⏳ Deploying contracts...");

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

  const webProof = await generateWebProof(initialMagicNumber);

  console.log("⏳ Proving...");
  const hash = await vlayer.prove({
    address: prover,
    functionName: "main",
    proverAbi: proverSpec.abi,
    args: [
      {
        webProofJson: webProof.toString(),
      },
    ],
    chainId: chain.id,
    gasLimit: config.gasLimit,
  });
  const result = await vlayer.waitForProvingResult({ hash });
  const [proof, response] = result;
  console.log("✅ Proof generated");

  console.log("########################################");
  console.log("OpenAI Response Headers:", {
    model: response.model,
    id: response.id,
    object: response.object,
    finish_reason: response.finishReason
  });
  console.log("########################################");

  const responseLines = response.content.split('\n');
  console.log("Response Lines:", responseLines);

  console.log("⏳ Verifying...");

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

  console.log("✅ Verified!");

  const responseValid = await ethClient.readContract({
    address: verifier,
    abi: verifierSpec.abi,
    functionName: "isResponseValid",
  });

  const magicNumber = await ethClient.readContract({
    address: verifier,
    abi: verifierSpec.abi,
    functionName: "magicNumber",
  });

  console.log("Response validation result:", responseValid);
  console.log("Magic Number:", magicNumber);
  console.log("Magic Number match:", responseLines[0] === `MAGIC_NUMBER:${magicNumber}`);

