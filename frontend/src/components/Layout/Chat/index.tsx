import { useWsCache } from '@hooks/use-ws-cache';
import { api } from '@lib/api';
import { useCallback, useEffect, useRef, useState } from 'react';
import { ChatInput } from './ChatInput';
import { Message } from './Message';
import { Container, MessageList } from './styles';

export function Chat() {
  const { users, messages } = useWsCache();

  const [inputContent, setInputContent] = useState('');

  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messageListRef?.current) {
      const el = messageListRef?.current;
      if (el.scrollHeight - el.clientHeight - el.scrollTop < 200) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [messages, messageListRef]);

  const handleInputChange = useCallback(
    (value: string) => {
      setInputContent(value);
    },
    [inputContent]
  );

  return (
    <Container>
      <MessageList ref={messageListRef}>
        {messages.map((x, i, arr) => (
          <Message
            user={x.user}
            content={x.content}
            full={arr[i - 1]?.user._id !== x.user._id}
            key={Math.random().toString(16)}
          />
        ))}
      </MessageList>
      <ChatInput
        onChange={handleInputChange}
        value={inputContent}
        onSend={async () => {
          if (!inputContent.trim()) return;
          setInputContent('');
          await api.post('/messages', {
            content: inputContent,
          });
        }}
      />
    </Container>
  );
}
