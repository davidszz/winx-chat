import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';

import { AuthProvider } from '@contexts/auth-context';
import { WebSocketProvider } from '@contexts/websocket-context';
import { WsCacheProvider } from '@contexts/ws-cache-context';

import { Home } from './pages/home';
import { Login } from './pages/login';

export function Router() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <Routes>
          <Route
            path="/"
            element={
              <WebSocketProvider>
                <WsCacheProvider>
                  <Outlet />
                </WsCacheProvider>
              </WebSocketProvider>
            }
          >
            <Route index element={<Home />} />
          </Route>
          <Route path="/login" element={<Login />} />
        </Routes>
      </AuthProvider>
    </BrowserRouter>
  );
}
