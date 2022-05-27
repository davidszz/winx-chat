import styled from 'styled-components';

export const Container = styled.div<{ selected?: boolean }>`
  width: 100%;
  padding: 6px;

  border-radius: 4px;

  display: flex;
  align-items: center;

  cursor: pointer;
  user-select: none;

  transition: background-color 200ms;

  background-color: ${(props) => (props.selected ? props.theme.colors.backgroundTertiary : 'none')};

  &:hover {
    background-color: ${({ theme }) => theme.colors.backgroundTertiary};
  }
`;

export const Username = styled.span`
  font-size: 0.9rem;
  font-weight: 600;

  white-space: nowrap;
  text-overflow: ellipsis;
  overflow: hidden;

  font-family: 'Open Sans', 'Roboto', sans-serif;
`;

export const Avatar = styled.img`
  width: 32px;
  height: 32px;

  border-radius: 50%;

  margin-right: 8px;
`;
