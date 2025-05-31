import { useQuery } from '@tanstack/react-query';
import { Address } from 'viem';
import { z } from 'zod';
import axios from 'axios';
import { OdosQuoteResponse, OdosAssembleResponse } from './types';
import { addressSchema, hexSchema } from '@/lib/schema';

const odosClient = axios.create({
  baseURL: 'https://api.odos.xyz/',
});

interface Args {
  chainId: number;
  tokenInAmount: bigint;
  tokenInAddress: Address | undefined;
  outputTokens: OutputTokens | undefined;
  slippage: number;
  executorAddress: Address | undefined;
}

export const useOdos = ({
  chainId,
  tokenInAddress,
  tokenInAmount,
  outputTokens,
  slippage,
  executorAddress,
}: Args) => {
  const result = useQuery({
    queryKey: [
      'useOdos',
      chainId,
      tokenInAmount.toString(),
      tokenInAddress,
      outputTokens,
    ],
    queryFn: async () => {
      if (tokenInAddress === undefined) {
        throw new Error('tokenInAddress is undefined');
      }
      if (outputTokens === undefined) {
        throw new Error('outputTokens is undefined');
      }
      if (executorAddress === undefined) {
        throw new Error('executorAddress is undefined');
      }

      return getPriceRoute({
        chainId,
        executorAddress,
        tokenInAddress,
        tokenInAmount,
        outputTokens,
        slippage,
      });
    },
    enabled:
      tokenInAddress !== undefined &&
      outputTokens !== undefined &&
      outputTokens.length > 0 &&
      tokenInAmount !== 0n,
  });

  return result;
};

const getPriceRoute = async ({
  chainId,
  tokenInAmount,
  tokenInAddress,
  outputTokens,
  executorAddress,
  slippage,
}: {
  chainId: number;
  tokenInAmount: bigint;
  tokenInAddress: Address;
  outputTokens: OutputTokens;
  executorAddress: Address;
  slippage: number;
}) => {
  const quoteRequestBody = {
    chainId,
    inputTokens: [
      {
        tokenAddress: tokenInAddress,
        amount: tokenInAmount.toString(),
      },
    ],
    outputTokens,
    userAddr: executorAddress,
    slippageLimitPercent: +slippage,
    referralCode: 0,
    disableRFQs: true,
    compact: true,
    pathVizImage: true,
  };

  const { data: quoteResponse } = await odosClient.post<OdosQuoteResponse>(
    '/sor/quote/v2',
    quoteRequestBody,
  );

  const assembleRequestBody = {
    userAddr: executorAddress,
    pathId: quoteResponse.pathId,
    simulate: false,
  };

  const { data: assembleResponse } =
    await odosClient.post<OdosAssembleResponse>(
      '/sor/assemble',
      assembleRequestBody,
    );

  const tokenOutAmount = assembleResponse.outputTokens[0]?.amount;

  if (tokenOutAmount === undefined) {
    throw new Error('tokenOutAmount is undefined');
  }

  const { transaction } = assembleResponse;

  return resultSchema.parse({
    transaction: {
      calldata: transaction.data,
      target: transaction.to,
    },
    tokenOutAmount: BigInt(tokenOutAmount),
    tokenTransferProxy: transaction.to,
    pathVizImage: quoteResponse.pathVizImage,
  });
};

const resultSchema = z.object({
  transaction: z.object({
    calldata: hexSchema,
    target: addressSchema,
  }),
  tokenOutAmount: z.bigint(),
  tokenTransferProxy: addressSchema,
  pathVizImage: z.string(),
});

const outputTokensItemSchema = z.object({
  tokenAddress: addressSchema,
  proportion: z.number(),
});

export const outputTokensSchema = z.array(outputTokensItemSchema);

type OutputTokens = z.infer<typeof outputTokensSchema>;


