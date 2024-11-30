<img src="https://raw.githubusercontent.com/EvaLLLLL/x/main/chakoo.png" />

# Chakoo

Chakoo is a Web3 application starter template that combines a complete frontend development setup with smart contract tooling. It lets you skip the tedious configuration process and focus directly on building your application.

## Key Features

- **Frontend Stack**: React + TypeScript + Vite + Tailwind CSS + React Query
- **Web3 Integration**: Wagmi for wallet connection and contract interaction
- **Smart Contracts**: Hardhat + Solidity
- **Code Quality**: ESLint + Prettier + Commitlint + Simple Git Hooks
- **Testing**: Comprehensive test suites for both frontend and contracts

## Project Structure

Using [pnpm workspaces](https://pnpm.io/workspaces) for dependency management:

```
.vscode/          # VSCode recommended extensions
app/              # Frontend application
  └─ src/
    └─ components/
      ├─ WalletConnection.tsx  # Connect/disconnect wallet and switch chains
      ├─ TokenTransaction.tsx  # Request tokens from faucet
      └─ StorageCURD.tsx      # On-chain storage operations
contracts/        # Smart contracts
  ├─ contracts/
  │  ├─ Token.sol    # Simple token contract
  │  ├─ Faucet.sol   # Faucet contract
  │  ├─ Storage.sol  # Storage contract
  │  └─ Lock.sol     # Hardhat sample contract
  ├─ ignition/       # Hardhat deployment scripts
  └─ test/          # Contract tests
packages/         # Shared packages
  ├─ lib/           # Shared utilities
  ├─ typescript-config/  # Shared tsconfig
  ├─ eslint-config/     # Shared ESLint and Prettier config
  ├─ tailwind-config/   # Shared Tailwind CSS config
  └─ ui/               # Shared UI component library
```

## Quick Start

> [!NOTE]
> This project uses the `pnpm workspace` feature to manage the monorepo. Please do not use other tools like npm or yarn.

```sh
# Clone the repository
git clone https://github.com/EvaLLLLL/chakoo

# Install dependencies (use pnpm)
pnpm install

# Start development server
pnpm run dev
```

## Development Guide

### Contract Interaction

Generate React hooks from contract ABIs:

```sh
cd app
pnpm run generate
```

### Smart Contracts

```sh
cd contracts
# Start local blockchain
npx hardhat node

# Test contracts
npx hardhat test

# Deploy contracts
pnpm run deploy
```

### Docker Deployment

```sh
# Build production
docker compose build --no-cache

# Start in detached mode
docker-compose -f docker-compose.yml up -d
```

## License

MIT License. See [LICENSE](LICENSE) for details.
