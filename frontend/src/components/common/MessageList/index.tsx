import { useEffect, useRef, useState } from 'react';

import { MessageStatus } from '@contexts/ws-cache-context';
import { useWsCache } from '@hooks/use-ws-cache';

import { Container } from './styles';

import { Message } from '../Message';

export function MessageList() {
  const { messages } = useWsCache();

  const [firstFetch, setFirstFetch] = useState(false);

  const messageListRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (messages.length && messageListRef.current) {
      const el = messageListRef.current;
      if (!firstFetch) {
        el.scrollTop = el.scrollHeight;
        setFirstFetch(true);
      } else if (el.scrollHeight - el.clientHeight - el.scrollTop < 200) {
        el.scrollTop = el.scrollHeight;
      }
    }
  }, [messages, messageListRef, firstFetch, setFirstFetch]);

  return (
    <Container ref={messageListRef}>
      {messages
        .sort((a, b) => a.createdAt.getTime() - b.createdAt.getTime())
        .map((x, i, arr) => (
          <Message
            user={x.author}
            content={x.content}
            full={arr[i - 1]?.author.id !== x.author.id}
            pending={x.status === MessageStatus.Pending}
            key={Math.random().toString(16)}
          />
        ))}
    </Container>
  );
}
