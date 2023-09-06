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
  rpc: 'wss://rpc.selendra.org',
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
