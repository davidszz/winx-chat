import styled from 'styled-components';

export interface StyleProps {
  backgroundColor?: string;
}

export const Container = styled.button<StyleProps>`
  border: none;
  outline: none;

  display: flex;
  align-items: center;
  justify-content: center;

  padding: 12px 16px;

  background-color: ${(props) => props.backgroundColor ?? props.theme.colors.brand};

  color: ${({ theme }) => theme.colors.brandText};

  font-family: 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 1rem;

  cursor: pointer;

  transition: background-color 200ms;

  &:not(:disabled):hover {
    color: #fff;
    background-color: ${(props) => props.theme.colors.brandHover};
  }

  &:disabled {
    cursor: not-allowed;
    opacity: 0.6;
  }
`;
