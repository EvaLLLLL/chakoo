import { useState } from 'react'
import { CONTRACT_ADDRESSES } from '@/config/address'
import { storageAbi, useReadStorageFetchAll } from '@/hooks/contracts/storage'
import { useAccount, useConfig, useWriteContract } from 'wagmi'
import { Button, Card, Status } from '@repo/ui'
import { waitForTransactionReceipt } from 'wagmi/actions'

export const StorageCURD: React.FC = () => {
  const { address } = useAccount()
  const config = useConfig()
  const { writeContractAsync } = useWriteContract()

  const [value, setValue] = useState('')
  const [isProcessing, setIsProcessing] = useState(false)

  const { data: items, refetch: refetchItems } = useReadStorageFetchAll({
    account: address,
    address: CONTRACT_ADDRESSES.STORAGE,
    query: {
      enabled: !!address,
      select: (v) =>
        Array.from({ length: v[0].length })
          .map((_, i) => ({
            id: Number(v[0][i]),
            value: v[1][i]
          }))
          .filter((v) => !!v.id && !!v.value)
    }
  })

  const insertItem = async (v: string) => {
    setIsProcessing(true)
    try {
      const txId = await writeContractAsync({
        abi: storageAbi,
        address: CONTRACT_ADDRESSES.STORAGE,
        functionName: 'create',
        args: [v]
      })

      await waitForTransactionReceipt(config, {
        hash: txId
      })

      refetchItems()
    } catch (e) {
      console.error(e)
    } finally {
      setIsProcessing(false)
    }
  }

  const updateItem = async (item: { id: number; value: string }, v: string) => {
    setIsProcessing(true)
    try {
      const txId = await writeContractAsync({
        abi: storageAbi,
        address: CONTRACT_ADDRESSES.STORAGE,
        functionName: 'update',
        args: [BigInt(item.id), v]
      })

      await waitForTransactionReceipt(config, {
        hash: txId
      })

      refetchItems()
    } catch (e) {
      console.error(e)
    } finally {
      setIsProcessing(false)
    }
  }

  const removeItem = async (id: number) => {
    setIsProcessing(true)
    try {
      const txId = await writeContractAsync({
        abi: storageAbi,
        address: CONTRACT_ADDRESSES.STORAGE,
        functionName: 'remove',
        args: [BigInt(id)]
      })

      await waitForTransactionReceipt(config, {
        hash: txId
      })

      refetchItems()
    } catch (e) {
      console.error(e)
    } finally {
      setIsProcessing(false)
    }
  }

  return (
    <Card title="Contract CURD" className="col-span-2">
      <div className="flex flex-col gap-y-4">
        <div className="flex items-center gap-x-2">
          <input
            className="border-2 px-4 py-2 rounded-xl"
            value={value}
            onChange={(e) => setValue(e.target.value.trim())}
          />
          <Button
            className="flex items-center gap-x-2"
            disabled={!value || isProcessing}
            onClick={() => insertItem(value)}>
            {isProcessing && <Status status="connecting" />}
            create
          </Button>
        </div>
        <div className="grid grid-cols-2 gap-4">
          {items?.map((item) => (
            <Item
              key={item.id}
              item={item}
              isProcessing={isProcessing}
              onUpdate={updateItem}
              onRemove={removeItem}
            />
          ))}
        </div>
      </div>
    </Card>
  )
}

const Item: React.FC<{
  isProcessing: boolean
  item: { id: number; value: string }
  onRemove: (id: number) => void
  onUpdate: (item: { id: number; value: string }, v: string) => void
}> = ({ item, onUpdate, onRemove, isProcessing }) => {
  const [value, setValue] = useState(item.value)

  return (
    <div className="px-4 py-2 bg-gray-300 rounded-xl flex items-center gap-x-2">
      <input
        className="border-2 px-4 py-2 rounded-xl"
        value={value}
        onChange={(e) => setValue(e.target.value.trim())}
      />
      <Button
        className="flex items-center gap-x-2"
        disabled={isProcessing || !value || item.value === value}
        onClick={() => onUpdate(item, value)}>
        {isProcessing && <Status status="connecting" />}
        update
      </Button>
      <Button
        className="flex items-center gap-x-2"
        disabled={isProcessing}
        onClick={() => onRemove(item.id)}>
        {isProcessing && <Status status="connecting" />}
        remove
      </Button>
    </div>
  )
}
