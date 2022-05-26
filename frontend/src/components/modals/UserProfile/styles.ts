import styled from 'styled-components';

export const Container = styled.div`
  position: relative;

  width: 100%;
  height: 100%;

  border-radius: 8px;

  overflow: hidden;

  background: ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const Background = styled.div`
  width: 100%;
  height: 120px;

  background-color: ${({ theme }) => theme.colors.brand};
`;

export const UserContent = styled.div`
  padding: 60px 16px 32px;
`;

export const UserAvatar = styled.img`
  position: absolute;
  top: 60px;

  width: 120px;
  height: 120px;

  border-radius: 100%;

  border: 6px solid ${({ theme }) => theme.colors.backgroundPrimary};
`;

export const Username = styled.div`
  display: flex;
  align-items: center;

  font-size: 1.2rem;
  font-weight: 800;
  font-family: 'Poppins', 'Open Sans', sans-serif;
`;

export const UserTag = styled.span`
  font-size: 0.7rem;
  font-weight: 600;
  font-family: 'Open Sans', sans-serif;

  line-height: 0.9rem;
  text-transform: uppercase;

  margin-left: 8px;
  padding: 2px 6px;

  background-color: ${(props) => props.color};

  border-radius: 6px;
`;
