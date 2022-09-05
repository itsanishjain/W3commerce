import { ethers } from "ethers";
import { useState } from "react";
import { Box, Grid, Typography } from "@mui/material";
import { useAccount, useContract, useSigner, useNetwork } from "wagmi";
import MapCanvas from "./Canvas";
import { getProof } from "../../utils/createCoordinatesProof";
import { contractAddress, abi } from "../../utils/addressAndABI";

const landTypeArr = [
  {
    text: "Sold",
    color: "#00FF47",
  },
  {
    text: "Auction",
    color: "#FAFF00",
  },
  {
    text: "Sale",
    color: "#FF0000",
  },
];

const premiumTypeArr = [
  {
    text: "Ultra Premium",
    color: "#FFCBFF",
  },
  {
    text: "Premium",
    color: "#AE61F7",
  },
  {
    text: "Platinum",
    color: "#3B0073",
  },
];

export default function Map({ lands }) {
  const [currData, setCurrData] = useState({});
  const [landType, setLandType] = useState();
  const [premiumType, setPremiumType] = useState();

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

  const landPrice = { 1: "1", 2: "0.002", 3: "30" };
  const { isConnected } = useAccount();
  const { data: signer } = useSigner();
  const contract = useContract({
    addressOrName: contractAddress,
    contractInterface: abi,
    signerOrProvider: signer,
  });
  const mintLand = async (x, y, landType) => {
    console.log(landType);
    console.log(getProof(`${x},${y}:${landType}`));
    try {
      await (
        await contract.mintLand(
          x,
          y,
          landType,
          getProof(`${x},${y}:${landType}`),
          {
            value: ethers.utils.parseEther(landPrice[landType]),
            gasPrice: 100000,
          }
        )
      ).wait();
      toast.success("Successfully Minted");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <Box>
      <Grid container pt={8}>
        <Grid className="bg-green-500" item xl={2} lg={2} md={2} sm={2} xs={2}>
          <Box
            className=""
            p={2}
            sx={{ background: "#1C2128", overflowY: "auto", height: "93.2vh" }}
          >
            <Box
              className="bg-red-500"
              sx={{ background: "#343A43", borderRadius: "12px" }}
              p={2}
            >
              {landTypeArr?.map((res, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    background: landType === res ? "#252A34" : "",
                    p: 1,
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (landType === res) {
                      setLandType();
                    } else {
                      setLandType(res);
                    }
                  }}
                >
                  {res?.color && <div sx={{ mr: 1, color: res?.color }} />}
                  <Typography variant="body2">{res?.text}</Typography>
                </Box>
              ))}
            </Box>

            <Box
              sx={{ background: "#343A43", borderRadius: "12px" }}
              p={2}
              mt={4}
            >
              {premiumTypeArr?.map((res, idx) => (
                <Box
                  key={idx}
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    background: premiumType === res ? "#252A34" : "",
                    p: 1,
                    borderRadius: "8px",
                    cursor: "pointer",
                  }}
                  onClick={() => {
                    if (premiumType === res) {
                      setPremiumType();
                    } else {
                      setPremiumType(res);
                    }
                  }}
                >
                  {res?.color && <div sx={{ mr: 1, color: res?.color }} />}
                  <Typography variant="body2">{res?.text}</Typography>
                </Box>
              ))}
            </Box>
          </Box>
        </Grid>
        <Grid item xl={7} lg={7} md={7} sm={7} xs={7} onClick={leftHide}>
          <MapCanvas lands={lands} setCurrData={setCurrData} />
        </Grid>
        <Grid item xl={3} lg={3} md={3} sm={3} xs={3}>
          <Box
            p={2}
            sx={{ background: "#1C2128", overflowY: "auto", height: "93.2vh" }}
          >
            {/* <ContractConnect data={currData} /> */}

            {Object.keys(currData)?.length > 0 && (
              <div className="bg-blue-500">
                <Box
                  display="flex"
                  alignItems="center"
                  justifyContent="space-between"
                  mt={4}
                  mb={2}
                >
                  <Typography variant="h5">
                    {currData?.name?.split(" ")[0]}
                  </Typography>
                  <Typography variant="body1" color="lightgreen">
                    {currData?.price}
                  </Typography>
                </Box>
                <Box>
                  <Box mb={1}>
                    <Typography variant="body2" color="red">
                      Location
                    </Typography>
                  </Box>
                  <Box display="flex" gap={1}>
                    <div sx={{ color: "#72FF79" }} />
                    <Typography
                      variant="body1"
                      color="lightgreen"
                      sx={{ fontWeight: 600 }}
                    >
                      {currData?.x}, {currData?.y}
                    </Typography>
                  </Box>
                </Box>
                {isConnected && (
                  <button
                    className="p-4 bg-red-500 rounded"
                    onClick={() =>
                      mintLand(currData.x, currData.y, currData.landType)
                    }
                  >
                    Mint
                  </button>
                )}
              </div>
            )}
          </Box>
        </Grid>
      </Grid>
    </Box>
  );
}
