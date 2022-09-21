import { connect } from "@tableland/sdk";
import { useWeb3React } from "@web3-react/core";
import { createContext, useState, useEffect } from "react";

import { connectors } from "../utils/connectors";
import { TABLE_NAME } from "../utils/consts";

import RocketLoader from "../components/RocketLoader";

export const UserContext = createContext();

// Establish a connection
const tableland = connect({
  network: "testnet",
  chain: "polygon-mumbai",
});

export const readTable = async () => {
  const readRes = await tableland.read(`SELECT * FROM ${TABLE_NAME};`);
  return readRes.map((item) => ({
    id: item[0],
    name: item[1],
    x: item[2],
  }));
};

export const UserContextProvider = ({ children }) => {
  const { account, activate, deactivate, chainId, library } = useWeb3React();

  const [isLoading, setIsLoading] = useState(true);

  const disconnect = () => {
    localStorage.removeItem("provider");
    deactivate();
  };

  useEffect(() => {
    activate(connectors[localStorage.getItem("provider")]).then(() => {
      setIsLoading(false);
    });
  }, [activate]);

  return (
    <UserContext.Provider
      value={{
        account,
        chainId,
        library,
        activate,
        disconnect,
        deactivate,
        isLoggedIn: !!account,
      }}
    >
      {isLoading ? <RocketLoader /> : children}
    </UserContext.Provider>
  );
};
