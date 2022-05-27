import { ThemeProvider } from 'styled-components';

import GlobalStyles from '@styles/global';
import { theme as darkTheme } from '@styles/theme/dark';

import { Router } from './router';

export function App() {
  return (
    <ThemeProvider theme={darkTheme}>
      <GlobalStyles />
      <Router />
    </ThemeProvider>
  );
}
