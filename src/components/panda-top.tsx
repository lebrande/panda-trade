import Image from "next/image"

export const PandaTop = () => {
  return (
    <div className="p-6 mb-6 text-center rounded-2xl bg-[#333d49]">
      <div className="flex justify-center mb-4">
        <Image src="/panda.png" alt="Panda mascot" width={120} height={120} className="w-auto h-auto" />
      </div>
      <p className="mb-2 text-lg text-[#919eab]">Tell me your amount and risk level</p>
      <h2 className="text-2xl font-bold text-white">I'll fetch you the best swap!</h2>
    </div>
  )
}