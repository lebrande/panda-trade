import { baseWithBlockscout } from "@/lib/blockscout";
import { ChainIdPanda } from "@/lib/types";
import { Address } from "viem";

export const USDC_ADDRESS = {
  [baseWithBlockscout.id]: '0x833589fCD6eDb6E08f4c7C32D4f71b54bdA02913',
} satisfies Record<ChainIdPanda, Address>;