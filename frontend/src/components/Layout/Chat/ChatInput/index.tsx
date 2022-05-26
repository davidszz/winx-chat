import { ChangeEvent, KeyboardEvent, useCallback } from 'react';
import { Container, InputWrapper } from './styles';

export interface ChatInputProps {
  value: string;
  onChange: (value: string) => void;
  onSend: () => void;
}

export function ChatInput({ value, onChange, onSend }: ChatInputProps) {
  const handleKeyDown = useCallback(
    (ev: KeyboardEvent) => {
      if (ev.key === 'Enter' && !ev.shiftKey && !ev.altKey) {
        ev.preventDefault();
        onSend();
      }
    },
    [onSend]
  );

  const handleInputChange = useCallback(
    (ev: ChangeEvent<HTMLTextAreaElement>) => {
      onChange(ev.target.value);
    },
    [onChange]
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
