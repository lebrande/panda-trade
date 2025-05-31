import { PropsWithChildren } from "react";

interface Props {
  number: number;
}

export const SectionTitle = ({ number, children }: PropsWithChildren<Props>) => {
  return (
    <div className="flex items-center mb-4">
      <div className="flex items-center justify-center w-8 h-8 mr-3 text-foreground bg-primary rounded-full">
        <span>{number}</span>
      </div>
      <h4 className="text-lg font-medium text-foreground">
        {children}
      </h4>
    </div>
  )
}