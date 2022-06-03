import styled from 'styled-components';

import { DeviceWidth } from '@utils/constants';

export const UserListWrapper = styled.div<{ show: boolean }>`
  grid-area: UL;

  background-color: ${(props) => props.theme.colors.backgroundPrimary};
  border-left: 1px solid ${(props) => props.theme.colors.border};

  display: ${(props) => (props.show ? 'block' : 'none')};

  padding: 24px 6px 6px;

  overflow-y: auto;

  height: calc(100vh - 56px);

  @media (max-width: ${DeviceWidth.Tablet}px) {
    position: absolute;
    top: 56px;
    right: 0;

    width: 240px;
  }

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.backgroundSecondary};
    border-radius: 4px;
  }
`;

export const UsersContainer = styled.div`
  display: flex;
  flex-direction: column;

  margin-bottom: 16px;
`;

export const ContainerTitle = styled.h4`
  font-size: 0.7rem;
  font-weight: 600;

  color: ${(props) => props.theme.colors.textHover};
  opacity: 0.6;

  text-transform: uppercase;

  margin: 6px 0 6px 6px;
`;
