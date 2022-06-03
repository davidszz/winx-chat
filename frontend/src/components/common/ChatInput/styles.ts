import TextareaAutosize from 'react-textarea-autosize';
import styled from 'styled-components';

export const Wrapper = styled.div`
  position: relative;
  width: 100%;

  display: flex;
  align-items: center;
`;

export const Input = styled(TextareaAutosize)`
  width: 100%;
  resize: none;

  background: ${(props) => props.theme.colors.backgroundTertiary};

  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 8px;

  padding: 12px 42px 12px 16px;

  outline: none;

  font-size: 0.875rem;

  ::-webkit-scrollbar {
    width: 4px;
  }

  ::-webkit-scrollbar-thumb {
    background-color: ${(props) => props.theme.colors.backgroundPrimary};
    border-radius: 4px;
  }
`;

export const SendIconWrapper = styled.div`
  position: absolute;
  right: 0;

  width: 42px;
  height: 42px;

  display: flex;
  justify-content: center;
  align-items: center;

  cursor: pointer;

  & > svg {
    height: 22px;
    fill: ${(props) => props.theme.colors.textPrimary};
  }

  &:hover > svg {
    fill: ${(props) => props.theme.colors.textHover};
  }
`;
