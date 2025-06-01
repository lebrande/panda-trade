import { CheckIcon } from "lucide-react";
import Image from "next/image";

export const HappyPanda = () => {
  return (
    <div className="space-y-4">
      <div className="flex justify-center">
        <Image
          src="/panda-happy.png"
          alt="Happy Panda"
          width={292}
          height={292}
        />
      </div>

      <div className="space-y-2">
        <p className="text-xs text-muted-foreground text-center">
          You nailed it — time to flex your new assets.
        </p>
        <p className="text-base text-foreground text-center">
          Done and dusted. Swap successful!
        </p>
      </div>

      <div className="flex justify-center">
        <CheckIcon className="w-8 h-8 text-primary" />
      </div>
    </div>
  )
}