import dynamic from "next/dynamic";
import ConnectWallet from "../src/components/Wallet/ConnectWallet";
import { useEffect, useState, useReducer } from "react";

import { readTable } from "../src/utils/helpers";

const Map = dynamic(() => import("../src/components/Map"), {
  ssr: false,
});

import useMessageStore from "../src/hooks/useMessageStore";

import { Conversation } from "@xmtp/xmtp-js";
import { Client } from "@xmtp/xmtp-js";

import { useAccount, useContract, useSigner } from "wagmi";

export default function Home() {
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();
  const [client, setClient] = useState();

  const { getMessages, dispatchMessages } = useMessageStore();

  const [lands, setLands] = useState([]);
  const [loading, setLoading] = useState(true);
  const [loadingConversations, setLoadingConversations] = useState(false);

  const [conversations, dispatchConversations] = useReducer(
    (state, newConvos) => {
      if (newConvos === undefined) {
        return [];
      }
      newConvos = newConvos.filter(
        (convo) =>
          state.findIndex((otherConvo) => {
            return convo.peerAddress === otherConvo.peerAddress;
          }) < 0 && convo.peerAddress != client?.address
      );
      return newConvos === undefined ? [] : state.concat(newConvos);
    },
    []
  );

  // useEffect(() => {
  //   readTable().then((res) => {
  //     setLands(res);
  //     setLoading(false);
  //   });
  // }, []);

  useEffect(() => {
    const initClient = async () => {
      if (!signer) return;
      if (client) return;
      console.log({ signer });
      setClient(await Client.create(signer));
    };
    initClient();
  }, [client, signer]);

  useEffect(() => {
    const listConversations = async () => {
      if (!client) return;
      console.log("Listing conversations");
      setLoadingConversations(true);
      const convos = await client.conversations.list();
      console.log({ convos });
      convos.forEach((convo) => {
        dispatchConversations([convo]);
      });
      setLoadingConversations(false);
    };
    listConversations();
  }, [client]);

  useEffect(() => {
    const streamConversations = async () => {
      if (!client) return;
      const stream = await client.conversations.stream();
      for await (const convo of stream) {
        dispatchConversations([convo]);
      }
    };
    streamConversations();
  }, [client]);

  return (
    <div className="">
      <div className="absolute top-3 right-6">
        <ConnectWallet />
      </div>
      {/* {loading ? "loading...." : <Map lands={lands} setLands={setLands} />} */}
    </div>
  );
}
