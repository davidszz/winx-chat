import { SendSolid } from '@components/icons/SendSolid';

import { Wrapper, Input, SendIconWrapper } from './styles';

export function ChatInput() {
  return (
    <Wrapper>
      <Input maxRows={4} placeholder="Digite algo aqui" />
      <SendIconWrapper>
        <SendSolid />
      </SendIconWrapper>
    </Wrapper>
  );
}
