import styled from 'styled-components';
import { transparentize } from 'polished';
import { DeviceWidth } from '@utils/constants';

export const Container = styled.div`
  position: absolute;
  width: 100%;
  height: 100%;

  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;

  @media (max-width: ${DeviceWidth.Tablet}px) {
    justify-content: flex-start;
    padding-top: 80px;
  }
`;

export const Logo = styled.img`
  height: 164px;

  @media (max-width: ${DeviceWidth.Tablet}px) {
    height: 128px;
  }

  @media (max-width: ${DeviceWidth.Mobile}px) {
    height: 96px;
  }
`;

export const LoginContainer = styled.main`
  width: 100%;
  max-width: 400px;

  padding: 12px 16px;
  margin-top: 16px;

  display: flex;
  flex-direction: column;
  gap: 16px;
`;

export const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

export const InputLabel = styled.span`
  font-family: 'Poppins', 'Roboto', sans-serif;
  font-weight: 600;
  font-size: 0.75rem;

  margin-bottom: 4px;

  color: ${({ theme }) => theme.colors.brand};

  text-transform: uppercase;
`;

export const ErrorBox = styled.div`
  width: 100%;

  padding: 16px;

  border: 2px solid ${({ theme }) => theme.colors.red};
  background: ${({ theme }) => transparentize(0.8, theme.colors.red)};

  color: ${({ theme }) => theme.colors.textPrimary};

  font-size: 0.875rem;

  text-align: center;

  @media (max-width: ${DeviceWidth.Mobile}px) {
    padding: 8px;
  }
`;
