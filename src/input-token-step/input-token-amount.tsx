import { Input } from "@/components/ui/input"
import { useState } from "react";

export const InputTokenAmount = () => {
  const [amount, setAmount] = useState('');

  return (
    <div className="mb-6">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-[#00a76f] rounded-full">
          <span>1</span>
        </div>
        <h4 className="text-lg font-medium text-white">How much you want to swap?</h4>
      </div>

      <div className="p-4 rounded-xl bg-[#333d49]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center p-1 bg-white rounded-full">
              <div className="flex items-center justify-center w-8 h-8 bg-[#2775ca] rounded-full">
                <span className="text-white font-bold">$</span>
              </div>
            </div>
            <span className="text-xl font-bold text-white">USDC</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#7c8d9c]">USDC</div>
            <Input
              type="text"
              className="text-2xl font-bold text-white text-right"
              value={amount}
              onChange={(e) => setAmount(e.target.value)}
            />
            <div className="text-sm text-[#7c8d9c]">~$2 605.13 (-0.08%)</div>
          </div>
        </div>
      </div>
    </div >
  )
}