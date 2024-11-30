import { Button, Card, Status } from "@repo/ui";
import { formatEther } from "viem";
import {
  useAccount,
  useBalance,
  useChainId,
  useConnect,
  useDisconnect,
  useSwitchChain,
} from "wagmi";
import { injected } from "wagmi/connectors";

export const WalletConnection: React.FC = () => {
  const chainId = useChainId();
  const { address, isConnecting, isReconnecting, isConnected } = useAccount();
  const { chains, switchChain, isPending: isSwitching } = useSwitchChain();
  const { connect } = useConnect();
  const { disconnect } = useDisconnect();
  const { data: nativeBalance } = useBalance({
    address,
    query: { select: (v) => formatEther(v.value) || "-" },
  });

  const chain = chains.find((c) => c.id === chainId);

  const status =
    isConnecting || isReconnecting
      ? "connecting"
      : isConnected
        ? "online"
        : "offline";

  return (
    <Card title="Wallet Connection">
      <div className="flex flex-col items-start gap-y-2">
        <div className="flex flex-col items-start gap-y-2">
          <span className="flex items-center justify-center gap-x-2">
            <Status status={status} />
            {status}
          </span>
          <span>chainId: {chainId};</span>
          <span>chain: {chain?.name};</span>
          <span>address: {address};</span>
          <span>
            {chain?.nativeCurrency.symbol} balance: {nativeBalance};
          </span>
        </div>

        <div className="flex items-center gap-x-10">
          <div className="flex items-center gap-x-2">
            {isConnected ? (
              <Button
                disabled={isConnecting || isReconnecting}
                onClick={() => disconnect()}
              >
                Disconnect
              </Button>
            ) : (
              <Button
                disabled={isConnecting || isReconnecting}
                onClick={() => connect({ connector: injected() })}
              >
                Connect
              </Button>
            )}
          </div>

          <div className="flex items-center gap-x-2">
            {chains.map((c) => (
              <Button
                key={c.id}
                disabled={isSwitching}
                onClick={() => switchChain({ chainId: c.id })}
                className="flex items-center gap-x-1"
              >
                {c.id === chainId && <Status status="online" />}
                {c.name}
              </Button>
            ))}
          </div>
        </div>
      </div>
    </Card>
  );
};
