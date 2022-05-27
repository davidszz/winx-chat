import { createContext, ReactNode, useEffect, useMemo, useRef, useState } from 'react';
import { Navigate } from 'react-router-dom';
import useWebSocket, { ReadyState } from 'react-use-websocket';

import { useAuth } from '@hooks/use-auth';
import { OpCode, WSEvent, CloseEventCode } from '@utils/constants';

import { LoadingScreen } from '@components/screens/LoadingScreen';

export interface WebSocketMessage {
  [key: string]: any;
  op: OpCode;
  d?: Record<string, any>;
  t?: WSEvent;
}

export interface WebSocketContextValue {
  readyState?: ReadyState;
  lastJsonMessage: WebSocketMessage;
}

export interface WebSocketContextProps {
  children?: ReactNode;
}

const log = (text: string) => console.log(`%c[Winx]%c ${text}`, 'color: #f542ce;', '');

export const WebSocketContext = createContext({} as WebSocketContextValue);

export function WebSocketProvider({ children }: WebSocketContextProps) {
  const [socketUrl, setSocketUrl] = useState<string | null>(null);
  const [wsConnected, setWsConnected] = useState(false);

  const heartbeatRef = useRef<NodeJS.Timeout>();

  const { user } = useAuth();
  const { sendJsonMessage, lastJsonMessage, readyState } = useWebSocket<WebSocketMessage>(
    socketUrl,
    {
      shouldReconnect: (event) => {
        const unavailableCodes: number[] = [CloseEventCode.AlreadyAuth, CloseEventCode.AuthFailed];
        return unavailableCodes.indexOf(event.code) === -1;
      },
      onOpen: () => {
        log('[Socket] -> Trying to connect...');
        sendJsonMessage({
          op: OpCode.Identify,
          d: {
            token: `${localStorage.getItem('token')}`,
          },
        });
      },
      onClose: () => {
        clearInterval(heartbeatRef.current);
      },
      reconnectInterval: 3000,
      reconnectAttempts: 10,
    }
  );

  useEffect(() => {
    if (user) {
      setSocketUrl(process.env.REACT_APP_WEBSOCKET_URL);
    } else {
      setSocketUrl(null);
    }
  }, [user]);

  useEffect(() => {
    if (lastJsonMessage) {
      if (lastJsonMessage.op === OpCode.Hello) {
        log('[Socket] Connected to websocket!');
        setWsConnected(true);

        clearInterval(heartbeatRef.current);
        heartbeatRef.current = setInterval(() => {
          log('[Socket] -> Sent Heartbeat');
          sendJsonMessage({ op: OpCode.Heartbeat });
        }, lastJsonMessage.d!.heartbeatInterval);
      }
    }
  }, [lastJsonMessage]);

  const value = useMemo(
    () => ({ readyState, lastJsonMessage: lastJsonMessage as unknown as WebSocketMessage }),
    [readyState, lastJsonMessage]
  );

  if (!user) {
    return <Navigate to="/login" />;
  }

  if (!wsConnected || readyState !== ReadyState.OPEN) {
    return <LoadingScreen />;
  }

  return <WebSocketContext.Provider value={value}>{children}</WebSocketContext.Provider>;
}
