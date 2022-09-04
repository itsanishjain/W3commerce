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

  const streamrRef = useRef();
  useEffect(() => {
    streamrRef.current = new StreamrClient({
      auth: {
        ethereum: window.ethereum,
      },
    });

    const msg = {
      temperature: 25.4,
      humidity: 10,
      happy: true,
    };

    const subscription = streamrRef.current
      .subscribe("0x2ea3bf6b653375fb8facfb67f19937e46840a7d4/lands/")
      .then((content, metadata) => {
        console.log({ content });
        console.log({ metadata });
        streamrRef.current
          .publish("0x2eA3bF6B653375fb8facfB67F19937E46840a7d4/lands/", msg)
          .then((data) => {
            console.log("DATA", data);
          });
      });

    // const stream = streamrRef.current
    //   .getOrCreateStream({
    //     id: "0x2ea3bf6b653375fb8facfb67f19937e46840a7d4/lands/",
    //   })
    //   .then((res) => {
    //     res.getPermissions().then((p) => console.log(p));
    //     console.log("get created", res);
    //     res.grantPermissions({
    //       public: true,
    //       permissions: [
    //         StreamPermission.PUBLISH,
    //         StreamPermission.SUBSCRIBE,
    //         StreamPermission.EDIT,
    //         StreamPermission.GRANT,
    //         StreamPermission.DELETE,
    //       ],
    //     });
    //   });
  }, []);

  // console.log(streamrRef.current);

  return (
    <div className="">
      {/* <div className="absolute top-3 right-6">
        <ConnectWallet />
      </div>
      {loading ? "loading...." : <Map lands={lands} />} */}
    </div>
  );
}
