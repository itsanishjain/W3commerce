import { connect } from "@tableland/sdk";
import { data } from "autoprefixer";
import { NFTStorage } from "nft.storage";

import product from "./product.json";

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

// Establish a connection
const tableland = connect({
  network: "testnet",
  chain: "polygon-mumbai",
});

const TABLE_NAME = "_80001_2123";
const STREAM_ID = "0x2ea3bf6b653375fb8facfb67f19937e46840a7d4/lands/";

export const createTable = async () => {
  await tableland.siwe();

  const { name } = await tableland.create(
    `id integer, title text, image text, primary key (id)`
  );

  console.log(name);
  console.log(product);

  for (let i = 0; i < data.length; i++) {
    await tableland.write(
      `INSERT INTO ${name} (id, title) VALUES (1,'backpack laptop');`
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

export const updateTable = async (id, status, account = "") => {
  await tableland.siwe();
  console.log(id, status, account);
  await tableland.write(`GRANT update on "_80001_2123" to '${account}' `);
  await tableland.write(`UPDATE "_80001_2123" SET status = 100 WHERE id = 1;`);
  console.log("Table updated");
};

// x =  [-29,-20]
// y =  [20,1]

export const getXY = (xi, yi) => {
  let calX = xi;
  let calY = yi;
  if (xi < -29) calX = -29;
  if (xi > -20) calX = -20;
  if (yi < 1) calY = 1;
  if (yi > 20) calY = 20;
  return { calX, calY };
};

export const updateAndPublish = async (
  product,
  newStatus,
  account,
  streamrRef
) => {
  await updateTable(product.id, newStatus, account);
  await streamrRef.current.publish(STREAM_ID, {
    ...product,
    status: newStatus,
    user: account,
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
