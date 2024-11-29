import { HardhatUserConfig } from 'hardhat/config'
import '@nomicfoundation/hardhat-toolbox'
import dotenv from 'dotenv'

dotenv.config()

const config: HardhatUserConfig = {
  solidity: '0.8.27',
  defaultNetwork: 'hardhat',
  networks: {
    main: {
      chainId: 1,
      url: 'https://1rpc.io/eth',
      accounts: [process.env.PRIVATE_KEY!]
    },
    sepolia: {
      chainId: 11155111,
      url: 'https://ethereum-sepolia-rpc.publicnode.com',
      accounts: [process.env.PRIVATE_KEY!]
    }
  },
  gasReporter: {
    enabled: true
  }
}

export default config
