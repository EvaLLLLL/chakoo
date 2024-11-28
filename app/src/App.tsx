import {
  useAccount,
  useEnsName,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain
} from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Button } from '@repo/ui'
import { cn } from '@repo/lib'

function App() {
  const chainId = useChainId()
  const { chains, switchChain } = useSwitchChain()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnecting, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })

  return (
    <div
      className={cn('flex items-center justify-center flex-col', {
        border: true
      })}>
      {isConnecting ? (
        'connecting'
      ) : (
        <div className="text-primary">
          <div>chainId: {chainId}</div>
          <div>status: {isConnected ? 'connected' : 'not connected'}</div>
          <div>address: {address || '-'}</div>
          <div>ensName: {ensName || '-'}</div>
        </div>
      )}
      {!isConnecting && !isConnected && (
        <Button onClick={() => connect({ connector: injected() })}>
          connect
        </Button>
      )}
      {!isConnecting && isConnected && (
        <Button onClick={() => disconnect()}>disconnect</Button>
      )}
      <div>
        {chains.map((chain) => (
          <div key={chain.id}>
            <span>{chain.id}</span>
            <span>{chain.name}</span>
            <Button
              className="disabled:text-gray-500"
              disabled={chainId === chain.id}
              onClick={() => switchChain({ chainId: chain.id })}>
              switch to {chain.name}
            </Button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
