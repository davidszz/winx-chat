import { useEffect, useRef } from 'react';

import { MessageStatus } from '@contexts/ws-cache-context';
import { useWsCache } from '@hooks/use-ws-cache';

import { Container } from './styles';

import { Message } from '../Message';

export function MessageList() {
  const { messages } = useWsCache();

  const messageListRef = useRef<HTMLDivElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    scrollRef.current?.scrollIntoView();
  }, [scrollRef]);

  useEffect(() => {
    if (messages.length && messageListRef.current) {
      const el = messageListRef.current;
      if (el.scrollHeight - el.clientHeight - el.scrollTop < el.clientHeight) {
        scrollRef.current?.scrollIntoView();
      }
    }
  }, [messages, messageListRef]);

  return (
    <Container ref={messageListRef}>
      {messages.map((x, i, arr) => (
        <Message
          user={x.author}
          content={x.content}
          full={arr[i - 1]?.author.id !== x.author.id}
          pending={x.status === MessageStatus.Pending}
          key={x.id}
        />
      ))}
      <div ref={scrollRef} />
    </Container>
  );
}
