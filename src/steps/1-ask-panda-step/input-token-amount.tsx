import { FormControl, FormItem, FormMessage, FormLabel, FormField } from "@/components/ui/form";
import { Input } from "@/components/ui/input"
import { tradeParamsFormSchema } from "@/steps/1-ask-panda-step/types";
import { numberStringSchema } from "@/lib/schema";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { SectionTitle } from "@/components/section-title";

export const InputTokenAmount = () => {
  const form = useFormContext<z.infer<typeof tradeParamsFormSchema>>();

  return (
    <div className="mb-6">
      <SectionTitle number={1}>
        How much you want to swap?
      </SectionTitle>

      <div className="p-4 rounded-xl bg-[#333d49]">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className="flex items-center justify-center p-1 bg-white rounded-full">
              <div className="flex items-center justify-center w-8 h-8 bg-[#2775ca] rounded-full">
                <span className="text-white font-bold">$</span>
              </div>
            </div>
            <span className="text-xl font-bold text-white">USDC</span>
          </div>
          <div className="text-right">
            <div className="text-sm text-[#7c8d9c]">USDC</div>

            <FormField
              control={form.control}
              name="inputTokenAmount"
              render={({ field }) => (
                <FormItem>
                  <FormLabel className="sr-only">Input Token Amount</FormLabel>
                  <FormControl>
                    <Input
                      type="text"
                      className="text-2xl font-bold text-white text-right"
                      onChange={(e) => {
                        const value = numberStringSchema.safeParse(e.target.value);
                        if (value.success) {
                          field.onChange(value.data);
                        }
                      }}
                      value={field.value}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <div className="text-sm text-[#7c8d9c]">~$2 605.13 (-0.08%)</div>
          </div>
        </div>
      </div>
    </div >
  )
}