import ConnectWallet from "../src/components/Wallet/ConnectWallet";
import { useEffect, useState } from "react";

import Loader from "../src/components/Loader";
import CardBox from "../src/components/CardBox";

import { readTable } from "../src/utils/helpers";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    readTable().then((res) => {
      setProducts(res);
      setLoading(false);
    });
  }, []);

  return (
    <div className="">
      <div className="p-2 text-center">
        <ConnectWallet />
        <span className="p-3 text-5xl text-center font-extrabold text-transparent bg-clip-text bg-gradient-to-br from-orange-400 to-red-600">
          W3Commerce
        </span>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <CardBox products={products} setProducts={setProducts} />
      )}
    </div>
  );
}
