import { connect } from "@tableland/sdk";
import { NFTStorage, File, Blob } from "nft.storage";

import mapdata from "./mapdata.json";

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

// Establish a connection
const tableland = connect({
  network: "testnet",
  chain: "polygon-mumbai",
});

const TABLE_NAME = "_80001_1434";
const STREAM_ID = "0x2ea3bf6b653375fb8facfb67f19937e46840a7d4/lands/";

export const createTable = async () => {
  await tableland.siwe();

  const { name } = await tableland.create(
    `id integer, name text, x integer, y integer, size integer, landType integer, status integer, primary key (id)`
  );

  // Insert a row into the table

  for (let i = 0; i < mapdata.length; i++) {
    await tableland.write(
      `INSERT INTO ${name} (id, name, x, y, size, landType, status) VALUES (${i}, '',${mapdata[i].x},${mapdata[i].y},${mapdata[i].size},${mapdata[i].landType}, ${mapdata[i].status});`
    );
    await timer(0);
  }
  // Perform a read query, requesting all rows from the table
  const readRes = await tableland.read(`SELECT * FROM ${name};`);
  console.log(readRes);
};

export const readTable = async () => {
  const readRes = await tableland.read(`SELECT * FROM ${TABLE_NAME};`);
  return readRes.rows.map((item) => ({
    id: item[0],
    name: item[1],
    x: item[2],
    y: item[3],
    size: item[4],
    landType: item[5],
    status: item[6],
  }));
};

//  `UPDATE ${TABLE_NAME} SET status = ${status}, name = ${account} WHERE id = ${id};`

export const updateTable = async (id, status, account = "") => {
  await tableland.siwe();
  console.log(id, status, account);
  await tableland.write(
    `UPDATE ${TABLE_NAME} SET status = 855 WHERE id = 178;`
  );
};

export const updateAndPublish = async (
  land,
  newStatus,
  account,
  streamrRef
) => {
  await updateTable(land.id, newStatus, account);
  await streamrRef.current.publish(STREAM_ID, {
    ...land,
    status: newStatus,
    name: account,
  });
};

const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_DOT_STORAGE_API_KEY;

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });
export const nftDotStorage = async (img) => {
  try {
    const metadata = await client.store({
      attributes: [],
      description:
        "A Contract on a IPFS represent that you Join DeadLand succesfully, and in Future you actually own a piece of land in real world where we all dead people come and make us alive ",
      name: "Deadland",
      image: img,
    });
    return metadata;
  } catch (error) {
    console.log("NFT.PORT UPLOAD ERROR", error);
    return "ERROR_NFT_DOT_STORAGE";
  }
};
