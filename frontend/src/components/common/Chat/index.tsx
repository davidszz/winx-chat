import { ChatInputWrapper, ChatWrapper, MessagesList } from './styles';

import { ChatInput } from '../ChatInput';
import { Message } from '../Message';

export function Chat() {
  const user = {
    username: 'Sasuke',
    avatar: 'https://aniyuki.com/wp-content/uploads/2022/04/aniyuki-sasuke-uchiha-avatar-29.jpg',
  };

  return (
    <ChatWrapper>
      <MessagesList>
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
        <Message user={user} content="kkk" />
      </MessagesList>
      <ChatInputWrapper>
        <ChatInput />
      </ChatInputWrapper>
    </ChatWrapper>
  );
}
