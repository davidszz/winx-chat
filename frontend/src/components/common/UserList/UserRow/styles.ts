import styled from 'styled-components';

export const User = styled.div<{ offline: boolean }>`
  display: flex;
  align-items: center;

  padding: 6px 12px;

  border: 2px;
  border-radius: 4px;

  opacity: ${(props) => (props.offline ? '.6' : '1')};

  cursor: pointer;
  user-select: none;

  transition: background-color 200ms;

  &:hover {
    background-color: ${(props) => props.theme.colors.backgroundSecondary};
  }
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;

  border-radius: 50%;
`;

export const UsernameWrapper = styled.div`
  display: flex;
  flex-direction: column;

  overflow: hidden;

  margin-left: 8px;
`;

export const Username = styled.div`
  font-size: 0.875rem;
  font-weight: 500;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;

export const Status = styled.div`
  font-size: 0.7rem;
  font-weight: 400;

  color: ${(props) => props.theme.colors.textPrimary};
  opacity: 0.7;

  overflow: hidden;
  white-space: nowrap;
  text-overflow: ellipsis;
`;
