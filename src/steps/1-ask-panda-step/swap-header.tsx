import { ChevronDownIcon } from "lucide-react"

export const SwapHeader = () => {
  return (
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
          <ChevronDownIcon className="w-4 h-4" />
        </button>
        <p className="mt-1 text-sm text-right text-[#7c8d9c]">Network</p>
      </div>
    </div>
  )
}