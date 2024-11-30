import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// Storage
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const storageAbi = [
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'ItemCreated',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
    ],
    name: 'ItemDeleted',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'owner',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      { name: 'id', internalType: 'uint256', type: 'uint256', indexed: true },
      { name: 'value', internalType: 'string', type: 'string', indexed: false },
    ],
    name: 'ItemUpdated',
  },
  {
    type: 'function',
    inputs: [{ name: '_value', internalType: 'string', type: 'string' }],
    name: 'create',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'fetchAll',
    outputs: [
      { name: '', internalType: 'uint256[]', type: 'uint256[]' },
      { name: '', internalType: 'string[]', type: 'string[]' },
    ],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'uint256', type: 'uint256' }],
    name: 'read',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: '_id', internalType: 'uint256', type: 'uint256' }],
    name: 'remove',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: '_id', internalType: 'uint256', type: 'uint256' },
      { name: '_value', internalType: 'string', type: 'string' },
    ],
    name: 'update',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link storageAbi}__
 */
export const useReadStorage = /*#__PURE__*/ createUseReadContract({
  abi: storageAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link storageAbi}__ and `functionName` set to `"fetchAll"`
 */
export const useReadStorageFetchAll = /*#__PURE__*/ createUseReadContract({
  abi: storageAbi,
  functionName: 'fetchAll',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link storageAbi}__ and `functionName` set to `"read"`
 */
export const useReadStorageRead = /*#__PURE__*/ createUseReadContract({
  abi: storageAbi,
  functionName: 'read',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link storageAbi}__
 */
export const useWriteStorage = /*#__PURE__*/ createUseWriteContract({
  abi: storageAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link storageAbi}__ and `functionName` set to `"create"`
 */
export const useWriteStorageCreate = /*#__PURE__*/ createUseWriteContract({
  abi: storageAbi,
  functionName: 'create',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link storageAbi}__ and `functionName` set to `"remove"`
 */
export const useWriteStorageRemove = /*#__PURE__*/ createUseWriteContract({
  abi: storageAbi,
  functionName: 'remove',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link storageAbi}__ and `functionName` set to `"update"`
 */
export const useWriteStorageUpdate = /*#__PURE__*/ createUseWriteContract({
  abi: storageAbi,
  functionName: 'update',
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link storageAbi}__
 */
export const useSimulateStorage = /*#__PURE__*/ createUseSimulateContract({
  abi: storageAbi,
})

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link storageAbi}__ and `functionName` set to `"create"`
 */
export const useSimulateStorageCreate = /*#__PURE__*/ createUseSimulateContract(
  { abi: storageAbi, functionName: 'create' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link storageAbi}__ and `functionName` set to `"remove"`
 */
export const useSimulateStorageRemove = /*#__PURE__*/ createUseSimulateContract(
  { abi: storageAbi, functionName: 'remove' },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link storageAbi}__ and `functionName` set to `"update"`
 */
export const useSimulateStorageUpdate = /*#__PURE__*/ createUseSimulateContract(
  { abi: storageAbi, functionName: 'update' },
)

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link storageAbi}__
 */
export const useWatchStorageEvent = /*#__PURE__*/ createUseWatchContractEvent({
  abi: storageAbi,
})

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link storageAbi}__ and `eventName` set to `"ItemCreated"`
 */
export const useWatchStorageItemCreatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: storageAbi,
    eventName: 'ItemCreated',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link storageAbi}__ and `eventName` set to `"ItemDeleted"`
 */
export const useWatchStorageItemDeletedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: storageAbi,
    eventName: 'ItemDeleted',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link storageAbi}__ and `eventName` set to `"ItemUpdated"`
 */
export const useWatchStorageItemUpdatedEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: storageAbi,
    eventName: 'ItemUpdated',
  })
