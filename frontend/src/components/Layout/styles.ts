import { DeviceWidth } from '@utils/constants';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  display: grid;

  grid-template-columns: auto 240px;
  grid-template-rows: 46px auto;

  grid-template-areas:
    'TB TB'
    'ML UL';

  @media (max-width: ${DeviceWidth.Tablet}px) {
    grid-template-areas:
      'TB TB'
      'ML ML';
  }
`;

export const UserListToggleBtn = styled.div`
  margin-left: auto;

  height: 36px;
  width: 36px;

  display: flex;
  align-items: center;
  justify-content: center;

  cursor: pointer;
  user-select: none;

  @media (min-width: ${DeviceWidth.Tablet}px) {
    display: none;
  }
`;
