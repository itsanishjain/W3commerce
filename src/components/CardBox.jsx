import toast from "react-hot-toast";
import Image from "next/image";
import Loader from "./Loader";
import * as htmlToImage from "html-to-image";
import { StreamrClient } from "streamr-client";
import { providers, Contract, utils } from "ethers";
import { useState, useEffect, useRef, useContext } from "react";

import { STREAM_ID } from "../utils/consts";
import { UserContext } from "../context/UserContext";
import { contractAddress, abi } from "../utils/addressAndABI";
import { nftDotStorage, updateAndPublish } from "../utils/helpers";

const CardBox = ({ products, setProducts }) => {
  const { isLoggedIn, account, library, chainId } = useContext(UserContext);

  const domEl = useRef();
  const streamrRef = useRef();

  const [quantity, setQuantity] = useState(1);
  const [currData, setCurrData] = useState();
  const [loading, setLoading] = useState(false);
  const [currUsers, setCurrUsers] = useState([]);

  // Handle input
  const handleInput = (currentValue) => {
    let v = parseInt(currentValue);
    if (isNaN(v)) setQuantity(1);
    else if (v > 10) setQuantity(10);
    else if (v < 1) setQuantity(1);
    else setQuantity(v);
  };

  const UploadToIPFSForMetadata = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);
    const blob = new Blob([JSON.stringify(dataUrl, null, 2)], {
      type: "application/json",
    });
    await nftDotStorage(blob);
  };

  // Mint
  const mintProduct = async (product) => {
    setLoading(true);

    await updateAndPublish(product, 0, account, streamrRef);
    await UploadToIPFSForMetadata();

    if (library.connection.url !== "metamask") {
      library.provider.http.connection.url = RPC_NETWORK_URLS[chainId];
    }

    const provider = await library.provider;
    const web3Provider = new providers.Web3Provider(provider);

    const contract = new Contract(
      contractAddress,
      abi,
      web3Provider.getSigner()
    );

    const liveUsers = [...new Set(currUsers)].length + 1;
    const price = (100 / liveUsers).toString();

    try {
      await (
        await contract.mint(account, product.id, quantity, "0x", {
          value: utils.parseEther(price),
        })
      ).wait();
    } catch (error) {
      console.error(error);
      toast.error("Something went wrong");
    }

    setLoading(false);
  };

  useEffect(() => {
    streamrRef.current = new StreamrClient({
      auth: { privateKey: process.env.NEXT_PUBLIC_PK },
    });
    streamrRef.current
      .subscribe(STREAM_ID, (content) => {
        setCurrUsers((prev) => [...prev, content.user]);
        setProducts((prev) =>
          prev.map((x) => (x.id === content.id ? content : x))
        );
      })
      .then((res) => {})
      .catch((err) => console.error("ERROR"));
  }, [setProducts]);

  return (
    <div className="flex rounded-md bg-gradient-to-r from-yellow-200 to-yellow-400 mt-24">
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
                <span className="text-black">
                  Live users: {[...new Set(currUsers)].length}
                </span>
                <span className="flex h-3 w-3 ml-2">
                  <span className="animate-ping inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
                </span>
              </div>

              <button
                className="p-4 bg-orange-500 rounded w-full"
                onClick={() => {
                  mintProduct(currData);
                }}
              >
                {loading ? (
                  <Loader />
                ) : (
                  <div className="text-lg font-bold">Mint</div>
                )}
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
