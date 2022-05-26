import styled from 'styled-components';
import { DeviceWidth } from '@utils/constants';

export const Container = styled.div<{ show: boolean }>`
  grid-area: UL;

  background: ${({ theme }) => theme.colors.backgroundSecondary};

  border-left: 1px solid ${({ theme }) => theme.colors.stroke};

  @media (max-width: ${DeviceWidth.Tablet}px) {
    position: absolute;

    height: 100%;
    width: 100%;
    max-width: 240px;

    right: 0;
    top: 46px;

    ${(props) => {
      if (props.show) {
        return '';
      }

      return `
        display: none;
      `;
    }};
  }
`;

export const BoxTitle = styled.h4`
  font-weight: 700;
  font-size: 0.75rem;

  padding: 6px;

  text-transform: uppercase;

  color: ${({ theme }) => theme.colors.textSecondary};
`;

export const BoxWrapper = styled.div`
  padding: 6px;
  width: 100%;

  max-height: calc(100vh - 46px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.backgroundTertiary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.backgroundPrimary};
  }
`;
