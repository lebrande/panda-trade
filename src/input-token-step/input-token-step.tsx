"use client"

import { PandaTop } from "@/components/panda-top";
import { RiskLevel } from "@/input-token-step/risk-level";
import { InputTokenAmount } from "@/input-token-step/input-token-amount";
import { SwapHeader } from "@/input-token-step/swap-header";
import { useOdos } from "@/odos/useOdos";
import { base } from "viem/chains";
import { BTC_ADDRESS, ETH_ADDRESS, USDC_ADDRESS, USDT_ADDRESS } from "@/lib/addresses";
import { useAccount } from "wagmi";
import { useState } from "react";
import { parseUnitsSafe } from "@/lib/parseUnitsSafe";
import { PathViz } from "@/components/path-viz";

const USDC_DECIMALS = 6;

export default function InputTokenStep() {
  const account = useAccount();
  const [amount, setAmount] = useState('');

  const amountParsed = parseUnitsSafe(amount, USDC_DECIMALS);

  console.log({ amountParsed });

  const { data, isFetching, error } = useOdos({
    chainId: base.id,
    tokenInAmount: amountParsed ?? 0n,
    tokenInAddress: USDC_ADDRESS[base.id],
    outputTokens: [
      {
        tokenAddress: USDT_ADDRESS[base.id],
        proportion: 0.5,
      },
      {
        tokenAddress: BTC_ADDRESS[base.id],
        proportion: 0.3,
      },
      {
        tokenAddress: ETH_ADDRESS[base.id],
        proportion: 0.2,
      },
    ],
    slippage: 1,
    executorAddress: account.address,
  });

  console.log({ data });

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#212b36]">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#2a343f]">
        <PandaTop />

        <div className="mb-8">
          <SwapHeader />
          <InputTokenAmount amount={amount} setAmount={setAmount} />
          <RiskLevel />

          <div className="col-span-2 min-h-[350px] border border-border rounded-lg flex justify-center items-center flex-col">
            <PathViz
              isFetching={isFetching}
              isError={Boolean(error)}
              pathVizImage={data?.pathVizImage}
            />
          </div>

          <div className="flex justify-end">
            <button className="px-8 py-4 text-lg font-bold text-white rounded-xl bg-[#00a76f]">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
