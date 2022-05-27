import { ChangeEvent, FocusEvent, ReactNode, useState } from 'react';

import { StyleProps, Input, Container, Wrapper, IconWrapper, ErrorSpan } from './styles';

interface Props extends StyleProps {
  placeholder?: string;
  value?: string;
  hideValue?: boolean;
  onChange?: (value: string) => void;
  validate?: (value: string) => string | undefined;
  icon?: ReactNode;
  disabled?: boolean;
}

export function TextInput({
  placeholder,
  value,
  hideValue,
  onChange,
  validate,
  icon,
  disabled,
  ...props
}: Props) {
  const [errorMsg, setErrorMsg] = useState<string>();

  function handleChange(event: ChangeEvent<HTMLInputElement>) {
    if (onChange) {
      onChange(event.target.value);
    }
  }

  function handleValidation(event: FocusEvent<HTMLInputElement>) {
    if (validate) {
      const message = validate(event.target.value);
      if (message) {
        setErrorMsg(message);
        return;
      }
    }

    if (errorMsg) {
      setErrorMsg(undefined);
    }
  }

  return (
    <Wrapper disabled={disabled}>
      <Container hasError={!!errorMsg} {...props}>
        {icon && <IconWrapper>{icon}</IconWrapper>}
        <Input
          type={hideValue ? 'password' : 'text'}
          placeholder={placeholder}
          value={value}
          onChange={handleChange}
          onBlur={handleValidation}
          disabled={disabled}
        />
      </Container>
      {errorMsg && <ErrorSpan>{errorMsg}</ErrorSpan>}
    </Wrapper>
  );
}
