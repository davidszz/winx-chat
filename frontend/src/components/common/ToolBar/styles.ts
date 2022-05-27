import styled from 'styled-components';

export const Container = styled.div`
  grid-area: TB;

  background-color: ${({ theme }) => theme.colors.backgroundPrimary};

  border-bottom: 1px solid ${({ theme }) => theme.colors.stroke};

  display: flex;
  align-items: center;

  padding: 0 16px;
`;

export const Logo = styled.img`
  height: 32px;
  width: auto;
`;
