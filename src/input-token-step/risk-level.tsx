import { useState } from "react";

export const RiskLevel = () => {
  const [riskLevel, setRiskLevel] = useState(0);
  
  return (
    <div className="mb-8">
      <div className="flex items-center mb-4">
        <div className="flex items-center justify-center w-8 h-8 mr-3 text-white bg-[#00a76f] rounded-full">
          <span>2</span>
        </div>
        <h4 className="text-lg font-medium text-white">What is your risk level?</h4>
      </div>

      <div className="p-6 rounded-xl bg-[#333d49]">
        <div className="flex justify-between mb-4 text-sm">
          <span className="text-white">Very Low</span>
          <span className="text-white">Low</span>
          <span className="text-white">Medium</span>
          <span className="text-white">High</span>
          <span className="text-white">Very High</span>
        </div>

        <div className="relative h-2 mb-2">
          <div className="absolute w-full h-full rounded-full bg-gradient-to-r from-[#00a76f] via-[#ffcc33] to-[#fe0000]"></div>
          <input
            type="range"
            min="0"
            max="100"
            value={riskLevel}
            onChange={(e) => setRiskLevel(Number.parseInt(e.target.value))}
            className="absolute w-full h-full opacity-0 cursor-pointer"
          />
          <div
            className="absolute w-6 h-6 -mt-2 -ml-3 bg-[#00a76f] rounded-full border-4 border-white"
            style={{ left: `${riskLevel}%` }}
          ></div>
        </div>
      </div>
    </div>
  )
}