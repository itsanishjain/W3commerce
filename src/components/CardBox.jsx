import Image from "next/image";
import Loader from "./Loader";
import { useState, useEffect, useRef } from "react";
import { useAccount, useContract, useSigner } from "wagmi";
import toast from "react-hot-toast";
import { Box, Grid, Typography } from "@mui/material";

import { StreamrClient } from "streamr-client";

import { landStatus, landType, STREAM_ID } from "../utils/consts";
import { contractAddress, abi } from "../utils/addressAndABI";
import { createTable, nftDotStorage, updateAndPublish } from "../utils/helpers";

const CardBox = ({ products, setProducts }) => {
  const streamrRef = useRef();

  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();
  const [currData, setCurrData] = useState();
  const [currId, setCurrId] = useState();
  const [loading, setLoading] = useState(false);

  // Contract init
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: abi,
    signerOrProvider: signer,
  });

  // Mint
  const mintProduct = async (product) => {
    console.log({ product });

    try {
      setLoading(true);
      // await updateAndPublish(product, 0, address, streamrRef);
      await nftDotStorage(product.image);
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
        setProducts((prev) =>
          prev.map((x) => (x.id === content.id ? content : x))
        );
        setCurrData({ ...content });
      })
      .then((res) => {
        console.log("subscribe", res);
      })
      .catch((err) => console.error(err));
  }, [setProducts]);

  return (
    <div className="flex rounded-md">
      <div
        className="text-white max-w-3xl mx-auto grid 
    grid-row-1 gap-8 p-2 md:grid-cols-3 md:gap-4"
      >
        {products.map((item, index) => (
          <div
            key={index}
            className="cursor-pointer text-center"
            onClick={() => {
              setCurrData(item);
              console.log(item);
            }}
          >
            <Image
              src={`https://fakestoreapi.com/img/${item.x}`}
              height={250}
              width={250}
              alt={`image_${item.id.tokenId}`}
            />
            <div className="text-md font-bold">{item.name}</div>
          </div>
        ))}
      </div>

      {currData && (
        <div className="cardBox rounded-md p-2 space-y-4 w-80 h-64 m-4">
          <div className="bg-orange-300 rounded-md p-2 space-y-4">
            <Box
              display="flex"
              alignItems="center"
              justifyContent="space-between"
            >
              <Typography variant="body1" color="">
                <div className="text-black">{currData?.name}</div>
              </Typography>
              <Typography variant="body1" color="">
                <div className="text-black">{currData?.user}</div>
              </Typography>
            </Box>
          </div>
          {isConnected && (
            <div>
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
        </div>
      )}
    </div>
  );
};

export default CardBox;
