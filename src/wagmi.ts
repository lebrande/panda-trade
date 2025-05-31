import { baseWithBlockscout } from '@/lib/blockscout';
import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { injected } from 'wagmi/connectors';

export function getConfig() {
  return createConfig({
    chains: [baseWithBlockscout],
    connectors: [
      injected(),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [baseWithBlockscout.id]: http(`https://base-mainnet.g.alchemy.com/v2/${process.env.NEXT_PUBLIC_ALCHEMY_API_KEY}`),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
