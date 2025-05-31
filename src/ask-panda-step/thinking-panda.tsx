import Image from "next/image";

export const ThinkingPanda = () => {
  return (
    <div className="flex justify-center">
      <Image
        src="/panda-thinking.png"
        alt="Loading"
        width={292}
        height={292}
      />
      <p className="text-xs text-muted-foreground">Hang tight...</p>
      <p className="text-xs text-foreground">I'm crunching the numbers and sniffing out the best swap for you.</p>
    </div>
  )
}