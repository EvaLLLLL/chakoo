import {
  useAccount,
  useEnsName,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain
} from 'wagmi'
import { injected } from 'wagmi/connectors'
import { Card } from '@repo/ui'

function App() {
  const chainId = useChainId()
  const { chains, switchChain } = useSwitchChain()
  const { connect } = useConnect()
  const { disconnect } = useDisconnect()
  const { address, isConnecting, isConnected } = useAccount()
  const { data: ensName } = useEnsName({ address })

  return (
    <div className="flex items-center justify-center flex-col">
      <Card />
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
        <button onClick={() => connect({ connector: injected() })}>
          connect
        </button>
      )}
      {!isConnecting && isConnected && (
        <button onClick={() => disconnect()}>disconnect</button>
      )}
      <div>
        {chains.map((chain) => (
          <div key={chain.id}>
            <span>{chain.id}</span>
            <span>{chain.name}</span>
            <button onClick={() => switchChain({ chainId: chain.id })}>
              switch to {chain.name}
            </button>
          </div>
        ))}
      </div>
    </div>
  )
}

export default App
