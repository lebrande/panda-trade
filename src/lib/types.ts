import { baseWithBlockscout } from "@/lib/blockscout";

const PANDA_CHAINS = [baseWithBlockscout] as const;

export type PandaChain = (typeof PANDA_CHAINS)[number];

export const CHAIN_IDS_PANDA = [
  baseWithBlockscout.id,
] as const;

export type ChainIdPanda = (typeof CHAIN_IDS_PANDA)[number];

export type Step = '1-ask-panda' | '2-review-and-confirm' | '3-trade-completed';