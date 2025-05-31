import { ChainIdPanda } from "@/lib/types";
import { Address } from "viem";
import { base, mainnet } from "viem/chains";

export const USDC_ADDRESS = {
  [mainnet.id]: '0xA0b86991c6218b36c1d19D4a2e9Eb0cE3606eB48',
  [base.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
} satisfies Record<ChainIdPanda, Address>;

export const USDT_ADDRESS = {
  [mainnet.id]: '0xdAC17F958D2ee523a2206206994597C13D831ec7',
  [base.id]: '0xfde4C96c8593536E31F229EA8f37b2ADa2699bb2',
} satisfies Record<ChainIdPanda, Address>;

export const BTC_ADDRESS = {
  [mainnet.id]: '0x2260FAC5E5542a773Aa44fBCfeDf7C193bc2C599', // wBTC
  [base.id]: '0xcbb7c0000ab88b473b1f5afd9ef808440eed33bf', // cbBTC
} satisfies Record<ChainIdPanda, Address | undefined>;

export const ETH_ADDRESS = {
  [mainnet.id]: '0xC02aaA39b223FE8D0A0e5C4F27eAD9083C756Cc2', // WETH
  [base.id]: '0x4200000000000000000000000000000000000006', // WETH
} satisfies Record<ChainIdPanda, Address | undefined>;