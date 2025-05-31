import { LoaderIcon } from "lucide-react";
import Image from "next/image";

export const ThinkingPanda = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Image
          src="/panda-thinking.png"
          alt="Loading"
          width={292}
          height={292}
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground text-center">Hang tight...</p>
        <p className="text-base text-foreground text-center">I'm crunching the numbers and sniffing out the best swap for you.</p>
      </div>

      <div className="flex justify-center">
        <LoaderIcon className="w-8 h-8 animate-spin text-primary" />
      </div>
    </div>
  )
}