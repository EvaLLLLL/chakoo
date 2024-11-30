import { WagmiProvider } from "./wagmi-provider";
import { ReactQueryProvider } from "./react-query-provider";

const Providers: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  return (
    <WagmiProvider>
      <ReactQueryProvider>{children}</ReactQueryProvider>
    </WagmiProvider>
  );
};

export default Providers;
