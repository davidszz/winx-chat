import { PropsWithChildren, useEffect } from 'react';

import { Circle } from '@components/spinners/Circle';

import { ButtonWrapper } from './styles';

interface Props {
  disabled?: boolean;
  loading?: boolean;
  backgroundColor?: string;
  textColor?: string;
  onClick?: () => void;
  onEnterKeyDown?: () => void;
}

export function Button({
  children,
  disabled,
  loading,
  backgroundColor,
  textColor,
  onClick,
  onEnterKeyDown,
}: PropsWithChildren<Props>) {
  useEffect(() => {
    function handleKeyDown(event: KeyboardEvent) {
      if (onEnterKeyDown && event.key === 'Enter') {
        onEnterKeyDown();
      }
    }

    window.addEventListener('keydown', handleKeyDown);

    return () => {
      window.removeEventListener('keydown', handleKeyDown);
    };
  }, [onEnterKeyDown]);

  function handleClick() {
    if (!disabled && !loading && onClick) {
      onClick();
    }
  }

  return (
    <ButtonWrapper
      disabled={disabled}
      backgroundColor={backgroundColor}
      textColor={textColor}
      onClick={handleClick}
    >
      {loading ? <Circle /> : children}
    </ButtonWrapper>
  );
}
