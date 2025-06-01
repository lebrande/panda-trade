import { SectionTitle } from "@/components/section-title"
import { Checkbox } from "@/components/ui/checkbox";
import { TAGS } from "@/open-ai/types";

export const TagsPicker = () => {
  return (
    <div>
      <SectionTitle number={3}>
        What are your areas of interest?
      </SectionTitle>

      <div className="mt-2 flex flex-col items-start gap-4">
        {TAGS.map((tag) => (
          <div key={tag} className="flex items-center gap-4">
            <Checkbox defaultChecked={false} id={`${tag}-tag`} />
            <label
              htmlFor={`${tag}-tag`}
              className="flex items-center gap-2 text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              {tag}
            </label>
          </div>
        ))}
      </div>
    </div>
  )
}

