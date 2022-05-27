import { useContext } from 'react';

import { WsCacheContext } from '@contexts/ws-cache-context';

export function useWsCache() {
  return useContext(WsCacheContext);
}
