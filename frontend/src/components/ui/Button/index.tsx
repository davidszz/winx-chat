import { ReactNode } from 'react';

import { LoadingSpinner } from '@components/spinners/LoadingSpinner';

import { Container, StyleProps } from './styles';

interface Props extends StyleProps {
  children?: ReactNode;
  disabled?: boolean;
  loading?: boolean;
  onClick?: () => void;
}

export function Button({ children, loading, onClick, ...props }: Props) {
  function handleClick() {
    if (onClick && !loading && !props.disabled) {
      onClick();
    }
  }

  return (
    <Container disabled={loading || props.disabled} {...props} onClick={handleClick}>
      {loading ? <LoadingSpinner /> : children}
    </Container>
  );
}
