import "../styles/globals.css";
// import Web3Provider from "../src/components/Wallet/Web3Provider";
import { Toaster } from "react-hot-toast";
import { Web3ReactProvider } from "@web3-react/core";

import { UserContextProvider } from "../src/context/UserContext";
import { ethers } from "ethers";

const getLibrary = (provider) => new ethers.providers.Web3Provider(provider);

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <UserContextProvider>
        <Toaster containerClassName={{ fontSize: "2rem" }} />
        <Component {...pageProps} />
      </UserContextProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
