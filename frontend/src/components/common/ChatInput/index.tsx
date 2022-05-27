import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react';

import { Container, InputWrapper } from './styles';

export interface ChatInputProps {
  onSend: (value: string, setValue: (value: string) => void) => void;
}

export function ChatInput({ onSend }: ChatInputProps) {
  const [value, setValue] = useState('');

  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === 'Enter' && !ev.shiftKey && !ev.altKey) {
        ev.preventDefault();
        onSend(value, setValue);
      }
    },
    [onSend, value]
  );

  const handleInputChange = useCallback(
    (ev: ChangeEvent<HTMLTextAreaElement>) => {
      setValue(ev.target.value);
    },
    [setValue]
  );

  return (
    <InputWrapper>
      <Container
        maxRows={1}
        placeholder="Digite algo"
        value={value}
        onChange={handleInputChange}
        onKeyDown={handleKeyDown}
      />
    </InputWrapper>
  );
}
