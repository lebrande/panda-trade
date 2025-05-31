import { PropsWithChildren } from "react";

export const StepTitle = ({ children }: PropsWithChildren) => {
  return (
    <h2 className="text-2xl font-bold text-foreground">
      {children}
    </h2>
  )
}