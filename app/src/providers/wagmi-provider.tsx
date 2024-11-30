import { http, createConfig, WagmiProvider as Provider } from "wagmi";
import { mainnet, sepolia } from "wagmi/chains";

const config = createConfig({
  chains: [mainnet, sepolia],
  transports: {
    [mainnet.id]: http(),
    [sepolia.id]: http(),
  },
});

export const WagmiProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  return <Provider config={config}>{children}</Provider>;
};
