import { ethers } from "ethers";
import toast from "react-hot-toast";
import CoinGecko from "coingecko-api";
import * as htmlToImage from "html-to-image";
import { StreamrClient } from "streamr-client";
import { Box, Grid, Typography } from "@mui/material";
import { useEffect, useState, useRef } from "react";
import { useAccount, useContract, useSigner } from "wagmi";

import { getProof } from "../../utils/createCoordinatesProof";
import { updateAndPublish } from "../../utils/helpers";
import { contractAddress, abi } from "../../utils/addressAndABI";

import Loader from "../Loader";
import MapCanvas from "./Canvas";
import LandTile from "./LandTile";

import { Stage, Layer } from "react-konva";

import { landStatus, landType, STREAM_ID } from "../../utils/consts";

export default function Map({ lands, setLands }) {
  const streamrRef = useRef();
  const domEl = useRef();

  const [currData, setCurrData] = useState({});
  const [loading, setLoading] = useState(false);

  const downloadImage = async () => {
    const dataUrl = await htmlToImage.toPng(domEl.current);
    console.log(dataUrl);

    // // download image
    // const link = document.createElement('a');
    // link.download = "html-to-img.png";
    // link.href = dataUrl;
    // link.click();
  };

  const leftHide = () => {
    const hide = document.getElementById("r-menu");

    if (hide) {
      if (hide.style.display === "none") {
        hide.style.display = "block";
        hide.style.transition = "10s ease-in-out";
      } else {
        hide.style.display = "block";
      }
    }
  };

  const landPrice = { 1: "0.001", 2: "0.002", 3: "0.003" };
  const { isConnected, address } = useAccount();
  const { data: signer } = useSigner();

  // Contract init
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: abi,
    signerOrProvider: signer,
  });

  // Mint
  const mintLand = async (land) => {
    console.log({ land });
    // database and stremer code to make land status pending

    // const CoinGeckoClient = new CoinGecko();
    // let data = await CoinGeckoClient.coins.fetch("bitcoin", {});
    // let data = await CoinGeckoClient.coins.all;

    // console.log(data.data.tickers[0].converted_last["usd"]);

    // return;

    try {
      setLoading(true);
      await updateAndPublish(land, 0, address, streamrRef);
      return;
      await (
        await contract.mintLand(
          land.x.toString(),
          land.y.toString(),
          land.landType,
          getProof(`${land.x},${land.y}:${land.landType}`),
          {
            value: ethers.utils.parseEther(landPrice[land.landType]),
          }
        )
      ).wait();
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
        setLands((prev) =>
          prev.map((x) => (x.id === content.id ? content : x))
        );
        setCurrData(content);
      })
      .then((res) => {
        console.log("subscribe", res);
      })
      .catch((err) => console.error(err));
  }, [setLands]);

  return (
    <Box>
      <Grid container pt={8}>
        {/* LEFT */}
        <Grid item xl={2} lg={2} md={2} sm={2} xs={2}>
          <Box p={2} sx={{ overflowY: "auto", height: "93.2vh" }}>
            <Box
              className="bg-orange-300"
              sx={{ background: "#343A43", borderRadius: "12px" }}
              p={2}
            >
              {landStatus?.map((res, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    p: 1,
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  {res?.color && <div sx={{ mr: 1, color: res?.color }} />}
                  <Typography variant="body2">{res?.text}</Typography>
                </Box>
              ))}
            </Box>

            <Box
              className="bg-orange-300"
              sx={{ borderRadius: "12px" }}
              p={2}
              mt={4}
            >
              {landType?.map((res, idx) => (
                <Box
                  className="mb-2 text-gray-100"
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    background: res.color,
                    p: 1,
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                >
                  <Typography variant="body2">{res?.text}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>

        {/* CENTER */}
        {/* <Grid item xl={7} lg={7} md={7} sm={7} xs={7} onClick={leftHide}>
          <MapCanvas lands={lands} setCurrData={setCurrData} />
        </Grid> */}

        {/* RIGHT */}
        {/* <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
          <Box p={2} sx={{ overflowY: "auto", height: "93.2vh" }}>
            {Object.keys(currData)?.length > 0 && (
              <div className="bg-orange-300 rounded-md p-2 space-y-4">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                >
                  <Typography variant="body1" color="">
                    <span className="text-black">{currData?.price}</span>
                  </Typography>
                </Box>
                <Box>
                  <Box>
                    <div className="mb-4 text-xl font-bold text-black">
                      Location
                    </div>
                  </Box>
                  <Box display="flex">
                    <div sx={{ color: "red" }} />
                    <Typography variant="body1" sx={{ fontWeight: 600 }}>
                      <span className="text-black">
                        {currData?.x}, {currData?.y}
                      </span>
                    </Typography>
                  </Box>
                </Box>
                {isConnected && (
                  <button
                    className="p-4 bg-orange-500 rounded w-full"
                    onClick={() => mintLand(currData)}
                  >
                    {currData.status === -1 && (
                      <span className="text-lg font-bold">Mint</span>
                    )}
                    {currData.status === 0 && (
                      <span className="text-lg font-bold">Minting</span>
                    )}
                    {currData.status === 1 && (
                      <span className="text-lg font-bold">Minted</span>
                    )}
                    {loading && <Loader />}
                  </button>
                )}

                <button onClick={downloadImage}>Download Image</button>

                <div className="bg-yellow-300" id="domEl" ref={domEl}>
                  <Stage
                    width={(7 * window.innerWidth) / 12}
                    height={(7.97 * window.innerHeight) / 15}
                  >
                    <Layer>
                      <LandTile
                        data={currData}
                        index={1}
                        setCurrData={() => {}}
                        eid={0}
                        setId={() => {}}
                      />
                    </Layer>
                  </Stage>
                </div>
              </div>
            )}
          </Box>
        </Grid> */}
      </Grid>
    </Box>
  );
}
