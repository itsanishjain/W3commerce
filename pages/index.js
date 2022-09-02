import dynamic from "next/dynamic";
import mapdata from "../src/utils/mapdata.json";

const Map = dynamic(() => import("../src/components/Map"), {
  ssr: false,
});

const lands = JSON.parse(JSON.stringify(mapdata));
export default function Home() {
  return (
    <div className="">
      <Map lands={lands} />
    </div>
  );
}
