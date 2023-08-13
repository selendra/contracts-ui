// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import BN from 'bn.js';
import type { ApiState } from 'types';

export const LOCAL_STORAGE_KEY = {
  CUSTOM_ENDPOINT: 'contractsUiCustomEndpoint',
  PREFERRED_ENDPOINT: 'contractsUiPreferredEndpoint',
  THEME: 'theme',
} as const;

export type LocalStorageKey = (typeof LOCAL_STORAGE_KEY)[keyof typeof LOCAL_STORAGE_KEY];

export const SELENDRA_CONTRACTS = {
  relay: undefined,
  name: 'Selendra Live',
  rpc: 'wss://rpc0.selendra.org',
};

const CUSTOM_ENDPOINT = localStorage.getItem(LOCAL_STORAGE_KEY.CUSTOM_ENDPOINT);
export const LOCAL = {
  relay: undefined,
  name: 'Local Node',
  rpc: CUSTOM_ENDPOINT ? (JSON.parse(CUSTOM_ENDPOINT) as string) : 'ws://127.0.0.1:9944',
};

// https://docs.peaq.network/networks-overview
// const PEAQ_AGUNG = {
//   relay: 'Rococo',
//   name: 'Peaq Agung',
//   rpc: 'wss://wss.agung.peaq.network',
// };

const PHALA_TESTNET = {
  relay: undefined,
  name: 'Phala PoC-5',
  rpc: 'wss://poc5.phala.network/ws',
};

// https://docs.astar.network/docs/build/environment/endpoints
const SHIDEN = {
  relay: 'Kusama',
  name: 'Astar Shiden',
  rpc: 'wss://rpc.shiden.astar.network',
};

// https://docs.astar.network/docs/build/environment/endpoints
const ASTAR_SHIBUYA = {
  relay: 'Tokyo',
  name: 'Astar Shibuya',
  rpc: 'wss://rpc.shibuya.astar.network',
};

// https://docs.astar.network/docs/build/environment/endpoints
const ASTAR = {
  relay: 'Polkadot',
  name: 'Astar',
  rpc: 'wss://rpc.astar.network',
};

const SELENDRA_TESTNET = {
  relay: undefined,
  name: 'Selendra Testnet',
  rpc: 'wss://rpc-testnet.selendra.org',
};

const SELENDRA = {
  relay: undefined,
  name: 'Selendra',
  rpc: 'wss://rpc.selendra.org',
};

// https://docs.t3rn.io/collator/testnet/testnet-collator
const T3RN_T0RN = {
  relay: undefined,
  name: 'T3RN T0RN',
  rpc: 'wss://ws.t0rn.io',
};

// https://pendulum.gitbook.io/pendulum-docs/build/build-environment/foucoco-testnet
const PENDULUM_TESTNET = {
  relay: 'Rococo',
  name: 'Pendulum Testnet',
  rpc: 'wss://rpc-foucoco.pendulumchain.tech',
};

export const TESTNETS = [
  ...[
    SELENDRA_TESTNET,
    // PEAQ_AGUNG,
  ].sort((a, b) => a.name.localeCompare(b.name)),
  LOCAL,
];

export const MAINNETS = [SELENDRA].sort((a, b) => a.name.localeCompare(b.name));

export const DEFAULT_DECIMALS = 12;

export const MAX_CALL_WEIGHT = new BN(2_000_000_000_000);

export const NULL_CHAIN_PROPERTIES = {
  systemName: null,
  systemVersion: null,
  tokenDecimals: DEFAULT_DECIMALS,
  tokenSymbol: 'Unit',
};

export const INIT_STATE: ApiState = {
  ...NULL_CHAIN_PROPERTIES,
  endpoint: LOCAL.rpc,
  keyringStatus: null,
  error: null,
  status: 'CONNECT_INIT',
} as unknown as ApiState;
