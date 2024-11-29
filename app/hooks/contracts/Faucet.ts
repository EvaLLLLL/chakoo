import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Faucet
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const faucetAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
    ],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'from', internalType: 'address', type: 'address', indexed: true },
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Deposit',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'ETHWithdrawal',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'oldOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'newOwner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'OwnerChanged',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Paused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'account',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
    ],
    name: 'Unpaused',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      { name: 'to', internalType: 'address', type: 'address', indexed: true },
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: true,
      },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'function',
    inputs: [
      { name: 'newOwner', internalType: 'address payable', type: 'address' },
    ],
    name: 'changeOwner',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'getBalance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'lockTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'pause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'paused',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'tokenAddress', internalType: 'address', type: 'address' },
      { name: 'tokenAmount', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'recoverERC20',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'requestTokens',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_timeInMinutes', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'setLockTime',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: '_amount', internalType: 'uint256', type: 'uint256' }],
    name: 'setWithdrawalAmount',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'token',
    outputs: [{ name: '', internalType: 'contract IERC20', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unpause',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawAmount',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawETH',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdrawal',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  { type: 'receive', stateMutability: 'payable' },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetAbi}__
 */
export const useReadFaucet = /*#__PURE__*/ createUseReadContract({
  abi: faucetAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"getBalance"`
 */
export const useReadFaucetGetBalance = /*#__PURE__*/ createUseReadContract({
  abi: faucetAbi,
  functionName: 'getBalance',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"lockTime"`
 */
export const useReadFaucetLockTime = /*#__PURE__*/ createUseReadContract({
  abi: faucetAbi,
  functionName: 'lockTime',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"paused"`
 */
export const useReadFaucetPaused = /*#__PURE__*/ createUseReadContract({
  abi: faucetAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"token"`
 */
export const useReadFaucetToken = /*#__PURE__*/ createUseReadContract({
  abi: faucetAbi,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"withdrawAmount"`
 */
export const useReadFaucetWithdrawAmount = /*#__PURE__*/ createUseReadContract({
  abi: faucetAbi,
  functionName: 'withdrawAmount',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetAbi}__
 */
export const useWriteFaucet = /*#__PURE__*/ createUseWriteContract({
  abi: faucetAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"changeOwner"`
 */
export const useWriteFaucetChangeOwner = /*#__PURE__*/ createUseWriteContract({
  abi: faucetAbi,
  functionName: 'changeOwner',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteFaucetPause = /*#__PURE__*/ createUseWriteContract({
  abi: faucetAbi,
  functionName: 'pause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"recoverERC20"`
 */
export const useWriteFaucetRecoverErc20 = /*#__PURE__*/ createUseWriteContract({
  abi: faucetAbi,
  functionName: 'recoverERC20',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"requestTokens"`
 */
export const useWriteFaucetRequestTokens = /*#__PURE__*/ createUseWriteContract(
  { abi: faucetAbi, functionName: 'requestTokens' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"setLockTime"`
 */
export const useWriteFaucetSetLockTime = /*#__PURE__*/ createUseWriteContract({
  abi: faucetAbi,
  functionName: 'setLockTime',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"setWithdrawalAmount"`
 */
export const useWriteFaucetSetWithdrawalAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: faucetAbi,
    functionName: 'setWithdrawalAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteFaucetUnpause = /*#__PURE__*/ createUseWriteContract({
  abi: faucetAbi,
  functionName: 'unpause',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"withdrawETH"`
 */
export const useWriteFaucetWithdrawEth = /*#__PURE__*/ createUseWriteContract({
  abi: faucetAbi,
  functionName: 'withdrawETH',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"withdrawal"`
 */
export const useWriteFaucetWithdrawal = /*#__PURE__*/ createUseWriteContract({
  abi: faucetAbi,
  functionName: 'withdrawal',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetAbi}__
 */
export const useSimulateFaucet = /*#__PURE__*/ createUseSimulateContract({
  abi: faucetAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"changeOwner"`
 */
export const useSimulateFaucetChangeOwner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetAbi,
    functionName: 'changeOwner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateFaucetPause = /*#__PURE__*/ createUseSimulateContract({
  abi: faucetAbi,
  functionName: 'pause',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"recoverERC20"`
 */
export const useSimulateFaucetRecoverErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetAbi,
    functionName: 'recoverERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"requestTokens"`
 */
export const useSimulateFaucetRequestTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetAbi,
    functionName: 'requestTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"setLockTime"`
 */
export const useSimulateFaucetSetLockTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetAbi,
    functionName: 'setLockTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"setWithdrawalAmount"`
 */
export const useSimulateFaucetSetWithdrawalAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetAbi,
    functionName: 'setWithdrawalAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateFaucetUnpause = /*#__PURE__*/ createUseSimulateContract(
  { abi: faucetAbi, functionName: 'unpause' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"withdrawETH"`
 */
export const useSimulateFaucetWithdrawEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetAbi,
    functionName: 'withdrawETH',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetAbi}__ and `functionName` set to `"withdrawal"`
 */
export const useSimulateFaucetWithdrawal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetAbi,
    functionName: 'withdrawal',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetAbi}__
 */
export const useWatchFaucetEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: faucetAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchFaucetDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetAbi}__ and `eventName` set to `"ETHWithdrawal"`
 */
export const useWatchFaucetEthWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetAbi,
    eventName: 'ETHWithdrawal',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetAbi}__ and `eventName` set to `"OwnerChanged"`
 */
export const useWatchFaucetOwnerChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetAbi,
    eventName: 'OwnerChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchFaucetPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchFaucetUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchFaucetWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetAbi,
    eventName: 'Withdrawal',
  })
