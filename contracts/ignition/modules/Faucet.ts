// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const TOKEN_ADDRESS = ''

const FacetModule = buildModule('Faucet', (m) => {
  const faucet = m.contract('Faucet', [TOKEN_ADDRESS])

  return { faucet }
})

export default FacetModule
