'use client'

import InputTokenStep from '@/input-token-step/input-token-step';
import { ConnectButton } from '@rainbow-me/rainbowkit'
import { useAccount, useDisconnect } from 'wagmi'

function App() {
  const account = useAccount()
  const { disconnect } = useDisconnect();

  return (
    <>
      <h1 className="text-3xl font-bold underline">
        Panda Trade
      </h1>
      <div>
        <h2>Account</h2>

        <div>
          status: {account.status}
          <br />
          addresses: {JSON.stringify(account.addresses)}
          <br />
          chainId: {account.chainId}
        </div>

        {account.status === 'connected' && (
          <button type="button" onClick={() => disconnect()}>
            Disconnect
          </button>
        )}
      </div>

      <ConnectButton />

      <InputTokenStep />
    </>
  )
}

export default App
