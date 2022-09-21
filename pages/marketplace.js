import { useEffect, useState } from "react";

import Button from "../src/components/Button";
import Loader from "../src/components/Loader";
import CardBox from "../src/components/CardBox";
import WalletModal from "../src/components/WalletModal";

import { readTable } from "../src/utils/helpers";

const MarketPlace = () => {
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
        <div className="absolute top-2 left-2 w-64">
          <Button
            text={"Connect Wallet"}
            onClick={() => setIsModalOpen(true)}
          />
        </div>
      </div>
      {loading ? (
        <Loader />
      ) : (
        <CardBox products={products} setProducts={setProducts} />
      )}
    </div>
  );
};

export default MarketPlace;
