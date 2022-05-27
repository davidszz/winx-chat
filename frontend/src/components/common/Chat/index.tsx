import { useAuth } from '@hooks/use-auth';
import { useWsCache } from '@hooks/use-ws-cache';
import { api } from '@lib/api';

import { Container } from './styles';

import { ChatInput } from '../ChatInput';
import { MessageList } from '../MessageList';

export function Chat() {
  const { user } = useAuth();
  const { addPendingMessage } = useWsCache();

  function handleCreateMessage(value: string, setValue: (value: string) => void) {
    if (!value.trim()) {
      return;
    }

    setValue('');

    const nonce = Math.random().toString(16).split('.')[1];

    addPendingMessage({
      content: value,
      nonce,
      user: user!,
    });

    const createMessage = async (): Promise<any> =>
      api
        .post('/messages', {
          content: value,
          nonce,
        })
        .catch((err) => {
          if (err.response?.status === 429 && err.response?.data?.retryAfter) {
            setTimeout(() => {
              createMessage();
            }, err.response.data.retryAfter);
          }
        });

    createMessage();
  }

  return (
    <Container>
      <MessageList />
      <ChatInput onSend={handleCreateMessage} />
    </Container>
  );
}
