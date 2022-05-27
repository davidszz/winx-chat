import styled from 'styled-components';

export const Container = styled.div`
  display: flex;
  flex-direction: column;

  padding: 20px 0;

  max-height: calc(100vh - 46px - 69px);
  overflow-y: auto;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.backgroundTertiary};
    border-radius: 4px;
  }

  ::-webkit-scrollbar-track {
    background-color: ${(props) => props.theme.colors.backgroundPrimary};
  }
`;
