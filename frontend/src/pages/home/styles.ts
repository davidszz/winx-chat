import styled from 'styled-components';

import { DeviceWidth } from '@utils/constants';

export const Wrapper = styled.main<{ hideUserList: boolean }>`
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;

  width: 100%;
  height: 100%;

  display: grid;

  grid-template-columns: auto 240px;
  grid-template-rows: 56px auto;
  grid-template-areas:
    'TB TB'
    'CT UL';

  ${(props) => {
    if (props.hideUserList) {
      return `
        grid-template-areas:
          'TB TB'
          'CT CT';
      `;
    }
    return '';
  }}

  @media (max-width: ${DeviceWidth.Tablet}px) {
    grid-template-areas:
      'TB TB'
      'CT CT';
  }
`;
