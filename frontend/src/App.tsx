import { ThemeProvider } from 'styled-components';

import { GlobalStyles } from '@styles/global';
import { light } from '@styles/themes';

import Routes from './router';

function App() {
  return (
    <ThemeProvider theme={light}>
      <GlobalStyles />
      <Routes />
    </ThemeProvider>
  );
}

export default App;
