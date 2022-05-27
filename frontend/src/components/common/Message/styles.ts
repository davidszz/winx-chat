import styled from 'styled-components';

export const ContainerFull = styled.div`
  position: relative;

  display: flex;
  flex-direction: column;

  padding: 0 48px 0 68px;
  margin-top: 24px;
`;

export const Container = styled.div`
  display: flex;
  padding: 0 48px 0 68px;
`;

export const Avatar = styled.img`
  position: absolute;
  left: 16px;

  width: 38px;
  height: 38px;

  border-radius: 50%;

  cursor: pointer;
  user-select: none;
`;

export const Username = styled.h4`
  font-size: 0.875rem;
  font-weight: 600;
  font-family: 'Open Sans', 'Roboto', sans-serif;

  color: ${(props) => props.theme.colors.textPrimary};
  cursor: pointer;

  &:hover {
    text-decoration: underline;
  }
`;

export const Content = styled.div<{ pending?: boolean }>`
  text-align: left;

  font-size: 0.875rem;
  line-height: 1.2rem;
  font-family: 'Open Sans', 'Robot', sans-serif;

  opacity: ${(props) => (props.pending ? '.6' : '1')};

  white-space: pre-line;
  overflow-wrap: anywhere;
`;
