import Image from "next/image";
import Loader from "./Loader";
import { useState, useEffect, useRef, useContext } from "react";
import toast from "react-hot-toast";

import { StreamrClient } from "streamr-client";

import { STREAM_ID } from "../utils/consts";
import { contractAddress, abi } from "../utils/addressAndABI";
import { nftDotStorage, updateAndPublish } from "../utils/helpers";

import * as htmlToImage from "html-to-image";

import { UserContext } from "../context/UserContext";

const CardBox = ({ products, setProducts }) => {
  const { isLoggedIn, account } = useContext(UserContext);

  const streamrRef = useRef();
  const domEl = useRef();

  const [quantity, setQuantity] = useState(1);
  const [currData, setCurrData] = useState();
  const [currId, setCurrId] = useState();
  const [loading, setLoading] = useState(false);

  const [currUsers, setCurrUsers] = useState([]);

  function isUnique(value, index, array) {
    return array.indexOf(value) === array.lastIndexOf(value);
  }

  // Handle input
  const handleInput = (currentValue) => {
    let v = parseInt(currentValue);
    if (isNaN(v)) setQuantity(1);
    else if (v > 10) setQuantity(10);
    else if (v < 1) setQuantity(1);
    else setQuantity(v);
  };

  const downloadImage = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);
    const blob = new Blob([JSON.stringify(dataUrl, null, 2)], {
      type: "application/json",
    });
    await nftDotStorage(blob);
  };

  // Contract init
  // const contract = useContract({
  //   addressOrName: contractAddress,
  //   contractInterface: abi,
  //   signerOrProvider: signer,
  // });

  // Mint
  const mintProduct = async (product) => {
    try {
      setLoading(true);
      await updateAndPublish(product, 0, account, streamrRef);
      // await downloadImage();
      return;

      await (await contract.mint(address, product.id, 1, "0x")).wait();
      // stremer code and database to make land status minted
      await updateAndPublish(land, 1, address, streamrRef);
      toast.success("Successfully Minted");
    } catch (err) {
      console.error(err);
      toast.error("Something went wrong");
      // await updateAndPublish(land, -1, "", streamrRef); // we need to only update
    }
    setLoading(false);
  };

  useEffect(() => {
    streamrRef.current = new StreamrClient({
      auth: { privateKey: process.env.NEXT_PUBLIC_PK },
    });
    streamrRef.current
      .subscribe(STREAM_ID, (content) => {
        console.log({ content });
        setCurrUsers((prev) => [...prev, content.user]);
        setProducts((prev) =>
          prev.map((x) => (x.id === content.id ? content : x))
        );

        // setCurrData({ ...content });
      })
      .then((res) => {
        console.log("SUBSCRIBE");
      })
      .catch((err) => console.error("ERROR"));
  }, [setProducts]);

  console.log({ currUsers });

  // let a = currUsers.filter(isUnique);

  console.log("dfadsf");

  return (
    <div className="flex rounded-md mt-8">
      {/* RIGHT */}
      <div
        className="text-white max-w-3xl mx-auto grid 
    grid-row-1 gap-8 p-2 md:grid-cols-3 md:gap-4"
      >
        {products.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer text-center bg-white rounded-md p-4"
            onClick={() => {
              setCurrData(item);
            }}
          >
            <Image
              src={`https://fakestoreapi.com/img/${item.x}`}
              height={250}
              width={250}
              alt={`image_${item.id.tokenId}`}
            />
            <div className="text-md font-bold text-black">
              {item.title == "new title"
                ? "Backpack, Fits 15 Laptops"
                : item.title}
            </div>
          </div>
        ))}
      </div>

      {/* LEFT */}
      {currData && (
        <div className="cardBox rounded-md p-2 space-y-4 w-80 m-4">
          <div className="bg-orange-300 rounded-md p-2 space-y-4">
            <div className="flex justify-bwtween items-center">
              <div variant="body1" color="">
                <div className="text-black">
                  {currData.title == "new title"
                    ? "Backpack, Fits 15 Laptops"
                    : currData.title}
                </div>
              </div>
            </div>
          </div>
          {isLoggedIn && (
            <div className="space-y-4">
              <div className="flex justify-center items-center">
                <span>Live users: {[...new Set(currUsers)].length}</span>
                <span className="flex h-3 w-3 ml-2">
                  <span className="animate-ping inline-flex h-full w-full rounded-full bg-sky-400 opacity-75"></span>
                </span>
              </div>

              <button
                className="p-4 bg-orange-500 rounded w-full"
                onClick={() => {
                  mintProduct(currData);
                  setCurrId(currData.id);
                }}
              >
                {currData.status === undefined && (
                  <div className="text-lg font-bold">Mint</div>
                )}
                {currData.status === 0 && (
                  <div className="text-lg font-bold">Minting</div>
                )}
                {currData.status === 1 && (
                  <div className="text-lg font-bold">Minted</div>
                )}
                {currData.id == currId && loading && <Loader />}
              </button>
            </div>
          )}

          <input
            className="inputBox"
            type="number"
            value={quantity}
            onChange={(e) => handleInput(e.target.value)}
          />

          <div id="domEl" ref={domEl} className="w-full text-center">
            <Image
              src={`https://fakestoreapi.com/img/${currData.x}`}
              height={250}
              width={250}
              alt={`image_${currData.id}`}
            />
          </div>
        </div>
      )}
    </div>
  );
};

export default CardBox;
