import {
  createUseReadContract,
  createUseWriteContract,
  createUseSimulateContract,
  createUseWatchContractEvent,
} from 'wagmi/codegen'

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// TokenContract
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

export const tokenContractAbi = [
  {
    type: 'constructor',
    inputs: [
      { name: 'name', internalType: 'string', type: 'string' },
      { name: 'symbol', internalType: 'string', type: 'string' },
      { name: 'initialSupply', internalType: 'uint256', type: 'uint256' },
    ],
    stateMutability: 'nonpayable',
  },
  {
    type: 'error',
    inputs: [
      { name: 'increasedSupply', internalType: 'uint256', type: 'uint256' },
      { name: 'cap', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20ExceededCap',
  },
  {
    type: 'error',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'allowance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientAllowance',
  },
  {
    type: 'error',
    inputs: [
      { name: 'sender', internalType: 'address', type: 'address' },
      { name: 'balance', internalType: 'uint256', type: 'uint256' },
      { name: 'needed', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'ERC20InsufficientBalance',
  },
  {
    type: 'error',
    inputs: [{ name: 'approver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidApprover',
  },
  {
    type: 'error',
    inputs: [{ name: 'cap', internalType: 'uint256', type: 'uint256' }],
    name: 'ERC20InvalidCap',
  },
  {
    type: 'error',
    inputs: [{ name: 'receiver', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidReceiver',
  },
  {
    type: 'error',
    inputs: [{ name: 'sender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSender',
  },
  {
    type: 'error',
    inputs: [{ name: 'spender', internalType: 'address', type: 'address' }],
    name: 'ERC20InvalidSpender',
  },
  {
    type: 'error',
    inputs: [{ name: 'owner', internalType: 'address', type: 'address' }],
    name: 'OwnableInvalidOwner',
  },
  {
    type: 'error',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'OwnableUnauthorizedAccount',
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
      {
        name: 'spender',
        internalType: 'address',
        type: 'address',
        indexed: true,
      },
      {
        name: 'value',
        internalType: 'uint256',
        type: 'uint256',
        indexed: false,
      },
    ],
    name: 'Approval',
  },
  {
    type: 'event',
    anonymous: false,
    inputs: [
      {
        name: 'previousOwner',
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
    name: 'OwnershipTransferred',
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
    name: 'Transfer',
  },
  {
    type: 'function',
    inputs: [
      { name: 'owner', internalType: 'address', type: 'address' },
      { name: 'spender', internalType: 'address', type: 'address' },
    ],
    name: 'allowance',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'spender', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'approve',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'account', internalType: 'address', type: 'address' }],
    name: 'balanceOf',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [{ name: 'value', internalType: 'uint256', type: 'uint256' }],
    name: 'burn',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'account', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'burnFrom',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'cap',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'decimals',
    outputs: [{ name: '', internalType: 'uint8', type: 'uint8' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'name',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'owner',
    outputs: [{ name: '', internalType: 'address', type: 'address' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'renounceOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [],
    name: 'symbol',
    outputs: [{ name: '', internalType: 'string', type: 'string' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [],
    name: 'totalSupply',
    outputs: [{ name: '', internalType: 'uint256', type: 'uint256' }],
    stateMutability: 'view',
  },
  {
    type: 'function',
    inputs: [
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transfer',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [
      { name: 'from', internalType: 'address', type: 'address' },
      { name: 'to', internalType: 'address', type: 'address' },
      { name: 'value', internalType: 'uint256', type: 'uint256' },
    ],
    name: 'transferFrom',
    outputs: [{ name: '', internalType: 'bool', type: 'bool' }],
    stateMutability: 'nonpayable',
  },
  {
    type: 'function',
    inputs: [{ name: 'newOwner', internalType: 'address', type: 'address' }],
    name: 'transferOwnership',
    outputs: [],
    stateMutability: 'nonpayable',
  },
] as const

//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////
// React
//////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////////

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__
 */
export const useReadTokenContract = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"allowance"`
 */
export const useReadTokenContractAllowance =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenContractAbi,
    functionName: 'allowance',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"balanceOf"`
 */
export const useReadTokenContractBalanceOf =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenContractAbi,
    functionName: 'balanceOf',
  })

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"cap"`
 */
export const useReadTokenContractCap = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
  functionName: 'cap',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"decimals"`
 */
export const useReadTokenContractDecimals = /*#__PURE__*/ createUseReadContract(
  { abi: tokenContractAbi, functionName: 'decimals' },
)

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"name"`
 */
export const useReadTokenContractName = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
  functionName: 'name',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"owner"`
 */
export const useReadTokenContractOwner = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
  functionName: 'owner',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"symbol"`
 */
export const useReadTokenContractSymbol = /*#__PURE__*/ createUseReadContract({
  abi: tokenContractAbi,
  functionName: 'symbol',
})

/**
 * Wraps __{@link useReadContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"totalSupply"`
 */
export const useReadTokenContractTotalSupply =
  /*#__PURE__*/ createUseReadContract({
    abi: tokenContractAbi,
    functionName: 'totalSupply',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__
 */
export const useWriteTokenContract = /*#__PURE__*/ createUseWriteContract({
  abi: tokenContractAbi,
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"approve"`
 */
export const useWriteTokenContractApprove =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"burn"`
 */
export const useWriteTokenContractBurn = /*#__PURE__*/ createUseWriteContract({
  abi: tokenContractAbi,
  functionName: 'burn',
})

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useWriteTokenContractBurnFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    functionName: 'burnFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useWriteTokenContractRenounceOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transfer"`
 */
export const useWriteTokenContractTransfer =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useWriteTokenContractTransferFrom =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useWriteContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useWriteTokenContractTransferOwnership =
  /*#__PURE__*/ createUseWriteContract({
    abi: tokenContractAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__
 */
export const useSimulateTokenContract = /*#__PURE__*/ createUseSimulateContract(
  { abi: tokenContractAbi },
)

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"approve"`
 */
export const useSimulateTokenContractApprove =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    functionName: 'approve',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"burn"`
 */
export const useSimulateTokenContractBurn =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    functionName: 'burn',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"burnFrom"`
 */
export const useSimulateTokenContractBurnFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    functionName: 'burnFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"renounceOwnership"`
 */
export const useSimulateTokenContractRenounceOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    functionName: 'renounceOwnership',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transfer"`
 */
export const useSimulateTokenContractTransfer =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    functionName: 'transfer',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferFrom"`
 */
export const useSimulateTokenContractTransferFrom =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    functionName: 'transferFrom',
  })

/**
 * Wraps __{@link useSimulateContract}__ with `abi` set to __{@link tokenContractAbi}__ and `functionName` set to `"transferOwnership"`
 */
export const useSimulateTokenContractTransferOwnership =
  /*#__PURE__*/ createUseSimulateContract({
    abi: tokenContractAbi,
    functionName: 'transferOwnership',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__
 */
export const useWatchTokenContractEvent =
  /*#__PURE__*/ createUseWatchContractEvent({ abi: tokenContractAbi })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__ and `eventName` set to `"Approval"`
 */
export const useWatchTokenContractApprovalEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenContractAbi,
    eventName: 'Approval',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__ and `eventName` set to `"OwnershipTransferred"`
 */
export const useWatchTokenContractOwnershipTransferredEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenContractAbi,
    eventName: 'OwnershipTransferred',
  })

/**
 * Wraps __{@link useWatchContractEvent}__ with `abi` set to __{@link tokenContractAbi}__ and `eventName` set to `"Transfer"`
 */
export const useWatchTokenContractTransferEvent =
  /*#__PURE__*/ createUseWatchContractEvent({
    abi: tokenContractAbi,
    eventName: 'Transfer',
  })
