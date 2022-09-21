import "../styles/globals.css";
import { Toaster } from "react-hot-toast";
import { Web3ReactProvider } from "@web3-react/core";

import { UserContextProvider } from "../src/context/UserContext";
import { ethers } from "ethers";
import RocketLoader from "../src/components/RocketLoader";

const getLibrary = (provider) => new ethers.providers.Web3Provider(provider);

import { useRouter } from "next/router";
import { useState, useEffect } from "react";

function Loading() {
  const router = useRouter();

  const [loading, setLoading] = useState(false);

  useEffect(() => {
    console.log("I M LOADER MMMMMMMMMMMMMMMMMMMMMMMmm");
    const handleStart = (url) => url !== router.asPath && setLoading(true);
    const handleComplete = (url) => url === router.asPath && setLoading(false);

    router.events.on("routeChangeStart", handleStart);
    router.events.on("routeChangeComplete", handleComplete);
    router.events.on("routeChangeError", handleComplete);

    return () => {
      router.events.off("routeChangeStart", handleStart);
      router.events.off("routeChangeComplete", handleComplete);
      router.events.off("routeChangeError", handleComplete);
    };
  });

  return loading && <RocketLoader />;
}

function MyApp({ Component, pageProps }) {
  return (
    <Web3ReactProvider getLibrary={getLibrary}>
      <UserContextProvider>
        <Toaster containerClassName={{ fontSize: "2rem" }} />
        <Loading />
        <Component {...pageProps} />
      </UserContextProvider>
    </Web3ReactProvider>
  );
}

export default MyApp;
