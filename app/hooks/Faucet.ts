import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// FaucetContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const faucetContractAbi = [
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
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetContractAbi}__
 */
export const useReadFaucetContract = /*#__PURE__*/ createUseReadContract({
  abi: faucetContractAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"getBalance"`
 */
export const useReadFaucetContractGetBalance =
  /*#__PURE__*/ createUseReadContract({
    abi: faucetContractAbi,
    functionName: 'getBalance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"lockTime"`
 */
export const useReadFaucetContractLockTime =
  /*#__PURE__*/ createUseReadContract({
    abi: faucetContractAbi,
    functionName: 'lockTime',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"paused"`
 */
export const useReadFaucetContractPaused = /*#__PURE__*/ createUseReadContract({
  abi: faucetContractAbi,
  functionName: 'paused',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"token"`
 */
export const useReadFaucetContractToken = /*#__PURE__*/ createUseReadContract({
  abi: faucetContractAbi,
  functionName: 'token',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"withdrawAmount"`
 */
export const useReadFaucetContractWithdrawAmount =
  /*#__PURE__*/ createUseReadContract({
    abi: faucetContractAbi,
    functionName: 'withdrawAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetContractAbi}__
 */
export const useWriteFaucetContract = /*#__PURE__*/ createUseWriteContract({
  abi: faucetContractAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"changeOwner"`
 */
export const useWriteFaucetContractChangeOwner =
  /*#__PURE__*/ createUseWriteContract({
    abi: faucetContractAbi,
    functionName: 'changeOwner',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"pause"`
 */
export const useWriteFaucetContractPause = /*#__PURE__*/ createUseWriteContract(
  { abi: faucetContractAbi, functionName: 'pause' },
)

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"recoverERC20"`
 */
export const useWriteFaucetContractRecoverErc20 =
  /*#__PURE__*/ createUseWriteContract({
    abi: faucetContractAbi,
    functionName: 'recoverERC20',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"requestTokens"`
 */
export const useWriteFaucetContractRequestTokens =
  /*#__PURE__*/ createUseWriteContract({
    abi: faucetContractAbi,
    functionName: 'requestTokens',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"setLockTime"`
 */
export const useWriteFaucetContractSetLockTime =
  /*#__PURE__*/ createUseWriteContract({
    abi: faucetContractAbi,
    functionName: 'setLockTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"setWithdrawalAmount"`
 */
export const useWriteFaucetContractSetWithdrawalAmount =
  /*#__PURE__*/ createUseWriteContract({
    abi: faucetContractAbi,
    functionName: 'setWithdrawalAmount',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"unpause"`
 */
export const useWriteFaucetContractUnpause =
  /*#__PURE__*/ createUseWriteContract({
    abi: faucetContractAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"withdrawETH"`
 */
export const useWriteFaucetContractWithdrawEth =
  /*#__PURE__*/ createUseWriteContract({
    abi: faucetContractAbi,
    functionName: 'withdrawETH',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"withdrawal"`
 */
export const useWriteFaucetContractWithdrawal =
  /*#__PURE__*/ createUseWriteContract({
    abi: faucetContractAbi,
    functionName: 'withdrawal',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetContractAbi}__
 */
export const useSimulateFaucetContract =
  /*#__PURE__*/ createUseSimulateContract({ abi: faucetContractAbi })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"changeOwner"`
 */
export const useSimulateFaucetContractChangeOwner =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetContractAbi,
    functionName: 'changeOwner',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"pause"`
 */
export const useSimulateFaucetContractPause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetContractAbi,
    functionName: 'pause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"recoverERC20"`
 */
export const useSimulateFaucetContractRecoverErc20 =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetContractAbi,
    functionName: 'recoverERC20',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"requestTokens"`
 */
export const useSimulateFaucetContractRequestTokens =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetContractAbi,
    functionName: 'requestTokens',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"setLockTime"`
 */
export const useSimulateFaucetContractSetLockTime =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetContractAbi,
    functionName: 'setLockTime',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"setWithdrawalAmount"`
 */
export const useSimulateFaucetContractSetWithdrawalAmount =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetContractAbi,
    functionName: 'setWithdrawalAmount',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"unpause"`
 */
export const useSimulateFaucetContractUnpause =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetContractAbi,
    functionName: 'unpause',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"withdrawETH"`
 */
export const useSimulateFaucetContractWithdrawEth =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetContractAbi,
    functionName: 'withdrawETH',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link faucetContractAbi}__ and `functionName` set to `"withdrawal"`
 */
export const useSimulateFaucetContractWithdrawal =
  /*#__PURE__*/ createUseSimulateContract({
    abi: faucetContractAbi,
    functionName: 'withdrawal',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetContractAbi}__
 */
export const useWatchFaucetContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: faucetContractAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetContractAbi}__ and `eventName` set to `"Deposit"`
 */
export const useWatchFaucetContractDepositEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetContractAbi,
    eventName: 'Deposit',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetContractAbi}__ and `eventName` set to `"ETHWithdrawal"`
 */
export const useWatchFaucetContractEthWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetContractAbi,
    eventName: 'ETHWithdrawal',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetContractAbi}__ and `eventName` set to `"OwnerChanged"`
 */
export const useWatchFaucetContractOwnerChangedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetContractAbi,
    eventName: 'OwnerChanged',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetContractAbi}__ and `eventName` set to `"Paused"`
 */
export const useWatchFaucetContractPausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetContractAbi,
    eventName: 'Paused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetContractAbi}__ and `eventName` set to `"Unpaused"`
 */
export const useWatchFaucetContractUnpausedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetContractAbi,
    eventName: 'Unpaused',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link faucetContractAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchFaucetContractWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: faucetContractAbi,
    eventName: 'Withdrawal',
  })
