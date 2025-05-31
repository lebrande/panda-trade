import { ChainIdPanda } from '@/lib/types';
import { Address } from 'viem';
import { base, mainnet } from 'viem/chains';

export const ODOS_SMART_ORDER_ROUTING_CONTRACTS_ADDRESS = {
  [mainnet.id]: '0xCf5540fFFCdC3d510B18bFcA6d2b9987b0772559',
  [base.id]: '0x19cEeAd7105607Cd444F5ad10dd51356436095a1',
} satisfies Record<ChainIdPanda, Address>;
