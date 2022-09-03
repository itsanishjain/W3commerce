import dynamic from "next/dynamic";
import UnstoppableDomain from "../src/components/Wallet/UnstoppableDomains";
import ConnectWallet from "../src/components/Wallet/ConnectWallet";
import mapdata from "../src/utils/mapdata.json";

const Map = dynamic(() => import("../src/components/Map"), {
  ssr: false,
});

const lands = JSON.parse(JSON.stringify(mapdata));
export default function Home() {
  return (
    <div className="">
      <div className="flex justify-between p-4 w-124 bg-red-500">
        <UnstoppableDomain />
        <ConnectWallet />
      </div>
      <Map lands={lands} />
    </div>
  );
}
