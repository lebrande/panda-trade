import { base, mainnet } from "viem/chains";

const PANDA_CHAINS = [mainnet, base] as const;

export type PandaChain = (typeof PANDA_CHAINS)[number];

export const CHAIN_IDS_PANDA = [
  mainnet.id,
  base.id,
] as const;

export type ChainIdPanda = (typeof CHAIN_IDS_PANDA)[number];

export type Step = 'ask-panda' | 'review-and-confirm' | 'trade-completed';