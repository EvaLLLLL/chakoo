import { StorageCURD } from '@/components/StorageCURD'
import { TokenTransaction } from '@/components/TokenTransaction'
import { WalletConnection } from '@/components/WalletConnection'

function App() {
  return (
    <div className="gap-y-8 p-12 grid grid-cols-2 gap-8">
      <WalletConnection />
      <TokenTransaction />
      <StorageCURD />
    </div>
  )
}

export default App
