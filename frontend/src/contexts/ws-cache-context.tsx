import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';
import { Navigate } from 'react-router-dom';
import { useAuth } from '@hooks/use-auth';
import { useWs } from '@hooks/use-ws';
import { AuthLevel, DefaultAvatars, OpCode, WSEvent } from '@utils/constants';
import { APIMessage, APIUser } from '@lib/api-types';

export interface CachedUser {
  _id: string;
  username: string;
  email: string;
  avatar: string;
  createdAt: Date;
  authLevel?: AuthLevel;
}

export interface CachedMessage {
  _id: string;
  content: string;
  user: CachedUser;
  createdAt: Date;
}

export interface WsCacheContextProps {
  children?: ReactNode;
}

export interface WsCacheContextValue {
  users: CachedUser[];
  messages: CachedMessage[];
}

export const WsCacheContext = createContext({} as WsCacheContextValue);

export function WsCacheProvider({ children }: WsCacheContextProps) {
  const authInfo = useAuth();
  const [users, setUsers] = useState<CachedUser[]>([]);
  const [messages, setMessages] = useState<CachedMessage[]>([]);

  const { lastJsonMessage } = useWs();

  const transformCachedUser = (user: APIUser) => ({
    ...user,
    avatar: user.avatar ?? DefaultAvatars[0],
  });

  const transformCachedMessage = (message: APIMessage) => ({
    ...message,
    user: transformCachedUser(message.user),
    createdAt: new Date(message.createdAt),
  });

  useEffect(() => {
    if (lastJsonMessage.op === OpCode.Event) {
      if (lastJsonMessage.t === WSEvent.INITIAL_STATE) {
        setUsers(
          lastJsonMessage.d!.users.map((x: APIUser) => ({
            ...x,
            avatar: x.avatar ?? DefaultAvatars[0],
          }))
        );
      }

      if (lastJsonMessage.t === WSEvent.USER_CONNECTED) {
        const user = lastJsonMessage.d as APIUser;
        if (!users.some((x) => x._id === user._id)) {
          setUsers((state) => [...state, transformCachedUser(user)]);
        }
      }

      if (lastJsonMessage.t === WSEvent.USER_DISCONNECTED) {
        const user = lastJsonMessage.d as APIUser;
        setUsers((state) => state.filter((x) => x._id !== user._id));
      }

      if (lastJsonMessage.t === WSEvent.MESSAGE_CREATE) {
        const message = lastJsonMessage.d as APIMessage;
        setMessages((state) => [...state, transformCachedMessage(message)]);
      }
    }
  }, [lastJsonMessage]);

  const value = useMemo(() => ({ users, messages }), [users, messages]);

  if (!authInfo.user) {
    return <Navigate to="/login" />;
  }

  return <WsCacheContext.Provider value={value}>{children}</WsCacheContext.Provider>;
}
