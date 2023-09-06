// Copyright 2022 @paritytech/contracts-ui authors & contributors
// SPDX-License-Identifier: GPL-3.0-only

import { createContext, useEffect, useContext, useState } from 'react';
import { useSearchParams } from 'react-router-dom';
import { web3Accounts, web3Enable, web3EnablePromise } from '@polkadot/extension-dapp';
import { WsProvider } from '@polkadot/api';
import { keyring } from '@polkadot/ui-keyring';
import { LOCAL_STORAGE_KEY, SELENDRA_CONTRACTS } from '../../constants';
import { ApiPromise, ApiState, ChainProperties, Account, Status, WeightV2 } from 'types';
import { isValidWsUrl, isKeyringLoaded, getChainProperties } from 'helpers';
import { useLocalStorage } from 'ui/hooks/useLocalStorage';
import { NoticeBanner } from 'ui/components/common/NoticeBanner';

export const ApiContext = createContext<ApiState | undefined>(undefined);

export const ApiContextProvider = ({ children }: React.PropsWithChildren<Partial<ApiState>>) => {
  const [searchParams] = useSearchParams();
  const rpcUrl = searchParams.get('rpc');
  const [preferredEndpoint, setPreferredEndpoint] = useLocalStorage<string>(
    LOCAL_STORAGE_KEY.PREFERRED_ENDPOINT,
    SELENDRA_CONTRACTS.rpc
  );
  const [api, setApi] = useState({} as ApiPromise);
  const [endpoint, setEndpoint] = useState(preferredEndpoint);
  const [accounts, setAccounts] = useState<Account[]>();
  const [chainProps, setChainProps] = useState<ChainProperties>();
  const [status, setStatus] = useState<Status>('loading');
  const [isSupported, setIsSupported] = useState(true);

  useEffect(() => {
    if (rpcUrl && isValidWsUrl(rpcUrl) && rpcUrl !== preferredEndpoint) {
      setEndpoint(rpcUrl);
      setPreferredEndpoint(rpcUrl);
      window.location.reload();
    }
  }, [preferredEndpoint, rpcUrl, searchParams, setPreferredEndpoint]);

  useEffect((): void => {
    setStatus('loading');
    const wsProvider = new WsProvider(endpoint);
    const _api = new ApiPromise({ provider: wsProvider });
    _api.on('connected', async () => {
      await _api.isReady;
      const _chainProps = await getChainProperties(_api);
      const w2 = _api.registry.createType<WeightV2>('Weight').proofSize;
      setApi(_api);
      setChainProps(_chainProps);
      setIsSupported(!!w2);
      setStatus('connected');
    });
    _api.on('disconnected', () => {
      setStatus('error');
    });
  }, [endpoint]);

  useEffect(() => {
    const getAccounts = async () => {
      if (status === 'connected' && chainProps) {
        !web3EnablePromise && (await web3Enable('contracts-ui'));
        const injectedAccounts = await web3Accounts();
        isKeyringLoaded() ||
          keyring.loadAll(
            { isDevelopment: chainProps.systemChainType.isDevelopment },
            injectedAccounts
          );
        setAccounts(keyring.getAccounts());
      }
    };
    getAccounts().catch(e => console.error(e));
  }, [chainProps, status]);

  return (
    <ApiContext.Provider
      value={{
        api,
        accounts,
        setEndpoint,
        endpoint,
        status,
        ...(chainProps as ChainProperties),
      }}
    >
      <NoticeBanner isVisible={!isSupported} endpoint={endpoint} />
      {children}
    </ApiContext.Provider>
  );
};

export const useApi = () => {
  const context = useContext(ApiContext);
  if (context === undefined) {
    throw new Error('useApi must be used within an ApiContextProvider');
  }
  return context;
};
