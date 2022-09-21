import { connect } from "@tableland/sdk";
import { NFTStorage } from "nft.storage";

import data from "./product.json";
import { STREAM_ID, TABLE_NAME } from "./consts";
const NFT_STORAGE_TOKEN = process.env.NEXT_PUBLIC_NFT_DOT_STORAGE_API_KEY;

const client = new NFTStorage({ token: NFT_STORAGE_TOKEN });

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export const truncateAddress = (address) => {
  if (!address) return "No Account";

  const match = address.match(
    /^(0x[a-zA-Z0-9]{2})[a-zA-Z0-9]+([a-zA-Z0-9]{2})$/
  );

  if (!match) return address;

  return `${match[1]}…${match[2]}`;
};

export const nftDotStorage = async (img) => {
  try {
    const metadata = await client.store({
      attributes: [],
      description:
        "A Contract on a IPFS represent that you Join DeadLand succesfully, and in Future you actually own a piece of land in real world where we all dead people come and make us alive ",
      name: "Deadland",
      image: img,
    });
    console.log(metadata);
    return metadata;
  } catch (error) {
    console.log("NFT.PORT UPLOAD ERROR", error);
    return "ERROR_NFT_DOT_STORAGE";
  }
};

// Tableland and Streamr
// Establish a connection to tableland
const tableland = connect({
  network: "testnet",
  chain: "polygon-mumbai",
});

export const createTable = async () => {
  await tableland.siwe();

  const { name } = await tableland.create(
    `id integer, title text, image text, status integer primary key (id)`
  );

  for (let i = 0; i < data.length; i++) {
    await tableland.write(
      `INSERT INTO "${name}" (id, title, image, status) VALUES (${data[i].id},'${data[i].title}','${data[i].image}',-1);`
    );
    await timer(0);
  }
  // Perform a read query, requesting all rows from the table

  const readRes = await tableland.read(`SELECT * FROM ${name};`);

  console.log(readRes);
};

export const readTable = async () => {
  const readRes = await tableland.read(`SELECT * FROM ${TABLE_NAME};`);
  return readRes;
};

export const updateTable = async (id, status, account = "") => {
  await tableland.siwe();
  console.log(id, status, account);
  await tableland.write(`GRANT update on "_80001_2123" to '${account}' `);
};

export const updateAndPublish = async (
  product,
  newStatus,
  account,
  streamrRef
) => {
  await streamrRef.current.publish(STREAM_ID, {
    ...product,
    status: newStatus,
    user: account,
  });
};
