import { useContext } from "react";
import toast from "react-hot-toast";

import { connectors } from "../../utils/connectors";
import { truncateAddress } from "../../utils/helpers";

import { UserContext } from "../../context/UserContext";
const Web3ReactWallet = () => {
  const { account, activate, disconnect } = useContext(UserContext);

  const connectWallet = async (walletName) => {
    let isCancelled = false;
    await activate(connectors[walletName], () => {
      toast.error("Connection Rejected");
      isCancelled = true;
    });
    if (isCancelled) return;

    localStorage.setItem("provider", walletName);
    toast.success("Connected Successfully");
  };

  return (
    <div className="space-y-10 max-w-lg mx-auto shadow-md rounded-md p-8 bg-black text-white">
      {!account ? (
        <div className="flex flex-col space-y-4">
          <button
            className="text-white border-2 border-white"
            onClick={() => connectWallet("injected")}
          >
            MetaMask
          </button>
          <button
            className="text-white border-2 border-white"
            onClick={() => connectWallet("walletConnect")}
          >
            WalletConnect
          </button>
          <button
            className="text-white border-2 border-white"
            onClick={() => connectWallet("uauth")}
          >
            uAuth
          </button>
        </div>
      ) : (
        <>
          <p>{truncateAddress(account)}</p>
          <button
            className="text-white border-2 border-white"
            onClick={disconnect}
          >
            Disconnect
          </button>
        </>
      )}
    </div>
  );
};

export default Web3ReactWallet;
