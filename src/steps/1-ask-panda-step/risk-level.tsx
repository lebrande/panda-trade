import { FormDescription, FormMessage } from "@/components/ui/form";
import { FormControl, FormItem, FormLabel } from "@/components/ui/form";
import { FormField } from "@/components/ui/form";
import { useFormContext } from "react-hook-form";
import { z } from "zod";
import { tradeParamsFormSchema } from "@/steps/1-ask-panda-step/types";
import { Slider } from "@/components/ui/slider";
import { SectionTitle } from "@/components/section-title";

export const RiskLevel = () => {
  const form = useFormContext<z.infer<typeof tradeParamsFormSchema>>();

  const riskLevel = form.watch('riskLevel');

  return (
    <div className="mb-8">
      <SectionTitle number={2}>
        What is your risk appetite?
      </SectionTitle>

      <div className="p-6 rounded-xl bg-[#333d49]">
        <div className="flex justify-between mb-4 text-sm">
          <span className="text-white">Very Low</span>
          <span className="text-white">Low</span>
          <span className="text-white">Medium</span>
          <span className="text-white">High</span>
          <span className="text-white">Very High</span>
        </div>

        <FormField
          control={form.control}
          name='riskLevel'
          render={({ field }) => (
            <FormItem>
              <FormLabel className="sr-only">Risk Level</FormLabel>
              <FormControl>
                <Slider
                  max={100}
                  step={1}
                  onValueChange={(value) => field.onChange(value[0])}
                  value={[riskLevel]}
                  trackClassName="bg-gradient-to-r from-[#00a76f] via-[#ffcc33] to-[#fe0000]"
                />
              </FormControl>
              <FormDescription className="sr-only">
                This is your risk level.
              </FormDescription>
              <FormMessage />
            </FormItem>
          )}
        />
      </div>
    </div>
  )
}