import { useEffect, useState } from "react";

import Loader from "../src/components/Loader";
import CardBox from "../src/components/CardBox";

import { readTable } from "../src/utils/helpers";
import WalletModal from "../src/components/WalletModal";
import Button from "../src/components/Button";

export default function Home() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    readTable().then((res) => {
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
        {isModalOpen && <WalletModal setIsModalOpen={setIsModalOpen} />}

        <Button text={"Connect Wallet"} onClick={() => setIsModalOpen(true)} />
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
