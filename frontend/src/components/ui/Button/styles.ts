import * as polished from 'polished';
import styled from 'styled-components';
import tinycolor from 'tinycolor2';

interface ButtonProps {
  backgroundColor?: string;
  textColor?: string;
}

export const ButtonWrapper = styled.button<ButtonProps>`
  padding: 12px;

  display: flex;
  align-items: center;
  justify-content: center;

  font-family: 'Roboto', sans-serif;
  font-size: 0.9rem;
  font-weight: 500;

  border: none;
  outline: none;

  border-radius: 2px;

  ${(props) => {
    const bgColor = props.backgroundColor ?? props.theme.colors.brand;
    const textColor =
      props.textColor ??
      (tinycolor(bgColor).isDark() ? props.theme.colors.textLight : props.theme.colors.textDark);

    return `
      background-color: ${bgColor};
      color: ${textColor};
    `;
  }}

  cursor: pointer;

  transition: background-color 200ms;

  &:not(:disabled):hover {
    background: ${(props) => {
      const bgColor = props.backgroundColor ?? props.theme.colors.brand;
      return tinycolor(bgColor).isDark()
        ? polished.lighten(0.1, bgColor)
        : polished.darken(0.1, bgColor);
    }};
  }

  &:disabled {
    opacity: 0.6;
  }
`;
