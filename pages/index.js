import dynamic from "next/dynamic";
import ConnectWallet from "../src/components/Wallet/ConnectWallet";
import mapdata from "../src/utils/mapdata.json";
import { createTable } from "../src/utils/helpers";

const Map = dynamic(() => import("../src/components/Map"), {
  ssr: false,
});

export default function Home() {
  return (
    <div className="">
      {/* <div className="absolute top-3 right-6">
        <ConnectWallet />
      </div> */}
      {/* <Map lands={mapdata.splice(0, 200)} /> */}
      <button onClick={createTable}>Create Table</button>
    </div>
  );
}
