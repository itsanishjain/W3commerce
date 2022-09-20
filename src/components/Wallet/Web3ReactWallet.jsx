import { useContext, useState } from "react";
import toast from "react-hot-toast";

import { connectors } from "../../utils/connectors";
import { truncateAddress } from "../../utils/helpers";

import { UserContext } from "../../context/UserContext";
import Button from "../Button";
const Web3ReactWallet = ({ setIsModalOpen }) => {
  const { account, activate, disconnect } = useContext(UserContext);
  const [loading, setLoading] = useState(false);

  const connectWallet = async (walletName) => {
    setLoading(true);
    let isCancelled = false;

    await activate(connectors[walletName], () => {
      toast.error("Connection Rejected");
      isCancelled = true;
    });
    if (isCancelled) return;

    localStorage.setItem("provider", walletName);
    toast.success("Connected Successfully");
    setLoading(false);
  };

  return (
    <div className="">
      {!account ? (
        <div className="flex flex-col space-y-4 w-full space-y-4 ">
          <button
            className="text-white border-2 border-white p-4"
            onClick={() => connectWallet("injected")}
          >
            MetaMask
          </button>
          <button
            className="text-white border-2 border-white p-4"
            onClick={() => connectWallet("walletConnect")}
          >
            WalletConnect
          </button>
          <button
            className="text-white border-2 border-white p-4"
            onClick={() => connectWallet("uauth")}
          >
            uAuth
          </button>
        </div>
      ) : (
        <>
          <p>{truncateAddress(account)}</p>
          <button
            className="text-white border-2 border-white p-4"
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
