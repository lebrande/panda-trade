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


export const blockscoutTransactionInfoSchema = z.object({
  status: z.string(),
  gas_used: z.string(),
  to: z.object({
    is_verified: z.boolean(),
    name: z.string(),
  }),
  method: z.string(),
  fee: z.object({
    type: z.string(),
    value: z.string(),
  }),
  gas_limit: z.string(),
  gas_price: z.string(),
  decoded_input: z.object({
    method_call: z.string(),
  }),
  timestamp: z.string(),
  exchange_rate: z.string(),
  block_number: z.number(),
});

export type BlockscoutTransactionInfo = z.infer<typeof blockscoutTransactionInfoSchema>;