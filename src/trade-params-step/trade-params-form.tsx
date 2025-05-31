"use client"

import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { PandaTop } from "@/components/panda-top";
import { RiskLevel } from "@/trade-params-step/risk-level";
import { InputTokenAmount } from "@/trade-params-step/input-token-amount";
import { SwapHeader } from "@/trade-params-step/swap-header";
import { TradeParamsFormData, tradeParamsFormSchema } from "@/trade-params-step/types"

interface Props {
  onComplete: (data: TradeParamsFormData) => void;
}

export function TradeParamsForm({ onComplete }: Props) {
  const form = useForm<z.infer<typeof tradeParamsFormSchema>>({
    resolver: zodResolver(tradeParamsFormSchema),
    defaultValues: {
      inputTokenAmount: '',
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

          <div className="flex justify-end">
            <button
              className="px-8 py-4 text-lg font-bold text-white rounded-xl bg-[#00a76f]"
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