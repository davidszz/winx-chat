import styled from 'styled-components';

export const Wrapper = styled.div`
  display: flex;
  align-items: center;

  padding: 6px 12px;

  &:hover {
    background-color: rgba(0, 0, 0, 0.1);
  }
`;

export const Avatar = styled.img`
  width: 36px;
  height: 36px;

  border-radius: 50%;

  margin-right: 12px;

  cursor: pointer;
`;

export const Info = styled.div`
  display: flex;
  flex-direction: column;
`;

export const Username = styled.span`
  font-size: 0.875rem;
  font-weight: 500;
  line-height: 1rem;
  margin-bottom: 2px;

  &:hover {
    text-decoration: underline;
  }

  cursor: pointer;
`;

export const Content = styled.div`
  font-size: 0.875rem;
  line-height: 1rem;
  font-weight: 400;
`;
