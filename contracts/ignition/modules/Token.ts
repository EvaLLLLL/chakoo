// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'
import { parseEther } from 'viem'

const TOKEN_NAME = 'Meow'
const TOKEN_SYMBOL = 'MEOW'
const TOTAL_SUPPLY = parseEther('100000000')

const TokenModule = buildModule('TokenModule', (m) => {
  const token = m.contract('Token', [TOKEN_NAME, TOKEN_SYMBOL, TOTAL_SUPPLY])

  return { token }
})

export default TokenModule
