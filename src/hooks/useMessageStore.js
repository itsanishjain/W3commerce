import { useCallback, useReducer } from "react";

const buildMessageDeduper = (state) => {
  const existingMessageKeys = state.map((msg) => msg.id);

  return (msg) => existingMessageKeys.indexOf(msg.id) === -1;
};

const useMessageStore = () => {
  const [messageStore, dispatchMessages] = useReducer(
    (state, { peerAddress, messages }) => {
      const existing = state[peerAddress] || [];
      const newMessages = messages.filter(buildMessageDeduper(existing));
      if (!newMessages.length) {
        return state;
      }
      console.log("Dispatching new messages for peer address", peerAddress);

      return {
        ...state,
        [peerAddress]: existing.concat(newMessages),
      };
    },
    {}
  );

  const getMessages = useCallback(
    (peerAddress) => messageStore[peerAddress] || [],
    [messageStore]
  );

  return {
    getMessages,
    dispatchMessages,
  };
};

export default useMessageStore;
