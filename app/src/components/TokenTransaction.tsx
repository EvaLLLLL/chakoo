import {
  useAccount,
  useToken,
  useWaitForTransactionReceipt,
  useWriteContract
} from 'wagmi'
import { CONTRACT_ADDRESSES } from '@/config/address'
import { useReadTokenBalanceOf } from '@/hooks/contracts/token'
import { Address, formatEther, Hash, isHash } from 'viem'
import { faucetAbi, useReadFaucetGetBalance } from '@/hooks/contracts/faucet'
import { useEffect, useState } from 'react'
import { Button, Card, Status } from '@repo/ui'

export const TokenTransaction: React.FC = () => {
  const { address } = useAccount()
  const { data: tokenInfo } = useToken({
    address: CONTRACT_ADDRESSES.TOKEN
  })
  const { data: balance, refetch: refetchBalance } = useReadTokenBalanceOf({
    address: CONTRACT_ADDRESSES.TOKEN,
    args: [address as Address],
    query: { select: (v) => formatEther(v) }
  })

  const { data: tokenBalance, refetch: refetchTokenBalance } =
    useReadFaucetGetBalance({
      address: CONTRACT_ADDRESSES.FAUCET,
      query: { select: (v) => formatEther(v) }
    })

  const [isProcessing, setIsProcessing] = useState(false)
  const [txId, setTxId] = useState<Hash>()
  const { writeContractAsync } = useWriteContract()

  const { data: requestTokensTxnStatus, isFetching: isWaitingTxn } =
    useWaitForTransactionReceipt({
      hash: txId as Hash,
      query: { enabled: isHash(txId as Hash), select: (v) => v.status }
    })

  useEffect(() => {
    if (txId && requestTokensTxnStatus === 'success') {
      refetchBalance()
      refetchTokenBalance()
      setTxId(undefined)
    }
  }, [refetchBalance, refetchTokenBalance, requestTokensTxnStatus, txId])

  const requestTokens = async () => {
    if (address && !isProcessing) {
      try {
        setIsProcessing(true)
        const txId = await writeContractAsync({
          abi: faucetAbi,
          address: CONTRACT_ADDRESSES.FAUCET,
          functionName: 'requestTokens'
        })
        setTxId(txId)
      } catch (e) {
        console.error(e)
      } finally {
        setIsProcessing(false)
      }
    }
  }

  return (
    <Card title="Token Transaction">
      <div className="flex flex-col gap-y-2 items-start">
        <div className="flex items-center gap-x-2">
          <span>
            {tokenInfo?.symbol} faucet balance: {tokenBalance};
          </span>
          <span>
            my {tokenInfo?.symbol} balance: {balance};
          </span>
          {!!txId && <span>txId: {txId}</span>}
        </div>
        <div className="flex items-center gap-x-10">
          <Button
            className="flex items-center gap-x-2"
            disabled={isProcessing || isWaitingTxn}
            onClick={requestTokens}>
            {(isProcessing || isWaitingTxn) && <Status status="connecting" />}
            <span>Request 50 {tokenInfo?.symbol}</span>
          </Button>
        </div>
      </div>
    </Card>
  )
}
