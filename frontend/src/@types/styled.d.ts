import 'styled-components';
import { Theme } from '@styles/theme/dark';

declare module 'styled-components' {
  export interface DefaultTheme extends Theme {}
}
