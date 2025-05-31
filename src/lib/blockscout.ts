import { base } from "viem/chains";

export const baseWithBlockscout = {
  ...base,
  blockExplorers: {
    default: { 
      name: 'Blockscout', 
      url: 'https://base.blockscout.com/',
      apiUrl: 'https://api.basescan.org/api',
    },
  },
}