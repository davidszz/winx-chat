import styled from 'styled-components';

export const ChatWrapper = styled.div`
  grid-area: CT;

  background-color: ${(props) => props.theme.colors.backgroundSecondary};

  height: calc(100vh - 56px);

  display: flex;
  flex-direction: column;
  justify-content: space-between;
`;

export const MessagesList = styled.div`
  display: flex;
  flex-direction: column;
  height: 100%;
  overflow-y: auto;

  padding: 24px 8px;

  ::-webkit-scrollbar {
    width: 8px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.backgroundPrimary};
    border-radius: 8px;
  }
`;

export const ChatInputWrapper = styled.div`
  width: 100%;
  padding: 12px 24px 24px;
`;
