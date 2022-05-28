import { nanoid } from 'nanoid';
import { createContext, ReactNode, useCallback, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';

import { useAuth } from '@hooks/use-auth';
import { useWs } from '@hooks/use-ws';
import { api } from '@lib/api';
import { OpCode, WSEvent } from '@utils/constants';
import { Util } from '@utils/util';

import { LoadingScreen } from '@components/screens/LoadingScreen';

export enum MessageStatus {
  Sended,
  Pending,
  Failed,
}

export interface AddPendingMessageData {
  user: APIUser;
  content: string;
  nonce: string;
}

export interface APIMessageWithStatus extends APIMessage {
  status: MessageStatus;
}

export interface WsCacheContextProps {
  children?: ReactNode;
}

export interface WsCacheContextValue {
  users: APIUser[];
  messages: APIMessageWithStatus[];
  addPendingMessage: (value: AddPendingMessageData) => void;
  addMessages: (value: APIMessageWithStatus[]) => void;
}

export const WsCacheContext = createContext({} as WsCacheContextValue);

export function WsCacheProvider({ children }: WsCacheContextProps) {
  const authInfo = useAuth();
  const { lastJsonMessage } = useWs();

  const [users, setUsers] = useState<APIUser[]>([]);
  const [messages, setMessages] = useState<APIMessageWithStatus[]>([]);
  const [loadingMessages, setLoadingMessages] = useState(true);

  const transformUser = (user: APIUser) => ({
    ...user,
    avatar: user.avatar ?? Util.getDefaultAvatarById(user.id),
    createdAt: new Date(user.createdAt),
  });

  const transformMessage = (message: APIMessage, status?: MessageStatus) => ({
    ...message,
    status: status ?? MessageStatus.Sended,
    author: transformUser(message.author),
    createdAt: new Date(message.createdAt),
  });

  const addMessages = useCallback((msgs: APIMessageWithStatus[], insertAfter = true) => {
    setMessages((state) => {
      const clone = state.map((x) => {
        const msg = msgs.find((m) => (x.nonce && x.nonce === m.nonce) || m.id === x.id);
        return msg ? transformMessage(msg) : x;
      });

      const remainingMsgs = msgs
        .filter((x) => !clone.some((m) => m.id === x.id))
        .map((x) => transformMessage(x, x.status));

      if (insertAfter) {
        return [...clone, ...remainingMsgs];
      }
      return [...remainingMsgs, ...clone];
    });
  }, []);

  useEffect(() => {
    async function fetchMessages() {
      await api
        .get('/messages', {
          params: {
            limit: 100,
          },
        })
        .then(({ data }) => {
          addMessages(
            data.results.sort(
              (a: any, b: any) => new Date(a.createdAt).getTime() - new Date(b.createdAt).getTime()
            )
          );
        })
        .catch((res) => {
          if (res.response?.status === 429 && res.response?.data?.retryAfter) {
            return new Promise((resolve) => {
              setTimeout(() => {
                resolve(fetchMessages());
              }, res.response.data.retryAfter);
            });
          }
          return null;
        });

      setLoadingMessages(false);
    }

    fetchMessages();
  }, []);

  useEffect(() => {
    if (lastJsonMessage.op === OpCode.Event) {
      if (lastJsonMessage.t === WSEvent.INITIAL_STATE) {
        setUsers(lastJsonMessage.d!.users.map((x: APIUser) => transformUser(x)));
      }

      if (lastJsonMessage.t === WSEvent.USER_CONNECTED) {
        const user = lastJsonMessage.d as APIUser;
        if (!users.some((x) => x.id === user.id)) {
          setUsers((state) => [...state, transformUser(user)]);
        }
      }

      if (lastJsonMessage.t === WSEvent.USER_DISCONNECTED) {
        const user = lastJsonMessage.d as APIUser;
        setUsers((state) => state.filter((x) => x.id !== user.id));
      }

      if (lastJsonMessage.t === WSEvent.MESSAGE_CREATE) {
        const message = lastJsonMessage.d as APIMessage;
        addMessages([transformMessage(message)]);
      }
    }
  }, [lastJsonMessage, setUsers, setMessages]);

  function addPendingMessage(data: AddPendingMessageData) {
    addMessages([
      transformMessage(
        {
          id: nanoid(),
          author: data.user,
          content: data.content,
          nonce: data.nonce,
          createdAt: new Date(),
        },
        MessageStatus.Pending
      ),
    ]);
  }

  const value = useMemo(
    () => ({ users, messages, addPendingMessage, addMessages }),
    [users, messages, addPendingMessage, addMessages]
  );

  if (!authInfo.user) {
    return <Navigate to="/login" />;
  }

  if (loadingMessages) {
    return <LoadingScreen />;
  }

  return <WsCacheContext.Provider value={value}>{children}</WsCacheContext.Provider>;
}
