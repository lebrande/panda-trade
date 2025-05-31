"use client"

import { PandaTop } from "@/components/panda-top";
import { RiskLevel } from "@/input-token-step/risk-level";
import { InputTokenAmount } from "@/input-token-step/input-token-amount";
import { SwapHeader } from "@/input-token-step/swap-header";

export default function InputTokenStep() {
  return (
    <div className="flex items-center justify-center min-h-screen bg-[#212b36]">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#2a343f]">
        <PandaTop />

        <div className="mb-8">
          <SwapHeader />
          <InputTokenAmount />
          <RiskLevel />

          <div className="flex justify-end">
            <button className="px-8 py-4 text-lg font-bold text-white rounded-xl bg-[#00a76f]">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
