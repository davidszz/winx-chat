import { createContext, ReactNode, useEffect, useMemo, useState } from 'react';

import { api } from '@lib/api';

import { LoadingScreen } from '@components/screens/LoadingScreen';

export interface AuthContextValue {
  user?: APIUser;
  signIn: (email: string, password: string) => Promise<void>;
  logout: () => void;
}

export interface AuthProviderProps {
  children?: ReactNode;
}

interface APIAuthResponse {
  token: string;
  user: APIUser;
}

export const AuthContext = createContext({} as AuthContextValue);

export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<APIUser>();
  const [loadingUser, setLoadingUser] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      api
        .get<APIUser>('/users/@me')
        .then(({ data }) => {
          setUser({
            ...data,
            createdAt: new Date(data.createdAt),
          });
        })
        .catch(() => {})
        .finally(() => {
          setLoadingUser(false);
        });
    } else {
      setLoadingUser(false);
    }
  }, []);

  async function signIn(email: string, password: string) {
    const { data } = await api.post<APIAuthResponse>('/auth', { email, password });
    localStorage.setItem('token', data.token);
    setUser({
      ...data.user,
      createdAt: new Date(data.user.createdAt),
      updatedAt: new Date(data.user.updatedAt),
    });
  }

  function logout() {
    setUser(undefined);
    localStorage.removeItem('token');
  }

  const value = useMemo(() => ({ user, signIn, logout }), [user]);

  if (loadingUser) {
    return <LoadingScreen />;
  }

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}
