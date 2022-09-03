import { useAccount } from "wagmi";
import { ConnectKitButton } from "connectkit";

const ConnectWallet = ({ show = "always" }) => {
  const { isConnected } = useAccount();

  if (
    (show == "connected" && !isConnected) ||
    (show == "not_connected" && isConnected)
  )
    return null;

  return <ConnectKitButton />;
};

export default ConnectWallet;
