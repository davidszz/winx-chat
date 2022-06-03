import 'styled-components';
import type { Theme } from '@styles/theme';

declare module 'styled-components' {
  interface DefaultTheme extends Theme {}
}
