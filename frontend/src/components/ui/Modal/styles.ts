import styled from 'styled-components';

import { DeviceWidth } from '@utils/constants';

export const Wrapper = styled.div`
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  display: flex;
  align-items: center;
  justify-content: center;

  z-index: 999;

  background-color: rgba(0, 0, 0, 0.6);

  transition: opacity 200ms;

  &.transition-enter,
  &.transition-exit-active {
    opacity: 0;
  }
`;

export const ModalBody = styled.div<{ width?: number; height?: number }>`
  position: relative;

  max-width: ${(props) => (props.width ? `${props.width}px` : 'auto')};
  max-height: ${(props) => (props.height ? `${props.height}px` : 'auto')};

  width: ${(props) => (props.width ? '100%' : 'auto')};
  height: ${(props) => (props.height ? '100%' : 'auto')};

  @media (max-width: ${DeviceWidth.Mobile}px) {
    width: 100%;
    height: 100%;
    max-width: 100%;
    max-height: 100%;
  }

  transition: transform 200ms ease-in-out;

  ${Wrapper}.transition-enter > &,
  ${Wrapper}.transition-exit-active > & {
    transform: scale(0.8);
  }
`;
