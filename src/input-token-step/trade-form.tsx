"use client"
 
import { riskLevelSchema, tagsSchema } from "@/open-ai/types"
import { useForm } from "react-hook-form"
import { z } from "zod"
import { zodResolver } from "@hookform/resolvers/zod"
import { Form } from "@/components/ui/form"
import { PropsWithChildren } from "react"
 

export const tradeFormSchema = z.object({
  riskLevel: riskLevelSchema,
  tags: tagsSchema,
})

export function TradeForm(props: PropsWithChildren) {
  // 1. Define your form.
  const form = useForm<z.infer<typeof tradeFormSchema>>({
    resolver: zodResolver(tradeFormSchema),
    defaultValues: {
      riskLevel: 30,
      tags: [],
    },
  })
 
  // 2. Define a submit handler.
  function onSubmit(values: z.infer<typeof tradeFormSchema>) {
    // Do something with the form values.
    // ✅ This will be type-safe and validated.
    console.log(values)
  }

  return (
    <Form {...form}>
      <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-8">
        {props.children}
      </form>
    </Form>
  )
}