// This setup uses Hardhat Ignition to manage smart contract deployments.
// Learn more about it at https://hardhat.org/ignition

import { buildModule } from '@nomicfoundation/hardhat-ignition/modules'

const Storage = buildModule('Storage', (m) => {
  const store = m.contract('Storage')

  return { store }
})

export default Storage
