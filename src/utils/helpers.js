import { connect } from "@tableland/sdk";
import mapdata from "./mapdata.json";

const timer = (ms) => new Promise((res) => setTimeout(res, ms));

export const createTable = async () => {
  // Establish a connection
  const tableland = await connect({
    network: "testnet",
    chain: "polygon-mumbai",
  });

  await tableland.siwe();

  const { name } = await tableland.create(
    `id integer, name text, x integer, y integer, size integer, landType integer, status integer, primary key (id)`
  );

  // Insert a row into the table

  // for (let i = 461; i < mapdata.length; i++) {
  //   console.log("i=", i);
  //   const writeRes = await tableland.write(
  //     `INSERT INTO ${name} (id, name, x, y, size, landType, status) VALUES (${i}, '',${mapdata[i].x},${mapdata[i].y},${mapdata[i].size},${mapdata[i].landType}, ${mapdata[i].status});`
  //   );
  //   await timer(0);
  // }
  // console.log(name);
  // name1 = "_80001_1434";
  const name2  = "_80001_1435"
  // Perform a read query, requesting all rows from the table
  const readRes = await tableland.read(`SELECT * FROM ${name};`);
  console.log(readRes);
};
