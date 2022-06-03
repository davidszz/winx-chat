import styled, { keyframes } from 'styled-components';

interface CircleSpinnerProps {
  scale: number;
}

const size = (props: CircleSpinnerProps) => `${16 * props.scale}px`;

export const spinningAnimation = keyframes`
  from {
    transform: rotate(0deg);
  } to {
    transform: rotate(360deg);
  }
`;

export const CircleWrapper = styled.div<CircleSpinnerProps>`
  width: ${size};
  height: ${size};
  max-width: ${size};
  min-width: ${size};
  max-height: ${size};
  min-height: ${size};

  border: ${(props) => props.scale * 2}px solid
    ${(props) => props.color ?? props.theme.colors.textPrimary};
  border-left-color: transparent;
  border-bottom-color: transparent;
  border-radius: 50%;

  animation: ${spinningAnimation} infinite linear 400ms;
`;
