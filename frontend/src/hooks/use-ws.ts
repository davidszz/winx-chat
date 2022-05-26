import { useContext } from 'react';
import { WebSocketContext } from '@contexts/websocket-context';

export function useWs() {
  return useContext(WebSocketContext);
}
