import { MerkleTree } from "merkletreejs";
import keccak256 from "keccak256";

import whiteListedcoordinatees from "./cood.json";

const leaves = whiteListedcoordinatees
  .slice(0, 460)
  .map((coordinate) => keccak256(coordinate));
const tree = new MerkleTree(leaves, keccak256, { sortPairs: true });
const proof = (leaf) => tree.getProof(leaf);
const leaf = (coordinate) => keccak256(coordinate);
const bufToHex = (x) => "0x" + x.toString("hex");
const getProofList = (proof) => proof.map((x) => bufToHex(x.data));

export const getProof = (coordinate) => getProofList(proof(leaf(coordinate)));
