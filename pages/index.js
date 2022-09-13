import dynamic from "next/dynamic";
import ConnectWallet from "../src/components/Wallet/ConnectWallet";
import { useEffect, useState } from "react";

import { readTable } from "../src/utils/helpers";

const Map = dynamic(() => import("../src/components/Map"), {
  ssr: false,
});

export default function Home() {
  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readTable().then((res) => {
      setLands(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="">
      <div className="absolute top-3 right-6">
        <ConnectWallet />
      </div>
      {loading ? "loading...." : <Map lands={lands} setLands={setLands} />}
    </div>
  );
}
