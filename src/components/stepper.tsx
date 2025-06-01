import { Step } from "@/lib/types";
import { cn } from "@/lib/utils";

interface Props {
  currentStep: Step;
}

export const Stepper = ({ currentStep }: Props) => {
  return (
    <div className="grid grid-cols-3 gap-1">
      <StepperItem
        step="1-ask-panda"
        isCurrentStep={currentStep === '1-ask-panda'}
      />
      <StepperItem
        step="2-review-and-confirm"
        isCurrentStep={currentStep === '2-review-and-confirm'}
      />
      <StepperItem
        step="3-trade-completed"
        isCurrentStep={currentStep === '3-trade-completed'}
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
        <div className={cn(
          'w-2 h-2 rounded-full',
          isCurrentStep ? 'bg-green-500' : 'bg-gray-500'
        )} />
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
  '1-ask-panda': 'Ask Panda',
  '2-review-and-confirm': 'Review and confirm',
  '3-trade-completed': 'Trade Completed',
} as const;