import React, { createContext, useState, useEffect } from "react";
import { useWeb3React } from "@web3-react/core";

import { connectors } from "../utils/connectors";
import Loader from "../components/Loader";

import { connect } from "@tableland/sdk";

export const UserContext = createContext();

// Establish a connection
const tableland = connect({
  network: "testnet",
  chain: "polygon-mumbai",
});

const TABLE_NAME = "_80001_2123";

export const readTable = async () => {
  console.log({ tableland });
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
    console.log("User useEffect running...............")
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
      {isLoading ? "loading................" : children}
    </UserContext.Provider>
  );
};
