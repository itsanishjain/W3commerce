import "../styles/globals.css";
import Web3Provider from "../src/components/Wallet/Web3Provider";
import { Toaster } from "react-hot-toast";

function MyApp({ Component, pageProps }) {
  return (
    <Web3Provider>
      <Toaster containerClassName={{ fontSize: "2rem" }} />
      <Component {...pageProps} />
    </Web3Provider>
  );
}

export default MyApp;
