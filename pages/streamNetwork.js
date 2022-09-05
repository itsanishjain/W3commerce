import { useEffect, useRef } from "react";
import { StreamrClient, StreamPermission } from "streamr-client";

const STREAM_ID = "0x2ea3bf6b653375fb8facfb67f19937e46840a7d4/lands/";

export const StreamNetwork = () => {
  const streamrRef = useRef();

  useEffect(() => {
    streamrRef.current = new StreamrClient({
      auth: {
        ethereum: window.ethereum,
      },
    });

    streamrRef.current.getOrCreateStream({ id: "/lands/" }).then((res) => {
      res.getPermissions().then((p) => console.log(p));
      res.grantPermissions({
        public: true,
        permissions: [StreamPermission.PUBLISH, StreamPermission.SUBSCRIBE],
      });
    });

    const msg = {
      temperature: 25.4,
      humidity: 10,
      happy: true,
    };

    streamrRef.current.subscribe(STREAM_ID).then((content, metadata) => {
      streamrRef.current.publish(STREAM_ID, msg).then((data) => {
        console.log({ data });
      });
    });
  }, []);

  return <div>Stream Network</div>;
};
