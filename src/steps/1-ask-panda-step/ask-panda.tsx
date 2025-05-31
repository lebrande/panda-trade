"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { PandaTop } from "@/components/panda-top";
import { RiskLevel } from "@/steps/1-ask-panda-step/risk-level";
import { InputTokenAmount } from "@/steps/1-ask-panda-step/input-token-amount";
import { SwapHeader } from "@/steps/1-ask-panda-step/swap-header";
import { TradeParamsFormData, tradeParamsFormSchema } from "@/steps/1-ask-panda-step/types"
import { TagsPicker } from "@/steps/1-ask-panda-step/tags-picker"

interface Props {
  onComplete: (data: TradeParamsFormData) => void;
}

export function AskPanda({ onComplete }: Props) {
  const form = useForm<z.infer<typeof tradeParamsFormSchema>>({
    resolver: zodResolver(tradeParamsFormSchema),
    defaultValues: {
      inputTokenAmount: '100',
      riskLevel: 30,
      tags: [],
    },
  })

  function onSubmit(values: z.infer<typeof tradeParamsFormSchema>) {
    onComplete(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)}>
        <PandaTop />

        <div className="mb-8">
          <SwapHeader />
          <InputTokenAmount />
          <RiskLevel />
          <TagsPicker />

          <div className="flex justify-end">
            <button
              className="px-8 py-4 text-lg font-bold text-foreground rounded-xl bg-primary"
              type="submit"
            >
              Next
            </button>
          </div>
        </div>
      </form>
    </Form>
  )
}