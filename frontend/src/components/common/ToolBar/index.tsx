import { ReactNode } from 'react';

import { Container, Logo } from './styles';

export interface ToolBarProps {
  children?: ReactNode;
}

export function ToolBar({ children }: ToolBarProps) {
  return (
    <Container>
      <Logo src="/assets/images/winx.png" alt="Winx Logo" />
      {children}
    </Container>
  );
}
