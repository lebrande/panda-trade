import { outputTokensSchema } from '@/odos/useOdos';
import z from 'zod';

export const TAGS = [
  'Stablecoin',
  'Meme',
  'DeFi',
  'RWA',
  'Blue Chip',
  'Gaming',
  'AI',
  'Low Cap',
  'High Liquidity',
] as const;

export const tagsItemSchema = z.enum(TAGS);
export type Tag = z.infer<typeof tagsItemSchema>;
export const tagsSchema = z.array(tagsItemSchema);

export const riskLevelSchema = z.coerce.number().min(0).max(100);

export const pandaPromptArgsSchema = z.object({
  riskLevel: riskLevelSchema,
  tags: tagsSchema,
});

export type PandaPromptArgs = z.infer<typeof pandaPromptArgsSchema>;

export const pandaAnswerResponseSchema = z.object({
  answer: z.object({
    tokens: outputTokensSchema,
  }),
});

export type PandaAnswerResponse = z.infer<typeof pandaAnswerResponseSchema>;