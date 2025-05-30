import { http, cookieStorage, createConfig, createStorage } from 'wagmi'
import { base, mainnet } from 'wagmi/chains'
import { injected } from 'wagmi/connectors';

export function getConfig() {
  return createConfig({
    chains: [mainnet, base],
    connectors: [
      injected(),
    ],
    storage: createStorage({
      storage: cookieStorage,
    }),
    ssr: true,
    transports: {
      [mainnet.id]: http(),
      [base.id]: http(),
    },
  })
}

declare module 'wagmi' {
  interface Register {
    config: ReturnType<typeof getConfig>
  }
}
