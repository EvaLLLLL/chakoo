<img src="https://raw.githubusercontent.com/EvaLLLLL/x/main/chakoo.png" />

# Chakoo

Chakoo is a starter template for creating Web3 applications, designed to streamline the development process. It includes a complete frontend development setup, tooling configuration with ESLint, Prettier, Commitlint, and Simple Git Hooks, as well as style integration using Tailwind CSS and state management with React Query. On the smart contract side, it features a Hardhat setup with TypeScript, contract deployment configurations, and automated React Hooks generation based on compiled contract ABIs. By cloning this repository, you can skip the tedious setup process and dive straight into building your business logic.

## TOC

- [Chakoo](#chakoo)
  - [TOC](#toc)
  - [Features](#features)
  - [Project Structure](#project-structure)
  - [Installation](#installation)
  - [Development](#development)
    - [Frontend](#frontend)
    - [Generate React Hooks to Interact with Contracts](#generate-react-hooks-to-interact-with-contracts)
    - [Smart Contracts](#smart-contracts)
    - [Dockerizing application](#dockerizing-application)
  - [License](#license)

## Features

- **Frontend Development**: React + TypeScript + Vite + Tailwind CSS
- **Web3 Integration**: Wagmi for wallet connection and contract interaction
- **State Management**: React Query
- **Smart Contracts**: Hardhat + Solidity
- **Code Linting**: ESLint + Prettier
- **Testing**: Comprehensive test suites for frontend and smart contracts
- **Git Workflow**: Simple-git-hooks + Commit-lint

## Project Structure

This project utilizes [pnpm workspaces](https://pnpm.io/workspaces) for dependency and script management:

```
.vscode
  └─ Recommended extensions for VSCode users
app
 ├─ src
 |   └─ components
 |      └─ WalletConnection.tsx
 |         └─ frontend connect / disconnect and switch chains
 |      └─ TokenTransaction.tsx
 |         └─ frontend request tokens from faucet
 |      └─ StorageCURD.tsx
 |         └─ onchain storage CURD
contracts
 ├─ contracts
 |   └─ contracts
 |      └─ Token.sol
 |         └─ a simple token contract
 |      └─ Faucet.sol
 |         └─ a simple faucet contract
 |      └─ Storage.sol
 |         └─ a simple storage contract
 |      └─ Lock.sol
 |         └─ sample contract from hardhat
 ├─ ignition
 |   └─ hardhat deployment scripts
 ├─ test
 |   └─ contract tests
 └─ ui
     └─ a custom shared ui component library
packages
 ├─ lib
 |   └─ shared utils
 ├─ typescript-config
 |   └─ shared tsconfig
 ├─ eslint-config
 |   └─ shared eslint and prettier config
 ├─ tailwind-config
 |   └─ shared tailwind css config
 └─ ui
     └─ a custom shared ui component library
```

## Installation

```sh
# Clone the repository
git clone https://github.com/EvaLLLLL/chakoo

# Install the dependencies
# We use `pnpm workspace` feature to manage this monorepo, please use `pnpm` other than `npm` or `yarn`
pnpm install
```

## Development

### Frontend

Start the frontend development server:

```sh
pnpm run dev
```

### Generate React Hooks to Interact with Contracts

The following commands will automatically read Abis from `contracts/artifacts/contracts/[Module].sol/[Module].json`, and generate hooks into `app/src/contracts`, you can get more detailed information about `wagmi cli` [here](https://wagmi.sh/cli/why):

```sh
cd app
pnpm run generate
```

### Smart Contracts

We use Hardhat for developing and testing smart contracts, and Hardhat Ignition for deploying them. You can find more detailed information about Hardhat [here](https://hardhat.org/).

```sh
cd contracts
# Start a local blockchain
npx hardhat node

# Test the contracts
npx hardhat test

# Deploy the contracts
pnpm run deploy
```

### Dockerizing application

```sh
# Build pro
docker compose build --no-cache
# Start prod in detached mode
docker-compose -f docker-compose.yml up -d
```

## License

This project is licensed under the MIT License. See the LICENSE file for details.
