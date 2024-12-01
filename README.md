<img src="https://raw.githubusercontent.com/EvaLLLLL/x/main/chakoo.png" />

# Chakoo

Chakoo is a Web3 application starter template that combines a complete frontend development setup with smart contract tooling. It lets you skip the tedious configuration process and focus directly on building your application.

## Quick Start

> [!IMPORTANT]
> This project uses the `pnpm workspace` feature to manage the monorepo. Please do not use other tools like npm or yarn.

```sh
# Clone the repository
git clone https://github.com/EvaLLLLL/chakoo

# Install dependencies (use pnpm)
pnpm install

# Start development server
pnpm run dev
```

## Key Features

- **Frontend Stack**: React + TypeScript + Vite + Tailwind CSS + React Query
- **Web3 Integration**: Wagmi for wallet connection and contract interaction
- **Smart Contracts**: Hardhat + Solidity
- **Code Quality**: ESLint + Prettier + Commitlint + Simple Git Hooks
- **Testing**: Comprehensive test suites for both frontend and contracts
- **Auto-generated React Hooks**: Automatically generate type-safe React hooks from your contract ABIs

## Project Structure

```
.vscode/          # VSCode recommended extensions
app/              # Frontend application
  └─ src/
    └─ components/
      ├─ WalletConnection.tsx  # Connect/disconnect wallet and switch chains
      ├─ TokenTransaction.tsx  # Request tokens from faucet
      └─ StorageCURD.tsx      # On-chain storage operations
    └─ hooks/
      └─ contracts/           # Auto-generated contract hooks
        ├─ token.ts
        ├─ faucet.ts
        └─ storage.ts
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

## Development Guide

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

### Contract Interaction

```sh
cd app

# Generate React hooks from contract ABIs
pnpm run generate-hooks
```

### Using Generated Hooks

```typescript
import { useReadTokenBalanceOf, useWriteTokenTransfer } from "@/hooks/contracts/token";

export function TokenBalance({ address }: { address: string }) {
  // Read hook
  const { data: balance } = useReadTokenBalanceOf({
    args: [address]
  });

  // Write hook
  const { write: transfer } = useWriteTokenTransfer();

  return (
    <div>
      <p>Balance: {balance}</p>
      <button onClick={() => transfer({
        args: [recipientAddress, amount]
      })}>
        Transfer
      </button>
    </div>
  );
}
```

### Dockerizing

```sh
# Build production
docker compose build --no-cache

# Start in detached mode
docker-compose -f docker-compose.yml up -d
```

## Auto-generated Contract Hooks

Chakoo's auto-generated React hooks from smart contract ABIs are a key feature. This feature offers:

1. **Less Code**: No manual contract interaction code needed
2. **Type Safety**: TypeScript support for all contract functions
3. **Instant Updates**: Hooks regenerate when contracts change

### Hook Types

The generator creates several types of hooks for each contract:

- **Read Hooks**: For view/pure functions (e.g., `useReadTokenBalanceOf`)
- **Write Hooks**: For state-changing functions (e.g., `useWriteTokenTransfer`)
- **Event Hooks**: For listening to contract events (e.g., `useWatchTokenTransferEvent`)
- **Simulation Hooks**: For simulating transactions before sending them

### Hook Generation Configuration

The hook generation is configured in `app/wagmi.config.ts`:

```typescript
import { defineConfig } from '@wagmi/cli'
import { react } from '@wagmi/cli/plugins'

export async function generateConfig() {
  // Automatically compile contracts and extract ABIs
  execSync('pnpm run compile', { cwd: contractsDir })

  const artifactsDir = path.join(contractsDir, 'artifacts/contracts')
  const abiInfo: { [key: string]: Abi } = {}

  // Generate hooks for each contract
  return Object.entries(abiInfo).map(([contractName, abi]) => ({
    out: `src/hooks/contracts/${contractName.toLowerCase()}.ts`,
    contracts: [
      {
        name: contractName,
        abi: abi
      }
    ],
    plugins: [react()]
  }))
}
```

## Tech Stack

- **pnpm**: [pnpm.io](https://pnpm.io) for package management and workspace features
- **Vite**: [vitejs.dev](https://vitejs.dev) for development server and build tooling
- **Tailwind CSS**: [tailwindcss.com](https://tailwindcss.com) for styling and UI
- **React Query**: [react-query.tanstack.com](https://react-query.tanstack.com) for data fetching and caching
- **Wagmi**: [wagmi.sh](https://wagmi.sh) for Web3 integration and wallet connection
- **Solidity**: [soliditylang.org](https://soliditylang.org) for writing smart contracts
- **Hardhat**: [hardhat.org](https://hardhat.org) for smart contract development and deployment
- **ESLint**: [eslint.org](https://eslint.org) for code linting and quality control
- **Prettier**: [prettier.io](https://prettier.io) for code formatting
- **Commitlint**: [commitlint.js.org](https://commitlint.js.org) for commit message linting
- **Simple Git Hooks**: [simple-git-hooks](https://github.com/simple-git-hooks) for Git hook management
- **Docker**: [docker.com](https://docker.com) for containerization and deployment

## License

MIT License. See [LICENSE](LICENSE) for details.
