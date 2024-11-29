import { defineConfig } from '@wagmi/cli';
import * as fs from 'fs';
import * as path from 'path';
import { execSync } from 'child_process';
import { Abi } from 'viem';
import { fileURLToPath } from 'url';
import { react } from "@wagmi/cli/plugins";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const contractsDir = path.join(__dirname, '../contracts');

export async function generateConfig() {
  execSync('pnpm run compile', { cwd: contractsDir, shell: '/bin/bash' });

  const artifactsDir = path.join(contractsDir, 'artifacts/contracts');
  const abiInfo: { [key: string]: Abi } = {};

  fs.readdirSync(artifactsDir).forEach(contractDir => {
    const contractPath = path.join(artifactsDir, contractDir);
    if (fs.statSync(contractPath).isDirectory()) {
      fs.readdirSync(contractPath).forEach(file => {
        if (file.endsWith('.json') && !file.includes('.dbg.')) {
          const filePath = path.join(contractPath, file);
          const fileContent = JSON.parse(fs.readFileSync(filePath, 'utf-8'));
          abiInfo[`${file.replace('.json', '')}`] = fileContent.abi;
        }
      });
    }
  });

  return Object.entries(abiInfo).map(([contractName, abi]) => ({
    out: `hooks/contracts/${contractName}.ts`,
    contracts: [{
      name: contractName,
      abi: abi
    }],
    plugins: [react()]
  }));
}


export default defineConfig(async () => {
  const config = await generateConfig();
  return config
});
