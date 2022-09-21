import { useContext } from "react";

import { UserContext } from "../../src/context/UserContext";
import { truncateAddress } from "../../src/utils/helpers";

export default function Button({ text, onClick }) {
  const { account } = useContext(UserContext);
  return (
    <div
      className=" mt-8 max-w-sm rounded-lg bg-stone-500 text-center font-semibold text-lg"
      onClick={onClick}
    >
      <span className="block px-2 py-4 rounded-lg bg-stone-700 text-xl text-white -translate-y-2 active:-translate-y-1 cursor-pointer">
        {!account ? text : truncateAddress(account)}
      </span>
    </div>
  );
}
