import styled from 'styled-components';

export interface StyleProps {
  backgroundColor?: string;
  hasError?: boolean;
}

export const Wrapper = styled.div<{ disabled?: boolean }>`
  display: flex;
  flex-direction: column;

  ${({ disabled }) => {
    if (disabled) {
      return `
        opacity: 0.6;
        cursor: not-allowed;
        user-select: none;
      `;
    }

    return '';
  }}
`;

export const Container = styled.div<StyleProps>`
  position: relative;

  display: flex;

  background: ${({ backgroundColor, theme }) =>
    backgroundColor ?? theme.colors.backgroundSecondary};
  box-shadow: 0 0 0 2px transparent;

  ${({ hasError, theme }) => {
    if (hasError) {
      return `
        box-shadow: 0 0 0 2px ${theme.colors.red};
      `;
    }

    return `
      &:focus-within {
        transition: box-shadow 300ms;
        box-shadow: 0 0 0 2px ${theme.colors.brand};
      }
    `;
  }};
`;

export const IconWrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  display: flex;
  align-items: center;
  justify-content: center;

  height: 100%;
  width: 42px;
  color: ${({ theme }) => theme.colors.brand};
`;

export const Input = styled.input`
  border: none;
  outline: none;

  background: none;

  padding: 12px;
  padding-left: 46px;
  font-size: 0.85rem;

  width: 100%;

  color: ${({ theme }) => theme.colors.brand};

  &::placeholder {
    color: ${({ theme }) => theme.colors.brand};
    opacity: 0.6;
  }

  &:disabled {
    cursor: not-allowed;
  }
`;

export const ErrorSpan = styled.span`
  margin-top: 6px;

  font-family: 'Roboto', sans-serif;
  font-size: 0.75rem;
  line-height: 0.9rem;

  color: ${({ theme }) => theme.colors.red};
`;
