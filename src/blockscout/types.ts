import { addressSchema } from '@/lib/schema';
import z from 'zod';

export const blockscoutTokenSchema = z.object({
  address: addressSchema,
  circulating_market_cap: z.string(),
  exchange_rate: z.string(),
  holders_count: z.string(),
  name: z.string(),
  symbol: z.string(),
  total_supply: z.string(),
  volume_24h: z.string(),
});

export type BlockscoutToken = z.infer<typeof blockscoutTokenSchema>;

export const blockscoutTokensResponseSchema = z.object({
  items: z.array(blockscoutTokenSchema),
});

export type BlockscoutTokensResponse = z.infer<typeof blockscoutTokensResponseSchema>;
