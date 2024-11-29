import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// LockContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const lockContractAbi = [
  {
    type: 'constructor',
    inputs: [{ name: '_unlockTime', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'payable',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'amount',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
      {
        name: 'when',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Withdrawal',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address payable', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'unlockTime',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'withdraw',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockContractAbi}__
 */
export const useReadLockContract = /*#__PURE__*/ createUseReadContract({
  abi: lockContractAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockContractAbi}__ and `functionName` set to `"owner"`
 */
export const useReadLockContractOwner = /*#__PURE__*/ createUseReadContract({
  abi: lockContractAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link lockContractAbi}__ and `functionName` set to `"unlockTime"`
 */
export const useReadLockContractUnlockTime =
  /*#__PURE__*/ createUseReadContract({
    abi: lockContractAbi,
    functionName: 'unlockTime',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lockContractAbi}__
 */
export const useWriteLockContract = /*#__PURE__*/ createUseWriteContract({
  abi: lockContractAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link lockContractAbi}__ and `functionName` set to `"withdraw"`
 */
export const useWriteLockContractWithdraw =
  /*#__PURE__*/ createUseWriteContract({
    abi: lockContractAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lockContractAbi}__
 */
export const useSimulateLockContract = /*#__PURE__*/ createUseSimulateContract({
  abi: lockContractAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link lockContractAbi}__ and `functionName` set to `"withdraw"`
 */
export const useSimulateLockContractWithdraw =
  /*#__PURE__*/ createUseSimulateContract({
    abi: lockContractAbi,
    functionName: 'withdraw',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lockContractAbi}__
 */
export const useWatchLockContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: lockContractAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link lockContractAbi}__ and `eventName` set to `"Withdrawal"`
 */
export const useWatchLockContractWithdrawalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: lockContractAbi,
    eventName: 'Withdrawal',
  })
