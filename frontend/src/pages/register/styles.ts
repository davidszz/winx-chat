import styled from 'styled-components';

import { DeviceWidth } from '@utils/constants';

export const Wrapper = styled.div`
  position: absolute;

  width: 100%;
  height: 100%;

  display: flex;
  justify-content: center;
  align-items: center;
`;

export const Container = styled.main`
  display: flex;
  flex-direction: column;

  background: ${(props) => props.theme.colors.backgroundTertiary};

  padding: 32px 16px 24px;

  max-width: 500px;
  width: 100%;

  @media (max-width: ${DeviceWidth.Tablet}px) {
    max-width: 100%;
    height: 100%;

    padding: 64px 24px 24px;
  }

  @media (max-width: ${DeviceWidth.Mobile}px) {
    padding: 64px 16px 16px;
  }
`;

export const Header = styled.header`
  width: 100%;

  display: flex;
  flex-direction: column;
  align-items: center;
`;

export const Logo = styled.img`
  width: 200px;

  margin-bottom: 16px;
`;

export const Content = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
  margin-bottom: 16px;
`;

export const InputLabel = styled.span`
  font-size: 0.7rem;
  line-height: 0.8rem;
  font-weight: 600;

  margin-bottom: 2px;
  margin-left: 4px;
  text-transform: uppercase;

  color: ${(props) => props.theme.colors.textHover};
`;

export const LoginLabel = styled.div`
  font-size: 0.875rem;
  text-align: center;
  margin-bottom: 16px;
`;
