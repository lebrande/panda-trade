import { Step } from "@/lib/types";
import { cn } from "@/lib/utils";
import { CheckIcon } from "lucide-react";

interface Props {
  currentStep: Step;
}

export const Stepper = ({ currentStep }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      <StepperItem
        step="ask-panda"
        isCurrentStep={currentStep === 'ask-panda'}
      />
      <StepperItem
        step="review-and-confirm"
        isCurrentStep={currentStep === 'review-and-confirm'}
      />
      <StepperItem
        step="trade-completed"
        isCurrentStep={currentStep === 'trade-completed'}
      />
    </div>
  )
}

const StepperItem = ({
  step,
  isCurrentStep,
}: {
  step: Step;
  isCurrentStep: boolean;
}) => {
  return (
    <div className="space-y-2">
      <div className="flex items-center justify-center h-8">
        {isCurrentStep ? (
          <CheckIcon className="w-4 h-4 text-green-500" />
        ) : (
          <div className="w-2 h-2 rounded-full bg-gray-500" />
        )}
      </div>
      <div className={cn(
        "text-sm text-center",
        isCurrentStep ? "text-white" : "text-muted-foreground"
      )}>
        {LABELS[step]}
      </div>
    </div>
  )
}

const LABELS: Record<Step, string> = {
  'ask-panda': 'Ask Panda',
  'review-and-confirm': 'Review and confirm',
  'trade-completed': 'Trade Completed',
} as const;