import { memo } from 'react';

import { Wrapper, Avatar, Info, Username, Content } from './styles';

interface Props {
  user: {
    avatar: string;
    username: string;
  };
  content: string;
}

function MessageComponent({ user, content }: Props) {
  return (
    <Wrapper>
      <Avatar src={user.avatar} alt={`Avatar de ${user.username}`} />
      <Info>
        <Username>{user.username}</Username>
        <Content>{content}</Content>
      </Info>
    </Wrapper>
  );
}

export const Message = memo(MessageComponent);
