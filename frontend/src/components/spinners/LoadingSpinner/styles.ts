import styled from 'styled-components';

export interface StyleProps {
  scale?: number;
  color?: string;
}

const scale = (size: string) => (props: StyleProps) => `calc(${size} * ${props.scale ?? 1})`;

export const Container = styled.div<StyleProps>`
  position: relative;

  width: ${scale('24px')};
  height: ${scale('24px')};

  border: ${scale('3px')} solid ${(props) => props.color ?? props.theme.colors.brand};
  border-radius: 50%;
  border-bottom-color: transparent;
  border-left-color: transparent;

  animation: spin infinite linear reverse 1s;

  @keyframes spin {
    from {
      transform: rotateZ(${scale('360deg')});
    }
    to {
      transform: rotateZ(${scale('0deg')});
    }
  }
`;
