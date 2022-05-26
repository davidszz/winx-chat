import styled from 'styled-components';
import TextareaAutosize from 'react-textarea-autosize';

export const InputWrapper = styled.div`
  padding: 12px 16px;

  width: 100%;
`;

export const Container = styled(TextareaAutosize)`
  width: 100%;

  resize: none;

  border: none;
  outline: none;

  padding: 12px 16px;

  font-size: 0.875rem;
  font-weight: 400;

  background-color: ${(props) => props.theme.colors.backgroundTertiary};

  border-radius: 6px;

  color: ${(props) => props.theme.colors.textPrimary};

  ::-webkit-scrollbar {
    width: 4px;
    margin-right: 10px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.backgroundPrimary};
    border-radius: 4px;
  }

  &::placeholder {
    color: ${(props) => props.theme.colors.textPrimary};
    opacity: 0.3;
  }
`;
