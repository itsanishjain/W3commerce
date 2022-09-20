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
      <div className="p-2">
        <ConnectWallet />
      </div>
      {loading ? <Loader /> : <CardBox products={products} setProducts={setProducts} />}
    </div>
  );
}
