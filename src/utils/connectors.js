import { InjectedConnector } from "@web3-react/injected-connector";
import { WalletConnectConnector } from "@web3-react/walletconnect-connector";

import { UAuthConnector } from "@uauth/web3-react";

import {
  ALCHEMY_POLYGON_MAINNET_URL,
  ALCHEMY_POLYGON_MUMBAI_URL,
} from "./consts";

const injected = new InjectedConnector({
  supportedChainIds: [37, 80001],
});

const ALL_SUPPORTED_CHAIN_IDS = [37, 80001];

export const RPC_NETWORK_URLS = {
  137: ALCHEMY_POLYGON_MAINNET_URL,
  80001: ALCHEMY_POLYGON_MUMBAI_URL,
};

const walletConnect = new WalletConnectConnector({
  supportedChainIds: ALL_SUPPORTED_CHAIN_IDS,
  rpc: RPC_NETWORK_URLS,
  bridge: "https://bridge.walletconnect.org",
  qrcode: true,
});

// Uauth

export const uauth = new UAuthConnector({
  clientID: "6cdd592b-60b5-4bb5-b8aa-17f7a85f11a2",
  redirectUri: "https://w3commerce.vercel.app",
  // postLogoutRedirectUri: "http://127.0.0.1:3000",
  // Scope must include openid and wallet
  scope: "openid wallet",

  // Injected and walletconnect connectors are required.
  connectors: { injected, walletConnect },
});

export const connectors = { injected, walletConnect, uauth };
