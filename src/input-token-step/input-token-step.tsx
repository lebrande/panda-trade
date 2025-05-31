"use client"

import { useState } from "react"
import { ChevronDown } from "lucide-react"
import Image from "next/image"

export default function InputTokenStep() {
  const [riskLevel, setRiskLevel] = useState(0)

  return (
    <div className="flex items-center justify-center min-h-screen bg-[#212b36]">
      <div className="w-full max-w-md p-8 rounded-3xl bg-[#2a343f]">
        <div className="p-6 mb-6 text-center rounded-2xl bg-[#333d49]">
          <div className="flex justify-center mb-4">
            <Image src="/panda.png" alt="Panda mascot" width={120} height={120} className="w-auto h-auto" />
          </div>
          <p className="mb-2 text-lg text-[#919eab]">Tell me your amount and risk level</p>
          <h2 className="text-2xl font-bold text-white">I'll fetch you the best swap!</h2>
        </div>

        <div className="mb-8">
          <div className="flex items-center justify-between mb-6">
            <h3 className="text-2xl font-bold text-white">Swap</h3>
            <div>
              <button className="flex items-center px-3 py-2 space-x-2 text-white rounded-full">
                <div className="flex items-center justify-center w-6 h-6 bg-[#627eea] rounded-full">
                  <svg viewBox="0 0 24 24" width="16" height="16" fill="white">
                    <path d="M11.944 17.97L4.58 13.62 11.943 24l7.37-10.38-7.372 4.35h.003zM12.056 0L4.69 12.223l7.365 4.354 7.365-4.35L12.056 0z" />
                  </svg>
                </div>
                <span>Ethereum</span>
                <ChevronDown className="w-4 h-4" />
              </button>
              <p className="mt-1 text-sm text-right text-[#7c8d9c]">Network</p>
            </div>
          </div>

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
                  <div className="text-2xl font-bold text-white">2 605,13</div>
                  <div className="text-sm text-[#7c8d9c]">~$2 605.13 (-0.08%)</div>
                </div>
              </div>
            </div>
          </div>

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

          <div className="flex justify-end">
            <button className="px-8 py-4 text-lg font-bold text-white rounded-xl bg-[#00a76f]">Next</button>
          </div>
        </div>
      </div>
    </div>
  )
}
