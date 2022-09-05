import { createClient, WagmiConfig, chain } from "wagmi";
import { ConnectKitProvider, getDefaultClient } from "connectkit";

const client = createClient(
  getDefaultClient({
    appName: "APP_NAME",
    autoConnect: true,
    infuraId: process.env.NEXT_PUBLIC_INFURA_ID,
    chains: [chain.polygonMumbai],
  })
);

const Web3Provider = ({ children }) => {
  return (
    <WagmiConfig client={client}>
      <ConnectKitProvider>{children}</ConnectKitProvider>
    </WagmiConfig>
  );
};

export default Web3Provider;
