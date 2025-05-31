import { numberStringSchema } from "@/lib/schema";
import { riskLevelSchema } from "@/open-ai/types";
import { tagsSchema } from "@/open-ai/types";
import z from "zod";

export const tradeParamsFormSchema = z.object({
  inputTokenAmount: numberStringSchema,
  riskLevel: riskLevelSchema,
  tags: tagsSchema,
})

export type TradeParamsFormData = z.infer<typeof tradeParamsFormSchema>;