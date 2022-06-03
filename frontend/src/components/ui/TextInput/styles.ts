import styled from 'styled-components';

interface InputProps {
  hasPrefix?: boolean;
  hasSuffix?: boolean;
}

export const TextInputWrapper = styled.div`
  position: relative;
`;

export const Input = styled.input<InputProps>`
  width: 100%;
  height: 40px;

  padding: 0 12px;
  ${(props) => props.hasPrefix && 'padding-left: 40px;'};
  ${(props) => props.hasSuffix && 'padding-right: 40px;'};

  font-size: 0.875rem;

  border: 1px solid ${(props) => props.theme.colors.border};
  border-radius: 4px;

  background-color: ${(props) => props.theme.colors.inputBackground};

  &::placeholder {
    color: ${(props) => props.theme.colors.textHover};
    opacity: 0.6;
  }
`;

export const PrefixIcon = styled.div`
  position: absolute;
  top: 0;
  left: 0;

  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;

  & > svg {
    width: 16px;
    outline: none;
  }
`;

export const SuffixIcon = styled.div`
  position: absolute;
  top: 0;
  right: 0;

  width: 40px;
  height: 40px;

  display: flex;
  justify-content: center;
  align-items: center;

  user-select: none;

  & > svg {
    width: 16px;
    outline: none;
  }
`;
