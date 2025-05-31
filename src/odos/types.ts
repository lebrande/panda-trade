import { Address, Hex } from 'viem';

export interface OdosQuoteResponse {
  traceId: string;
  inTokens: Array<Address>;
  outTokens: Array<Address>;
  inAmounts: Array<string>;
  outAmounts: Array<string>;
  gasEstimate: number;
  dataGasEstimate: number;
  gweiPerGas: number;
  gasEstimateValue: number;
  inValues: Array<number>;
  outValues: Array<number>;
  netOutValue: number;
  priceImpact: number;
  percentDiff: number;
  partnerFeePercent: number;
  pathId: string;
  pathVizImage: string;
  blockNumber: number;
}

export interface OdosAssembleResponse {
  traceId: string;
  blockNumber: number;
  gasEstimate: number;
  gasEstimateValue: number;
  inputTokens: Array<{
    tokenAddress: Address;
    amount: string;
  }>;
  outputTokens: Array<{
    tokenAddress: Address;
    amount: string;
  }>;
  netOutValue: number;
  outValues: Array<string>;
  transaction: {
    gas: number;
    gasPrice: number;
    value: string;
    to: Address;
    from: Address;
    data: Hex;
    nonce: number;
    chainId: number;
  };
  simulation: {
    isSuccess: boolean;
    amountsOut: Array<string>;
    gasEstimate: number;
    simulationError: {
      type: string;
      errorMessage: string;
    };
  };
}
