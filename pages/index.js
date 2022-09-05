import dynamic from "next/dynamic";
import ConnectWallet from "../src/components/Wallet/ConnectWallet";

import { readTable } from "../src/utils/helpers";
import { useEffect, useRef, useState } from "react";

const { StreamrClient, StreamPermission } = require("streamr-client");

const Map = dynamic(() => import("../src/components/Map"), {
  ssr: false,
});

export default function Home() {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);

  // useEffect(() => {
  //   readTable("_80001_1434").then((res) => {
  //     setLands(res);
  //     setLoading(false);
  //   });
  // }, []);
  
  
  return (
    <div className="">
      {/* <div className="absolute top-3 right-6">
        <ConnectWallet />
      </div>
      {loading ? "loading...." : <Map lands={lands} />} */}
    </div>
  );
}
