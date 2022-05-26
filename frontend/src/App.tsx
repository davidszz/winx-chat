import { BrowserRouter, Routes, Route, Outlet } from 'react-router-dom';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from '@contexts/auth-context';
import { WebSocketProvider } from '@contexts/websocket-context';
import GlobalStyles from '@styles/global';
import { theme as darkTheme } from '@styles/theme/dark';

import { WsCacheProvider } from '@contexts/ws-cache-context';
import { Home } from './pages/home';
import { Login } from './pages/login';

export function App() {
  return (
    <BrowserRouter>
      <ThemeProvider theme={darkTheme}>
        <GlobalStyles />
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
      </ThemeProvider>
    </BrowserRouter>
  );
}
