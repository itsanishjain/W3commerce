// import ConnectWallet from "../src/components/Wallet/ConnectWallet";
import { useEffect, useState, useContext } from "react";

import Loader from "../src/components/Loader";
import CardBox from "../src/components/CardBox";

import { readTable } from "../src/utils/helpers";

import { UserContext } from "../src/context/UserContext";
import Web3ReactWallet from "../src/components/Wallet/Web3ReactWallet";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    console.log("Index useEffect running...............");

    readTable().then((res) => {
      console.log(res);
      const l = Object.keys(res).length;

      let d = [];

      for (let i = 0; i < l; i++) {
        const data = {
          id: res[i]["id"],
          title: res[i]["title"],
          x: res[i]["image"],
        };
        d.push(data);
      }

      setProducts(d);
      setLoading(false);
    });
  }, []);

  return (
    <div className="">
      <div className="p-2 text-center">
        <Web3ReactWallet />
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
